import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { useUser } from '../lib/hooks';
import { setUserCookie } from '../utils/userCookie';
import { userTypes, userTypeMap } from '../utils/constants';
import Layout from '../components/MyLayout';
import Header from '../components/Header';
import Content from '../components/Content';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import UserForm from '../components/UserForm';
import Button from '../components/Button';
import LoadingOnTop from '../components/LoadingOnTop';
import theme from '../styles/theme';

const UserPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [user, { mutate }] = useUser();
  const [tmpUser, setTmpUser] = useState({ _id: user?._id });
  const typeOptions = userTypes.map((type) => {
    return { value: type, label: userTypeMap[type] };
  });

  useEffect(() => {
    // redirect to home if user is logger out
    if (!user) router.replace('/');
  }, [user]);

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    // set the user state to null
    mutate();
    setUserCookie(document);
  };

  const saveUser = async () => {
    if (
      tmpUser.name ||
      tmpUser.type ||
      tmpUser.homepage ||
      tmpUser.password ||
      tmpUser.retypedPassword
    ) {
      setIsLoading(true);
      setErrorMsg('');
      setSuccessMsg('');

      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tmpUser),
      });

      if (res.status === 201) {
        const response = await res.json();
        // writing our user object to the state
        mutate({ user: response.user });
        setSuccessMsg('Successfully saved!');
      } else {
        setErrorMsg(await res.text());
      }

      setIsLoading(false);
    }
  };

  return (
    <Layout title="Settings">
      <Header activePage="user" />
      <Content>
        <PageTitle>Settings</PageTitle>
        <Card>
          <div className="input-container">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name, e.g. brand name, company name, cook name, etc."
              value={tmpUser.name || user?.name || ''}
              onChange={(e) =>
                setTmpUser({
                  ...tmpUser,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="input-container">
            <label htmlFor="homepage">Homepage:</label>
            <input
              id="homepage"
              name="homepage"
              type="text"
              placeholder="Your homepage"
              value={tmpUser.homepage || user?.homepage || ''}
              onChange={(e) =>
                setTmpUser({
                  ...tmpUser,
                  homepage: e.target.value,
                })
              }
            />
          </div>
          <div className="type-container">
            <label>Type:</label>
            <div className="select-container">
              <Select
                value={
                  typeOptions.find((t) => t.value === tmpUser.type) ||
                  typeOptions.find((t) => t.value === user?.type) ||
                  typeOptions[5]
                }
                placeholder="User type"
                onChange={(val) =>
                  setTmpUser({
                    ...tmpUser,
                    type: val.value,
                  })
                }
                options={typeOptions}
                instanceId="user-type"
              />
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="password">Change password:</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="New password"
              value={tmpUser.password || ''}
              onChange={(e) =>
                setTmpUser({
                  ...tmpUser,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="input-container">
            <label htmlFor="confirm-password">Retype password:</label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="Confirm new password"
              value={tmpUser.retypedPassword || ''}
              onChange={(e) =>
                setTmpUser({
                  ...tmpUser,
                  retypedPassword: e.target.value,
                })
              }
            />
          </div>
          {errorMsg && (
            <div className="icon-container">
              <span className="error-icon">
                <FaTimes />
              </span>
              <span className="error-msg">{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="icon-container">
              <span className="check-icon">
                <FaCheck />
              </span>
              <span className="success-msg">{successMsg}</span>
            </div>
          )}
          <div className="buttons-container">
            <Button remove onClick={handleLogout}>
              Log Out
            </Button>
            <Button onClick={saveUser}>Save Changes</Button>
          </div>
          {isLoading && <LoadingOnTop blockUI />}
        </Card>
      </Content>

      <style jsx>{`
        input {
          display: block;
          width: 100%;
          padding: 7px 10px;
          border: 1px solid ${theme.colors.border};
          border-radius: 4px;
          font-family: ${theme.fontFamily.default};
          font-size: 16px;
        }
        .buttons-container {
          display: flex;
          justify-content: space-between;
        }
        .input-container,
        .type-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .select-container {
          width: 100%;
        }
        .loading-container {
          position: fixed;
          display: flex;
          justify-content: center;
          margin-top: 100px;
          left: calc(50% - 50px);
          z-index: 3;
        }
        label {
          min-width: 100%;
          margin-bottom: 5px;
          font-size: 12px;
        }
        .icon-container {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-bottom: 20px;
        }
        .error-icon {
          height: 22px;
          padding-right: 5px;
          color: red;
          font-size: 22px;
        }
        .error-msg {
          color: red;
        }
        .check-icon {
          height: 22px;
          padding-right: 5px;
          color: green;
          font-size: 22px;
        }
        .success-msg {
          color: green;
        }

        @media only screen and (min-width: ${theme.sizes.mobile}) {
          label {
            min-width: 180px;
            margin-bottom: 0;
            font-size: 16px;
          }
          input {
            width: 430px;
          }
          .input-container,
          .type-container {
            flex-wrap: nowrap;
          }
          .select-container {
            width: 452px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default UserPage;
