import Header from '../components/Header';
import Layout from '../components/MyLayout';
import Content from '../components/Content';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';

export default function About() {
  return (
    <Layout>
      <Header activePage="about" />
      <Content>
        <PageTitle>About the calculator</PageTitle>
        <Card>
          <p>
            All the data used in this calculator is provided by Poore, J., & Nemecek, T. (2018).{' '}
            <a href="https://science.sciencemag.org/content/360/6392/987">
              Reducing food’s environmental impacts through producers and consumers
            </a>
            . Science, 360(6392), 987-992.
          </p>
          <p>
            Earth has about 104 million km² of habitable land and almost half of that is used for
            agriculture or 51 million km². If we divide that by the current population, 7.78 billion
            people, we get 6.555 m² per person, or about 18 m² per day. Therefore this calculator
            considers that to be the recommended daily allowance (RDA) for land use.
          </p>
          <p>
            Each year, global water withdrawals are about 4 trillion m³ of which 70% is used by our
            agriculture. Divide that amongst the population, we get about 360 m³ or a RDA of about 1
            m³ (1000 liters) of water per day.
          </p>
          <p>
            Food is responsible for about 26% of our global greenhouse gas emissions, or 13.6
            billion tonnes of carbon dioxide equivalents. If we only aim to keep that amount as is,
            although we should be trying to reduce it, that calculates to 1.75 tonnes per person or
            a RDA of about 4.8 kg.
          </p>
          <p>
            Eutrophying emissions are about 12.45 kgPO₄eq on average for all food types per 1000
            kcal. The recommended daily calorie intake is 2,000 kcal a day for women and 2,500 for
            men or 2,250 on average. Again, if we only aim to not increase this amount, which we
            should be aiming to reduce, we can consider 28 kgPO₄eq the RDA of eutrophying emissions.
          </p>
        </Card>
      </Content>
    </Layout>
  );
}
