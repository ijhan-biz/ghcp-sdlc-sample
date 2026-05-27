# DDD Architecture (FieldOps Incident Portal)

## 목적
이 저장소의 예시 코드는 Domain-Driven Design(DDD) 원칙을 따릅니다.

## 레이어
- Domain: 핵심 비즈니스 규칙
  - src/domain/incidents/Incident.js
  - src/domain/incidents/IncidentPriorityPolicy.js
  - src/domain/incidents/IncidentRepository.js
- Application: 유스케이스 오케스트레이션
  - src/application/use-cases/RegisterIncidentUseCase.js
  - src/application/use-cases/ResolveIncidentUseCase.js
- Infrastructure: 기술 구현체
  - src/infrastructure/repositories/InMemoryIncidentRepository.js

## 핵심 규칙
- Incident 엔티티는 OPEN/CLOSED 전이를 직접 관리한다.
- 우선순위 계산은 IncidentPriorityPolicy로 분리한다.
- 유스케이스는 Repository 인터페이스만 의존한다.

## 로컬 검증
```bash
node scripts/ddd-smoke.js
```
