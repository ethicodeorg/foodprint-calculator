import theme from "../styles/theme";

const Card = ({ children }) => (
  <div className="card">
    {children}

    <style jsx>{`
      .card {
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
        box-shadow: 2px 2px 7px 1px rgba(0, 0, 0, 0.25);
        padding: 20px;
        margin-top: 20px;
        background-color: #fff;
      }
    `}</style>
  </div>
);

export default Card;
