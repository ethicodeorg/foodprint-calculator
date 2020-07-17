import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { useUser } from '../lib/hooks';
import { clearLocalStorageMeals, getLocalStorageMeals } from '../utils/localStorage';
import { setUserCookie } from '../utils/userCookie';
import Layout from '../components/MyLayout';
import Header from '../components/Header';
import Content from '../components/Content';
import Card from '../components/Card';
import PageTitle from '../components/PageTitle';
import UserForm from '../components/UserForm';

const SignupPage = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [user, { mutate }] = useUser();

  // call whenever user changes (ex. right after signing up successfully)
  useEffect(() => {
    // redirect to user settings if user is authenticated
    if (user) {
      // If there are any meals in local storage, we add them to the database
      const localStorageMeals = getLocalStorageMeals();
      localStorageMeals.forEach((meal) => {
        delete meal._id;
        meal.ownerId = user._id;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      name: e.currentTarget.name.value,
      password: e.currentTarget.password.value,
      retypedPassword: e.currentTarget.retypedPassword.value,
      type: e.currentTarget.type[1].value,
      subscriptionType: 'free',
    };

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 201) {
      const response = await res.json();
      // writing our user object to the state
      mutate({ user: response.user });
      setUserCookie(document, response.user._id);
    } else {
      setErrorMsg(await res.text());
    }
  };

  return (
    <Layout title="Sign up">
      <Header activePage="signup" />
      <Content>
        <PageTitle>Sign up</PageTitle>
        <Card userForm>
          <UserForm onSubmit={handleSubmit} errorMsg={errorMsg} />
        </Card>
      </Content>
    </Layout>
  );
};

export default SignupPage;
