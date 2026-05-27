# KPI / SLO Metrics Definition

## 공통 집계 규칙
- 집계 윈도우: 최근 28일
- 집계 주기: 주간
- 데이터 소스: GitHub Actions runs + Incident Issues

## 핵심 지표
1. checks pass율
- 공식: passed_required_checks / total_required_checks
- 목표: 100%

2. 배포 실패율
- 공식: failed_deploys / total_deploys
- 목표: < 5%

3. MTTR
- 공식: sum(incident_end - incident_start) / incident_count
- 목표: <= 15분

4. AI PR 라벨링율
- 공식: ai_labeled_pr_count / total_ai_assisted_pr_count
- 목표: >= 95%

5. Premium 사용률
- 공식: premium_requests / total_model_requests
- 목표: <= 30% (기본)

6. Forecast 오차
- 공식: abs(actual_cost - forecast_cost) / forecast_cost
- 목표: <= 20%

7. Budget Alert 기준
- 70%: 리더 알림 + 상위 비용 작업 재분류
- 90%: 승인 없는 premium 사용 중지

## 에러 버짓 규칙
- SLO 미달이 2주 연속 발생하면 기능 변경 동결
- 동결 해제는 Tech Lead + Security 승인
