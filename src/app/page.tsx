import { ProductType } from "@/types/ProductType"

async function getProducts() {
  const url = "https://fakestoreapi.com/products"
  try {
    const res = await fetch(url)
    return res.json()
  } catch (error) {}
}

export default async function Home() {
  const products = await getProducts()
  console.log(products)
  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        {products.map((product: ProductType) => (
          <div key={product.id}>{product.title}</div>
        ))}
      </div>
    </div>
  )
}
