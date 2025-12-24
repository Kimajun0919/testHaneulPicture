import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { Upload, Search, Download, Shield } from 'lucide-react';
import { Page } from '../../types';

interface MainPageProps {
  onNavigate: (page: Page) => void;
}

export function MainPage({ onNavigate }: MainPageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-gray-900 mb-4">
                자동 사진 분류 서비스
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                얼굴 인식으로 내 사진을 즉시 찾아보세요
              </p>
              <p className="text-gray-600 mb-8">
                교회, 예배, 대규모 행사에 최적화된 서비스입니다. 
                얼굴 사진을 한 번만 업로드하면, AI가 자동으로 나를 포함한 모든 사진을 찾아 분류해드립니다.
              </p>
              <button 
                onClick={() => onNavigate('login')}
                className="w-full sm:w-auto px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                시작하기
              </button>
            </div>

            {/* Right: Visual Area */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Search className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-gray-600">AI 기반 인식 기술</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-gray-900 mb-12">
            이용 방법
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="text-gray-900 mb-3">로그인</h3>
              <p className="text-gray-600">
                계정을 생성하고 로그인하세요. 빠르고 간편한 가입 절차입니다.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">얼굴 사진 업로드</h3>
              <p className="text-gray-600">
                본인의 정면 얼굴 사진 1-3장을 업로드하세요. AI가 회원님을 인식하도록 학습합니다.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">분류된 사진 확인</h3>
              <p className="text-gray-600">
                나를 포함한 모든 행사 사진을 자동으로 정리해서 확인하고 다운로드하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-gray-900 mb-12">
            교회와 단체가 신뢰하는 서비스
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">안전하고 보안적</h3>
              <p className="text-sm text-gray-600">
                데이터는 암호화되어 보호됩니다
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-gray-900 mb-2">빠른 처리</h3>
              <p className="text-sm text-gray-600">
                몇 분 안에 AI 분류 완료
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-gray-900 mb-2">모바일 친화적</h3>
              <p className="text-sm text-gray-600">
                모든 기기에서 작동합니다
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-gray-900 mb-2">정확한 결과</h3>
              <p className="text-sm text-gray-600">
                고급 AI 기술 적용
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-gray-900 mb-4">개인정보 보호를 최우선으로</h2>
          <p className="text-gray-600 mb-6">
            개인정보 보호를 매우 중요하게 생각합니다. 모든 얼굴 데이터는 안전하게 저장되며 사진 분류 목적으로만 사용됩니다. 
            사진은 제3자와 절대 공유되지 않으며, 언제든지 데이터를 삭제할 수 있습니다.
          </p>
          <p className="text-sm text-gray-500">
            본 서비스는 승인된 행사 전용입니다. 사진 인식 서비스 참여에 대한 권한이 있는지 확인해주세요.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
