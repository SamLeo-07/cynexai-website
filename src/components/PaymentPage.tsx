import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

// Declare Razorpay global object (it will be loaded by the the script)
declare const Razorpay: any;

const PaymentPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [loading, setLoading] = useState(true); // State to track if Razorpay script is loaded
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle'); // Status of the payment process
  const [message, setMessage] = useState(''); // User-facing messages (e.g., success, error)
  const [amount, setAmount] = useState<number | string>(''); // State for user-entered amount
  const [description, setDescription] = useState('General Payment for CynexAI Services'); // State for user-entered description

  // IMPORTANT: Replace with the Web App URL of your Google Apps Script backend for Razorpay
  // This is where your frontend will send the amount to create an order.
  const RAZORPAY_BACKEND_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

  // IMPORTANT: Replace with your public Razorpay Key ID
  // Get this from Razorpay Dashboard -> Settings -> API Keys
  // Use your test key (rzp_test_...) for development and testing.
  const RAZORPAY_FRONTEND_KEY_ID = 'rzp_test_YOUR_KEY_ID';

  useEffect(() => {
    // Dynamically load the Razorpay Checkout script
    // This script provides the global 'Razorpay' object used to open the payment modal.
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      setLoading(false); // Set loading to false once the script is loaded
      console.log('Razorpay script loaded successfully.');
    };
    script.onerror = () => {
      setMessage('Failed to load Razorpay script. Please check your internet connection and try again.');
      setLoading(false); // Set loading to false on error
      console.error('Failed to load Razorpay script.');
    };
    document.body.appendChild(script);

    // Cleanup function: remove the script when the component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Handler for changes in the amount input field
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and a single decimal point for amount input
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  // Handler for changes in the description input field
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  // Main function to handle payment initiation when the "Pay Now" button is clicked
  const handlePayment = async () => {
    // 1. Check if Razorpay script is loaded
    if (loading) {
      setMessage('Razorpay script is still loading. Please wait a moment.');
      return;
    }

    // 2. Validate the entered amount
    const parsedAmount = parseFloat(amount as string);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setMessage('Please enter a valid amount greater than zero.');
      setPaymentStatus('error');
      return;
    }

    // Razorpay requires the amount in paisa (smallest currency unit).
    // For INR, 1 INR = 100 paisa. So, multiply by 100 and round to nearest integer.
    const amountInPaisa = Math.round(parsedAmount * 100);

    // Set payment status to processing and clear previous messages
    setPaymentStatus('processing');
    setMessage('Initiating payment...');

    try {
      // 3. Call your Google Apps Script backend to create a Razorpay Order
      // This step is crucial for security as it uses your private API key on the backend.
      const orderResponse = await fetch(RAZORPAY_BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send the amount and description from the frontend to the backend
        body: JSON.stringify({
          amount: amountInPaisa, // Amount in paisa
          currency: 'INR', // Currency (e.g., INR, USD)
          description: description, // User-provided description
          notes: {
            // Optional: Add any additional notes for the order
            paymentType: 'Variable Payment',
            websiteUrl: window.location.origin,
            // You could add userId, customerId, etc., if available from your app's state
          }
        }),
      });

      const orderData = await orderResponse.json();

      // Handle errors from your backend (e.g., if order creation failed on Razorpay's side)
      if (orderData.error) {
        setPaymentStatus('error');
        setMessage(`Failed to create order: ${orderData.message}`);
        console.error('Backend order creation error:', orderData.message);
        return;
      }

      // 4. Prepare options for Razorpay Checkout modal
      const options = {
        key: RAZORPAY_FRONTEND_KEY_ID, // Your public Razorpay Key ID
        amount: orderData.amount, // Amount from the order created on backend (in paisa)
        currency: orderData.currency, // Currency from the order
        name: 'CynexAI', // Your company/website name
        description: orderData.description || 'General Payment', // Description for the payment modal
        order_id: orderData.orderId, // The Order ID received from your backend
        handler: async function (response: any) {
          // This function is called by Razorpay when the payment is successful
          setPaymentStatus('success');
          setMessage('Payment successful! Thank you for your payment.');
          console.log('Payment success response from Razorpay:', response);

          // IMPORTANT: The definitive verification of payment success should happen
          // on your Google Apps Script backend via Razorpay webhooks.
          // This frontend handler is primarily for immediate user feedback.
          // You might redirect the user to a success page here:
          // navigate('/payment-success');
        },
        prefill: {
          // Optional: Pre-fill customer details if you have them
          // name: 'Customer Name',
          // email: 'customer@example.com',
          // contact: '9999999999',
        },
        notes: orderData.notes, // Notes to be displayed in Razorpay dashboard
        theme: {
          color: '#41c8df', // Customize the theme color of the Razorpay modal
        },
        modal: {
          // Callback when the payment modal is dismissed (closed by user)
          ondismiss: function() {
            setPaymentStatus('idle');
            setMessage('Payment cancelled by user.');
          }
        }
      };

      // 5. Create and open the Razorpay Checkout modal
      const rzp1 = new Razorpay(options);
      rzp1.open();

    } catch (error) {
      // Handle any network or unexpected errors during the process
      setPaymentStatus('error');
      setMessage('An unexpected error occurred during payment. Please try again.');
      console.error('Payment initiation error:', error);
    }
  };

  // Animation variants for Framer Motion
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } } };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 pb-10">
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-gray-800 to-gray-950">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Link to="/" className="text-[#41c8df] hover:text-white flex items-center justify-center mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
          </Link>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
            >
              Make a Payment
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Enter the amount you wish to pay for CynexAI services.
            </motion.p>

            <motion.div variants={itemVariants} className="bg-gray-800 rounded-2xl p-8 shadow-xl max-w-lg mx-auto">
              <h3 className="text-2xl font-semibold mb-6 text-white">Payment Details</h3>
              <div className="space-y-6 mb-8">
                {/* Amount Input Field */}
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2 text-left">Amount (INR)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl font-bold">₹</span>
                    <input
                      type="text" // Using text type to allow for decimal input
                      id="amount"
                      name="amount"
                      value={amount}
                      onChange={handleAmountChange}
                      placeholder="e.g., 100.00"
                      required
                      className="w-full pl-8 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-white placeholder-gray-400 outline-none text-xl font-bold"
                    />
                  </div>
                </div>
                {/* Description Input Field */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2 text-left">Description (Optional)</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="e.g., Course Fee, Consultation, Donation"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-[#41c8df] focus:ring-1 focus:ring-[#41c8df] text-white placeholder-gray-400 outline-none"
                  />
                </div>
              </div>

              {/* Payment Status and Message Display */}
              {message && (
                <p className={`mb-4 text-center font-medium ${
                  paymentStatus === 'success' ? 'text-green-500' :
                  paymentStatus === 'error' ? 'text-red-500' : 'text-gray-400'
                }`}>
                  {message}
                </p>
              )}

              {/* Pay Now Button */}
              <motion.button
                onClick={handlePayment}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                // Disable button if loading, processing, or amount is invalid/empty
                disabled={loading || paymentStatus === 'processing' || !amount || parseFloat(amount as string) <= 0}
                className="w-full bg-[#41c8df] text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? 'Loading Payment Gateway...' :
                 paymentStatus === 'processing' ? 'Processing Payment...' :
                 'Pay Now'}
                {!loading && paymentStatus === 'idle' && <CreditCard className="w-5 h-5 ml-2" />}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PaymentPage;