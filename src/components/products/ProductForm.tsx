
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { detectMarketplace } from "@/utils/marketplaceUtils";

interface ProductFormProps {
  onProductAdded: (product: {
    id: string;
    name: string;
    price: number;
    image: string;
    url: string;
    marketplace: string;
  }) => void;
}

const ProductForm = ({ onProductAdded }: ProductFormProps) => {
  const [productUrl, setProductUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productUrl.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите URL товара",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Detect marketplace from URL
      const marketplace = detectMarketplace(productUrl);
      
      if (!marketplace) {
        toast({
          title: "Ошибка",
          description: "Маркетплейс не распознан. Поддерживаются: Ozon, Wildberries, AliExpress",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // In a real app, this would make an API call to fetch product details
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock product data (in a real app this would come from API)
      const productId = Math.random().toString(36).substring(2, 9);
      const mockProduct = {
        id: productId,
        name: `Товар ${productId} с ${marketplace}`,
        price: Math.floor(Math.random() * 10000) + 1000,
        image: `https://picsum.photos/200?random=${Math.random()}`,
        url: productUrl,
        marketplace,
      };

      onProductAdded(mockProduct);
      
      toast({
        title: "Товар добавлен",
        description: "Товар успешно добавлен в отслеживание",
      });
      
      setProductUrl("");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить товар",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Добавить товар для отслеживания</CardTitle>
        <CardDescription>
          Вставьте ссылку на товар с Ozon, Wildberries или AliExpress
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Input
              placeholder="https://www.ozon.ru/product/..."
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Добавление..." : "Добавить товар"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProductForm;
