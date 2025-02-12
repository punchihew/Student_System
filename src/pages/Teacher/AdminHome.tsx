import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const useCountUp = (start: number, end: number, duration: number) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [start, end, duration]);

  return count;
};

const AdminHome = () => {
  const totalStudents = useCountUp(0, 120, 2000);
  const answeredStudents = useCountUp(0, 80, 2000);
  const completionRate = useCountUp(0, 90, 2000);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative p-4 sm:p-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white/90 backdrop-blur-lg rounded-3xl p-6 sm:p-8 max-w-5xl mx-auto shadow-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600 text-center mb-6 sm:mb-10"
        >
          Welcome, Admin!
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center hover:scale-105 transition-all"
          >
            <motion.h2 className="text-3xl sm:text-4xl font-semibold text-blue-600">
              {totalStudents}
            </motion.h2>
            <motion.p className="text-lg text-gray-500 mt-2">
              Total Students
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center hover:scale-105 transition-all"
          >
            <motion.h2 className="text-3xl sm:text-4xl font-semibold text-blue-600">
              {answeredStudents}
            </motion.h2>
            <motion.p className="text-lg text-gray-500 mt-2">
              Answered Students
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center hover:scale-105 transition-all"
          >
            <motion.h2 className="text-3xl sm:text-4xl font-semibold text-blue-600">
              {completionRate}%
            </motion.h2>
            <motion.p className="text-lg text-gray-500 mt-2">
              Completion Rate
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Here you can manage your student data and track progress with ease.
            Keep up the great work!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminHome;
