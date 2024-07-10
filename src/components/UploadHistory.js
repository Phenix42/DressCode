import React from 'react';

const UploadHistory = () => {
  const uploadHistoryData = [
    { id: '#12345', date: 'Apr 20, 2024', amount: 'xxxx' },
    { id: '#12245', date: 'Apr 20, 2024', amount: 'xxxx' },
    { id: '#12344', date: 'Apr 20, 2024', amount: 'xxxx' },
    { id: '#12355', date: 'Apr 20, 2024', amount: 'xxxx' },
  ];

  return (
    <div className="main-content">
            <header className="d-flex justify-content-between align-items-center my-3">
        <h2 className="mb-0">Welcome Back, Madhur</h2>
        <div>
          <img src="profile-placeholder.jpg" alt="Profile" className="rounded-circle profile-image" width="40" height="40" />
        </div>
      </header>
      <p className="text-muted">Here is the information about all your orders</p>
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
