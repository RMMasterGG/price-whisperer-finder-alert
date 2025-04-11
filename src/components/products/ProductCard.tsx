
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash, Bell, BellOff, LineChart } from "lucide-react";
import { getMarketplaceColor } from "@/utils/marketplaceUtils";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PriceHistoryChart } from "@/components/products/PriceHistoryChart";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  url: string;
  marketplace: string;
}

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

const ProductCard = ({ product, onDelete }: ProductCardProps) => {
  const [isNotifying, setIsNotifying] = useState(true);
  const [showChart, setShowChart] = useState(false);

  const marketplaceColorClass = getMarketplaceColor(product.marketplace);
  
  const toggleNotifications = () => {
    setIsNotifying(!isNotifying);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleDelete = () => {
    onDelete(product.id);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className={`h-2 ${marketplaceColorClass}`}></div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
          <Badge variant="outline">{product.marketplace}</Badge>
        </div>
        <CardDescription className="line-clamp-1">
          <a 
            href={product.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Открыть на сайте
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        <div className="flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-36 object-contain"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl">{formatPrice(product.price)}</span>
          <div className="flex space-x-1">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setShowChart(true)}>
                  <LineChart className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>История цены</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <PriceHistoryChart productId={product.id} />
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleNotifications}
              className={isNotifying ? "bg-blue-50" : ""}
            >
              {isNotifying ? (
                <Bell className="h-4 w-4 text-blue-500" />
              ) : (
                <BellOff className="h-4 w-4" />
              )}
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Минимальная цена:</span>
            <span className="font-medium text-green-600">
              {formatPrice(product.price * 0.85)}
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Изменение за месяц:</span>
            <span className="font-medium text-blue-600">-5%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
