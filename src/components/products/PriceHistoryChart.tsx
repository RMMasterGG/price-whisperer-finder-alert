
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface PricePoint {
  date: string;
  price: number;
}

interface PriceHistoryChartProps {
  productId: string;
}

export const PriceHistoryChart = ({ productId }: PriceHistoryChartProps) => {
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generatePriceHistory = async () => {
      // In a real app, this would be an API call to get price history
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Generate mock price history data for demo
      const today = new Date();
      const mockData: PricePoint[] = [];
      
      // Generate last 30 days of price data
      let basePrice = Math.floor(Math.random() * 5000) + 3000;
      
      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        
        // Create some price fluctuation for the demo
        const priceChange = Math.random() > 0.5 
          ? Math.floor(Math.random() * 300) 
          : -Math.floor(Math.random() * 300);
        
        basePrice += priceChange;
        if (basePrice < 1000) basePrice = 1000; // Ensure price doesn't go too low
        
        mockData.push({
          date: date.toISOString().split("T")[0],
          price: basePrice,
        });
      }
      
      setPriceHistory(mockData);
      setIsLoading(false);
    };

    generatePriceHistory();
  }, [productId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <Card className="w-full h-64 flex items-center justify-center">
        <CardContent>Загрузка данных...</CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={priceHistory}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }} 
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getDate()}.${date.getMonth() + 1}`;
            }}
          />
          <YAxis 
            domain={["dataMin - 500", "dataMax + 500"]}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${Math.floor(value / 1000)}k`}
          />
          <Tooltip 
            formatter={(value: number) => [formatPrice(value), "Цена"]}
            labelFormatter={(label) => {
              const date = new Date(label);
              return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
            }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
