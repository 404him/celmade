import api from './api';
import type { 
  DashboardStats, 
  RecentOrder, 
  StockItem, 
  Customer, 
  Order,
  ShippingStatusCount,
  PlatformData 
} from '../types/dashboard';

export const dashboardService = {
  // 대시보드 통계 가져오기
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await api.get<DashboardStats>('/dashboard/stats');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '대시보드 통계를 가져오는데 실패했습니다.');
    }
  },

  // 배송 현황 가져오기
  async getShippingStatus(): Promise<ShippingStatusCount[]> {
    try {
      const response = await api.get<ShippingStatusCount[]>('/dashboard/shipping-status');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '배송 현황을 가져오는데 실패했습니다.');
    }
  },

  // 최근 주문 가져오기
  async getRecentOrders(limit: number = 10): Promise<RecentOrder[]> {
    try {
      const response = await api.get<RecentOrder[]>(`/dashboard/recent-orders?limit=${limit}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '최근 주문을 가져오는데 실패했습니다.');
    }
  },

  // 재고 현황 가져오기
  async getStockStatus(): Promise<StockItem[]> {
    try {
      const response = await api.get<StockItem[]>('/dashboard/stock-status');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '재고 현황을 가져오는데 실패했습니다.');
    }
  },

  // 회원 정보 가져오기
  async getCustomers(limit: number = 10): Promise<Customer[]> {
    try {
      const response = await api.get<Customer[]>(`/dashboard/customers?limit=${limit}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '회원 정보를 가져오는데 실패했습니다.');
    }
  },

  // 주문 정보 가져오기
  async getOrders(limit: number = 10): Promise<Order[]> {
    try {
      const response = await api.get<Order[]>(`/dashboard/orders?limit=${limit}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '주문 정보를 가져오는데 실패했습니다.');
    }
  },

  // 플랫폼별 데이터 가져오기
  async getPlatformData(): Promise<PlatformData> {
    try {
      const response = await api.get<PlatformData>('/dashboard/platform-data');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '플랫폼별 데이터를 가져오는데 실패했습니다.');
    }
  },

  // 쇼피파이 데이터 가져오기
  async getShopifyData(): Promise<PlatformData['shopify']> {
    try {
      const response = await api.get<PlatformData['shopify']>('/dashboard/shopify-data');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '쇼피파이 데이터를 가져오는데 실패했습니다.');
    }
  },

  // 워드프레스 데이터 가져오기
  async getWordPressData(): Promise<PlatformData['wordpress']> {
    try {
      const response = await api.get<PlatformData['wordpress']>('/dashboard/wordpress-data');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '워드프레스 데이터를 가져오는데 실패했습니다.');
    }
  },
}; 