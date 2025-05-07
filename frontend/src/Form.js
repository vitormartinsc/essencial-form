import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Stepper, Step, StepLabel } from '@mui/material';
import axios from 'axios';

function Form() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    cpf: '',
    rg: '',
    email: '',
    birthDate: '',
    gender: '',
    maritalStatus: '',
    nationality: '',
    cep: '',
    uf: '',
    cidade: '',
    endereco: '',
    numero: '',
    bairro: '',
    complemento: '',
    tipoResidencia: '',
    tempoResidencia: '',
  });

  const steps = ['Informações Pessoais', 'Dados de Endereço', 'Finalizar'];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCepChange = async (e) => {
    const cep = e.target.value;
    setFormData({ ...formData, cep });

    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { logradouro, bairro, localidade, uf } = response.data;
        setFormData({
          ...formData,
          endereco: logradouro || '',
          bairro: bairro || '',
          cidade: localidade || '',
          uf: uf || '',
        });
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <Container maxWidth={true} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'white', width: '80%' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Typography variant="h5" component="h1" gutterBottom sx={{ mt: 3 }}>
          {steps[activeStep]}
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {activeStep === 0 && (
            <>
              <TextField
                fullWidth
                label="Nome Completo"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                sx={{ flex: '1 1 45%' }}
              />
              <TextField
                fullWidth
                label="Celular/WhatsApp"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                sx={{ flex: '1 1 45%' }}
              />
              <TextField
                fullWidth
                label="Cadastro de pessoa física (CPF)"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                sx={{ flex: '1 1 45%' }}
              />
              <TextField
                fullWidth
                label="Registro geral (RG)"
                name="rg"
                value={formData.rg}
                onChange={handleChange}
                sx={{ flex: '1 1 45%' }}
              />
              <TextField
                fullWidth
                label="Endereço de e-mail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ flex: '1 1 45%' }}
              />
              <TextField
                fullWidth
                label="Data de nascimento"
                name="birthDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.birthDate}
                onChange={handleChange}
                sx={{ flex: '1 1 45%' }}
              />
              <TextField
                fullWidth
                label="Gênero"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                sx={{ flex: '1 1 45%' }}
              />
              <TextField
                fullWidth
                label="Estado Civil"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                sx={{ flex: '1 1 45%' }}
              />
              <TextField
                fullWidth
                label="Nacionalidade"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                sx={{ flex: '1 1 45%' }}
              />
            </>
          )}
          {activeStep === 1 && (
            <>
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <TextField
                  fullWidth
                  label="CEP"
                  name="cep"
                  value={formData.cep || ''}
                  onChange={handleCepChange}
                />
                <TextField
                  fullWidth
                  label="UF"
                  name="uf"
                  value={formData.uf || ''}
                  onChange={handleChange}
                  select
                  SelectProps={{ native: true }}
                >
                  <option value=""></option>
                  <option value="MG">MG</option>
                  <option value="SP">SP</option>
                  <option value="RJ">RJ</option>
                </TextField>
                <TextField
                  fullWidth
                  label="Cidade"
                  name="cidade"
                  value={formData.cidade || ''}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Endereço"
                  name="endereco"
                  value={formData.endereco || ''}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Número"
                  name="numero"
                  value={formData.numero || ''}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Bairro"
                  name="bairro"
                  value={formData.bairro || ''}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Complemento (Opcional)"
                  name="complemento"
                  value={formData.complemento || ''}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Tipo de residência"
                  name="tipoResidencia"
                  value={formData.tipoResidencia || ''}
                  onChange={handleChange}
                  select
                  SelectProps={{ native: true }}
                >
                  <option value=""></option>
                  <option value="Própria">Própria</option>
                  <option value="Alugada">Alugada</option>
                </TextField>
                <TextField
                  fullWidth
                  label="Tempo de residência"
                  name="tempoResidencia"
                  value={formData.tempoResidencia || ''}
                  onChange={handleChange}
                  select
                  SelectProps={{ native: true }}
                >
                  <option value=""></option>
                  <option value="Até 1 ano">Até 1 ano</option>
                  <option value="1 a 5 anos">1 a 5 anos</option>
                  <option value="Mais de 5 anos">Mais de 5 anos</option>
                </TextField>
              </Box>
            </>
          )}
          {activeStep === 2 && (
            <>
              <Typography variant="h5" component="h1" gutterBottom sx={{ mt: 3 }}>
                Finalizar
              </Typography>
            </>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Voltar
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" color="primary" type="submit">
                Finalizar
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Próximo
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default Form;