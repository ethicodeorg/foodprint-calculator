import { Link, withTranslation } from '../i18n';
import Layout from '../components/MyLayout';
import Header from '../components/Header';
import Button from '../components/Button';
import theme from '../styles/theme';
import { FaAt, FaCalculator, FaCheckCircle } from 'react-icons/fa';

const EmailVerified = ({ t }) => {
  return (
    <Layout title={t('email_verified')} t={t}>
      <Header />
      <div className="email-verified">
        <div className="icons">
          <span className="email-icon">
            <FaAt />
          </span>
          <span className="check-icon">
            <FaCheckCircle />
          </span>
        </div>
        <div className="email-verified-text">{t('email_verified_text')}</div>
        <div className="button-container">
          <Button primary animate noPad>
            <Link href="/newmeal">
              <a className="lets-calculate">
                {t('lets_calculate')}
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
          padding: 10px 20px;
          color: #fff;
          text-decoration: none;
        }

        @media only screen and (min-width: ${theme.sizes.mobile}) {
          .lets-calculate {
            padding: 15px 40px;
          }
        }
      `}</style>
    </Layout>
  );
};

EmailVerified.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(EmailVerified);
