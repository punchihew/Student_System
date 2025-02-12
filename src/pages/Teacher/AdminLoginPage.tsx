import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/Admin/adminhome");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl max-w-6xl w-full"
      >
       
        <div className="w-full md:w-1/2 relative">
          <div className="absolute inset-0 bg-black/50"></div>{" "}
         
          <img
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Modern Design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex items-end p-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl font-bold text-white tracking-tight"
            >
              Welcome Back
            </motion.h2>
          </div>
        </div>

        
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-4xl font-bold text-white mb-4 tracking-tight"
          >
            Login
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col space-y-2"
          >
            <label
              htmlFor="username"
              className="text-sm font-medium text-white/80"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-white/50 shadow-lg transition-all"
            />
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-col space-y-2"
          >
            <label
              htmlFor="password"
              className="text-sm font-medium text-white/80"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-white/50 shadow-lg transition-all"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            onClick={handleLogin} 
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-3 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg"
          >
            Login
          </motion.button>

        
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="mt-6 text-center"
          >
            <a
              href="#"
              className="text-sm text-white/70 hover:text-yellow-500 transition-colors"
            >
              Forgot Password?
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
