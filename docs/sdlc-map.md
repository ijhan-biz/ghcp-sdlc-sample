# SDLC 8 단계 맵

## 1. Plan
- Demo: Issue를 AC/Edge case/Test 아이디어로 변환
- Gate: PO/팀장 승인
- KPI: AC 링크 누락 0

## 2. Code
- Demo: 기능 변경 + 테스트 코드 생성
- Gate: Repo instructions 준수
- KPI: 테스트 추가율 >= 60%

## 3. Review & Test
- Demo: PR 위험 요약, 테스트 보완 제안
- Gate: CODEOWNERS + Required checks
- KPI: Required checks pass 100%

## 4. Build & Deploy
- Demo: Actions 실패 로그 요약
- Gate: 배포 워크플로 변경 owner 승인
- KPI: 배포 실패율 < 5%

## 5. Operate
- Demo: Incident 로그 기반 runbook 액션
- Gate: 운영 원문 로그 입력 금지
- KPI: MTTR <= 15m

## 6. Modernize
- Demo: Deprecated API 교체 후보 생성
- Gate: Rollback 조건 명시
- KPI: PR series 완료율 >= 80%

## 7. Govern
- Demo: AI PR 라벨 + 감사 로그 연결
- Gate: 예외 승인 이력 보존
- KPI: AI PR 라벨링 >= 95%

## 8. Models
- Demo: T0-T4 작업 등급별 모델 라우팅
- Gate: Premium 모델 승인
- KPI: Premium 사용률 <= 30%
