import ProductCard from "../../components/ProductCard";
import type { Product } from "../../context/cartContext";

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products");
  return res.json();
}

export default async function ProductsPage() {
  const { products } = await getProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

