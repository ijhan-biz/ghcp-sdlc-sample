# Seminar Demo Clickpath

## 10분 버전 (핵심만)
1. Actions: seed-sdlc-demo 실행 결과 확인
2. Issues: label:sdlc-demo로 8단계 이슈 확인
3. Pull Requests: required checks + CODEOWNERS 확인
4. Actions: 성공/실패 run 로그 1개씩 확인
5. Security: CodeQL 또는 dependency review 결과 확인

## 15분 버전 (권장)
1. Actions: seed-sdlc-demo 실행
2. Issues: Plan 이슈(BDD + AC + rollback) 설명
3. PR: AI-assisted evidence + required checks 설명
4. Actions: 실패 로그를 다음 입력으로 바꾸는 흐름 설명
5. Security: GHAS 게이트 설명
6. Docs: governance-policy, cost-governance, kpi-metrics 설명
7. Checklist: preflight-checklist로 Go/No-Go 기준 설명

## 25분 버전 (심화)
1. 15분 버전 전체 수행
2. DDD 코드 구조(src/domain, application, infrastructure) 직접 열어 설명
3. tool-exception-request 이슈 템플릿으로 예외 승인 시연
4. slo-monitor 결과 이슈로 운영 루프 설명
5. cost-governance와 models 이슈를 연결해 비용 의사결정 설명

## 발표 문장 템플릿
- "개발 작업은 채팅이 아니라 GitHub 증거로 남깁니다."
- "AI PR은 완성이 아니라 리뷰 요청입니다."
- "실패 로그는 우회가 아니라 다음 입력입니다."
- "비용은 금지가 아니라 라우팅과 승인으로 관리합니다."

## Fallback
- Actions가 지연되면 docs/sdlc-stage-evidence-map.md를 먼저 보여준다.
- Security 탭 권한이 없으면 docs/ghas-setup.md로 대체 설명한다.
- 데모 PR이 없으면 pull_request_template과 CODEOWNERS 파일을 직접 연다.
