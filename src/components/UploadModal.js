import React, { useState } from 'react';
import './UploadModal.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const UploadModal = ({ activeTab, setInventoryData, inventoryData }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    let apiEndpoint = '';
    switch (activeTab) {
      case 'bulkUploadElites':
        apiEndpoint = '/bulkUpload/bulkUploadElites';
        break;
      case 'bulkUploadWorkWears':
        apiEndpoint = '/bulkUpload/bulkUploadWorkWears';
        break;
      case 'bulkUploadSpirits':
        apiEndpoint = '/bulkUpload/bulkUploadSpirits';
        break;
      case 'bulkUploadTogs':
        apiEndpoint = '/bulkUpload/bulkUploadTogs';
        break;
      case 'bulkUploadShields':
        apiEndpoint = '/bulkUpload/bulkUploadShields';
        break;
      case 'bulkUploadHeals':
        apiEndpoint = '/bulkUpload/bulkUploadHeals';
        break;
      default:
        return;
    }
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjA0NTQxMDAsImV4cCI6MTc1MjAxMTcwMCwiYXVkIjoiNjY4NGVmZWI5NzViZmYwMDg4NzFmMDYxOkpvbiIsImlzcyI6IkRyZXNzQ29kZUFwcGxpY2F0aW9uIn0.PL2S6KeSh1H1iiWbSyV8q_VZghgsO-0eo14SGbv7NXo'; 
    try {

      const response = await api.post(apiEndpoint, formData, {
        headers: {
           'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
     
      setInventoryData(response.data);
      console.log('File submitted successfully:', response.data);


      const modalElement = document.getElementById('uploadModal');
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="modal fade" id="uploadModal" tabIndex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="uploadModalLabel">Bulk Upload</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Category: {activeTab.replace(/_/g, ' ')}</label>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <label htmlFor="formFile" className="form-label me-3">Upload CSV file</label>
                <label htmlFor="formFile" className="form-label me-3 custom-file-upload" style={{ marginLeft: '100px' }}>
                  <input type="file" id="formFile" accept=".csv" onChange={handleFileChange} />
                  <span className="upload-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 1 0V12h13V9.9a.5.5 0 1 1 1 0V13a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V9.9z"/>
                      <path d="M7.646 1.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 1 1-.708.708L8.5 3.207V10.5a.5.5 0 0 1-1 0V3.207L5.354 5.354a.5.5 0 1 1-.708-.708l3-3z"/>
                    </svg>
                  </span>
                  Upload CSV file
                </label>
              </div>
              <div className="mb-3">
                <a href="/path-to-csv-template.csv" download>Click here to download empty CSV file template</a>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-light-green">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
