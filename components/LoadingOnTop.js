import theme from '../styles/theme';
import Loading from './Loading';

const LoadingOnTop = ({ blockUI }) => (
  <div className="loading-container">
    {blockUI && <div className="overlay" />}
    <Loading />

    <style jsx>{`
      .overlay {
        top: 0;
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: #000;
        opacity: 0.3;
        z-index: 2;
      }
      .loading-container {
        position: fixed;
        display: flex;
        justify-content: center;
        left: calc(50% - 75px);
        top: calc(50% - 100px);
      }
    `}</style>
  </div>
);

export default LoadingOnTop;
