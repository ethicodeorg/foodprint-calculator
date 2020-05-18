import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import MealsPage from '../components/MealsPage';

const Meals = ({ meals }) => {
  return (
    <Layout>
      <Header activePage="meals" />
      <MealsPage
        meals={meals}
        title="My Meals"
        emptyMessage="You have not saved any meals"
        showCreateButton
        showEditButton
        showDeleteButton
      />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  meals: state.meals,
});

export default connect(mapStateToProps)(Meals);
