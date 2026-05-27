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

## GitHub 직접 시연 케이스
- 케이스 문서: docs/github-sdlc-cases.md
- Plan/Operate 템플릿: .github/ISSUE_TEMPLATE/
- Review/Test 증적: .github/CODEOWNERS, .github/pull_request_template.md
- Build/Deploy 증적: .github/workflows/ci.yml
- Govern/Models 증적: docs/governance-policy.md, docs/kpi-metrics.md, .github/workflows/slo-monitor.yml

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
