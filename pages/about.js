import Header from '../components/Header';
import Layout from '../components/MyLayout';
import Content from '../components/Content';

export default function About() {
  return (
    <Layout>
      <Header activePage="about" />
      <Content>
        <p>This is the about page</p>
      </Content>
    </Layout>
  );
}
