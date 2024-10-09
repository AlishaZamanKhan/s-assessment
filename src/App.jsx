import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import UserForm from './components/UserForm';
import UserList from './components/UserList';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import './app.css';

// Set up the modal root element
Modal.setAppElement('#root');

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState(null);
  const usersPerPage = 5; 
  



  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleSubmit = (user) => {
    if (currentUser) {
      const updatedUsers = users.map(u => (u.id === currentUser.id ? { ...u, ...user } : u));
      setUsers(updatedUsers);
    } else {
      const newUser = { id: Date.now(), ...user };
      setUsers([...users, newUser]);
    }
    setCurrentUser(null);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const filteredUsers = users.filter(user => user.id !== id);
    setUsers(filteredUsers);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
  };

  const filteredUsers = users.filter(user =>
    user.firstName.includes(searchTerm) || user.email.includes(searchTerm)
  );

  


  //my sorting logic


   // Sort users based on sortConfig
   const sortedUsers = () => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  };

  // Filter users based on the search term
  const filteredUser = sortedUsers().filter(user => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(lowerCaseTerm) ||
      user.lastName.toLowerCase().includes(lowerCaseTerm) ||
      user.email.toLowerCase().includes(lowerCaseTerm)
    );
  });

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUser.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  

  return (
    <div className="container">
      <h1>Users</h1>
      <button onClick={() => { setCurrentUser(null); setIsModalOpen(true); }}>
        Create User
      </button>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>{currentUser ? 'Edit User' : 'Create User'}</h2>
        <UserForm 
          onSubmit={handleSubmit} 
          initialValues={currentUser || { firstName: '', lastName: '', gender: '', dateOfBirth: '', phone: '', email: '' }} 
          onClose={() => setIsModalOpen(false)} 
       />
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <UserList 
        users={currentUsers} 
        onDelete={handleDelete} 
        onEdit={handleEdit} 
        onSort={handleSort} 
        sortConfig={sortConfig} 
      />
      <Pagination 
        usersPerPage={usersPerPage} 
        totalUsers={users.length} 
        paginate={paginate} 
      />
    </div>
  );
  
};

export default App;
