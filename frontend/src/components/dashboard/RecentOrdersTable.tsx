import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Avatar
} from '@mui/material';
import { ShoppingCart, Storefront } from '@mui/icons-material';
import type { RecentOrder } from '../../types/dashboard';

interface RecentOrdersTableProps {
  orders: RecentOrder[];
}

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ orders }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'primary';
      case 'processing':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'pending':
        return 'default';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered':
        return '배송완료';
      case 'shipped':
        return '배송중';
      case 'processing':
        return '처리중';
      case 'confirmed':
        return '확인됨';
      case 'pending':
        return '대기중';
      case 'cancelled':
        return '취소됨';
      default:
        return status;
    }
  };

  const getPlatformIcon = (platform: string) => {
    return platform === 'shopify' ? (
      <Storefront className="text-green-500" />
    ) : (
      <ShoppingCart className="text-blue-500" />
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <Typography variant="h6" className="text-gray-900 font-bold mb-4">
          최근 주문
        </Typography>
        
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className="font-medium">주문번호</TableCell>
                <TableCell className="font-medium">고객명</TableCell>
                <TableCell className="font-medium">플랫폼</TableCell>
                <TableCell className="font-medium">상태</TableCell>
                <TableCell className="font-medium">주문일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Typography variant="body2" className="font-medium text-gray-900">
                      {order.orderNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6 text-xs">
                        {order.customerName.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" className="font-medium text-gray-900">
                          {order.customerName}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          {order.customerEmail}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box className="flex items-center space-x-1">
                      {getPlatformIcon(order.platform)}
                      <Typography variant="body2" className="text-gray-600">
                        {order.platform === 'shopify' ? 'Shopify' : 'WordPress'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(order.status)}
                      color={getStatusColor(order.status) as any}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="text-gray-600">
                      {formatDate(order.orderDate)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {orders.length === 0 && (
          <Box className="text-center py-8">
            <Typography variant="body2" className="text-gray-500">
              최근 주문이 없습니다.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentOrdersTable; 