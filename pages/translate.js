import React, { Fragment, useState } from 'react';
import Select from 'react-select';
import classNames from 'classnames';
import Flags from 'country-flag-icons/react/3x2';
import { withTranslation } from '../i18n';
import Layout from '../components/MyLayout';
import theme from '../styles/theme';
import Content from '../components/Content';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import TranslateTabs from '../components/TranslateTabs';
import Button from '../components/Button';
import { FaChevronDown } from 'react-icons/fa';

const Translate = ({ t }) => {
  const [selectedLang, setSelectedLang] = useState();
  const [showInstructions, setShowInstructions] = useState(true);
  const languageOptions = [
    { value: 'is', label: 'Íslenska' },
    { value: 'fr', label: 'Français' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' },
    { value: 'es', label: 'Español' },
  ];

  return (
    <Layout title="New Translations" t={t}>
      <Content>
        <PageTitle>New Translations</PageTitle>
        <Card>
          <h3>Welcome to the FOOD·E translate page!</h3>
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
                  {selectedLang.value === 'es' && <Flags.ES />}
                </div>
              </div>
              <div className="button-container">
                <Button small clear onClick={() => setShowInstructions(!showInstructions)}>
                  {showInstructions ? 'Hide instructions' : 'Show instructions'}
                  <span
                    className={classNames('button-icon', {
                      'button-icon-reversed': showInstructions,
                    })}
                  >
                    <FaChevronDown />
                  </span>
                </Button>
              </div>
              {showInstructions && (
                <div>
                  <p>
                    Using the FOOD·E translation system should be as easy as using a spreadsheet or
                    text document. All you need to do is go through the translations in the three
                    context tabs (Front page, About page, and Other Changes) and translate each one
                    to your language.
                  </p>
                  <p>
                    You don't have to worry about losing your work –{' '}
                    <span className="green">
                      everything is automatically saved as soon as you type something in the
                      translation boxes.{' '}
                    </span>
                    You can refresh your browser, close it, restart your computer and reopen the
                    link, and everything should still be there.
                  </p>
                  <p>You can even switch to a new browser or device, in which case you have to:</p>
                  <ol>
                    <li>
                      Download your current work-in-progress using the "Download" button at the
                      bottom of each translation tab
                    </li>
                    <li>Transfer the JSON files to the new device</li>
                    <li>
                      Upload it into the page on the new device or browser, using the "Upload"
                      button.
                    </li>
                  </ol>
                  <p>
                    The one thing you can't do is clear your browser cookies or localStorage in your
                    browser settings while in the middle of a translation process.{' '}
                    <span className="warning">
                      This is the only way you can lose your work so please don't do that!
                    </span>
                  </p>
                  <p>
                    When you finish translating, click the "Download" button at the bottom of the
                    page for each of the three context tabs. Each button click will download a JSON
                    file that you can, e.g., send over Slack.
                  </p>
                </div>
              )}
              <TranslateTabs selectedLang={selectedLang} />
            </Fragment>
          )}
        </Card>
      </Content>

      <style jsx>{`
        .language-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .flag-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20px 0;
        }
        .select-container {
          width: 100%;
        }
        .flag {
          width: 36px;
          padding-left: 15px;
        }
        .button-container {
          margin-bottom: 20px;
        }
        .button-icon {
          display: flex;
          margin-left: 10px;
          font-size: 10px;
          transition: 0.3s ease-in-out;
        }
        .button-icon-reversed {
          transform: rotate(180deg);
          transition: 0.3s ease-in-out;
        }
        .green {
          font-weight: bold;
          color: ${theme.colors.land};
        }
        .warning {
          font-weight: bold;
          color: ${theme.colors.ghg};
        }
        label {
          min-width: 100%;
          margin-bottom: 5px;
          font-size: 12px;
        }
        p,
        li {
          line-height: 1.5;
        }
        h3 {
          text-align: center;
          margin-bottom: 30px;
        }

        @media only screen and (min-width: ${theme.sizes.mobile}) {
          label {
            min-width: 180px;
            margin-bottom: 0;
            font-size: 16px;
          }
          .select-container {
            width: 200px;
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
