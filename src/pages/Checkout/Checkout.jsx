// Checkout.jsx
import React, { useState } from "react";
import styles from "./Checkout.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import barcode from './../../../public/images/barcode.gif';
const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const totalPrice = location.state?.totalPrice || 0;
  
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing here
    alert("Payment processed successfully!");
    navigate("/");
  };

  return (
    <main className={styles.checkoutContainer}>
      <div className={styles.checkoutContent}>
        <h2>Checkout Summary</h2>
        <div className={styles.totalSection}>
          <span>Total Price:</span>
          <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
        </div>
        
        <div className={styles.paymentOptions}>
          <button 
            className={`${styles.paymentMethod} ${selectedPayment === 'cod' ? styles.active : ''}`}
            onClick={() => setSelectedPayment('cod')}
          >
            Cash on Delivery
          </button>
          <button 
            className={`${styles.paymentMethod} ${selectedPayment === 'card' ? styles.active : ''}`}
            onClick={() => setSelectedPayment('card')}
          >
            Credit/Debit Card
          </button>
          <button 
            className={`${styles.paymentMethod} ${selectedPayment === 'upi' ? styles.active : ''}`}
            onClick={() => setSelectedPayment('upi')}
          >
            UPI/Barcode
          </button>
        </div>

        <div className={styles.paymentDetails}>
          {selectedPayment === 'upi' && (
            <div className={styles.barcodeSection}>
              <img src= {barcode} alt="Payment Barcode" />
              <p>Scan the QR code to complete payment</p>
            </div>
          )}

          {selectedPayment === 'card' && (
            <form onSubmit={handlePaymentSubmit} className={styles.cardForm}>
              <input
                type="text"
                placeholder="Card Number"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                required
              />
              <div className={styles.formRow}>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className={styles.payButton}>Pay Now</button>
            </form>
          )}

          {selectedPayment === 'cod' && (
            <div className={styles.codConfirmation}>
              <p>Your order will be delivered shortly. Please pay cash on delivery.</p>
              <button className={styles.payButton} onClick={() => navigate("/")}>
                Confirm Order
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Checkout;