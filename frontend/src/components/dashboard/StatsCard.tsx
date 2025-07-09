import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'primary'
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      case 'secondary':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-primary-600 bg-primary-50';
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <Box className="flex items-center justify-between mb-4">
          <Typography variant="h6" className="text-gray-600 font-medium">
            {title}
          </Typography>
          {icon && (
            <Box className={`p-2 rounded-lg ${getColorClass()}`}>
              {icon}
            </Box>
          )}
        </Box>
        
        <Typography variant="h4" className="font-bold text-gray-900 mb-2">
          {value}
        </Typography>
        
        {subtitle && (
          <Typography variant="body2" className="text-gray-500 mb-2">
            {subtitle}
          </Typography>
        )}
        
        {trend && (
          <Box className="flex items-center">
            {trend.isPositive ? (
              <TrendingUp className="text-green-500 text-sm mr-1" />
            ) : (
              <TrendingDown className="text-red-500 text-sm mr-1" />
            )}
            <Typography 
              variant="body2" 
              className={trend.isPositive ? 'text-green-600' : 'text-red-600'}
            >
              {trend.isPositive ? '+' : ''}{trend.value}%
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard; 