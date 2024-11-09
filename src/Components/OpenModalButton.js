import React, { useState } from 'react';
import Modal from './Modal';
import './OpenModalButton.css'
import UserPreferencesModal from './UserPreferencesModal';

function OpenModalButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className='mealPlanButton' onClick={openModal}>Make meal plan</button>
      {isModalOpen && <UserPreferencesModal closeModal={closeModal} />}
    </div>
  );
}

export default OpenModalButton;