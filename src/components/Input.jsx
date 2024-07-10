import PropTypes from "prop-types";

export default function Input({ type, placeholder, register, name }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="rounded w-fit p-2 font-bold text-black
       text-2xl bg-white flex items-center justify-center gap-2"
      {...register(name)}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
