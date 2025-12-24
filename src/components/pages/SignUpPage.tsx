import { useState } from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { Eye, EyeOff, Upload, X } from 'lucide-react';

type Page = 
  | 'main' 
  | 'login' 
  | 'signup' 
  | 'find-account' 
  | 'profile' 
  | 'results' 
  | 'uploader'
  | 'admin-dashboard'
  | 'admin-users'
  | 'admin-roles'
  | 'pending-approval';

interface SignUpPageProps {
  onNavigate: (page: Page) => void;
  onSignUp: () => void;
}

export function SignUpPage({ onNavigate, onSignUp }: SignUpPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    userId: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [facePhotos, setFacePhotos] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }
    
    if (facePhotos.length === 0) {
      alert('얼굴 사진을 최소 1장 업로드해주세요');
      return;
    }
    
    onSignUp();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-gray-900 mb-2">계정 만들기</h1>
            <p className="text-gray-600">사진 인식 서비스에 가입하세요</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Form Fields (2 columns on desktop) */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm text-gray-700 mb-2">
                        이름 *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="이름을 입력하세요"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                      />
                    </div>

                    {/* User ID */}
                    <div>
                      <label htmlFor="userId" className="block text-sm text-gray-700 mb-2">
                        사용자 ID *
                      </label>
                      <input
                        id="userId"
                        type="text"
                        value={formData.userId}
                        onChange={(e) => handleInputChange('userId', e.target.value)}
                        placeholder="고유한 사용자 ID를 선택하세요"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                          비밀번호 *
                        </label>
                        <div className="relative">
                          <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            placeholder="비밀번호 입력"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-12"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm text-gray-700 mb-2">
                          비밀번호 확인 *
                        </label>
                        <div className="relative">
                          <input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            placeholder="비밀번호 재입력"
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

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                        이메일 *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="example@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                        전화번호 *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="010-0000-0000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Face Photo Upload (1 column on desktop, full width on mobile) */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 sticky top-20">
                  <h2 className="text-gray-900 mb-2">얼굴 사진 업로드 *</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    얼굴 인식 학습을 위해 정면 얼굴 사진 1~3장을 업로드하세요.
                  </p>

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
                        {facePhotos.length >= 3 ? '최대 3장' : '클릭하여 업로드'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {facePhotos.length}/3 장
                      </p>
                    </div>
                  </label>

                  {/* Photo Previews */}
                  {facePhotos.length > 0 && (
                    <div className="mt-4 space-y-2">
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

                  {/* Guidelines */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-800">사진 가이드라인:</p>
                    <ul className="text-xs text-blue-700 mt-2 space-y-1">
                      <li>• 밝고 선명한 사진</li>
                      <li>• 카메라를 정면으로 응시</li>
                      <li>• 선글라스나 마스크 착용 금지</li>
                      <li>• 고화질 이미지 권장</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button (Fixed on mobile) */}
            <div className="mt-8 sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4 sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:static">
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                계정 만들기
              </button>
              <p className="text-center text-sm text-gray-600 mt-4">
                이미 계정이 있으신가요?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  로그인하기
                </button>
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
