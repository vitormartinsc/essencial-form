import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, Alert, Stepper, Step, StepLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.message) {
        navigate('/form'); // Redireciona para o formulário após cadastro bem-sucedido
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Preencha seus dados
        </Typography>
        <Stepper activeStep={0} alternativeLabel>
          <Step>
            <StepLabel>1</StepLabel>
          </Step>
          <Step>
            <StepLabel>2</StepLabel>
          </Step>
          <Step>
            <StepLabel>3</StepLabel>
          </Step>
        </Stepper>
        <Alert severity="warning" sx={{ mt: 2 }}>
          É necessário possuir um cartão de crédito para realizar o empréstimo.
        </Alert>
        <form onSubmit={handleSubmit}>
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
            label="Email"
            name="email"
            type="email"
            value={formData.email}
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
            Continuar
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2, color: 'black' }}>
          Já possui uma conta? <Link href="/login">Faça login!</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Register;