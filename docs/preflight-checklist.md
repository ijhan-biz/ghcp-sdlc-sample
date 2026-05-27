# Preflight Checklist (기능/과금/권한 3축)

## 기능 (Feature)
- [x] Required checks 4종 워크플로 정의가 존재한다 (강제 적용은 Access 항목에서 확인).
- [x] SDLC 8단계가 웹 페이지와 문서에 모두 반영되어 있다.
- [x] CodeQL 워크플로가 활성화되어 있다.
- [x] SLO monitor 워크플로가 존재한다.

## 과금 (Billing)
- [ ] Premium 모델 사용 정책(기본 <= 30%)이 문서화되어 있다.
- [ ] 팀별 budget alert 기준(70/90%)을 설정했다.
- [ ] 고비용 작업 상위 목록을 주간 리뷰한다.

## 권한 (Access)
- [x] CODEOWNERS가 설정되어 있다.
- [ ] Branch protection에서 Required checks를 강제한다.
- [ ] Enforce admins 옵션이 활성화되어 있다.

## 승인 정보
- 승인자(Tech Lead):
- 승인자(Security):
- 승인 시각:

참고: Branch protection/Enforce admins는 저장소 설정 항목으로, 하네스에서 API 기반 점검을 시도한다.
참고: SLO alert는 .github/workflows/slo-monitor.yml에서 Issue 생성으로 기본 경보를 제공한다.
