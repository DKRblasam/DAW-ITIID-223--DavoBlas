import type { Student } from "@/types/student";

interface StudentItemProps {
  student: Student;
}

export default function StudentItem({ student }: StudentItemProps) {
  return (
    <li>
      <strong>{student.name}</strong> --{student.career}
      <button type="button" aria-label={`Eliminar a ${student.name}`}>
        Eliminar
      </button>
    </li>
  );
}
