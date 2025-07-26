// src/PaymentPage.tsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

declare const Razorpay: any;

const coursesData = [
  { id: 'DSB001', name: 'Data Science & Machine Learning' },
  { id: 'AIML002', name: 'Artificial Intelligence & Generative AI' },
  { id: 'FSD003', name: 'Full Stack Java Development' },
  { id: 'DEV004', name: 'DevOps & Cloud Technologies' },
  { id: 'PYT005', name: 'Python Programming' },
  { id: 'SWT006', name: 'Software Testing (Manual + Automation)' },
  { id: 'SAP007', name: 'SAP (Data Processing)' },
  { id: 'OTHER', name: 'Other / Custom Payment' },
];

const RAZORPAY_BACKEND_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYED_ID/exec'; // ← replace with your deployed Web App URL
const RAZORPAY_FRONTEND_KEY_ID = 'rzp_test_0Y5bq4WMY33zwb'; // ← your Razorpay Key ID

const PaymentPage: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [loadingScript, setLoadingScript] = useState(true);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    selectedCourseId: '',
    amount: '',
    upiId: '',
    selectedPaymentMethod: 'credit_card',
  });
  const [currentOrderId, setCurrentOrderId] = useState('N/A');

  const selectedCourseName =
    coursesData.find((c) => c.id === details.selectedCourseId)?.name || 'N/A';

  // Load Razorpay checkout.js once
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://checkout.razorpay.com/v1/checkout.js';
    tag.onload = () => setLoadingScript(false);
    tag.onerror = () => {
      setMsg('Failed to load payment gateway. Please refresh.');
      setLoadingScript(false);
    };
    document.body.appendChild(tag);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      // allow only up to two decimals
      if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
        setDetails((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMethod = (method: string) => {
    setDetails((prev) => ({
      ...prev,
      selectedPaymentMethod: method,
      upiId: method === 'upi' ? prev.upiId : '',
    }));
  };

  const initiatePaymentProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loadingScript) {
      setMsg('Please wait for payment gateway to load.');
      return;
    }

    // Validate inputs
    if (!details.selectedCourseId) {
      setStatus('error');
      return setMsg('Please select a course.');
    }
    const amt = parseFloat(details.amount);
    if (isNaN(amt) || amt <= 0) {
      setStatus('error');
      return setMsg('Enter a valid amount greater than zero.');
    }
    if (!details.firstName || !details.lastName || !details.phoneNumber) {
      setStatus('error');
      return setMsg('Fill in all required personal details.');
    }
    if (details.selectedPaymentMethod === 'upi' && !details.upiId) {
      setStatus('error');
      return setMsg('Please enter your UPI ID.');
    }

    setStatus('processing');
    setMsg('Initiating payment...');
    setCurrentOrderId('Generating...');

    try {
      // Create order on your backend
      const resp = await fetch(RAZORPAY_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...details, amount: amt }),
      });
      const data = await resp.json();
      if (data.error) {
        setStatus('error');
        setMsg(data.message || 'Payment initiation failed.');
        setCurrentOrderId('Error');
        return;
      }

      setCurrentOrderId(data.orderId);
      const options = {
        key: RAZORPAY_FRONTEND_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'CynexAI',
        description: data.description,
        order_id: data.orderId,
        prefill: {
          name: data.prefill.name,
          email: data.prefill.email,
          contact: data.prefill.contact,
          vpa: details.selectedPaymentMethod === 'upi' ? details.upiId : undefined,
        },
        notes: data.notes,
        theme: { color: '#41c8df' },
        handler: (response: any) => {
          setStatus('success');
          setMsg('Payment successful! Thank you.');
          // reset form
          setDetails({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            selectedCourseId: '',
            amount: '',
            upiId: '',
            selectedPaymentMethod: 'credit_card',
          });
          setCurrentOrderId('N/A');
        },
        modal: {
          ondismiss: () => {
            setStatus('idle');
            setMsg('Payment cancelled.');
            setCurrentOrderId('N/A');
          },
        },
      };
      new Razorpay(options).open();
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMsg('An unexpected error occurred. Please try again.');
      setCurrentOrderId('Error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-20 pb-10 flex items-center justify-center">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="relative bg-white rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-5xl mx-auto flex flex-col lg:flex-row border"
      >
        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Column: Payment Selection */}
        <div className="lg:w-2/5 lg:pr-8 mb-8 lg:mb-0">
          <motion.h2 variants={itemVariants} className="text-xl font-bold mb-6 border-b pb-3">
            2. Select Payment
          </motion.h2>

          <motion.div variants={containerVariants} className="space-y-4">
            {/* Credit/Debit Card */}
            <label
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                details.selectedPaymentMethod === 'credit_card'
                  ? 'border-[#41c8df] bg-[#41c8df]/10'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={details.selectedPaymentMethod === 'credit_card'}
                onChange={() => handleMethod('credit_card')}
                className="form-radio h-5 w-5 text-[#41c8df]"
              />
              <span className="ml-3 text-lg font-semibold flex-grow">Credit Card / Debit Card</span>
              <div className="flex items-center space-x-2">
                <img src="https://placehold.co/30x20?text=VISA" alt="Visa" className="h-4" />
                <img src="https://placehold.co/30x20?text=MC" alt="MasterCard" className="h-4" />
                <img src="https://placehold.co/30x20?text=RuPay" alt="RuPay" className="h-4" />
              </div>
            </label>

            {/* UPI */}
            <label
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                details.selectedPaymentMethod === 'upi'
                  ? 'border-[#41c8df] bg-[#41c8df]/10'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={details.selectedPaymentMethod === 'upi'}
                onChange={() => handleMethod('upi')}
                className="form-radio h-5 w-5 text-[#41c8df]"
              />
              <span className="ml-3 text-lg font-semibold flex-grow">UPI</span>
              <div className="flex items-center space-x-2">
                <img src="https://placehold.co/30x20?text=UPI" alt="UPI" className="h-4" />
                <img src="https://placehold.co/30x20?text=GPay" alt="Google Pay" className="h-4" />
                <img src="https://placehold.co/30x20?text=PhonePe" alt="PhonePe" className="h-4" />
              </div>
            </label>

            {/* UPI ID Field */}
            {details.selectedPaymentMethod === 'upi' && (
              <motion.div
                variants={itemVariants}
                className="mt-4"
              >
                <label htmlFor="upiId" className="block text-sm font-medium mb-2 text-left">
                  Your UPI ID (VPA)
                </label>
                <input
                  type="text"
                  id="upiId"
                  name="upiId"
                  value={details.upiId}
                  onChange={handleChange}
                  placeholder="yourname@bank"
                  required
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Validation happens in Razorpay.</p>
              </motion.div>
            )}
          </motion.div>

          {/* Status Message */}
          {msg && (
            <p
              className={`mt-6 text-center ${
                status === 'success'
                  ? 'text-green-600'
                  : status === 'error'
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              {msg}
            </p>
          )}
        </div>

        {/* Right Column: Order & Info */}
        <div className="lg:w-3/5 lg:pl-8">
          <motion.h2 variants={itemVariants} className="text-xl font-bold mb-6 border-b pb-3">
            Order Details
          </motion.h2>

          <form onSubmit={initiatePaymentProcess} className="space-y-4">
            {/* Course Dropdown */}
            <motion.div variants={itemVariants}>
              <label htmlFor="selectedCourseId" className="block text-sm font-medium mb-2">
                Select Course
              </label>
              <select
                id="selectedCourseId"
                name="selectedCourseId"
                value={details.selectedCourseId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg outline-none"
              >
                <option value="">-- Select a Course --</option>
                {coursesData.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Amount Input */}
            <motion.div variants={itemVariants}>
              <label htmlFor="amount" className="block text-sm font-medium mb-2 text-left">
                Amount (INR)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl font-bold">₹</span>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={details.amount}
                  onChange={handleChange}
                  placeholder="e.g., 500.00"
                  required
                  className="w-full pl-8 pr-4 py-3 border rounded-lg text-xl font-bold outline-none"
                />
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-4 border space-y-3">
              <div className="flex justify-between items-center text-lg">
                <span>Selected Course:</span>
                <span className="font-semibold">{selectedCourseName}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span>Order ID:</span>
                <span className="font-semibold">{currentOrderId}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span>Coupon Code:</span>
                <button type="button" className="text-[#41c8df] text-sm hover:underline">
                  Apply
                </button>
              </div>
              <div className="flex justify-between items-center text-2xl font-bold pt-4 border-t">
                <span>Total Amount:</span>
                <span className="text-[#41c8df]">
                  INR ₹{parseFloat(details.amount || '0').toFixed(2)}
                </span>
              </div>
            </motion.div>

            {/* Customer Info */}
            <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-4 border space-y-4">
              <h3 className="text-lg font-semibold mb-4">Your Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={details.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    className="w-full px-4 py-2 border rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={details.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    className="w-full px-4 py-2 border rounded-lg outline-none"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={details.phoneNumber}
                  onChange={handleChange}
                  placeholder="9876543210"
                  required
                  pattern="[0-9]{10}"
                  title="10 digit number"
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={details.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={
                loadingScript ||
                status === 'processing' ||
                !details.selectedCourseId ||
                isNaN(parseFloat(details.amount)) ||
                parseFloat(details.amount) <= 0 ||
                !details.firstName ||
                !details.lastName ||
                !details.phoneNumber ||
                (details.selectedPaymentMethod === 'upi' && !details.upiId)
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#41c8df] py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center"
            >
              {loadingScript
                ? 'Loading Gateway...'
                : status === 'processing'
                ? 'Processing...'
                : 'Submit Secure Payment'}
              {!loadingScript && status === 'idle' && (
                <CreditCard className="w-5 h-5 ml-2" />
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
