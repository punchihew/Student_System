import { useState } from "react";
import { CheckCircle, XCircle, Search } from "lucide-react";

const StudentSmsCampaign = () => {
  const [students, setStudents] = useState([
    { id: "1", number: "1234567890", isSelected: false },
    { id: "2", number: "2345678901", isSelected: false },
    { id: "3", number: "3456789012", isSelected: false },
    { id: "4", number: "4567890123", isSelected: false },
    { id: "5", number: "5678901234", isSelected: false },
  ]);

  const [smsContent, setSmsContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationShown, setIsConfirmationShown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle student selection
  const toggleStudentSelection = (id: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, isSelected: !student.isSelected }
          : student
      )
    );
  };

  // Select all students
  const selectAllStudents = () => {
    setStudents((prev) =>
      prev.map((student) => ({ ...student, isSelected: true }))
    );
  };

  // Filter students based on search query
  const filteredStudents = students.filter((student) =>
    student.number.includes(searchQuery)
  );

  const selectedStudents = students.filter((student) => student.isSelected);
  const unselectedStudents = students.filter((student) => !student.isSelected);

  // Handle sending SMS
  const handleSendSms = () => {
    setIsModalOpen(true);
  };

  // Confirm sending SMS
  const confirmSendSms = () => {
    setIsModalOpen(false);
    setIsConfirmationShown(true);
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-8 text-center tracking-tight">
          Student SMS Campaign
        </h1>

        {/* Search Bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by phone number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition duration-300"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          <button
            onClick={() => setSearchQuery("")} // Clear search
            className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition duration-300"
          >
            Clear Search
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student List */}
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">
              Select Student Numbers
            </h2>
            <div className="mb-4 overflow-y-auto max-h-[500px]">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={students.every((student) => student.isSelected)}
                  onChange={selectAllStudents}
                  className="form-checkbox h-5 w-5 text-blue-600 transition-all hover:scale-110"
                />
                <span className="text-lg">Select All</span>
              </label>
            </div>
            <div className="space-y-3 mb-6" style={{ maxHeight: "300px" }}>
              {filteredStudents.map((student) => (
                <label
                  key={student.id}
                  className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg transition-all duration-300 ease-in-out "
                >
                  <input
                    type="checkbox"
                    checked={student.isSelected}
                    onChange={() => toggleStudentSelection(student.id)}
                    className="form-checkbox h-5 w-5 text-blue-600 transition-all hover:scale-110"
                  />
                  <span className="text-lg font-medium">{student.number}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">
              Selected Student Numbers
            </h2>
            <div className="space-y-3 mb-6 overflow-y-auto max-h-[150px] ">
              {selectedStudents.map((student) => (
                <div
                  key={student.id}
                  className="p-2 bg-blue-50 rounded-lg flex items-center justify-between"
                >
                  <span className="text-lg font-medium">{student.number}</span>
                  <button
                    onClick={() => toggleStudentSelection(student.id)}
                    className="text-red-500 hover:text-red-700 transition-all"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold text-blue-700 p-2">
              Write Your SMS
            </h2>
            <textarea
              value={smsContent}
              onChange={(e) => setSmsContent(e.target.value)}
              placeholder="Type your SMS here..."
              className="w-full border border-gray-300 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition duration-300"
              rows={3}
            />
            <button
              onClick={handleSendSms}
              className="mt-4 bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-lg"
            >
              Send SMS
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-lg w-full transition-all transform duration-300">
              <h2 className="text-lg sm:text-xl font-bold text-blue-800 mb-6">
                Confirm SMS Send
              </h2>
              <p className="text-gray-700 text-base sm:text-lg mb-6">
                You are about to send SMS to{" "}
                <span className="font-semibold">{selectedStudents.length}</span>{" "}
                students.
              </p>
              {unselectedStudents.length > 0 && (
                <p className="text-gray-600 mb-4">
                  The following students will not receive the message:
                </p>
              )}
              <ul className="list-disc list-inside text-gray-500 mb-6">
                {unselectedStudents.map((student) => (
                  <li key={student.id}>{student.number}</li>
                ))}
              </ul>
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-grow bg-gray-300 text-gray-700 py-2 sm:py-3 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSendSms}
                  className="flex-grow bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Confirmation Modal */}
        {isConfirmationShown && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-lg w-full transition-all transform duration-300 scale-100 hover:scale-[1.02]">
              <div className="flex items-center space-x-4 mb-6">
                <CheckCircle className="h-6 sm:h-8 w-6 sm:w-8 text-green-500" />
                <h2 className="text-lg sm:text-xl font-bold text-blue-800">
                  SMS Sent!
                </h2>
              </div>
              <p className="text-gray-700 text-base sm:text-lg mb-6">
                The SMS has been successfully sent to{" "}
                <span className="font-semibold">{selectedStudents.length}</span>{" "}
                students.
              </p>
              <button
                onClick={() => setIsConfirmationShown(false)}
                className="bg-blue-600 text-white w-full py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSmsCampaign;
