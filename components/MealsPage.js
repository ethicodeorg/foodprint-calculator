import React, { useState, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {
  FaCalculator,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from 'react-modal';
import classNames from 'classnames';
import { deleteLocalStorageMeal } from '../utils/localStorage';
import { useUser } from '../lib/hooks';
import Pies from '../components/Pies';
import MealLink from '../components/MealLink';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import ExternalLink from '../components/ExternalLink';
import theme from '../styles/theme';
import AboutMeal from './AboutMeal';
import Separator from './Separator';
import Loading from './Loading';

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
}) => {
  const [user] = useUser();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mealIdToDelete, setMealIdToDelete] = useState('');
  const modalAnimationTime = 200;

  const confirmDelete = () => {
    setShowConfirmModal(false);
    if (user) {
      fetch('/api/meals', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mealId: mealIdToDelete, userId: user._id }),
      });
    } else {
      deleteLocalStorageMeal(mealIdToDelete);
    }

    Router.push('/mymeals');
    Router;
  };

  const deleteMeal = (meal) => {
    setShowConfirmModal(true);
    setMealIdToDelete(meal._id);
  };

  const changeVisibility = (meal) => {
    meal.visibility = meal.visibility === 'private' ? 'public' : 'private';
    fetch('api/meals', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mealId: meal._id, meal }),
    });

    Router.push('/mymeals');
  };

  return (
    <div className="meals-page">
      <PageTitle>{title}</PageTitle>
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
        {meals ? (
          meals.map((meal) => {
            return (
              <div className="meal" key={meal._id}>
                <Card>
                  <div className="title-container">
                    <CardTitle>{meal.title}</CardTitle>
                    {showEyeButton && (
                      <Tooltip
                        title={meal.visibility === 'public' ? 'Make private' : 'Publish meal'}
                        placement="left"
                      >
                        <button
                          className={classNames('visibility-button', {
                            'visibility-button-public': meal.visibility === 'public',
                          })}
                          onClick={() => changeVisibility(meal)}
                        >
                          {meal.visibility === 'public' ? <FaEye /> : <FaEyeSlash />}
                        </button>
                      </Tooltip>
                    )}
                  </div>
                  <div className="subtitle">{meal.owner.name}</div>
                  <p className="servings">{`Serves ${meal.numberOfServings} ${
                    meal.numberOfServings === 1 ? 'person' : 'people'
                  }`}</p>
                  {meal.about && <AboutMeal text={meal.about} />}
                  {meal.link && <ExternalLink href={meal.link}>Link to recipe </ExternalLink>}
                  <Pies meal={meal} numberOfServings={meal.numberOfServings} />
                  {showDeleteButton && (
                    <Fragment>
                      <Separator />
                      <div className="footer-button-container">
                        <Tooltip title="Delete meal" placement="right">
                          <button className="delete-button" onClick={() => deleteMeal(meal)}>
                            <FaTrash />
                          </button>
                        </Tooltip>
                        {showEditButton && (
                          <Tooltip title="Edit meal" placement="left">
                            <div className="edit-button-container">
                              <MealLink id={meal._id}>
                                <FaEdit />
                              </MealLink>
                            </div>
                          </Tooltip>
                        )}
                      </div>
                    </Fragment>
                  )}
                </Card>
              </div>
            );
          })
        ) : (
          <Loading />
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
          font-size: 22px;
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
        .delete-button,
        .visibility-button {
          display: flex;
          align-items: center;
          padding: 0;
          font-size: 22px;
          color: ${theme.colors.eutro};
          background-color: #fff;
          opacity: 1;
          transition: opacity 0.2s;
          cursor: pointer;
          border-radius: 4px;
          border: none;
          outline: none;
        }
        .delete-button:hover,
        .visibility-button:hover {
          opacity: 0.7;
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
        .footer-button-container {
          display: flex;
          justify-content: space-between;
        }
        .visibility-button {
          font-size: 28px;
          color: #777;
        }
        .visibility-button-public {
          color: ${theme.colors.land};
        }
        .footer-text {
          font-family: ${theme.fontFamily.default};
          font-size: 18px;
          margin-right: 10px;
        }
        .edit-text {
          position: relative;
          top: -4px;
        }
        .loading {
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
