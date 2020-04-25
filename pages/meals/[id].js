import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Autocomplete from 'react-autocomplete';
import Select from 'react-select';
import {
  getLandUseTotal,
  getGHGTotal,
  getWaterTotal,
  getEutroTotal,
} from '../../utils/calculations';
import Header from '../../components/Header';
import Layout from '../../components/MyLayout';
import Content from '../../components/Content';
import Pies from '../../components/Pies';
import TinyPies from '../../components/TinyPies';
import Ingredients from '../../components/Ingredients';
import NewMeal from '../newmeal';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

export default () => {
  const { data, error } = useSWR('/api/initialize', fetcher);
  const router = useRouter();

  if (router.query.id === 'new') {
    return <NewMeal />;
  }

  const { data: meal, error: mealError } = useSWR(`/api/meals/${router.query.id}`, fetcher);

  return (
    <Layout>
      <Header activePage="meals" />
      {meal ? (
        <Content>
          <h2>{meal.title}</h2>
          <Ingredients ingredients={meal.ingredients} />
          <h3>Meal total</h3>
          <Pies meal={meal} />
        </Content>
      ) : (
        <Content>Loading...</Content>
      )}
    </Layout>
  );
};
