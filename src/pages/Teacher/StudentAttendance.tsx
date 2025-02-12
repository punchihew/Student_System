import { useState } from "react";
import { Search, Filter } from "lucide-react";

type Student = {
  id: string;
  name: string;
  grade: string;
  isPresent: boolean;
  isPaymentDone: boolean;
};

const StudentAttendance = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "John Doe",
      grade: "10th",
      isPresent: false,
      isPaymentDone: false,
    },
    {
      id: "2",
      name: "Jane Smith",
      grade: "9th",
      isPresent: false,
      isPaymentDone: false,
    },
    {
      id: "3",
      name: "Alice Johnson",
      grade: "11th",
      isPresent: false,
      isPaymentDone: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string>("");

  const handleAttendanceToggle = (id: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, isPresent: !student.isPresent }
          : student
      )
    );
  };

  const handlePaymentToggle = (id: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, isPaymentDone: !student.isPaymentDone }
          : student
      )
    );
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade ? student.grade === selectedGrade : true;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
          Student Attendance and Payment
        </h1>

        <div className="flex items-center justify-between mb-6 gap-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 border border-blue-300 rounded-xl shadow-md focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-blue-500" />
          </div>

          <div className="relative">
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="p-4 pl-12 border border-blue-300 rounded-xl shadow-md focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300"
            >
              <option value="">Filter by Grade</option>
              <option value="9th">9th</option>
              <option value="10th">10th</option>
              <option value="11th">11th</option>
            </select>
            <Filter className="absolute left-3 top-3.5 h-5 w-5 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-50">
                <th className="p-4 text-left text-gray-700">ID</th>
                <th className="p-4 text-left text-gray-700">Name</th>
                <th className="p-4 text-left text-gray-700">Grade</th>
                <th className="p-4 text-left text-gray-700">Attendance</th>
                <th className="p-4 text-left text-gray-700">Payment</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b hover:bg-blue-50 transition duration-200"
                >
                  <td className="p-4 text-gray-700">{student.id}</td>
                  <td className="p-4 text-gray-700">{student.name}</td>
                  <td className="p-4 text-gray-700">{student.grade}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleAttendanceToggle(student.id)}
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        student.isPresent
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white`}
                    >
                      {student.isPresent ? "Present" : "Absent"}
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handlePaymentToggle(student.id)}
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        student.isPaymentDone
                          ? "bg-teal-500 hover:bg-teal-600"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white`}
                    >
                      {student.isPaymentDone ? "Paid" : "Pending"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
