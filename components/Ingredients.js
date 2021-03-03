import React, { Fragment, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import TinyPies from './TinyPies';
import CardTitle from './CardTitle';
import MyTooltip from './MyTooltip';
import theme from '../styles/theme';
import Modal from 'react-modal';
import Button from './Button';

const Ingredients = ({ ingredients, numberOfServings, deleteIngredient, t }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalMessage, setConfirmModalMessage] = useState('');
  const modalAnimationTime = 200;

  return (
  <div className="ingredients">
    <CardTitle>{t('ingredients')}</CardTitle>
    {!ingredients.length && (
      <div className="ingredient-basic ingredient-basic-none">{t('no_ingredient')}</div>
    )}
    {ingredients.map((ingredient, index) => {
      const transportString = ingredient.distance
        ? t('transported_text', {
            distance: ingredient.distance,
            distanceUnit: ingredient.distanceUnit,
            transportMode: t(ingredient.transportMode),
          })
        : '';
      const amountString = `${ingredient.amount} ${
        ingredient.amountUnit === 'qty' ? '' : t(`${ingredient.amountUnit}_short`)
        }`;
      const confirmModalMessage = (
        <Fragment>
          {t('remove_ingredient')}?<br /><br />
          {amountString} {t(ingredient.rawLabel)}
          {transportString.length ? <br /> : ''}
          {transportString.length ? transportString : ''}
        </Fragment>
      );

      return (
        <div className="ingredient" key={index}>
          <div className="ingredient-basic">
            {`${amountString} ${t(ingredient.rawLabel)}`}
            <div className="transport">{transportString}</div>
          </div>
          <div className="pies-container">
            <TinyPies ingredient={ingredient} numberOfServings={numberOfServings} t={t} />
          </div>
          <MyTooltip
            title={t('remove_ingredient')}
            placement="top"
            arrow
            enterTouchDelay={0}
            leaveTouchDelay={3000}
          >
            <button className="delete-button" onClick={() => {setConfirmModalMessage(confirmModalMessage);setShowConfirmModal(true)}}>
              <FaTrash />
            </button>
          </MyTooltip>
        </div>
      );
    })}
    
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
        <div className="confirm-message">
          {confirmModalMessage}
        </div><br />
        <div className="modal-button-container">
          <Button primary onClick={() => { setShowConfirmModal(false); setConfirmModalMessage('')}}>
            {t('cancel')}
          </Button>
          <Button primary remove onClick={() => {
            deleteIngredient();
          setShowConfirmModal(false); setConfirmModalMessage('')}}>
            {t('delete')}
          </Button>
        </div>
    </Modal>

    <style jsx>{`
      .ingredient {
        display: flex;
        align-items: center;
      }
      .ingredient-basic {
        min-width: 50%;
        font-size: 14px;
      }
      .ingredient-basic-none {
        padding-top: 7px;
      }
      .pies-container {
        display: flex;
        flex-wrap: wrap;
      }
      .transport {
        font-size: 12px;
      }
      .delete-button {
        padding: 0;
        margin-left: auto;
        font-size: 14px;
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

      @media only screen and (min-width: ${theme.sizes.mobile}) {
        .ingredient-basic {
          font-size: 14px;
        }
      }
    `}</style>
  </div>
)};

export default Ingredients;
