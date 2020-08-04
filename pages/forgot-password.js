import React, { useState, useEffect } from 'react';
import Layout from '../components/MyLayout';
import Header from '../components/Header';
import Content from '../components/Content';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import UserForm from '../components/UserForm';

const ForgotPassword = () => {
  const [errorMsg, setErrorMsg] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <Layout title="Forgot password">
      <Header />
      <Content>
        <PageTitle>Forgot password</PageTitle>
        <Card userForm>
          <UserForm onSubmit={onSubmit} errorMsg={errorMsg} buttonText="Reset password" />
        </Card>
      </Content>

      <style jsx>{`
        .reset-password-text {
          margin-bottom: 20px;
        }
      `}</style>
    </Layout>
  );
};

export default ForgotPassword;
