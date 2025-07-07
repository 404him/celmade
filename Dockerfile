# MySQL 8.0 이미지 사용
FROM mysql:8.0

# 환경 변수 설정
ENV MYSQL_ROOT_PASSWORD=celmade_root_password
ENV MYSQL_DATABASE=celmade_db
ENV MYSQL_USER=celmade_user
ENV MYSQL_PASSWORD=celmade_password

# 포트 노출
EXPOSE 3306

# 초기화 스크립트 복사
COPY database_schema_sorting_optimized.sql /docker-entrypoint-initdb.d/

# MySQL 설정 파일 복사
COPY mysql_config/my.cnf /etc/mysql/conf.d/

# 권한 설정
RUN chmod 644 /etc/mysql/conf.d/my.cnf

# 헬스체크 설정
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD mysqladmin ping -h localhost -u root -p$MYSQL_ROOT_PASSWORD || exit 1 