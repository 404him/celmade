-- Celmade Database Schema (정렬 최적화 버전)
-- E-commerce + Admin CMS 통합 관리 시스템

-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS celmade_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE celmade_db;

-- 1. 회원 테이블 (정렬 최적화)
CREATE TABLE users (
    idx BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    address TEXT NOT NULL,
    postcode VARCHAR(20) NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'USA',
    timezone VARCHAR(50) DEFAULT 'UTC',
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP NULL,
    login_count INT DEFAULT 0,
    
    -- 검색 최적화 인덱스
    INDEX idx_email (email),
    INDEX idx_phone (phone_number),
    INDEX idx_username (username),
    INDEX idx_state_city (state, city),
    INDEX idx_country_state (country, state),
    INDEX idx_postcode (postcode),
    INDEX idx_created_at (created_at),
    INDEX idx_active_created (is_active, created_at),
    INDEX idx_last_login (last_login_at),
    INDEX idx_login_count (login_count),
    
    -- 정렬 최적화 인덱스 (오름차순/내림차순)
    INDEX idx_created_at_asc (created_at ASC),
    INDEX idx_created_at_desc (created_at DESC),
    INDEX idx_updated_at_asc (updated_at ASC),
    INDEX idx_updated_at_desc (updated_at DESC),
    INDEX idx_last_login_asc (last_login_at ASC),
    INDEX idx_last_login_desc (last_login_at DESC),
    INDEX idx_login_count_asc (login_count ASC),
    INDEX idx_login_count_desc (login_count DESC),
    INDEX idx_username_asc (username ASC),
    INDEX idx_username_desc (username DESC),
    INDEX idx_email_asc (email ASC),
    INDEX idx_email_desc (email DESC),
    INDEX idx_state_asc (state ASC),
    INDEX idx_state_desc (state DESC),
    INDEX idx_city_asc (city ASC),
    INDEX idx_city_desc (city DESC),
    INDEX idx_country_asc (country ASC),
    INDEX idx_country_desc (country DESC),
    
    -- 복합 정렬 인덱스
    INDEX idx_active_created_asc (is_active, created_at ASC),
    INDEX idx_active_created_desc (is_active, created_at DESC),
    INDEX idx_country_state_asc (country, state ASC),
    INDEX idx_country_state_desc (country, state DESC),
    INDEX idx_state_city_asc (state, city ASC),
    INDEX idx_state_city_desc (state, city DESC),
    INDEX idx_login_activity_asc (login_count, last_login_at ASC),
    INDEX idx_login_activity_desc (login_count, last_login_at DESC),
    
    -- 복합 검색 인덱스
    INDEX idx_search_user (username, email, phone_number),
    INDEX idx_location_search (country, state, city, postcode),
    INDEX idx_active_location (is_active, country, state),
    INDEX idx_user_activity (is_active, last_login_at, login_count)
);

-- 2. 관리자 테이블 (정렬 최적화)
CREATE TABLE admins (
    idx BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('SUPER_ADMIN', 'ADMIN', 'MODERATOR') DEFAULT 'ADMIN',
    permissions JSON,
    last_login_at TIMESTAMP NULL,
    login_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- 검색 인덱스
    INDEX idx_username (username),
    INDEX idx_name (name),
    INDEX idx_role (role),
    INDEX idx_active_role (is_active, role),
    INDEX idx_last_login (last_login_at),
    INDEX idx_permissions ((CAST(permissions->>'$.modules' AS CHAR(100)))),
    
    -- 정렬 최적화 인덱스
    INDEX idx_name_asc (name ASC),
    INDEX idx_name_desc (name DESC),
    INDEX idx_username_asc (username ASC),
    INDEX idx_username_desc (username DESC),
    INDEX idx_role_asc (role ASC),
    INDEX idx_role_desc (role DESC),
    INDEX idx_created_at_asc (created_at ASC),
    INDEX idx_created_at_desc (created_at DESC),
    INDEX idx_last_login_asc (last_login_at ASC),
    INDEX idx_last_login_desc (last_login_at DESC),
    INDEX idx_login_count_asc (login_count ASC),
    INDEX idx_login_count_desc (login_count DESC),
    
    -- 복합 정렬 인덱스
    INDEX idx_active_role_asc (is_active, role ASC),
    INDEX idx_active_role_desc (is_active, role DESC),
    INDEX idx_role_login_asc (role, last_login_at ASC),
    INDEX idx_role_login_desc (role, last_login_at DESC)
);

