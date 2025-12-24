import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';

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

interface HeaderProps {
  onNavigate: (page: Page) => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  userRole?: 'user' | 'uploader' | 'admin';
}

export function Header({ onNavigate, isLoggedIn = false, onLogout, userRole }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => handleNavigation(isLoggedIn ? 'results' : 'main')}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white">📸</span>
            </div>
            <span className="text-lg text-gray-900">포토파인드</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isLoggedIn ? (
              <>
                <button 
                  onClick={() => handleNavigation('results')}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  내 사진
                </button>
                {(userRole === 'uploader' || userRole === 'admin') && (
                  <button 
                    onClick={() => handleNavigation('uploader')}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    사진 업로드
                  </button>
                )}
                {userRole === 'admin' && (
                  <button 
                    onClick={() => handleNavigation('admin-dashboard')}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    관리자
                  </button>
                )}
                <button 
                  onClick={() => handleNavigation('profile')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>프로필</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>로그아웃</span>
                </button>
              </>
            ) : (
              <button 
                onClick={() => handleNavigation('login')}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                로그인
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            {isLoggedIn ? (
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => handleNavigation('results')}
                  className="px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  내 사진
                </button>
                {(userRole === 'uploader' || userRole === 'admin') && (
                  <button 
                    onClick={() => handleNavigation('uploader')}
                    className="px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    사진 업로드
                  </button>
                )}
                {userRole === 'admin' && (
                  <button 
                    onClick={() => handleNavigation('admin-dashboard')}
                    className="px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    관리자
                  </button>
                )}
                <button 
                  onClick={() => handleNavigation('profile')}
                  className="px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>프로필</span>
                </button>
                <button 
                  onClick={() => {
                    onLogout?.();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>로그아웃</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => handleNavigation('login')}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                로그인
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}