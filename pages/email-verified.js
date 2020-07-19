import Link from 'next/link';
import Layout from '../components/MyLayout';
import Header from '../components/Header';
import Button from '../components/Button';
import theme from '../styles/theme';
import { FaAt, FaCalculator, FaCheckCircle } from 'react-icons/fa';

const EmailVerified = () => {
  return (
    <Layout title="Email verified">
      <Header activePage="email-verified" />
      <div className="email-verified">
        <div className="icons">
          <span className="email-icon">
            <FaAt />
          </span>
          <span className="check-icon">
            <FaCheckCircle />
          </span>
        </div>
        <div className="email-verified-text">Congratulations, your email has been verified!</div>
        <div className="button-container">
          <Button primary animate>
            <Link href="newmeal">
              <a className="lets-calculate">
                Let's Calculate
                <span className="calculator-container">
                  <FaCalculator />
                </span>
              </a>
            </Link>
          </Button>
        </div>
      </div>

      <style jsx>{`
        .email-verified {
          height: 100vh;
          padding: 150px 20px;
          text-align: center;
        }
        .email-verified-text {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          color: ${theme.colors.white};
        }
        .icons {
          padding-top: 50px;
        }
        .email-icon,
        .check-icon {
          margin: 0 20px;
          color: #fff;
          font-size: 64px;
        }
        .email-icon {
          color: ${theme.colors.fuchsia};
        }
        .check-icon {
          color: ${theme.colors.lightGreen};
        }
        .button-container {
          display: flex;
          justify-content: space-around;
          margin-top: 100px;
          width: 100%;
        }
        .calculator-container {
          display: flex;
          margin-left: 10px;
          font-size: 14px;
        }
        .lets-calculate {
          display: flex;
          align-items: center;
          color: #fff;
          text-decoration: none;
        }
      `}</style>
    </Layout>
  );
};

export default EmailVerified;
