import React from 'react';
import './App.css';
import FCPrices from './Functions/FCPrices';
import UserContextProvider from './Contexts/UserContext';
import SearchContextProvider from './Contexts/SearchContext';
import ReceiptContextProvider from './Contexts/ReceiptContext';
import ListsContextProvider from './Contexts/ListsContext';
import PricesLogo from './Images/PricesLogo.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserContextProvider>
          <SearchContextProvider>
            <ReceiptContextProvider>
              <ListsContextProvider>
                <FCPrices />
              </ListsContextProvider>
            </ReceiptContextProvider>
          </SearchContextProvider>
        </UserContextProvider>
      </header>
      <footer>
        <img src={PricesLogo} alt="Prices" style={{ height: "20px" }} />
        <strong>Prices</strong>
        <code> by Omer Tzafrir
        </code>
      </footer>
    </div>
  );
}

export default App;
