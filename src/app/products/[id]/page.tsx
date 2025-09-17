import ProductDetailClient from "./productDetailClient";

async function getProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return <ProductDetailClient product={product} />;
}
