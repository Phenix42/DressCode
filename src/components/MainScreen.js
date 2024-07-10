import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadModal from './UploadModal';
import './Sidebar.css';
import api from './api';
import EditModal from './EditModal';
import { 
  edit,
  deletetable

} from './icons';

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState('HEAL');
  const [inventoryData, setInventoryData] = useState({
    HEAL: [],
    SHEILD: [],
    ELITE: [],
    TOGS: [],
    SPIRIT: [],
    WORK_WEAR_UNIFORMS: [],
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjA0NTQxMDAsImV4cCI6MTc1MjAxMTcwMCwiYXVkIjoiNjY4NGVmZWI5NzViZmYwMDg4NzFmMDYxOkpvbiIsImlzcyI6IkRyZXNzQ29kZUFwcGxpY2F0aW9uIn0.PL2S6KeSh1H1iiWbSyV8q_VZghgsO-0eo14SGbv7NXo'); // Replace with actual token retrieval logic
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);

  const tabs = ['HEAL', 'SHEILD', 'ELITE', 'TOGS', 'SPIRIT', 'WORK_WEAR_UNIFORMS'];

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) return;

      const groupName = activeTab;
      const apiUrl = `/dashboard/${groupName}/getAllActiveProducts`;

      try {
        setLoading(true);
        const response = await api.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const { products } = response.data;
        const formattedData = products.flatMap((product) =>
          product.variants.flatMap((variant) =>
            variant.sizes.map((size) => ({
              schoolName: product.group,
              pCategory: product.category,
              gender: product.gender,
              pattern: product.fit,
              pName: product.productType,
              pId: product.productId,
              color: variant.color,
              size: size.size,
              price: product.price,
              quantity: size.quantity,
            }))
          )
        );
        setInventoryData((prevState) => ({
          ...prevState,
          [activeTab]: formattedData,
        }));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab, token]);

  const handleEdit = (updatedItem) => {
    setInventoryData((prevState) => ({
      ...prevState,
      [activeTab]: prevState[activeTab].map((item) =>
        item.pId === updatedItem.pId ? updatedItem : item
      ),
    }));
  };

  const handleDelete = (index) => {
    setInventoryData((prevState) => ({
      ...prevState,
      [activeTab]: prevState[activeTab].filter((_, i) => i !== index),
    }));
  };

  const openEditModal = (item) => {
    setCurrentEditItem(item);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setCurrentEditItem(null);
  };

  return (
    <div className="main-content">
      <header className="d-flex justify-content-between align-items-center my-3">
        <h2 className="mb-0">Welcome Back, Madhur</h2>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            data-bs-toggle="modal"
            data-bs-target="#uploadModal"
          >
            Upload Inventory
          </button>
          <img src="profile-placeholder.jpg" alt="Profile" className="rounded-circle profile-image" width="40" height="40" />
        </div>
      </header>
      <p className="text-muted">Here is the information about all your orders</p>
      <div className="marg"></div>
      <div className="mb-3 tab-scroll">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-light'} me-3 mb-3`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.replace(/_/g, ' ')}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="loader">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      ) : (
        <div className="table-responsive">
          <InventoryTable
            data={inventoryData[activeTab]}
            handleEditClick={openEditModal}
            handleDelete={handleDelete}
          />
        </div>
      )}
      {currentEditItem && (
        <EditModal
          show={editModalVisible}
          handleClose={closeEditModal}
          handleSave={handleEdit}
          item={currentEditItem}
        />
      )}
      <UploadModal
        activeTab={activeTab}
        setInventoryData={setInventoryData}
        inventoryData={inventoryData}
      />
    </div>
  );
};

const InventoryTable = ({ data, handleEditClick, handleDelete }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>School Name</th>
          <th>P Category</th>
          <th>Gender</th>
          <th>Pattern</th>
          <th>P Name</th>
          <th>P ID</th>
          <th>Color</th>
          <th>Size</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.schoolName}</td>
            <td>{item.pCategory}</td>
            <td>{item.gender}</td>
            <td>{item.pattern}</td>
            <td>{item.pName}</td>
            <td>{item.pId}</td>
            <td>{item.color}</td>
            <td>{item.size}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>
              <div>
                <img
                  src={edit}
                  alt="Edit"
                  style={{ width: '20px', height: '20px' }}
                  onClick={() => handleEditClick(item)}
                  className='editbtn'
                />
                <img
                  src={deletetable}
                  alt="Delete"
                  style={{ width: '20px', height: '20px' }}
                  onClick={() => handleDelete(index)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MainScreen;
