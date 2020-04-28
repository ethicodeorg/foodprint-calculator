const PageTitle = ({ children }) => (
  <h3 className="page-title">
    {children}

    <style jsx>{`
      .page-title {
        margin: 0;
        font-size: 48px;
        text-align: center;
      }
    `}</style>
  </h3>
);

export default PageTitle;
