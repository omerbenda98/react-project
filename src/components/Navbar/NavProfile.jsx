import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

function UserAvatar({ username, image }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem',border:'1px black solid' }}>
      <Avatar alt={username} src={image} sx={{ width: 56, height: 56, marginBottom: '0.5rem',border:'1px black solid'}} />
      <Typography variant="h6">{username}</Typography>
    </Box>
  );
}

export default UserAvatar;
