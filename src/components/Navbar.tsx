import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';

const Navbar: React.FC = () => {
  return (
    <header>
      <nav className={styles.navbar}>
        <ul className={styles.navbarMenu}>
          <li className={styles.navbarMenuItem}>
            <Link className={styles.navbarMenuItemLink} to='/'>
              Home
            </Link>
          </li>
          <li className={styles.navbarMenuItem}>
            <Link className={styles.navbarMenuItemLink} to='/newPost'>
              Create new post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
