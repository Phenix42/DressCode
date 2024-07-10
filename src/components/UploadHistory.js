import React from 'react';
import Header from './Header';


const UploadHistory = () => {
  const uploadHistoryData = [
    { id: '#12345', date: 'Apr 20, 2024', amount: 'xxxx' },
    { id: '#12245', date: 'Apr 20, 2024', amount: 'xxxx' },
    { id: '#12344', date: 'Apr 20, 2024', amount: 'xxxx' },
    { id: '#12355', date: 'Apr 20, 2024', amount: 'xxxx' },
  ];

  return (
    <div className="main-content">
   <Header/>
      <h2>Upload Inventory History List</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>No</th>
            <th>Upload ID</th>
            <th>Date of Upload</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {uploadHistoryData.map((upload, index) => (
            <tr key={upload.id}>
              <td>{index + 1}</td>
              <td>{upload.id}</td>
              <td>{upload.date}</td>
              <td>{upload.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadHistory;
