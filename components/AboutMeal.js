import { useState } from 'react';
import { useRouter } from 'next/router';
import theme from '../styles/theme';
import Button from './Button';

const AboutMeal = ({ text, t }) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="about-meal">
      {!expanded && (
        <div className="button-container">
          <Button clear small onClick={() => setExpanded(true)}>
            {t('see_more')}
          </Button>
        </div>
      )}
      <div className="text-container">
        {text.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <style jsx>{`
        .about-meal {
          max-height: ${expanded ? 'auto' : '16px'};
          overflow: hidden;
          margin-bottom: 10px;
          font-size: 12px;
        }
        .button-container {
          position: absolute;
          width: 30%;
          text-align: center;
          margin: 0;
          padding: 15px 0 0 65%;
          background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff);
        }
        p {
          margin: 0;
        }

        @media only screen and (min-width: ${theme.sizes.mobile}) {
          .about-meal {
            max-height: ${expanded ? 'auto' : '20px'};
            font-size: 14px;
          }
          .button-container {
            width: 88px;
            padding: 15px 0 0 450px;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutMeal;
