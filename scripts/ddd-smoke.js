const { decidePriority } = require("../src/domain/incidents/IncidentPriorityPolicy");
const { RegisterIncidentUseCase } = require("../src/application/use-cases/RegisterIncidentUseCase");
const { ResolveIncidentUseCase } = require("../src/application/use-cases/ResolveIncidentUseCase");
const { InMemoryIncidentRepository } = require("../src/infrastructure/repositories/InMemoryIncidentRepository");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const repository = new InMemoryIncidentRepository();
  let seq = 0;

  const registerUseCase = new RegisterIncidentUseCase({
    incidentRepository: repository,
    priorityPolicy: decidePriority,
    idGenerator: () => {
      seq += 1;
      return `inc-${seq}`;
    },
    clock: () => "2026-05-27T09:00:00Z",
  });

  const resolveUseCase = new ResolveIncidentUseCase({
    incidentRepository: repository,
    clock: () => "2026-05-27T09:12:00Z",
  });

  const opened = registerUseCase.execute({
    title: "서울 북부 지역 장애 알림 중복 발생",
    severity: "P2",
    impactedSubscribers: 25000,
  });

  assert(opened.id === "inc-1", "incident id should be generated");
  assert(opened.priority === "CRITICAL", "priority policy should escalate to CRITICAL");
  assert(opened.status === "OPEN", "incident should be OPEN");

  const closed = resolveUseCase.execute({ incidentId: "inc-1" });
  assert(closed.status === "CLOSED", "incident should be CLOSED");
  assert(closed.closedAt === "2026-05-27T09:12:00Z", "closedAt should be recorded");

  console.log("DDD smoke test passed");
}

main();
