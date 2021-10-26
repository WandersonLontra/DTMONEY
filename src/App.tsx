import { useState } from "react";

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";


import { GlobalStyle } from "./styles/global";


export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleNewTransactionModalOpen(){
      setIsNewTransactionModalOpen(true);
  }

  function handleNewTransactionModalClose(){
      setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionsModal={handleNewTransactionModalOpen}/>
      
      <Dashboard />

      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleNewTransactionModalClose}      
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}


