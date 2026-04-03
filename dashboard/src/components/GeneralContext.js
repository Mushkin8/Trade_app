import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow"; // ✅ IMPORT

const GeneralContext = React.createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
  openSellWindow: () => {},   // ✅ ADD
  closeSellWindow: () => {},  // ✅ ADD
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false); // ✅ ADD

  const [selectedStockUID, setSelectedStockUID] = useState("");

  // ✅ BUY
  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  // ✅ SELL
  const handleOpenSellWindow = (uid) => {
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,   // ✅ PROVIDE
        closeSellWindow: handleCloseSellWindow, // ✅ PROVIDE
      }}
    >
      {props.children}

      {/* BUY WINDOW */}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}

      {/* SELL WINDOW */}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;