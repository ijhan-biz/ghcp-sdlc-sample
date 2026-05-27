# ghcp-sdlc-sample 시연 개선안

작성일: 2026-05-28  
대상 저장소: <https://github.com/ijhan-biz/ghcp-sdlc-sample>  
목적: `KT-리더세미나-GitHub-Copilot-SDLC전략 (3).pptx`의 22장 흐름에 맞춰, 리더 대상 80분 세미나에서 GitHub-native SDLC, GHAS 통제, 비용 거버넌스, 예외 승인 논리를 자연스럽게 보여주는 시연 품질을 높인다.

## 1. 현재 저장소의 강점

`ghcp-sdlc-sample`은 이미 리더 세미나 시연에 맞는 뼈대가 잘 잡혀 있다.

- 정적 데모 페이지 `index.html`과 `assets/app.js`가 SDLC 8단계를 한 화면에서 설명한다.
- `.github/ISSUE_TEMPLATE/` 아래에 Plan, Code, Review & Test, Build & Deploy, Operate, Modernize, Govern, Models용 이슈 템플릿이 있다.
- `.github/workflows/seed-sdlc-demo.yml`로 SDLC 8단계 데모 이슈를 자동 생성할 수 있다.
- `.github/workflows/ci.yml`, `codeql.yml`, `dependency-review.yml`이 Required checks와 GHAS 시연 근거를 제공한다.
- `docs/sdlc-stage-evidence-map.md`, `docs/github-sdlc-cases.md`, `docs/governance-policy.md`, `docs/kpi-metrics.md`, `docs/runbook-demo.md`가 리더 설명에 필요한 증적 맵을 제공한다.
- `scripts/preflight-validate.sh`가 SDLC, CI, CodeQL, Dependency Review, 정책 파일, DDD 코드 구조를 검증한다.

현재 상태는 “SDLC 8단계가 GitHub 어디에 매핑되는가”를 보여주기에 충분하다. 다만 세미나 PPT의 핵심 스토리인 “개발 조직의 OS를 바꾸는 결정”을 더 강하게 보여주려면 시연 동선과 증거 화면을 조금 더 리더 친화적으로 정리하는 것이 좋다.

## 2. 시연 목표 재정의

기존 데모 목표가 “SDLC 8단계 설명”이라면, 리더 세미나용 목표는 아래처럼 바뀌어야 한다.

| 구분 | 기존 메시지 | 개선 후 메시지 |
| --- | --- | --- |
| 도구 | GitHub에서 SDLC 8단계를 보여준다 | GitHub가 개발 조직의 system of record임을 보여준다 |
| Copilot | 코드 생성과 이슈/PR 보조 | Copilot은 execution layer이고, 사람과 정책이 승인 경계임을 보여준다 |
| GHAS | 보안 워크플로가 있다 | AI PR이 많아질수록 GHAS와 Required checks가 더 중요해진다는 것을 보여준다 |
| 비용 | 모델 라우팅 문서가 있다 | T0~T4, premium 승인, budget alert, usage review가 비용 OS임을 보여준다 |
| 예외 | 예외 승인 문서가 있다 | 개별 도구 요청을 반려/승인하는 리더 논리를 보여준다 |
| 결과 | 데모 페이지가 있다 | 90일 파일럿 Go/No-Go 판단 근거를 남긴다 |

## 3. 권장 시연 흐름

80분 리더 세미나 중 실제 GitHub 시연은 10~12분 안에 끝나는 것이 좋다. 슬라이드 12~16 구간에서 아래 순서로 보여준다.

### 3.1 사전 준비

1. Actions 탭에서 `seed-sdlc-demo` 실행
2. `close_existing=true`로 기존 데모 이슈 종료 후 새 이슈 생성
3. Issues에서 `label:sdlc-demo` 검색 화면 준비
4. Pull Requests 탭에 데모 PR 1개 준비
5. Actions 탭에 성공/실패 로그 각 1개 준비
6. Security 탭 또는 CodeQL/Dependency Review workflow 화면 준비
7. Repository file view에서 `docs/governance-policy.md`, `docs/kpi-metrics.md`, `docs/sdlc-stage-evidence-map.md` 준비

### 3.2 발표 중 시연 순서

