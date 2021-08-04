import theme from '../styles/theme';

const PageTitle = ({ children }) => (
  <h3>
    {children}

    <style jsx>{`
      h3 {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin: 120px 0 0;
        padding: 0 20px;
        font-size: 32px;
        font-weight: normal;
        text-align: center;
        text-shadow: 1px 1px 1px ${theme.colors.darkBorder};
        color: ${theme.colors.white};
      }

      @media only screen and (min-width: ${theme.sizes.mobile}) {
        h3 {
          margin: 120px 0 0;
          font-size: 48px;
          font-weight: normal;
          text-align: center;
          text-shadow: 2px 2px 2px ${theme.colors.darkBorder};
        }
      }
    `}</style>
  </h3>
);

export default PageTitle;