-- 3. 제품 테이블 (정렬 최적화)
CREATE TABLE products (
    idx BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    brand VARCHAR(100),
    quantity INT NOT NULL DEFAULT 0,
    min_quantity INT DEFAULT 0,
    max_quantity INT,
    expiration_date DATE,
    note TEXT,
    price DECIMAL(10,2) NOT NULL,
    cost_price DECIMAL(10,2),
    discount_price DECIMAL(10,2),
    status ENUM('ACTIVE', 'INACTIVE', 'OUT_OF_STOCK', 'DISCONTINUED') DEFAULT 'ACTIVE',
    tags JSON,
    images JSON,
    specifications JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_restocked_at TIMESTAMP NULL,
    
    -- 검색 최적화 인덱스
    INDEX idx_sku (sku),
    INDEX idx_product_name (product_name),
    INDEX idx_category (category),
    INDEX idx_subcategory (subcategory),
    INDEX idx_brand (brand),
    INDEX idx_status (status),
    INDEX idx_price (price),
    INDEX idx_quantity (quantity),
    INDEX idx_expiration (expiration_date),
    INDEX idx_created_at (created_at),
    INDEX idx_last_restocked (last_restocked_at),
    
    -- 정렬 최적화 인덱스 (오름차순/내림차순)
    INDEX idx_product_name_asc (product_name ASC),
    INDEX idx_product_name_desc (product_name DESC),
    INDEX idx_sku_asc (sku ASC),
    INDEX idx_sku_desc (sku DESC),
    INDEX idx_category_asc (category ASC),
    INDEX idx_category_desc (category DESC),
    INDEX idx_subcategory_asc (subcategory ASC),
    INDEX idx_subcategory_desc (subcategory DESC),
    INDEX idx_brand_asc (brand ASC),
    INDEX idx_brand_desc (brand DESC),
    INDEX idx_price_asc (price ASC),
    INDEX idx_price_desc (price DESC),
    INDEX idx_quantity_asc (quantity ASC),
    INDEX idx_quantity_desc (quantity DESC),
    INDEX idx_created_at_asc (created_at ASC),
    INDEX idx_created_at_desc (created_at DESC),
    INDEX idx_updated_at_asc (updated_at ASC),
    INDEX idx_updated_at_desc (updated_at DESC),
    INDEX idx_last_restocked_asc (last_restocked_at ASC),
    INDEX idx_last_restocked_desc (last_restocked_at DESC),
    INDEX idx_expiration_asc (expiration_date ASC),
    INDEX idx_expiration_desc (expiration_date DESC),
    
    -- 복합 정렬 인덱스
    INDEX idx_status_created_asc (status, created_at ASC),
    INDEX idx_status_created_desc (status, created_at DESC),
    INDEX idx_category_price_asc (category, price ASC),
    INDEX idx_category_price_desc (category, price DESC),
    INDEX idx_brand_price_asc (brand, price ASC),
    INDEX idx_brand_price_desc (brand, price DESC),
    INDEX idx_quantity_status_asc (quantity, status ASC),
    INDEX idx_quantity_status_desc (quantity, status DESC),
    INDEX idx_price_status_asc (price, status ASC),
    INDEX idx_price_status_desc (price, status DESC),
    INDEX idx_expiration_status_asc (expiration_date, status ASC),
    INDEX idx_expiration_status_desc (expiration_date, status DESC),
    
    -- 복합 검색 인덱스
    INDEX idx_category_status (category, status),
    INDEX idx_brand_category (brand, category),
    INDEX idx_price_range (price, status),
    INDEX idx_stock_status (quantity, status),
    INDEX idx_product_search (product_name, category, brand),
    INDEX idx_active_products (status, created_at),
    
    -- JSON 인덱스
    INDEX idx_tags ((CAST(tags->>'$.primary' AS CHAR(50)))),
    INDEX idx_specifications ((CAST(specifications->>'$.weight' AS DECIMAL(10,2))))
);

