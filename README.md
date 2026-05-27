# FieldOps Incident Portal SDLC Guide

통신망 장애 대응 포털(FieldOps Incident Portal)을 가정하고, GitHub-native SDLC 8단계를 운영 관점으로 보여주는 정적 웹 프로젝트입니다.

## 목표
- SDLC 8단계(Plan, Code, Review & Test, Build & Deploy, Operate, Modernize, Govern, Models)를 한 화면에서 설명
- 단계별 도메인 케이스(Demo), 통제(Gate), 지표(KPI) 비교
- GitHub 탭(Issues, PR, Actions, Security)에서 바로 보여줄 수 있는 시연 동선 제공

## 로컬 실행
```bash
python3 -m http.server 8080
# 브라우저: http://127.0.0.1:8080/index.html
```

## 필수 Required Checks
- ci / html-validate
- ci / links-check
- ci / smoke-test
- codeql / analyze
- dependency-review / dependency-review

## GHAS 설정
- 설정 가이드: docs/ghas-setup.md
- CodeQL 워크플로: .github/workflows/codeql.yml
- CodeQL 구성: .github/codeql/codeql-config.yml
- Dependency Review 워크플로: .github/workflows/dependency-review.yml
- Secret scanning / Push protection: Repository Settings > Security & analysis에서 활성화

## GitHub 직접 시연 케이스
- 케이스 문서: docs/github-sdlc-cases.md
- Stage 증적 맵: docs/sdlc-stage-evidence-map.md
- Plan/Operate/Modernize/Models 템플릿: .github/ISSUE_TEMPLATE/
- 자동 이슈 생성: .github/workflows/seed-sdlc-demo.yml (Actions에서 실행)
- Review/Test 증적: .github/CODEOWNERS, .github/pull_request_template.md
- Build/Deploy 증적: .github/workflows/ci.yml
- Govern/Models 증적: docs/governance-policy.md, docs/kpi-metrics.md, .github/workflows/slo-monitor.yml

## SDLC 8단계 시연 가이드
시작 전 준비:
- GitHub Actions에서 .github/workflows/seed-sdlc-demo.yml 실행
- Issues에서 label:sdlc-demo 검색

1. Plan
- 위치: Issues
- 확인: .github/ISSUE_TEMPLATE/plan-change.yml
- 시연 포인트: Given/When/Then, AC, rollback 항목이 채워진 계획 이슈

2. Code
- 위치: Files / Commits
- 확인: src/domain/incidents/, src/application/use-cases/, src/infrastructure/repositories/
- 시연 포인트: DDD 레이어 분리(도메인 규칙, 유스케이스, 저장소 구현)

3. Review & Test
- 위치: Pull Requests
- 확인: .github/pull_request_template.md, .github/CODEOWNERS
- 시연 포인트: 리뷰 체크리스트, owner review, required checks 상태

4. Build & Deploy
- 위치: Actions
- 확인: .github/workflows/ci.yml
- 시연 포인트: html-validate, links-check, smoke-test 결과와 로그

5. Operate
- 위치: Issues
- 확인: .github/ISSUE_TEMPLATE/incident-report.yml
- 시연 포인트: incident_start/end, T+0/T+5/T+10 타임라인, 후속 조치

6. Modernize
- 위치: Issues / Pull Requests
- 확인: .github/ISSUE_TEMPLATE/modernize-slice.yml
- 시연 포인트: PR slice 계획과 rollback 조건

7. Govern
- 위치: Issues / Repository Files
- 확인: .github/ISSUE_TEMPLATE/governance-check.yml, docs/governance-policy.md
- 시연 포인트: 예외 승인 기준, 승인자, 만료 조건

8. Models
- 위치: Issues / Actions / Repository Files
- 확인: .github/ISSUE_TEMPLATE/model-routing-review.yml, docs/kpi-metrics.md, .github/workflows/slo-monitor.yml
- 시연 포인트: 작업 등급별 모델 정책, SLO breach 자동 이슈 흐름

## DDD 코드 구조
- 아키텍처 문서: docs/ddd-architecture.md
- Domain: src/domain/incidents/
- Application: src/application/use-cases/
- Infrastructure: src/infrastructure/repositories/
- 스모크 테스트: node scripts/ddd-smoke.js

## BDD 이슈 작성 규칙
- Plan/Incident 이슈는 Given / When / Then 시나리오를 반드시 포함합니다.
- 템플릿: .github/ISSUE_TEMPLATE/plan-change.yml, .github/ISSUE_TEMPLATE/incident-report.yml

## 운영 원칙
- 표준: GitHub-native SDLC 경로
- 예외: 목적/기간/비용 상한을 가진 조건부 승인
- 보안: GHAS + Required checks 통과 전 merge 금지
- 감사: AI-assisted PR 라벨과 증적 필수

## 도메인 가정
- 서비스 도메인: fieldops-incident.internal
- 기본 URL: https://your-org.github.io/ghcp-sdlc-sample/

## 검증 하네스
```bash
./scripts/preflight-validate.sh
```

## 주의
기능/과금/권한 정책은 계약 전 GitHub 공식 문서와 조직 설정에서 재확인해야 합니다.
