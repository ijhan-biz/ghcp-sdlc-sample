class IncidentRepository {
  save() {
    throw new Error("save() must be implemented");
  }

  findById() {
    throw new Error("findById() must be implemented");
  }
}

module.exports = { IncidentRepository };
