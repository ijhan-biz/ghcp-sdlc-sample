#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FAILURES=0

pass() {
  printf '[PASS] %s\n' "$1"
}

fail() {
  printf '[FAIL] %s\n' "$1"
  FAILURES=$((FAILURES + 1))
}

require_file() {
  local rel="$1"
  if [[ -f "$ROOT_DIR/$rel" ]]; then
    pass "file exists: $rel"
  else
    fail "missing file: $rel"
  fi
}

require_regex_in_file() {
  local rel="$1"
  local pattern="$2"
  local label="$3"
  if [[ ! -f "$ROOT_DIR/$rel" ]]; then
    fail "missing file for content check ($label): $rel"
    return
  fi

  if grep -Eqi "$pattern" "$ROOT_DIR/$rel"; then
    pass "$label"
  else
    fail "$label"
  fi
}

print_header() {
  printf '\n== %s ==\n' "$1"
}

require_text_in_file() {
  local rel="$1"
  local text="$2"
  local label="$3"
  if [[ ! -f "$ROOT_DIR/$rel" ]]; then
    fail "missing file for content check ($label): $rel"
    return
  fi

  if grep -Fqi "$text" "$ROOT_DIR/$rel"; then
    pass "$label"
  else
    fail "$label"
  fi
}

print_header "A. SDLC 8-stage content"
SDLC_PAGE="index.html"
SDLC_DATA="assets/app.js"
require_file "$SDLC_PAGE"
require_file "$SDLC_DATA"
require_text_in_file "$SDLC_PAGE" "SDLC 8 Stages" "demo page has SDLC section"
require_text_in_file "$SDLC_DATA" 'name: "Plan"' "stage present in demo data: Plan"
require_text_in_file "$SDLC_DATA" 'name: "Code"' "stage present in demo data: Code"
require_text_in_file "$SDLC_DATA" 'name: "Review & Test"' "stage present in demo data: Review & Test"
require_text_in_file "$SDLC_DATA" 'name: "Build & Deploy"' "stage present in demo data: Build & Deploy"
require_text_in_file "$SDLC_DATA" 'name: "Operate"' "stage present in demo data: Operate"
require_text_in_file "$SDLC_DATA" 'name: "Modernize"' "stage present in demo data: Modernize"
require_text_in_file "$SDLC_DATA" 'name: "Govern"' "stage present in demo data: Govern"
require_text_in_file "$SDLC_DATA" 'name: "Models"' "stage present in demo data: Models"

print_header "B. CI workflow jobs"
CI_WORKFLOW=".github/workflows/ci.yml"
require_file "$CI_WORKFLOW"
require_regex_in_file "$CI_WORKFLOW" '(^|[[:space:]])html-validate:' 'ci.yml has job: html-validate'
require_regex_in_file "$CI_WORKFLOW" '(^|[[:space:]])links-check:' 'ci.yml has job: links-check'
require_regex_in_file "$CI_WORKFLOW" '(^|[[:space:]])smoke-test:' 'ci.yml has job: smoke-test'
SDLC_PR_GATE_WORKFLOW=".github/workflows/sdlc-pr-gate.yml"
require_file "$SDLC_PR_GATE_WORKFLOW"
require_text_in_file "$SDLC_PR_GATE_WORKFLOW" 'SDLC PR gate failed' 'sdlc-pr-gate enforces evidence fields'
SEED_WORKFLOW=".github/workflows/seed-sdlc-demo.yml"
require_file "$SEED_WORKFLOW"
require_regex_in_file "$SEED_WORKFLOW" 'workflow_dispatch' 'seed workflow is manually triggerable'
require_text_in_file "$SEED_WORKFLOW" '## Leader question' 'seed issues include Leader question'
require_text_in_file "$SEED_WORKFLOW" '## Stop condition' 'seed issues include Stop condition'
require_text_in_file "$SEED_WORKFLOW" '## Evidence link' 'seed issues include Evidence link'

print_header "C. CodeQL workflow"
CODEQL_WORKFLOW=".github/workflows/codeql.yml"
require_file "$CODEQL_WORKFLOW"
require_regex_in_file "$CODEQL_WORKFLOW" '(^|[[:space:]])analyze:' 'codeql.yml has job name: analyze'
require_regex_in_file "$CODEQL_WORKFLOW" 'config-file:' 'codeql.yml has config-file setting'
require_file ".github/codeql/codeql-config.yml"

print_header "C-1. GHAS dependency review"
DEPENDENCY_REVIEW_WORKFLOW=".github/workflows/dependency-review.yml"
require_file "$DEPENDENCY_REVIEW_WORKFLOW"
require_regex_in_file "$DEPENDENCY_REVIEW_WORKFLOW" 'dependency-review-action' 'dependency-review workflow uses action'

