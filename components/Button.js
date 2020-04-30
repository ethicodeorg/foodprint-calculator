import classNames from 'classnames';

const Button = ({ onClick, disabled, primary, round, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={classNames('button', {
      'button-primary': primary,
      'button-round': round,
    })}
  >
    {children}

    <style jsx>{`
      .button {
        font-size: 16px;
        font-weight: normal;
        font-family: Avenir;
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
        font-size: 24px;
        width: 280px;
        margin-top: 30px;
        margin-right: 0;
        padding: 15px;
        background-color: #2196f3;
      }
      .button-round {
        width: auto;
        min-width: 63px;
        border-radius: 100%;
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
