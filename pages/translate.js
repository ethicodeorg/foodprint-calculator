import React, { Fragment, useState } from 'react';
import Select from 'react-select';
import Flags from 'country-flag-icons/react/3x2';
import { withTranslation } from '../i18n';
import Layout from '../components/MyLayout';
import theme from '../styles/theme';
import Content from '../components/Content';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import TranslateTabs from '../components/TranslateTabs';

const Translate = ({ t }) => {
  const [selectedLang, setSelectedLang] = useState();
  const languageOptions = [
    { value: 'is', label: 'Íslenska' },
    { value: 'fr', label: 'Français' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' },
  ];

  return (
    <Layout title="New Translations" t={t}>
      <Content>
        <PageTitle>New Translations</PageTitle>
        <Card>
          <p>This page is for translating content for the FOOD·E website.</p>
          <div className="language-container">
            <label>Select language:</label>
            <div className="select-container">
              <Select
                inputId="lang"
                name="lang"
                options={languageOptions}
                value={selectedLang}
                onChange={(val) => setSelectedLang(val)}
                instanceId="translate-lang"
              />
            </div>
          </div>
          {selectedLang && (
            <Fragment>
              <div className="flag-container">
                You are translating to {selectedLang.label}
                <div className="flag">
                  {selectedLang.value === 'is' && <Flags.IS />}
                  {selectedLang.value === 'en' && <Flags.GB />}
                  {selectedLang.value === 'fr' && <Flags.FR />}
                  {selectedLang.value === 'it' && <Flags.IT />}
                  {selectedLang.value === 'pt' && <Flags.PT />}
                </div>
              </div>
              <p>
                Please take care not to lose your work in progress; if you refresh or close the
                browser tab, all the text fields will be cleared. You can, however, flick between
                the three purple tabs below without losing your work.
              </p>
              <p>
                When you finish translating, click the submit button at the bottom of the page for
                each of the three purple tabs. Each button click will download a file that you can,
                e.g., send over Slack.
              </p>
              <TranslateTabs selectedLang={selectedLang} />
            </Fragment>
          )}
        </Card>
      </Content>

      <style jsx>{`
        .language-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .flag-container {
          display: flex;
          align-items: center;
          margin: 20px 0;
        }
        .select-container {
          width: 100%;
        }
        .language-select {
          width: 265px;
        }
        .flag {
          width: 36px;
          padding-left: 15px;
        }
        .new-translations {
          padding: 100px 20px;
          text-align: center;
          background-color: ${theme.colors.white};
        }
        label {
          min-width: 100%;
          margin-bottom: 5px;
          font-size: 12px;
        }
        p {
          line-height: 1.5;
        }

        @media only screen and (min-width: ${theme.sizes.mobile}) {
          label {
            min-width: 180px;
            margin-bottom: 0;
            font-size: 16px;
          }
          input {
            width: 430px;
          }
          .input-container,
          .type-container {
            flex-wrap: nowrap;
          }
          .select-container {
            width: 452px;
          }
        }
      `}</style>
    </Layout>
  );
};

Translate.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Translate);
