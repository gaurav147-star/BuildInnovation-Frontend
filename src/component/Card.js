import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartAction"; // Import your actual action creators

const Card = ({
  key,
  id,
  title,
  description,
  price,
  discountPercentage,
  rating,
  stock,
  brand,
  category,
  thumbnail,
  images,
}) => {
  const [addToCartCount, setAddToCartCount] = useState(0);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Increment the count when the "Add to Cart" button is clicked
    setAddToCartCount((prevCount) => prevCount + 1);

    // Dispatch the action to add the product to the cart
    dispatch(addToCart({ id, title, price })); // Pass the relevant product information
  };

  const handleRemoveFromCart = () => {
    // Decrement the count when the "Remove from Cart" button is clicked
    if (addToCartCount > 0) {
      setAddToCartCount(0);

      // Dispatch the action to remove the product from the cart
      dispatch(removeFromCart({ title })); // Pass the relevant product information
    }
  };

  return (
    <div style={styles.card} key={key}>
      <div style={styles.imageContainer}>
        <img src={thumbnail} alt={title} style={styles.thumbnail} />
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
        <div style={styles.details}>
          <p style={styles.price}>Price: ${price}</p>
          <p style={styles.discount}>Discount: {discountPercentage}%</p>
          <p style={styles.rating}>Rating: {rating}</p>
          <p style={styles.stock}>Stock: {stock}</p>
          <p style={styles.brand}>Brand: {brand}</p>
          <p style={styles.category}>Category: {category}</p>
        </div>
        <div style={styles.cartButtons}>
          <button style={styles.addToCartButton} onClick={handleAddToCart}>
            Add to Cart
          </button>
          {/* <button style={styles.removeFromCartButton} onClick={handleRemoveFromCart}>
            Remove from Cart
          </button> */}
        </div>
      </div>
    </div>
  );
};
const styles = {
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    transition: "transform 0.3s ease-in-out",
    width: "100%",
    maxWidth: "300px",
    margin: "16px",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  imageContainer: {
    overflow: "hidden",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },
  thumbnail: {
    width: "100%",
    height: "200px", // Set a specific height
    objectFit: "cover", // Maintain aspect ratio and cover container
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  content: {
    padding: "16px",
  },
  title: {
    fontSize: "1.2rem",
    margin: "0 0 10px",
  },
  description: {
    color: "#666",
    fontSize: "0.9rem",
    margin: "0 0 10px",
  },
  details: {
    fontSize: "0.9rem",
    lineHeight: "1.5",
  },
  price: {
    margin: "0 0 5px",
  },
  discount: {
    margin: "0 0 5px",
  },
  rating: {
    margin: "0 0 5px",
  },
  stock: {
    margin: "0 0 5px",
  },
  brand: {
    margin: "0 0 5px",
  },
  category: {
    margin: "0 0 5px",
  },
  cartButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  addToCartButton: {
    background: "#80ff00",
    color: "#000000",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    fontSize: "0.9rem",
    transition: "background 0.3s ease-in-out",
    "&:hover": {
      background: "#0056b3",
    },
  },
  removeFromCartButton: {
    background: "#dc3545",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    fontSize: "0.9rem",
    transition: "background 0.3s ease-in-out",
    "&:hover": {
      background: "#c82333",
    },
  },
};

export default Card;
