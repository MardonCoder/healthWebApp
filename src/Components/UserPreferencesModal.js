import React, { useState } from 'react';
import './UserPreferencesModal.css';

function UserPreferencesModal({ closeModal }) {
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [userParams, setUserParams] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
    activity: '',
    goal: '',
  });

  const handleDiseaseChange = (event) => {
    const value = event.target.value;
    setSelectedDiseases((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    );
  };

  const handleAllergyChange = (event) => {
    const value = event.target.value;
    setSelectedAllergies((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  const handleParamChange = (event) => {
    const { name, value } = event.target;
    setUserParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Логика адаптации плана питания будет здесь
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Setting up a meal plan!</h2>

        <h3>Select diseases:</h3>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" value="diabetes" onChange={handleDiseaseChange} /> Diabetes
          </label>
          <label>
            <input type="checkbox" value="hypertension" onChange={handleDiseaseChange} /> Hypertension
          </label>
          <label>
            <input type="checkbox" value="gastro" onChange={handleDiseaseChange} /> Gastrointestinal diseases
          </label>
          <label>
            <input type="checkbox" value="intolerance" onChange={handleDiseaseChange} /> Food intolerance
          </label>
        </div>

        <h3>Select allergies:</h3>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" value="dairy" onChange={handleAllergyChange} /> Dairy products
          </label>
          <label>
            <input type="checkbox" value="gluten" onChange={handleAllergyChange} /> Gluten
          </label>
          <label>
            <input type="checkbox" value="nuts" onChange={handleAllergyChange} /> Nuts
          </label>
          <label>
            <input type="checkbox" value="eggs" onChange={handleAllergyChange} /> Eggs
          </label>
        </div>

        <h3>Введите параметры:</h3>
        <div className="input-group">
          <input type="number" name="height" placeholder="Height (cm)" onChange={handleParamChange} />
          <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleParamChange} />
          <input type="number" name="age" placeholder="Age" onChange={handleParamChange} />
          <select name="gender" onChange={handleParamChange}>
            <option value="">Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select name="activity" onChange={handleParamChange}>
            <option value="">Activity</option>
            <option value="low">Low</option>
            <option value="medium">Average</option>
            <option value="high">High</option>
          </select>
          <select name="goal" onChange={handleParamChange}>
            <option value="">Target</option>
            <option value="gain">Weight gain</option>
            <option value="lose">Weight loss</option>
          </select>
        </div>

        <button onClick={handleSubmit}>Save settings</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default UserPreferencesModal;