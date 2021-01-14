import React, { useState } from 'react';
import { Link } from '../i18n';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { FaCalculator } from 'react-icons/fa';
import Modal from 'react-modal';
import Select from 'react-select';
import useSWR from 'swr';
import { addMealToComparisons } from '../redux/actions/pageActions';
import { deleteLocalStorageMeal, getLocalStorageMeals } from '../utils/localStorageMeals';
import { useUser } from '../lib/hooks';
import Button from './Button';
import PageTitle from './PageTitle';
import Meal from './Meal';
import LoadingOnTop from './LoadingOnTop';
import Filters from './Filters';
import theme from '../styles/theme';
import InfoIcon from './InfoIcon';

Modal.setAppElement('#__next');

const fetcher = (url) => fetch(url).then((r) => r.json());

const MealsPage = ({
  meals,
  title,
  emptyMessage,
  comparisons,
  queries,
  isValidating,
  mutate,
  setLocalMeals,
  addMealToCompare,
  t,
  tooltipText,
}) => {
  const [user] = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mealIdToDelete, setMealIdToDelete] = useState('');
  const { data, error } = useSWR('/api/meals?visibility=public', fetcher);
  const mealOptions = data?.meals
    .filter((meal) => !comparisons?.includes(meal._id))
    .map((meal) => {
      return {
        value: meal._id,
        label: `${meal.title} - ${meal.user.name}`,
      };
    });
  const modalAnimationTime = 200;

  const confirmDelete = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);

    if (user) {
      await fetch('/api/meals', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mealId: mealIdToDelete, userId: user._id }),
      });

      mutate();
    } else {
      deleteLocalStorageMeal(mealIdToDelete);
      setLocalMeals(getLocalStorageMeals());
    }

    setIsLoading(false);
  };

  const deleteMeal = (meal) => {
    setShowConfirmModal(true);
    setMealIdToDelete(meal._id);
  };

  const addToComparisons = (mealId) => {
    addMealToCompare(mealId);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: 20,
      padding: '0 5px',
      backgroundColor: theme.colors.darkBackground,
      color: theme.colors.white,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: theme.colors.white,
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: theme.colors.darkBackground,
      color: theme.colors.white,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? theme.colors.aqua : theme.colors.darkBackground,
      color: state.isFocused ? theme.colors.darkBackground : theme.colors.white,
    }),
    input: (provided, state) => ({
      ...provided,
      color: theme.colors.white,
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: theme.colors.white,
    }),
  };

  return (
    <div className="meals-page">
      <PageTitle>
        {title}
        {tooltipText && <InfoIcon title={tooltipText} color={theme.colors.white} />}
      </PageTitle>
      {(isLoading || isValidating) && <LoadingOnTop blockUI />}
      {router.route === '/mymeals' && (
        <div className="buttons-container">
          <Button primary animate noPad>
            <Link href="/newmeal">
              <a className="create-meal">
                {t('create_meal')}
                <span className="calculator-container">
                  <FaCalculator />
                </span>
              </a>
            </Link>
          </Button>
        </div>
      )}
      {router.route === '/meals' && <Filters queries={queries} t={t} />}
      {router.route === '/compare' && (
        <div className="select-container">
          <Select
            placeholder={t('add_to_compare')}
            onChange={(val) => addToComparisons(val.value)}
            options={mealOptions}
            styles={customStyles}
            controlShouldRenderValue={false}
            instanceId="meal-finder"
          />
        </div>
      )}
      <div className="meals-container">
        {meals ? (
          meals.length ? (
            meals.map((meal) => {
              return (
                <Meal
                  key={meal._id || meal.createdAt}
                  meal={meal}
                  deleteMeal={deleteMeal}
                  t={t}
                  mutate={mutate}
                  setLocalMeals={setLocalMeals}
                />
              );
            })
          ) : (
            <div className="no-results">{emptyMessage}</div>
          )
        ) : (
          <LoadingOnTop />
        )}
      </div>
      <Modal
        isOpen={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
          },
          overlay: {
            backgroundColor: 'rgba(34, 34, 34, 0.5)',
          },
        }}
        contentLabel="Example Modal"
        closeTimeoutMS={modalAnimationTime}
      >
        <div className="confirm-message">{t('delete_sure')}</div>
        <div className="modal-button-container">
          <Button primary onClick={() => setShowConfirmModal(false)}>
            {t('cancel')}
          </Button>
          <Button primary remove onClick={() => confirmDelete()}>
            {t('delete')}
          </Button>
        </div>
      </Modal>

      <style jsx>{`
        .buttons-container {
          display: flex;
          justify-content: center;
          padding: 10px;
        }
        .calculator-container {
          display: flex;
          margin-left: 10px;
          font-size: 14px;
        }
        .meals-page {
          padding: 2px 0 120px;
          margin: 0 auto;
        }
        .meals-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }
        .create-meal {
          display: flex;
          align-items: center;
          padding: 10px 20px;
          color: #fff;
          text-decoration: none;
        }
        .confirm-message {
          padding: 30px;
          font-family: ${theme.fontFamily.default};
          font-size: 24px;
        }
        .modal-button-container {
          display: flex;
          justify-content: space-between;
          padding: 30px;
        }
        .no-results {
          margin-top: 50px;
          font-size: 24px;
          text-align: center;
          color: #fff;
        }
        .select-container {
          max-width: 400px;
          margin: 20px auto;
          padding: 0 20px;
        }

        // Modal animation
        :global(.ReactModal__Content) {
          transform: translate(-50%, -50%) scale(0);
          transition: transform ${modalAnimationTime}ms ease-in-out;
        }
        :global(.ReactModal__Content--after-open) {
          transform: translate(-50%, -50%) scale(1);
        }
        :global(.ReactModal__Content--before-close) {
          transform: translate(-50%, -50%) scale(0);
        }
        :global(.ReactModal__Overlay) {
          opacity: 0;
          transition: opacity ${modalAnimationTime}ms ease-in-out;
        }
        :global(.ReactModal__Overlay--after-open) {
          opacity: 1;
        }
        :global(.ReactModal__Overlay--before-close) {
          opacity: 0;
        }

        @media only screen and (min-width: ${theme.sizes.mobile}) {
          .meals-page {
            padding: 20px 20px 120px;
            max-width: 1280px;
          }
          .create-meal {
            padding: 15px 40px;
          }
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state) => ({
  comparisons: state.comparisons,
});

const mapDispatchToProps = (dispatch) => ({
  addMealToCompare: (mealId) => dispatch(addMealToComparisons(mealId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MealsPage);
