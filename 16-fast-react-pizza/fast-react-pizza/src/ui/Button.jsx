import { Link } from "react-router-dom";

function Button({children, to, disabled, type, onClick}) {
  const baseStyle = "bg-yellow-400 uppercase font-semibold text-stone-800 inline-block rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed text-sm";
  const styles = {
    primary:  baseStyle + " px-4 py-3 md:px-6 md:py-4",
    small:  baseStyle + " px-4 py-2 sm:px-5 sm:py-2.5 text-xs",
    round: baseStyle + " px-5 py-1 md:px-3.5 md:py-2 text-sm",
    secondary: "uppercase font-semibold text-stone-800 inline-block rounded-full border-2 border-stone-300 hover:bg-stone-200 hover:text-stone-800 transition-colors duration-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5 text-sm",
  }
  if(to) {
    return <Link to={to} className={styles[type]}>{children}</Link>;
  }

  if(onClick) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={styles[type]}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      disabled={disabled}
      className={styles[type]}
    >
      {children}
    </button>
  );
}

export default Button;