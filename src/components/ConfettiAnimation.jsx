import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ConfettiPiece = ({ color }) => (
  <motion.div
    className={`w-2 h-2 ${color} absolute`}
    initial={{ y: 0, x: "-50%" }}
    animate={{
      y: [0, -100, 0],
      x: ["-50%", "50%", "-50%"],
      rotate: [0, 360],
      opacity: [1, 1, 0],
    }}
    transition={{ duration: 1, ease: "easeOut" }}
  />
);

const ConfettiAnimation = () => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
    const newPieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: `${Math.random() * 100}%`,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {pieces.map((piece) => (
        <div key={piece.id} style={{ left: piece.left }}>
          <ConfettiPiece color={piece.color} />
        </div>
      ))}
    </div>
  );
};

export default ConfettiAnimation;