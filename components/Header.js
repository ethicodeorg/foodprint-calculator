import Link from 'next/link';
import classNames from 'classnames';

const Header = ({ activePage }) => (
  <div className="header">
    <Link href="/">
      <a
        className={classNames('link home', {
          active: activePage === 'home',
        })}
      >
        Home
      </a>
    </Link>
    <Link href="/meals">
      <a
        className={classNames('link', {
          active: activePage === 'meals',
        })}
      >
        My Meals
      </a>
    </Link>
    <Link href="/about">
      <a
        className={classNames('link', {
          active: activePage === 'about',
        })}
      >
        About
      </a>
    </Link>

    <style jsx>{`
      .header {
        position: fixed;
        display: flex;
        justify-content: flex-end;
        width: calc(100% - 80px);
        padding: 30px 40px;
      }
      .link {
        color: #222;
        text-decoration: none;
        font-size: 24px;
        font-weight: normal;
        margin-left: 30px;
        opacity: 1;
        transition: opacity 0.2s;
      }
      .link:hover {
        opacity: 0.7;
      }
      .active {
        color: #e91e63;
      }
      .home {
        margin-right: auto;
        margin-left: 0;
      }
    `}</style>
  </div>
);

export default Header;
