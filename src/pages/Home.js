import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../component/Card";
import Cart from "../component/Cart";
import { addToCart, removeFromCart } from "../redux/actions/cartAction";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProducts = async () => {
      try {
        const apiUrl = "https://dummyjson.com/products";

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setProducts(response.data.products);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error during product fetch:", error);
      }
    };

    if (!token) {
      // If the user is not authenticated, redirect to the login page
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/login");
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productTitle) => {
    dispatch(removeFromCart(productTitle));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!maxPrice || product.price <= parseFloat(maxPrice))
  );

  const handleNavigateToCart = () => {
    navigate("/cart");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Home</h2>
        <div style={styles.actions}>
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={styles.priceInput}
          />
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
          <button style={styles.cartButton} onClick={handleNavigateToCart}>
            Cart ({cartItems.length})
          </button>
        </div>
      </div>
      <div style={styles.cardContainer}>
        {Array.isArray(filteredProducts) ? (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              discountPercentage={product.discountPercentage}
              rating={product.rating}
              stock={product.stock}
              brand={product.brand}
              category={product.category}
              thumbnail={product.thumbnail}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <Cart
          //   cartItems={cartItems}
          onRemoveFromCart={(productTitle) =>
            handleRemoveFromCart(productTitle)
          }
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "24px",
    margin: 0,
  },
  actions: {
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    marginRight: "10px",
    marginTop: "15px",
  },
  priceInput: {
    marginRight: "10px",
    marginTop: "15px",
    width: "80px",
  },
  logoutButton: {
    background: "#28a745",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    marginRight: "4px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
};

export default Home;
