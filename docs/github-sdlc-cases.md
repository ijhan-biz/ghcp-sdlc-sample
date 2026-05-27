# GitHub SDLC Cases (FieldOps Incident Portal)

가정 도메인: 통신망 장애 대응 포털 (fieldops-incident.internal)

아래 케이스는 GitHub UI에서 바로 시연할 수 있는 동선입니다.

## 1) Plan
- 시연 위치: Issues 탭
- 준비물: .github/ISSUE_TEMPLATE/plan-change.yml
- 확인 포인트: 수용기준(AC), 영향도, 완료 정의가 이슈에 입력되는지

## 2) Code
- 시연 위치: Branches + Commits
- 준비물: feature/incident-priority-fix 브랜치
- 확인 포인트: 작은 단위 커밋과 테스트 파일 동반 여부

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
- 확인 포인트: T+0/T+5/T+10 타임라인, 복구 완료 시각

## 6) Modernize
- 시연 위치: Pull Requests + Projects
- 준비물: modernize-parser-1/2/3 PR 시리즈
- 확인 포인트: PR 분할 전략과 rollback 체크 항목

## 7) Govern
- 시연 위치: Repository Files
- 준비물: docs/exception-approval-template.md, docs/governance-policy.md
- 확인 포인트: 예외 승인 로그와 승인자(Tech Lead + Security)

## 8) Models
- 시연 위치: Repository Files + Actions
- 준비물: docs/kpi-metrics.md, .github/workflows/slo-monitor.yml
- 확인 포인트: 모델 사용률과 SLO breach 시 incident 이슈 자동 생성

## 데모 실행 순서 (15분)
1. Issues에서 Plan/Incident 템플릿 생성
2. PR 하나를 열어 review/check 상태 확인
3. Actions에서 실패 로그 하나를 열어 수정 흐름 설명
4. Security 탭에서 code scanning 상태 확인
5. docs 폴더에서 Govern/Models 정책 문서 확인
