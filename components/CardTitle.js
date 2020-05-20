import theme from '../styles/theme';

const CardTitle = ({ children, sub }) => (
  <h3 className="card-title">
    {children}

    <style jsx>{`
      .card-title {
        margin: 0;
        font-size: ${sub ? '20px' : '24px'};
        font-weight: normal;
        text-align: left;
      }

      @media only screen and (min-width: ${theme.sizes.mobile}) {
        .card-title {
          font-size: ${sub ? '24px' : '32px'};
        }
      }
    `}</style>
  </h3>
);

export default CardTitle;
