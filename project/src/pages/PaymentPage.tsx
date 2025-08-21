import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedAddress = (location.state as any)?.selectedAddress;

  const handlePaymentClick = (method: string) => {
    navigate(`/payment/${method}`);
  };

  const paymentApps = [
    { name: "googlepay", logo: "https://logospng.org/download/google-pay/logo-google-pay-1024.png" },
    { name: "phonepe", logo: "https://i.pinimg.com/originals/b2/e1/af/b2e1af76fbbe9bc446544b8fa71b37b1.png" },
    { name: "paytm", logo: "https://kickcharm.com/wp-content/uploads/2023/03/Paytm-Careers-News-2023.jpg" },
  ];

  const cardPayment = { name: "card", logo: "https://cdn-icons-png.flaticon.com/512/196/196578.png" };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Confirm Delivery & Choose Payment
        </h2>

        {/* Selected Address */}
        {selectedAddress ? (
          <div className="bg-gray-100 p-3 rounded mb-6">
            <h3 className="font-semibold mb-2">Delivery Address:</h3>
            <p>{selectedAddress.fullName}</p>
            <p>
              {selectedAddress.street}, {selectedAddress.village}, {selectedAddress.post}, {selectedAddress.mandal}, {selectedAddress.district}, {selectedAddress.state} - {selectedAddress.pincode}
            </p>
            <p>Mobile: {selectedAddress.mobile}</p>
          </div>
        ) : (
          <p className="text-red-500 mb-6">No address selected!</p>
        )}

        {/* UPI Apps */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">UPI Apps</h3>
          <div className="flex justify-between items-center gap-3">
            {paymentApps.map((app) => (
              <img
                key={app.name}
                src={app.logo}
                alt={app.name}
                className="w-16 h-16 cursor-pointer object-contain transform transition duration-300 hover:scale-110 hover:shadow-lg"
                onClick={() => handlePaymentClick(app.name)}
              />
            ))}
          </div>
        </div>

        {/* Card Payment */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Credit / Debit Cards</h3>
          <div className="flex justify-start gap-3">
            <img
              src={cardPayment.logo}
              alt="Card Payment"
              className="w-20 h-12 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => handlePaymentClick(cardPayment.name)}
            />
          </div>
        </div>

        {/* Back to Cart */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/cart")}
            className="text-blue-600 hover:underline"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
