import { motion } from "framer-motion";

const liveLectures = [
  {
    title: "2025 O/L Science Revision Class",
    date: "2023-11-15",
    time: "10:00 AM",
    link: "https://meet.google.com/abc-xyz-123",
    isLive: true,
    notification: "Class starts in 15 minutes!",
  },
  {
    title: "2025 O/L Math Revision Class",
    date: "2023-11-20",
    time: "2:00 PM",
    link: "https://meet.google.com/def-uvw-456",
    isLive: false,
    notification: "Class starts in 1 hour!",
  },
];

const LiveLecture = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {liveLectures.map((lecture, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:bg-white/10"
          >
            <div className="absolute inset-0 -z-1 bg-[radial-gradient(circle_at_center,#4f46e550_0%,transparent_70%)] opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-0 -z-1 rounded-[2.5rem] bg-gradient-to-r from-yellow-400/30 to-yellow-500/30 opacity-0 transition-opacity group-hover:opacity-100" />

            {lecture.isLive && (
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -right-8 top-6 rotate-45 bg-gradient-to-r from-yellow-400 to-yellow-500 px-12 py-1 text-xs font-bold text-white shadow-lg"
              >
                LIVE
              </motion.div>
            )}

            <div className="p-8">
              <h2 className="mb-6 text-2xl sm:text-3xl font-bold text-white/90">
                {lecture.title}
                <div className="mt-2 h-1 w-12 bg-gradient-to-r from-yellow-400 to-yellow-500" />
              </h2>

              <div className="mb-8 flex flex-wrap gap-6">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-white/5 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Date</p>
                    <p className="font-mono text-lg text-white">
                      {lecture.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-white/5 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Time</p>
                    <p className="font-mono text-lg text-white">
                      {lecture.time}
                    </p>
                  </div>
                </div>
              </div>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={lecture.link}
                className="relative block overflow-hidden rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-4 text-center font-bold text-white shadow-2xl transition-transform"
              >
                <span className="relative z-10">Join Now</span>
                <div className="absolute inset-0 animate-hologram bg-[length:200%_200%] bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-30 mix-blend-screen" />
              </motion.a>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="mt-6 flex items-center space-x-3 rounded-lg bg-white/5 p-4 backdrop-blur-lg"
              >
                <div className="h-8 w-8 animate-pulse rounded-full bg-yellow-400/20 p-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-white/80">{lecture.notification}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LiveLecture;
