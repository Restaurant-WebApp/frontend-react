import React from 'react';
import styles from './Home.module.css'; // Updated import statement

const SuccessPage = () => {
  return (
    <div className={styles.success_container}>
      <h1 className={styles.success_title}>Action Successfully Completed!</h1>
      <p className={styles.success_message}>Congratulations! Your action has been successfully completed!</p>
    </div>
  );
};

export default SuccessPage;
