import Link from 'next/link';
import theme from '../styles/theme';
import Button from './Button';

const UserForm = ({ onSubmit, errorMsg, isLogin }) => (
  <form className="user-form" onSubmit={onSubmit}>
    {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
    {!isLogin && (
      <label htmlFor="name">
        <input id="name" name="name" type="text" placeholder="Your name" />
      </label>
    )}
    <label htmlFor="email">
      <input id="email" type="email" name="email" placeholder="Email address" />
    </label>
    <label htmlFor="password">
      <input
        id="password"
        type="password"
        name="password"
        placeholder={isLogin ? 'Password' : 'Create a password'}
      />
    </label>
    <Button type="submit">{isLogin ? 'Log in' : 'Sign up'}</Button>
    {isLogin && (
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
        margin-bottom: 30px;
        padding: 7px 10px;
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
        font-family: ${theme.fontFamily.default};
        font-size: 16px;
      }
    `}</style>
  </form>
);

export default UserForm;
