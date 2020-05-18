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
          <CardTitle>Vision</CardTitle>
          <p>
            The Foodprint Calculator was built and deployed in May 2020 and is still a work in
            progress. The idea is that anyone assembling meals (restaurants, cafeterias, ready-meals
            producers, food bloggers, home cooks, etc.) can use this calculator to get a concise,
            straightforward summary of how their meals are impacting the environment. All that's
            needed is the meals's list of ingredients and their weight, and the Foodprint Calculator
            does the rest. The output can then be exported in various formats to display on menus,
            advertisements, websites, and packaging.
          </p>
          <p>
            The Foodprint Calculator is and always will be free to use for everyone. It can also be
            customized, branded, and hosted separately for each company and then linked to the
            company website, menus, packaging, recipes, ads, etc. There will be an initial set up
            cost, which will vary based on the amount of customizations requested and then a
            subscription fee for continued access. Included in that package is data storing for all
            the meals of the account. For everyone else, the meals are only stored in their browser,
            meaning that all saved data will only be available in that particular browser, and would
            be lost upon clearing the user's browsing data.
          </p>
          <p>
            Another potential for the Foodprint Calculator is to connect with supermarket's computer
            systems and summarize each checkout. Shoppers can then create an account for their
            household, and then every time someone from that household makes a purchase, the
            environmental footprint amounts are added to their account. Users could then visualize
            and compare their ecological footprints from grocery shopping only.
          </p>
          <p>
            If your company is interested in showing your customers the calculated environmental
            impact for each of their products, please reach out to us at{' '}
            <ExternalLink email href="mailto:ethicode@ethicode.org">
              ethicode@ethicode.org
            </ExternalLink>
            , we will happily answer any questions you might have.
          </p>
          <CardTitle>Data Sources</CardTitle>
          <p>
            In January 2020, Our World in Data published{' '}
            <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food">
              Environmental impacts of food production
            </ExternalLink>{' '}
            by Hannah Ritchie and Max Roser, which was primarily based on the research by Joseph
            Poore and Thomas Nemecek,{' '}
            <ExternalLink href="https://science.sciencemag.org/content/360/6392/987">
              Reducing food’s environmental impacts through producers and consumers
            </ExternalLink>
            . The data set from that research covers ~38,700 commercially viable farms in 119
            countries and 40 products representing ~90% of global protein and calorie consumption.
          </p>
          <CardTitle>Recommended daily allowance</CardTitle>
          <p>
            Earth has a finite amount of resources that we all share. Food production takes up a lot
            of these resources, especially when it comes to land use, greenhouse gas emissions,
            water withdrawals, and eutrophying emissions. The Foodprint Calculator considers an RDA
            (recommended daily allowance) for each of these categories, using the following
            derivation:
          </p>
          <CardTitle>Land use</CardTitle>
          <p>
            Earth has about 104 million km² of habitable land, and almost half of that is used for
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
              our agriculture uses 70%
            </ExternalLink>
            . Divided amongst the population, and we get about 360 m³ or an RDA of about one m³
            (1000 liters) of water per individual.
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
            or 2,250 on average. Again, if we only aim not to increase this amount, which we should
            be aiming to reduce, we can consider 28 kgPO₄eq the RDA of eutrophying emissions.
          </p>
          <CardTitle>How accurate is it?</CardTitle>
          <p>
            Of course, the results accumulated by the Foodprint Calculator should not be regarded as
            an exact science but rather a rough estimation. The environmental impact of each food
            product type varies considerably between individual products and productions. However,
            given that the data being used for the Foodprint Calculator is widely regarded as the
            most comprehensive and accurate data we have today, we can assume that it is as precise
            as it gets.
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
                Some ingredients contain a bunch of other elements. The most accurate method is to
                add an ingredient for each such sub-element. Nevertheless, in many cases, it should
                be enough only to add the main ingredient. E.g., most kinds of ketchup contain some
                other ingredients than tomatoes, but tomatoes make up the bulk of the ketchup.
                Therefore, it should be considered accurate enough to add "Tomatoes" for ketchup.
              </li>
            </ol>
          </div>
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
