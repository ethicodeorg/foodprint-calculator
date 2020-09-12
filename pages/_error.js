import { withTranslation } from '../i18n';

const Error = ({ statusCode, t }) => (
  <p>
    {statusCode ? t('error_with_status', { statusCode }) : t('error_without_status')}

    <style jsx>{`
      p {
        padding: 20px;
      }
    `}</style>
  </p>
);

Error.getInitialProps = async ({ res, err }) => {
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  return {
    namespacesRequired: ['common'],
    statusCode,
  };
};

export default withTranslation('common')(Error);
