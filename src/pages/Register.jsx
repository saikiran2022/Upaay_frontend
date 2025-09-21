import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../store/slices/authSlice';
import { Eye, EyeOff, Check, X } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector(state => state.auth);

  useEffect(() => {
    // Redirect if already logged in
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  useEffect(() => {
    // Validate password strength
    if (formData.password) {
      setPasswordErrors({
        length: formData.password.length >= 8,
        uppercase: /[A-Z]/.test(formData.password),
        lowercase: /[a-z]/.test(formData.password),
        number: /[0-9]/.test(formData.password),
        special: /[^A-Za-z0-9]/.test(formData.password)
      });
    }
  }, [formData.password]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) dispatch(clearError());
  };

  const isPasswordValid = Object.values(passwordErrors).every(Boolean);
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isPasswordValid) {
      dispatch(clearError());
      return;
    }
    
    if (!passwordsMatch) {
      dispatch(clearError());
      return;
    }
    
    const result = await dispatch(registerUser({
      username: formData.username,
      email: formData.email,
      password: formData.password
    }));
    
    if (!result.error) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-purple-600 py-6 px-8">
          <h2 className="text-3xl font-bold text-center text-white">Create Account</h2>
          <p className="text-purple-100 text-center mt-2">Join us today</p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Choose a username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {formData.password && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Password must contain:</p>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      {passwordErrors.length ? <Check size={16} className="text-green-500 mr-2" /> : <X size={16} className="text-red-500 mr-2" />}
                      <span className={passwordErrors.length ? 'text-green-600' : 'text-gray-600'}>At least 8 characters</span>
                    </div>
                    <div className="flex items-center text-sm">
                      {passwordErrors.uppercase ? <Check size={16} className="text-green-500 mr-2" /> : <X size={16} className="text-red-500 mr-2" />}
                      <span className={passwordErrors.uppercase ? 'text-green-600' : 'text-gray-600'}>One uppercase letter</span>
                    </div>
                    <div className="flex items-center text-sm">
                      {passwordErrors.lowercase ? <Check size={16} className="text-green-500 mr-2" /> : <X size={16} className="text-red-500 mr-2" />}
                      <span className={passwordErrors.lowercase ? 'text-green-600' : 'text-gray-600'}>One lowercase letter</span>
                    </div>
                    <div className="flex items-center text-sm">
                      {passwordErrors.number ? <Check size={16} className="text-green-500 mr-2" /> : <X size={16} className="text-red-500 mr-2" />}
                      <span className={passwordErrors.number ? 'text-green-600' : 'text-gray-600'}>One number</span>
                    </div>
                    <div className="flex items-center text-sm">
                      {passwordErrors.special ? <Check size={16} className="text-green-500 mr-2" /> : <X size={16} className="text-red-500 mr-2" />}
                      <span className={passwordErrors.special ? 'text-green-600' : 'text-gray-600'}>One special character</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {formData.confirmPassword && !passwordsMatch && (
                <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
              )}
              
              {formData.confirmPassword && passwordsMatch && (
                <p className="mt-1 text-sm text-green-600">Passwords match</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !isPasswordValid || !passwordsMatch}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center"
              >
                Sign in to your account
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;