print_header "C-2. Model routing policy gate"
MODEL_POLICY_WORKFLOW=".github/workflows/model-routing-policy-gate.yml"
require_file "$MODEL_POLICY_WORKFLOW"
require_text_in_file "$MODEL_POLICY_WORKFLOW" "approved-tech-lead" "model policy gate checks tech lead approval"
require_text_in_file "$MODEL_POLICY_WORKFLOW" "approved-security" "model policy gate checks security approval"
require_text_in_file "$MODEL_POLICY_WORKFLOW" "policy-blocked" "model policy gate sets blocked label"

print_header "D. GitHub policy files"
require_file ".github/CODEOWNERS"
require_file ".github/pull_request_template.md"
require_file ".github/dependabot.yml"
require_file "SECURITY.md"
require_file ".github/ISSUE_TEMPLATE/plan-change.yml"
require_file ".github/ISSUE_TEMPLATE/code-change.yml"
require_file ".github/ISSUE_TEMPLATE/review-test-check.yml"
require_file ".github/ISSUE_TEMPLATE/build-deploy-run.yml"
require_file ".github/ISSUE_TEMPLATE/incident-report.yml"
require_file ".github/ISSUE_TEMPLATE/modernize-slice.yml"
require_file ".github/ISSUE_TEMPLATE/governance-check.yml"
require_file ".github/ISSUE_TEMPLATE/model-routing-review.yml"
require_file ".github/ISSUE_TEMPLATE/tool-exception-request.yml"

print_header "E. Docs pack"
require_file "docs/preflight-checklist.md"
require_file "docs/runbook-demo.md"
require_file "docs/release-freeze-policy.md"
require_file "docs/kpi-metrics.md"
require_file "docs/github-sdlc-cases.md"
require_file "docs/ddd-architecture.md"
require_file "docs/sdlc-stage-evidence-map.md"
require_file "docs/ghas-setup.md"
require_file "docs/cost-governance.md"
require_file "docs/seminar-demo-clickpath.md"
require_file "docs/real-dev-workflow.md"

print_header "E-1. DDD code pack"
require_file "src/domain/incidents/Incident.js"
require_file "src/domain/incidents/IncidentPriorityPolicy.js"
require_file "src/domain/incidents/IncidentRepository.js"
require_file "src/application/use-cases/RegisterIncidentUseCase.js"
require_file "src/application/use-cases/ResolveIncidentUseCase.js"
require_file "src/infrastructure/repositories/InMemoryIncidentRepository.js"
require_file "scripts/ddd-smoke.js"

print_header "E-2. BDD issue template checks"
require_text_in_file ".github/ISSUE_TEMPLATE/plan-change.yml" "Given" "plan template includes Given"
require_text_in_file ".github/ISSUE_TEMPLATE/plan-change.yml" "When" "plan template includes When"
require_text_in_file ".github/ISSUE_TEMPLATE/plan-change.yml" "Then" "plan template includes Then"
require_text_in_file ".github/ISSUE_TEMPLATE/code-change.yml" "Given" "code template includes Given"
require_text_in_file ".github/ISSUE_TEMPLATE/code-change.yml" "When" "code template includes When"
require_text_in_file ".github/ISSUE_TEMPLATE/code-change.yml" "Then" "code template includes Then"
require_text_in_file ".github/ISSUE_TEMPLATE/review-test-check.yml" "Given" "review-test template includes Given"
require_text_in_file ".github/ISSUE_TEMPLATE/review-test-check.yml" "When" "review-test template includes When"
require_text_in_file ".github/ISSUE_TEMPLATE/review-test-check.yml" "Then" "review-test template includes Then"
require_text_in_file ".github/ISSUE_TEMPLATE/build-deploy-run.yml" "Given" "build-deploy template includes Given"
require_text_in_file ".github/ISSUE_TEMPLATE/build-deploy-run.yml" "When" "build-deploy template includes When"
require_text_in_file ".github/ISSUE_TEMPLATE/build-deploy-run.yml" "Then" "build-deploy template includes Then"
require_text_in_file ".github/ISSUE_TEMPLATE/incident-report.yml" "Given" "incident template includes Given"
require_text_in_file ".github/ISSUE_TEMPLATE/incident-report.yml" "When" "incident template includes When"
require_text_in_file ".github/ISSUE_TEMPLATE/incident-report.yml" "Then" "incident template includes Then"
require_text_in_file ".github/ISSUE_TEMPLATE/modernize-slice.yml" "Given" "modernize template includes Given"
require_text_in_file ".github/ISSUE_TEMPLATE/modernize-slice.yml" "When" "modernize template includes When"
require_text_in_file ".github/ISSUE_TEMPLATE/modernize-slice.yml" "Then" "modernize template includes Then"
require_text_in_file ".github/ISSUE_TEMPLATE/governance-check.yml" "Given" "govern template includes Given"
require_text_in_file ".github/ISSUE_TEMPLATE/governance-check.yml" "When" "govern template includes When"
require_text_in_file ".github/ISSUE_TEMPLATE/governance-check.yml" "Then" "govern template includes Then"
require_text_in_file ".github/ISSUE_TEMPLATE/model-routing-review.yml" "Given" "models template includes Given"
require_text_in_file ".github/ISSUE_TEMPLATE/model-routing-review.yml" "When" "models template includes When"
require_text_in_file ".github/ISSUE_TEMPLATE/model-routing-review.yml" "Then" "models template includes Then"
require_text_in_file ".github/ISSUE_TEMPLATE/tool-exception-request.yml" "승인자" "tool exception template includes approvers"

