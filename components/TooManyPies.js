import theme from '../styles/theme';

const TooManyPies = ({ number }) => (
  <div className="too-many-pies">
    Too many pies to display! ({number})
    <style jsx>{`
      .too-many-pies {
        font-size: 10px;
      }

      @media only screen and (min-width: ${theme.sizes.mobile}) {
        .too-many-pies {
          font-size: 14px;
        }
      }
    `}</style>
  </div>
);

export default TooManyPies;
