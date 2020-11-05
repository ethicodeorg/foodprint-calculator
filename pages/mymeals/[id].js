import { useRouter } from 'next/router';
import { withTranslation } from '../../i18n';
import MealForm from '../../components/MealForm';
import Layout from '../../components/MyLayout';

const Meal = ({ t }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout title={t('edit_meal')} t={t}>
      <MealForm id={id} t={t} />
    </Layout>
  );
};

export default withTranslation('common')(Meal);
