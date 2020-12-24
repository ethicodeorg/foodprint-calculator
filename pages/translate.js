import React, { Fragment, useState } from 'react';
import Select from 'react-select';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Flags from 'country-flag-icons/react/3x2';
import { withTranslation } from '../i18n';
import Layout from '../components/MyLayout';
import theme from '../styles/theme';
import Content from '../components/Content';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import Card from '../components/Card';
import FrontEnglish from '../public/static/locales/en/index.json';
import AboutEnglish from '../public/static/locales/en/about.json';
import OtherEnglish from '../public/static/locales/en/common.json';
import FrontIcelandic from '../public/static/locales/is/index.json';
import AboutIcelandic from '../public/static/locales/is/about.json';
import OtherIcelandic from '../public/static/locales/is/common.json';
import FrontItalian from '../public/static/locales/it/index.json';
import AboutItalian from '../public/static/locales/it/about.json';
import OtherItalian from '../public/static/locales/it/common.json';
import FrontFrench from '../public/static/locales/fr/index.json';
import AboutFrench from '../public/static/locales/fr/about.json';
import OtherFrench from '../public/static/locales/fr/common.json';
import FrontPortuguese from '../public/static/locales/pt/index.json';
import AboutPortuguese from '../public/static/locales/pt/about.json';
import OtherPortuguese from '../public/static/locales/pt/common.json';

const resultFilesMap = {
  is: {
    0: FrontIcelandic,
    1: AboutIcelandic,
    2: OtherIcelandic,
  },
  it: {
    0: FrontItalian,
    1: AboutItalian,
    2: OtherItalian,
  },
  fr: {
    0: FrontFrench,
    1: AboutFrench,
    2: OtherFrench,
  },
  pt: {
    0: FrontPortuguese,
    1: AboutPortuguese,
    2: OtherPortuguese,
  },
};

const fileNameMap = {
  0: 'index',
  1: 'about',
  2: 'common',
};

const submitTextMap = {
  0: 'Front Page',
  1: 'About Page',
  2: 'Other',
};

const Translation = ({ translations, setTranslations, english, id, translation }) => {
  const [trans, setTrans] = useState(translation);
  const updateTranslation = (id, value) => {
    const indexToUpdate = translations.findIndex((t) => t.id === id);
    translations[indexToUpdate].translation = value;
    setTrans(value);
    setTranslations(translations);
  };

  return (
    <div className="textbox">
      <textarea
        rows="10"
        cols="82"
        placeholder={
          english.includes('{{')
            ? 'Your translation. Please leave the curly brackets and everything within them untouched.'
            : 'Your translation'
        }
        onChange={(e) => updateTranslation(id, e.target.value)}
        value={trans}
      ></textarea>

      <style jsx>{`
        textarea {
          margin-top: 5px;
          padding: 7px 10px;
          border: 1px solid ${theme.colors.border};
          border-radius: 4px;
          resize: none;
        }
      `}</style>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, translations, setTranslations, selectedLang, ...other } = props;
  const submitTranslations = () => {
    // write to json and download
    const resultFile = resultFilesMap[selectedLang.value][index];
    translations.forEach((translation) => {
      resultFile[translation.id] = translation.translation;
    });
    const fileName = fileNameMap[index];
    const json = JSON.stringify(resultFile);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      key={translations}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div p={3}>
          {translations.length === 0 && (
            <Card inner noBorderRadius>
              <div className="row">Nothing to translate here.</div>
            </Card>
          )}
          {translations.map((translation) => {
            const english = translation.english;
            const id = translation.id;

            return (
              <Card key={id} inner noBorderRadius>
                <div className="english row">{english}</div>
                <Translation
                  translations={translations}
                  setTranslations={setTranslations}
                  english={english}
                  id={id}
                  translation={translation.translation}
                />
              </Card>
            );
          })}
          <div className="buttons container">
            <Button onClick={() => submitTranslations()} disabled={translations.length === 0}>
              Submit {submitTextMap[index]} translations
            </Button>
          </div>
        </div>
      )}
      <style jsx>{`
        .row {
          margin: 0 0 20px;
          color: ${theme.colors.text};
        }
        .english {
          font-size: 14px;
          font-family: courier;
          line-height: 1.5;
        }
        .buttons {
          padding: 40px 0 20px;
        }
        .container {
          display: flex;
          align-items: center;
          justify-content: space-around;
          background-color: ${theme.colors.white};
        }
      `}</style>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    fontFamily: theme.fontFamily.default,
  },
}));

const Translate = ({ t }) => {
  const [selectedLang, setSelectedLang] = useState();
  const [selectedTab, setSelectedTab] = useState(0);
  const languageOptions = [
    { value: 'is', label: 'Íslenska' },
    { value: 'fr', label: 'Français' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' },
  ];
  const changes = {
    frontPage: ['start', 'slogan'],
    aboutPage: [],
    other: ['transport_mode', 'transport_type'],
  };
  const [frontPageTranslations, setFrontPageTranslations] = useState(
    changes.frontPage.map((id) => {
      return {
        id,
        english: FrontEnglish[id],
        translation: '',
      };
    })
  );
  const [aboutPageTranslations, setAboutPageTranslations] = useState(
    changes.aboutPage.map((id) => {
      return {
        id,
        english: AboutEnglish[id],
        translation: '',
      };
    })
  );
  const [otherTranslations, setOtherTranslations] = useState(
    changes.other.map((id) => {
      return {
        id,
        english: OtherEnglish[id],
        translation: '',
      };
    })
  );
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const classes = useStyles();

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
              <div className={classes.root}>
                <AppBar position="static">
                  <Tabs value={selectedTab} onChange={handleChange}>
                    <Tab
                      label={`Front page (${changes.frontPage.length})`}
                      id="simple-tab-0"
                      aria-controls="simple-tabpanel-0"
                      classes={classes}
                    />
                    <Tab
                      label={`About page (${changes.aboutPage.length})`}
                      id="simple-tab-1"
                      aria-controls="simple-tabpanel-1"
                      classes={classes}
                    />
                    <Tab
                      label={`Other changes (${changes.other.length})`}
                      id="simple-tab-2"
                      aria-controls="simple-tabpanel-2"
                      classes={classes}
                    />
                  </Tabs>
                  <TabPanel
                    value={selectedTab}
                    index={0}
                    translations={frontPageTranslations}
                    setTranslations={(translations) => setFrontPageTranslations(translations)}
                    selectedLang={selectedLang}
                  />
                  <TabPanel
                    value={selectedTab}
                    index={1}
                    translations={aboutPageTranslations}
                    setTranslations={(translations) => setAboutPageTranslations(translations)}
                    selectedLang={selectedLang}
                  />
                  <TabPanel
                    value={selectedTab}
                    index={2}
                    translations={otherTranslations}
                    setTranslations={(translations) => setOtherTranslations(translations)}
                    selectedLang={selectedLang}
                  />
                </AppBar>
              </div>
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
  namespacesRequired: ['common', 'about', 'index'],
});

export default withTranslation('about')(Translate);
