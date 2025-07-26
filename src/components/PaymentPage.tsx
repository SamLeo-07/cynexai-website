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
  { id: 'OTHER', name: 'Other / Custom Payment' }
];

const RAZORPAY_BACKEND_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYED_ID/https://script.google.com/macros/s/AKfycbyRKKMcfBQLO_gZxO3XnrzMLpj1BhEAh3LXXABZwVFEk_SWdUwQfHEvYw98xKa8ATyaIA/exec';
const RAZORPAY_FRONTEND_KEY_ID = 'rzp_test_0Y5bq4WMY33zwb';

const PaymentPage: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [loadingScript, setLoadingScript] = useState(true);
  const [status, setStatus] = useState<'idle'|'processing'|'success'|'error'>('idle');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    firstName: '', lastName: '', phoneNumber: '', email: '',
    selectedCourseId: '', amount: '', upiId: '', selectedPaymentMethod: 'credit_card'
  });
  const [currentOrderId, setCurrentOrderId] = useState('N/A');
  const selectedCourseName = 
    coursesData.find(c => c.id === details.selectedCourseId)?.name || 'N/A';

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://checkout.razorpay.com/v1/checkout.js';
    tag.onload = () => setLoadingScript(false);
    tag.onerror = () => { setMsg('Failed to load gateway.'); setLoadingScript(false); };
    document.body.appendChild(tag);
    // keep loaded permanently
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      if (value === '' || /^\d*\.?\d{0,2}$/.test(value))
        setDetails(prev => ({ ...prev, [name]: value }));
    } else {
      setDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleMethod = (method: string) => {
    setDetails(prev => ({
      ...prev,
      selectedPaymentMethod: method,
      upiId: method === 'upi' ? prev.upiId : ''
    }));
  };

  const initiatePaymentProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loadingScript) return setMsg('Please wait for gateway to load.');

    if (!details.selectedCourseId) {
      setStatus('error'); return setMsg('Please select a course.');
    }
    const amt = parseFloat(details.amount);
    if (isNaN(amt) || amt <= 0) {
      setStatus('error'); return setMsg('Enter valid amount.');
    }
    if (!details.firstName || !details.lastName || !details.phoneNumber) {
      setStatus('error'); return setMsg('Fill all required details.');
    }
    if (details.selectedPaymentMethod === 'upi' && !details.upiId) {
      setStatus('error'); return setMsg('Enter your UPI ID.');
    }

    setStatus('processing');
    setMsg('Initiating payment...');
    setCurrentOrderId('Generating...');

    try {
      const resp = await fetch(RAZORPAY_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...details, amount: amt })
      });
      const data = await resp.json();
      if (data.error) {
        setStatus('error');
        setMsg(data.message || 'Payment initiation failed');
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
        handler: (response: any) => {
          setStatus('success');
          setMsg('Payment successful');
          setDetails({
            firstName: '', lastName: '', phoneNumber: '', email: '',
            selectedCourseId: '', amount: '', upiId: '', selectedPaymentMethod: 'credit_card'
          });
          setCurrentOrderId('N/A');
        },
        prefill: {
          name: data.prefill.name,
          email: data.prefill.email,
          contact: data.prefill.contact,
          vpa: details.selectedPaymentMethod === 'upi' ? details.upiId : undefined
        },
        notes: data.notes,
        theme: { color: '#41c8df' },
        modal: {
          ondismiss: () => {
            setStatus('idle');
            setMsg('Payment cancelled');
            setCurrentOrderId('N/A');
          }
        }
      };
      new Razorpay(options).open();
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMsg('Unexpected error.');
      setCurrentOrderId('Error');
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0, opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-20 pb-10 flex items-center justify-center font-inter">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={container}
        className="relative bg-white rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-5xl mx-auto border border-gray-200 flex flex-col lg:flex-row"
      >
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left: Payment Method */}
        <div className="lg:w-2/5 lg:pr-8 mb-8 lg:mb-0">
          <motion.h2 variants={item} className="text-2xl font-bold mb-6 border-b pb-3">
            2. Select Payment
          </motion.h2>
          {/* ... your existing radio & UPI-ID fields unchanged */}
          {msg && (
            <p className={`mt-6 text-center ${
              status === 'error' ? 'text-red-600' :
              status === 'success' ? 'text-green-600' : 'text-gray-600'
            }`}>
              {msg}
            </p>
          )}
        </div>

        {/* Right: Order + Info */}
        <div className="lg:w-3/5 lg:pl-8">
          <motion.h2 variants={item} className="text-2xl font-bold mb-6 border-b pb-3">
            Order Details
          </motion.h2>
          <form onSubmit={initiatePaymentProcess} className="space-y-4">
            {/* ... your course select, amount, summary unchanged */}

            {/* Customer Info */}
            <motion.div variants={item} className="bg-gray-50 rounded-lg p-4 border">
              <h3 className="text-lg font-semibold mb-4">Your Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* firstName, lastName */}
              </div>
              {/* phoneNumber unchanged */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email (Optional)
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={details.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
              </div>
            </motion.div>

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
              className="w-full bg-[#41c8df] py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center"
            >
              {loadingScript
                ? 'Loading...'
                : status === 'processing'
                ? 'Processing...'
                : 'Submit Secure Payment'}
              {(!loadingScript && status === 'idle') && (
                <CreditCard className="ml-2 w-5 h-5" />
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
