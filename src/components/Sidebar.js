import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';
import Images from './Images/Logo.svg';
import arrow from './Images/arrow.svg';
import { 
  overview,
  inventory,
  uploadedHistory,
  storeCreation,
  assignInventory,
  raisedRequests,
  onlineOrders,
  qoute,
  assignedInventory,
  discountCodes,
  editBills,
  deletedBills,
  refundRequests,
  logout,
  handburger, 
} from './icons';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navItems = [
    { name: 'Overview', icon: overview, path: '/' },
    { name: 'Inventory', icon: inventory, path: '/inventory' },
    { name: 'Uploaded History', icon: uploadedHistory, path: '/uploaded-history' },
    { name: 'Store Creation', icon: storeCreation, path: '/store-creation' },
    { name: 'Assign Inventory to Store', icon: assignInventory, path: '/assign-inventory' },
    { name: 'Raised Inventory Requests', icon: raisedRequests, path: '/raised-requests' },
    { name: 'Online Orders', icon: onlineOrders, path: '/online-orders' },
    { name: 'Qoute', icon: qoute, path: '/Qoute' },
    { name: 'Assigned Inventory', icon: assignedInventory, path: '/assigned-inventory' },
    { name: 'Assign Discount Codes', icon: discountCodes, path: '/discount-codes' },
    { name: 'Requested Edit Bills', icon: editBills, path: '/edit-bills' },
    { name: 'Deleted Bills', icon: deletedBills, path: '/deleted-bills' },
    { name: 'Requested Refund Online Orders', icon: refundRequests, path: '/refund-requests' },
  ];

  return (
    <div>
      <button className="hamburger-menu" onClick={toggleSidebar}>
        <img src={ handburger} alt="Open Menu" className="hamburger-icon" />
      </button>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-sidebar" onClick={toggleSidebar}>
          <img src={arrow} alt="Collapse" className="arrowClose" width="200" height="30" />
        </button>
        <div className="sidebar-header">
          <button className="shrink-sidebar" onClick={toggleSidebar}>
            <img src={arrow} alt="Shrink" className="arrowShrink" width="16" height="16" />
          </button>
          <div className="sidebar-logo">
            <img src={Images} alt="Logo" className="Logopng" />
          </div>
        </div>
        <nav className="nav flex-column">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              className={`nav-link d-flex align-items-center ${location.pathname === item.path ? 'active' : ''}`} 
              to={item.path}
            >
              <img src={item.icon} alt={item.name} className="me-2 icon" />
              {item.name}
            </Link>
          ))}
          <a className="nav-link mt-auto d-flex align-items-center" href="#">
            <img src={logout} alt="Logout" className="me-2 icon" />
            Logout
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
