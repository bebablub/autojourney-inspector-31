import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const AchievementNotification = ({ achievement }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed bottom-4 right-4 bg-yellow-400 text-black p-4 rounded-lg shadow-lg flex items-center"
    >
      <Trophy className="w-6 h-6 mr-2" />
      <div>
        <h3 className="font-bold">Achievement Unlocked!</h3>
        <p>{achievement}</p>
      </div>
    </motion.div>
  );
};

export default AchievementNotification;