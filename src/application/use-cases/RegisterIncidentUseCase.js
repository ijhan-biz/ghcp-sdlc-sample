const { Incident } = require("../../domain/incidents/Incident");

class RegisterIncidentUseCase {
  constructor({ incidentRepository, priorityPolicy, idGenerator, clock }) {
    this.incidentRepository = incidentRepository;
    this.priorityPolicy = priorityPolicy;
    this.idGenerator = idGenerator;
    this.clock = clock;
  }

  execute({ title, severity, impactedSubscribers }) {
    if (!title || !severity) {
      throw new Error("title and severity are required");
    }

    const incident = Incident.open({
      id: this.idGenerator(),
      title,
      severity,
      priority: this.priorityPolicy(severity, impactedSubscribers || 0),
      openedAt: this.clock(),
    });

    this.incidentRepository.save(incident);
    return incident;
  }
}

module.exports = { RegisterIncidentUseCase };
