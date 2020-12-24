import theme from '../styles/theme';

const Card = ({ children, inner, userForm, seeThrough, dark, noBorderRadius }) => (
  <div className="card">
    {children}

    <style jsx>{`
      .card {
        border: none;
        border-radius: 0;
        box-shadow: none;
        padding: ${inner ? '0' : '20px'};
        margin: ${inner ? '0' : '20px'} auto 0;
        background-color: ${dark ? theme.colors.darkBackground : theme.colors.white};
        opacity: ${seeThrough ? '0.9' : '1'};
        max-width: ${userForm ? '300px' : 'auto'};
      }

      @media only screen and (min-width: ${theme.sizes.mobile}) {
        .card {
          border: 1px solid ${dark ? theme.colors.darkBorder : theme.colors.border};
          border-radius: ${noBorderRadius ? '0' : '4px'};
          box-shadow: 2px 2px 7px 1px rgba(0, 0, 0, 0.25);
          padding: 20px ${inner ? '20px' : '30px'};
        }
      }
    `}</style>
  </div>
);

export default Card;
