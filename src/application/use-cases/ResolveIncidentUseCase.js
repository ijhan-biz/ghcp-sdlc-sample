class ResolveIncidentUseCase {
  constructor({ incidentRepository, clock }) {
    this.incidentRepository = incidentRepository;
    this.clock = clock;
  }

  execute({ incidentId }) {
    if (!incidentId) {
      throw new Error("incidentId is required");
    }

    const incident = this.incidentRepository.findById(incidentId);
    if (!incident) {
      throw new Error("incident not found");
    }

    incident.close(this.clock());
    this.incidentRepository.save(incident);

    return incident;
  }
}

module.exports = { ResolveIncidentUseCase };
