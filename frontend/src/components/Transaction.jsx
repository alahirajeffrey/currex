import PropTypes from "prop-types";

const Transaction = ({ pfiName, from, to, status }) => {
  return (
    <div className="p-4 mb-4 bg-gray-300 rounded-md">
      <h3 className="text-lg font-bold text-black">{pfiName}</h3>
      <p className="text-sm text-black">From: {from}</p>
      <p className="text-sm text-black">To: {to}</p>
      <p className="text-sm text-black">Status: {status}</p>
    </div>
  );
};

Transaction.propTypes = {
  pfiName: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Transaction;
