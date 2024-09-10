import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CelebrationPopup = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg p-8 shadow-xl relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl font-bold mb-4 text-center"
            >
              HV-Check Ready!
            </motion.h2>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex justify-center space-x-4 mb-4"
            >
              <span className="text-4xl">🎉</span>
              <span className="text-4xl">🎊</span>
              <span className="text-4xl">🥳</span>
            </motion.div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center text-gray-600"
            >
              Congratulations! Your HV-Check is complete and ready for review.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CelebrationPopup;