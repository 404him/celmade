# Celmade - E-commerce Admin Dashboard

Spring Boot + React 기반의 이커머스 관리자 대시보드 프로젝트입니다.

## 🚀 기술 스택

### Backend
- **Spring Boot 3.5.3** - Java 17
- **Spring Security** - JWT 기반 인증
- **Spring Data JPA** - MySQL 연동
- **MySQL 8.0** - 데이터베이스
- **Docker** - 컨테이너화

### Frontend
- **React 18** - TypeScript
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **React Router** - 라우팅

## 📁 프로젝트 구조

```
celmade/
├── src/main/java/com/celmade/
│   ├── config/          # 설정 클래스
│   ├── controller/      # REST API 컨트롤러
│   ├── dto/            # 데이터 전송 객체
│   ├── entity/         # JPA 엔티티
│   ├── repository/     # 데이터 접근 계층
│   ├── security/       # 보안 관련 클래스
│   ├── service/        # 비즈니스 로직
│   └── util/           # 유틸리티 클래스
├── frontend/           # React 프론트엔드
├── mysql_config/       # MySQL 설정
└── docker-compose.yml  # 도커 구성
```

## 🛠️ 설치 및 실행

### 1. 도커 환경 설정
```bash
# MySQL 및 phpMyAdmin 실행
docker-compose up -d
```

### 2. Backend 실행
```bash
# Spring Boot 애플리케이션 실행
./gradlew bootRun
```

### 3. Frontend 실행
```bash
cd frontend
npm install
npm run dev
```

## 🔐 기본 계정

- **관리자 계정**: `admin` / `admin123`
- **MySQL 접속**: `localhost:3307`
- **phpMyAdmin**: `http://localhost:8080`

## 🌐 서비스 접속

- **Backend API**: `http://localhost:8081`
- **Frontend**: `http://localhost:5173`
- **phpMyAdmin**: `http://localhost:8080`

## 📋 주요 기능

- ✅ JWT 기반 사용자 인증
- ✅ Spring Security 보안 설정
- ✅ MySQL 데이터베이스 연동
- ✅ React 관리자 대시보드
- ✅ Docker 컨테이너화

## 🔧 개발 환경

- **Java**: 17
- **Node.js**: 18+
- **Docker**: 20+
- **MySQL**: 8.0
