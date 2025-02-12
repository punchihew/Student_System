import { useState } from "react";

const studentQuestions = [
  {
    id: 1,
    studentId: "S001",
    question: "What is the difference between Java and JavaScript?",
    joinDate: "2023-01-15",
    grade: "10",
  },
  {
    id: 2,
    studentId: "S002",
    question: "How does React handle state management?",
    joinDate: "2023-02-10",
    grade: "12",
  },
  {
    id: 3,
    studentId: "S003",
    question: "Can you explain the concept of Promises in JavaScript?",
    joinDate: "2023-03-05",
    grade: "10",
  },
  {
    id: 4,
    studentId: "S004",
    question: "What is the role of Hooks in React?",
    joinDate: "2023-04-20",
    grade: "11",
  },
];

const StudentQuestions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  const filteredQuestions = studentQuestions.filter((student) => {
    const matchesSearch =
      student.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade ? student.grade === selectedGrade : true;
    return matchesSearch && matchesGrade;
  });

  return (
    <>
      <div className=" bg-gradient-to-br from-white to-blue-50 sm:w-auto p-2 sm:p-8 w-screen overflow-hidden">
        <header className="bg-blue-600 text-white p-4 sm:p-6 shadow-md rounded-lg mb-4 sm:mb-8 sm:w-fit w-full ">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Student Questions
            </h1>
          </div>
        </header>

        <div className="max-w-screen-xl mx-auto mb-4 sm:mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex flex-grow items-center space-x-2">
            <input
              type="text"
              className="w-full p-2 rounded-lg border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Search by Question or Student ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg transition-all duration-200 hover:bg-blue-500 focus:outline-none"
            >
              Reset Search
            </button>
          </div>

          <div className="flex flex-grow items-center space-x-2">
            <select
              className="w-full p-2 rounded-lg border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="">All Grades</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
            <button
              onClick={() => setSelectedGrade("")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg transition-all duration-200 hover:bg-blue-500 focus:outline-none"
            >
              Reset Filter
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-blue-400 bg-red-600 ">
          <table className="w-full bg-white border border-gray-200 rounded-xl shadow-xl">
            <thead>
              <tr className="bg-red-600 text-white text-sm sm:text-base">
                <th className="py-3 px-5 text-left">Student ID</th>
                <th className="py-3 px-5 text-left">Join Date</th>
                <th className="py-3 px-5 text-left">Question</th>
                <th className="py-3 px-5 text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-200 hover:bg-blue-50 transition duration-300 text-sm sm:text-base"
                >
                  <td className="py-4 px-5 text-gray-700">
                    {student.studentId}
                  </td>
                  <td className="py-4 px-5 text-gray-700">
                    {student.joinDate}
                  </td>
                  <td className="py-4 px-5 text-gray-700 italic">
                    {student.question}
                  </td>
                  <td className="py-4 px-5 text-gray-700">{student.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentQuestions;
