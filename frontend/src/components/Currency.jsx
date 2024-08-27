import PropTypes from "prop-types";

const Currency = ({ currencyCode, amount }) => {
  return (
    <li className="p-2 mb-2 bg-gray-300 rounded-md">
      <div className="grid grid-cols-2">
        <div className="col-span-1 flex justify-center items-center">
          <div className="text-sm font-medium text-black">{currencyCode}</div>
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <div className="text-sm text-black">{amount}</div>
        </div>
      </div>
    </li>
  );
};

Currency.propTypes = {
  amount: PropTypes.string.isRequired,
  currencyCode: PropTypes.number.isRequired,
};

export default Currency;