| 시간 | 화면 | 보여줄 것 | 말할 메시지 |
| --- | --- | --- | --- |
| 1분 | Issues | `label:sdlc-demo`로 8개 이슈 표시 | “Plan부터 Models까지 GitHub Issue로 기록이 남습니다.” |
| 1분 | Plan Issue | Given/When/Then, AC, rollback | “AI에게 바로 맡기기 전 작업 계약이 먼저입니다.” |
| 1분 | PR | PR template, AI-assisted label, CODEOWNERS | “AI PR은 완성이 아니라 리뷰 요청입니다.” |
| 2분 | Actions | `ci / html-validate`, `links-check`, `smoke-test` | “실패 로그는 우회 대상이 아니라 다음 입력입니다.” |
| 2분 | Security/GHAS | CodeQL, dependency review, secret scanning 안내 | “AI 변경이 많아질수록 보안 gate가 더 중요합니다.” |
| 1분 | Docs | `governance-policy.md`, `exception-approval-template.md` | “개별 도구 요청은 표준/예외 정책으로 답합니다.” |
| 1분 | Models/KPI | `kpi-metrics.md`, SLO monitor | “비용은 사용 금지가 아니라 model routing과 budget으로 관리합니다.” |
| 1분 | Roadmap | `preflight-checklist.md` | “이 체크리스트를 90일 파일럿의 Go/No-Go 기준으로 씁니다.” |

## 4. 개선 우선순위

### P0. 리더 시연용 랜딩 화면 강화

현재 `index.html`은 SDLC 8단계 카드 중심이다. 리더 대상 시연에서는 첫 화면에 “개발 조직의 OS” 메시지가 더 직접적으로 보여야 한다.

권장 변경:

- `index.html` hero 문구를 세미나 PPT와 맞춘다.
- `84분 → 20분`, `표준은 Copilot`, `통제는 GHAS`, `확산은 90일` 같은 경영 메시지를 3~4개 KPI 카드로 추가한다.
- SDLC 8단계 카드 위에 “GitHub = 기록 체계, Copilot = 실행 보조, 사람/정책 = 승인 경계” 구조를 넣는다.

예상 파일:

- `index.html`
- `assets/styles.css`
- `assets/app.js`

Acceptance criteria:

- 첫 화면에서 “개발 조직의 OS” 메시지가 보인다.
- `Plan`, `Review & Test`, `Govern`이 90일 파일럿 우선 단계로 강조된다.
- 리더가 “왜 GitHub-native인가”를 첫 화면에서 이해할 수 있다.

### P0. 데모 PR과 실패/성공 Actions 증거 추가

현재 문서에는 PR과 checks를 설명하지만, 발표자가 바로 열 수 있는 대표 PR과 실패 로그가 명시되어 있지 않다.

권장 변경:

- 데모용 PR 1개를 준비한다.
- PR body에 `AI-assisted`, AC, test evidence, rollback 조건을 채운다.
- Actions에 성공 run과 실패 run이 각각 보이도록 demo branch를 준비한다.
- `docs/github-sdlc-cases.md`에 실제 PR 번호와 Actions run 링크를 적을 수 있는 placeholder를 만든다.

예상 파일:

- `.github/pull_request_template.md`
- `.github/workflows/ci.yml`
- `docs/github-sdlc-cases.md`
- `docs/runbook-demo.md`

Acceptance criteria:

- 발표자가 PR 화면에서 CODEOWNERS, Required checks, AI-assisted evidence를 60초 안에 설명할 수 있다.
- 실패 로그가 하나 이상 준비되어 “실패는 다음 입력” 메시지를 보여줄 수 있다.

### P0. `seed-sdlc-demo` 이슈 본문을 리더 질문 중심으로 보강

현재 seed workflow의 이슈는 Given/When/Then 중심이다. 리더 세미나에서는 각 이슈에 “리더 질문”과 “멈춤 기준”이 함께 있어야 한다.

권장 변경:

각 stage issue body에 아래 필드를 추가한다.

```markdown
## Leader question
- 이 단계에서 리더가 승인해야 할 질문

## Stop condition
- 이 증거가 없으면 다음 단계로 넘기지 않음

## Evidence link
- 관련 파일, PR, Actions, Security 탭 링크
```

