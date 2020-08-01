import React, { useState } from 'react';
import Link from 'next/link';
import { FaCalculator } from 'react-icons/fa';
import Modal from 'react-modal';
import { deleteLocalStorageMeal } from '../utils/localStorage';
import { useUser } from '../lib/hooks';
import Button from './Button';
import PageTitle from './PageTitle';
import Meal from './Meal';
import LoadingOnTop from './LoadingOnTop';
import Filters from './Filters';
import theme from '../styles/theme';
import MealLink from './MealLink';

Modal.setAppElement('#__next');

const MealsPage = ({
  meals,
  title,
  emptyMessage,
  showCreateButton,
  showEditButton,
  showDeleteButton,
  showEyeButton,
  removeMeal,
  allMeals,
  query,
  isValidating,
  mutate,
}) => {
  const [user] = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mealIdToDelete, setMealIdToDelete] = useState('');
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
    } else {
      deleteLocalStorageMeal(mealIdToDelete);
    }

    setIsLoading(false);
    mutate();
  };

  const deleteMeal = (meal) => {
    setShowConfirmModal(true);
    setMealIdToDelete(meal._id);
  };

  return (
    <div className="meals-page">
      <PageTitle>{title}</PageTitle>
      {(isLoading || isValidating) && <LoadingOnTop />}
      {showCreateButton && (
        <div className="buttons-container">
          <Button primary animate noPad>
            <Link href="/newmeal">
              <a className="create-meal">
                Create meal
                <span className="calculator-container">
                  <FaCalculator />
                </span>
              </a>
            </Link>
          </Button>
        </div>
      )}
      {allMeals && <Filters query={query} />}
      <div className="meals-container">
        {meals ? (
          meals.length ? (
            meals.map((meal) => {
              return (
                <Meal
                  key={meal._id}
                  meal={meal}
                  showEyeButton={showEyeButton}
                  allMeals={allMeals}
                  showDeleteButton={showDeleteButton}
                  deleteMeal={deleteMeal}
                  showEditButton={showEditButton}
                />
              );
            })
          ) : (
            <div className="no-results">No meals</div>
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
        <div className="confirm-message">Are you sure you want to delete this meal?</div>
        <div className="modal-button-container">
          <Button primary onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button primary remove onClick={() => confirmDelete()}>
            Delete
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
          min-height: 100vh;
          padding: 2px 0;
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
          color: #fff;
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
            padding: 20px;
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

export default MealsPage;
