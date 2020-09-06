import { withTranslation } from '../i18n';
import Layout from '../components/MyLayout';
import theme from '../styles/theme';
import { FaPaperPlane, FaEnvelope } from 'react-icons/fa';

const CheckEmail = ({ t }) => {
  return (
    <Layout title={t('check_email')} t={t}>
      <div className="check-email">
        <div className="icons">
          <span className="email-icon">
            <FaEnvelope />
          </span>
          <span className="arrow-icon">
            <FaPaperPlane />
          </span>
        </div>
        <h3>{t('verification_email_sent')}</h3>
        <div className="check-email-text">
          <p>{t('check_email_text_1')}</p>
          <p>{t('check_email_text_2')}</p>
        </div>

        <style jsx>{`
          .check-email {
            text-align: center;
            color: ${theme.colors.white};
          }
          h3 {
            padding: 0 20px;
            font-weight: normal;
            font-size: 32px;
          }
          .check-email-text {
            height: 100vh;
            max-width: 800px;
            padding: 20px 50px;
            margin: 0 auto;
          }
          .icons {
            padding-top: 50px;
          }
          .email-icon,
          .arrow-icon {
            margin: 0 20px;
            color: #fff;
            font-size: 64px;
          }
          .email-icon {
            color: ${theme.colors.teal};
          }
          .arrow-icon {
            color: ${theme.colors.orange};
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default withTranslation('common')(CheckEmail);
