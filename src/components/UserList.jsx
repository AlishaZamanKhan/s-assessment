import React from 'react';
import './userList.css';

const UserList = ({ users, onDelete, onEdit, onSort, sortConfig }) => {
  return (
    <div className="user-list">
      <div className="user-list-header">
        <div className="header-item" onClick={() => onSort('firstName')}>
          First Name {sortConfig?.key === 'firstName' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
        </div>
        <div className="header-item" onClick={() => onSort('lastName')}>
          Last Name {sortConfig?.key === 'lastName' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
        </div>
        <div className="header-item">Gender</div>
        <div className="header-item" onClick={() => onSort('dateOfBirth')}>
          Date of Birth {sortConfig?.key === 'dateOfBirth' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
        </div>
        <div className="header-item">Phone</div>
        <div className="header-item">Email</div>
        <div className="header-item">Actions</div>
      </div>
      {users.map(user => (
        <div className="user-list-item" key={user.id}>
          <div className="user-info">{user.firstName}</div>
          <div className="user-info">{user.lastName}</div>
          <div className="user-info">{user.gender}</div>
          <div className="user-info">{new Date(user.dateOfBirth).toLocaleDateString()}</div>
          <div className="user-info">{user.phone}</div>
          <div className="user-info">{user.email}</div>
          <div className="user-actions">
            <button className="edit-button" onClick={() => onEdit(user)}>Edit</button>
            <button className="delete-button" onClick={() => onDelete(user.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
