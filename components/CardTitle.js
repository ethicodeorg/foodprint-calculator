const CardTitle = ({ children }) => (
  <h3 className="card-title">
    {children}

    <style jsx>{`
      .card-title {
        margin: 0;
        font-size: 32px;
        font-weight: normal;
      }
    `}</style>
  </h3>
);

export default CardTitle;
