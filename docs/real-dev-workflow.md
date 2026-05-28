# Real Development Workflow (SDLC 8 Stages)

이 문서는 데모용 SDLC 흐름을 실제 코드 개발에 적용하는 운영 절차입니다.

## 목적
- 기능 구현 전에 승인 기준을 먼저 고정한다.
- PR 머지 전에 증거(이슈/테스트/롤백)를 자동으로 점검한다.
- 운영/보안/비용 이슈를 코딩 이후가 아니라 개발 흐름 안에서 처리한다.

## 권장 사용 시나리오 (변경 1건 기준)
1. Plan 이슈 생성
2. Code 이슈 생성
3. 브랜치 생성 후 코드 변경
4. PR 생성 (이슈 링크 + 테스트 + 롤백 포함)
5. Review & Test 통과
6. Build & Deploy 확인
7. 필요 시 Operate/Modernize/Govern/Models 후속 이슈 연결

## 상세 절차

### 1) Plan 이슈 생성 (착수 전)
- 템플릿: `.github/ISSUE_TEMPLATE/plan-change.yml`
- 최소 입력:
  - Given/When/Then
  - 수용 기준(AC)
  - 롤백 조건

완료 기준:
- 요구사항이 리뷰 가능한 단위로 분해됨
- Stop condition이 명확함

### 2) Code 이슈 생성 (구현 시작)
- 템플릿: `.github/ISSUE_TEMPLATE/code-change.yml`
- 최소 입력:
  - DDD 변경 범위(Domain/Application/Infrastructure)
  - 테스트 증거 계획

완료 기준:
- 변경 범위와 테스트 방법이 연결됨

### 3) 브랜치/커밋
예시:
```bash
git checkout -b feat/incident-priority-<plan-issue-number>
```

권장:
- 하나의 PR은 하나의 목적만 담는다.
- 대형 변경은 Modernize 슬라이스로 분할한다.

### 4) PR 생성 (필수 증거 포함)
- 템플릿: `.github/pull_request_template.md`
- 필수 입력:
  - Stage 체크(최소 1개)
  - Stage Issue link(s)
  - Test evidence
  - Rollback plan

자동 게이트:
- 워크플로: `.github/workflows/sdlc-pr-gate.yml`
- 위 필드가 비어 있으면 PR 체크가 실패한다.

### 5) Review & Test
- CODEOWNERS 승인 확인
- Required checks 통과 확인

관련 파일:
- `.github/CODEOWNERS`
- `.github/workflows/ci.yml`

### 6) Build & Deploy
- CI 결과와 로그 확인
- 실패 시 원인/조치/재발방지를 PR 또는 이슈에 기록

### 7) Govern / Models (필요 시)
- 예외 승인: `.github/ISSUE_TEMPLATE/tool-exception-request.yml`
- 모델 정책: `.github/ISSUE_TEMPLATE/model-routing-review.yml`

자동 정책 게이트:
- `.github/workflows/model-routing-policy-gate.yml`
- T3/T4 premium 요청은 승인 라벨과 근거가 없으면 `policy-blocked` 처리

## 운영 체크리스트
- [ ] Plan/Code 이슈가 존재하고 PR 본문에 연결되어 있는가
- [ ] 테스트 증거와 롤백 계획이 PR에 명시되어 있는가
- [ ] Required checks + CODEOWNERS가 통과했는가
- [ ] 보안/예외/모델 사용 관련 후속 이슈가 필요한가

## 관련 문서
- `docs/github-sdlc-cases.md`
- `docs/sdlc-stage-evidence-map.md`
- `docs/cost-governance.md`
- `docs/preflight-checklist.md`