import Link from 'next/link';
import Select from 'react-select';
import { userTypes, userTypeMap } from '../utils/constants';
import theme from '../styles/theme';
import Button from './Button';

const UserForm = ({
  onSubmit,
  errorMsg,
  showName,
  showType,
  showPassword,
  showRetypedPassword,
  showForgotPassword,
  buttonText,
  passwordPlaceholder,
}) => {
  const typeOptions = userTypes.map((type) => {
    return { value: type, label: userTypeMap[type] };
  });

  return (
    <form className="user-form" onSubmit={onSubmit}>
      {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
      <label htmlFor="email">
        <input id="email" type="email" name="email" placeholder="Email address" />
      </label>
      {showName && (
        <label htmlFor="name">
          <input id="name" name="name" type="text" placeholder="Name" />
        </label>
      )}
      {showType && (
        <label htmlFor="type">
          <Select
            inputId="type"
            name="type"
            placeholder="Type"
            options={typeOptions}
            instanceId="user-type"
          />
        </label>
      )}
      {showPassword && (
        <label htmlFor="password">
          <input id="password" type="password" name="password" placeholder={passwordPlaceholder} />
        </label>
      )}
      {showRetypedPassword && (
        <label htmlFor="retypedPassword">
          <input
            id="retypedPassword"
            type="password"
            name="retypedPassword"
            placeholder="Retype password"
          />
        </label>
      )}
      <Button type="submit">{buttonText}</Button>
      {showForgotPassword && (
        <Link href="/forgot-password">
          <a className="forgot-password">Forgot password</a>
        </Link>
      )}

      <style jsx>{`
        .user-form {
          display: flex;
          flex-direction: column;
          margin: 10px 0;
        }
        .forgot-password {
          margin-top: 10px;
          color: ${theme.colors.water};
          text-decoration: none;
          font-size: 16px;
          text-align: center;
        }
        input {
          display: block;
          width: calc(100% - 23px);
          padding: 7px 10px;
          border: 1px solid ${theme.colors.border};
          border-radius: 4px;
          font-family: ${theme.fontFamily.default};
          font-size: 16px;
        }
        label {
          margin-bottom: 30px;
        }
      `}</style>
    </form>
  );
};

export default UserForm;
