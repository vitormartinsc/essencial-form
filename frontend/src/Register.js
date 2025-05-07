import React, { useState } from 'react';
import { Link } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [accepted, setAccepted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAcceptChange = (e) => {
    setAccepted(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accepted) {
      alert('Você deve aceitar os termos e condições para continuar.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message || data.error);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/*<img src="./logo-essencial.png" className="App-logo" alt="logo" /> */}
        <h1>CADASTRE-SE</h1>
        <p>Já possui uma conta? <Link href="/login">Faça login!</Link></p>
      </header>
      <div className="warning">
        <WarningIcon style={{ marginRight: '5px', verticalAlign: 'middle' }} />
        Antes de se cadastrar, confira seu LIMITE DISPONÍVEL DO CARTÃO DE CRÉDITO.
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nome Completo"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Endereço de e-mail"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Crie uma senha"
          value={formData.password}
          onChange={handleChange}
        />
        <div style={{ textAlign: 'left', marginTop: '10px' }}>
          <input
            type="checkbox"
            id="accept"
            checked={accepted}
            onChange={handleAcceptChange}
          />
          <label htmlFor="accept" style={{ marginLeft: '5px' }}>
            Eu aceito os <a href="#">termos e condições</a>
          </label>
        </div>
        <button type="button">Voltar</button>
        <button type="submit">Continuar</button>
      </form>
      <div className="footer">
        A Essencial é uma empresa que atua na modalidade de empréstimo via cartão de crédito. Você utiliza o limite disponível do seu cartão de crédito para ter dinheiro fácil, rápido e seguro.
      </div>
    </div>
  );
}

export default Register;