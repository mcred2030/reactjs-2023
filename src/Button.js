import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({txt, onClick}) {
    return (
        <button 
            onClick={onClick}
            className={styles.btn}
        >
        {txt}
        </button>
    );
  };

Button.propTypes = {
    txt: PropTypes.string.isRequired,
    onClick: PropTypes.func,

};
  
  export default Button;