# 📸 포토파인드 - 사진 인식 및 분류 서비스

AI 기반 얼굴 인식 기술을 활용한 자동 사진 분류 웹 애플리케이션입니다. 교회, 예배, 대규모 행사에서 찍힌 사진을 자동으로 분류하여 각 참석자의 사진을 쉽게 찾아볼 수 있습니다.

## ✨ 주요 기능

### 사용자 기능
- **회원가입 및 로그인**: 간편한 계정 생성 및 인증
- **얼굴 사진 등록**: 정면 얼굴 사진 1~3장 업로드로 AI 학습
- **자동 사진 분류**: 내가 포함된 사진 자동 분류 및 확인
- **사진 다운로드**: 개별 또는 일괄 다운로드
- **프로필 관리**: 개인정보 및 얼굴 사진 업데이트

### 업로더 기능
- **사진 일괄 업로드**: 행사별 사진 업로드 및 관리
- **업로드 이력 조회**: 업로드 상태 및 진행 상황 확인

### 관리자 기능
- **사용자 관리**: 회원 승인/거부 및 상태 관리
- **권한 관리**: 사용자 역할 변경 (일반 사용자, 업로더, 관리자)
- **대시보드**: 통계 및 현황 모니터링

## 🛠️ 기술 스택

### 프론트엔드
- **React 18.3** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite 6.3** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **Radix UI** - 접근성 높은 UI 컴포넌트
- **Lucide React** - 아이콘
- **React Hook Form** - 폼 관리
- **Recharts** - 데이터 시각화

### 주요 라이브러리
- `@radix-ui/*` - 다양한 UI 컴포넌트
- `react-hook-form` - 폼 유효성 검사
- `recharts` - 차트 및 그래프
- `sonner` - 토스트 알림
- `lucide-react` - 아이콘 세트

## 📦 설치 및 실행

### 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 패키지 설치
npm install
```

### 개발 서버 실행

```bash
# 개발 서버 시작 (기본: http://localhost:3000)
npm run dev
```

### 프로덕션 빌드

```bash
# 프로덕션 빌드 생성
npm run build
```

빌드된 파일은 `build` 디렉토리에 생성됩니다.

## 📁 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── common/         # 공통 컴포넌트 (Header, Footer)
│   ├── pages/          # 페이지 컴포넌트
│   │   ├── MainPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignUpPage.tsx
│   │   ├── ResultPage.tsx
│   │   ├── UploaderPage.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── ...
│   └── ui/             # 재사용 가능한 UI 컴포넌트
├── services/           # API 및 데이터 서비스
│   └── dataClient.ts   # 데이터 클라이언트 (Mock)
├── types/              # TypeScript 타입 정의
│   └── index.ts        # 공통 타입 (Page, UserRole)
├── App.tsx             # 메인 앱 컴포넌트
└── main.tsx            # 진입점
```

## 🔑 주요 페이지

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 메인 | `/` | 서비스 소개 및 랜딩 페이지 |
| 로그인 | `login` | 사용자 인증 |
| 회원가입 | `signup` | 신규 회원 등록 |
| 내 사진 | `results` | 분류된 사진 확인 |
| 사진 업로드 | `uploader` | 행사 사진 업로드 (업로더 권한) |
| 관리자 대시보드 | `admin-dashboard` | 관리자 통계 대시보드 |
| 사용자 관리 | `admin-users` | 회원 승인/관리 |
| 권한 관리 | `admin-roles` | 사용자 역할 변경 |

## 👥 사용자 역할

- **user**: 일반 사용자 - 자신의 사진만 확인 가능
- **uploader**: 업로더 - 사진 업로드 및 관리 권한
- **admin**: 관리자 - 모든 기능 및 사용자 관리 권한

## 🎨 UI/UX 특징

- 반응형 디자인 (모바일/태블릿/데스크톱)
- 직관적인 사용자 인터페이스
- 접근성 고려 (Radix UI)
- 빠른 로딩 속도 (Vite + React)

## 📝 개발 노트

- 현재 Mock 데이터를 사용하며, 실제 API 연동 준비 완료
- TypeScript로 타입 안정성 확보
- 공통 타입 및 컴포넌트 재사용 구조화
- 코드 리팩토링 완료 (타입 중복 제거, 설정 최적화)

## 🔗 원본 디자인

이 프로젝트는 Figma 디자인을 기반으로 개발되었습니다:
[Figma 디자인 링크](https://www.figma.com/design/4yf0LtRyylnUqHH5ziQ5Ji/%EC%82%AC%EC%A7%84-%EC%9D%B8%EC%8B%9D-%EB%B0%8F-%EB%B6%84%EB%A5%98-UI)

## 📄 라이선스

Private 프로젝트입니다.
