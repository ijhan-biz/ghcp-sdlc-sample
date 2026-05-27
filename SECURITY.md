# Security Policy

이 저장소는 GitHub-native SDLC 데모를 위한 샘플입니다.

## Supported Versions

| Version | Supported |
| --- | --- |
| main | Yes |

## Reporting a Vulnerability

보안 이슈를 발견하면 공개 이슈로 올리지 말고 아래 절차를 따르세요.

1. 저장소의 Security 탭에서 private vulnerability report를 사용합니다.
2. 재현 단계, 영향 범위, PoC(가능하면 최소 재현 코드)를 포함합니다.
3. 민감정보(토큰, 키, 고객 데이터)는 절대 첨부하지 않습니다.

운영 원칙:
- 초기 응답 목표: 2 business days
- 심각도 분류: low / medium / high / critical
- 고위험 항목은 패치 배포 전까지 공개 금지

## GHAS Demo Scope

라이브 데모 시 아래 항목을 확인합니다.

- CodeQL workflow: .github/workflows/codeql.yml
- Dependency Review workflow: .github/workflows/dependency-review.yml
- 5-layer guide: docs/ghas-setup.md

## Safe Demo Rules

- 데모 화면에는 실제 비밀값을 사용하지 않습니다.
- 외부 공유 시 로그/스크린샷에서 계정 식별정보를 마스킹합니다.
- 승인되지 않은 외부 도구는 .github/ISSUE_TEMPLATE/tool-exception-request.yml 로 예외 승인 후 사용합니다.
