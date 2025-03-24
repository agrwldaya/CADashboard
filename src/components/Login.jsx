import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Calculator, TrendingUp, Shield, Award } from 'lucide-react';

const CAAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Initialize the navigate function

  const statsItems = [
    { 
      icon: <TrendingUp className="w-6 h-6" />,
      number: "15K+",
      text: "Active CAs"
    },
    { 
      icon: <Shield className="w-6 h-6" />,
      number: "100%",
      text: "Secure"
    },
    { 
      icon: <Award className="w-6 h-6" />,
      number: "24/7",
      text: "Support"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dash2'); // Redirect to the dashboard page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 pt-24 relative">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
          {/* Left Section - Branding */}
          <div className="lg:w-1/2 text-white space-y-8">
            {/* <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <div className="p-3 bg-blue-500/20 rounded-xl backdrop-blur-sm">
                <Calculator className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold">CA Pro Hub</h2>
            </div> */}

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-slide-up">
              Future of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 block mt-2">
                CA Practice
              </span>
            </h1>

            {/* Animated Stats Section */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {statsItems.map((item, index) => (
                <div 
                  key={index}
                  className="group bg-white/5 backdrop-blur-lg rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-2xl font-bold">{item.number}</div>
                  <div className="text-gray-400 text-sm">{item.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Auth Form */}
          <div className="lg:w-1/2 w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl hover:shadow-blue-500/5 transition-all animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isLogin ? 'Welcome Back!' : 'Join the Elite'}
                </h2>
                <p className="text-gray-400">
                  {isLogin ? 'Access your dashboard' : 'Create your professional account'}
                </p>
              </div>

              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                    isLogin 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                    !isLogin 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-all group-hover:bg-white/10"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Mobile Number</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-all group-hover:bg-white/10"
                        placeholder="Enter mobile number"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-1">PAN Number</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-all group-hover:bg-white/10"
                        placeholder="Enter PAN number"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-1">CA Membership Number</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-all group-hover:bg-white/10"
                        placeholder="Enter membership number"
                      />
                    </div>
                  </div>
                )}

                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-all group-hover:bg-white/10"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-all group-hover:bg-white/10"
                    placeholder="Enter password"
                  />
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded bg-white/5"
                      />
                      <label className="ml-2 block text-sm text-gray-300">Remember me</label>
                    </div>
                    <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
                      Forgot password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  {isLogin ? 'Access Dashboard' : 'Create Account'}
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-gray-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CAAuthPage;