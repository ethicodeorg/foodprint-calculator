import { useRouter } from 'next/router';
import { FaTractor, FaTint, FaSmog } from 'react-icons/fa';
import { withTranslation } from '../i18n';
import { splitTranslationWithLink, SPLITTER } from '../utils/translationUtils';
import {
  AHDB,
  BEEF_TYPES,
  DAILY_KCAL,
  ETHICODE,
  ETHICODE_EMAIL,
  FOOD_DIET,
  FRESHWATER,
  GLOBAL_EUTRO,
  GLOBAL_GHG,
  GLOBAL_LAND,
  GLOBAL_WATER,
  MAIN,
  NHS,
  OWID,
  POORE_NEMECEK,
  SCIENCEMAG,
  TEAM,
  U_2017_08,
  WATER,
} from '../utils/links';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import Content from '../components/Content';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import ExternalLink from '../components/ExternalLink';
import AboutSection from '../components/AboutSection';
import theme from '../styles/theme';
import TextAndChart from '../components/TextAndChart';

const About = ({ t }) => {
  const router = useRouter();
  const { openSection = 'project' } = router.query;
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
          <AboutSection title={t('project')} isOpen={openSection === 'project'}>
            <p>{t('food_e_purpose')}</p>
            <CardTitle sub color={theme.colors.white}>
              {t('why_question')}
            </CardTitle>
            <p>
              {t('why_answer_1')} {t('why_answer_2')}
            </p>
            <p>{t('four_ways_impact')}</p>
            <div>
              <h4>1. {t('land_use')}</h4>
              <TextAndChart
                total={104}
                data={[
                  {
                    name: t('global_habitable_land'),
                    food: 51,
                    other: 53,
                  },
                ]}
                title={t('global_habitable_land')}
                text={landUseText}
                source={`${OWID}/${MAIN}#${GLOBAL_LAND}`}
                unit={t('million_km_2')}
                fill={theme.colors.land}
                interval={2}
                t={t}
              />
            </div>
            <div>
              <h4>2. {t('ghg_emissions')}</h4>
              <TextAndChart
                total={52.3}
                data={[
                  {
                    name: t('global_annual_emissions'),
                    food: 13.6,
                    other: 38.7,
                  },
                ]}
                title={t('global_annual_emissions')}
                text={ghgEmissionsText}
                source={`${OWID}/${MAIN}#${GLOBAL_GHG}`}
                unit={t('billion_tonnes')}
                fill={theme.colors.red}
                interval={2}
                t={t}
              />
            </div>
            <div>
              <h4>3. {t('water_withdrawals')}</h4>
              <TextAndChart
                total={4}
                data={[
                  {
                    name: t('global_annual_withdrawals'),
                    food: 2.8,
                    other: 1.2,
                  },
                ]}
                title={t('global_annual_withdrawals')}
                text={waterWithdrawalsText}
                source={`${OWID}/${WATER}#${GLOBAL_WATER}`}
                unit={t('trillion_m_3')}
                fill={theme.colors.water}
                interval={3}
                t={t}
              />
            </div>
            <div>
              <h4>4. {t('eutrophying_emissions')}</h4>
              <TextAndChart
                total={100}
                data={[
                  {
                    name: t('global_annual_emissions'),
                    food: 78,
                    other: 22,
                  },
                ]}
                title={t('global_annual_emissions')}
                text={eutrophyingEmissionsText}
                source={`${OWID}/${MAIN}#${GLOBAL_EUTRO}`}
                unit={t('percent')}
                fill={theme.colors.eutro}
                interval={3}
                t={t}
              />
            </div>
          </AboutSection>
          <AboutSection title={t('how_does_it_work')} isOpen={openSection === 'function'}>
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
          <AboutSection title={t('rda_title')} isOpen={openSection === 'rda'}>
            <p>{t('rda_text')}</p>
            <CardTitle sub color={theme.colors.green}>
              <span className="header-icon">
                <FaTractor />
              </span>
              {t('land_use')}
            </CardTitle>
            <p>
              {landUseRDA.beforeLink}
              <ExternalLink color={theme.colors.aqua} href={`${OWID}/${MAIN}#${GLOBAL_LAND}`}>
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
              <ExternalLink color={theme.colors.aqua} href={`${OWID}/${MAIN}#${GLOBAL_GHG}`}>
                {ghgEmissionsRDA.linkText}
              </ExternalLink>
              {ghgEmissionsRDA.afterLink}
            </p>
            <CardTitle sub color={theme.colors.aqua}>
              <span className="header-icon">
                <FaTint />
              </span>
              {t('water_withdrawals')}
            </CardTitle>
            <p>
              {waterWithdrawalsRDA.beforeLink}
              <ExternalLink color={theme.colors.aqua} href={`${OWID}/${WATER}#${FRESHWATER}`}>
                {waterWithdrawalsRDA.linkText}
              </ExternalLink>{' '}
              {waterWithdrawalsRDA.afterLink}
              <ExternalLink color={theme.colors.aqua} href={`${OWID}/${WATER}#${GLOBAL_WATER}`}>
                {waterWithdrawalsRDA.linkText2}
              </ExternalLink>
              {waterWithdrawalsRDA.afterLink2}
            </p>
            <CardTitle sub color={theme.colors.fuchsia}>
              <span className="header-icon">
                <FaTint />
              </span>
              {t('eutrophying_emissions')}
            </CardTitle>
            <p>
              {eutrophyingEmissionsRDA.beforeLink}
              <ExternalLink color={theme.colors.aqua} href={`${OWID}/${MAIN}#${GLOBAL_EUTRO}`}>
                {eutrophyingEmissionsRDA.linkText}
              </ExternalLink>
              {eutrophyingEmissionsRDA.afterLink}
              <ExternalLink color={theme.colors.aqua} href={`${NHS}/${FOOD_DIET}/${DAILY_KCAL}`}>
                {eutrophyingEmissionsRDA.linkText2}
              </ExternalLink>{' '}
              {eutrophyingEmissionsRDA.afterLink2} {t('eutrophying_emissions_method')}
            </p>
            <p>{t('pie-chart-explanation')}</p>
            <p>{t('rda_future')}</p>
          </AboutSection>
          <AboutSection title={t('how_to_use_title')} isOpen={openSection === 'how-to-use'}>
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
              <ExternalLink color={theme.colors.aqua} href={`${AHDB}/${U_2017_08}/${BEEF_TYPES}`}>
                {beefDairyHerdsText.linkText}
              </ExternalLink>
              {beefDairyHerdsText.afterLink}
            </p>
          </AboutSection>
          <AboutSection title={t('data_title')} isOpen={openSection === 'sources'}>
            <p>
              {dataText.beforeLink}
              <ExternalLink color={theme.colors.aqua} href={`${OWID}/${MAIN}`}>
                {dataText.linkText}
              </ExternalLink>
              {dataText.afterLink}
              <ExternalLink color={theme.colors.aqua} href={`${SCIENCEMAG}/${POORE_NEMECEK}`}>
                {dataText.linkText2}
              </ExternalLink>
              {dataText.afterLink2}
            </p>
            <p>{t('data_text_2')}</p>
          </AboutSection>
          <AboutSection title={t('accuracy_title')} isOpen={openSection === 'accuracy'}>
            <p>{t('accuracy_text')}</p>
          </AboutSection>
          <AboutSection title={t('origin_title')} isOpen={openSection === 'origin'}>
            <p>
              <span className="quote">"{t('origin')}"</span> — {t('origin_quote_by')}
            </p>
          </AboutSection>
          <AboutSection title={t('story_title')} isOpen={openSection === 'story'}>
            <p>
              {t('story_text')} {t('story_text_2')}{' '}
              <ExternalLink color={theme.colors.aqua} href={`${ETHICODE}/${TEAM}`}>
                {t('meet_the_team')}
              </ExternalLink>
            </p>
          </AboutSection>
          <AboutSection title={t('support_title')} isOpen={openSection === 'support'}>
            <p>
              {supportText.beforeLink}
              <ExternalLink color={theme.colors.aqua} email href={`mailto:${ETHICODE_EMAIL}`}>
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
        .quote {
          font-style: italic;
        }
        li {
          margin-bottom: 10px;
          line-height: 1.4;
        }
        p {
          line-height: 1.4;
        }
        h4 {
          margin-top: 30px;
        }
      `}</style>
    </Layout>
  );
};

About.getInitialProps = async () => ({
  namespacesRequired: ['common', 'about'],
});

export default withTranslation('about')(About);
