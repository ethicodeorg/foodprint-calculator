import { FaGlobeEurope, FaGlobeAfrica, FaGlobeAsia, FaGlobeAmericas } from 'react-icons/fa';
import theme from '../styles/theme';

const Loading = () => {
  const getGlobe = (i) => {
    switch (i) {
      case 1:
        return <FaGlobeAfrica />;
      case 2:
        return <FaGlobeAmericas />;
      case 3:
        return <FaGlobeEurope />;
      case 4:
        return <FaGlobeAsia />;
    }
  };

  return (
    <div className="loading">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={`earth${i}`}>
          <div className="land" />
          <div className="globe">{getGlobe(i)}</div>
        </div>
      ))}
      <style jsx>{`
        .loading {
          display: flex;
          flex-wrap: wrap;
          width: 100px;
          height: 100px;
          margin-top: 100px;
          animation: spin 3s linear infinite;
        }
        .earth1,
        .earth2,
        .earth3,
        .earth4 {
          animation: bounce 4s infinite ease-in-out;
        }
        .earth2 {
          animation-delay: -3s;
        }
        .earth3 {
          animation-delay: -1s;
        }
        .earth4 {
          animation-delay: -2s;
        }
        .globe {
          display: flex;
          font-size: 50px;
          color: ${theme.colors.water};
        }
        .land {
          position: fixed;
          left: calc(50% - 23px);
          height: 46px;
          width: 46px;
          margin-top: 2px;
          border-radius: 100%;
          background-color: ${theme.colors.green};
          z-index: -1;
        }

        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes bounce {
          0%,
          70%,
          100% {
            transform: scale(0);
          }
          35% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
