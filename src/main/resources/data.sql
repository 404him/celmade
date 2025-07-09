-- 테스트용 관리자 계정 생성
-- 비밀번호: admin123 (BCrypt 암호화)
INSERT INTO admins (name, username, password_hash, role, created_at, updated_at, is_active) 
VALUES (
    '관리자',
    'admin',
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa',
    'ADMIN',
    NOW(),
    NOW(),
    true
) ON DUPLICATE KEY UPDATE 
    name = VALUES(name),
    password_hash = VALUES(password_hash),
    role = VALUES(role),
    updated_at = NOW(),
    is_active = true; 