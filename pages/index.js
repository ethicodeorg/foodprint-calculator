import Header from '../components/Header';
import Layout from '../components/MyLayout';
import Content from '../components/Content';
import MealLink from '../components/MealLink';

export default function Index() {
  return (
    <Layout>
      <Header activePage="home" />
      <Content>
        <h2>Foodprint calculator</h2>
        <div>Calculate the environmental footprint of your meals</div>
        <MealLink id="new" title="Let's Calculate!" />
      </Content>
    </Layout>
  );
}
