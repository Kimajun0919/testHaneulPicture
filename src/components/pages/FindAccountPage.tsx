import { useState } from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { Mail, Phone } from 'lucide-react';
import { Page } from '../../types';

interface FindAccountPageProps {
  onNavigate: (page: Page) => void;
}

export function FindAccountPage({ onNavigate }: FindAccountPageProps) {
  const [activeTab, setActiveTab] = useState<'id' | 'password'>('id');
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('인증번호가 전송되었습니다! (데모)');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h1 className="text-gray-900 mb-2">계정 복구</h1>
              <p className="text-gray-600">ID 찾기 또는 비밀번호 재설정</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('id')}
                className={`flex-1 pb-3 text-center transition-colors ${
                  activeTab === 'id'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                ID 찾기
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`flex-1 pb-3 text-center transition-colors ${
                  activeTab === 'password'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                비밀번호 재설정
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Verification Method */}
              <div>
                <label className="block text-sm text-gray-700 mb-3">
                  인증 방법
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setVerificationMethod('email')}
                    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                      verificationMethod === 'email'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <Mail className="w-5 h-5" />
                    <span>이메일</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVerificationMethod('phone')}
                    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                      verificationMethod === 'phone'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <Phone className="w-5 h-5" />
                    <span>전화</span>
                  </button>
                </div>
              </div>

              {/* User ID (for password reset only) */}
              {activeTab === 'password' && (
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
              )}

              {/* Email or Phone */}
              {verificationMethod === 'email' ? (
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                    이메일 주소
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                    전화번호
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {activeTab === 'id' ? 'ID 찾기' : '비밀번호 재설정'}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <button
                onClick={() => onNavigate('login')}
                className="text-sm text-gray-600 hover:text-gray-700 transition-colors"
              >
                ← 로그인으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
