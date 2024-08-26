import PropTypes from "prop-types";

const Button = ({ title, onPressed }) => {
  return (
    <button
      onClick={onPressed}
      className="px-4 py-2 bg-gray-700 text-black rounded hover:bg-gray-600"
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPressed: PropTypes.func.isRequired,
};

export default Button;
