import React from 'react';
import { useOutlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const AnimatedOutlet:React.FC = () => {
const location = useLocation();
const element = useOutlet();

return (
   <AnimatePresence mode="wait">
      {element && React.cloneElement(element as React.ReactElement, { key: location.pathname })}
   </AnimatePresence>
);
};

export default AnimatedOutlet;