import { FaInfo } from 'react-icons/fa';
import MyTooltip from './MyTooltip';
import theme from '../styles/theme';

const InfoIcon = ({ title, placement }) => {
  return (
    <MyTooltip title={title} placement={placement} arrow>
      <div className="info-icon">
        <FaInfo />
        <style jsx>{`
          .info-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            height: 14px;
            width: 14px;
            border-radius: 20px;
            border: 2px solid ${theme.colors.water};
            font-size: 10px;
            color: ${theme.colors.water};
          }
        `}</style>
      </div>
    </MyTooltip>
  );
};

export default InfoIcon;
