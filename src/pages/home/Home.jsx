import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Home.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar, faTags, faTruck, faClock } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const userid = localStorage.getItem("userid");

  // Fetch products from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, userRes] = await Promise.all([
          fetch("https://fakestoreapi.in/api/products"),
          axios.get(`http://localhost:5050/users/${userid}`)
        ]);

        const productsData = await productsRes.json();
        setFeaturedProducts(productsData.products.slice(0, 4));
        setCartCount(userRes.data.cart?.length || 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userid]);

  // Add to cart functionality
  const handleAddToCart = async (product) => {
    try {
      const { data } = await axios.get(`http://localhost:5050/users/${userid}`);
      const updatedCart = data.cart ? [...data.cart] : [];
      
      const existingProduct = updatedCart.find(ele => ele.id === product.id);
      
      if(existingProduct) {
        existingProduct.quantity += 1;
      } else {
        updatedCart.push({...product, quantity: 1});
      }

      await axios.patch(`http://localhost:5050/users/${userid}`, { cart: updatedCart });
      setCartCount(updatedCart.length);
      console.log("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      } 
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <FontAwesomeIcon icon={faClock} size="2x" />
        </motion.div>
        <p>Loading Products...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Navbar */}
      {/* <nav className={styles.navbar}>
        <motion.div 
          className={styles.logo}
          initial={{ x: -100 }}
          animate={{ x: 0 }}
        >
          E-Shop
        </motion.div>
        <div className={styles.navLinks}>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#categories">Categories</a>
          <a href="#contact">Contact</a>
        </div>
        <motion.button 
          className={styles.cartButton}
          whileHover={{ scale: 1.05 }}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className={styles.cartCount}>{cartCount}</span>
        </motion.button>
      </nav> */}

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Discover Amazing Products
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our curated collection of premium products
          </motion.p>
          <motion.button
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <motion.div 
          className={styles.featureCard}
          whileHover={{ scale: 1.05 }}
        >
          <FontAwesomeIcon icon={faTruck} className={styles.featureIcon} />
          <h3>Free Shipping</h3>
          <p>On all orders over $99</p>
        </motion.div>
        <motion.div 
          className={styles.featureCard}
          whileHover={{ scale: 1.05 }}
        >
          <FontAwesomeIcon icon={faTags} className={styles.featureIcon} />
          <h3>Special Offers</h3>
          <p>Daily deals & discounts</p>
        </motion.div>
        <motion.div 
          className={styles.featureCard}
          whileHover={{ scale: 1.05 }}
        >
          <FontAwesomeIcon icon={faStar} className={styles.featureIcon} />
          <h3>Premium Quality</h3>
          <p>100% quality assurance</p>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className={styles.section} id="products">
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <motion.div 
          className={styles.productsGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {featuredProducts.map((product) => (
            <motion.div 
              key={product.id}
              className={styles.productCard}
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <img 
                src={product.image} 
                alt={product.title} 
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <h3>{product.title.slice(0, 30)}</h3>
                <div className={styles.productRating}>
                  {[...Array(Math.round(product.rating))].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} />
                  ))}
                </div>
                <div className={styles.productFooter}>
                  <span>${product.price}</span>
                  <motion.button 
                    className={styles.addToCartButton}
                    onClick={() => handleAddToCart(product)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Banner Section */}
      <motion.section 
        className={styles.banner}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={styles.bannerContent}>
          <h2>Summer Sale!</h2>
          <p>Up to 50% off selected items</p>
          <motion.button 
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
          >
            Explore Deals
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerColumns}>
          <div className={styles.footerColumn}>
            <h4>About Us</h4>
            <p>Leading e-commerce platform offering premium products at competitive prices.</p>
          </div>
          <div className={styles.footerColumn}>
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#products">Products</a>
            <a href="#categories">Categories</a>
            <a href="#contact">Contact</a>
          </div>
          <div className={styles.footerColumn}>
            <h4>Contact</h4>
            <p>Email: support@eshop.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2024 E-Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;