print_header "E-3. GHAS and Cost governance checks"
require_text_in_file "docs/ghas-setup.md" "5중 방어선" "ghas doc includes 5-layer defense section"
require_text_in_file "docs/ghas-setup.md" "Code review" "ghas doc includes code review layer"
require_text_in_file "docs/ghas-setup.md" "CodeQL" "ghas doc includes CodeQL layer"
require_text_in_file "docs/ghas-setup.md" "Secret scanning" "ghas doc includes secret scanning layer"
require_text_in_file "docs/ghas-setup.md" "Enterprise controls" "ghas doc includes enterprise controls layer"
require_text_in_file "docs/ghas-setup.md" "Cloud Agent Governance" "ghas doc includes agent governance layer"
require_text_in_file "docs/cost-governance.md" "T0-T4" "cost governance includes work tiers"
require_text_in_file "docs/cost-governance.md" "budget" "cost governance includes budget control"

print_header "F. Domain candidates + GitHub Pages URL"
DOMAIN_DOC="docs/domain-candidates.md"
require_file "$DOMAIN_DOC"

if [[ -f "$ROOT_DIR/$DOMAIN_DOC" ]]; then
  # Candidate domain lines: markdown bullet with a hostname-like token.
  domain_count="$(grep -Eic '^\s*[-*]\s+[A-Za-z0-9.-]+\.[A-Za-z]{2,}' "$ROOT_DIR/$DOMAIN_DOC" || true)"
  if [[ "$domain_count" -ge 3 ]]; then
    pass "domain candidates >= 3 (found: $domain_count)"
  else
    fail "domain candidates >= 3 (found: $domain_count)"
  fi

  require_regex_in_file "$DOMAIN_DOC" 'https://[a-z0-9-]+\.github\.io(/[^[:space:]]*)?' 'GitHub Pages default URL documented'
fi

print_header "G. Branch protection checks (API validation)"
if [[ "${SKIP_REMOTE_CHECKS:-0}" == "1" ]]; then
  printf '[WARN] skipped remote branch protection validation (SKIP_REMOTE_CHECKS=1)\n'
elif [[ -n "${GH_TOKEN:-}" && -n "${GH_REPO:-}" ]]; then
  if command -v curl >/dev/null 2>&1; then
    api_url="https://api.github.com/repos/${GH_REPO}/branches/main/protection"
    response="$(curl -sS -H "Authorization: Bearer ${GH_TOKEN}" -H "Accept: application/vnd.github+json" "$api_url" || true)"
    if echo "$response" | grep -q 'required_status_checks'; then
      pass "branch protection API reachable"
      echo "$response" | grep -q 'enforce_admins' && pass "enforce_admins key present" || fail "enforce_admins key missing"
      echo "$response" | grep -q 'ci / html-validate' && pass "required check includes ci / html-validate" || fail "required check missing ci / html-validate"
      echo "$response" | grep -q 'ci / links-check' && pass "required check includes ci / links-check" || fail "required check missing ci / links-check"
      echo "$response" | grep -q 'ci / smoke-test' && pass "required check includes ci / smoke-test" || fail "required check missing ci / smoke-test"
      echo "$response" | grep -q 'codeql / analyze' && pass "required check includes codeql / analyze" || fail "required check missing codeql / analyze"
    else
      fail "branch protection API response did not include required_status_checks"
    fi
  else
    fail "curl command not available for branch protection validation"
  fi
else
  fail "remote branch protection validation requires GH_TOKEN and GH_REPO=owner/repo (or set SKIP_REMOTE_CHECKS=1 for local-only run)"
fi

print_header "Result"
if [[ "$FAILURES" -eq 0 ]]; then
  printf 'All checks passed.\n'
  exit 0
fi

printf 'Total failures: %d\n' "$FAILURES"
exit 1