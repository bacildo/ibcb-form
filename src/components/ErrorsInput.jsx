import PropTypes from 'prop-types';

export default function ErrorsInput({ message }) {
  return (
    <span className="bg-red-100 text-red-900 rounded p-2 text-sm w-full">
      {message}
    </span>
  );
}

ErrorsInput.propTypes = {
  message: PropTypes.string.isRequired,
};