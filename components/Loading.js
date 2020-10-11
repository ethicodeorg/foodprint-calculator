import theme from '../styles/theme';

const Loading = () => {
  return (
    <div className="loading">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={`earth${i}`}>
          <img className="globe" src="/earth.png" />
        </div>
      ))}
      <style jsx>{`
        .loading {
          display: flex;
          flex-wrap: wrap;
          width: 150px;
          height: 150px;
          animation: spin 3s linear infinite;
          z-index: 3;
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
          width: 70px;
          color: ${theme.colors.water};
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
