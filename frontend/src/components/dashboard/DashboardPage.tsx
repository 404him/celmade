import React from 'react';
import { Avatar } from '@mui/material';
import Layout from '../layout/Layout';

// 피그마 스타일용 더미 데이터 (기존과 동일)
const stats = [
  { title: 'Orders', value: 250, change: '+11.02%', isPositive: true },
  { title: 'User', value: 899, change: '-0.03%', isPositive: false },
  { title: 'CS', value: 300, change: '+15.03%', isPositive: true },
];
const productTracking = [
  { label: '배송완료', value: 1023, percent: 82.0, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200', chip: 'bg-green-100 text-green-700' },
  { label: '배송중', value: 156, percent: 12.5, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', chip: 'bg-blue-100 text-blue-700' },
  { label: '처리중', value: 45, percent: 3.6, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200', chip: 'bg-orange-100 text-orange-700' },
  { label: '대기', value: 23, percent: 1.8, color: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-200', chip: 'bg-gray-100 text-gray-700' },
  { label: '취소됨', value: 12, percent: 0.1, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200', chip: 'bg-red-100 text-red-700' },
];
const productInventory = [
  { name: '프리미엄 티셔츠', sku: 'TS-001', stock: 45, min: 20, status: '재고있음', statusColor: 'bg-green-100 text-green-700', bar: 'bg-green-500', platform: 'Shopify', updated: '2024년 1월 15일' },
  { name: '데님 팬츠', sku: 'DP-002', stock: 8, min: 15, status: '재고부족', statusColor: 'bg-orange-100 text-orange-700', bar: 'bg-orange-500', platform: 'WordPress', updated: '2024년 1월 15일' },
  { name: '스니커즈', sku: 'SN-003', stock: 0, min: 10, status: '품절', statusColor: 'bg-red-100 text-red-700', bar: 'bg-red-500', platform: 'Shopify', updated: '2024년 1월 15일' },
];
const recentOrders = [
  { id: '1', orderNumber: 'ORD-2024-001', customerName: '김철수', customerEmail: 'kim@example.com', platform: 'Shopify', status: '배송완료', statusColor: 'bg-green-100 text-green-700', date: '2024년 1월 15일 오전 07:30' },
  { id: '2', orderNumber: 'ORD-2024-002', customerName: '이영희', customerEmail: 'lee@example.com', platform: 'WordPress', status: '배송중', statusColor: 'bg-blue-100 text-blue-700', date: '2024년 1월 15일 오전 06:15' },
  { id: '3', orderNumber: 'ORD-2024-003', customerName: '박민수', customerEmail: 'park@example.com', platform: 'Shopify', status: '처리중', statusColor: 'bg-orange-100 text-orange-700', date: '2024년 1월 15일 오전 05:45' },
];
const notifications = [
  { text: 'You launched a campaign.', time: 'Just now' },
  { text: 'New user signed up.', time: '32 minutes ago' },
  { text: 'You restocked XYZ product.', time: '8 hours ago' },
  { text: 'Running low on XYZ product.', time: 'Today, 10:24 AM' },
];
const teamActivity = [
  { name: '김철수', avatar: '', activity: 'Ordered XYZ product.', time: 'Just now' },
  { name: '이영희', avatar: '', activity: 'Inquired about ABC product.', time: '59 minutes ago' },
  { name: '박민수', avatar: '', activity: 'Submitted a review.', time: '12 hours ago' },
  { name: '최지영', avatar: '', activity: 'Completed transaction.', time: 'Today, 11:59 AM' },
  { name: '홍길동', avatar: '', activity: 'Signed up for newsletter.', time: 'Feb 2, 2024' },
];

const DashboardPage: React.FC = () => {
  // 임시 유저 정보 (실제 로그인 연동 시 교체)
  const user = { name: 'Admin', role: 'SUPER_ADMIN', email: 'admin@celmade.com' };

  return (
    <Layout user={user}>
      <div className="flex w-full min-h-screen bg-white font-sans text-[#222]">
        {/* 좌측 여백(사이드바 공간) */}
        {/* <div className="w-[260px] shrink-0" />  // Layout에서 이미 사이드바 제공 */}
        {/* 메인 컨텐츠 */}
        <main className="flex-1 flex flex-col px-10 pt-10 pb-6 max-w-[1280px] mx-auto">
          {/* 상단 네비게이션/탭 */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <span className="font-semibold text-black">Dashboard</span>
            <span className="mx-1">/</span>
            <span>Overview</span>
          </div>
          {/* 통계 카드 */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-2 shadow-none">
                <div className="text-xs text-gray-400 mb-1">{stat.title}</div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className={`text-xs ${stat.isPositive ? 'text-green-500' : 'text-red-500'} font-medium flex items-center gap-1`}>
                    {stat.change}
                    <span>{stat.isPositive ? '▲' : '▼'}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* 중간 2단 카드 */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Product Tracking */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-2">
              <div className="font-semibold mb-2">Product Tracking</div>
              <div className="flex flex-col gap-2">
                {productTracking.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-full border ${item.border} flex items-center justify-center ${item.bg}`}></span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{item.value}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.chip}`}>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-2 text-xs text-gray-400">총 주문 <span className="font-bold text-black ml-1">1259건</span></div>
            </div>
            {/* Product Inventory */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-2">
              <div className="font-semibold mb-2">Product Inventory</div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-400">
                    <th className="font-semibold p-1 text-left">상품명</th>
                    <th className="font-semibold p-1 text-left">SKU</th>
                    <th className="font-semibold p-1 text-left">재고</th>
                    <th className="font-semibold p-1 text-left">상태</th>
                    <th className="font-semibold p-1 text-left">업데이트</th>
                  </tr>
                </thead>
                <tbody>
                  {productInventory.map((item, i) => (
                    <tr key={i}>
                      <td className="p-1">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-[11px] text-gray-400">{item.platform}</div>
                      </td>
                      <td className="p-1">{item.sku}</td>
                      <td className="p-1">
                        <div className="flex items-center gap-1">
                          <span className="font-bold">{item.stock}</span>
                          <span className="text-gray-400 text-xs">/ {item.min}</span>
                        </div>
                        <div className="w-full h-1 bg-gray-100 rounded-full mt-1">
                          <div className={`${item.bar} h-1 rounded-full`} style={{ width: `${Math.min(100, (item.stock / item.min) * 100)}%` }} />
                        </div>
                      </td>
                      <td className="p-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.statusColor}`}>{item.status}</span>
                      </td>
                      <td className="p-1">{item.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="font-semibold mb-2">Recent Orders</div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-400">
                  <th className="font-semibold p-1 text-left">주문번호</th>
                  <th className="font-semibold p-1 text-left">고객명</th>
                  <th className="font-semibold p-1 text-left">플랫폼</th>
                  <th className="font-semibold p-1 text-left">상태</th>
                  <th className="font-semibold p-1 text-left">주문일</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr key={i}>
                    <td className="p-1">{order.orderNumber}</td>
                    <td className="p-1">
                      <div className="flex items-center gap-2">
                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#f3f4f6', color: '#222', fontWeight: 700, fontSize: 16 }}>{order.customerName.charAt(0)}</Avatar>
                        <div>
                          <div className="font-semibold">{order.customerName}</div>
                          <div className="text-[11px] text-gray-400">{order.customerEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${order.platform === 'Shopify' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{order.platform}</span>
                    </td>
                    <td className="p-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${order.statusColor}`}>{order.status}</span>
                    </td>
                    <td className="p-1">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        {/* 우측 패널 */}
        <aside className="w-[320px] shrink-0 flex flex-col gap-6 py-10 px-0 bg-white shadow-lg">
          {/* Notifications */}
          <div className="rounded-2xl p-6 mb-2">
            <div className="font-semibold mb-2">Notifications</div>
            <div className="flex flex-col gap-2">
              {notifications.map((n, i) => (
                <div key={i} className="flex items-center justify-between text-xs text-gray-700">
                  <span>{n.text}</span>
                  <span className="text-gray-400">{n.time}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Team Activity */}
          <div className="rounded-2xl p-6">
            <div className="font-semibold mb-2">Team Activity</div>
            <div className="flex flex-col gap-3">
              {teamActivity.map((a, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <Avatar sx={{ width: 28, height: 28, bgcolor: '#f3f4f6', color: '#222', fontWeight: 700, fontSize: 14 }}>{a.name.charAt(0)}</Avatar>
                  <div>
                    <div className="font-semibold">{a.activity}</div>
                    <div className="text-gray-400">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default DashboardPage; 