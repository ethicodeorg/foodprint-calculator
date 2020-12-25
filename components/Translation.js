import React, { useState } from 'react';
import theme from '../styles/theme';

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

export default Translation;
