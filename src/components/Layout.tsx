import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from '../styles/Layout.module.css';

const Layout: React.FC = () => {
  return (
    <>
      <header>
        <nav className={styles.navbar}>
          <ul className={styles.navbarMenu}>
            <li className={styles.navbarMenuItem}>
              <Link className={styles.navbarMenuItemLink} to='/'>
                Home
              </Link>
            </li>
            <li className={styles.navbarMenuItem}>
              <Link className={styles.navbarMenuItemLink} to='#'>
                Create new post
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
