import React from 'react';
import { Modal, Box, TextField, Button, Select, MenuItem, Typography } from '@mui/material';

const EditUserModal = ({ open, user, onClose, onSave }) => {
  const [editedUser, setEditedUser] = React.useState(user);

  React.useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box style={{ padding: '20px', backgroundColor: 'white', margin: '10% auto', maxWidth: '400px' }}>
        <Typography variant="h6">Edit User</Typography>
        {editedUser && (
          <div>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
            />
            <Select
              value={editedUser.role}
              onChange={handleChange}
              name="role"
              fullWidth
              margin="normal"
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Guest">Guest</MenuItem>
            </Select>
            <Button
              onClick={() => onSave(editedUser)}
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '16px' }}
            >
              Save
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default EditUserModal;
