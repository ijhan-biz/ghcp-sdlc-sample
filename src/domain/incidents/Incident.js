class Incident {
  constructor({ id, title, severity, priority, status, openedAt, closedAt }) {
    this.id = id;
    this.title = title;
    this.severity = severity;
    this.priority = priority;
    this.status = status;
    this.openedAt = openedAt;
    this.closedAt = closedAt || null;
  }

  static open({ id, title, severity, priority, openedAt }) {
    if (!id || !title || !severity || !priority || !openedAt) {
      throw new Error("Incident.open requires id, title, severity, priority, openedAt");
    }

    return new Incident({
      id,
      title,
      severity,
      priority,
      status: "OPEN",
      openedAt,
      closedAt: null,
    });
  }

  close(closedAt) {
    if (this.status === "CLOSED") {
      throw new Error("Incident is already closed");
    }

    if (!closedAt) {
      throw new Error("closedAt is required");
    }

    this.status = "CLOSED";
    this.closedAt = closedAt;
  }

  changePriority(nextPriority) {
    if (!nextPriority) {
      throw new Error("nextPriority is required");
    }

    this.priority = nextPriority;
  }
}

module.exports = { Incident };
