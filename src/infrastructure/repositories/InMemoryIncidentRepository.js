const { IncidentRepository } = require("../../domain/incidents/IncidentRepository");

class InMemoryIncidentRepository extends IncidentRepository {
  constructor() {
    super();
    this.store = new Map();
  }

  save(incident) {
    this.store.set(incident.id, incident);
    return incident;
  }

  findById(incidentId) {
    return this.store.get(incidentId) || null;
  }
}

module.exports = { InMemoryIncidentRepository };
