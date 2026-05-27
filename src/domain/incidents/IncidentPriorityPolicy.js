const PRIORITY_BY_SEVERITY = {
  P1: "CRITICAL",
  P2: "HIGH",
  P3: "MEDIUM",
};

function decidePriority(severity, impactedSubscribers) {
  const base = PRIORITY_BY_SEVERITY[severity] || "LOW";

  if (base === "HIGH" && impactedSubscribers >= 10000) {
    return "CRITICAL";
  }

  if (base === "MEDIUM" && impactedSubscribers >= 20000) {
    return "HIGH";
  }

  return base;
}

module.exports = { decidePriority };
