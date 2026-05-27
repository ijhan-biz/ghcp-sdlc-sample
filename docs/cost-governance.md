# Cost Governance Guide

이 문서는 SDLC Models 단계에서 리더가 비용을 설명 가능하게 관리하기 위한 기준을 정리합니다.

## 핵심 원칙
- 비용이 높은 것이 문제가 아니라, 높은 이유를 설명하지 못하는 것이 문제다.
- 모델 선택은 성능만이 아니라 작업 등급, 보안, 승인, 예산을 함께 본다.
- premium 사용은 기본값이 아니라 승인 기반 예외로 운영한다.

## 작업 등급(T0-T4)
- T0: 단순 문서/포맷 정리
- T1: 제한된 코드 설명/요약
- T2: 일반 기능 개발, 테스트 보완
- T3: 보안 민감 변경, 복잡 리팩터링
- T4: 규제/고위험 영역 설계

## 모델 라우팅 기본값
- T0-T1: 기본 모델
- T2: 기본 모델 우선, 필요 시 승격
- T3-T4: 승인 후 premium 모델 허용

## Premium 승인 기준
- 승인자: Tech Lead + Security
- 필수 근거: 작업 복잡도, 예상 이득, 대체 가능성
- 필수 기록: 요청자, 기간, 비용 상한, 종료 조건

## 자동 적용 방식 (Policy Gate)
- `.github/workflows/model-routing-policy-gate.yml`가 `models` 라벨 이슈를 자동 점검한다.
- T3/T4 요청은 아래 3가지가 모두 있어야 통과한다.
	- `approved-tech-lead` 라벨
	- `approved-security` 라벨
	- `Approval Basis` 본문 근거(최소 길이)
- 요건 미충족 시 `policy-blocked` 라벨이 붙고, 충족 시 `policy-approved` 라벨로 전환된다.
- 차단/통과 결과는 이슈 코멘트로 자동 기록되어 감사 증거로 남는다.

## Budget Alert 운영
- 70%: 팀 리더 알림, 상위 작업 재분류
- 90%: 승인 없는 premium 사용 중단
- 100%: hard stop 또는 예외 승인 후 재개

## 주간 Usage Review
- 상위 10개 고비용 작업 확인
- 실패 후 반복 재시도 패턴 확인
- premium 사용률과 forecast 오차 리뷰
- 다음 주 라우팅 정책 업데이트

## 시연 포인트
- Models 이슈에서 작업 등급과 승인 근거를 확인한다.
- KPI 문서에서 premium 사용률, forecast 오차를 함께 보여준다.
- SLO breach 이슈와 비용 라벨을 연결해 설명한다.
