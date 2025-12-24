import { useState } from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { Eye, EyeOff, Upload, X, AlertCircle } from 'lucide-react';
import { Page } from '../../types';

interface ProfileSettingsPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export function ProfileSettingsPage({ onNavigate, onLogout }: ProfileSettingsPageProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  
  const [facePhotos, setFacePhotos] = useState<File[]>([]);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Password updated successfully! (Demo)');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleContactUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Contact information updated! (Demo)');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 3 - facePhotos.length;
    const newPhotos = files.slice(0, remainingSlots);
    setFacePhotos(prev => [...prev, ...newPhotos]);
  };

  const removePhoto = (index: number) => {
    setFacePhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleFacePhotoUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (facePhotos.length === 0) {
      alert('Please upload at least one face photo');
      return;
    }
    alert('Face photos updated! AI will be retrained with your new photos. (Demo)');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onNavigate={onNavigate} 
        isLoggedIn={true} 
        onLogout={onLogout}
      />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-gray-900 mb-2">Profile Settings</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>

          <div className="space-y-6">
            {/* Change Password */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-6">Change Password</h2>
              
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="newPassword" className="block text-sm text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Update Password
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-6">Contact Information</h2>
              
              <form onSubmit={handleContactUpdate} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Update Contact Info
                </button>
              </form>
            </div>

            {/* Re-upload Face Photos */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-2">Update Face Photos</h2>
              <p className="text-sm text-gray-600 mb-4">
                Upload new face photos to retrain the AI recognition model.
              </p>

              {/* Warning */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Updating your face photos will retrain the AI model. 
                    This process may take a few hours to complete.
                  </p>
                </div>
              </div>

              <form onSubmit={handleFacePhotoUpdate} className="space-y-4">
                {/* Upload Button */}
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={facePhotos.length >= 3}
                  />
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    facePhotos.length >= 3 
                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
                      : 'border-blue-300 bg-blue-50 hover:bg-blue-100'
                  }`}>
                    <Upload className={`w-8 h-8 mx-auto mb-2 ${
                      facePhotos.length >= 3 ? 'text-gray-400' : 'text-blue-500'
                    }`} />
                    <p className={`text-sm ${
                      facePhotos.length >= 3 ? 'text-gray-500' : 'text-blue-600'
                    }`}>
                      {facePhotos.length >= 3 ? 'Maximum 3 photos' : 'Click to upload (1-3 photos)'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {facePhotos.length}/3 photos
                    </p>
                  </div>
                </label>

                {/* Photo Previews */}
                {facePhotos.length > 0 && (
                  <div className="space-y-2">
                    {facePhotos.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className="w-10 h-10 bg-blue-100 rounded flex-shrink-0 flex items-center justify-center">
                            <span className="text-sm">📷</span>
                          </div>
                          <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Update Face Photos
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
