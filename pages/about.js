import { useRouter } from 'next/router';
import { FaTractor, FaTint, FaSmog } from 'react-icons/fa';
import { withTranslation } from '../i18n';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import Content from '../components/Content';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import ExternalLink from '../components/ExternalLink';
import AboutSection from '../components/AboutSection';
import theme from '../styles/theme';

const About = ({ t }) => {
  const router = useRouter();
  const { openSection = 'project' } = router.query;
  const titleTextArr = t('about_fc').split('|');

  return (
    <Layout title={t('about')}>
      <Header />
      <Content>
        <PageTitle>
          <span>{titleTextArr[0]}</span>
          <span>{titleTextArr[1]}</span>
        </PageTitle>
        <Card>
          <AboutSection title={t('project')} isOpen={openSection === 'project'}>
            <p>{t('fc_function')}</p>
            <CardTitle sub>{t('why_question')}</CardTitle>
            <p>
              {t('why_answer_1')} {t('why_answer_2')} {t('why_answer_3')}
            </p>
            <CardTitle sub>{t('how_question')}</CardTitle>
            <p>
              {t('how_answer_1')} {t('how_answer_2')} {t('how_answer_3')}
            </p>
            <p>{t('four_ways_impact')}</p>
            <ol>
              <li>
                <span style={{ color: theme.colors.land }}>{t('land_use')}</span>
                <ul>
                  <li>
                    Our food production systems use{' '}
                    <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food#half-of-the-world-s-habitable-land-is-used-for-agriculture">
                      almost half
                    </ExternalLink>{' '}
                    of Earth's habitable land.
                  </li>
                </ul>
              </li>
              <li>
                <span style={{ color: theme.colors.ghg }}>{t('ghg_emissions')}</span>
                <ul>
                  <li>
                    Our food production systems are responsible for{' '}
                    <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food#food-production-is-responsible-for-one-quarter-of-the-world-s-greenhouse-gas-emissions">
                      about 26%
                    </ExternalLink>{' '}
                    of our global greenhouse gas emissions.
                  </li>
                </ul>
              </li>
              <li>
                <span style={{ color: theme.colors.water }}>{t('water_withdrawals')}</span>
                <ul>
                  <li>
                    Our food production systems are responsible for{' '}
                    <ExternalLink href="https://ourworldindata.org/water-use-stress#share-of-freshwater-withdrawals-used-in-agriculture">
                      about 70%
                    </ExternalLink>{' '}
                    of our yearly global water withdrawals.
                  </li>
                </ul>
              </li>
              <li>
                <span style={{ color: theme.colors.eutro }}>{t('eutrophying_emissions')}</span>
                <ul>
                  <li>
                    Our food production systems' runoff of nitrogen and other nutrients are{' '}
                    <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food#eutrophying-emissions-from-food">
                      a leading contributor
                    </ExternalLink>{' '}
                    to the major environmental problem of eutrophying emissions.
                  </li>
                </ul>
              </li>
            </ol>
            <CardTitle sub>The story so far</CardTitle>
            <p>
              The Foodprint Calculator was built by{' '}
              <ExternalLink href="http://ethicode.org/">Ethicode</ExternalLink> and deployed in May
              2020 as a proof of concept. It has since been under active development, and in August
              2020, there was a significant update, introducing user signup and database storage for
              their meals.
            </p>
          </AboutSection>
          <AboutSection title="Data sources" isOpen={openSection === 'sources'}>
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
            <p>
              This extensive data has graciously been made available for everyone to use, and the
              Foodprint Calculator uses it to determine the environmental impact of any meal, given
              its ingredients.
            </p>
          </AboutSection>
          <AboutSection title="Recommended daily amounts" isOpen={openSection === 'rda'}>
            <p>
              Earth has a finite amount of resources that we all share. Food production takes up
              many of these resources, especially when it comes to land use, greenhouse gas
              emissions, water withdrawals, and eutrophying emissions. The Foodprint Calculator
              considers an RDA (recommended daily amount) for each of these categories, using the
              following derivation:
            </p>
            <CardTitle sub color={theme.colors.land}>
              <span className="header-icon">
                <FaTractor />
              </span>
              Land use
            </CardTitle>
            <p>
              Earth has about 104 million km² of habitable land, and almost half of that is used for
              agriculture or{' '}
              <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food#half-of-the-world-s-habitable-land-is-used-for-agriculture">
                51 million km²
              </ExternalLink>
              . If we divide that by the current population, 7.78 billion people, we get 6.555 m²
              per person or about 18 m² per day. Therefore the Foodprint Calculator considers that
              to be the RDA for an individual's land use.
            </p>
            <CardTitle sub color={theme.colors.ghg}>
              <span className="header-icon">
                <FaSmog />
              </span>
              Greenhouse gas emissions
            </CardTitle>
            <p>
              Food is responsible for about{' '}
              <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food#food-production-is-responsible-for-one-quarter-of-the-world-s-greenhouse-gas-emissions">
                26% of our global greenhouse gas emissions
              </ExternalLink>
              , or 13.6 billion tonnes of carbon dioxide equivalents. That calculates to 1.75 tonnes
              per person or an RDA of about 4.8 kg for each individual.
            </p>
            <CardTitle sub color={theme.colors.water}>
              <span className="header-icon">
                <FaTint />
              </span>
              Water withdrawals
            </CardTitle>
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
            <CardTitle sub color={theme.colors.eutro}>
              <span className="header-icon">
                <FaTint />
              </span>
              Eutrophying emissions
            </CardTitle>
            <p>
              Eutrophying emissions are about{' '}
              <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food#eutrophying-emissions-from-food">
                12.45 kgPO₄eq on average for all food types per 1000 kcal
              </ExternalLink>
              . The recommended daily calorie intake is{' '}
              <ExternalLink href="https://www.nhs.uk/common-health-questions/food-and-diet/what-should-my-daily-intake-of-calories-be/">
                2,000 kcal a day for women and 2,500 for men
              </ExternalLink>{' '}
              or 2,250 on average. Therefore, we can consider 28 kgPO₄eq the RDA of eutrophying
              emissions.
            </p>
            <p>
              In each of these four categories, we're only aiming to prevent these global numbers
              from growing even further, although we should be aiming to reduce them. However, we
              have to start somewhere!
            </p>
          </AboutSection>
          <AboutSection title="How to use" isOpen={openSection === 'how-to-use'}>
            <p>
              When adding ingredients from a recipe, these important considerations should be made:
            </p>
            <CardTitle sub>Sub-ingredients</CardTitle>
            <p>
              Some ingredients contain a bunch of other elements. The most accurate method is to add
              an ingredient for each such sub-element. Nevertheless, in many cases, it should be
              enough only to add the main ingredient. E.g., most kinds of ketchup contain some other
              ingredients than tomatoes, but tomatoes make up the bulk of the ketchup. Therefore, it
              should be considered accurate enough to add "Tomatoes" for ketchup, especially for
              smaller amounts.
            </p>
            <CardTitle sub>Dried ingredients</CardTitle>
            <p>
              Adding dried ingredients that are not in our database can be tricky. The most accurate
              method is to enter the amount needed of the ingredients' fresh version to produce the
              dried version amount. However, for simplicity, we can use these rules of thumb:
            </p>
            <ol>
              <li>Multiply dried fruits by a factor of 3</li>
              <li>Multiply leafy herbs and vegetables by a factor of 6</li>
              <li>Multiply high water content ingredients by a factor of 9</li>
            </ol>
            <p>
              Note that these calculations are not needed when adding quantities, e.g., one apple is
              the same as one dried apple and uses the same resources regardless of their weight
              post dehydration.
            </p>
            <CardTitle sub>Beef herds vs. dairy herds</CardTitle>
            <p>
              When selecting beef, you will notice two entries in the data, beef from dairy herds
              and beef specifically grown from beef herds. This is because there is such a
              significant difference in their environmental impacts that the researchers decided to
              separate them into two categories. Beef from dairy herds has proportionally much less
              impact because it also contributes to dairy production. Each of the categories make up
              about{' '}
              <ExternalLink href="https://beefandlamb.ahdb.org.uk/wp-content/uploads/2017/08/Beef-production-from-the-dairy-herd.pdf">
                half of the market
              </ExternalLink>
              , and it's often difficult to differentiate from which sector your beef comes.
              However, beef herd beef is generally considered leaner and of higher quality than
              dairy herd beef.
            </p>
          </AboutSection>
          <AboutSection title="How accurate is it?" isOpen={openSection === 'accuracy'}>
            <p>
              The results accumulated by the Foodprint Calculator should not be regarded as an exact
              science but rather a rough estimation. The environmental impact of each food product
              type varies considerably between individual products and productions. However, given
              that the data being used for the Foodprint Calculator is widely regarded as the most
              comprehensive and accurate data we have today, we can assume that it is as precise as
              it gets.
            </p>
          </AboutSection>
          <AboutSection title="Support" isOpen={openSection === 'support'}>
            <p>
              If you have any questions or feedback, bug reports or feature requests, or require
              assistance, please reach out to us at{' '}
              <ExternalLink email href="mailto:ethicode@ethicode.org">
                ethicode@ethicode.org
              </ExternalLink>
              .
            </p>
          </AboutSection>
        </Card>
      </Content>
      <style jsx>{`
        .how-to-use {
          margin-top: 20px;
        }
        .header-icon {
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
        li {
          margin-bottom: 10px;
        }
      `}</style>
    </Layout>
  );
};

About.getInitialProps = async () => ({
  namespacesRequired: ['common', 'about'],
});

export default withTranslation('about')(About);
