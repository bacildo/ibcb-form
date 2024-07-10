import PropTypes from "prop-types";

export default function Button({ title, type, onClick }) {
  let SelectIconComponent;

  return (
    <button
      type={type}
      className="rounded w-fit p-2 font-bold text-black text-2xl bg-white flex items-center justify-center gap-2"
      onClick={onClick}
    >
      {SelectIconComponent && <SelectIconComponent />} {title}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["submit", "button"]).isRequired,
  onClick: PropTypes.func,
};
