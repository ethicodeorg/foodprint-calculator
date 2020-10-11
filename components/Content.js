import theme from '../styles/theme';

const Content = ({ children }) => (
  <div className="content">
    {children}

    <style jsx>{`
      .content {
        padding: 2px 0 120px;
        margin: 0 auto;
      }

      @media only screen and (min-width: ${theme.sizes.mobile}) {
        .content {
          padding: 30px 30px 120px;
          max-width: 800px;
        }
      }
    `}</style>
  </div>
);

export default Content;
