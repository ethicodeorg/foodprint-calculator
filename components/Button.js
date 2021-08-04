import classNames from 'classnames';
import theme from '../styles/theme';

const Button = ({
  type,
  onClick,
  disabled,
  primary,
  clear,
  round,
  small,
  remove,
  title,
  children,
  animate,
  noPad,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={classNames('button', {
      'button-primary': primary,
      'button-clear': clear,
      'button-remove': remove,
      'button-round': round,
      'button-small': small,
      animate: animate,
    })}
  >
    {children}

    <style jsx>{`
      .button {
        position: relative;
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
        padding: 0;
        background-color: transparent;
        color: ${title ? '#222' : theme.colors.water};
        font-size: 16px;
      }
      .button-primary {
        flex-wrap: wrap;
        font-size: 22px;
        margin: 0;
        min-width: 130px;
        padding: ${noPad ? '0' : '10px 20px'};
        border: ${clear ? `2px solid ${theme.colors.water}` : 'none'};
        background-color: ${clear ? 'transparent' : theme.colors.water};
        color: #fff;
      }
      .button-remove {
        background-color: ${theme.colors.eutro};
      }
      .button-round {
        width: 66px;
        min-width: 66px;
        border-radius: 100%;
      }
      .button-small {
        font-size: 16px;
      }
      .button:hover {
        opacity: 0.7;
      }
      .animate {
        overflow: hidden;
        position: relative;
        padding: 0;
        transition: background-color 0.2s;
      }
      .animate:enabled:hover {
        opacity: 1;
        background-color: #1b84e0;
      }
      .animate:enabled:after {
        background: #fff;
        content: '';
        height: 162px;
        left: -75px;
        opacity: 0.2;
        position: absolute;
        top: -50px;
        transform: rotate(35deg);
        transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
        width: 50px;
      }
      .animate:enabled:hover:after {
        left: 120%;
        transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
      }
      .button:disabled {
        opacity: 0.7;
        cursor: default;
      }

      @media only screen and (min-width: ${theme.sizes.mobile}) {
        .button-clear {
          font-size: ${primary ? '24px' : '16px'};
        }
        .button-small {
          font-size: inherit;
        }
        .button-primary {
          font-size: 24px;
          min-width: 180px;
          padding: ${noPad ? '0' : '15px 40px'};
          box-shadow: 2px 2px 7px 1px rgba(0, 0, 0, 0.25);
        }
        .button-round {
          min-width: 66px;
        }
      }
    `}</style>
  </button>
);

export default Button;
