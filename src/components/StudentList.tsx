

type Student = {
  id: string;
  name: string;
  age: string;
  grade: string;
};

type StudentListProps = {
  students: Student[];
  onDeleteStudent: (id: string) => void;
  onEditStudent: (student: Student) => void;
};

const StudentList = ({
  students,
  onDeleteStudent,
  onEditStudent,
}: StudentListProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Age</th>
          <th className="p-3 text-left">Grade</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id} className="border-b">
            <td className="p-3">{student.name}</td>
            <td className="p-3">{student.age}</td>
            <td className="p-3">{student.grade}</td>
            <td className="p-3">
              <button
                onClick={() => onEditStudent(student)}
                className="mr-2 text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteStudent(student.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;