-- 4. 주문 테이블 (정렬 최적화)
CREATE TABLE orders (
    idx BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_idx BIGINT NOT NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    total_amount DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    status ENUM('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED') DEFAULT 'PENDING',
    shipping_address TEXT NOT NULL,
    shipping_postcode VARCHAR(20) NOT NULL,
    shipping_state VARCHAR(100) NOT NULL,
    shipping_city VARCHAR(100) NOT NULL,
    shipping_country VARCHAR(100) NOT NULL DEFAULT 'USA',
    billing_address TEXT,
    billing_postcode VARCHAR(20),
    billing_state VARCHAR(100),
    billing_city VARCHAR(100),
    billing_country VARCHAR(100),
    note TEXT,
    customer_note TEXT,
    internal_note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP NULL,
    shipped_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_idx) REFERENCES users(idx) ON DELETE CASCADE,
    
    -- 검색 최적화 인덱스
    INDEX idx_order_number (order_number),
    INDEX idx_user (user_idx),
    INDEX idx_status (status),
    INDEX idx_total_amount (total_amount),
    INDEX idx_created_at (created_at),
    INDEX idx_shipping_state (shipping_state),
    INDEX idx_shipping_city (shipping_city),
    INDEX idx_shipping_country (shipping_country),
    INDEX idx_shipping_postcode (shipping_postcode),
    INDEX idx_confirmed_at (confirmed_at),
    INDEX idx_shipped_at (shipped_at),
    INDEX idx_delivered_at (delivered_at),
    
    -- 정렬 최적화 인덱스 (오름차순/내림차순)
    INDEX idx_order_number_asc (order_number ASC),
    INDEX idx_order_number_desc (order_number DESC),
    INDEX idx_total_amount_asc (total_amount ASC),
    INDEX idx_total_amount_desc (total_amount DESC),
    INDEX idx_subtotal_asc (subtotal ASC),
    INDEX idx_subtotal_desc (subtotal DESC),
    INDEX idx_created_at_asc (created_at ASC),
    INDEX idx_created_at_desc (created_at DESC),
    INDEX idx_updated_at_asc (updated_at ASC),
    INDEX idx_updated_at_desc (updated_at DESC),
    INDEX idx_confirmed_at_asc (confirmed_at ASC),
    INDEX idx_confirmed_at_desc (confirmed_at DESC),
    INDEX idx_shipped_at_asc (shipped_at ASC),
    INDEX idx_shipped_at_desc (shipped_at DESC),
    INDEX idx_delivered_at_asc (delivered_at ASC),
    INDEX idx_delivered_at_desc (delivered_at DESC),
    INDEX idx_shipping_state_asc (shipping_state ASC),
    INDEX idx_shipping_state_desc (shipping_state DESC),
    INDEX idx_shipping_city_asc (shipping_city ASC),
    INDEX idx_shipping_city_desc (shipping_city DESC),
    INDEX idx_shipping_country_asc (shipping_country ASC),
    INDEX idx_shipping_country_desc (shipping_country DESC),
    
    -- 복합 정렬 인덱스
    INDEX idx_status_created_asc (status, created_at ASC),
    INDEX idx_status_created_desc (status, created_at DESC),
    INDEX idx_user_created_asc (user_idx, created_at ASC),
    INDEX idx_user_created_desc (user_idx, created_at DESC),
    INDEX idx_amount_created_asc (total_amount, created_at ASC),
    INDEX idx_amount_created_desc (total_amount, created_at DESC),
    INDEX idx_country_state_asc (shipping_country, shipping_state ASC),
    INDEX idx_country_state_desc (shipping_country, shipping_state DESC),
    INDEX idx_state_city_asc (shipping_state, shipping_city ASC),
    INDEX idx_state_city_desc (shipping_state, shipping_city DESC),
    
    -- 복합 검색 인덱스
    INDEX idx_user_status (user_idx, status),
    INDEX idx_status_date (status, created_at),
    INDEX idx_amount_status (total_amount, status),
    INDEX idx_location_status (shipping_country, shipping_state, status),
    INDEX idx_order_search (order_number, user_idx, status)
);

-- 5. 주문 상세 테이블 (정렬 최적화)
CREATE TABLE order_items (
    idx BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_idx BIGINT NOT NULL,
    product_idx BIGINT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_idx) REFERENCES orders(idx) ON DELETE CASCADE,
    FOREIGN KEY (product_idx) REFERENCES products(idx) ON DELETE CASCADE,
    
    -- 검색 인덱스
    INDEX idx_order (order_idx),
    INDEX idx_product (product_idx),
    INDEX idx_quantity (quantity),
    INDEX idx_unit_price (unit_price),
    INDEX idx_total_price (total_price),
    INDEX idx_order_product (order_idx, product_idx),
    
    -- 정렬 최적화 인덱스
    INDEX idx_quantity_asc (quantity ASC),
    INDEX idx_quantity_desc (quantity DESC),
    INDEX idx_unit_price_asc (unit_price ASC),
    INDEX idx_unit_price_desc (unit_price DESC),
    INDEX idx_total_price_asc (total_price ASC),
    INDEX idx_total_price_desc (total_price DESC),
    INDEX idx_created_at_asc (created_at ASC),
    INDEX idx_created_at_desc (created_at DESC)
);

