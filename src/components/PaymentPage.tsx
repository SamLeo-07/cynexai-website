import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, CreditCard, Smartphone, Banknote, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Declare Razorpay global object
declare const Razorpay: any;

// Define courses (Frontend for display, Backend for definitive price/description)
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
  const [loadingRazorpayScript, setLoadingRazorpayScript] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const [checkoutDetails, setCheckoutDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    selectedCourseId: '', // Stores the ID of the selected course
    amount: '' as string, // User-entered amount, always visible
    upiId: '', // New state for UPI ID
    selectedPaymentMethod: 'credit_card' // Default to Credit Card
  });

  // Derived state for selected course name (for display in Order Summary)
  const selectedCourseName = coursesData.find(course => course.id === checkoutDetails.selectedCourseId)?.name || 'N/A';

  // IMPORTANT: Replace with the Web App URL of your Google Apps Script backend for Razorpay
  const RAZORPAY_BACKEND_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

  // IMPORTANT: Replace with your public Razorpay Key ID
  const RAZORPAY_FRONTEND_KEY_ID = 'rzp_test_YOUR_KEY_ID';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setLoadingRazorpayScript(false);
    script.onerror = () => {
      setMessage('Failed to load Razorpay script. Please check your internet connection and try again.');
      setLoadingRazorpayScript(false);
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'amount') { // Handle the main amount input
      if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
        setCheckoutDetails(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setCheckoutDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setCheckoutDetails(prev => ({ ...prev, selectedPaymentMethod: method }));
    // Clear UPI ID if switching away from UPI
    if (method !== 'upi') {
      setCheckoutDetails(prev => ({ ...prev, upiId: '' }));
    }
  };

  const initiatePaymentProcess = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loadingRazorpayScript) {
      setMessage('Payment gateway is still loading. Please wait.');
      return;
    }

    // Frontend validation for selected course
    if (!checkoutDetails.selectedCourseId) {
      setMessage('Please select a course.');
      setPaymentStatus('error');
      return;
    }

    // Frontend validation for amount
    const parsedAmount = parseFloat(checkoutDetails.amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setMessage('Please enter a valid amount greater than zero.');
      setPaymentStatus('error');
      return;
    }

    // Basic validation for customer details
    if (!checkoutDetails.firstName || !checkoutDetails.lastName || !checkoutDetails.email || !checkoutDetails.phoneNumber) {
        setMessage('Please fill in all required personal details (Name, Email, Phone).');
        setPaymentStatus('error');
        return;
    }

    // UPI ID validation if UPI is selected
    if (checkoutDetails.selectedPaymentMethod === 'upi' && !checkoutDetails.upiId) {
      setMessage('Please enter your UPI ID.');
      setPaymentStatus('error');
      return;
    }

    setPaymentStatus('processing');
    setMessage('Initiating payment...');

    try {
      // Step 1: Call your backend to create an order
      const backendPayload = {
        courseId: checkoutDetails.selectedCourseId,
        amount: parsedAmount, // Send user-entered amount to backend
        firstName: checkoutDetails.firstName,
        lastName: checkoutDetails.lastName,
        phoneNumber: checkoutDetails.phoneNumber,
        email: checkoutDetails.email,
        upiId: checkoutDetails.upiId, // Pass UPI ID to backend
        selectedPaymentMethod: checkoutDetails.selectedPaymentMethod, // Log selected method
      };

      const orderResponse = await fetch(RAZORPAY_BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendPayload),
      });

      const orderData = await orderResponse.json();

      if (orderData.error) {
        setPaymentStatus('error');
        setMessage(`Failed to create order: ${orderData.message}`);
        console.error('Backend order creation error:', orderData.message);
        return;
      }

      // Step 2: Open Razorpay Checkout modal
      const options = {
        key: RAZORPAY_FRONTEND_KEY_ID,
        amount: orderData.amount, // Amount from the order created on backend (securely derived)
        currency: orderData.currency,
        name: 'CynexAI',
        description: orderData.description || 'Course Enrollment',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          setPaymentStatus('success');
          setMessage('Payment successful! Thank you for your payment.');
          console.log('Payment success response from Razorpay:', response);
          // Optionally clear form after success
          setCheckoutDetails({
            firstName: '', lastName: '', phoneNumber: '', email: '',
            selectedCourseId: '', amount: '', upiId: '', selectedPaymentMethod: 'credit_card'
          });
        },
        prefill: {
          name: orderData.prefill.name, // Prefill from backend response
          email: orderData.prefill.email,
          contact: orderData.prefill.contact,
          vpa: checkoutDetails.selectedPaymentMethod === 'upi' ? checkoutDetails.upiId : undefined // Prefill UPI ID if selected
        },
        notes: orderData.notes, // Notes passed from backend order
        theme: {
          color: '#41c8df',
        },
        modal: {
          ondismiss: function() {
            setPaymentStatus('idle');
            setMessage('Payment cancelled by user.');
          }
        }
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();

    } catch (error) {
      setPaymentStatus('error');
      setMessage('An unexpected error occurred during payment. Please try again.');
      console.error('Payment initiation error:', error);
    }
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } } };

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-20 pb-10 flex items-center justify-center font-inter">
      <motion.div
        ref={ref}
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

        {/* Left Column: Payment Selection */}
        <div className="lg:w-2/5 lg:pr-8 mb-8 lg:mb-0">
          <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl font-bold mb-6 border-b pb-3 border-gray-200">
            2. Select Payment
          </motion.h2>

          <motion.div variants={containerVariants} className="space-y-4">
            {/* Credit Card / Debit Card Option */}
            <label
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200
                ${checkoutDetails.selectedPaymentMethod === 'credit_card' ? 'border-[#41c8df] bg-[#41c8df]/10' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={checkoutDetails.selectedPaymentMethod === 'credit_card'}
                onChange={() => handlePaymentMethodChange('credit_card')}
                className="form-radio h-5 w-5 text-[#41c8df] border-gray-300 focus:ring-[#41c8df]"
              />
              <span className="ml-3 text-lg font-semibold text-gray-800 flex-grow">Credit Card / Debit Card</span>
              <div className="flex items-center space-x-2">
                <img src="https://placehold.co/30x20/ffffff/000000?text=VISA" alt="Visa" className="h-4" />
                <img src="https://placehold.co/30x20/ffffff/000000?text=MC" alt="MasterCard" className="h-4" />
                <img src="https://placehold.co/30x20/ffffff/000000?text=RuPay" alt="RuPay" className="h-4" />
              </div>
            </label>

            {/* UPI Option */}
            <label
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200
                ${checkoutDetails.selectedPaymentMethod === 'upi' ? 'border-[#41c8df] bg-[#41c8df]/10' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={checkoutDetails.selectedPaymentMethod === 'upi'}
                onChange={() => handlePaymentMethodChange('upi')}
                className="form-radio h-5 w-5 text-[#41c8df] border-gray-300 focus:ring-[#41c8df]"
              />
              <span className="ml-3 text-lg font-semibold text-gray-800 flex-grow">UPI</span>
              <div className="flex items-center space-x-2">
                <img src="https://placehold.co/30x20/ffffff/000000?text=UPI" alt="UPI" className="h-4" />
                <img src="https://placehold.co/30x20/ffffff/000000?text=GPay" alt="Google Pay" className="h-4" />
                <img src="https://placehold.co/30x20/ffffff/000000?text=PhonePe" alt="PhonePe" className="h-4" />
              </div>
            </label>

            {/* UPI ID Input Field (Conditionally rendered) */}
            {checkoutDetails.selectedPaymentMethod === 'upi' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-2 text-left">Your UPI ID (VPA)</label>
                <input
                  type="text"
                  id="upiId"
                  name="upiId"
                  value={checkoutDetails.upiId}
                  onChange={handleInputChange}
                  placeholder="e.g., yourname@bankname"
                  required={checkoutDetails.selectedPaymentMethod === 'upi'}
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                />
                <p className="text-xs text-gray-500 mt-1 text-left">
                  (This will pre-fill in Razorpay. Actual validation happens there.)
                </p>
              </motion.div>
            )}

          </motion.div>

          {/* Status Message */}
          {message && (
            <p className={`mt-6 text-center font-medium ${
              paymentStatus === 'success' ? 'text-green-600' :
              paymentStatus === 'error' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {message}
            </p>
          )}

        </div>

        {/* Right Column: Order Summary & Customer Information */}
        <div className="lg:w-3/5 lg:pl-8">
          <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl font-bold mb-6 border-b pb-3 border-gray-200">
            Order Details
          </motion.h2>

          <form onSubmit={initiatePaymentProcess} className="space-y-4">
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
                    {course.name} {/* Display name without price here */}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Amount Input Field (Always visible) */}
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
                  <span className="text-gray-600">Order #:</span>
                  <span className="font-semibold text-gray-800">78399281</span> {/* Static for now */}
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

            {/* Customer Information (Simplified) */}
            <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={checkoutDetails.firstName}
                    onChange={handleInputChange}
                    placeholder="e.g., John"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={checkoutDetails.lastName}
                    onChange={handleInputChange}
                    placeholder="e.g., Doe"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={checkoutDetails.email}
                  onChange={handleInputChange}
                  placeholder="e.g., your.email@example.com"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                />
              </div>
            </motion.div>

            {/* Submit Secure Payment Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={
                loadingRazorpayScript ||
                paymentStatus === 'processing' ||
                !checkoutDetails.selectedCourseId ||
                isNaN(parseFloat(checkoutDetails.amount)) || parseFloat(checkoutDetails.amount) <= 0 || // Validate amount
                !checkoutDetails.firstName ||
                !checkoutDetails.lastName ||
                !checkoutDetails.email ||
                !checkoutDetails.phoneNumber ||
                (checkoutDetails.selectedPaymentMethod === 'upi' && !checkoutDetails.upiId) // Disable if UPI selected but ID is empty
              }
              className="w-full bg-[#41c8df] text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-6"
            >
              {loadingRazorpayScript ? 'Loading Gateway...' :
               paymentStatus === 'processing' ? 'Processing...' :
               'Submit Secure Payment'}
              {!loadingRazorpayScript && paymentStatus === 'idle' && <CreditCard className="w-5 h-5 ml-2" />}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
