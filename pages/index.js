import { FaCalculator, FaUtensils } from 'react-icons/fa';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import Content from '../components/Content';
import MealLink from '../components/MealLink';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import theme from '../styles/theme';
import Link from 'next/link';

export default function Index() {
  return (
    <Layout>
      <Header activePage="home" />
      <div className="FrontPage">
        <h1>Foodprint Calculator</h1>
        <h3>
          Calculate the environmental footprint of your meals
          <span className="utensils-container">
            <FaUtensils />
          </span>
        </h3>
        <p>
          This calculator enables us to visualize and compare how our meals impact our environment
          with respect to
          <Link href="/about">
            <a className="about-link land"> land use</a>
          </Link>
          ,
          <Link href="/about">
            <a className="about-link water"> water withdrawals</a>
          </Link>
          ,
          <Link href="/about">
            <a className="about-link ghg"> greenhouse gas emissions</a>
          </Link>
          , and
          <Link href="/about">
            <a className="about-link eutro"> eutrophying emissions</a>
          </Link>
          .
        </p>
        <Link href="/about">
          <a className="about-link">This is how.</a>
        </Link>
        <MealLink id="new">
          <div className="button-container">
            <Button primary>
              Let's Calculate!
              <span className="calculator-container">
                <FaCalculator />
              </span>
            </Button>
          </div>
        </MealLink>
      </div>

      <style jsx>{`
        .FrontPage {
          max-width: 1520px;
          padding: 100px;
          margin: 0 auto;
        }
        .button-container {
          display: flex;
          justify-content: space-around;
          margin-top: 60px;
          width: 70%;
        }
        .calculator-container {
          display: flex;
          margin-left: 20px;
          font-size: 14px;
        }
        .utensils-container {
          font-size: 30px;
          margin-left: 10px;
        }
        .about-link {
          color: ${theme.colors.water};
          text-decoration: none;
          font-size: 20px;
        }
        .about-link:hover {
          opacity: 0.7;
        }
        .land {
          color: ${theme.colors.land};
        }
        .water {
          color: ${theme.colors.water};
        }
        .ghg {
          color: ${theme.colors.ghg};
        }
        .eutro {
          color: ${theme.colors.eutro};
        }
        h1 {
          font-size: 104px;
          font-weight: normal;
          margin-top: 150px;
        }
        h3 {
          font-size: 40px;
          font-weight: normal;
        }
        p {
          font-size: 20px;
          margin: 20px 0;
          max-width: 900px;
        }
      `}</style>
    </Layout>
  );
}