-- 6. 결제 테이블 (정렬 최적화)
CREATE TABLE payments (
    idx BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_idx BIGINT NOT NULL,
    payment_method ENUM('CREDIT_CARD', 'PAYPAL', 'BANK_TRANSFER', 'CRYPTO', 'CASH', 'GIFT_CARD') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED') DEFAULT 'PENDING',
    transaction_id VARCHAR(255),
    payment_date TIMESTAMP NULL,
    refund_date TIMESTAMP NULL,
    refund_amount DECIMAL(10,2) DEFAULT 0,
    payment_details JSON,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_idx) REFERENCES orders(idx) ON DELETE CASCADE,
    
    -- 검색 인덱스
    INDEX idx_order (order_idx),
    INDEX idx_transaction (transaction_id),
    INDEX idx_status (status),
    INDEX idx_payment_method (payment_method),
    INDEX idx_amount (amount),
    INDEX idx_payment_date (payment_date),
    INDEX idx_created_at (created_at),
    INDEX idx_currency (currency),
    
    -- 정렬 최적화 인덱스 (오름차순/내림차순)
    INDEX idx_amount_asc (amount ASC),
    INDEX idx_amount_desc (amount DESC),
    INDEX idx_payment_date_asc (payment_date ASC),
    INDEX idx_payment_date_desc (payment_date DESC),
    INDEX idx_refund_date_asc (refund_date ASC),
    INDEX idx_refund_date_desc (refund_date DESC),
    INDEX idx_refund_amount_asc (refund_amount ASC),
    INDEX idx_refund_amount_desc (refund_amount DESC),
    INDEX idx_created_at_asc (created_at ASC),
    INDEX idx_created_at_desc (created_at DESC),
    INDEX idx_updated_at_asc (updated_at ASC),
    INDEX idx_updated_at_desc (updated_at DESC),
    INDEX idx_transaction_asc (transaction_id ASC),
    INDEX idx_transaction_desc (transaction_id DESC),
    
    -- 복합 정렬 인덱스
    INDEX idx_method_amount_asc (payment_method, amount ASC),
    INDEX idx_method_amount_desc (payment_method, amount DESC),
    INDEX idx_status_date_asc (status, payment_date ASC),
    INDEX idx_status_date_desc (status, payment_date DESC),
    INDEX idx_amount_date_asc (amount, payment_date ASC),
    INDEX idx_amount_date_desc (amount, payment_date DESC),
    
    -- 복합 검색 인덱스
    INDEX idx_method_status (payment_method, status),
    INDEX idx_amount_status (amount, status),
    INDEX idx_date_status (payment_date, status)
);

-- 7. 배송 추적 테이블 (정렬 최적화)
CREATE TABLE shipping_tracking (
    idx BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_idx BIGINT NOT NULL,
    carrier ENUM('FEDEX', 'DHL', 'UPS', 'USPS', 'AMAZON', 'CUSTOM') NOT NULL,
    tracking_number VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    estimated_delivery DATE,
    actual_delivery DATE,
    shipping_label_url VARCHAR(500),
    tracking_data JSON,
    events JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_idx) REFERENCES orders(idx) ON DELETE CASCADE,
    
    -- 검색 인덱스
    INDEX idx_order (order_idx),
    INDEX idx_tracking (tracking_number),
    INDEX idx_carrier (carrier),
    INDEX idx_status (status),
    INDEX idx_estimated_delivery (estimated_delivery),
    INDEX idx_actual_delivery (actual_delivery),
    INDEX idx_created_at (created_at),
    
    -- 정렬 최적화 인덱스 (오름차순/내림차순)
    INDEX idx_tracking_number_asc (tracking_number ASC),
    INDEX idx_tracking_number_desc (tracking_number DESC),
    INDEX idx_estimated_delivery_asc (estimated_delivery ASC),
    INDEX idx_estimated_delivery_desc (estimated_delivery DESC),
    INDEX idx_actual_delivery_asc (actual_delivery ASC),
    INDEX idx_actual_delivery_desc (actual_delivery DESC),
    INDEX idx_created_at_asc (created_at ASC),
    INDEX idx_created_at_desc (created_at DESC),
    INDEX idx_updated_at_asc (updated_at ASC),
    INDEX idx_updated_at_desc (updated_at DESC),
    
    -- 복합 정렬 인덱스
    INDEX idx_carrier_status_asc (carrier, status ASC),
    INDEX idx_carrier_status_desc (carrier, status DESC),
    INDEX idx_delivery_status_asc (estimated_delivery, status ASC),
    INDEX idx_delivery_status_desc (estimated_delivery, status DESC),
    INDEX idx_actual_estimated_asc (actual_delivery, estimated_delivery ASC),
    INDEX idx_actual_estimated_desc (actual_delivery, estimated_delivery DESC),
    
    -- 복합 검색 인덱스
    INDEX idx_carrier_status (carrier, status),
    INDEX idx_delivery_status (estimated_delivery, status),
    
    -- JSON 인덱스
    INDEX idx_tracking_events ((CAST(events->>'$.latest_event' AS CHAR(100))))
);