예상 파일:

- `.github/workflows/seed-sdlc-demo.yml`
- `docs/sdlc-stage-evidence-map.md`

Acceptance criteria:

- 생성된 8개 이슈가 모두 Leader question, Stop condition, Evidence link를 포함한다.
- 슬라이드 15의 리더 토크트랙과 GitHub Issue 내용이 1:1로 대응한다.

### P1. GHAS 시연 깊이 강화

현재 GHAS 설정 문서와 workflow는 있지만, “5중 방어선” 스토리와 직접 연결되는 화면 구성이 부족하다.

권장 변경:

- `docs/ghas-setup.md`에 5중 방어선 맵 추가
- Code review, CodeQL/Code scanning, Secret scanning, Enterprise controls, Cloud Agent Governance를 하나의 표로 정리
- `docs/sdlc-stage-evidence-map.md`의 Review & Test, Govern 단계에 GHAS 증거 링크 추가
- `preflight-validate.sh`에 `docs/ghas-setup.md`가 5중 방어선 키워드를 포함하는지 확인 추가

예상 파일:

- `docs/ghas-setup.md`
- `docs/sdlc-stage-evidence-map.md`
- `scripts/preflight-validate.sh`

Acceptance criteria:

- 발표자가 “AI 변경이 많아질수록 GHAS가 중요해진다”를 문서와 workflow로 동시에 보여줄 수 있다.
- `preflight-validate.sh`가 GHAS 5중 방어선 문구를 검증한다.

### P1. 비용 거버넌스 데모 강화

현재 `docs/kpi-metrics.md`에는 Premium 사용률이 있지만, 리더에게 보여줄 비용 관리 화면이 더 필요하다.

권장 변경:

- `docs/cost-governance.md` 신규 추가
- T0~T4 작업 등급, 모델 기본값, premium 승인 조건, budget alert 70/90%, weekly usage review를 정리
- `assets/app.js`의 Models 단계 상세에 비용 경보와 premium 사용률 설명 추가
- `slo-monitor.yml`이 SLO breach issue를 만들 때 비용 관련 label도 붙이도록 확장

예상 파일:

- `docs/cost-governance.md`
- `docs/kpi-metrics.md`
- `.github/workflows/slo-monitor.yml`
- `assets/app.js`

Acceptance criteria:

- Models 단계에서 “비용이 높은 것이 아니라 설명되지 않는 것이 문제”라는 메시지를 보여줄 수 있다.
- Premium 사용률, forecast 오차, budget alert를 한 화면에서 설명할 수 있다.

### P1. 예외 승인 시나리오를 실제 Issue 템플릿으로 강화

현재 `docs/exception-approval-template.md`가 있지만, 실제 GitHub Issue 템플릿으로 연결되면 시연성이 높아진다.

권장 변경:

- `.github/ISSUE_TEMPLATE/tool-exception-request.yml` 신규 추가
- 필드: 요청 도구, 목적, 기간, 비용 상한, 데이터 분류, SSO 여부, 로그 제출, 종료 기준, 승인자
- `seed-sdlc-demo`에 Govern 단계 이슈에서 이 템플릿 링크를 안내

예상 파일:

- `.github/ISSUE_TEMPLATE/tool-exception-request.yml`
- `docs/governance-policy.md`
- `docs/exception-approval-template.md`

Acceptance criteria:

- 리더가 “개별 도구 요청은 반려가 아니라 조건부 예외 승인”이라고 GitHub 화면에서 보여줄 수 있다.
- 승인 없는 외부 도구 사용이 No-Go임을 명확히 설명할 수 있다.

### P2. 발표자 모드용 데모 런북 보강

현재 `docs/runbook-demo.md`는 장애 대응 런북에 가깝다. 발표자가 실제 세미나 중 따라갈 “클릭 순서”가 별도 필요하다.

권장 변경:

- `docs/seminar-demo-clickpath.md` 신규 추가
- 10분 버전, 15분 버전, 25분 버전 시연 경로 제공
- 각 단계에 GitHub 탭, 클릭 위치, 말할 문장, fallback을 적는다.

예상 파일:

- `docs/seminar-demo-clickpath.md`
- `README.md`

