import classNames from "classnames/bind";
import styles from "./Input.scss";
const cx = classNames.bind(styles);

function Input({ children, unit = false, isResult = false, onChange, value }) {
  const classes = cx("wapper", {
    isResult,
  });
  return (
    <div className={classes}>
      <span className={cx("title")}>{children}</span>
      <input className={cx("input")} value={value} onChange={onChange} />
      <span>{unit}</span>
    </div>
  );
}

export default Input;
