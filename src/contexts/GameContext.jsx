import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [configSaves, setConfigSaves] = useState(0);

  const addScore = (points) => {
    setScore(prevScore => prevScore + points);
  };

  const addAchievement = (achievement) => {
    setAchievements(prevAchievements => [...prevAchievements, achievement]);
  };

  const incrementConfigSaves = () => {
    setConfigSaves(prevSaves => prevSaves + 1);
    if (configSaves + 1 === 5) {
      addAchievement("Configuration Master");
      addScore(100);
    }
  };

  return (
    <GameContext.Provider value={{ 
      score, 
      addScore, 
      achievements, 
      addAchievement, 
      configSaves, 
      incrementConfigSaves 
    }}>
      {children}
    </GameContext.Provider>
  );
};