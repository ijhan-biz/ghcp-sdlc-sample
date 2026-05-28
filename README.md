# FieldOps Incident Portal SDLC Guide

통신망 장애 대응 포털(FieldOps Incident Portal)을 가정하고, GitHub-native SDLC 8단계를 운영 관점으로 보여주는 정적 웹 프로젝트입니다.

## 목표
- SDLC 8단계(Plan, Code, Review & Test, Build & Deploy, Operate, Modernize, Govern, Models)를 한 화면에서 설명
- 단계별 도메인 케이스(Demo), 통제(Gate), 지표(KPI) 비교
- GitHub 탭(Issues, PR, Actions, Security)에서 바로 보여줄 수 있는 시연 동선 제공

## 로컬 실행
```bash
python3 -m http.server 8080
# 브라우저: http://127.0.0.1:8080/index.html
```

## 필수 Required Checks
- ci / html-validate
- ci / links-check
- ci / smoke-test
- codeql / analyze
- dependency-review / dependency-review

## GHAS 설정
- 설정 가이드: docs/ghas-setup.md
- CodeQL 워크플로: .github/workflows/codeql.yml
- CodeQL 구성: .github/codeql/codeql-config.yml
- Dependency Review 워크플로: .github/workflows/dependency-review.yml
- Secret scanning / Push protection: Repository Settings > Security & analysis에서 활성화

## GitHub 직접 시연 케이스
- 케이스 문서: docs/github-sdlc-cases.md
- 실개발 운영 가이드: docs/real-dev-workflow.md
- Stage 증적 맵: docs/sdlc-stage-evidence-map.md
- Plan/Operate/Modernize/Models 템플릿: .github/ISSUE_TEMPLATE/
- 자동 이슈 생성: .github/workflows/seed-sdlc-demo.yml (Actions에서 실행)
- Review/Test 증적: .github/CODEOWNERS, .github/pull_request_template.md
- Build/Deploy 증적: .github/workflows/ci.yml
- PR 증적 게이트: .github/workflows/sdlc-pr-gate.yml
- Govern/Models 증적: docs/governance-policy.md, docs/kpi-metrics.md, docs/cost-governance.md, .github/workflows/slo-monitor.yml
- 예외 승인 이슈 템플릿: .github/ISSUE_TEMPLATE/tool-exception-request.yml
- 발표자 클릭패스: docs/seminar-demo-clickpath.md

## DDD 코드 구조
- 아키텍처 문서: docs/ddd-architecture.md
- Domain: src/domain/incidents/
- Application: src/application/use-cases/
- Infrastructure: src/infrastructure/repositories/
- 스모크 테스트: node scripts/ddd-smoke.js

## BDD 이슈 작성 규칙
- Plan/Incident 이슈는 Given / When / Then 시나리오를 반드시 포함합니다.
- 템플릿: .github/ISSUE_TEMPLATE/plan-change.yml, .github/ISSUE_TEMPLATE/incident-report.yml

## 운영 원칙
- 표준: GitHub-native SDLC 경로
- 예외: 목적/기간/비용 상한을 가진 조건부 승인
- 보안: GHAS + Required checks 통과 전 merge 금지
- 감사: AI-assisted PR 라벨과 증적 필수

## 도메인 가정
- 서비스 도메인: fieldops-incident.internal
- 기본 URL: https://your-org.github.io/ghcp-sdlc-sample/

## 검증 하네스
```bash
./scripts/preflight-validate.sh
```

## 주의
기능/과금/권한 정책은 계약 전 GitHub 공식 문서와 조직 설정에서 재확인해야 합니다.
