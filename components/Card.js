import theme from '../styles/theme';

const Card = ({ children, inner }) => (
  <div className="card">
    {children}

    <style jsx>{`
      .card {
        border: none;
        border-radius: 0;
        box-shadow: none;
        padding: ${inner ? '0' : '20px'};
        margin-top: 20px;
        background-color: #fff;
      }

      @media only screen and (min-width: ${theme.sizes.mobile}) {
        .card {
          border: 1px solid ${theme.colors.border};
          border-radius: 4px;
          box-shadow: 2px 2px 7px 1px rgba(0, 0, 0, 0.25);
          padding: 20px ${inner ? '20px' : '30px'};
        }
      }
    `}</style>
  </div>
);

export default Card;
