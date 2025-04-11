
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/layout/AppHeader";
import ProductForm from "@/components/products/ProductForm";
import ProductList from "@/components/products/ProductList";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  url: string;
  marketplace: string;
}

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  // If not authenticated, redirect to auth page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  const addProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const deleteProduct = (id: string) => {
    setProducts((prevProducts) => 
      prevProducts.filter((product) => product.id !== id)
    );
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Отслеживание цен</CardTitle>
                <CardDescription>
                  Добавляйте товары и отслеживайте изменение их цен
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductForm onProductAdded={addProduct} />
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Статистика</CardTitle>
                <CardDescription>Обзор ваших отслеживаемых товаров</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {products.length}
                    </div>
                    <div className="text-sm text-blue-800">Товаров</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-600">2</div>
                    <div className="text-sm text-green-800">Уведомления</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-purple-600">3</div>
                    <div className="text-sm text-purple-800">Маркетплейса</div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-amber-600">15%</div>
                    <div className="text-sm text-amber-800">Макс. скидка</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Отслеживаемые товары</h2>
          <ProductList products={products} onDeleteProduct={deleteProduct} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
