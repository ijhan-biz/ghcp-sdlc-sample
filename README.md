# GitHub SDLC 8 Demo Showcase

KT 리더 세미나 레퍼런스를 바탕으로, GitHub-native SDLC 8단계를 시연하는 정적 웹 프로젝트입니다.

## Demo 목표
- SDLC 8단계(Plan, Code, Review & Test, Build & Deploy, Operate, Modernize, Govern, Models)를 한 화면에서 설명
- 단계별 Demo, Gate, KPI 비교
- GitHub 정책 파일과 CI/GHAS 게이트로 SDLC 운영 통제 시연

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

## 운영 원칙
- 표준: GitHub-native SDLC 경로
- 예외: 목적/기간/비용 상한을 가진 조건부 승인
- 보안: GHAS + Required checks 통과 전 merge 금지
- 감사: AI-assisted PR 라벨과 증적 필수

## 도메인
- 기본 URL: https://your-org.github.io/ghcp-sdlc-sample/
- 후보는 docs/domain-candidates.md 참고

## 검증 하네스
```bash
./scripts/preflight-validate.sh
```

## 주의
기능/과금/권한 정책은 계약 전 GitHub 공식 문서와 조직 설정에서 재확인해야 합니다.
