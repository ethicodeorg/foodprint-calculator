import classNames from 'classnames';

const Button = ({ onClick, disabled, primary, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={classNames('button', {
      'button-primary': primary,
    })}
  >
    {children}

    <style jsx>{`
      .button {
        font-size: 16px;
        font-weight: bold;
        margin-right: 20px;
        padding: 10px 20px;
        background-color: #4caf50;
        opacity: 1;
        transition: opacity 0.2s;
        cursor: pointer;
        border-radius: 4px;
        border: none;
        color: #fff;
        min-width: 180px;
      }
      .button-primary {
        font-size: 20px;
        width: 220px;
        margin-top: 30px;
        margin-right: 0;
        padding: 15px;
        background-color: #2196f3;
      }
      .button:hover {
        opacity: 0.7;
      }
      .button:disabled {
        opacity: 0.7;
        cursor: default;
      }
    `}</style>
  </button>
);

export default Button;
