import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.message) {
        navigate('/form'); // Redireciona para o formulário após login bem-sucedido
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            margin="normal"
            label="Nome de usuário"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Senha"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Entrar
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2, color: 'black' }}>
          Não possui uma conta? <Link href="/">Cadastre-se!</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;