# SDLC Stage Evidence Map (GitHub Demo)

이 문서는 SDLC 각 단계를 GitHub에서 어디서 보여줄지 정의합니다.

## 자동 생성 워크플로
- GitHub 위치: Actions
- 증적: .github/workflows/seed-sdlc-demo.yml
- 시연: SDLC 8단계 데모 이슈 자동 생성

## 1. Plan
- GitHub 위치: Issues
- 증적: .github/ISSUE_TEMPLATE/plan-change.yml
- 시연: Given/When/Then + AC/owner/rollback + Leader question/Stop condition이 포함된 계획 이슈 생성

## 2. Code
- GitHub 위치: Files / Commits
- 증적: .github/ISSUE_TEMPLATE/code-change.yml, src/domain, src/application, src/infrastructure
- 시연: DDD 레이어 분리 코드 리뷰

## 3. Review & Test
- GitHub 위치: Issues / Pull Requests
- 증적: .github/ISSUE_TEMPLATE/review-test-check.yml, .github/pull_request_template.md, .github/CODEOWNERS
- 시연: PR 체크리스트 + owner review + GHAS CodeQL 결과

## 4. Build & Deploy
- GitHub 위치: Issues / Actions
- 증적: .github/ISSUE_TEMPLATE/build-deploy-run.yml, .github/workflows/ci.yml
- 시연: html-validate, links-check, smoke-test 상태 확인

## 5. Operate
- GitHub 위치: Issues
- 증적: .github/ISSUE_TEMPLATE/incident-report.yml
- 시연: incident 이슈로 타임라인 관리

## 6. Modernize
- GitHub 위치: Issues / Pull Requests
- 증적: .github/ISSUE_TEMPLATE/modernize-slice.yml
- 시연: PR slice 계획과 rollback 조건 확인

## 7. Govern
- GitHub 위치: Issues / Repository files
- 증적: .github/ISSUE_TEMPLATE/governance-check.yml, .github/ISSUE_TEMPLATE/tool-exception-request.yml, docs/governance-policy.md, docs/exception-approval-template.md
- 시연: 예외 승인 기준 설명

## 8. Models
- GitHub 위치: Issues / Actions / Repository files
- 증적: .github/ISSUE_TEMPLATE/model-routing-review.yml, docs/kpi-metrics.md, docs/cost-governance.md, .github/workflows/slo-monitor.yml
- 시연: 모델 사용 승인, budget alert, SLO breach 자동 이슈 생성 흐름 설명
