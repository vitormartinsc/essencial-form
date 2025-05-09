import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Menu = ({ onNavigate }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Menu
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => onNavigate('dadosPessoais')}>
            Dados Pessoais
          </Button>
          <Button color="inherit" onClick={() => onNavigate('solicitarEmprestimo')}>
            Solicitar Empréstimo
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
