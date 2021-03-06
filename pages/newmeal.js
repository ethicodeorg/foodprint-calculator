import { withTranslation } from '../i18n';
import MealForm from '../components/MealForm';
import Layout from '../components/MyLayout';

const NewMeal = ({ t }) => (
  <Layout title={t('new_meal')} t={t}>
    <MealForm t={t} />
  </Layout>
);

NewMeal.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(NewMeal);
