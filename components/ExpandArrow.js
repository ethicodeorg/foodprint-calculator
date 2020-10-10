import { FaChevronDown } from 'react-icons/fa';
import classNames from 'classnames';
import theme from '../styles/theme';

const ExpandArrow = ({ isReversed, big }) => (
  <span
    className={classNames('expand-arrow', {
      'expand-arrow-reversed': isReversed,
    })}
  >
    <FaChevronDown />
    <style jsx>{`
      .expand-arrow {
        display: flex;
        margin-right: 10px;
        font-size: ${big ? '16px' : '10px'};
        color: ${theme.colors.white};
        transition: 0.3s ease-in-out;
      }
      .expand-arrow-reversed {
        transform: rotate(180deg);
        transition: 0.3s ease-in-out;
      }
    `}</style>
  </span>
);
export default ExpandArrow;
