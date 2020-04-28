import Header from '../components/Header';
import Layout from '../components/MyLayout';
import Content from '../components/Content';
import MealLink from '../components/MealLink';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';

export default function Index() {
  return (
    <Layout>
      <Header activePage="home" />
      <Content>
        <PageTitle>Foodprint calculator</PageTitle>
        <p>Calculate the environmental footprint of your meals</p>
        <MealLink id="new">
          <Button primary>Let's Calculate!</Button>
        </MealLink>
      </Content>
    </Layout>
  );
}
