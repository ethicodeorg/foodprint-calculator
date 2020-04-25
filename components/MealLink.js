import Link from 'next/link';

const MealLink = (props) => (
  <Link href="/meals/[id]" as={`/meals/${props.id}`}>
    <a className="meal-link">
      {props.title}
      <style jsx>{`
        .meal-link {
          line-height: 60px;
          font-size: 18px;
          font-weight: bold;
          text-decoration: none;
          color: #222;
          opacity: 1;
          transition: opacity 0.2s;
        }
        .meal-link:hover {
          opacity: 0.7;
        }
      `}</style>
    </a>
  </Link>
);

export default MealLink;
