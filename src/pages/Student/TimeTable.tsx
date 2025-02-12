const enrolledSessions = [
  {
    id: 1,
    name: "2024 OL",
    date: "Not Set",
    time: "Not Set",
  },
  {
    id: 2,
    name: "2025 OL",
    date: "Not Set",
    time: "Not Set",
  },
];

const Timetable = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden transform ">
        <div className="bg-gradient-to-r from-teal-500 to-purple-500 text-white p-8 rounded-t-xl">
          <h2 className="text-4xl font-bold tracking-wide">Time Table</h2>
          <p className="text-md mt-2">
            Your enrolled sessions are listed below
          </p>
        </div>

        <div className="space-y-8 p-8">
          {enrolledSessions.map((session) => (
            <div
              key={session.id}
              className="bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 p-8 rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {session.name}
              </h3>
              <div className="flex justify-between text-gray-600">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-lg">{session.date}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-lg">{session.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
