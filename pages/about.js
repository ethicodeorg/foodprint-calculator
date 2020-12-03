import { useRouter } from 'next/router';
import { FaTractor, FaTint, FaSmog } from 'react-icons/fa';
import { withTranslation } from '../i18n';
import { splitTranslationWithLink, SPLITTER } from '../utils/translationUtils';
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
  const { openSection } = router.query;
  const landUseText = splitTranslationWithLink(t('land_use_text', SPLITTER));
  const ghgEmissionsText = splitTranslationWithLink(t('ghg_emissions_text', SPLITTER));
  const waterWithdrawalsText = splitTranslationWithLink(t('water_withdrawals_text', SPLITTER));
  const eutrophyingEmissionsText = splitTranslationWithLink(
    t('eutrophying_emissions_text', SPLITTER)
  );
  const landUseRDA = splitTranslationWithLink(t('land_use_rda', SPLITTER));
  const ghgEmissionsRDA = splitTranslationWithLink(t('ghg_emissions_rda', SPLITTER));
  const waterWithdrawalsRDA = splitTranslationWithLink(t('water_withdrawals_rda', SPLITTER));
  const eutrophyingEmissionsRDA = splitTranslationWithLink(
    t('eutrophying_emissions_rda', SPLITTER)
  );
  const storyText = splitTranslationWithLink(t('story_text', SPLITTER));
  const dataText = splitTranslationWithLink(t('data_text_1', SPLITTER));
  const beefDairyHerdsText = splitTranslationWithLink(t('beef_dairy_herds_text', SPLITTER));
  const supportText = splitTranslationWithLink(t('support_text', SPLITTER));

  return (
    <Layout title={t('about')} t={t} showFloater>
      <Header />
      <Content>
        <PageTitle>{t('about_fc')}</PageTitle>
        <Card seeThrough dark>
          <AboutSection title={t('project')} isOpen={openSection === 'project' || !openSection}>
            <p>{t('food_e_purpose')}</p>
            <CardTitle sub color={theme.colors.white}>
              {t('why_question')}
            </CardTitle>
            <p>
              {t('why_answer_1')} {t('why_answer_2')}
            </p>
            <p>{t('four_ways_impact')}</p>
            <ol>
              <li>
                <span style={{ color: theme.colors.land }}>{t('land_use')}</span>
                <ul>
                  <li>
                    {landUseText.beforeLink}
                    <ExternalLink
                      color={theme.colors.aqua}
                      href="https://ourworldindata.org/environmental-impacts-of-food#half-of-the-world-s-habitable-land-is-used-for-agriculture"
                    >
                      {landUseText.linkText}
                    </ExternalLink>{' '}
                    {landUseText.afterLink}
                  </li>
                </ul>
              </li>
              <li>
                <span style={{ color: theme.colors.ghg }}>{t('ghg_emissions')}</span>
                <ul>
                  <li>
                    {ghgEmissionsText.beforeLink}
                    <ExternalLink
                      color={theme.colors.aqua}
                      href="https://ourworldindata.org/environmental-impacts-of-food#food-production-is-responsible-for-one-quarter-of-the-world-s-greenhouse-gas-emissions"
                    >
                      {ghgEmissionsText.linkText}
                    </ExternalLink>{' '}
                    {ghgEmissionsText.afterLink}
                  </li>
                </ul>
              </li>
              <li>
                <span style={{ color: theme.colors.water }}>{t('water_withdrawals')}</span>
                <ul>
                  <li>
                    {waterWithdrawalsText.beforeLink}
                    <ExternalLink
                      color={theme.colors.aqua}
                      href="https://ourworldindata.org/water-use-stress#share-of-freshwater-withdrawals-used-in-agriculture"
                    >
                      {waterWithdrawalsText.linkText}
                    </ExternalLink>{' '}
                    {waterWithdrawalsText.afterLink}
                  </li>
                </ul>
              </li>
              <li>
                <span style={{ color: theme.colors.eutro }}>{t('eutrophying_emissions')}</span>
                <ul>
                  <li>
                    {eutrophyingEmissionsText.beforeLink}
                    <ExternalLink
                      color={theme.colors.aqua}
                      href="https://ourworldindata.org/environmental-impacts-of-food#eutrophying-emissions-from-food"
                    >
                      {eutrophyingEmissionsText.linkText}
                    </ExternalLink>{' '}
                    {eutrophyingEmissionsText.afterLink}
                  </li>
                </ul>
              </li>
            </ol>
          </AboutSection>
          <AboutSection
            title={t('how_does_it_work')}
            isOpen={openSection === 'function' || !openSection}
          >
            <p>{t('function')}</p>
            <ol>
              <li>{t('land_use_units')}</li>
              <li>{t('ghg_units')}</li>
              <li>{t('water_units')}</li>
              <li>{t('eutro_units')}</li>
            </ol>
            <p>{t('function_in_action')}</p>
            <p>{t('ghg_complexity')}</p>
            <ul>
              <li>{t('land_use_change')}</li>
              <li>{t('farm')}</li>
              <li>{t('animal_feed')}</li>
              <li>{t('processing')}</li>
              <li>{t('transport')}</li>
              <li>{t('retail')}</li>
              <li>{t('packaging')}</li>
            </ul>
            <p>{t('optional_transport')}</p>
          </AboutSection>
          <AboutSection title={t('data_title')} isOpen={openSection === 'sources' || !openSection}>
            <p>
              {dataText.beforeLink}
              <ExternalLink
                color={theme.colors.aqua}
                href="https://ourworldindata.org/environmental-impacts-of-food"
              >
                {dataText.linkText}
              </ExternalLink>
              {dataText.afterLink}
              <ExternalLink
                color={theme.colors.aqua}
                href="https://science.sciencemag.org/content/360/6392/987"
              >
                {dataText.linkText2}
              </ExternalLink>
              {dataText.afterLink2}
            </p>
            <p>{t('data_text_2')}</p>
          </AboutSection>
          <AboutSection title={t('rda_title')} isOpen={openSection === 'rda' || !openSection}>
            <p>{t('rda_text')}</p>
            <CardTitle sub color={theme.colors.land}>
              <span className="header-icon">
                <FaTractor />
              </span>
              {t('land_use')}
            </CardTitle>
            <p>
              {landUseRDA.beforeLink}
              <ExternalLink
                color={theme.colors.aqua}
                href="https://ourworldindata.org/environmental-impacts-of-food#half-of-the-world-s-habitable-land-is-used-for-agriculture"
              >
                {landUseRDA.linkText}
              </ExternalLink>
              {landUseRDA.afterLink}
            </p>
            <CardTitle sub color={theme.colors.ghg}>
              <span className="header-icon">
                <FaSmog />
              </span>
              {t('ghg_emissions')}
            </CardTitle>
            <p>
              {ghgEmissionsRDA.beforeLink}
              <ExternalLink
                color={theme.colors.aqua}
                href="https://ourworldindata.org/environmental-impacts-of-food#food-production-is-responsible-for-one-quarter-of-the-world-s-greenhouse-gas-emissions"
              >
                {ghgEmissionsRDA.linkText}
              </ExternalLink>
              {ghgEmissionsRDA.afterLink}
            </p>
            <CardTitle sub color={theme.colors.water}>
              <span className="header-icon">
                <FaTint />
              </span>
              {t('water_withdrawals')}
            </CardTitle>
            <p>
              {waterWithdrawalsRDA.beforeLink}
              <ExternalLink
                color={theme.colors.aqua}
                href="https://ourworldindata.org/water-use-stress#global-freshwater-use"
              >
                {waterWithdrawalsRDA.linkText}
              </ExternalLink>{' '}
              {waterWithdrawalsRDA.afterLink}
              <ExternalLink
                color={theme.colors.aqua}
                href="https://ourworldindata.org/water-use-stress#share-of-freshwater-withdrawals-used-in-agriculture"
              >
                {waterWithdrawalsRDA.linkText2}
              </ExternalLink>
              {waterWithdrawalsRDA.afterLink2}
            </p>
            <CardTitle sub color={theme.colors.eutro}>
              <span className="header-icon">
                <FaTint />
              </span>
              {t('eutrophying_emissions')}
            </CardTitle>
            <p>
              {eutrophyingEmissionsRDA.beforeLink}
              <ExternalLink
                color={theme.colors.aqua}
                href="https://ourworldindata.org/environmental-impacts-of-food#eutrophying-emissions-from-food"
              >
                {eutrophyingEmissionsRDA.linkText}
              </ExternalLink>
              {eutrophyingEmissionsRDA.afterLink}
              <ExternalLink
                color={theme.colors.aqua}
                href="https://www.nhs.uk/common-health-questions/food-and-diet/what-should-my-daily-intake-of-calories-be/"
              >
                {eutrophyingEmissionsRDA.linkText2}
              </ExternalLink>{' '}
              {eutrophyingEmissionsRDA.afterLink2}
            </p>
            <p>{t('pie-chart-explanation')}</p>
            <p>{t('rda_future')}</p>
          </AboutSection>
          <AboutSection
            title={t('how_to_use_title')}
            isOpen={openSection === 'how-to-use' || !openSection}
          >
            <p>{t('how_to_use_text')}</p>
            <CardTitle sub color={theme.colors.white}>
              {t('sub_ingredients_title')}
            </CardTitle>
            <p>{t('sub_ingredients_text')}</p>
            <CardTitle sub color={theme.colors.white}>
              {t('dried_ingredients_title')}
            </CardTitle>
            <p>{t('dried_ingredients_text')}</p>
            <ol>
              <li>{t('dried_ingredients_point_1')}</li>
              <li>{t('dried_ingredients_point_2')}</li>
              <li>{t('dried_ingredients_point_3')}</li>
            </ol>
            <p>{t('dried_ingredients_text_2')}</p>
            <CardTitle sub color={theme.colors.white}>
              {t('beef_dairy_herds_title')}
            </CardTitle>
            <p>
              {beefDairyHerdsText.beforeLink}
              <ExternalLink
                color={theme.colors.aqua}
                href="https://beefandlamb.ahdb.org.uk/wp-content/uploads/2017/08/Beef-production-from-the-dairy-herd.pdf"
              >
                {beefDairyHerdsText.linkText}
              </ExternalLink>
              {beefDairyHerdsText.afterLink}
            </p>
          </AboutSection>
          <AboutSection
            title={t('accuracy_title')}
            isOpen={openSection === 'accuracy' || !openSection}
          >
            <p>{t('accuracy_text')}</p>
          </AboutSection>
          <AboutSection title={t('story_title')} isOpen={openSection === 'story' || !openSection}>
            <p>
              {storyText.beforeLink}
              <ExternalLink color={theme.colors.aqua} href="http://ethicode.org/">
                {storyText.linkText}
              </ExternalLink>
              {storyText.afterLink}
            </p>
          </AboutSection>
          <AboutSection
            title={t('support_title')}
            isOpen={openSection === 'support' || !openSection}
          >
            <p>
              {supportText.beforeLink}
              <ExternalLink color={theme.colors.aqua} email href="mailto:ethicode@ethicode.org">
                {supportText.linkText}
              </ExternalLink>
              {supportText.afterLink}
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
          line-height: 1.4;
        }
        p {
          line-height: 1.4;
        }
      `}</style>
    </Layout>
  );
};

About.getInitialProps = async () => ({
  namespacesRequired: ['common', 'about'],
});

export default withTranslation('about')(About);
