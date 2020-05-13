import Header from '../components/Header';
import Layout from '../components/MyLayout';
import Content from '../components/Content';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import ExternalLink from '../components/ExternalLink';
import theme from '../styles/theme';

const About = () => {
  return (
    <Layout>
      <Header activePage="about" />
      <Content>
        <PageTitle>About the Foodprint Calculator</PageTitle>
        <Card>
          <CardTitle>Data Sources</CardTitle>
          <p>
            In January 2020, Our World in Data published{' '}
            <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food">
              Environmental impacts of food production
            </ExternalLink>{' '}
            by Hannah Ritchie and Max Roser, which was largely based on the research by Joseph Poore
            and Thomas Nemecek,{' '}
            <ExternalLink href="https://science.sciencemag.org/content/360/6392/987">
              Reducing food’s environmental impacts through producers and consumers
            </ExternalLink>
            . The data set from that research covers ~38,700 commercially viable farms in 119
            countries and 40 products representing ~90% of global protein and calorie consumption.
          </p>
          <p>
            This data is utilized by the Foodprint Calculator to accumulate the environmental impact
            of any meal, given a list of its ingredients.
          </p>
          <CardTitle>Recommended daily allowance</CardTitle>
          <p>
            Earth has a finite amount of resources which we all share. The production of food takes
            up a lot of these resources, especially when it comes to land use, greenhouse gas
            emissions, water withdrawals and eutrophying emissions. The Foodprint Calculator
            considers an RDA (recommended daily allowance) for each of these categories, using the
            following derivation:
          </p>
          <CardTitle>Land use</CardTitle>
          <p>
            Earth has about 104 million km² of habitable land and almost half of that is used for
            agriculture or{' '}
            <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food#half-of-the-world-s-habitable-land-is-used-for-agriculture">
              51 million km²
            </ExternalLink>
            . If we divide that by the current population, 7.78 billion people, we get 6.555 m² per
            person, or about 18 m² per day. Therefore the Foodprint Calculator considers that to be
            the RDA for an individual's land use.
          </p>
          <CardTitle>Water withdrawals</CardTitle>
          <p>
            Each year, global water withdrawals are about{' '}
            <ExternalLink href="https://ourworldindata.org/water-use-stress#global-freshwater-use">
              4 trillion m³
            </ExternalLink>{' '}
            of which{' '}
            <ExternalLink href="https://ourworldindata.org/water-use-stress#share-of-freshwater-withdrawals-used-in-agriculture">
              70% is used by our agriculture
            </ExternalLink>
            . Divide that amongst the population, we get about 360 m³ or an RDA of about 1 m³ (1000
            litres) of water per individual.
          </p>
          <CardTitle>Greenhouse gas emissions</CardTitle>
          <p>
            Food is responsible for about{' '}
            <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food#food-production-is-responsible-for-one-quarter-of-the-world-s-greenhouse-gas-emissions">
              26% of our global greenhouse gas emissions
            </ExternalLink>
            , or 13.6 billion tonnes of carbon dioxide equivalents. If we only aim to keep that
            amount as is, although we should be trying to reduce it, that calculates to 1.75 tonnes
            per person or an RDA of about 4.8 kg for each individual.
          </p>
          <CardTitle>Eutrophying emissions</CardTitle>
          <p>
            Eutrophying emissions are about{' '}
            <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food#eutrophying-emissions-from-food">
              12.45 kgPO₄eq on average for all food types per 1000 kcal
            </ExternalLink>
            . The recommended daily calorie intake is{' '}
            <ExternalLink href="https://www.nhs.uk/common-health-questions/food-and-diet/what-should-my-daily-intake-of-calories-be/">
              2,000 kcal a day for women and 2,500 for men
            </ExternalLink>{' '}
            or 2,250 on average. Again, if we only aim to not increase this amount, which we should
            be aiming to reduce, we can consider 28 kgPO₄eq the RDA of eutrophying emissions.
          </p>
          <CardTitle>How accurate is it?</CardTitle>
          <p>
            Of course, the results accumulated by the Foodprint Calculator should not be regarded as
            exact science but rather a rough estimation of the result. The environmental impact of
            each food product type varies considerably between individual products and productions.
            However, given that the data being used for this calculator is widely regarded as the
            most comprehensive and accurate data that we have today, we can assume that this
            calculator is as accurate as it gets.
          </p>
          <CardTitle>How to use</CardTitle>
          <div>
            When adding ingredients from a recipe, two common issues will almost certainly be
            stumbled upon:
            <ol>
              <li>
                Converting units can be tricky with all the different measurements being used in
                recipes, e.g. spoons and cups and other volumes. The most reliable way is to weigh
                each ingredient if that's possible. Otherwise, you can use{' '}
                <ExternalLink href="https://www.calculateme.com/recipe/recipe-volume-to-weight-conversion">
                  this website
                </ExternalLink>{' '}
                to convert some common food types from volume to weight.
              </li>
              <li>
                Some ingredients contain a bunch of other ingredients. The most accurate method is
                to add an ingredient for each subingredient but in many cases it should be enough to
                only add the main ingredient, e.g. most ketchups contain some other ingredients than
                tomatos but tomatoes make up the bulk of the ketchup and therefore, it should be
                considered accurate enough to add "Tomatoes" for ketchup.
              </li>
            </ol>
          </div>
          <CardTitle>Whitelabels</CardTitle>
          <p>
            The Foodprint Calculator is being offered to restaurants, cefaterias, ready-meals
            producers, etc., as a whitelabel solution, i.e. branded, styled and customized for each
            partner. The environmental impact of each meal can then be exported in various formats
            to display on menus, advertisments and packaging, along with barcodes that link to the
            partner whitelabel page. If you are interested in becoming a whitelabel partner of the
            Foodprint Calculator and show your customers the calculated environmental impact for
            each of your products, please contact us at{' '}
            <ExternalLink email href="mailto:ethicode@ethicode.org">
              ethicode@ethicode.org
            </ExternalLink>
            .
          </p>
        </Card>
      </Content>
      <style jsx>{`
        .button-icon {
          display: inline;
          margin-left: 5px;
          font-size: 12px;
        }
        .ext-link {
          color: ${theme.colors.water};
          text-decoration: none;
        }
        .ext-link:hover {
          opacity: 0.7;
        }
      `}</style>
    </Layout>
  );
};

export default About;
