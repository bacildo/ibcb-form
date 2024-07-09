import PropTypes from 'prop-types';
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Button({ title, type, icon, transaction, onClick }) {
  let SelectIconComponent;
  const navigate = useNavigate()

  if (icon === "plus") SelectIconComponent = BiPlusCircle;
  if (icon === "minus") SelectIconComponent = BiMinusCircle;

  return (
    <button
      type={type}
      className="rounded w-full font-bold text-white text-2xl bg-gradient-to-r from-[#00bfff] to-[#00ff14] flex items-center justify-center gap-2"
      onClick={onClick ? onClick : () => transaction && navigate(`/transaction/${transaction}`)}
    >
      {SelectIconComponent && <SelectIconComponent />} {title}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['submit', 'button']).isRequired,
  icon: PropTypes.oneOf(['plus', 'minus']),
  transaction: PropTypes.string,
  onClick: PropTypes.func
};
