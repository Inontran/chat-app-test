import React from 'react';

import styles from './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className = { styles.Preloader }>
      <span className = { styles.Text }>Loading...</span>
    </div>
  )
}

export default Preloader;
