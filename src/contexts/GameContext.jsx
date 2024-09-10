import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [achievements, setAchievements] = useState([]);

  const addScore = (points) => {
    setScore(prevScore => prevScore + points);
  };

  const addAchievement = (achievement) => {
    setAchievements(prevAchievements => [...prevAchievements, achievement]);
  };

  return (
    <GameContext.Provider value={{ score, addScore, achievements, addAchievement }}>
      {children}
    </GameContext.Provider>
  );
};