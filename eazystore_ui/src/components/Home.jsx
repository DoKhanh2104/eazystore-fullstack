import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";
import apiClient from "../api/apiClient";
import { Link, useLoaderData } from "react-router-dom";

export default function Home() {
  const pageData = useLoaderData();
  const products = pageData.content || [];

  const currentPage = pageData.number;
  const totalPages = pageData.totalPages;

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="max-w-[1152px] mx-auto px-6 py-8">
      <PageHeading title="Explore Eazy Stickers!">
        Add a touch of creativity to your space with our wide range of fun and
        unique stickers. Perfect for any occasion!
      </PageHeading>
      <ProductListings products={products} />

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8 flex-wrap">
        <Link
          to={`?page=${currentPage - 1}`}
          className={`px-4 py-2 rounded transition-colors font-semibold ${
            currentPage === 0
              ? "pointer-events-none opacity-50 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
              : "bg-primary dark:bg-light text-white dark:text-black hover:bg-dark dark:hover:bg-lighter"
          }`}
        >
          Previous
        </Link>

        {renderPageNumbers().map((pageIndex) => (
          <Link
            key={pageIndex}
            to={`?page=${pageIndex}`}
            className={`px-3 py-2 rounded transition-colors font-semibold ${
              currentPage === pageIndex
                ? "bg-primary dark:bg-light text-white dark:text-black"
                : "bg-normalbg dark:bg-darkbg text-primary dark:text-light border border-primary dark:border-light hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {pageIndex + 1}
          </Link>
        ))}

        <Link
          to={`?page=${currentPage + 1}`}
          className={`px-4 py-2 rounded transition-colors font-semibold ${
            currentPage + 1 >= totalPages
              ? "pointer-events-none opacity-50 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
              : "bg-primary dark:bg-light text-white dark:text-black hover:bg-dark dark:hover:bg-lighter"
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}

export async function productsLoader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 0;
  const size = 6;

  try {
    const response = await apiClient.get(`/products?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch products. Please try again",
      { status: error.status || 500 },
    );
  }
}
