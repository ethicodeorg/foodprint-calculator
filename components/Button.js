import classNames from 'classnames';
import theme from '../styles/theme';

const Button = ({ onClick, disabled, primary, clear, round, small, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={classNames('button', {
      'button-primary': primary,
      'button-clear': clear,
      'button-round': round,
      'button-small': small,
    })}
  >
    {children}

    <style jsx>{`
      .button {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: normal;
        font-family: ${theme.fontFamily.default};
        padding: 10px 20px;
        background-color: ${theme.colors.land};
        opacity: 1;
        transition: opacity 0.2s;
        cursor: pointer;
        border-radius: 4px;
        border: none;
        color: #fff;
        min-width: 180px;
        outline: none;
      }
      .button-clear {
        padding: 10px 0 0;
        background-color: transparent;
        color: ${theme.colors.water};
        font-size: 18px;
        min-width: 100px;
      }
      .button-primary {
        font-size: 24px;
        margin: 0;
        padding: 15px 30px;
        background-color: ${theme.colors.water};
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
