import { Link } from "react-router-dom";
import Price from "./Price";
import { useCart } from "@/store/cart-context";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="w-80 rounded-md mx-auto border border-gray-300 dark:border-gray-600 shadow-md overflow-hidden flex flex-col bg-white dark:bg-gray-800 hover:border-primary dark:border-light transition">
      <Link
        to={`/product/${product.productId}`}
        state={{ product }}
        className="relative w-full h-72 border-b border-gray-300 dark:border-gray-600"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </Link>
      <div className="relative h-48 p-4 flex flex-col font-primary">
        <h2 className="text-xl font-semibold text-primary dark:text-light mb-2">
          {product.name}
        </h2>
        <p className="text-base text-gray-600 dark:text-lighter mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="bg-lighter dark:bg-light text-primary font-medium text-sm py-2 px-4 rounded-tl-md">
            <Price currency="$" price={product.price} />
          </div>
          <button
            onClick={() => addToCart(product, 1)}
            className="bg-primary text-white dark:bg-light dark:text-primary text-sm py-2 px-4 rounded-br-md hover:cursor-pointer"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
