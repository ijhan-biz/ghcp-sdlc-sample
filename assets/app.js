const stages = [
  {
    id: 1,
    name: "Plan",
    summary: "이슈를 AC와 edge case로 구조화",
    demo: "Issue 템플릿을 AC + NFR + test idea로 자동 정리",
    gate: "PO/팀장 승인 후 개발 착수",
    kpi: "AC 링크 누락 0건",
  },
  {
    id: 2,
    name: "Code",
    summary: "작은 단위의 안전한 코드 생성",
    demo: "기능 변경 + 테스트 코드 동시 생성",
    gate: "Repo instructions 준수",
    kpi: "테스트 추가율 >= 60%",
  },
  {
    id: 3,
    name: "Review & Test",
    summary: "사람 리뷰와 자동 게이트 결합",
    demo: "PR 위험 요약 + 누락 테스트 제안",
    gate: "CODEOWNERS + required checks",
    kpi: "Required checks pass 100%",
  },
  {
    id: 4,
    name: "Build & Deploy",
    summary: "Actions 기반 배포 표준화",
    demo: "배포 실패 로그 요약과 수정 가이드",
    gate: "배포 워크플로 변경 owner 승인",
    kpi: "배포 실패율 < 5%",
  },
  {
    id: 5,
    name: "Operate",
    summary: "장애 대응과 복구 시간 관리",
    demo: "Incident 로그를 runbook action으로 변환",
    gate: "운영 원문 로그 입력 금지",
    kpi: "MTTR <= 15분",
  },
  {
    id: 6,
    name: "Modernize",
    summary: "레거시를 작은 PR 시리즈로 전환",
    demo: "Deprecated API 교체 후보 자동 생성",
    gate: "Rollback 조건 명시",
    kpi: "PR series 완료율 >= 80%",
  },
  {
    id: 7,
    name: "Govern",
    summary: "감사·정책·권한 추적",
    demo: "AI-assisted 라벨 + 감사 로그 연동",
    gate: "정책 예외 승인 기록 필수",
    kpi: "AI PR 라벨링 >= 95%",
  },
  {
    id: 8,
    name: "Models",
    summary: "모델 라우팅과 비용 통제",
    demo: "T0-T4 작업 등급별 모델 추천",
    gate: "Premium 모델 사전 승인",
    kpi: "Premium 사용률 <= 30%",
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
