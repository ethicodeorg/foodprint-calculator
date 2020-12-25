import React, { useState } from 'react';
import Button from './Button';
import Card from './Card';
import Translation from './Translation';
import theme from '../styles/theme';
import {
  getFileNameByIndex,
  getSubmitTextByIndex,
  getTranslationJSON,
} from '../utils/translationUtils';

const TabPanel = ({ value, index, selectedLang, changes }) => {
  const [translations, setTranslations] = useState(
    changes.map((id) => {
      return {
        id,
        english: getTranslationJSON('en', index)[id],
        translation: '',
      };
    })
  );

  // Downloads the new translation JSON file via the browser
  const submitTranslations = () => {
    const resultFile = getTranslationJSON(selectedLang.value, index);
    translations.forEach((translation) => {
      resultFile[translation.id] = translation.translation;
    });
    const fileName = getFileNameByIndex(index);
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
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <div>
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
              {getSubmitTextByIndex(index)}
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
};

export default TabPanel;
