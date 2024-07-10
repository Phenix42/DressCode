import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from './api'; 
import Layout from './Layout';

const QuoteOrderDetailsPage = ({ userName }) => {
  const { quoteId } = useParams();
  const [quoteDetails, setQuoteDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjA0NTQxMDAsImV4cCI6MTc1MjAxMTcwMCwiYXVkIjoiNjY4NGVmZWI5NzViZmYwMDg4NzFmMDYxOkpvbiIsImlzcyI6IkRyZXNzQ29kZUFwcGxpY2F0aW9uIn0.PL2S6KeSh1H1iiWbSyV8q_VZghgsO-0eo14SGbv7NXo'; 
  useEffect(() => {
    const fetchQuoteDetails = async () => {
      try {
        const response = await api.get(`/dashboard/getQuoteDetails/${quoteId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        console.log('Full API response:', response); // Log the full response
        console.log('API response data:', response.data); // Log the data property
  
        if (response.data) {
          console.log('Response data:', response.data);
          if (response.data.quoteDetails) {
            console.log('Setting quoteDetails:', response.data.quoteDetails);
            setQuoteDetails(response.data.quoteDetails);
          } else {
            console.log('No quote details in response:', response.data);
            setError('No quote details found.');
          }
        } else {
          console.log('Response data is null or undefined');
          setError('No response data found.');
        }
      } catch (error) {
        console.error('Error fetching quote details:', error);
        if (error.response) {
          setError(`Error: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
          setError('No response received from server.');
        } else {
          setError(`Error: ${error.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchQuoteDetails();
  }, [quoteId, token]);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!quoteDetails) {
    console.log('quoteDetails is null or undefined');
    return <div>No quote details found.</div>;
  }

  return (
    <Layout userName={userName}>
      <h3 className="text-center mb-3">Quote Details</h3>
      <div>
        <p><strong>Quote ID:</strong> {quoteDetails.quoteId}</p>
        <p><strong>Date Received:</strong> {new Date(quoteDetails.dateOfQuoteRecived).toLocaleDateString()}</p>
        <p><strong>Client Email:</strong> {quoteDetails.userDetails.email}</p>
        <p><strong>Client Phone:</strong> {quoteDetails.userDetails.phoneNumber}</p>
        <h4>Product Details</h4>
        <p><strong>Group:</strong> {quoteDetails.productDetails.product.group.name}</p>
        <p><strong>Category:</strong> {quoteDetails.productDetails.product.category.name}</p>
        <p><strong>SubCategory:</strong> {quoteDetails.productDetails.product.subCategory.name}</p>
        <p><strong>Product Type:</strong> {quoteDetails.productDetails.product.productType.type}</p>
        <p><strong>Gender:</strong> {quoteDetails.productDetails.product.gender}</p>
        <p><strong>Fit:</strong> {quoteDetails.productDetails.product.fit}</p>
        <p><strong>Neckline:</strong> {quoteDetails.productDetails.product.neckline}</p>
        <p><strong>Sleeves:</strong> {quoteDetails.productDetails.product.sleeves}</p>
        <p><strong>Color:</strong> {quoteDetails.productDetails.color}</p>
        <p><strong>Size:</strong> {quoteDetails.productDetails.size}</p>
        <p><strong>Quantity Required:</strong> {quoteDetails.productDetails.quantityRequired}</p>
        <p><strong>Logo URL:</strong> <a href={quoteDetails.productDetails.logoUrl}>View Logo</a></p>
        <p><strong>Logo Position:</strong> {quoteDetails.productDetails.logoPosition}</p>
        <h4>Address Details</h4><p>-----------------<br/>-----------------</p>
        <p><strong>Name:</strong> {quoteDetails.addressDetails.name}</p>
        <p><strong>Phone:</strong> {quoteDetails.addressDetails.contactPhone}</p>
        <p><strong>Email:</strong> {quoteDetails.addressDetails.email}</p>
        <p><strong>Organization:</strong> {quoteDetails.addressDetails.organizationName}</p>
        <p><strong>Street:</strong> {quoteDetails.addressDetails.street}</p>
        <p><strong>Lane:</strong> {quoteDetails.addressDetails.lane}</p>
        <p><strong>Postal Code:</strong> {quoteDetails.addressDetails.postalCode}</p>
      </div>
    </Layout>
  );
};

export default QuoteOrderDetailsPage;
