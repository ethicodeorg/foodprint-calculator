import theme from '../styles/theme';

const CardTitle = ({ children }) => (
  <h3 className="card-title">
    {children}

    <style jsx>{`
      .card-title {
        margin: 0;
        font-size: 24px;
        font-weight: normal;
      }

      @media only screen and (min-width: ${theme.sizes.mobile}) {
        .card-title {
          font-size: 32px;
        }
      }
    `}</style>
  </h3>
);

export default CardTitle;
