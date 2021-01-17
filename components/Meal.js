import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaQrcode,
  FaTimes,
  FaPlus,
  FaCopy,
  FaExclamationTriangle,
} from 'react-icons/fa';
import classNames from 'classnames';
import QRCode from 'qrcode.react';
import { addLocalStorageMeal, getLocalStorageMeals } from '../utils/localStorageMeals';
import { Router } from '../i18n';
import { removeMealFromComparisons, addMealToComparisons } from '../redux/actions/pageActions';
import { useUser } from '../lib/hooks';
import Card from './Card';
import CardTitle from './CardTitle';
import ExternalLink from './ExternalLink';
import AboutMeal from './AboutMeal';
import Pies from './Pies';
import Separator from './Separator';
import MealLink from './MealLink';
import MyTooltip from './MyTooltip';
import theme from '../styles/theme';

const Meal = ({
  meal,
  comparisons,
  deleteMeal,
  removeMealFromCompare,
  addMealToCompare,
  t,
  mutate,
  setLocalMeals,
}) => {
  const router = useRouter();
  const [user] = useUser();
  const userSubtitle = `${meal?.user?.name || ''}${
    meal?.user?.type && meal?.user?.type !== 'other' ? `, ${t(meal?.user?.type)}` : ''
  }`;

  const removeFromComparison = (mealId) => {
    removeMealFromCompare(mealId);
  };

  const addToComparison = (mealId) => {
    addMealToCompare(mealId);
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

  const downloadQRCode = (meal) => {
    const elem = document.getElementById(`qr-${meal._id}`);
    const canvas = elem.children[0];
    const dataURL = canvas.toDataURL();
    const title = meal.title || mealTitle || 'Meal';
    let link = document.createElement('a');
    link.download = `${title
      .toLowerCase()
      .replace(/([^a-z0-9 ]+)/g, '') // Remove illegal filename characters
      .replace(/ /g, '-')}-qr-code.png`;
    link.href = dataURL;
    link.click();
  };

  const duplicateMeal = async (meal) => {
    delete meal._id;
    meal.title += ' copy';

    if (user) {
      await fetch('api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meal }),
      });

      mutate();
    } else {
      addLocalStorageMeal(meal);
      setLocalMeals(getLocalStorageMeals());
    }
  };

  return (
    <div className="meal" id={meal._id}>
      <Card>
        <div className="title-container">
          <CardTitle>
            {router.route === '/meals/[id]' ? (
              meal.title
            ) : (
              <MealLink id={meal._id}>{meal.title}</MealLink>
            )}
          </CardTitle>
          {router.route === '/mymeals' && !!user && (
            <MyTooltip
              title={meal.visibility === 'public' ? t('make_private') : t('publish_meal')}
              placement="top"
              arrow
              enterTouchDelay={0}
              leaveTouchDelay={4000}
            >
              <button
                className={classNames('visibility-button', {
                  'visibility-button-public': meal.visibility === 'public',
                })}
                onClick={() => changeVisibility(meal)}
              >
                {meal.visibility === 'public' ? <FaEye /> : <FaEyeSlash />}
              </button>
            </MyTooltip>
          )}
          {router.route === '/mymeals' && !user && (
            <MyTooltip
              title={t('warning_not_logged_in')}
              placement="top"
              arrow
              enterTouchDelay={0}
              leaveTouchDelay={10000}
            >
              <div className="warning-icon">
                <FaExclamationTriangle />
              </div>
            </MyTooltip>
          )}
          {router.route === '/compare' && (
            <MyTooltip
              title={t('remove_from_comparison')}
              placement="top"
              arrow
              enterTouchDelay={0}
              leaveTouchDelay={3000}
            >
              <button className="remove-button" onClick={() => removeFromComparison(meal._id)}>
                <FaTimes />
              </button>
            </MyTooltip>
          )}
          {router.route === '/meals' && !comparisons.includes(meal._id) && (
            <MyTooltip
              title={t('add_to_compare')}
              placement="top"
              arrow
              enterTouchDelay={0}
              leaveTouchDelay={3000}
            >
              <button className="add-button" onClick={() => addToComparison(meal._id)}>
                <FaPlus />
              </button>
            </MyTooltip>
          )}
        </div>
        <div className="subtitle">
          {meal.user?.homepage ? (
            <ExternalLink href={meal.user.homepage}>{userSubtitle}</ExternalLink>
          ) : (
            userSubtitle
          )}
        </div>
        <p className="servings">
          {meal.numberOfServings === 1
            ? t('serves_1')
            : t('serves', { number: meal.numberOfServings })}
        </p>
        {meal.about && <AboutMeal text={meal.about} t={t} />}
        {meal.link && <ExternalLink href={meal.link}>{t('link_to_recipe')}</ExternalLink>}
        <Pies meal={meal} numberOfServings={meal.numberOfServings} t={t} />
        {router.route === '/mymeals' && (
          <Fragment>
            <Separator />
            <div className="footer-button-container">
              <MyTooltip
                title={t('delete_meal')}
                placement="top"
                arrow
                enterTouchDelay={0}
                leaveTouchDelay={3000}
              >
                <button className="delete-button" onClick={() => deleteMeal(meal)}>
                  <FaTrash />
                </button>
              </MyTooltip>
              <div className="right-footer">
                <MyTooltip
                  title={t('download_qr')}
                  placement="top"
                  arrow
                  enterTouchDelay={0}
                  leaveTouchDelay={3000}
                >
                  <button className="download-button" onClick={() => downloadQRCode(meal)}>
                    <FaQrcode />
                    <span id={`qr-${meal._id}`} className="qr-code">
                      <QRCode value={`https://foodprintcalculator.com/meals/${meal._id}`} />
                    </span>
                  </button>
                </MyTooltip>
                <MyTooltip
                  title={t('duplicate_meal')}
                  placement="top"
                  arrow
                  enterTouchDelay={0}
                  leaveTouchDelay={3000}
                >
                  <button className="duplicate-button" onClick={() => duplicateMeal(meal)}>
                    <FaCopy />
                  </button>
                </MyTooltip>
                <MyTooltip
                  title={t('edit_meal')}
                  placement="top"
                  arrow
                  enterTouchDelay={0}
                  leaveTouchDelay={3000}
                >
                  <div className="edit-button-container">
                    <MealLink id={meal._id} isEdit>
                      <FaEdit />
                    </MealLink>
                  </div>
                </MyTooltip>
              </div>
            </div>
          </Fragment>
        )}
      </Card>

      <style jsx>{`
        .title-container {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .servings {
          font-size: 14px;
        }
        .meal {
          width: ${router.route === '/meals/[id]' ? '100%' : '600px'};
          margin: ${router.route === '/meals/[id]' ? '120px 0 0' : '0'};
          padding-bottom: 20px;
          font-size: 18px;
        }
        .edit-button-container {
          color: ${theme.colors.water};
          font-size: 22px;
        }
        .delete-button,
        .remove-button,
        .add-button,
        .visibility-button {
          display: flex;
          align-items: center;
          padding: 0;
          font-size: 22px;
          color: ${theme.colors.eutro};
          background-color: transparent;
          opacity: 1;
          transition: opacity 0.2s;
          cursor: pointer;
          border-radius: 4px;
          border: none;
          outline: none;
        }
        .delete-button:hover,
        .remove-button:hover,
        .add-button:hover,
        .visibility-button:hover {
          opacity: 0.7;
        }
        .remove-button {
          color: ${theme.colors.text};
        }
        .add-button {
          color: ${theme.colors.land};
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
        .download-button,
        .duplicate-button {
          display: flex;
          align-items: center;
          margin-right: 20px;
          padding: 0;
          font-size: 22px;
          color: ${theme.colors.text};
          background-color: #fff;
          opacity: 1;
          transition: opacity 0.2s;
          cursor: pointer;
          border: none;
          outline: none;
        }
        .duplicate-button {
          color: ${theme.colors.land};
        }
        .duplicate-button:hover,
        .warning-icon:hover,
        .download-button:hover {
          opacity: 0.7;
        }
        .right-footer {
          display: flex;
        }
        .qr-code {
          display: none;
        }
        .warning-icon {
          color: ${theme.colors.orange};
          font-size: 18px;
          cursor: pointer;
        }

        @media only screen and (min-width: ${theme.sizes.mobile}) {
          .meal {
            margin: ${router.route === '/meals/[id]' ? '120px 0 0' : '0 20px'};
          }
          .servings {
            font-size: 18px;
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
  removeMealFromCompare: (mealId) => dispatch(removeMealFromComparisons(mealId)),
  addMealToCompare: (mealId) => dispatch(addMealToComparisons(mealId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meal);
