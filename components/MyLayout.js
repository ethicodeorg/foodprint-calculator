import theme from "../styles/theme";

const Layout = ({ children }) => (
  <div className="main">
    {children}

    <style jsx>{`
      .main {
        margin: -8px;
        min-height: 100vh;
        font-family: ${theme.fontFamily.default};
        color: ${theme.colors.text};
        background-color: ${theme.colors.background};
      }
    `}</style>
  </div>
);

export default Layout;
