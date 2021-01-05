import React, { useState } from 'react';
import Button from './Button';
import Card from './Card';
import Translation from './Translation';
import theme from '../styles/theme';
import {
  getFileNameByIndex,
  getSubmitTextByIndex,
  getUploadTextByIndex,
  getTranslationJSON,
} from '../utils/translationUtils';
import {
  getLocalStorageTranslations,
  loadLocalStorageTranslations,
} from '../utils/localStorageTranslations';

const TabPanel = ({ value, index, selectedLang, changes }) => {
  const [showUploadInput, setShowUploadInput] = useState(false);
  const [data, setData] = useState();
  const [errorData, setErrorData] = useState();
  const context = getFileNameByIndex(index);
  const toTranslate = changes.map((id) => {
    return {
      id,
      english: getTranslationJSON('en', index)[id],
    };
  });

  const uploadTranslations = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    if (file.name !== `${context}.json`) {
      setErrorData(`You must upload a file named ${context}.json`);
      return;
    }

    fileReader.onloadend = () => {
      try {
        const parsed = JSON.parse(fileReader.result);
        setData(parsed);
        loadLocalStorageTranslations(context, parsed);
        setErrorData(null);
      } catch (e) {
        setErrorData('The file you uploaded is not a valid JSON file!');
      }
    };

    if (file !== undefined) {
      fileReader.readAsText(file);
    }
  };

  // Downloads the new translation JSON file via the browser
  const submitTranslations = () => {
    const resultFile = getTranslationJSON(selectedLang.value, index);
    const translations = getLocalStorageTranslations(context);
    Object.keys(translations).forEach((key) => {
      resultFile[key] = translations[key];
    });
    const json = JSON.stringify(resultFile);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `${context}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      key={index}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <div>
          {toTranslate.length === 0 && (
            <Card inner noBorderRadius>
              <div className="row">Nothing to translate here.</div>
            </Card>
          )}
          {toTranslate.length > 0 && (
            <div className="buttons container">
              {showUploadInput ? (
                <input
                  className="file-input"
                  type="file"
                  name="file"
                  accept="application/JSON"
                  onChange={(event) => uploadTranslations(event)}
                />
              ) : (
                <Button clear onClick={() => setShowUploadInput(true)}>
                  {getUploadTextByIndex(index)}
                </Button>
              )}
              {errorData && <p className="error-message">{errorData}</p>}
            </div>
          )}

          {toTranslate.map((translation) => {
            const english = translation.english;
            const id = translation.id;

            return (
              <Card key={id} inner noBorderRadius>
                <div className="english row">{english}</div>
                <Translation
                  context={context}
                  english={english}
                  id={id}
                  loaded={data ? data[id] : ''}
                />
              </Card>
            );
          })}
          {toTranslate.length > 0 && (
            <div className="buttons container">
              <Button onClick={() => submitTranslations()}>{getSubmitTextByIndex(index)}</Button>
            </div>
          )}
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
        .file-input {
          color: ${theme.colors.text};
        }
        .error-message {
          color: ${theme.colors.ghg};
        }
      `}</style>
    </div>
  );
};

export default TabPanel;
