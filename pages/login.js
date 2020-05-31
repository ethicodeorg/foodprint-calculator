import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { useUser } from '../lib/hooks';
import { setUserCookie } from '../utils/userCookie';
import { clearLocalStorageMeals, getLocalStorageMeals } from '../utils/localStorage';
import Layout from '../components/MyLayout';
import Header from '../components/Header';
import Content from '../components/Content';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import UserForm from '../components/UserForm';

const LoginPage = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [user, { mutate }] = useUser();

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) {
      // If there are any meals in local storage, we add them to the database
      const localStorageMeals = getLocalStorageMeals();
      localStorageMeals.forEach((meal) => {
        delete meal._id;
        meal.owner = {
          id: user._id,
          name: user.name,
        };

        fetch('api/meals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ meal }),
        });
      });

      clearLocalStorageMeals();

      router.replace('/mymeals');
    }
  }, [user]);

  async function onSubmit(e) {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const response = await res.json();
      mutate({ user: response.user });
      setUserCookie(document, response.user._id);
    } else {
      setErrorMsg('Incorrect username or password. Try again!');
    }
  }

  return (
    <Layout title="Log in">
      <Header activePage="login" />
      <Content>
        <PageTitle>Log in</PageTitle>
        <Card userForm>
          <UserForm onSubmit={onSubmit} errorMsg={errorMsg} isLogin />
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;
