import React, { useState, useEffect } from 'react';
import {
  addLocalStorageTranslation,
  getLocalStorageTranslation,
} from '../utils/localStorageTranslations';
import theme from '../styles/theme';

const Translation = ({ context, english, id, loaded }) => {
  const [current, setCurrent] = useState(getLocalStorageTranslation(context, id));
  const updateTranslation = (id, value) => {
    setCurrent(value);
    addLocalStorageTranslation(context, id, value);
  };

  useEffect(() => {
    if (loaded) {
      setCurrent(loaded);
    }
  }, [loaded]);

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
        value={current}
      ></textarea>

      <style jsx>{`
        .textbox {
          text-align: center;
        }
        textarea {
          width: 96%;
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

export default Translation;
