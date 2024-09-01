import { students } from "@/db/students";

const Presentation = () => {
  return (
    <div className="presentation-container">
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
