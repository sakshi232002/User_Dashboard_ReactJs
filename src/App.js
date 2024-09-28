import React, { useState } from 'react';
import { Container, TextField, Select, MenuItem, Button, Typography } from '@mui/material';
import UserCard from './components/UserCard';
import EditUserModal from './components/EditUserModal';
import { usersData } from './data';
import Navbar from './navbar';  // Import your Navbar component
import './App.css';

const App = () => {
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortOrder, setSortOrder] = useState({ field: '', order: '' });
  const [editUser, setEditUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Search filter by name or email
  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  // Role filter
  const handleRoleFilter = (e) => setRoleFilter(e.target.value);

  // Sorting logic
  const handleSort = (field) => {
    const order = sortOrder.field === field && sortOrder.order === 'asc' ? 'desc' : 'asc';
    setSortOrder({ field, order });
  };

  // Delete user
  const handleDelete = (id) => setUsers(users.filter(user => user.id !== id));

  // Edit user
  const handleEdit = (user) => {
    setEditUser(user);
    setModalOpen(true);
  };

  // Save edited user
  const handleSave = (editedUser) => {
    setUsers(users.map(user => (user.id === editedUser.id ? editedUser : user)));
    setModalOpen(false);
  };

  // Filter and search logic
  const filteredUsers = users
    .filter(user => user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm))
    .filter(user => !roleFilter || user.role === roleFilter)
    .sort((a, b) => {
      if (!sortOrder.field) return 0;
      const compareValue = a[sortOrder.field].localeCompare(b[sortOrder.field]);
      return sortOrder.order === 'asc' ? compareValue : -compareValue;
    });

  return (
    
    <Container>
      <div className="App">
      <Navbar />
      <main>
        {/* <h1>Welcome to your Dashboard!</h1> */}
        {/* Additional dashboard content goes here */}
      </main>
    </div>
      
      <TextField
        label="Search by Name or Email"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearch}
      />

      <Select
        value={roleFilter}
        onChange={handleRoleFilter}
        displayEmpty
        fullWidth
        margin="normal"
      >
        <MenuItem value="">All Roles</MenuItem>
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="User">User</MenuItem>
        <MenuItem value="Guest">Guest</MenuItem>
      </Select>

      <Button onClick={() => handleSort('name')}>Sort by Name</Button>
      <Button onClick={() => handleSort('role')}>Sort by Role</Button>

      {filteredUsers.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}

      <EditUserModal
        open={modalOpen}
        user={editUser}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </Container>
  );
};




export default App;
