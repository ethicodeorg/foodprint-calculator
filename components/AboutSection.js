import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import classNames from 'classnames';
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
        <CardTitle>{title}</CardTitle>
        <ExpandArrow isReversed={isExpanded} big />
      </Button>
      {isExpanded && children}
      <Separator />
    </div>
  );
};

export default AboutSection;
