import { useState } from 'react';
import theme from '../styles/theme';
import CardTitle from './CardTitle';
import Button from './Button';
import ExpandArrow from './ExpandArrow';
import Separator from './Separator';

const AboutSection = ({ title, children, isOpen }) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  return (
    <div className="about-section">
      <Button clear title onClick={() => setIsExpanded(!isExpanded)}>
        <ExpandArrow isReversed={isExpanded} big />
        <CardTitle color={theme.colors.white}>{title}</CardTitle>
      </Button>
      {isExpanded && children}
      <Separator dark />

      <style jsx>{`
        .about-section {
          margin: 0;
          color: ${theme.colors.white};
        }
      `}</style>
    </div>
  );
};

export default AboutSection;
