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
        font-size: 20px;
        margin: 0;
        min-width: 130px;
        padding: 10px 20px;
        border: ${clear ? `2px solid ${theme.colors.water}` : 'none'};
        background-color: ${clear ? 'transparent' : theme.colors.water};
        color: #fff;
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
        font-size: inherit;
      }
      .button:hover {
        opacity: 0.7;
      }
      .animate {
        transition: background-color 0.2s;
      }
      .animate:hover {
        opacity: 1;
        background-color: #1b84e0;
      }
      .animate:enabled:after {
        content: '';
        position: absolute;
        top: 0px;
        left: 0px;
        width: 0%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.4);
        -webkit-transition: none;
        -moz-transition: none;
        -ms-transition: none;
        -o-transition: none;
        transition: none;
      }
      .animate:hover:enabled:after {
        width: 100%;
        background-color: rgba(255, 255, 255, 0);
        -webkit-transition: all 0.3s ease-out;
        -moz-transition: all 0.3s ease-out;
        -ms-transition: all 0.3s ease-out;
        -o-transition: all 0.3s ease-out;
        transition: all 0.3s ease-out;
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
          padding: 15px 40px;
        }
      }
    `}</style>
  </button>
);

export default Button;
