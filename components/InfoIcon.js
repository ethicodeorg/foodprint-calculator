import { FaInfo } from 'react-icons/fa';
import MyTooltip from './MyTooltip';
import theme from '../styles/theme';

const InfoIcon = ({ title }) => {
  return (
    <MyTooltip title={title} placement="top" arrow enterTouchDelay={0} leaveTouchDelay={5000}>
      <div className="info-icon">
        <FaInfo />
        <style jsx>{`
          .info-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            height: 12px;
            width: 12px;
            font-size: 8px;
            border-radius: 20px;
            border: 2px solid ${theme.colors.orange};
            color: ${theme.colors.orange};
            cursor: pointer;
          }
        `}</style>
      </div>
    </MyTooltip>
  );
};

export default InfoIcon;
