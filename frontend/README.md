# Celmade Dashboard Frontend

쇼피파이와 워드프레스 사이트를 위한 통합 관리자 대시보드 프론트엔드입니다.

## 🚀 기술 스택

- **React 18** - 사용자 인터페이스 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구 및 개발 서버
- **React Router** - 클라이언트 사이드 라우팅
- **React Query (TanStack Query)** - 서버 상태 관리
- **React Hook Form** - 폼 관리
- **Yup** - 폼 유효성 검사
- **Material-UI (MUI)** - UI 컴포넌트 라이브러리
- **Ant Design** - 추가 UI 컴포넌트
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Axios** - HTTP 클라이언트

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 빌드
```bash
npm run build
```

### 4. 빌드 미리보기
```bash
npm run preview
```

## 🌐 접속 정보

- **개발 서버**: http://localhost:5173
- **API 서버**: http://localhost:8080/api (기본값)

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   └── LoginPage.tsx   # 로그인 페이지
├── services/           # API 서비스
│   ├── api.ts         # Axios 설정
│   └── authService.ts # 인증 관련 API
├── types/              # TypeScript 타입 정의
│   └── auth.ts        # 인증 관련 타입
├── App.tsx            # 메인 앱 컴포넌트
├── main.tsx           # 앱 진입점
└── index.css          # 전역 스타일
```

## 🔐 인증 시스템

### 로그인 기능
- 사용자명/비밀번호 기반 로그인
- JWT 토큰 기반 인증
- 자동 토큰 갱신
- 보호된 라우트

### 보안 기능
- 로컬 스토리지에 토큰 저장
- 자동 로그아웃 (토큰 만료 시)
- 입력 유효성 검사

## 🎨 UI/UX 특징

### 디자인 시스템
- **Material-UI**: 기본 UI 컴포넌트
- **Tailwind CSS**: 커스텀 스타일링
- **반응형 디자인**: 모바일/태블릿/데스크톱 지원
- **다크 모드**: 준비 중

### 컴포넌트
- **로그인 폼**: Material-UI + Tailwind CSS 조합
- **로딩 상태**: 스피너 및 스켈레톤
- **에러 처리**: 사용자 친화적 에러 메시지
- **애니메이션**: 부드러운 전환 효과

## 🔧 개발 가이드

### 새로운 컴포넌트 추가
```bash
# components 디렉토리에 새 컴포넌트 생성
touch src/components/NewComponent.tsx
```

### API 서비스 추가
```bash
# services 디렉토리에 새 서비스 생성
touch src/services/newService.ts
```

### 타입 정의 추가
```bash
# types 디렉토리에 새 타입 파일 생성
touch src/types/newTypes.ts
```

### 환경 변수 설정
```bash
# .env 파일 생성 (예시)
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Celmade Dashboard
```

## 📱 반응형 디자인

### 브레이크포인트
- **모바일**: 320px - 768px
- **태블릿**: 768px - 1024px
- **데스크톱**: 1024px+

### 접근성
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 고대비 모드 지원

## 🧪 테스트

### 테스트 실행
```bash
npm run test
```

### 테스트 커버리지
```bash
npm run test:coverage
```

## 📦 배포

### 프로덕션 빌드
```bash
npm run build
```

### 정적 파일 서빙
```bash
npm run preview
```

## 🔄 개발 워크플로우

1. **기능 브랜치 생성**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **개발 및 테스트**
   ```bash
   npm run dev
   npm run test
   ```

3. **커밋 및 푸시**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/new-feature
   ```

## 🐛 문제 해결

### 일반적인 문제들

#### 1. 포트 충돌
```bash
# 다른 포트로 실행
npm run dev -- --port 3000
```

#### 2. 의존성 문제
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

#### 3. TypeScript 에러
```bash
# 타입 체크
npm run type-check
```

## 📝 변경 이력

- **v1.0.0**: 초기 프로젝트 설정
- **v1.1.0**: 로그인 페이지 구현
- **v1.2.0**: Material-UI + Tailwind CSS 통합
- **v1.3.0**: 인증 시스템 구현

## 🤝 기여하기

1. 이슈 생성 또는 기존 이슈 확인
2. 기능 브랜치 생성
3. 개발 및 테스트
4. Pull Request 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

**참고**: 이 프론트엔드는 백엔드 API와 연동되어 작동합니다. 백엔드 서버가 실행 중이어야 정상적으로 작동합니다.