Acceptance criteria:

- 발표자가 GitHub UI에서 길을 잃지 않고 10분 안에 핵심 메시지를 전달할 수 있다.
- 네트워크나 권한 문제가 있을 때 보여줄 fallback 문서가 명확하다.

## 5. 15분 권장 시연 스크립트

리더 세미나 중 실제 GitHub 화면을 보여줄 시간이 15분이라면 아래 흐름을 권장한다.

1. Actions → `seed-sdlc-demo` 실행 결과
   - “이 저장소는 SDLC 8단계가 Issue로 남도록 만들었습니다.”

2. Issues → `label:sdlc-demo`
   - “개발 작업은 채팅이 아니라 기록 가능한 Issue 계약으로 시작합니다.”

3. Plan Issue
   - “AC, rollback, leader question이 없으면 Copilot 할당 전 단계로 돌아갑니다.”

4. Pull Request
   - “AI PR은 완성이 아니라 리뷰 요청입니다. CODEOWNERS와 Required checks가 멈춤 버튼입니다.”

5. Actions
   - “실패 로그는 우회하지 않습니다. 다음 Copilot 입력으로 바꿉니다.”

6. Security / CodeQL / Dependency Review
   - “AI 변경이 많아질수록 GHAS의 가치가 커집니다.”

7. `docs/governance-policy.md`
   - “개별 도구 요청은 표준과 예외 승인으로 관리합니다.”

8. `docs/kpi-metrics.md`
   - “비용은 금지가 아니라 attribution, model routing, budget alert로 관리합니다.”

9. `docs/preflight-checklist.md`
   - “90일 파일럿은 이 체크리스트가 green일 때만 확산합니다.”

## 6. 구현 순서 제안

| 순서 | 작업 | 예상 난이도 | 발표 효과 |
| --- | --- | --- | --- |
| 1 | seed issue body에 Leader question / Stop condition 추가 | 낮음 | 높음 |
| 2 | seminar demo clickpath 문서 추가 | 낮음 | 높음 |
| 3 | GHAS 5중 방어선 문서 보강 | 낮음 | 높음 |
| 4 | cost-governance 문서 추가 | 중간 | 높음 |
| 5 | tool exception request issue template 추가 | 중간 | 중간 |
| 6 | demo PR과 실패 Actions run 준비 | 중간 | 매우 높음 |
| 7 | index.html hero를 리더 메시지 중심으로 개편 | 중간 | 중간 |
| 8 | preflight harness에 새 문서/키워드 검증 추가 | 중간 | 중간 |

## 7. 완료 기준

아래 조건을 만족하면 리더 세미나용 시연 준비가 충분하다.

- `seed-sdlc-demo` 실행 후 8개 이슈가 생성된다.
- 각 이슈에 Leader question, Stop condition, Evidence link가 있다.
- 데모 PR 1개가 AI-assisted evidence와 required checks를 보여준다.
- Actions 성공/실패 화면이 각각 준비되어 있다.
- GHAS 5중 방어선 설명 문서가 있다.
- 비용 거버넌스 문서에 T0~T4, premium 승인, budget alert, weekly usage review가 있다.
- 예외 도구 요청 템플릿이 GitHub Issue로 존재한다.
- 발표자 clickpath 문서가 10분/15분/25분 버전을 제공한다.
- `./scripts/preflight-validate.sh`가 새 문서와 핵심 키워드를 검증한다.

## 8. 결론

`ghcp-sdlc-sample`은 이미 SDLC 8단계와 GitHub-native 증적을 보여줄 수 있는 좋은 샘플이다. 다음 개선의 핵심은 기능을 더 많이 넣는 것이 아니라, 리더 세미나의 질문에 맞춰 증거를 재배치하는 것이다.

가장 먼저 해야 할 일은 세 가지다.

1. 8개 seed issue에 리더 질문과 멈춤 기준을 추가한다.
2. GHAS 5중 방어선과 비용 거버넌스 문서를 보강한다.
3. 발표자용 clickpath와 데모 PR/Actions evidence를 준비한다.

이렇게 하면 세미나 메시지인 “개발 조직의 OS를 바꾸는 결정”을 GitHub 화면에서 바로 보여줄 수 있다.
