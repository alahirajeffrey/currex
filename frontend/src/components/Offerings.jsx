import PropTypes from "prop-types";
import allowedPfis from "../../../allowedPfis.json";

const Offering = ({ pfiDid, description, rate }) => {
  const pfiData = allowedPfis.find((pfi) => pfi.did == pfiDid);
  return (
    <div className="p-4 mb-4 bg-gray-300 rounded-md">
      <h3 className="text-lg font-bold text-black">{pfiData.name}</h3>
      <p className="text-sm text-black">Description: {description}</p>
      <p className="text-sm text-black">Rate: {rate}</p>
    </div>
  );
};

Offering.propTypes = {
  pfiDid: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rate: PropTypes.string.isRequired,
};

export default Offering;
