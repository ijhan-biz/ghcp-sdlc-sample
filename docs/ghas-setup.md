# GHAS Setup Guide

이 저장소는 GHAS 핵심 기능을 다음 기준으로 운영합니다.

## 1. Code Scanning (CodeQL)
- 워크플로: .github/workflows/codeql.yml
- 구성: .github/codeql/codeql-config.yml
- 권장: main 브랜치 머지 전 codeql / analyze 필수

## 2. Dependency Review
- 워크플로: .github/workflows/dependency-review.yml
- 기준: high 이상 취약 의존성은 PR 실패 처리
- 권장: Required check로 dependency-review / dependency-review 지정

## 3. Secret Scanning / Push Protection
- 저장소 Settings > Security & analysis에서 활성화
- 권장 옵션:
  - Secret scanning: ON
  - Push protection: ON
  - Validity checks: ON (가능한 플랜에서)

## 4. 운영 정책
- 보안 이슈 발생 시 incident 이슈 생성 후 runbook 적용
- 예외 승인은 docs/exception-approval-template.md로 기록
- 주간 리뷰에서 CodeQL alert, dependency review 실패 이력 점검

## 5. 5중 방어선 맵
| 방어선 | GitHub 증거 | 운영 기준 |
| --- | --- | --- |
| Code review | Pull Request + CODEOWNERS | owner 승인 없는 머지 금지 |
| CodeQL / Code scanning | .github/workflows/codeql.yml | codeql / analyze green |
| Secret scanning | Security & analysis 설정 | push protection 활성 |
| Enterprise controls | branch protection, required checks | 우회 권한 최소화 |
| Cloud Agent Governance | 정책 문서 + 예외 승인 이력 | 승인자/만료일/로그 제출 필수 |
