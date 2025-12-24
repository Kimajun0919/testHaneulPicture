import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { Clock, CheckCircle } from 'lucide-react';
import { Page } from '../../types';

interface PendingApprovalPageProps {
  onNavigate: (page: Page) => void;
}

export function PendingApprovalPage({ onNavigate }: PendingApprovalPageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 sm:p-12">
            <div className="text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
                <Clock className="w-10 h-10 text-yellow-600" />
              </div>

              {/* Title */}
              <h1 className="text-gray-900 mb-4">
                계정 승인 대기 중
              </h1>

              {/* Message */}
              <p className="text-gray-600 mb-8">
                가입해 주셔서 감사합니다! 계정이 생성되었으며 현재 관리자 승인을 기다리고 있습니다. 
                계정이 승인되면 이메일로 알림을 받으실 수 있습니다.
              </p>

              {/* Status Steps */}
              <div className="space-y-4 mb-8 text-left max-w-md mx-auto">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">계정 생성 완료</p>
                    <p className="text-xs text-gray-500">정보가 제출되었습니다</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">얼굴 사진 업로드 완료</p>
                    <p className="text-xs text-gray-500">AI 학습 데이터 수신됨</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Clock className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">관리자 검토 중</p>
                    <p className="text-xs text-gray-500">승인 대기 중</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">계정 활성화</p>
                    <p className="text-xs text-gray-400">로그인 가능</p>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-8">
                <p className="text-sm text-blue-800">
                  <strong>다음 단계는?</strong>
                </p>
                <p className="text-sm text-blue-700 mt-2">
                  관리자가 계정과 얼굴 사진을 검토합니다. 일반적으로 1-2 영업일이 소요됩니다. 
                  승인되면 로그인 안내가 포함된 이메일을 받으실 수 있습니다.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onNavigate('main')}
                  className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  메인으로 돌아가기
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-8 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  로그인 페이지로
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
