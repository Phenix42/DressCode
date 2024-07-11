import React, { useEffect, useState } from 'react';
import api from './api'; 
import './Loader.css';
import Header from './Header';

const OrderDetails = ({ userName }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjA0NTQxMDAsImV4cCI6MTc1MjAxMTcwMCwiYXVkIjoiNjY4NGVmZWI5NzViZmYwMDg4NzFmMDYxOkpvbiIsImlzcyI6IkRyZXNzQ29kZUFwcGxpY2F0aW9uIn0.PL2S6KeSh1H1iiWbSyV8q_VZghgsO-0eo14SGbv7NXo'; 

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get('/dashboard/getOrderDetails/6D6C5B', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrderDetails(response.data.orderDetails);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [token]);

  const toggleRow = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter(row => row !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  const handleAssignToShiprocket = async () => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/assign-shiprocket', { orderId: orderDetails.orderId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Shiprocket assignment successful:', response.data);
      alert('Order assigned to Shiprocket successfully!');
    } catch (error) {
      console.error('Error assigning to Shiprocket:', error);
      alert('Failed to assign order to Shiprocket.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-content">
      <Header/>
        {orderDetails ? (
          <React.Fragment>
            <div className="row mb-3">
              <div className="col">
                <strong>Customer Name:</strong> {orderDetails.userDetails.firstName} {orderDetails.userDetails.lastName}
                <div>
                  <strong>Address:</strong> {orderDetails.addressDetails.flatNumber}, {orderDetails.addressDetails.locality}
                </div>
                <div>
                  <strong>City:</strong> {orderDetails.addressDetails.districtCity}
                </div>
              </div>
              <div className="col">
                <strong>Customer Phone no:</strong> {orderDetails.addressDetails.mobile}
              </div>
              <div className="col">
                <strong>Customer Email ID:</strong> {orderDetails.userDetails.email}
                <div>
                  <strong>State:</strong> {orderDetails.addressDetails.state}
                </div>
                <div>
                  <strong>Pincode:</strong> {orderDetails.addressDetails.pinCode}
                </div>
              </div>
            </div>

            <h3 className="mb-3 text-center mt-5">Particular Order Details</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date Of Order</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{orderDetails.orderId}</td>
                  <td>{new Date(orderDetails.dateOfOrder).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>

            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th>Product Id</th>
                  <th>Group</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>PRICE</th>
                  <th>Color</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                <tr onClick={() => toggleRow(0)} style={{ cursor: 'pointer' }}>
                  <td>{orderDetails.productDetails.productId}</td>
                  <td>{orderDetails.productDetails.group.name}</td>
                  <td>{orderDetails.productDetails.category.name}</td>
                  <td>{orderDetails.productDetails.subCategory.name}</td>
                  <td>{orderDetails.productDetails.productType.type}</td>
                  <td>{orderDetails.quantityOrdered}</td>
                  <td>{orderDetails.price}</td>
                  <td>{orderDetails.color}</td>
                  <td>{orderDetails.size}</td>
                </tr>
                {expandedRows.includes(0) && (
                  <tr>
                    <td colSpan="9">
                      {orderDetails.productDetails.gender && <div><strong>Gender:</strong> {orderDetails.productDetails.gender}</div>}
                      {orderDetails.productDetails.fit && <div><strong>Fit:</strong> {orderDetails.productDetails.fit}</div>}
                      {orderDetails.productDetails.neckline && <div><strong>Neckline:</strong> {orderDetails.productDetails.neckline}</div>}
                      {orderDetails.productDetails.sleeves && <div><strong>Sleeves:</strong> {orderDetails.productDetails.sleeves}</div>}
                      {orderDetails.productDetails.productDetails && <div><strong>Details:</strong> {orderDetails.productDetails.productDetails}</div>}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="row mb-3">
              <div className="col">
                <strong>Discount %:</strong> {orderDetails.discountPercentage}
              </div>
              <div className="col text-right">
                <strong>Total Price:</strong> {orderDetails.totalPrice}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col text-right">
                <strong>Price After Discount:</strong> {orderDetails.priceAfterDiscount}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col text-right">
                <strong>Delivery Status:</strong> {orderDetails.deliveryStatus}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div class="loader">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
      </div>
      
        )}

        <div className="text-right">
          <button className="btn btn-success" onClick={handleAssignToShiprocket} disabled={isLoading}>
            {isLoading ? 'Assigning...' : 'Assign to Shiprocket'}
          </button>
        </div>
   
    </div>
  );
};

export default OrderDetails;
