import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { LocalShipping, CheckCircle, Pending, Cancel } from '@mui/icons-material';
import type { ShippingStatusCount } from '../../types/dashboard';

interface ShippingStatusChartProps {
  data: ShippingStatusCount[];
}

const ShippingStatusChart: React.FC<ShippingStatusChartProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'primary';
      case 'processing':
        return 'warning';
      case 'pending':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-500" />;
      case 'shipped':
        return <LocalShipping className="text-blue-500" />;
      case 'processing':
        return <Pending className="text-yellow-500" />;
      case 'pending':
        return <Pending className="text-gray-500" />;
      case 'cancelled':
        return <Cancel className="text-red-500" />;
      default:
        return null;
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
      case 'pending':
        return '대기중';
      case 'cancelled':
        return '취소됨';
      default:
        return status;
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <Typography variant="h6" className="text-gray-900 font-bold mb-4">
          배송 현황
        </Typography>
        
        <Box className="space-y-4">
          {data.map((item) => (
            <Box key={item.status} className="flex items-center justify-between">
              <Box className="flex items-center space-x-3">
                {getStatusIcon(item.status)}
                <Box>
                  <Typography variant="body1" className="font-medium text-gray-900">
                    {getStatusLabel(item.status)}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    {item.count}건 ({item.percentage.toFixed(1)}%)
                  </Typography>
                </Box>
              </Box>
              
              <Chip
                label={`${item.count}건`}
                color={getStatusColor(item.status) as any}
                size="small"
                variant="outlined"
              />
            </Box>
          ))}
        </Box>
        
        <Box className="mt-6 pt-4 border-t border-gray-200">
          <Box className="flex justify-between items-center">
            <Typography variant="body2" className="text-gray-600">
              총 주문
            </Typography>
            <Typography variant="h6" className="font-bold text-gray-900">
              {data.reduce((sum, item) => sum + item.count, 0)}건
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ShippingStatusChart; 