-- 8. API 설정 테이블 (정렬 최적화)
CREATE TABLE api_configs (
    idx BIGINT AUTO_INCREMENT PRIMARY KEY,
    api_name VARCHAR(50) NOT NULL UNIQUE,
    api_key VARCHAR(255),
    api_secret VARCHAR(255),
    endpoint_url TEXT,
    config_data JSON,
    rate_limit INT DEFAULT 1000,
    rate_limit_period INT DEFAULT 3600,
    last_used_at TIMESTAMP NULL,
    usage_count INT DEFAULT 0,
    error_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- 검색 인덱스
    INDEX idx_api_name (api_name),
    INDEX idx_active (is_active),
    INDEX idx_last_used (last_used_at),
    INDEX idx_usage_count (usage_count),
    INDEX idx_error_count (error_count),
    
    -- 정렬 최적화 인덱스
    INDEX idx_api_name_asc (api_name ASC),
    INDEX idx_api_name_desc (api_name DESC),
    INDEX idx_last_used_asc (last_used_at ASC),
    INDEX idx_last_used_desc (last_used_at DESC),
    INDEX idx_usage_count_asc (usage_count ASC),
    INDEX idx_usage_count_desc (usage_count DESC),
    INDEX idx_error_count_asc (error_count ASC),
    INDEX idx_error_count_desc (error_count DESC),
    INDEX idx_created_at_asc (created_at ASC),
    INDEX idx_created_at_desc (created_at DESC),
    
    -- 복합 정렬 인덱스
    INDEX idx_active_usage_asc (is_active, usage_count ASC),
    INDEX idx_active_usage_desc (is_active, usage_count DESC),
    INDEX idx_active_errors_asc (is_active, error_count ASC),
    INDEX idx_active_errors_desc (is_active, error_count DESC)
);

-- 9. 시스템 로그 테이블 (정렬 최적화)
CREATE TABLE system_logs (
    idx BIGINT AUTO_INCREMENT PRIMARY KEY,
    log_level ENUM('INFO', 'WARNING', 'ERROR', 'DEBUG', 'CRITICAL') NOT NULL,
    module VARCHAR(100) NOT NULL,
    submodule VARCHAR(100),
    message TEXT NOT NULL,
    details JSON,
    user_idx BIGINT,
    admin_idx BIGINT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    request_url VARCHAR(500),
    request_method VARCHAR(10),
    response_code INT,
    execution_time_ms INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- 검색 인덱스
    INDEX idx_level (log_level),
    INDEX idx_module (module),
    INDEX idx_submodule (submodule),
    INDEX idx_created_at (created_at),
    INDEX idx_user (user_idx),
    INDEX idx_admin (admin_idx),
    INDEX idx_ip (ip_address),
    INDEX idx_response_code (response_code),
    
    -- 정렬 최적화 인덱스 (오름차순/내림차순)
    INDEX idx_created_at_asc (created_at ASC),
    INDEX idx_created_at_desc (created_at DESC),
    INDEX idx_execution_time_asc (execution_time_ms ASC),
    INDEX idx_execution_time_desc (execution_time_ms DESC),
    INDEX idx_response_code_asc (response_code ASC),
    INDEX idx_response_code_desc (response_code DESC),
    
    -- 복합 정렬 인덱스
    INDEX idx_level_created_asc (log_level, created_at ASC),
    INDEX idx_level_created_desc (log_level, created_at DESC),
    INDEX idx_module_created_asc (module, created_at ASC),
    INDEX idx_module_created_desc (module, created_at DESC),
    INDEX idx_user_created_asc (user_idx, created_at ASC),
    INDEX idx_user_created_desc (user_idx, created_at DESC),
    INDEX idx_admin_created_asc (admin_idx, created_at ASC),
    INDEX idx_admin_created_desc (admin_idx, created_at DESC),
    
    -- 복합 검색 인덱스
    INDEX idx_level_date (log_level, created_at),
    INDEX idx_module_date (module, created_at),
    INDEX idx_user_date (user_idx, created_at),
    
    -- JSON 인덱스
    INDEX idx_log_details ((CAST(details->>'$.error_code' AS CHAR(20))))
);

