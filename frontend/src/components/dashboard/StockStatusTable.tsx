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
  LinearProgress
} from '@mui/material';
import { Inventory, Warning, Error } from '@mui/icons-material';
import type { StockItem } from '../../types/dashboard';

interface StockStatusTableProps {
  stockItems: StockItem[];
}

const StockStatusTable: React.FC<StockStatusTableProps> = ({ stockItems }) => {
  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'success';
      case 'low_stock':
        return 'warning';
      case 'out_of_stock':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStockStatusLabel = (status: string) => {
    switch (status) {
      case 'in_stock':
        return '재고있음';
      case 'low_stock':
        return '재고부족';
      case 'out_of_stock':
        return '품절';
      default:
        return status;
    }
  };

  const getStockStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <Inventory className="text-green-500" />;
      case 'low_stock':
        return <Warning className="text-yellow-500" />;
      case 'out_of_stock':
        return <Error className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStockPercentage = (current: number, min: number) => {
    if (min === 0) return 100;
    return Math.min((current / min) * 100, 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <Typography variant="h6" className="text-gray-900 font-bold mb-4">
          재고 현황
        </Typography>
        
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className="font-medium">상품명</TableCell>
                <TableCell className="font-medium">SKU</TableCell>
                <TableCell className="font-medium">재고</TableCell>
                <TableCell className="font-medium">상태</TableCell>
                <TableCell className="font-medium">업데이트</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Box>
                      <Typography variant="body2" className="font-medium text-gray-900">
                        {item.name}
                      </Typography>
                      <Typography variant="caption" className="text-gray-500">
                        {item.platform === 'shopify' ? 'Shopify' : 'WordPress'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="text-gray-600 font-mono">
                      {item.sku}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box className="w-20">
                      <Box className="flex items-center space-x-2 mb-1">
                        <Typography variant="body2" className="font-medium text-gray-900">
                          {item.currentStock}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          / {item.minStockLevel}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={getStockPercentage(item.currentStock, item.minStockLevel)}
                        className="h-2 rounded"
                        color={item.status === 'out_of_stock' ? 'error' : 
                               item.status === 'low_stock' ? 'warning' : 'success'}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box className="flex items-center space-x-1">
                      {getStockStatusIcon(item.status)}
                      <Chip
                        label={getStockStatusLabel(item.status)}
                        color={getStockStatusColor(item.status) as any}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="text-gray-600">
                      {formatDate(item.lastUpdated)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {stockItems.length === 0 && (
          <Box className="text-center py-8">
            <Typography variant="body2" className="text-gray-500">
              재고 정보가 없습니다.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StockStatusTable; 