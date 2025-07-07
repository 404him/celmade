#!/bin/bash

# Celmade Dashboard Database Docker Setup Script

echo "🚀 Celmade Dashboard Database Docker 설정을 시작합니다..."

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 함수 정의
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Docker 설치 확인
check_docker() {
    print_status "Docker 설치 상태를 확인합니다..."
    if ! command -v docker &> /dev/null; then
        print_error "Docker가 설치되어 있지 않습니다. Docker를 먼저 설치해주세요."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose가 설치되어 있지 않습니다. Docker Compose를 먼저 설치해주세요."
        exit 1
    fi
    
    print_success "Docker와 Docker Compose가 설치되어 있습니다."
}

# 기존 컨테이너 정리
cleanup_existing() {
    print_status "기존 컨테이너를 정리합니다..."
    
    # 기존 컨테이너 중지 및 삭제
    docker-compose down -v 2>/dev/null || true
    
    # 관련 이미지 삭제 (선택사항)
    read -p "기존 MySQL 이미지도 삭제하시겠습니까? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker rmi mysql:8.0 phpmyadmin/phpmyadmin:latest 2>/dev/null || true
        print_success "기존 이미지가 삭제되었습니다."
    fi
}

# 디렉토리 생성
create_directories() {
    print_status "필요한 디렉토리를 생성합니다..."
    
    # MySQL 설정 디렉토리 생성
    mkdir -p mysql_config
    print_success "mysql_config 디렉토리가 생성되었습니다."
}

# 환경 변수 파일 생성
create_env_file() {
    print_status "환경 변수 파일을 생성합니다..."
    
    cat > .env << EOF
# Celmade Dashboard Database Environment Variables

# MySQL 설정
MYSQL_ROOT_PASSWORD=celmade_root_password
MYSQL_DATABASE=celmade_db
MYSQL_USER=celmade_user
MYSQL_PASSWORD=celmade_password

# 포트 설정
MYSQL_PORT=3306
PHPMYADMIN_PORT=8080

# 네트워크 설정
NETWORK_NAME=celmade_network

# 볼륨 설정
MYSQL_DATA_VOLUME=mysql_data
EOF
    
    print_success ".env 파일이 생성되었습니다."
}

# Docker 컨테이너 시작
start_containers() {
    print_status "Docker 컨테이너를 시작합니다..."
    
    # 컨테이너 빌드 및 시작
    docker-compose up -d --build
    
    if [ $? -eq 0 ]; then
        print_success "컨테이너가 성공적으로 시작되었습니다."
    else
        print_error "컨테이너 시작에 실패했습니다."
        exit 1
    fi
}

# 데이터베이스 연결 확인
check_database() {
    print_status "데이터베이스 연결을 확인합니다..."
    
    # MySQL 컨테이너가 완전히 시작될 때까지 대기
    echo "MySQL 서버가 완전히 시작될 때까지 대기 중..."
    sleep 30
    
    # 연결 테스트
    if docker exec celmade_dashboard_mysql mysqladmin ping -h localhost -u root -pcelmade_root_password &> /dev/null; then
        print_success "MySQL 데이터베이스에 성공적으로 연결되었습니다."
    else
        print_warning "MySQL 연결 확인에 실패했습니다. 잠시 후 다시 시도해주세요."
    fi
}

# 접속 정보 출력
show_connection_info() {
    echo
    echo "=========================================="
    echo "🎉 Celmade Dashboard Database 설정 완료!"
    echo "=========================================="
    echo
    echo "📊 데이터베이스 접속 정보:"
    echo "   Host: localhost"
    echo "   Port: 3306"
    echo "   Database: celmade_db"
    echo "   Username: celmade_user"
    echo "   Password: celmade_password"
    echo "   Root Password: celmade_root_password"
    echo
    echo "🌐 phpMyAdmin 접속 정보:"
    echo "   URL: http://localhost:8080"
    echo "   Username: root"
    echo "   Password: celmade_root_password"
    echo
    echo "🔧 유용한 명령어:"
    echo "   컨테이너 상태 확인: docker-compose ps"
    echo "   로그 확인: docker-compose logs mysql"
    echo "   컨테이너 중지: docker-compose down"
    echo "   컨테이너 재시작: docker-compose restart"
    echo
    echo "⚠️  보안 주의사항:"
    echo "   - 프로덕션 환경에서는 비밀번호를 변경하세요"
    echo "   - .env 파일을 .gitignore에 추가하세요"
    echo
}

# 메인 실행
main() {
    echo "=========================================="
    echo "Celmade Dashboard Database Docker Setup"
    echo "=========================================="
    echo
    
    check_docker
    cleanup_existing
    create_directories
    create_env_file
    start_containers
    check_database
    show_connection_info
    
    print_success "설정이 완료되었습니다!"
}

# 스크립트 실행
main "$@" 