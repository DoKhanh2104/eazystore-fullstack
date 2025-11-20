/* eslint-disable react/prop-types */
export default function Price({ currency, price }) {
  return (
    <>
      {currency}
      <span>{price}</span>
    </>
  );
}
