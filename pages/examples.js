import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import MealsPage from '../components/MealsPage';

const Examples = ({ examples }) => {
  return (
    <Layout>
      <Header activePage="examples" />
      <MealsPage
        meals={examples}
        title="Example Meals"
        emptyMessage="Could not load examples at this time"
      />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  examples: state.examples,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Examples);
