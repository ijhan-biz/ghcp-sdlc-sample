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
