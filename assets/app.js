const stages = [
  {
    id: 1,
    name: "Plan",
    summary: "장애 유형과 접수 기준을 이슈로 명세",
    demo: "Issue Template로 장애 등급, 영향도, 수용기준 기록",
    gate: "이슈에 AC/NFR 누락 시 개발 착수 금지",
    kpi: "AC 누락 이슈 0건",
    evidenceLink: "https://github.com/ijhan-biz/ghcp-sdlc-sample/issues/new/choose",
    evidenceLabel: "Plan 증적 열기 (Issue Template)",
  },
  {
    id: 2,
    name: "Code",
    summary: "복구 로직과 SLA 계산 코드 변경",
    demo: "alert dedupe/priority 계산 함수 개선 커밋",
    gate: "작은 단위 커밋과 테스트 동시 제출",
    kpi: "테스트 추가율 >= 60%",
    evidenceLink: "https://github.com/ijhan-biz/ghcp-sdlc-sample/commits/main",
    evidenceLabel: "Code 증적 열기 (Commits)",
  },
  {
    id: 3,
    name: "Review & Test",
    summary: "복구 정책 변경은 리뷰/테스트 필수",
    demo: "PR에서 CODEOWNERS 승인과 회귀 테스트 검증",
    gate: "Required checks green + owner review",
    kpi: "Required checks pass 100%",
    evidenceLink: "https://github.com/ijhan-biz/ghcp-sdlc-sample/pulls",
    evidenceLabel: "Review 증적 열기 (Pull Requests)",
  },
  {
    id: 4,
    name: "Build & Deploy",
    summary: "Actions로 정적 포털 배포 파이프라인 운영",
    demo: "build/smoke 실패 로그를 근거로 수정 PR 생성",
    gate: "배포 워크플로 변경은 보안 승인 필요",
    kpi: "배포 실패율 < 5%",
    evidenceLink: "https://github.com/ijhan-biz/ghcp-sdlc-sample/actions/workflows/ci.yml",
    evidenceLabel: "Build 증적 열기 (CI Workflow)",
  },
  {
    id: 5,
    name: "Operate",
    summary: "Incident 이슈 기반 장애 대응",
    demo: "incident 라벨 이슈에서 T+0/T+5/T+10 타임라인 관리",
    gate: "런북 필드(원인/조치/복구시간) 누락 금지",
    kpi: "MTTR <= 15분",
    evidenceLink: "https://github.com/ijhan-biz/ghcp-sdlc-sample/issues?q=is%3Aissue+label%3Aincident",
    evidenceLabel: "Operate 증적 열기 (Incident Issues)",
  },
  {
    id: 6,
    name: "Modernize",
    summary: "노후 장애분류 모듈을 점진 교체",
    demo: "deprecated parser 제거를 PR 시리즈로 분할",
    gate: "각 PR에 rollback 체크 포함",
    kpi: "PR series 완료율 >= 80%",
    evidenceLink: "https://github.com/ijhan-biz/ghcp-sdlc-sample/issues?q=is%3Aissue+label%3Amodernize",
    evidenceLabel: "Modernize 증적 열기 (Modernize Issues)",
  },
  {
    id: 7,
    name: "Govern",
    summary: "권한/감사/예외승인 추적",
    demo: "AI-assisted 라벨 + 예외승인 템플릿 연결",
    gate: "예외는 Tech Lead + Security 공동 승인",
    kpi: "AI PR 라벨링 >= 95%",
    evidenceLink: "https://github.com/ijhan-biz/ghcp-sdlc-sample/issues/7",
    evidenceLabel: "Govern 증적 열기 (Issue #7)",
  },
  {
    id: 8,
    name: "Models",
    summary: "작업 등급별 모델 사용 정책",
    demo: "T0-T4 등급에 따라 모델과 budget 정책 적용",
    gate: "Premium 모델 사전 승인 + 사용 근거 기록",
    kpi: "Premium 사용률 <= 30%",
    evidenceLink: "https://github.com/ijhan-biz/ghcp-sdlc-sample/blob/main/docs/cost-governance.md",
    evidenceLabel: "Models 증적 열기 (Cost Governance)",
  },
];

const stageGrid = document.getElementById("stageGrid");
const stageDetail = document.getElementById("stageDetail");

function renderDetail(stage) {
  stageDetail.innerHTML = `
    <h3>${stage.id}. ${stage.name}</h3>
    <p>${stage.summary}</p>
    <div class="line"><strong>Demo:</strong> ${stage.demo}</div>
    <div class="line"><strong>Gate:</strong> ${stage.gate}</div>
    <div class="line"><strong>KPI:</strong> ${stage.kpi}</div>
    <div class="stage-link">
      <a href="${stage.evidenceLink}" target="_blank" rel="noopener noreferrer">${stage.evidenceLabel}</a>
    </div>
  `;
}

function renderStages() {
  stageGrid.innerHTML = "";
  stages.forEach((stage, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "stage-card";
    if (index === 0) button.classList.add("active");
    button.innerHTML = `
      <span class="stage-badge">${stage.id}</span>
      <h3>${stage.name}</h3>
      <p>${stage.summary}</p>
    `;

    button.addEventListener("click", () => {
      document.querySelectorAll(".stage-card").forEach((card) => {
        card.classList.remove("active");
      });
      button.classList.add("active");
      renderDetail(stage);
    });

    stageGrid.appendChild(button);
  });

  renderDetail(stages[0]);
}

renderStages();
