import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Search,
  Filter,
  BarChart3
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const applications = [
    {
      id: 'APP001',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 9876543210',
      course: 'Data Science with AI',
      type: 'student',
      status: 'pending',
      appliedAt: '2025-01-10T10:30:00Z'
    },
    {
      id: 'APP002',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 9876543211',
      course: 'Machine Learning',
      type: 'employed',
      status: 'approved',
      appliedAt: '2025-01-09T14:15:00Z'
    },
    {
      id: 'APP003',
      name: 'Amit Patel',
      email: 'amit@example.com',
      phone: '+91 9876543212',
      course: 'Web Development',
      type: 'student',
      status: 'rejected',
      appliedAt: '2025-01-08T09:45:00Z'
    }
  ];

  const webinarSessions = [
    {
      id: 'WS001',
      title: 'Introduction to Data Science',
      instructor: 'Dr. Priya Sharma',
      date: '2025-01-15',
      time: '18:00',
      duration: '2 hours',
      maxParticipants: 50,
      registeredEmails: ['student1@example.com', 'student2@example.com'],
      status: 'scheduled'
    },
    {
      id: 'WS002',
      title: 'Machine Learning Basics',
      instructor: 'Rahul Kumar',
      date: '2025-01-17',
      time: '19:00',
      duration: '1.5 hours',
      maxParticipants: 40,
      registeredEmails: ['learner1@example.com'],
      status: 'scheduled'
    }
  ];

  const stats = [
    { label: 'Total Applications', value: applications.length, color: 'from-blue-500 to-cyan-500' },
    { label: 'Pending Reviews', value: applications.filter(app => app.status === 'pending').length, color: 'from-yellow-500 to-orange-500' },
    { label: 'Active Sessions', value: webinarSessions.length, color: 'from-purple-500 to-pink-500' },
    { label: 'Registered Users', value: 156, color: 'from-green-500 to-emerald-500' }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (appId: string, newStatus: string) => {
    // In a real app, this would update the database
    console.log(`Updating application ${appId} status to ${newStatus}`);
  };

  const handleExportData = () => {
    // In a real app, this would generate and download a CSV/Excel file
    console.log('Exporting application data...');
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </h1>
          <p className="text-gray-300">Manage applications, webinar sessions, and system settings</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
            {[
              { id: 'applications', label: 'Applications', icon: Users },
              { id: 'webinars', label: 'Webinars', icon: Calendar },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Search and Filter */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="all" className="bg-gray-800">All Status</option>
                    <option value="pending" className="bg-gray-800">Pending</option>
                    <option value="approved" className="bg-gray-800">Approved</option>
                    <option value="rejected" className="bg-gray-800">Rejected</option>
                  </select>
                  <button
                    onClick={handleExportData}
                    className="flex items-center px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-cyan-700 transition-all duration-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Applicant</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Course</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Applied</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-white font-medium">{app.name}</div>
                            <div className="text-gray-400 text-sm">{app.email}</div>
                            <div className="text-gray-400 text-sm">{app.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">{app.course}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            app.type === 'student' 
                              ? 'bg-blue-500/20 text-blue-300' 
                              : 'bg-green-500/20 text-green-300'
                          }`}>
                            {app.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:outline-none ${
                              app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                              app.status === 'approved' ? 'bg-green-500/20 text-green-300' :
                              'bg-red-500/20 text-red-300'
                            }`}
                          >
                            <option value="pending" className="bg-gray-800">Pending</option>
                            <option value="approved" className="bg-gray-800">Approved</option>
                            <option value="rejected" className="bg-gray-800">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-purple-300 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-cyan-300 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-300 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Webinars Tab */}
        {activeTab === 'webinars' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Create Session Button */}
            <div className="flex justify-end">
              <button className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-cyan-700 transition-all duration-300">
                <Plus className="w-4 h-4 mr-2" />
                Create Session
              </button>
            </div>

            {/* Sessions List */}
            <div className="space-y-4">
              {webinarSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{session.title}</h3>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                          {session.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 mb-4">
                        <div>
                          <strong>Instructor:</strong> {session.instructor}
                        </div>
                        <div>
                          <strong>Date:</strong> {new Date(session.date).toLocaleDateString()}
                        </div>
                        <div>
                          <strong>Time:</strong> {session.time}
                        </div>
                        <div>
                          <strong>Duration:</strong> {session.duration}
                        </div>
                      </div>

                      <div className="text-sm text-gray-400">
                        <strong>Registered:</strong> {session.registeredEmails.length}/{session.maxParticipants} participants
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-gray-400 hover:text-purple-300 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="px-4 py-2 text-gray-400 hover:text-cyan-300 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="px-4 py-2 text-gray-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6">System Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Site Title
                  </label>
                  <input
                    type="text"
                    defaultValue="CynexAI"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    defaultValue="example@Cynexai.com"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Max Webinar Participants
                  </label>
                  <input
                    type="number"
                    defaultValue="50"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <button className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-cyan-700 transition-all duration-300">
                  Save Settings
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;