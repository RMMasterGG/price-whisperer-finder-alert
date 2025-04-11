
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  url: string;
  marketplace: string;
}

interface ProductListProps {
  products: Product[];
  onDeleteProduct: (id: string) => void;
}

const ProductList = ({ products, onDeleteProduct }: ProductListProps) => {
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Sort products by marketplace
    const sorted = [...products].sort((a, b) => 
      a.marketplace.localeCompare(b.marketplace)
    );
    setSortedProducts(sorted);
  }, [products]);
  
  const handleDeleteProduct = (id: string) => {
    onDeleteProduct(id);
    toast({
      title: "Товар удален",
      description: "Товар был удален из отслеживания",
    });
  };

  if (sortedProducts.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <h3 className="font-medium text-lg mb-2">Нет отслеживаемых товаров</h3>
        <p className="text-muted-foreground">
          Добавьте товары для отслеживания, вставив ссылки на них выше
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={handleDeleteProduct}
        />
      ))}
    </div>
  );
};

export default ProductList;
