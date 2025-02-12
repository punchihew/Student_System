import { useState, useEffect } from "react";
import StudentForm from "../../components/StudentForm";
import StudentList from "../../components/StudentList";

type Student = {
  id: string;
  name: string;
  age: string;
  grade: string;
};

const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");

  useEffect(() => {
    const savedStudents = localStorage.getItem("students");
    const savedGradeFilter = localStorage.getItem("gradeFilter");

    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
    if (savedGradeFilter) {
      setGradeFilter(savedGradeFilter);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("gradeFilter", gradeFilter);
  }, [students, gradeFilter]);

  const handleSaveStudent = (student: Student) => {
    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) => (s.id === student.id ? student : s))
      );
      setEditingStudent(null);
    } else {
      setStudents((prev) => [
        ...prev,
        { ...student, id: Date.now().toString() },
      ]);
    }
    setIsFormOpen(false);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGrade = gradeFilter ? student.grade === gradeFilter : true;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="sm:w-full w-screen bg-gradient-to-br from-blue-50 to-purple-50 ">
      <div className=" w-full ">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Student Management
        </h1>
        <div className="mb-8 p-1">
          <input
            type="text"
            placeholder="Search students by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          />
        </div>
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 flex-grow"
          >
            <option value="">All Grades</option>
            <option value="10">10th Grade</option>
            <option value="9">9th Grade</option>
            <option value="8">8th Grade</option>
            <option value="7">7th Grade</option>
          </select>
          <button
            onClick={() => setGradeFilter("")}
            className="bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition duration-300 sm:w-auto w-full"
          >
            Clear Grade Filter
          </button>
        </div>

        <div className="mb-8">
          <button
            onClick={() => {
              setEditingStudent(null);
              setIsFormOpen(true);
            }}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
          >
            Add Student
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-6 hover:shadow-lg transition-shadow duration-300 w-full">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Student List
          </h2>
          <div className="w-full overflow-x-auto">
            <StudentList
              students={filteredStudents}
              onDeleteStudent={handleDeleteStudent}
              onEditStudent={handleEditStudent}
            />
          </div>
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                {editingStudent ? "Edit Student" : "Add Student"}
              </h2>
              <StudentForm
                onSaveStudent={handleSaveStudent}
                editingStudent={editingStudent}
                onClose={() => setIsFormOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManagement;
