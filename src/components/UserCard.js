import React from 'react';
import { Card, CardContent, Avatar, Typography, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const UserCard = ({ user, onDelete, onEdit }) => {
  return (
    <Card style={{ marginBottom: '16px' }}>
      <CardContent style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={user.avatar} alt={user.name} style={{ marginRight: '16px' }} />
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2">{user.email}</Typography>
          <Typography variant="body2">{user.role}</Typography>
        </div>
        <IconButton onClick={() => onEdit(user)}><Edit /></IconButton>
        <IconButton onClick={() => onDelete(user.id)}><Delete /></IconButton>
      </CardContent>
    </Card>
  );
};

export default UserCard;
