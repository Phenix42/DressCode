import React, { useState } from 'react';
import './EditModal.css'

const EditModal = ({ show, handleClose, handleSave, item }) => {
  const [price, setPrice] = useState(item.price);
  const [quantity, setQuantity] = useState(item.quantity);

  const onSave = () => {
    handleSave({ ...item, price, quantity });
    handleClose();
  };

  return (
    <div className={`modal fade ${show ? 'show d-block' : 'd-none'}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document" style={{ maxWidth: 400 }}>
        <div className="modal-content">
          <div className="modal-body">
            <form>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th scope="row" className="table-header">Category</th>
                    <td className="table-data">{item.pCategory}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="table-header">S Category</th>
                    <td className="table-data">{item.sCategory}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="table-header">Gender</th>
                    <td className="table-data">{item.gender}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="table-header">TOW</th>
                    <td className="table-data">{item.pattern}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="table-header">P Name</th>
                    <td className="table-data">{item.pName}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="table-header">P ID</th>
                    <td className="table-data">{item.pId}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="table-header">Fabric</th>
                    <td className="table-data">{item.fabric}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="table-header">Color</th>
                    <td className="table-data">{item.color}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="table-header">Size</th>
                    <td className="table-data">{item.size}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="table-header">Price</th>
                    <td className="table-data">
                      <input
                        type="number"
                        className="form-control"
                        style={{ width: '50%' }}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="table-header">Quantity</th>
                    <td className="table-data">
                      <input
                        type="number"
                        className="form-control"
                        style={{ width: '50%' }}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
            <button type="button" className="btn btn-success" onClick={onSave}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
