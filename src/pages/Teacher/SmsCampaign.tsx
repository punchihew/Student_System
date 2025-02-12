import { useNavigate } from "react-router-dom";

const SmsCampaign = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-10 max-w-sm sm:max-w-md lg:max-w-lg text-center border border-blue-300 hover:shadow-2xl transition-all duration-300">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-700 mb-4">
          SMS Campaign
        </h1>
        <p className="text-blue-600/80 mb-6 text-sm sm:text-base lg:text-lg">
          Boost engagement and drive results with personalized SMS campaigns.
        </p>

        <button
          onClick={() => navigate("/studentsms")}
          className="bg-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-bold hover:bg-blue-600 hover:text-red-500 transition-transform duration-300 transform hover:scale-110 shadow-lg hover:shadow-2xl"
        >
          Start Your SMS Campaign Now
        </button>
      </div>
    </div>
  );
};

export default SmsCampaign;
