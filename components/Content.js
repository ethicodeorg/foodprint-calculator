const Content = ({ children }) => (
  <div className="content">
    {children}

    <style jsx>{`
      .content {
        padding: 30px;
        max-width: 800px;
        margin: 0 auto;
      }
    `}</style>
  </div>
);

export default Content;
