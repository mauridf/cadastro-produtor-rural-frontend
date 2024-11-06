import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Box,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HouseIcon from '@mui/icons-material/House'; // Ícone de Casa para Fazenda
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'; // Ícone de Pessoa para Produtor Rural
import AgricultureIcon from '@mui/icons-material/Agriculture'; // Ícone de Produto para Cultura
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';

function MenuLateral() {
  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem('nome');
  const emailUsuario = localStorage.getItem('email');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    navigate('/login');
    window.location.reload();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '250px',
        height: '100vh',
        backgroundColor: '#a5d6a7', // Cor verde clara
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <IconButton>
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <Box sx={{ ml: 2 }}>
          <strong>{nomeUsuario}</strong>
          <p>{emailUsuario}</p>
        </Box>
      </Box>
      <Divider />
      <List>
        <ListItem button onClick={() => navigate('/dashboard')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button onClick={() => navigate('/produtores-rurais')}>
          <ListItemIcon>
            <EmojiPeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Produtores Rurais" />
        </ListItem>

        <ListItem button onClick={() => navigate('/fazendas')}>
          <ListItemIcon>
            <HouseIcon />
          </ListItemIcon>
          <ListItemText primary="Fazendas" />
        </ListItem>

        <ListItem button onClick={() => navigate('/culturas')}>
          <ListItemIcon>
            <AgricultureIcon />
          </ListItemIcon>
          <ListItemText primary="Culturas" />
        </ListItem>

        <ListItem button onClick={() => navigate('/usuarios')}>
          <ListItemIcon>
            <AccountCircleIcon /> {/* Você pode substituir por outro ícone que represente melhor um usuário */}
          </ListItemIcon>
          <ListItemText primary="Usuários" />
        </ListItem>

        <Divider />
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
}

export default MenuLateral;