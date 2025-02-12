import { useState } from "react";

const SettingsPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [qrData, setQrData] = useState("");

  const handleConnect = () => {
    setIsConnected(true);
    setQrData("https://example.com/connect");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-8">
      <div className="max-w-screen-md mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Settings
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={handleConnect}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300"
          >
            {isConnected ? "Connected" : "Connect"}
          </button>
        </div>

        {isConnected && (
          <div className="flex flex-col items-center justify-center space-y-6">
            <h2 className="text-xl text-gray-800 font-semibold">
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
            <p className="text-gray-600 text-sm">
              Scan this QR code to connect your account with our service.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
