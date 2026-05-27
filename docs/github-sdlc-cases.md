# GitHub SDLC Cases (FieldOps Incident Portal)

가정 도메인: 통신망 장애 대응 포털 (fieldops-incident.internal)

아래 케이스는 GitHub UI에서 바로 시연할 수 있는 동선입니다.

## 빠른 준비 (GitHub에서 직접 생성)
1. Actions 탭에서 `seed-sdlc-demo` 워크플로를 실행합니다.
2. `close_existing=true`로 실행하면 기존 SDLC 데모 이슈를 닫고 8단계 이슈를 새로 만듭니다.
3. Issues 탭에서 `label:sdlc-demo`로 검색하면 8단계 이슈를 바로 확인할 수 있습니다.

## 1) Plan
- 시연 위치: Issues 탭
- 준비물: .github/ISSUE_TEMPLATE/plan-change.yml
- 확인 포인트: Given/When/Then 시나리오와 수용기준(AC)이 이슈에 입력되는지

## 2) Code
- 시연 위치: Branches + Commits
- 준비물: src/domain, src/application, src/infrastructure 구조
- 확인 포인트: DDD 레이어 분리(도메인 규칙과 유스케이스 분리) 여부

## 3) Review & Test
- 시연 위치: Pull Requests
- 준비물: PR 템플릿 + CODEOWNERS
- 확인 포인트: owner review와 required checks 상태 배지

## 4) Build & Deploy
- 시연 위치: Actions
- 준비물: ci.yml
- 확인 포인트: html-validate, links-check, smoke-test 결과와 실패 로그

## 5) Operate
- 시연 위치: Issues (incident 라벨)
- 준비물: .github/ISSUE_TEMPLATE/incident-report.yml
- 확인 포인트: BDD 시나리오 + T+0/T+5/T+10 타임라인, 복구 완료 시각

## 6) Modernize
- 시연 위치: Pull Requests + Projects
- 준비물: .github/ISSUE_TEMPLATE/modernize-slice.yml
- 확인 포인트: PR 분할 전략과 rollback 체크 항목

## 7) Govern
- 시연 위치: Repository Files
- 준비물: docs/exception-approval-template.md, docs/governance-policy.md
- 확인 포인트: 예외 승인 로그와 승인자(Tech Lead + Security)

## 8) Models
- 시연 위치: Repository Files + Actions
- 준비물: .github/ISSUE_TEMPLATE/model-routing-review.yml, docs/kpi-metrics.md, .github/workflows/slo-monitor.yml
- 확인 포인트: 모델 사용률과 SLO breach 시 incident 이슈 자동 생성

## 단계별 증적 맵
- 문서: docs/sdlc-stage-evidence-map.md
- 목적: SDLC 8단계별 GitHub 시연 위치와 증적 파일을 한 번에 확인

## 데모 실행 순서 (15분)
1. Actions에서 seed-sdlc-demo 실행 후 Issues 확인
2. PR 하나를 열어 review/check 상태 확인
3. Actions에서 실패 로그 하나를 열어 수정 흐름 설명
4. Security 탭에서 code scanning 상태 확인
5. docs 폴더에서 Govern/Models 정책 문서 확인
