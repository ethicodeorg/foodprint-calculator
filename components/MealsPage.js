import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { FaCalculator, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';
import { getCookie, setCookie } from '../utils/cookieUtils';
import Pies from '../components/Pies';
import MealLink from '../components/MealLink';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import ExternalLink from '../components/ExternalLink';
import theme from '../styles/theme';

Modal.setAppElement('#__next');

const MealsPage = ({
  meals,
  title,
  emptyMessage,
  showCreateButton,
  showEditButton,
  showDeleteButton,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mealToDelete, setMealToDelete] = useState({});
  const modalAnimationTime = 200;

  const confirmDelete = () => {
    setCookie(document, mealToDelete);
    Router.reload();
  };

  const deleteMeal = (meal) => {
    setShowConfirmModal(!showConfirmModal);
    setMealToDelete(meal);
  };

  return (
    <div className="meals-page">
      <PageTitle>{title}</PageTitle>
      {/* !meals.length && <div className="no-meals">{emptyMessage}</div> */}
      {showCreateButton && (
        <div className="buttons-container">
          <Button primary>
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
      <div className="meals-container">
        {meals.map((meal) => {
          return (
            <div className="meal" key={meal.id}>
              <Card>
                <div className="title-container">
                  <CardTitle>{meal.title}</CardTitle>
                  {showEditButton && (
                    <div className="edit-button-container">
                      <MealLink id={meal.id}>
                        <FaEdit />
                      </MealLink>
                    </div>
                  )}
                </div>
                <p className="servings">{`Serves ${meal.numberOfServings} ${
                  meal.numberOfServings === 1 ? 'person' : 'people'
                }`}</p>
                {meal.about &&
                  meal.about.split('\n').map((paragraph, i) => (
                    <p key={i} className="about-meal">
                      {paragraph}
                    </p>
                  ))}
                {meal.link && <ExternalLink href={meal.link}>Link to recipe </ExternalLink>}
                <Pies meal={meal} numberOfServings={meal.numberOfServings} />
                {showDeleteButton && (
                  <div className="delete-button-container">
                    <div className="separator" />
                    <button className="delete-button" onClick={() => deleteMeal(meal)}>
                      <FaTrash />
                    </button>
                  </div>
                )}
              </Card>
            </div>
          );
        })}
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
        .separator {
          border-top: 1px solid ${theme.colors.border};
          margin: 20px 0;
        }
        .no-meals {
          text-align: center;
        }
        .title-container {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .servings {
          font-size: 14px;
        }
        .meal {
          width: 600px;
          margin: 0;
          padding-bottom: 20px;
          font-size: 18px;
        }
        .about-meal {
          font-size: 12px;
        }
        .buttons-container {
          display: flex;
          justify-content: center;
          padding: 10px;
        }
        .edit-button-container {
          color: ${theme.colors.water};
          font-size: 24px;
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
          color: #fff;
          text-decoration: none;
        }
        .delete-button {
          display: block;
          padding: 0;
          margin-left: auto;
          font-size: 22px;
          color: ${theme.colors.eutro};
          background-color: #fff;
          opacity: 1;
          transition: opacity 0.2s;
          cursor: pointer;
          border-radius: 4px;
          border: none;
        }
        .delete-button:hover {
          opacity: 0.7;
        }
        .confirm-message {
          padding: 30px;
          font-family: Avenir;
          font-size: 24px;
        }
        .modal-button-container {
          display: flex;
          justify-content: space-between;
          padding: 30px;
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
          .meal {
            margin: 0 20px;
          }
          .servings {
            font-size: 18px;
          }
          .about-meal {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default MealsPage;
