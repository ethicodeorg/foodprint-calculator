import classNames from 'classnames';
import theme from '../styles/theme';

const Button = ({ onClick, disabled, primary, clear, round, small, remove, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={classNames('button', {
      'button-primary': primary,
      'button-clear': clear,
      'button-remove': remove,
      'button-round': round,
      'button-small': small,
    })}
  >
    {children}

    <style jsx>{`
      .button {
        display: flex;
        align-items: center;
        justify-content: center;
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
        outline: none;
      }
      .button-clear {
        padding: 10px 0 0;
        background-color: transparent;
        color: ${primary ? '#fff' : theme.colors.water};
        font-size: 16px;
      }
      .button-primary {
        font-size: 20px;
        margin: 0;
        min-width: 130px;
        padding: 10px 20px;
        border: ${clear ? `2px solid ${theme.colors.water}` : 'none'};
        background-color: ${clear ? 'transparent' : theme.colors.water};
      }
      .button-remove {
        background-color: ${theme.colors.eutro};
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

      @media only screen and (min-width: ${theme.sizes.mobile}) {
        .button-clear {
          font-size: ${primary ? '24px' : '16px'};
        }
        .button-primary {
          font-size: 24px;
          min-width: 180px;
          padding: 15px 40px;
        }
      }
    `}</style>
  </button>
);

export default Button;
