import Link from 'next/link';

const MealLink = ({ id, children }) => (
  <Link href="/meals/[id]" as={`/meals/${id}`}>
    <a className="meal-link">
      {children}
      <style jsx>{`
        .meal-link {
          width: 730px;
          margin: 0 10px;
          font-size: 18px;
          font-weight: normal;
          text-decoration: none;
          color: #222;
        }
      `}</style>
    </a>
  </Link>
);

export default MealLink;
