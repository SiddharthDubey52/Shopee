import React, { Fragment, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { SiShopee } from "react-icons/si";
import axios, { Axios } from "axios";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let user_id = localStorage.getItem("userid");
  let navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    localStorage.removeItem("userid");
    navigate("/");
  };

useEffect(()=>{
const fetchuser = async () => {
  try{
    const response = await axios.get('https://user-info-2ud5.onrender.com/api/user-info')
    console.log("User data fetched successfully:", response.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
fetchuser();
},[])

  const deleteProfile = async () => {
    console.log("Profile deleted");
    
    let confirmation = confirm("Are you sure?");
    console.log(confirmation);

    if (confirmation) {
      try {
        await axios.delete(`http://localhost:5050/users/${user_id}`);
        alert("profile deleted");
        logout()
      } catch (error) {
        console.log("unable to delete", error);
        alert("unable to delete");
      }
    }
  };

  return (
    <nav className={styles.navbar}>
      <figure className={styles.logo}>
        <SiShopee />
        <span>Shopee</span>
      </figure>

      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>

        {user_id ? (
          <Fragment>
            <li>
              <NavLink
                to="/allproducts"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cart 
              </NavLink>
            </li>
            <li className={styles.dropdown} onClick={toggleDropdown}>
              <div className={styles.dropdownToggle}>Profile</div>
              {isDropdownOpen && (
                <ul className={styles.dropdownMenu}>
                  <li>
                    <NavLink to={`/edit/${user_id}`}>Edit Profile</NavLink>
                  </li>
                  <li onClick={deleteProfile}>Delete Profile</li>
                  <li onClick={logout}>Logout</li>
                </ul>
              )}
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Signup
              </NavLink>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
