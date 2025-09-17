import Carousel from "@/components/Carousel";
import ProductCard from "@/components/ProductCard";

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=12");
  return res.json();
}

export default async function Home() {
  const data = await getProducts();

  return (
    <div>
      <Carousel />
      <h2 className="text-2xl font-bold mt-6 mb-4">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
