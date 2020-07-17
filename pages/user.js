import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { useUser } from '../lib/hooks';
import Layout from '../components/MyLayout';
import Header from '../components/Header';
import Content from '../components/Content';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import UserForm from '../components/UserForm';
import Button from '../components/Button';
import theme from '../styles/theme';
import { setUserCookie } from '../utils/userCookie';
import { userTypes, userTypeMap } from '../utils/constants';
import Loading from '../components/Loading';

const UserPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
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

      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tmpUser),
      });

      if (res.status === 201) {
        const response = await res.json();
        // writing our user object to the state
        mutate({ user: response.user });

        router.replace('/mymeals');
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
        {isLoading && (
          <div className="loading-container">
            <Loading />
          </div>
        )}
        <Card>
          {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
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
            <label htmlFor="confirm-password">Retype new password:</label>
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
          <div className="buttons-container">
            <Button remove onClick={handleLogout}>
              Log Out
            </Button>
            <Button onClick={saveUser}>Save Changes</Button>
          </div>
        </Card>
      </Content>

      <style jsx>{`
        input {
          display: block;
          width: 300px;
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
          align-items: center;
          margin-bottom: 20px;
        }
        .select-container {
          width: 322px;
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
          min-width: 200px;
        }
      `}</style>
    </Layout>
  );
};

export default UserPage;
