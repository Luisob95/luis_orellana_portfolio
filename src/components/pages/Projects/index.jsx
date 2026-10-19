export default function Projects() {
  const projects = [
    { title: "DayPilot Productivity App", tech: "Kotlin, Firebase, FastAPI" },
    { title: "PetLovers Social App", tech: "React, Firestore" },
    { title: "Task Scheduler", tech: "Kotlin, Calendar API" },
  ];

  return (
    <section>
      <h1>Projects</h1>
      <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
        {projects.map((p) => (
          <li
            key={p.title}
            style={{
              backgroundColor: "var(--color-header)",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "15px",
              transition: "transform 0.2s ease",
            }}
          >
            <h3>{p.title}</h3>
            <p style={{ color: "var(--color-muted)" }}>{p.tech}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