-- 10. 쇼피파이 동기화 테이블 (정렬 최적화)
CREATE TABLE shopify_sync (
    idx BIGINT AUTO_INCREMENT PRIMARY KEY,
    shopify_product_id BIGINT NOT NULL,
    local_product_idx BIGINT,
    sync_status ENUM('PENDING', 'SYNCED', 'FAILED', 'CONFLICT') DEFAULT 'PENDING',
    sync_type ENUM('CREATE', 'UPDATE', 'DELETE') DEFAULT 'UPDATE',
    last_sync_at TIMESTAMP NULL,
    next_sync_at TIMESTAMP NULL,
    retry_count INT DEFAULT 0,
    max_retries INT DEFAULT 3,
    sync_data JSON,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (local_product_idx) REFERENCES products(idx) ON DELETE SET NULL,
    
    -- 검색 인덱스
    INDEX idx_shopify_id (shopify_product_id),
    INDEX idx_local_product (local_product_idx),
    INDEX idx_sync_status (sync_status),
    INDEX idx_sync_type (sync_type),
    INDEX idx_last_sync (last_sync_at),
    INDEX idx_next_sync (next_sync_at),
    INDEX idx_retry_count (retry_count),
    INDEX idx_created_at (created_at),
    
    -- 정렬 최적화 인덱스 (오름차순/내림차순)
    INDEX idx_shopify_id_asc (shopify_product_id ASC),
    INDEX idx_shopify_id_desc (shopify_product_id DESC),
    INDEX idx_last_sync_asc (last_sync_at ASC),
    INDEX idx_last_sync_desc (last_sync_at DESC),
    INDEX idx_next_sync_asc (next_sync_at ASC),
    INDEX idx_next_sync_desc (next_sync_at DESC),
    INDEX idx_retry_count_asc (retry_count ASC),
    INDEX idx_retry_count_desc (retry_count DESC),
    INDEX idx_created_at_asc (created_at ASC),
    INDEX idx_created_at_desc (created_at DESC),
    INDEX idx_updated_at_asc (updated_at ASC),
    INDEX idx_updated_at_desc (updated_at DESC),
    
    -- 복합 정렬 인덱스
    INDEX idx_status_sync_asc (sync_status, last_sync_at ASC),
    INDEX idx_status_sync_desc (sync_status, last_sync_at DESC),
    INDEX idx_type_status_asc (sync_type, sync_status ASC),
    INDEX idx_type_status_desc (sync_type, sync_status DESC),
    INDEX idx_retry_status_asc (retry_count, sync_status ASC),
    INDEX idx_retry_status_desc (retry_count, sync_status DESC),
    
    -- 복합 검색 인덱스
    INDEX idx_status_sync (sync_status, last_sync_at),
    INDEX idx_pending_syncs (sync_status, next_sync_at) WHERE sync_status = 'PENDING',
    INDEX idx_failed_syncs (sync_status, retry_count) WHERE sync_status = 'FAILED' AND retry_count < max_retries
);

