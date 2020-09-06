import React, { useState, useEffect } from 'react';
import { withTranslation } from '../i18n';
import Layout from '../components/MyLayout';
import Header from '../components/Header';
import Content from '../components/Content';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import UserForm from '../components/UserForm';

const ForgotPassword = ({ t }) => {
  const [errorMsg, setErrorMsg] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <Layout title={t('forgot_password')} t={t}>
      <Header />
      <Content>
        <PageTitle>{t('forgot_password')}</PageTitle>
        <Card userForm>
          <UserForm
            onSubmit={onSubmit}
            errorMsg={errorMsg}
            buttonText={t('reset_password')}
            t={t}
          />
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

export default withTranslation('common')(ForgotPassword);
