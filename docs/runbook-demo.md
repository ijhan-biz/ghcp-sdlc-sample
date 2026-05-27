# Demo Incident Runbook

## 역할
- Incident Commander (IC): Repo Maintainer
- Comms: Seminar PM
- Escalation: Security + Platform

## 커뮤니케이션 채널
- Primary: GitHub Issue (label: incident)
- Secondary: Teams/Slack #seminar-ops

## 트리거
- Required checks 실패
- 데모 페이지 미응답
- 보안 스캔 fail

## 대응 절차
1. 2분 내 신규 변경 중단 및 상태 공유
2. 직전 green commit으로 롤백
3. smoke-test 재실행
4. 복구 여부 확인 후 발표 동선 재개
5. 사후 15분 내 incident 기록

## 에스컬레이션 타임라인
- T+0m: IC가 incident 선언
- T+5m: 복구 미완료 시 Security/Platform 에스컬레이션
- T+10m: 백업 URL로 발표 전환 여부 결정

## 종료 조건
- 페이지 접근 정상
- Required checks green
- IC와 Comms가 종료 승인
