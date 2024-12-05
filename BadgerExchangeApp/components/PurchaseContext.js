import React, { createContext, useState } from 'react';

export const PurchaseContext = createContext();

export const PurchaseProvider = ({ children }) => {
  const [purchase, setPurchase] = useState([]);

  const addToPurchaseList = (item) => {
    const itemWithId = { ...item, id: item.id || Date.now().toString() }; 
    console.log('Adding to purchase list:', itemWithId);
    setPurchase((prevPurchase) => [...prevPurchase, itemWithId]);
  };
  

  return (
    <PurchaseContext.Provider value={{ purchase, addToPurchaseList }}>
      {children}
    </PurchaseContext.Provider>
  );
};