    // Cart.js
    import React, { useEffect } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { removeFromCart } from "../redux/actions/cartAction";
    import { useNavigate } from "react-router-dom";

    const Cart = () => {
        const cartItems = useSelector((state) => state.cart.cartItems);
        const dispatch = useDispatch();
        const navigate = useNavigate();
      
        const handleRemoveFromCart = (productId) => {
          dispatch(removeFromCart(productId));
        };
      
        const handleGoToHome = () => {
          // Use the navigate function to go to the home page
          navigate('/home');
        };
      
        return (
          <div style={styles.cartContainer}>
            <h3>Shopping Cart</h3>
            <ul style={styles.cartList}>
              {cartItems.map((item) => (
                <li key={item.id} style={styles.cartItem}>
                  <span style={styles.cartItemTitle}>{item.title}</span>
                  <span style={styles.cartItemPrice}>${item.price}</span>
                  <button
                    style={styles.removeButton}
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div style={styles.totalContainer}>
              <strong>Total:</strong> ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
            </div>
            {/* Add the button to go to the home page */}
            <button style={styles.homeButton} onClick={handleGoToHome}>
              Go to Home
            </button>
          </div>
        );
      };

    const styles = {
    cartContainer: {
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "20px 0",
    },
    cartList: {
        listStyle: "none",
        padding: 0,
    },
    cartItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
        padding: "8px 0",
    },
    cartItemTitle: {
        flex: 2,
    },
    cartItemPrice: {
        flex: 1,
    },
    removeButton: {
        background: "#dc3545",
        color: "#fff",
        padding: "6px 10px",
        borderRadius: "4px",
        cursor: "pointer",
        border: "none",
    },
    totalContainer: {
        marginTop: "16px",
        textAlign: "right",
    },
    homeButton: {
        background: "#007bff",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
        border: "none",
        marginTop: "16px",
      },
    };

    export default Cart;
