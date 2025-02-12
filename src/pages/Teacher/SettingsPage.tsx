import { useState } from "react";

const SettingsPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [qrData, setQrData] = useState("");

  const handleConnect = () => {
    setIsConnected(true);
    setQrData("https://example.com/connect");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-4 sm:p-8">
      <div className="max-w-screen-md mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-4 sm:mb-6">
          Settings
        </h1>

        <div className="flex justify-center mb-4 sm:mb-6">
          <button
            onClick={handleConnect}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-lg sm:rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out"
          >
            {isConnected ? "Connected" : "Connect"}
          </button>
        </div>

        {isConnected && (
          <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 transition-opacity duration-500 ease-in-out opacity-100">
            <h2 className="text-lg sm:text-xl text-gray-800 font-semibold">
              Scan QR Code
            </h2>
            <div className="flex justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                  qrData
                )}&size=256x256`}
                alt="QR Code"
                className="rounded-lg shadow-md"
              />
            </div>
            <p className="text-gray-600 text-xs sm:text-sm text-center">
              Scan this QR code to connect your account with our service.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
