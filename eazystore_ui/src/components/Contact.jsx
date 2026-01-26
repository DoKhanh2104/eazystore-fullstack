import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import PageTitle from "./PageTitle";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import apiClient from "../api/apiClient";

const Contact = () => {
  const contactInfo = useLoaderData();
  const actionData = useActionData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      toast.success("Your message has been submitted successfully!");
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userConfirmed = window.confirm("Are you sure you confirm the form");

    if (userConfirmed) {
      const formData = new FormData(formRef.current);
      submit(formData, { method: "post" });
    } else {
      toast.info("Form submission cancelled.");
    }
  };

  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";

  return (
    <div className="max-w-[1152px] min-h-[652px] mx-auto px-6 py-8 font-primary bg-normalbg dark:bg-darkbg">
      {/* Page Title */}
      <PageTitle title={"Contact Us"} />

      {/* Contact Info */}
      <p className="max-w-[768px] mx-auto mt-8 text-gray-600 dark:text-lighter text-center mb-8">
        We had love to hear from you! If you have any questions, feedback, or
        suggestions, please do not hesitate to reach out.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[952px] mx-auto mt-8">
        {/* Contact Detail */}
        <div className="text-primary dark:text-light  p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Info</h2>
          {contactInfo && (
            <>
              <p className="mb-4">
                <strong>Phone:</strong> {contactInfo.phone}
              </p>
              <p className="mb-4">
                <strong>Email:</strong> {contactInfo.email}
              </p>
              <p className="mb-4">
                <strong>Address:</strong> {contactInfo.address}
              </p>
            </>
          )}
        </div>

        {/* Contact form */}
        <Form
          method="POST"
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-[768px] mx-auto space-y-6"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className={labelStyle}>
              Name
            </label>
            <input
              className={textFieldStyle}
              id="name"
              name="name"
              required
              minLength={5}
              placeholder="Your Name"
              maxLength={32}
              type="text"
            />
            {actionData?.errors?.name && (
              <p className="text-red-500 mt-1 text-sm">
                {actionData.errors.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className={labelStyle}>
                Email
              </label>
              <input
                className={textFieldStyle}
                id="email"
                name="email"
                required
                placeholder="Your Email"
                type="email"
              />
              {actionData?.errors?.email && (
                <p className="text-red-500 mt-1 text-sm">
                  {actionData.errors.email}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label htmlFor="mobileNumber" className={labelStyle}>
                Mobile Number
              </label>
              <input
                className={textFieldStyle}
                id="mobileNumber"
                name="mobileNumber"
                required
                placeholder="Your Number"
                pattern="^\d{10}$"
                title="Mobile number must be exactly 10 digits"
                type="tel"
              />
              {actionData?.errors?.mobileNumber && (
                <p className="text-red-500 mt-1 text-sm">
                  {actionData.errors.mobileNumber}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={labelStyle}>
              Message
            </label>
            <textarea
              className={textFieldStyle}
              id="message"
              name="message"
              required
              minLength={5}
              rows={4}
              placeholder="Your Message"
              maxLength={100}
            />
            {actionData?.errors?.message && (
              <p className="text-red-500 mt-1 text-sm">
                {actionData.errors.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className="flex justify-center items-center mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter hover:cursor-pointer"
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Contact;

export async function contactAction({ request }) {
  const data = await request.formData();
  const contactData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    message: data.get("message"),
  };

  try {
    await apiClient.post("/contacts", contactData);
    return { success: true };
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to submit contact. Please try again",
      { status: error.status || 500 },
    );
  }
}

export async function contactLoader() {
  try {
    const res = await apiClient.get("/contacts");
    return res.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch contact detail. Please try again!",
      { status: error.status || 500 },
    );
  }
}
