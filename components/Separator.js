import theme from '../styles/theme';

const Separator = () => (
  <div className="separator">
    <style jsx>{`
      .separator {
        border-top: 1px solid ${theme.colors.border};
        margin: 20px 0;
      }
    `}</style>
  </div>
);

export default Separator;
