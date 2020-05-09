import theme from '../styles/theme';

const Content = ({ children }) => (
  <div className="content">
    {children}

    <style jsx>{`
      .content {
        padding: 2px 0;
        margin: 0 auto;
      }

      @media only screen and (min-width: ${theme.sizes.mobile}) {
        .content {
          padding: 30px;
          max-width: 800px;
        }
      }
    `}</style>
  </div>
);

export default Content;
