import theme from '../styles/theme';

const Separator = ({ dark }) => (
  <div className="separator">
    <style jsx>{`
      .separator {
        border-top: 1px solid ${dark ? theme.colors.darkBorder : theme.colors.border};
        margin: 20px 0;
      }
    `}</style>
  </div>
);

export default Separator;
