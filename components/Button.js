import classNames from 'classnames';

const Button = ({ onClick, disabled, primary, round, small, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={classNames('button', {
      'button-primary': primary,
      'button-round': round,
      'button-small': small,
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
        margin: 30px 0 20px;
        padding: 15px;
        background-color: #2196f3;
      }
      .button-round {
        width: auto;
        min-width: 63px;
        border-radius: 100%;
      }
      .button-small {
        min-width: auto;
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
