import React, { useState, useEffect } from 'react';
import Head from 'next/head';
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

const UserPage = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [user, { mutate }] = useUser();
  const [tmpUser, setTmpUser] = useState(user || {});
  const visibilityOptions = [
    { value: 'private', label: 'Private' },
    { value: 'public', label: 'Public' },
  ];
  const typeOptions = [
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'cafeteria', label: 'Cafeteria' },
    { value: 'readyMealSupplier', label: 'Ready meal supplier' },
    { value: 'foodBlogger', label: 'Recipe publisher' },
    { value: 'homeCook', label: 'Home cook' },
    { value: 'other', label: 'Other' },
  ];

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
  };

  return (
    <Layout>
      <Head>
        <title>User Settings</title>
      </Head>
      <Header activePage="user" />
      <Content>
        <PageTitle>User Settings</PageTitle>
        <Card>
          <div className="input-container">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name, e.g. brand name, company name, cook name, etc."
              value={tmpUser.name}
              onChange={(e) =>
                setTmpUser({
                  ...tmpUser,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="visibility-container">
            <label>Visibility:</label>
            <div className="select-container">
              <Select
                value={visibilityOptions.find((opt) => opt.value === tmpUser.visibility)}
                placeholder="User visibility"
                onChange={(val) =>
                  setTmpUser({
                    ...tmpUser,
                    visibility: val.value,
                  })
                }
                options={visibilityOptions}
              />
            </div>
          </div>

          <div className="type-container">
            <label>Type:</label>
            <div className="select-container">
              <Select
                value={typeOptions.find((t) => t.value === tmpUser.type)}
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
        .type-container,
        .visibility-container {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        .select-container {
          width: calc(100% - 100px);
        }
        label {
          min-width: 100px;
        }
      `}</style>
    </Layout>
  );
};

export default UserPage;
