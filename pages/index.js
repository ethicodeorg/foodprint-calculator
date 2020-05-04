import { FaCalculator } from 'react-icons/fa';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import Content from '../components/Content';
import MealLink from '../components/MealLink';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import theme from '../styles/theme';

export default function Index() {
  return (
    <Layout>
      <Header activePage="home" />
      <div className="FrontPage">
        <h1>Foodprint calculator</h1>
        <h3>Calculate the environmental footprint of your meals</h3>
        <p>Are we eating up our planet by choosing the wrong types of food?</p>
        <p>
          Earth has finite resources which we all share and lately we've been making efforts to use
          them sparingly.
        </p>
        <p>
          This calculator enables us to visualize how our food types and meals compare against each
          other with respect to <span className="land">land use</span>,{' '}
          <span className="water">water withdrawals</span>,{' '}
          <span className="ghg">greenhouse gas emissions</span> and
          <span className="eutro"> eutrophying emissions</span>.
        </p>
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
          max-width: 1000px;
        }
      `}</style>
    </Layout>
  );
}
