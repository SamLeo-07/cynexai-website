import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Calendar, 
  Clock, 
  Users, 
  Lock, 
  Mail, 
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const WebinarPortal = () => {
  const [activeTab, setActiveTab] = useState('join');
  const [joinForm, setJoinForm] = useState({
    email: '',
    sessionId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [joinStatus, setJoinStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Mock webinar sessions
  const upcomingSessions = [
    {
      id: 'WS001',
      title: 'Introduction to Data Science',
      instructor: 'Dr. Priya Sharma',
      date: '2025-01-15',
      time: '18:00',
      duration: '2 hours',
      participants: 45,
      maxParticipants: 50,
      description: 'Learn the fundamentals of data science and its applications in modern business.',
      status: 'upcoming'
    },
    {
      id: 'WS002',
      title: 'Machine Learning Basics',
      instructor: 'Rahul Kumar',
      date: '2025-01-17',
      time: '19:00',
      duration: '1.5 hours',
      participants: 32,
      maxParticipants: 40,
      description: 'Explore the core concepts of machine learning and hands-on examples.',
      status: 'upcoming'
    },
    {
      id: 'WS003',
      title: 'Career Transition to Tech',
      instructor: 'Sneha Patel',
      date: '2025-01-20',
      time: '17:30',
      duration: '1 hour',
      participants: 28,
      maxParticipants: 35,
      description: 'Tips and strategies for successfully transitioning to a tech career.',
      status: 'live'
    }
  ];

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoinStatus('loading');
    setErrorMessage('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock validation
    const validEmails = ['student@example.com', 'learner@test.com', 'user@demo.com'];
    const validSessions = upcomingSessions.map(s => s.id);

    if (!validEmails.includes(joinForm.email)) {
      setJoinStatus('error');
      setErrorMessage('Email not registered for any webinar sessions.');
      return;
    }

    if (!validSessions.includes(joinForm.sessionId)) {
      setJoinStatus('error');
      setErrorMessage('Invalid session ID.');
      return;
    }

    if (joinForm.password !== 'demo123') {
      setJoinStatus('error');
      setErrorMessage('Incorrect session password.');
      return;
    }

    setJoinStatus('success');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJoinForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Live Webinar Portal
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our interactive online sessions and learn from industry experts in real-time
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
            <button
              onClick={() => setActiveTab('join')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'join'
                  ? 'bg-primary text-secondary hover:bg-primary-600'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Join Session
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'schedule'
                  ? 'bg-primary text-secondary hover:bg-primary-600'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Upcoming Sessions
            </button>
          </div>
        </motion.div>

        {/* Join Session Tab */}
        {activeTab === 'join' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl mx-auto"
          >
            {joinStatus === 'success' ? (
              <div className="bg-background-100 text-background rounded-2xl p-8 border border-white/20 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                
                <h2 className="text-2xl font-bold text-white mb-4">
                  Successfully Joined!
                </h2>
                
                <p className="text-gray-300 mb-6">
                  You are now connected to the webinar session. The session will begin shortly.
                </p>
                
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Session Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Session ID:</span>
                      <span className="text-white font-mono">{joinForm.sessionId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white">{joinForm.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400">Connected</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setJoinStatus('idle');
                    setJoinForm({ email: '', sessionId: '', password: '' });
                  }}
                  className="bg-primary text-secondary hover:bg-primary-600 px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-cyan-700 transition-all duration-300"
                >
                  Join Another Session
                </button>
              </div>
            ) : (
              <div className="bg-background-100 text-background rounded-2xl p-8 border border-white/20">
                <div className="flex items-center mb-6">
                  <Video className="w-8 h-8 text-purple-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Join Live Session</h2>
                </div>
                
                <form onSubmit={handleJoinSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Registered Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={joinForm.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                      placeholder="Enter your registered email"
                    />
                  </div>

                  {/* Session ID Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Session ID *
                    </label>
                    <input
                      type="text"
                      name="sessionId"
                      value={joinForm.sessionId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                      placeholder="Enter session ID (e.g., WS001)"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Lock className="w-4 h-4 inline mr-2" />
                      Session Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={joinForm.password}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                        placeholder="Enter session password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {joinStatus === 'error' && (
                    <div className="flex items-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-red-300">{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={joinStatus === 'loading'}
                    whileHover={{ scale: joinStatus === 'loading' ? 1 : 1.02 }}
                    whileTap={{ scale: joinStatus === 'loading' ? 1 : 0.98 }}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                      joinStatus === 'loading'
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-lg hover:shadow-purple-500/25'
                    }`}
                  >
                    {joinStatus === 'loading' ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Joining Session...
                      </div>
                    ) : (
                      'Join Session'
                    )}
                  </motion.button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-white font-medium mb-2">Demo Credentials</h4>
                  <div className="text-gray-400 text-sm space-y-1">
                    <p><strong>Email:</strong> student@example.com</p>
                    <p><strong>Session ID:</strong> WS001, WS002, or WS003</p>
                    <p><strong>Password:</strong> demo123</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Upcoming Sessions Tab */}
        {activeTab === 'schedule' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {upcomingSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background-100 text-background rounded-2xl p-6 border border-white/20 hover:border-purple-400/30 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-white">{session.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.status === 'live' 
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30 animate-pulse' 
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {session.status === 'live' ? '🔴 LIVE' : 'Upcoming'}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{session.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                        {new Date(session.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Clock className="w-4 h-4 mr-2 text-purple-400" />
                        {session.time} ({session.duration})
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users className="w-4 h-4 mr-2 text-purple-400" />
                        {session.participants}/{session.maxParticipants}
                      </div>
                      <div className="text-gray-400">
                        <strong>Instructor:</strong> {session.instructor}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        setActiveTab('join');
                        setJoinForm(prev => ({ ...prev, sessionId: session.id }));
                      }}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        session.status === 'live'
                          ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700'
                          : 'bg-primary text-secondary hover:bg-primary-600 hover:from-purple-700 hover:to-cyan-700'
                      }`}
                    >
                      {session.status === 'live' ? 'Join Now' : 'Register'}
                    </button>
                    <button className="px-6 py-3 border-2 border-purple-400 text-purple-300 rounded-lg font-medium hover:bg-purple-400/10 transition-all duration-300">
                      Details
                    </button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Participants</span>
                    <span>{session.participants}/{session.maxParticipants}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-background h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(session.participants / session.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WebinarPortal;