-- 11. 워드프레스 동기화 테이블 (정렬 최적화)
CREATE TABLE wordpress_sync (
    idx BIGINT AUTO_INCREMENT PRIMARY KEY,
    wp_post_id BIGINT NOT NULL,
    sync_type ENUM('POST', 'PAGE', 'PRODUCT', 'CATEGORY', 'TAG') NOT NULL,
    sync_status ENUM('PENDING', 'SYNCED', 'FAILED', 'CONFLICT') DEFAULT 'PENDING',
    sync_operation ENUM('CREATE', 'UPDATE', 'DELETE') DEFAULT 'UPDATE',
    last_sync_at TIMESTAMP NULL,
    next_sync_at TIMESTAMP NULL,
    retry_count INT DEFAULT 0,
    max_retries INT DEFAULT 3,
    sync_data JSON,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- 검색 인덱스
    INDEX idx_wp_post_id (wp_post_id),
    INDEX idx_sync_type (sync_type),
    INDEX idx_sync_status (sync_status),
    INDEX idx_sync_operation (sync_operation),
    INDEX idx_last_sync (last_sync_at),
    INDEX idx_next_sync (next_sync_at),
    INDEX idx_retry_count (retry_count),
    INDEX idx_created_at (created_at),
    
    -- 정렬 최적화 인덱스 (오름차순/내림차순)
    INDEX idx_wp_post_id_asc (wp_post_id ASC),
    INDEX idx_wp_post_id_desc (wp_post_id DESC),
    INDEX idx_last_sync_asc (last_sync_at ASC),
    INDEX idx_last_sync_desc (last_sync_at DESC),
    INDEX idx_next_sync_asc (next_sync_at ASC),
    INDEX idx_next_sync_desc (next_sync_at DESC),
    INDEX idx_retry_count_asc (retry_count ASC),
    INDEX idx_retry_count_desc (retry_count DESC),
    INDEX idx_created_at_asc (created_at ASC),
    INDEX idx_created_at_desc (created_at DESC),
    INDEX idx_updated_at_asc (updated_at ASC),
    INDEX idx_updated_at_desc (updated_at DESC),
    
    -- 복합 정렬 인덱스
    INDEX idx_type_status_asc (sync_type, sync_status ASC),
    INDEX idx_type_status_desc (sync_type, sync_status DESC),
    INDEX idx_status_sync_asc (sync_status, last_sync_at ASC),
    INDEX idx_status_sync_desc (sync_status, last_sync_at DESC),
    INDEX idx_operation_status_asc (sync_operation, sync_status ASC),
    INDEX idx_operation_status_desc (sync_operation, sync_status DESC),
    
    -- 복합 검색 인덱스
    INDEX idx_type_status (sync_type, sync_status),
    INDEX idx_status_sync (sync_status, last_sync_at),
    INDEX idx_pending_wp_syncs (sync_status, next_sync_at) WHERE sync_status = 'PENDING'
);

-- 12. 캐시 테이블 (정렬 최적화)
CREATE TABLE cache_data (
    cache_key VARCHAR(255) PRIMARY KEY,
    cache_value LONGTEXT NOT NULL,
    cache_type ENUM('API_RESPONSE', 'QUERY_RESULT', 'CONFIG', 'SESSION') NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    access_count INT DEFAULT 0,
    
    -- 검색 인덱스
    INDEX idx_cache_type (cache_type),
    INDEX idx_expires_at (expires_at),
    INDEX idx_accessed_at (accessed_at),
    INDEX idx_expired_cache (expires_at) WHERE expires_at < NOW(),
    
    -- 정렬 최적화 인덱스
    INDEX idx_expires_at_asc (expires_at ASC),
    INDEX idx_expires_at_desc (expires_at DESC),
    INDEX idx_accessed_at_asc (accessed_at ASC),
    INDEX idx_accessed_at_desc (accessed_at DESC),
    INDEX idx_access_count_asc (access_count ASC),
    INDEX idx_access_count_desc (access_count DESC),
    INDEX idx_created_at_asc (created_at ASC),
    INDEX idx_created_at_desc (created_at DESC),
    
    -- 복합 정렬 인덱스
    INDEX idx_type_access_asc (cache_type, accessed_at ASC),
    INDEX idx_type_access_desc (cache_type, accessed_at DESC),
    INDEX idx_type_count_asc (cache_type, access_count ASC),
    INDEX idx_type_count_desc (cache_type, access_count DESC)
);

-- 13. 통계 테이블 (정렬 최적화)
CREATE TABLE daily_statistics (
    idx BIGINT AUTO_INCREMENT PRIMARY KEY,
    stat_date DATE NOT NULL,
    stat_type ENUM('SALES', 'ORDERS', 'USERS', 'PRODUCTS', 'REVENUE') NOT NULL,
    stat_value DECIMAL(15,2) NOT NULL,
    stat_count INT DEFAULT 0,
    stat_details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY uk_date_type (stat_date, stat_type),
    
    -- 검색 인덱스
    INDEX idx_stat_date (stat_date),
    INDEX idx_stat_type (stat_type),
    INDEX idx_date_type (stat_date, stat_type),
    
    -- 정렬 최적화 인덱스 (오름차순/내림차순)
    INDEX idx_stat_date_asc (stat_date ASC),
    INDEX idx_stat_date_desc (stat_date DESC),
    INDEX idx_stat_value_asc (stat_value ASC),
    INDEX idx_stat_value_desc (stat_value DESC),
    INDEX idx_stat_count_asc (stat_count ASC),
    INDEX idx_stat_count_desc (stat_count DESC),
    INDEX idx_created_at_asc (created_at ASC),
    INDEX idx_created_at_desc (created_at DESC),
    
    -- 복합 정렬 인덱스
    INDEX idx_type_value_asc (stat_type, stat_value ASC),
    INDEX idx_type_value_desc (stat_type, stat_value DESC),
    INDEX idx_type_count_asc (stat_type, stat_count ASC),
    INDEX idx_type_count_desc (stat_type, stat_count DESC),
    INDEX idx_date_value_asc (stat_date, stat_value ASC),
    INDEX idx_date_value_desc (stat_date, stat_value DESC)
);

