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
import Card from '../../components/Card';
import NewMeal from '../newmeal';
import CardTitle from '../../components/CardTitle';
import PageTitle from '../../components/PageTitle';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

export default () => {
  const router = useRouter();
  const mealId = router.asPath.split('/').slice(-1)[0];

  if (mealId === 'new') {
    return <NewMeal />;
  }

  const { data: meal, error: mealError } = useSWR(
    `/api/meals${mealId !== '[id]' ? `/${mealId}` : ''}`,
    fetcher
  );

  return (
    <Layout>
      <Header activePage="meals" />
      {meal ? (
        <Content>
          <PageTitle>{meal.title}</PageTitle>
          {meal.about && (
            <Card>
              <CardTitle>About meal</CardTitle>
              <p>{`Serves ${meal.numberOfServings} ${
                meal.numberOfServings === 1 ? 'person' : 'people'
              }`}</p>
              <p>{meal.about}</p>
            </Card>
          )}
          <Card>
            <Pies meal={meal} numberOfServings={meal.numberOfServings} />
          </Card>
        </Content>
      ) : (
        <Content>Baking Pies...</Content>
      )}
    </Layout>
  );
};
