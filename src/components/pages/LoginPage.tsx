import { useState } from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { Eye, EyeOff } from 'lucide-react';

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

type UserRole = 'user' | 'uploader' | 'admin';

interface LoginPageProps {
  onNavigate: (page: Page) => void;
  onLogin: (role?: UserRole) => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login - check for different roles
    if (userId.toLowerCase() === 'admin') {
      onLogin('admin');
    } else if (userId.toLowerCase() === 'uploader') {
      onLogin('uploader');
    } else {
      onLogin('user');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📸</span>
              </div>
              <h1 className="text-gray-900 mb-2">다시 오신 것을 환영합니다</h1>
              <p className="text-gray-600">로그인하여 사진을 확인하세요</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User ID */}
              <div>
                <label htmlFor="userId" className="block text-sm text-gray-700 mb-2">
                  사용자 ID
                </label>
                <input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="사용자 ID를 입력하세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                로그인
              </button>
            </form>

            {/* Links */}
            <div className="mt-6 space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
                <button
                  onClick={() => onNavigate('signup')}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  계정 만들기
                </button>
                <button
                  onClick={() => onNavigate('find-account')}
                  className="text-gray-600 hover:text-gray-700 transition-colors"
                >
                  ID 찾기 / 비밀번호 재설정
                </button>
              </div>
            </div>

            {/* Demo Info */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-800 mb-2">데모 로그인 정보:</p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• 사용자 ID: <span className="font-mono">user</span> (일반 사용자)</li>
                <li>• 사용자 ID: <span className="font-mono">uploader</span> (사진 업로더)</li>
                <li>• 사용자 ID: <span className="font-mono">admin</span> (관리자)</li>
                <li>• 비밀번호: <span className="font-mono">아무 값이나 입력</span></li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
