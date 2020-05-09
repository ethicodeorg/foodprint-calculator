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
import { getCookie } from '../../utils/cookieUtils';
import Header from '../../components/Header';
import Layout from '../../components/MyLayout';
import Content from '../../components/Content';
import Pies from '../../components/Pies';
import TinyPies from '../../components/TinyPies';
import Ingredients from '../../components/Ingredients';
import Card from '../../components/Card';
import CardTitle from '../../components/CardTitle';
import PageTitle from '../../components/PageTitle';

const Meal = () => {
  const router = useRouter();
  const mealId = router.asPath.split('/').slice(-1)[0];
  const meals =
    typeof window !== 'undefined' ? JSON.parse(getCookie('meals', document.cookie)) : [];
  const meal = meals.find((m) => m.id === mealId);

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

export default Meal;
