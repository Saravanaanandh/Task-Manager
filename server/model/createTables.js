import connect from './../config/dbConn.js'

const createTables = () => {
    const userTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  
    const taskTable = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        status ENUM('todo', 'in-progress', 'completed') DEFAULT 'todo',
        priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
        due_date DATE, 
        updated DATE,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `;
  
    connect.query(userTable, err => {
      if (err) console.error('Error creating user table:', err);
      else console.log('User table created');
    });
  
    connect.query(taskTable, err => {
      if (err) console.error('Error creating task table:', err);
      else console.log('Task table created');
    });
};
  
export default createTables;