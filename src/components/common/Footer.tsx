export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white">📸</span>
              </div>
              <span className="text-lg text-gray-900">포토파인드</span>
            </div>
            <p className="text-sm text-gray-600">
              예배 및 행사를 위한 자동 사진 분류 서비스
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm text-gray-900 mb-4">지원</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">고객센터</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">서비스 이용약관</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">문의하기</a></li>
            </ul>
          </div>

          {/* Privacy Notice */}
          <div>
            <h3 className="text-sm text-gray-900 mb-4">개인정보 및 보안</h3>
            <p className="text-sm text-gray-600">
              귀하의 사진과 얼굴 데이터는 안전하게 저장되며 분류 목적으로만 사용됩니다. 
              제3자와 데이터를 공유하지 않습니다.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © 2025 포토파인드. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}