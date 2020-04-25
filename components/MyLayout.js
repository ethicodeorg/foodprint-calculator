const Layout = ({ children }) => (
  <div className="main">
    {children}

    <style jsx>{`
      .main {
        margin: -8px;
        font-family: Avenir;
        color: #222;
      }
    `}</style>
  </div>
);

export default Layout;
