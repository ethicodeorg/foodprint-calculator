import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../lib/hooks';
import Layout from '../components/MyLayout';
import LoadingOnTop from '../components/LoadingOnTop';
import theme from '../styles/theme';

const VerifyEmail = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [sent, setSent] = useState(false);
  const [user, { mutate }] = useUser();

  const verify = async () => {
    const res = await fetch('/api/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: user?._id,
        verify: true,
      }),
    });

    if (res.status === 201) {
      const response = await res.json();

      // writing our user object to the state
      mutate({ user: response.user });

      // Send welcome email
      fetch('api/send-welcome-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: user.name, email: user.email }),
      });
    } else {
      setErrorMsg(await res.text());
    }
  };

  useEffect(() => {
    if (user) {
      // redirect to email-verified when verified
      if (user.verifiedAt) {
        router.replace('/email-verified');
      }

      if (!sent) {
        setSent(true);
        verify();
      }
    }
  }, [user]);

  return (
    <Layout title="Verify Email">
      <div className="verify-email">
        {errorMsg ? (
          <div className="icon-container">
            <span className="error-icon">
              <FaTimes />
            </span>
            <span className="error-msg">{errorMsg}</span>
          </div>
        ) : (
          <div className="verifying">
            <LoadingOnTop />
            <div className="verify-email-text">Please wait while we verify your email</div>
          </div>
        )}
      </div>

      <style jsx>{`
        .verify-email {
          height: 100vh;
          padding: 150px 20px;
          text-align: center;
        }
        .verify-email-text {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          color: ${theme.colors.white};
        }
      `}</style>
    </Layout>
  );
};

export default VerifyEmail;