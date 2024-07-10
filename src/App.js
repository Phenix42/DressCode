import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainScreen from './components/MainScreen';
import UploadHistory from './components/UploadHistory';
import Qoute from './components/Qoute';
import OrderDetails from './components/OrderDetails';
import InventoryTable from './components/MainScreen';
import QuoteOrderDetailsPage from './components/QuoteOrderDetailsPage';
import './App.css';
const App = () => {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="container" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<EmptyScreen />} />
            <Route path="/inventory" element={<InventoryTable />} />
            <Route path="/uploaded-history" element={<UploadHistory/>}/>
            <Route path="/Qoute" element={<Qoute/>}/>
            <Route path="/quote/:quoteId" element={<QuoteOrderDetailsPage/>} />
            <Route path="/online-orders" element={<OrderDetails/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const EmptyScreen = () => {
  return (
    <div className="main-content">
    <div className='maincontent'>
      <h1>Welcome to the Dashboard</h1>
      <p>Select an option from the sidebar to get started.</p>
    </div>
    </div>
  );
};

export default App;
