import { students } from "@/db/students";

const Presentation = () => {
  return (
    <div className="presentation-container">
      <h1 className="title">Objetivos</h1>
      <p>
        Analizar y modelar la dinámica de poblaciones de al menos cuatro especies mediante el Modelo de Leslie, utilizando datos reales para preveer su evolución y distribución a largo plazo e implementarlo en código utilizando el lenguaje Javascript.
      </p>
      <br></br>
      <h1 className="title">Integrantes del equipo</h1>

      <ul className="student-list">
        {students.map((student) => (
          <li key={student.studentId} className="student-item">
            <span className="student-name">{student.name}</span>

            <span className="student-id">{student.studentId}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Presentation;
