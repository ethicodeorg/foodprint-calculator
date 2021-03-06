import { Link } from '../i18n';
import theme from '../styles/theme';

const MealLink = ({ id, children, isEdit }) => {
  const firstParam = isEdit ? 'mymeals' : 'meals';
  return (
    <Link href={`/${firstParam}/[id]?id=${id}`} as={`/${firstParam}/${id}`}>
      <a className="meal-link">
        {children}
        <style jsx>{`
          .meal-link {
            display: flex;
            font-size: ${isEdit ? '24px' : '32px'};
            font-weight: normal;
            text-decoration: none;
            color: ${isEdit ? theme.colors.water : theme.colors.text};
          }
          .meal-link:hover {
            opacity: 0.7;
          }
        `}</style>
      </a>
    </Link>
  );
};

export default MealLink;
