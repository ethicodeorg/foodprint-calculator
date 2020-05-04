import Link from 'next/link';
import theme from '../styles/theme';

const MealLink = ({ id, children }) => (
  <Link href="/meals/[id]" as={`/meals/${id}`}>
    <a className="meal-link">
      {children}
      <style jsx>{`
        .meal-link {
          font-size: 24px;
          font-weight: normal;
          text-decoration: none;
          color: ${theme.colors.water};
        }
        .meal-link:hover {
          opacity: 0.7;
        }
      `}</style>
    </a>
  </Link>
);

export default MealLink;
