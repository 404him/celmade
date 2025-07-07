# Celmade Dashboard Database

쇼피파이와 워드프레스 사이트를 위한 통합 관리자 대시보드 데이터베이스입니다.

## 📊 데이터베이스 정보

- **데이터베이스명**: `celmade_db`
- **MySQL 버전**: 8.0
- **문자셋**: utf8mb4
- **정렬**: utf8mb4_unicode_ci

## 🚀 빠른 시작

### 1. Docker 환경 설정

```bash
# 자동 설정 스크립트 실행
./docker-setup.sh
```

### 2. 수동 설정

```bash
# Docker Compose로 컨테이너 시작
docker-compose up -d

# 컨테이너 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs mysql
```

## 📋 접속 정보

### MySQL 데이터베이스
- **Host**: localhost
- **Port**: 3306
- **Database**: celmade_db
- **Username**: celmade_user
- **Password**: celmade_password
- **Root Password**: celmade_root_password

### phpMyAdmin
- **URL**: http://localhost:8080
- **Username**: root
- **Password**: celmade_root_password

## 🗂️ 테이블 구조

### 핵심 테이블
1. **users** - 회원 정보
2. **admins** - 관리자 계정
3. **products** - 제품 정보
4. **orders** - 주문 정보
5. **order_items** - 주문 상세
6. **payments** - 결제 정보
7. **shipping_tracking** - 배송 추적

### 설정 테이블
8. **api_configs** - API 설정
9. **system_logs** - 시스템 로그
10. **cache_data** - 캐시 데이터
11. **daily_statistics** - 일일 통계

### 동기화 테이블
12. **shopify_sync** - 쇼피파이 동기화
13. **wordpress_sync** - 워드프레스 동기화

## 🔧 유용한 명령어

### 컨테이너 관리
```bash
# 컨테이너 시작
docker-compose up -d

# 컨테이너 중지
docker-compose down

# 컨테이너 재시작
docker-compose restart

# 컨테이너 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs mysql
docker-compose logs phpmyadmin
```

### 데이터베이스 접속
```bash
# MySQL 컨테이너에 직접 접속
docker exec -it celmade_dashboard_mysql mysql -u celmade_user -p

# Root 계정으로 접속
docker exec -it celmade_dashboard_mysql mysql -u root -p
```

### 백업 및 복원
```bash
# 데이터베이스 백업
docker exec celmade_dashboard_mysql mysqldump -u root -pcelmade_root_password celmade_db > backup.sql

# 데이터베이스 복원
docker exec -i celmade_dashboard_mysql mysql -u root -pcelmade_root_password celmade_db < backup.sql
```

## 📈 성능 최적화

### 인덱스 최적화
- 모든 주요 검색 필드에 인덱스 설정
- 복합 인덱스로 다중 조건 검색 최적화
- 정렬 최적화를 위한 오름차순/내림차순 인덱스

### MySQL 설정 최적화
- InnoDB 버퍼 풀 크기: 1GB
- 로그 파일 크기: 256MB
- 최대 연결 수: 200
- 슬로우 쿼리 로깅 활성화

## 🔄 스키마 수정 및 추가

### 새로운 테이블 추가
1. `database_schema_sorting_optimized.sql` 파일에 테이블 정의 추가
2. 컨테이너 재시작: `docker-compose restart mysql`

### 기존 테이블 수정
1. ALTER TABLE 문을 실행
2. 또는 스키마 파일 수정 후 컨테이너 재시작

### 마이그레이션 스크립트
```bash
# 마이그레이션 SQL 파일 실행
docker exec -i celmade_dashboard_mysql mysql -u root -pcelmade_root_password celmade_dashboard_database < migration.sql
```

## 🛡️ 보안 설정

### 프로덕션 환경 권장사항
1. **비밀번호 변경**: 기본 비밀번호를 강력한 비밀번호로 변경
2. **포트 변경**: 기본 포트(3306, 8080)를 다른 포트로 변경
3. **네트워크 제한**: 외부 접속을 필요한 IP만 허용
4. **SSL 설정**: MySQL SSL 연결 활성화
5. **백업 설정**: 정기적인 데이터베이스 백업

### 환경 변수 설정
```bash
# .env 파일에서 비밀번호 변경
MYSQL_ROOT_PASSWORD=your_strong_password
MYSQL_PASSWORD=your_strong_password
```

## 📊 모니터링

### 성능 모니터링
```sql
-- 슬로우 쿼리 확인
SELECT * FROM mysql.slow_log ORDER BY start_time DESC LIMIT 10;

-- 인덱스 사용률 확인
SHOW INDEX FROM table_name;

-- 테이블 크기 확인
SELECT 
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.tables 
WHERE table_schema = 'celmade_db';
```

### 로그 확인
```bash
# MySQL 에러 로그
docker exec celmade_dashboard_mysql tail -f /var/log/mysql/error.log

# 슬로우 쿼리 로그
docker exec celmade_dashboard_mysql tail -f /var/log/mysql/slow.log
```

## 🐛 문제 해결

### 일반적인 문제들

#### 1. 컨테이너가 시작되지 않음
```bash
# 로그 확인
docker-compose logs mysql

# 포트 충돌 확인
netstat -an | grep 3306
```

#### 2. 데이터베이스 연결 실패
```bash
# 컨테이너 상태 확인
docker-compose ps

# MySQL 프로세스 확인
docker exec celmade_dashboard_mysql ps aux | grep mysql
```

#### 3. 권한 문제
```bash
# MySQL 사용자 권한 확인
docker exec -it celmade_dashboard_mysql mysql -u root -p -e "SHOW GRANTS FOR 'celmade_user'@'%';"
```

## 📝 변경 이력

- **v1.0.0**: 초기 스키마 생성
- **v1.1.0**: 검색 최적화 인덱스 추가
- **v1.2.0**: 고급 최적화 기능 추가
- **v1.3.0**: 정렬 최적화 인덱스 추가
- **v1.4.0**: Docker 환경 설정 추가

## 🤝 기여하기

스키마 수정이나 개선사항이 있으시면 언제든 말씀해주세요!

---

**참고**: 이 데이터베이스는 개발 환경용으로 설계되었습니다. 프로덕션 환경에서는 추가적인 보안 설정이 필요합니다. 