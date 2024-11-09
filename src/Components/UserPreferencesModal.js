// UserPreferencesModal.js
import React, { useState } from 'react';
import './UserPreferencesModal.css';
import { foodList } from './foodList';  // Импорт списка продуктов

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
  const [weeklyMealPlan, setWeeklyMealPlan] = useState(null);
  const [errors, setErrors] = useState({});

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
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const calculateCalories = () => {
    const { height, weight, age, gender, activity, goal } = userParams;
    let baseCalories = (10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161));

    const activityFactors = { low: 1.2, medium: 1.55, high: 1.9 };
    baseCalories *= activityFactors[activity];

    return goal === 'gain' ? baseCalories + 500 : baseCalories - 500;
  };

  const generateMealPlan = () => {
    const totalCalories = calculateCalories();
    const caloriesPerMeal = {
      breakfast: totalCalories * 0.25,
      snack: totalCalories * 0.1,
      lunch: totalCalories * 0.3,
      dinner: totalCalories * 0.25,
    };

    const filteredFoodList = foodList.filter((food) => {
      return !food.contraindications.some(
        (c) => selectedDiseases.includes(c) || selectedAllergies.includes(c)
      );
    });

    const mealPlan = Array.from({ length: 7 }, () => ({
      breakfast: selectMeal(filteredFoodList, 'breakfast', caloriesPerMeal.breakfast),
      snack1: selectMeal(filteredFoodList, 'snack', caloriesPerMeal.snack),
      lunch: selectMeal(filteredFoodList, 'lunch', caloriesPerMeal.lunch),
      snack2: selectMeal(filteredFoodList, 'snack', caloriesPerMeal.snack),
      dinner: selectMeal(filteredFoodList, 'dinner', caloriesPerMeal.dinner),
    }));

    setWeeklyMealPlan(mealPlan);
  };

  const selectMeal = (foodArray, period, targetCalories) => {
    const mealsForPeriod = foodArray
      .filter((food) => food.period === period)
      .sort((a, b) => Math.abs(a.calories - targetCalories) - Math.abs(b.calories - targetCalories));

    return mealsForPeriod.length > 0 ? mealsForPeriod[0] : null;
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!userParams.height) newErrors.height = 'This field is required';
    if (!userParams.weight) newErrors.weight = 'This field is required';
    if (!userParams.age) newErrors.age = 'This field is required';
    if (!userParams.gender) newErrors.gender = 'This field is required';
    if (!userParams.activity) newErrors.activity = 'This field is required';
    if (!userParams.goal) newErrors.goal = 'This field is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      generateMealPlan();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Generate Weekly Meal Plan</h2>

        <h3>Select Diseases:</h3>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" value="diabetes" onChange={handleDiseaseChange} /> Diabetes
          </label>
          <label>
            <input type="checkbox" value="hypertension" onChange={handleDiseaseChange} /> Hypertension
          </label>
          <label><input type="checkbox" value="gastro" onChange={handleDiseaseChange} /> Gastrointestinal Diseases
          </label>
          <label>
            <input type="checkbox" value="intolerance" onChange={handleDiseaseChange} /> Food Intolerance
          </label>
        </div>

        <h3>Select Allergies:</h3>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" value="gluten" onChange={handleAllergyChange} /> Gluten
          </label>
          <label>
            <input type="checkbox" value="dairy" onChange={handleAllergyChange} /> Dairy
          </label>
          <label>
            <input type="checkbox" value="nuts" onChange={handleAllergyChange} /> Nuts
          </label>
          <label>
            <input type="checkbox" value="eggs" onChange={handleAllergyChange} /> Eggs
          </label>
        </div>

        <h3>Enter Parameters:</h3>
        <div className="input-group">
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            onChange={handleParamChange}
          />
          {errors.height && <span className="error">{errors.height}</span>}

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            onChange={handleParamChange}
          />
          {errors.weight && <span className="error">{errors.weight}</span>}

          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleParamChange}
          />
          {errors.age && <span className="error">{errors.age}</span>}

          <select name="gender" onChange={handleParamChange}>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <span className="error">{errors.gender}</span>}

          <select name="activity" onChange={handleParamChange}>
            <option value="">Activity Level</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.activity && <span className="error">{errors.activity}</span>}

          <select name="goal" onChange={handleParamChange}>
            <option value="">Goal</option>
            <option value="gain">Gain Weight</option>
            <option value="lose">Lose Weight</option>
          </select>
          {errors.goal && <span className="error">{errors.goal}</span>}
        </div>

        <button onClick={handleSubmit}>Generate Meal Plan</button>
        <button onClick={closeModal}>Close</button>

        {weeklyMealPlan && (
          <div className="meal-plan">
            <h3>Weekly Meal Plan</h3>
            {weeklyMealPlan.map((day, index) => (
              <div key={index}>
                <h4>Day {index + 1}</h4>
                <p>Breakfast: {day.breakfast ? day.breakfast.name : "Closest match unavailable"}</p>
                <p>Snack 1: {day.snack1 ? day.snack1.name : "Closest match unavailable"}</p>
                <p>Lunch: {day.lunch ? day.lunch.name : "Closest match unavailable"}</p>
                <p>Snack 2: {day.snack2 ? day.snack2.name : "Closest match unavailable"}</p>
                <p>Dinner: {day.dinner ? day.dinner.name : "Closest match unavailable"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPreferencesModal;