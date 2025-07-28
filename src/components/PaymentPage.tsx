import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Smartphone, RefreshCcw } from 'lucide-react'; // Added RefreshCcw icon
import { Link, useNavigate } from 'react-router-dom';

// Define courses
const coursesData = [
  { id: 'DSB001', name: 'Data Science & Machine Learning' },
  { id: 'AIML002', name: 'Artificial Intelligence & Generative AI' },
  { id: 'FSD003', name: 'Full Stack Java Development' },
  { id: 'DEV004', name: 'DevOps & Cloud Technologies' },
  { id: 'PYT005', name: 'Python Programming' },
  { id: 'SWT006', name: 'Software Testing (Manual + Automation)' },
  { id: 'SAP007', name: 'SAP (Data Processing)' },
  { id: 'OTHER', name: 'Other / Custom Payment' }
];

const PaymentPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const [checkoutDetails, setCheckoutDetails] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    selectedCourseId: '',
    amount: '' as string,
  });

  // IMPORTANT: Replace with YOUR ACTUAL PERSONAL UPI ID (VPA)
  const YOUR_UPI_ID = 'reddyl62@fifederal'; // e.g., yourname@ybl or yourphonepeid@upi
  const YOUR_BUSINESS_NAME_DISPLAY = 'CynexAI'; // This name will be shown on YOUR website only

  // Internal Order ID is generated but NOT displayed on UI
  const [internalOrderId, setInternalOrderId] = useState<string>('');
  const [upiPaymentLink, setUpiPaymentLink] = useState<string>('');

  const pageTopRef = useRef<HTMLDivElement>(null);

  // Function to generate a new unique order ID
  const generateNewOrderId = () => {
    return `CXAI_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  };

  useEffect(() => {
    // Generate a new internal order ID when the component mounts or resets
    setInternalOrderId(generateNewOrderId());
  }, []);

  const selectedCourseName = coursesData.find(course => course.id === checkoutDetails.selectedCourseId)?.name || 'N/A';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
        setCheckoutDetails(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setCheckoutDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validation
    if (!checkoutDetails.selectedCourseId) {
      setMessage('Please select a course.');
      setPaymentStatus('error');
      return;
    }

    const parsedAmount = parseFloat(checkoutDetails.amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setMessage('Please enter a valid amount greater than zero.');
      setPaymentStatus('error');
      return;
    }

    if (!checkoutDetails.fullName || !checkoutDetails.phoneNumber) {
      setMessage('Please fill in your Full Name and Phone Number.');
      setPaymentStatus('error');
      return;
    }

    setPaymentStatus('pending');
    
    // Construct UPI Deep Link (internal order ID still included in 'tr' for potential hidden trace)
    // IMPORTANT: 'pn' parameter will display YOUR_BUSINESS_NAME_DISPLAY on the customer's UPI app IF the app supports it,
    // otherwise it might fallback to the name linked with YOUR_UPI_ID.
    const generatedUpiLink = `upi://pay?pa=${encodeURIComponent(YOUR_UPI_ID)}&pn=${encodeURIComponent(YOUR_BUSINESS_NAME_DISPLAY)}&tr=${encodeURIComponent(internalOrderId)}&am=${parsedAmount.toFixed(2)}&cu=INR`;
    setUpiPaymentLink(generatedUpiLink);

    // Scroll to the top of the page with a slight delay
    setTimeout(() => {
      if (pageTopRef.current) {
        pageTopRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Fallback
      }
    }, 100);

    // Log payment initiation details for your records (including the internalOrderId)
    console.log("Payment initiated details:", {
      internalOrderId: internalOrderId, // This is for your internal tracking
      amount: parsedAmount,
      upiId: YOUR_UPI_ID, // Your personal VPA
      customer: checkoutDetails,
      selectedCourse: selectedCourseName,
      timestamp: new Date().toISOString()
    });

    setMessage(
      `Please scan the QR code or click 'Open UPI App' to pay ₹${parsedAmount.toFixed(2)}.` +
      `\n\nEnsure the amount displayed in your UPI app matches this value.` +
      `\n\n**Note:** Your payment will be manually verified based on the exact amount and the details you provided. Thank you!`
    );
  };

  // Function to reset the form and payment state
  const resetPayment = () => {
    setCheckoutDetails({
      fullName: '',
      phoneNumber: '',
      email: '',
      selectedCourseId: '',
      amount: '',
    });
    setPaymentStatus('idle');
    setMessage('');
    setInternalOrderId(generateNewOrderId()); // Generate a new order ID for the next attempt
    setUpiPaymentLink('');
    // Scroll to top if already scrolled down
    if (pageTopRef.current) {
      pageTopRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } } };

  return (
    <div ref={pageTopRef} className="min-h-screen bg-white text-gray-900 pt-20 pb-10 flex items-center justify-center font-inter">
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative bg-white rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-5xl mx-auto border border-gray-200 flex flex-col lg:flex-row"
      >
        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors z-10"
          aria-label="Close payment modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Column: Payment Details & QR Code */}
        <div className="lg:w-2/5 lg:pr-8 mb-8 lg:mb-0 text-center">
          <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl font-bold mb-6 border-b pb-3 border-gray-200">
            2. Complete Your Payment
          </motion.h2>

          {paymentStatus === 'pending' ? (
            <motion.div variants={containerVariants} className="space-y-4">
              <p className="text-lg font-semibold text-gray-800">
                Scan this QR Code to pay ₹{parseFloat(checkoutDetails.amount || '0').toFixed(2)}:
              </p>
              {/* Make QR Code clickable with UPI Deep Link */}
              <a href={upiPaymentLink} target="_blank" rel="noopener noreferrer" className="inline-block">
                {/* Dynamically generate QR code from the UPI deep link */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiPaymentLink)}`}
                  alt="UPI QR Code"
                  className="mx-auto border border-gray-300 rounded-lg p-2"
                />
              </a>
              
              <p className="text-base text-gray-700 mt-2 font-medium">
                Ensure the amount pre-filled in your UPI app is **₹{parseFloat(checkoutDetails.amount || '0').toFixed(2)}**.
              </p>
              
              {/* Button to open UPI App directly */}
              <a
                href={upiPaymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#41c8df] text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center mt-6"
              >
                Open UPI App <Smartphone className="w-5 h-5 ml-2" />
              </a>

              {/* New: Start New Payment / Reset Button */}
              <button
                onClick={resetPayment}
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center mt-4"
              >
                Start New Payment <RefreshCcw className="w-5 h-5 ml-2" />
              </button>

            </motion.div>
          ) : (
            <motion.div variants={containerVariants} className="space-y-4">
              {/* Initial state: Show instructions or a summary before payment */}
              <p className="text-lg text-gray-700">
                You will make a direct UPI payment. Please ensure all details are correct.
              </p>
              <p className="text-md text-gray-600">
                After submitting your details, you'll be shown a UPI QR code and a button to open your UPI app to complete the payment.
              </p>
              {message && (
                <p className={`mt-6 text-center font-medium ${
                  paymentStatus === 'success' ? 'text-green-600' :
                  paymentStatus === 'error' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {message}
                </p>
              )}
            </motion.div>
          )}
        </div>

        {/* Right Column: Order Summary & Customer Information */}
        <div className="lg:w-3/5 lg:pl-8">
          <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl font-bold mb-6 border-b pb-3 border-gray-200">
            Order Details
          </motion.h2>

          <form onSubmit={handleSubmitPayment} className="space-y-4">
            {/* Course Dropdown */}
            <motion.div variants={itemVariants}>
              <label htmlFor="selectedCourseId" className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
              <select
                id="selectedCourseId"
                name="selectedCourseId"
                value={checkoutDetails.selectedCourseId}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 outline-none"
              >
                <option value="">-- Select a Course --</option>
                {coursesData.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Amount Input Field */}
            <motion.div variants={itemVariants}>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2 text-left">Amount (INR)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-bold">₹</span>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={checkoutDetails.amount}
                  onChange={handleInputChange}
                  placeholder="e.g., 500.00"
                  required
                  className="w-full pl-8 pr-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none text-xl font-bold"
                />
              </div>
            </motion.div>

            {/* Order Summary Display */}
            <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-3 mb-6">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">Selected Course:</span>
                  <span className="font-semibold text-gray-800">{selectedCourseName}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">Coupon Code:</span>
                  <button type="button" className="text-[#41c8df] hover:underline text-sm">Apply</button>
                </div>
                <div className="flex justify-between items-center text-2xl font-bold pt-4 border-t border-gray-200">
                  <span className="text-gray-800">Total Amount:</span>
                  <span className="text-[#41c8df]">INR ₹{parseFloat(checkoutDetails.amount || '0').toFixed(2)}</span>
                </div>
            </motion.div>

            {/* Customer Information */}
            <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Information</h3>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={checkoutDetails.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g., John Doe"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={checkoutDetails.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., 9876543210"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                  pattern="[0-9]{10}" // Basic pattern for 10 digits
                  title="Phone number must be 10 digits"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={checkoutDetails.email}
                  onChange={handleInputChange}
                  placeholder="e.g., your.email@example.com"
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                />
              </div>
            </motion.div>

            {/* Submit Payment Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={
                paymentStatus === 'pending' || // Disable if already showing payment instructions
                !checkoutDetails.selectedCourseId ||
                isNaN(parseFloat(checkoutDetails.amount)) || parseFloat(checkoutDetails.amount) <= 0 ||
                !checkoutDetails.fullName ||
                !checkoutDetails.phoneNumber
              }
              className="w-full bg-[#41c8df] text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-6"
            >
              {paymentStatus === 'pending' ? 'Payment Instructions Displayed' : 'Proceed to UPI Payment'}
              {paymentStatus !== 'pending' && <Smartphone className="w-5 h-5 ml-2" />}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
