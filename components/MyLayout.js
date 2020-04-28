const Layout = ({ children }) => (
  <div className="main">
    {children}

    <style jsx>{`
      .main {
        margin: -8px;
        min-height: 100vh;
        font-family: Avenir;
        color: #222;
        background-color: #f5f5f5;
      }
    `}</style>
  </div>
);

export default Layout;
