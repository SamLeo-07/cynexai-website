import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, CreditCard, CheckCircle } from 'lucide-react'; // Added CheckCircle for success
import { Link, useNavigate } from 'react-router-dom';

// Declare Razorpay global object
declare const Razorpay: any;

const PaymentPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [loadingRazorpayScript, setLoadingRazorpayScript] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Form Data States
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    country: 'India', // Default to India
    mobile: '',
    email: '',
    description: 'General Payment for CynexAI Services', // Payment description
    amount: '' as string, // User-entered amount
  });

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
    if (name === 'amount') {
      // Allow only numbers and a single decimal point (up to 2 decimal places)
      if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
        setBillingDetails(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setBillingDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const initiatePaymentProcess = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    if (loadingRazorpayScript) {
      setMessage('Payment gateway is still loading. Please wait.');
      return;
    }

    const parsedAmount = parseFloat(billingDetails.amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setMessage('Please enter a valid amount greater than zero.');
      setPaymentStatus('error');
      return;
    }

    const amountInPaisa = Math.round(parsedAmount * 100);

    setPaymentStatus('processing');
    setMessage('Initiating payment...');

    try {
      // Step 1: Call your backend to create an order
      const orderResponse = await fetch(RAZORPAY_BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInPaisa,
          currency: 'INR',
          description: billingDetails.description,
          notes: {
            ...billingDetails, // Pass all billing details as notes to Razorpay order
            paymentType: 'Variable Payment - Full Checkout',
            websiteUrl: window.location.origin,
            // Exclude amount from notes if it's already in the main amount field
            amount: undefined // Don't duplicate amount in notes
          }
        }),
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
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'CynexAI',
        description: orderData.description || 'General Payment',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          setPaymentStatus('success');
          setMessage('Payment successful! Thank you for your payment.');
          console.log('Payment success response from Razorpay:', response);
          // Clear form after success
          setBillingDetails({
            name: '', address: '', pincode: '', city: '', state: '', country: 'India', mobile: '', email: '',
            description: 'General Payment for CynexAI Services', amount: ''
          });
        },
        prefill: {
          name: billingDetails.name,
          email: billingDetails.email,
          contact: billingDetails.mobile,
        },
        notes: orderData.notes,
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
    <div className="min-h-screen bg-white text-gray-900 pt-20 pb-10 flex items-center justify-center">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative bg-white rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-4xl mx-auto border border-gray-200 flex flex-col lg:flex-row" // Flex container for 2 columns
      >
        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors z-10"
          aria-label="Close payment modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Column: Billing Information */}
        <div className="lg:w-2/3 lg:pr-8 mb-8 lg:mb-0">
          <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl font-bold mb-6 border-b pb-3 border-gray-200">
            Billing Information
          </motion.h2>
          <form onSubmit={initiatePaymentProcess} className="space-y-4">
            {/* Mobile Number (Pre-filled or Input) */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">Mobile No</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={billingDetails.mobile}
                onChange={handleInputChange}
                placeholder="e.g., 9876543210"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
              />
            </div>

            {/* Billing Details Section */}
            <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={billingDetails.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Shashi"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={billingDetails.address}
                    onChange={handleInputChange}
                    placeholder="e.g., Room no 1101, near Railway station Ambad"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none resize-y"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={billingDetails.pincode}
                      onChange={handleInputChange}
                      placeholder="e.g., 425001"
                      required
                      className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={billingDetails.city}
                      onChange={handleInputChange}
                      placeholder="e.g., Indore"
                      required
                      className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={billingDetails.state}
                      onChange={handleInputChange}
                      placeholder="e.g., MP"
                      required
                      className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={billingDetails.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 outline-none"
                    >
                      <option value="India">India</option>
                      {/* Add more countries if needed */}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={billingDetails.email}
                    onChange={handleInputChange}
                    placeholder="e.g., your.email@example.com"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>
                {/* Optional: Checkbox for different shipping address */}
                <div className="flex items-center">
                  <input type="checkbox" id="shipping-address" className="h-4 w-4 text-[#41c8df] border-gray-300 rounded focus:ring-[#41c8df]" />
                  <label htmlFor="shipping-address" className="ml-2 block text-sm text-gray-700">
                    My billing and shipping address are different
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Amount and Description Inputs (Moved inside form) */}
            <motion.div variants={itemVariants} className="space-y-4 pt-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2 text-left">Order Amount (INR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-bold">₹</span>
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={billingDetails.amount}
                    onChange={handleInputChange}
                    placeholder="e.g., 500.00"
                    required
                    className="w-full pl-8 pr-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none text-xl font-bold"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 text-left">Payment Description (Optional)</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={billingDetails.description}
                  onChange={handleInputChange}
                  placeholder="e.g., Course Fee, Consultation"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                />
              </div>
            </motion.div>

            {/* Status Message */}
            {message && (
              <p className={`mt-4 text-center font-medium ${
                paymentStatus === 'success' ? 'text-green-600' :
                paymentStatus === 'error' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {message}
              </p>
            )}

            {/* Proceed to Pay Button */}
            <motion.button
              type="submit" // Changed to submit to trigger form onSubmit
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loadingRazorpayScript || paymentStatus === 'processing' || !billingDetails.amount || parseFloat(billingDetails.amount) <= 0}
              className="w-full bg-[#41c8df] text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-6"
            >
              {loadingRazorpayScript ? 'Loading Gateway...' :
               paymentStatus === 'processing' ? 'Processing...' :
               'Proceed to Pay'}
              {!loadingRazorpayScript && paymentStatus === 'idle' && <CreditCard className="w-5 h-5 ml-2" />}
            </motion.button>
          </form>
        </div>

        {/* Right Column: Order Summary & Accepted Payments */}
        <div className="lg:w-1/3 lg:pl-8 lg:border-l lg:border-gray-200">
          <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl font-bold mb-6 border-b pb-3 border-gray-200">
            Order Summary
          </motion.h2>
          <motion.div variants={itemVariants} className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600">Order #:</span>
              <span className="font-semibold text-gray-800">78399281</span> {/* Static for now, could be dynamic */}
            </div>
            {/* Coupon Code - Placeholder */}
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600">Coupon Code:</span>
              <button className="text-[#41c8df] hover:underline text-sm">Apply</button>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600">Order Amount:</span>
              <span className="font-semibold text-gray-800">₹{parseFloat(billingDetails.amount || '0').toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-2xl font-bold pt-4 border-t border-gray-200">
              <span className="text-gray-800">Total Amount:</span>
              <span className="text-[#41c8df]">INR ₹{parseFloat(billingDetails.amount || '0').toFixed(2)}</span>
            </div>
          </motion.div>

          {/* "WE ACCEPT:" section with logos */}
          <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm font-semibold text-gray-600 mb-3">WE ACCEPT:</p>
            <div className="flex flex-wrap justify-center items-center gap-3">
              {/* Using placeholder images for card/UPI logos */}
              <img src="https://placehold.co/40x25/ffffff/000000?text=VISA" alt="Visa" className="h-6" />
              <img src="https://placehold.co/40x25/ffffff/000000?text=MC" alt="MasterCard" className="h-6" />
              <img src="https://placehold.co/40x25/ffffff/000000?text=RuPay" alt="RuPay" className="h-6" />
              <img src="https://placehold.co/40x25/ffffff/000000?text=UPI" alt="UPI" className="h-6" />
              <img src="https://placehold.co/40x25/ffffff/000000?text=GPay" alt="Google Pay" className="h-6" />
              <img src="https://placehold.co/40x25/ffffff/000000?text=PhonePe" alt="PhonePe" className="h-6" />
              {/* Add more relevant Indian payment logos if desired */}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
