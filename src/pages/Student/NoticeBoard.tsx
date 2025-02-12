
const notices = [
  {
    id: 1,
    title: "Exam Schedule",
    content:
      "The final exams will start on December 15th. Please check the timetable.",
    date: "2023-11-10",
  },
  {
    id: 2,
    title: "Holiday Announcement",
    content:
      "The college will remain closed on November 23rd for a public holiday.",
    date: "2023-11-05",
  },
  {
    id: 3,
    title: "Library Closure",
    content: "The library will be closed for maintenance on November 20th.",
    date: "2023-11-08",
  },
];

const NoticeBoard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-yellow-50 p-6">
    
      <div className="w-full max-w-4xl">
        <div className="bg-yellow-50 rounded-lg shadow-2xl p-8  border-2 border-yellow-200">
          <h2 className="text-3xl font-bold text-yellow-800 mb-6">
            Student Notice Board
          </h2>
          <div className="space-y-6">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-yellow-400"
              >
                <h3 className="text-xl font-semibold text-yellow-700">
                  {notice.title}
                </h3>
                
                <div className="text-gray-600 mt-2">
                  {notice.content.split("\n").map((line, index) => (
                    <p key={index} className="mt-1">
                      {line}
                    </p>
                  ))}
                </div>
                <p className="text-sm text-yellow-600 mt-4">{notice.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
