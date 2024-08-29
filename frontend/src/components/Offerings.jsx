import PropTypes from "prop-types";

const Offering = ({ pfiName, description, rate }) => {
  return (
    <div className="p-4 mb-4 bg-gray-300 rounded-md">
      <h3 className="text-lg font-bold text-black">{pfiName}</h3>
      <p className="text-sm text-black">Description: {description}</p>
      <p className="text-sm text-black">Rate: {rate}</p>
    </div>
  );
};

Offering.propTypes = {
  pfiName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rate: PropTypes.string.isRequired,
};

export default Offering;
