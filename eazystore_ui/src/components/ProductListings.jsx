import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { SearchBox } from "./SearchBox";
import DropDown from "./Dropdown";

export default function ProductListings({ products }) {
  const myOptions = ["Popularity", "Price Low to High", "Price High to Low"];

  const [searchText, setSearchText] = useState("");
  const [selectedSort, setSelectedSort] = useState("Popularity");

  const handleSearchChange = (inputSearch) => {
    setSearchText(inputSearch);
  };

  const handleSortChange = (inputSort) => {
    setSelectedSort(inputSort);
  };

  const filteredAndSortedProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      return [];
    }

    // Filter
    let filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase())
    );

    // Sort
    return filteredProducts.slice().sort((a, b) => {
      switch (selectedSort) {
        case "Price Low to High":
          return parseFloat(a.price) - parseFloat(b.price);
        case "Price High to Low":
          return parseFloat(b.price) - parseFloat(a.price);
        case "Popularity":
        default:
          return parseInt(b.popularity) - parseInt(a.popularity);
      }
    });
  }, [products, searchText, selectedSort]);

  return (
    <div className="max-w-[1152px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12">
        <SearchBox
          label={"Search"}
          placeholder={"Enter your sticker..."}
          value={searchText}
          handleSearch={(value) => handleSearchChange(value)}
        />

        <DropDown
          label={"Sort"}
          options={myOptions}
          selectedValue={selectedSort}
          handleSort={(value) => handleSortChange(value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center font-primary font-bold text-lg text-primary dark:text-light">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
