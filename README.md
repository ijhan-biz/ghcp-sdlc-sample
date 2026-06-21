# FieldOps Incident Portal SDLC Template Repo

이 저장소는 "GitHub에서 SDLC를 운영하는 방법"을 바로 복제해서 사용할 수 있게 만든 예시 템플릿입니다.

핵심은 다음 3가지입니다.
- SDLC 8단계를 Issue/PR/Actions/Security로 연결
- GHAS(CodeQL, Dependency Review, Secret scanning)로 보안 게이트 구성
- 운영/비용/승인 정책을 문서 + 워크플로로 함께 강제

## 예시들은 하나의 소프트웨어 흐름으로 이어집니다

이 저장소의 단계별 예시(이슈 #1~#8, 데모 PR #10~#12)는 개별 샘플이 아니라, **하나의 기능이 기획부터 운영·개선까지 흐르는 모습**을 보여 주도록 연결되어 있습니다. "FieldOps 인시던트 포털에 우선순위 자동 분류 기능을 추가한다"는 가상의 변경을 따라가면 다음과 같이 사용됩니다.

1. **Plan (#1)** — `plan-change.yml`로 요구사항을 Given/When/Then + 승인 기준(AC) + rollback으로 정의합니다. 무엇을, 왜, 어떤 조건에서 완료로 볼지 합의합니다.
2. **Code (#2)** — `code-change.yml`로 DDD 레이어(`src/domain`, `src/application`) 변경 범위와 테스트 계획을 정리하고 구현을 시작합니다.
3. **Review & Test (#3 → PR #11)** — 변경을 PR로 올리면 `sdlc-pr-gate`와 required checks가 증거 누락을 검증합니다. Review/Test 게이트 데모 PR이 이 단계의 실제 화면입니다.
4. **Build & Deploy (#4)** — `.github/workflows`의 Actions 실행 로그로 빌드·배포 결과와 실패 대응을 기록합니다.
5. **Operate (#5)** — 배포 후 장애가 생기면 `incident-report.yml`로 타임라인·원인·조치를 남깁니다. (이전에 자동 누적되던 SLO breach 알림이 이 단계의 입력이 됩니다.)
6. **Modernize (#6)** — 운영에서 얻은 교훈으로 리팩터링/PR 슬라이스를 계획해 다음 Plan 사이클로 되돌립니다.
7. **Govern (#7 → PR #12)** — 위 흐름 전체에 예외·승인이 필요할 때 거버넌스 점검과 예외 승인 증거 PR로 통제합니다.
8. **Models (#8)** — 각 단계에서 어떤 AI 모델을 어떤 권한(Work Tier T0-T4, premium 승인)으로 썼는지 라우팅 정책으로 기록합니다.

즉, 위에서 아래로 읽으면 **Plan → Code → Review/Test → Build/Deploy → Operate → Modernize**가 한 바퀴 도는 개발 루프이고, **Govern·Models**는 그 루프 전체를 가로지르는 통제 축입니다. 각 예시 이슈/PR을 순서대로 열어 보면 한 기능이 GitHub 위에서 어떻게 증거를 남기며 흘러가는지 그대로 따라갈 수 있습니다.

## 0. 팀 온보딩 5분 시작 가이드

새 팀원이 들어오면 아래 순서만 따라도 저장소 운영 구조를 빠르게 이해할 수 있습니다.

1. 데모 화면 열기
```bash
python3 -m http.server 8080
# http://127.0.0.1:8080/index.html
```

2. SDLC 8단계 구조 확인
- `index.html`의 stage 카드에서 Plan -> Models 흐름 확인
- `docs/sdlc-stage-evidence-map.md`에서 단계별 증거 위치 확인

3. 이슈 템플릿으로 1개 생성
- `Issues -> New issue`에서 `plan-change.yml` 또는 `code-change.yml` 선택
- Given/When/Then + AC + rollback 작성

4. PR 게이트 체험
- PR 생성 시 `.github/pull_request_template.md` 항목 채움
- `sdlc-pr-gate`가 증거 필드 누락을 자동 검증하는지 확인

5. 보안 게이트 확인
- `Actions -> codeql.yml`, `dependency-review.yml` 실행 기록 확인
- Security 탭에서 Code scanning/Dependency 관련 결과 확인

완료 기준:
- 이슈 1건 + PR 1건 + Actions 결과 1건을 직접 열어 설명할 수 있으면 온보딩 완료

## 1. 이 저장소로 무엇을 할 수 있나
- 팀의 표준 개발 흐름(Plan -> Code -> Review/Test -> Deploy -> Operate)을 GitHub 상에서 재현
- 이슈 템플릿으로 요구사항 품질(BDD 시나리오, 승인 기준)을 일정하게 유지
- PR 템플릿 + 자동 게이트로 머지 전 증거 누락 방지
- CodeQL/Dependency Review 기반 보안 검증 경로 확보
- 모델 사용 정책(T0-T4, premium 승인)을 이슈/라벨/워크플로로 통제

## 2. 빠른 시작

### 로컬 실행
```bash
python3 -m http.server 8080
# http://127.0.0.1:8080/index.html
```

### 기본 검증
```bash
./scripts/preflight-validate.sh
# 로컬만 점검할 때
SKIP_REMOTE_CHECKS=1 ./scripts/preflight-validate.sh
```

## 3. SDLC 8단계 이슈 템플릿 (재사용용)

아래 템플릿은 그대로 복사해도 되고, 도메인 용어만 바꿔서 사용하면 됩니다.

| Stage | Template | 언제 사용 | 핵심 입력 |
| --- | --- | --- | --- |
| Plan | `.github/ISSUE_TEMPLATE/plan-change.yml` | 구현 시작 전 | Given/When/Then, AC, rollback |
| Code | `.github/ISSUE_TEMPLATE/code-change.yml` | 코드 수정 착수 | DDD 변경 범위, 테스트 계획 |
| Review & Test | `.github/ISSUE_TEMPLATE/review-test-check.yml` | PR 검토 시 | 리뷰 상태, required checks |
| Build & Deploy | `.github/ISSUE_TEMPLATE/build-deploy-run.yml` | 배포 전후 | 실행 로그, 실패 대응 |
| Operate | `.github/ISSUE_TEMPLATE/incident-report.yml` | 장애 대응 | 타임라인, 원인/조치 |
| Modernize | `.github/ISSUE_TEMPLATE/modernize-slice.yml` | 리팩터링/분할 | PR 슬라이스, rollback |
| Govern | `.github/ISSUE_TEMPLATE/governance-check.yml` | 정책 점검 | 예외/승인 근거 |
| Models | `.github/ISSUE_TEMPLATE/model-routing-review.yml` | 모델 선택/승인 | Work Tier(T0-T4), Approval Basis |

추가 템플릿:
- 예외 요청: `.github/ISSUE_TEMPLATE/tool-exception-request.yml`
- 템플릿 선택 설정: `.github/ISSUE_TEMPLATE/config.yml`

## 4. 워크플로 목록 (무엇을 언제 실행하나)

| Workflow | File | Trigger | 역할 |
| --- | --- | --- | --- |
| CI | `.github/workflows/ci.yml` | push/PR | html/links/smoke 검사 |
| CodeQL | `.github/workflows/codeql.yml` | push/PR/schedule | 취약 코드 패턴 분석 |
| Dependency Review | `.github/workflows/dependency-review.yml` | PR, manual dispatch | 의존성 리스크 점검 |
| SDLC Seed | `.github/workflows/seed-sdlc-demo.yml` | manual dispatch | 8단계 데모 이슈 자동 생성 |
| SDLC PR Gate | `.github/workflows/sdlc-pr-gate.yml` | PR opened/edited/sync | PR 본문 증거 필수값 강제 |
| SLO Monitor | `.github/workflows/slo-monitor.yml` | schedule/manual | SLO 미달 시 incident 이슈 생성 |
| Model Policy Gate | `.github/workflows/model-routing-policy-gate.yml` | issues event | T3/T4 premium 승인 요건 강제 |

## 5. CodeQL / GHAS 적용 설명

### CodeQL
- 파일: `.github/workflows/codeql.yml`
- 설정: `.github/codeql/codeql-config.yml`
- 동작: push/PR 시 분석, 결과는 Security 탭에 집계
- 운영 팁: branch protection에서 `codeql / analyze`를 required check로 강제

### Dependency Review
- 파일: `.github/workflows/dependency-review.yml`
- 동작: PR에서 의존성 변경을 분석하고 high severity를 실패 처리
- 데모 모드: `workflow_dispatch`로 example run 생성 가능

### Secret Scanning / Push Protection
- 워크플로 파일이 아니라 GitHub Security 설정에서 활성화
- 경로: Repository Settings -> Security & analysis

## 6. 실제 코드 개발에 적용하는 방법

실무 운영 절차 문서:
- `docs/real-dev-workflow.md`

요약 흐름:
1. Plan 이슈 생성
2. Code 이슈 생성
3. 브랜치에서 구현
4. PR 생성 (이슈 링크/테스트/롤백 포함)
5. `sdlc-pr-gate` + required checks 통과
6. 필요 시 Operate/Govern/Models 후속 이슈 연결

## 7. PR 템플릿과 자동 게이트

PR 템플릿:
- `.github/pull_request_template.md`

필수 입력 필드:
- SDLC Stage 체크
- Stage issue link(s)
- Test evidence
- Rollback plan

자동 강제:
- `.github/workflows/sdlc-pr-gate.yml`
- 필수값 누락 시 PR 체크 실패

## 8. Models 정책 자동화 (T0-T4)

정책 문서:
- `docs/cost-governance.md`
- `docs/kpi-metrics.md`

자동 게이트:
- `.github/workflows/model-routing-policy-gate.yml`

동작:
- `models` 라벨 이슈 감지
- T3/T4일 때 `approved-tech-lead` + `approved-security` + Approval Basis 검증
- 미충족 시 `policy-blocked` 라벨 + 자동 코멘트 + 실패
- 충족 시 `policy-approved` 라벨

## 9. CODEOWNERS / 승인 경계

파일:
- `.github/CODEOWNERS`

역할:
- 변경 경로별 리뷰 책임자 자동 지정
- Branch protection의 "Require review from Code Owners"와 함께 머지 게이트로 사용

## 10. 문서 인덱스

- 데모 실행/발표 스크립트: `demo-runbook.html`
- 시연 케이스: `docs/github-sdlc-cases.md`
- 단계별 증거 맵: `docs/sdlc-stage-evidence-map.md`
- GHAS 가이드: `docs/ghas-setup.md`
- 실개발 운영 가이드: `docs/real-dev-workflow.md`
- 발표자 클릭패스: `docs/seminar-demo-clickpath.md`
- 체크리스트: `docs/preflight-checklist.md`

## 11. 이 저장소를 템플릿으로 복제할 때 체크리스트

1. CODEOWNERS 계정/팀을 조직에 맞게 변경
2. 브랜치 보호 규칙에서 required checks 적용
3. Security & analysis에서 Secret scanning / Push protection 활성화
4. 이슈 템플릿의 도메인 문구를 팀 용어로 변경
5. `seed-sdlc-demo` 실행 후 이슈/라벨 생성 확인
6. `preflight-validate.sh` 실행으로 누락 항목 점검

## 12. 주의
- 기능/과금/권한 정책은 계약/플랜/조직 설정에 따라 달라질 수 있습니다.
- 이 저장소는 운영 템플릿 예시이며, 실제 규제 요구사항은 별도 보완이 필요합니다.
