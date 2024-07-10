import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from './api'; 
import Layout from './Layout';

const QuoteOrderDetails = ({ userName }) => {
  const [quoteOrders, setQuoteOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjA0NTQxMDAsImV4cCI6MTc1MjAxMTcwMCwiYXVkIjoiNjY4NGVmZWI5NzViZmYwMDg4NzFmMDYxOkpvbiIsImlzcyI6IkRyZXNzQ29kZUFwcGxpY2F0aW9uIn0.PL2S6KeSh1H1iiWbSyV8q_VZghgsO-0eo14SGbv7NXo'; 

  useEffect(() => {
    const fetchQuoteOrders = async () => {
      try {
        const response = await api.get('/dashboard/getQuotes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setQuoteOrders(response.data);
      } catch (error) {
        console.error('Error fetching quote orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuoteOrders();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout userName={userName}>
      <h3 className="text-center mb-3">Quote Order Details</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Quote ID</th>
            <th>Date Of Quote</th>
            <th>Client Name</th>
            <th>Phone No</th>
          </tr>
        </thead>
        <tbody>
          {quoteOrders.map((order, index) => (
            <tr key={order.quoteID}>
              <td>{index + 1}</td>
              <td><Link to={`/quote/${order.quoteID}`}>{order.quoteID}</Link></td>
              <td>{new Date(order.dateOfQuoteRecived).toLocaleDateString()}</td>
              <td>{order.clientName}</td>
              <td>{order.phoneNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default QuoteOrderDetails;
