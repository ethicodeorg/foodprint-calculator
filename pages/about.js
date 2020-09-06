import { useRouter } from 'next/router';
import { FaTractor, FaTint, FaSmog } from 'react-icons/fa';
import { withTranslation } from '../i18n';
import { splitTranslationWithLink } from '../utils/translationUtils';
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
  const landUseText = splitTranslationWithLink(t('land_use_text'));
  const ghgEmissionsText = splitTranslationWithLink(t('ghg_emissions_text'));
  const waterWithdrawalsText = splitTranslationWithLink(t('water_withdrawals_text'));
  const eutrophyingEmissionsText = splitTranslationWithLink(t('eutrophying_emissions_text'));
  const landUseRDA = splitTranslationWithLink(t('land_use_rda'));
  const ghgEmissionsRDA = splitTranslationWithLink(t('ghg_emissions_rda'));
  const waterWithdrawalsRDA = splitTranslationWithLink(t('water_withdrawals_rda'));
  const eutrophyingEmissionsRDA = splitTranslationWithLink(t('eutrophying_emissions_rda'));
  const storyText = splitTranslationWithLink(t('story_text'));
  const dataText = splitTranslationWithLink(t('data_text_1'));
  const beefDairyHerdsText = splitTranslationWithLink(t('beef_dairy_herds_text'));
  const supportText = splitTranslationWithLink(t('support_text'));

  return (
    <Layout title={t('about')} t={t}>
      <Header />
      <Content>
        <PageTitle>{t('about_fc')}</PageTitle>
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
                    {landUseText.beforeLink}
                    <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food#half-of-the-world-s-habitable-land-is-used-for-agriculture">
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
                    <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food#food-production-is-responsible-for-one-quarter-of-the-world-s-greenhouse-gas-emissions">
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
                    <ExternalLink href="https://ourworldindata.org/water-use-stress#share-of-freshwater-withdrawals-used-in-agriculture">
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
                    <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food#eutrophying-emissions-from-food">
                      {eutrophyingEmissionsText.linkText}
                    </ExternalLink>{' '}
                    {eutrophyingEmissionsText.afterLink}
                  </li>
                </ul>
              </li>
            </ol>
            <CardTitle sub>{t('story_title')}</CardTitle>
            <p>
              {storyText.beforeLink}
              <ExternalLink href="http://ethicode.org/">{storyText.linkText}</ExternalLink>
              {storyText.afterLink}
            </p>
          </AboutSection>
          <AboutSection title={t('data_title')} isOpen={openSection === 'sources'}>
            <p>
              {dataText.beforeLink}
              <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food">
                {dataText.linkText}
              </ExternalLink>
              {dataText.afterLink}
              <ExternalLink href="https://science.sciencemag.org/content/360/6392/987">
                {dataText.linkText2}
              </ExternalLink>
              {dataText.afterLink2}
            </p>
            <p>{t('data_text_2')}</p>
          </AboutSection>
          <AboutSection title={t('rda_title')} isOpen={openSection === 'rda'}>
            <p>{t('rda_text')}</p>
            <CardTitle sub color={theme.colors.land}>
              <span className="header-icon">
                <FaTractor />
              </span>
              {t('land_use')}
            </CardTitle>
            <p>
              {landUseRDA.beforeLink}
              <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food#half-of-the-world-s-habitable-land-is-used-for-agriculture">
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
              <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food#food-production-is-responsible-for-one-quarter-of-the-world-s-greenhouse-gas-emissions">
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
              <ExternalLink href="https://ourworldindata.org/water-use-stress#global-freshwater-use">
                {waterWithdrawalsRDA.linkText}
              </ExternalLink>{' '}
              {waterWithdrawalsRDA.afterLink}
              <ExternalLink href="https://ourworldindata.org/water-use-stress#share-of-freshwater-withdrawals-used-in-agriculture">
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
              <ExternalLink href="https://ourworldindata.org/environmental-impacts-of-food#eutrophying-emissions-from-food">
                {eutrophyingEmissionsRDA.linkText}
              </ExternalLink>
              {eutrophyingEmissionsRDA.afterLink}
              <ExternalLink href="https://www.nhs.uk/common-health-questions/food-and-diet/what-should-my-daily-intake-of-calories-be/">
                {eutrophyingEmissionsRDA.linkText2}
              </ExternalLink>{' '}
              {eutrophyingEmissionsRDA.afterLink2}
            </p>
            <p>{t('rda_future')}</p>
          </AboutSection>
          <AboutSection title={t('how_to_use_title')} isOpen={openSection === 'how-to-use'}>
            <p>{t('how_to_use_text')}</p>
            <CardTitle sub>{t('sub_ingredients_title')}</CardTitle>
            <p>{t('sub_ingredients_text')}</p>
            <CardTitle sub>{t('dried_ingredients_title')}</CardTitle>
            <p>{t('dried_ingredients_text')}</p>
            <ol>
              <li>{t('dried_ingredients_point_1')}</li>
              <li>{t('dried_ingredients_point_2')}</li>
              <li>{t('dried_ingredients_point_3')}</li>
            </ol>
            <p>{t('dried_ingredients_text_2')}</p>
            <CardTitle sub>{t('beef_dairy_herds_title')}</CardTitle>
            <p>
              {beefDairyHerdsText.beforeLink}
              <ExternalLink href="https://beefandlamb.ahdb.org.uk/wp-content/uploads/2017/08/Beef-production-from-the-dairy-herd.pdf">
                {beefDairyHerdsText.linkText}
              </ExternalLink>
              {beefDairyHerdsText.afterLink}
            </p>
          </AboutSection>
          <AboutSection title={t('accuracy_title')} isOpen={openSection === 'accuracy'}>
            <p>{t('accuracy_text')}</p>
          </AboutSection>
          <AboutSection title={t('support_title')} isOpen={openSection === 'support'}>
            <p>
              {supportText.beforeLink}
              <ExternalLink email href="mailto:ethicode@ethicode.org">
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
        }
      `}</style>
    </Layout>
  );
};

About.getInitialProps = async () => ({
  namespacesRequired: ['common', 'about'],
});

export default withTranslation('about')(About);
