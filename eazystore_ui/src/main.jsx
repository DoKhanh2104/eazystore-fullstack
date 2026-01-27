import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import About from "./components/About";
import Cart from "./components/Cart";
import Contact, { contactAction, contactLoader } from "./components/Contact";
import Login, { loginAction } from "./components/Login";
import Home, { productsLoader } from "./components/Home";
import ProductDetail from "./components/ProductDetail";

import CheckoutForm from "./components/CheckoutForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile, { profileAction, profileLoader } from "./components/Profile";
import Orders, { ordersLoader } from "./components/Orders";
import AdminOrders, { adminOrdersLoader } from "./components/admin/AdminOrders";
import Messages, { messagesLoader } from "./components/admin/Messages";
import Register, { registerAction } from "./components/Register";
import { Toaster } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from "./components/OrderSuccess";
import { Provider } from "react-redux";
import store from "./store/store";

const stripePrimse = loadStripe(
  "pk_test_51SrZQRGsvnUtzMHm1FhLTOrqGqlSEhDsvqHEjbyqkZH77wpIZSOSsCsZFo9BpxYTeDcZuspi0g9k9KKPIFxOGCSO00xYesAqX1",
);
const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    {/* PUBLIC ROUTE */}
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route
      path="/contact"
      element={<Contact />}
      action={contactAction}
      loader={contactLoader}
    />
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/register" element={<Register />} action={registerAction} />
    <Route path="/product/:productId" element={<ProductDetail />} />

    {/* PRIVATE ROUTE */}
    <Route element={<ProtectedRoute />}>
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route
        path="/profile"
        element={<Profile />}
        loader={profileLoader}
        action={profileAction}
        shouldRevalidate={({ actionResult }) => {
          return !actionResult?.success;
        }}
      />
      <Route path="/orders" element={<Orders />} loader={ordersLoader} />
      <Route
        path="/admin/orders"
        element={<AdminOrders />}
        loader={adminOrdersLoader}
      />
      <Route
        path="/admin/messages"
        element={<Messages />}
        loader={messagesLoader}
      />
    </Route>
  </Route>,
);

const appRouter = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePrimse}>
      {/* <AuthProvider> */}
      <Provider store={store}>
        <RouterProvider router={appRouter} />
      </Provider>
      {/* </AuthProvider> */}
      <Toaster position="bottom-right" richColors />
    </Elements>
  </StrictMode>,
);
