import React, { useState } from 'react';

const EditModal = ({ show, handleClose, handleSave, item }) => {
  const [price, setPrice] = useState(item.price);
  const [quantity, setQuantity] = useState(item.quantity);

  const onSave = () => {
    handleSave({ ...item, price, quantity });
    handleClose();
  };

  return (
    <div className={`modal fade ${show ? 'show d-block' : 'd-none'}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Product</h5>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Category</label>
                <input type="text" className="form-control" value={item.pCategory} readOnly />
              </div>
              <div className="form-group">
                <label>S Category</label>
                <input type="text" className="form-control" value={item.sCategory} readOnly />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <input type="text" className="form-control" value={item.gender} readOnly />
              </div>
              <div className="form-group">
                <label>TOW</label>
                <input type="text" className="form-control" value={item.pattern} readOnly />
              </div>
              <div className="form-group">
                <label>P Name</label>
                <input type="text" className="form-control" value={item.pName} readOnly />
              </div>
              <div className="form-group">
                <label>P ID</label>
                <input type="text" className="form-control" value={item.pId} readOnly />
              </div>
              <div className="form-group">
                <label>Fabric</label>
                <input type="text" className="form-control" value={item.fabric} readOnly />
              </div>
              <div className="form-group">
                <label>Color</label>
                <input type="text" className="form-control" value={item.color} readOnly />
              </div>
              <div className="form-group">
                <label>Size</label>
                <input type="text" className="form-control" value={item.size} readOnly />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={onSave}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
