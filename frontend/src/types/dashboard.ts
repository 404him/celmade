// 배송 상태 타입
export type ShippingStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// 주문 상태 타입
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// 재고 상태 타입
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

// 배송 현황
export interface ShippingStatusCount {
  status: ShippingStatus;
  count: number;
  percentage: number;
}

// 최근 주문
export interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  status: OrderStatus;
  shippingStatus: ShippingStatus;
  totalItems: number;
  platform: 'shopify' | 'wordpress';
}

// 재고 현황
export interface StockItem {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  minStockLevel: number;
  status: StockStatus;
  platform: 'shopify' | 'wordpress';
  lastUpdated: string;
}

// 회원 정보
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinDate: string;
  totalOrders: number;
  platform: 'shopify' | 'wordpress';
  isActive: boolean;
}

// 주문 정보
export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  status: OrderStatus;
  shippingStatus: ShippingStatus;
  items: OrderItem[];
  platform: 'shopify' | 'wordpress';
}

// 주문 아이템
export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
}

// 대시보드 통계
export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalCustomers: number;
  lowStockItems: number;
  outOfStockItems: number;
}

// 플랫폼별 데이터
export interface PlatformData {
  shopify: {
    orders: Order[];
    customers: Customer[];
    stockItems: StockItem[];
  };
  wordpress: {
    orders: Order[];
    customers: Customer[];
    stockItems: StockItem[];
  };
} 