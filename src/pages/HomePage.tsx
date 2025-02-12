import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/1114140_Pupil_Preschool_3840x2160.mp4" type="video/mp4" />
        <source
          src="/1114140_Pupil_Preschool_3840x2160.webm"
          type="video/webm"
        />
        <img src="/fallback-image.jpg" alt="Fallback Image" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-20 text-center text-white">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our Platform</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Student LMS
          </Link>
          <Link
            to="/adminlogin"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