-- 기본 데이터 삽입
INSERT INTO admins (name, username, password_hash, role, permissions) VALUES 
('Super Admin', 'admin', '$2a$10$encrypted_password_hash', 'SUPER_ADMIN', '{"modules": ["all"], "permissions": ["read", "write", "delete", "admin"]}');

INSERT INTO api_configs (api_name, api_key, api_secret, endpoint_url, config_data) VALUES 
('FEDEX', '', '', 'https://apis.fedex.com', '{"version": "v1", "timeout": 30}'),
('DHL', '', '', 'https://api.dhl.com', '{"version": "v3", "timeout": 30}'),
('GOOGLE_MAIL', '', '', 'https://gmail.googleapis.com', '{"scopes": ["read", "send"], "timeout": 60}'),
('GOOGLE_MAPS', '', '', 'https://maps.googleapis.com', '{"version": "v1", "timeout": 30}'),
('SHOPIFY', '', '', '', '{"api_version": "2024-01", "timeout": 60}'),
('WORDPRESS', '', '', '', '{"version": "v2", "timeout": 30}');

-- 고급 뷰 생성 (정렬 최적화)
CREATE VIEW user_order_summary AS
SELECT 
    u.idx as user_idx,
    u.username,
    u.email,
    u.state,
    u.city,
    u.country,
    COUNT(o.idx) as total_orders,
    SUM(o.total_amount) as total_spent,
    AVG(o.total_amount) as avg_order_value,
    MAX(o.created_at) as last_order_date,
    MIN(o.created_at) as first_order_date,
    COUNT(CASE WHEN o.status = 'DELIVERED' THEN 1 END) as completed_orders,
    COUNT(CASE WHEN o.status = 'CANCELLED' THEN 1 END) as cancelled_orders,
    u.created_at as user_created_date,
    u.last_login_at,
    u.login_count
FROM users u
LEFT JOIN orders o ON u.idx = o.user_idx
GROUP BY u.idx, u.username, u.email, u.state, u.city, u.country, u.created_at, u.last_login_at, u.login_count;

CREATE VIEW product_sales_summary AS
SELECT 
    p.idx as product_idx,
    p.product_name,
    p.sku,
    p.category,
    p.brand,
    p.price,
    p.quantity as current_stock,
    SUM(oi.quantity) as total_sold,
    SUM(oi.total_price) as total_revenue,
    COUNT(DISTINCT o.idx) as order_count,
    AVG(oi.unit_price) as avg_sale_price,
    MAX(o.created_at) as last_sold_date,
    p.created_at as product_created_date,
    p.last_restocked_at,
    p.expiration_date
FROM products p
LEFT JOIN order_items oi ON p.idx = oi.product_idx
LEFT JOIN orders o ON oi.order_idx = o.idx AND o.status != 'CANCELLED'
GROUP BY p.idx, p.product_name, p.sku, p.category, p.brand, p.price, p.quantity, p.created_at, p.last_restocked_at, p.expiration_date;

CREATE VIEW order_payment_summary AS
SELECT 
    o.idx as order_idx,
    o.order_number,
    o.total_amount,
    o.status as order_status,
    p.status as payment_status,
    p.payment_method,
    p.amount as payment_amount,
    p.payment_date,
    st.carrier,
    st.tracking_number,
    st.status as shipping_status,
    st.estimated_delivery,
    st.actual_delivery,
    o.created_at as order_date,
    o.confirmed_at,
    o.shipped_at,
    o.delivered_at
FROM orders o
LEFT JOIN payments p ON o.idx = p.order_idx
LEFT JOIN shipping_tracking st ON o.idx = st.order_idx; 