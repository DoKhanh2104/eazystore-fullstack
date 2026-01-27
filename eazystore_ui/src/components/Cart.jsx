import { Link } from "react-router-dom";
import PageTitle from "./PageTitle";
import emptyCartImage from "../assets/util/emptycart.png";
import { useMemo } from "react";
import CartTable from "./CartTable";

import { useSelector } from "react-redux";
import { selectCartItems } from "../store/cart-slice";
import { selectIsAuthenticated, selectUser } from "../store/auth-slice";

const Cart = () => {
  const cart = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const isAddressIncomplete = useMemo(() => {
    if (!isAuthenticated) return false;
    if (!user.address) return true;
    const { street, city, state, postalCode, country } = user.address;
    return !street || !city || !state || !postalCode || !country;
  }, [user]);

  const isCartEmpty = useMemo(() => cart.length === 0, [cart.length]);

  return (
    <div className="min-h-[652px] py-12 bg-normalbg dark:bg-darkbg font-primary">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Your Cart" />
        {isCartEmpty ? (
          <div className="text-center text-gray-600 dark:text-lighter flex flex-col items-center">
            <p className="max-w-[576px] px-2 mx-auto text-base mb-4">
              Oops... Your cart is empty. Continue shopping
            </p>
            <img
              src={emptyCartImage}
              alt="Empty Cart"
              className="max-w-[300px] mx-auto mb-6 dark:bg-light dark:rounded-md"
            />
            <Link
              to={"/home"}
              className="py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition"
            >
              Back to Products
            </Link>
          </div>
        ) : (
          <div>
            {isAddressIncomplete && (
              <p className="text-base text-red-500 mt-2 text-center">
                Please update your address in your profileto proceed checkout
              </p>
            )}
            <CartTable />
            <div className="flex justify-between mt-8 space-x-4">
              {/* Back to product button */}
              <Link
                className="py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-sm font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition"
                to={"/home"}
              >
                Back to Products
              </Link>

              {/* Checkout button */}
              <Link
                to={isAddressIncomplete ? "/#" : "/checkout"}
                className={`py-2 px-4  text-white dark:text-black text-sm font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition ${isAddressIncomplete ? "bg-gray-400 cursor-not-allowed" : "bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter "}`}
                onClick={(e) => {
                  if (isAddressIncomplete) {
                    e.preventDefault();
                  }
                }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
