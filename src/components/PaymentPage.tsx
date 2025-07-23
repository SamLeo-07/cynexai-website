import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, CreditCard, Smartphone, Banknote } from 'lucide-react'; // Added icons for payment types
import { Link, useNavigate } from 'react-router-dom';

// Declare Razorpay global object
declare const Razorpay: any;

const PaymentPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [loadingRazorpayScript, setLoadingRazorpayScript] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Form Data States - Combined customer and payment details
  const [checkoutDetails, setCheckoutDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '', // Added email as it's common for payment
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India', // Default to India
    amount: '' as string, // User-entered amount
    description: 'General Payment for CynexAI Services', // Payment description
    selectedPaymentMethod: 'credit_card_upi' // Default or selected method
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
      if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
        setCheckoutDetails(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setCheckoutDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setCheckoutDetails(prev => ({ ...prev, selectedPaymentMethod: method }));
  };

  const initiatePaymentProcess = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    if (loadingRazorpayScript) {
      setMessage('Payment gateway is still loading. Please wait.');
      return;
    }

    const parsedAmount = parseFloat(checkoutDetails.amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setMessage('Please enter a valid amount greater than zero.');
      setPaymentStatus('error');
      return;
    }

    // Basic validation for required fields (you can expand this)
    if (!checkoutDetails.firstName || !checkoutDetails.lastName || !checkoutDetails.email || !checkoutDetails.phoneNumber || !checkoutDetails.address || !checkoutDetails.city || !checkoutDetails.pincode || !checkoutDetails.state) {
        setMessage('Please fill in all required customer details.');
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
          description: checkoutDetails.description,
          notes: {
            // Pass all relevant checkout details as notes to Razorpay order
            firstName: checkoutDetails.firstName,
            lastName: checkoutDetails.lastName,
            phoneNumber: checkoutDetails.phoneNumber,
            email: checkoutDetails.email,
            address: checkoutDetails.address,
            city: checkoutDetails.city,
            state: checkoutDetails.state,
            pincode: checkoutDetails.pincode,
            country: checkoutDetails.country,
            paymentType: 'Variable Payment - Full Checkout',
            selectedMethod: checkoutDetails.selectedPaymentMethod, // Log selected method
            websiteUrl: window.location.origin,
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
          setCheckoutDetails({
            firstName: '', lastName: '', phoneNumber: '', email: '', address: '', city: '', state: '', pincode: '', country: 'India',
            description: 'General Payment for CynexAI Services', amount: '', selectedPaymentMethod: 'credit_card_upi'
          });
        },
        prefill: {
          name: `${checkoutDetails.firstName} ${checkoutDetails.lastName}`,
          email: checkoutDetails.email,
          contact: checkoutDetails.phoneNumber,
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
            2. Select payment
          </motion.h2>

          <motion.div variants={containerVariants} className="space-y-4">
            {/* Credit Card Option */}
            <label
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200
                ${checkoutDetails.selectedPaymentMethod === 'credit_card_upi' ? 'border-[#41c8df] bg-[#41c8df]/10' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card_upi"
                checked={checkoutDetails.selectedPaymentMethod === 'credit_card_upi'}
                onChange={() => handlePaymentMethodChange('credit_card_upi')}
                className="form-radio h-5 w-5 text-[#41c8df] border-gray-300 focus:ring-[#41c8df]"
              />
              <span className="ml-3 text-lg font-semibold text-gray-800 flex-grow">Credit Card / UPI</span>
              <div className="flex items-center space-x-2">
                <img src="https://placehold.co/30x20/ffffff/000000?text=VISA" alt="Visa" className="h-4" />
                <img src="https://placehold.co/30x20/ffffff/000000?text=MC" alt="MasterCard" className="h-4" />
                <img src="https://placehold.co/30x20/ffffff/000000?text=UPI" alt="UPI" className="h-4" />
              </div>
            </label>

            {/* Placeholder for other payment methods (e.g., Google Pay, if Razorpay supports direct initiation) */}
            <label
              className={`flex items-center p-4 border rounded-lg cursor-not-allowed opacity-60
                ${checkoutDetails.selectedPaymentMethod === 'google_pay' ? 'border-[#41c8df] bg-[#41c8df]/10' : 'border-gray-300'}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="google_pay"
                checked={checkoutDetails.selectedPaymentMethod === 'google_pay'}
                onChange={() => handlePaymentMethodChange('google_pay')}
                disabled // Disable for now as it's a placeholder
                className="form-radio h-5 w-5 text-[#41c8df] border-gray-300 focus:ring-[#41c8df]"
              />
              <span className="ml-3 text-lg font-semibold text-gray-800 flex-grow">Google Pay</span>
              <img src="https://placehold.co/30x20/ffffff/000000?text=GPay" alt="Google Pay" className="h-4" />
            </label>

            {/* Placeholder for other payment methods (e.g., Netbanking, Wallets) */}
            <label
              className={`flex items-center p-4 border rounded-lg cursor-not-allowed opacity-60
                ${checkoutDetails.selectedPaymentMethod === 'netbanking_wallets' ? 'border-[#41c8df] bg-[#41c8df]/10' : 'border-gray-300'}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="netbanking_wallets"
                checked={checkoutDetails.selectedPaymentMethod === 'netbanking_wallets'}
                onChange={() => handlePaymentMethodChange('netbanking_wallets')}
                disabled // Disable for now as it's a placeholder
                className="form-radio h-5 w-5 text-[#41c8df] border-gray-300 focus:ring-[#41c8df]"
              />
              <span className="ml-3 text-lg font-semibold text-gray-800 flex-grow">Netbanking / Wallets</span>
              <div className="flex items-center space-x-2">
                <Banknote className="w-5 h-5 text-gray-600" />
                <Smartphone className="w-5 h-5 text-gray-600" />
              </div>
            </label>

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
            {/* Order Summary */}
            <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-3 mb-6">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">Order #:</span>
                  <span className="font-semibold text-gray-800">78399281</span> {/* Static for now, could be dynamic */}
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">Coupon Code:</span>
                  <button type="button" className="text-[#41c8df] hover:underline text-sm">Apply</button>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">Order Amount:</span>
                  <span className="font-semibold text-gray-800">₹{parseFloat(checkoutDetails.amount || '0').toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-2xl font-bold pt-4 border-t border-gray-200">
                  <span className="text-gray-800">Total Amount:</span>
                  <span className="text-[#41c8df]">INR ₹{parseFloat(checkoutDetails.amount || '0').toFixed(2)}</span>
                </div>
                {/* Amount and Description Inputs (Moved here) */}
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2 text-left">Enter Amount (INR)</label>
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
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 text-left">Payment Description (Optional)</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={checkoutDetails.description}
                    onChange={handleInputChange}
                    placeholder="e.g., Course Fee, Consultation"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>
            </motion.div>

            {/* Customer Information */}
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
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={checkoutDetails.address}
                  onChange={handleInputChange}
                  placeholder="e.g., 111 SW 5TH AVE FL 30"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={checkoutDetails.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Portland"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={checkoutDetails.state}
                    onChange={handleInputChange}
                    placeholder="e.g., Oregon"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={checkoutDetails.pincode}
                  onChange={handleInputChange}
                  placeholder="e.g., 97204"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-gray-900 placeholder-gray-500 outline-none"
                />
              </div>
              {/* Country is defaulted to India, but can be a select if needed */}
              <input type="hidden" name="country" value={checkoutDetails.country} /> {/* Hidden field for country */}
            </motion.div>

            {/* Submit Secure Payment Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loadingRazorpayScript || paymentStatus === 'processing' || !checkoutDetails.amount || parseFloat(checkoutDetails.amount) <= 0 || !checkoutDetails.firstName || !checkoutDetails.email || !checkoutDetails.phoneNumber} // Basic validation
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
