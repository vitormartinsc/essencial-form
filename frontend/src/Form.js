import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Stepper, Step, StepLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';
import InputMask from 'react-input-mask';

function formatCep(value) {
  // Remove tudo que não for número
  value = value.replace(/\D/g, '');

  // Adiciona o traço no formato 12345-678
  if (value.length > 5) {
    value = value.slice(0, 5) + '-' + value.slice(5, 8);
  }

  return value;
}

function Form() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    cpf: '',
    rg: '16.635.686',
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
    limiteDisponivel: '',
    valorEmprestimo: '',
    bandeiraCartao: '',
    confirmacao: false,
    availableLimit: '',
    requestedAmount: '',
  });

  const [cepError, setCepError] = useState('');

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

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, confirmacao: e.target.checked });
  };

  const handleCepChange = async (e) => {
    const input = e.target;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    const formattedCep = formatCep(input.value);
    setFormData((prevData) => {
      const updatedData = { ...prevData, cep: formattedCep };

      // Reposiciona o cursor corretamente
      const diff = formattedCep.length - input.value.length;
      input.setSelectionRange(start + diff, end + diff);

      return updatedData;
    });

    // Valida o formato do CEP
    if (formattedCep.length === 9 && !/^\d{5}-\d{3}$/.test(formattedCep)) {
      setCepError('CEP inválido. Use o formato 12345-678.');
      return;
    } else {
      setCepError('');
    }

    // Busca informações do CEP se o formato for válido
    if (formattedCep.length === 9) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${formattedCep.replace('-', '')}/json/`);
        if (response.data.erro) {
          setCepError('CEP não encontrado.');
        } else {
          const { logradouro, bairro, localidade, uf } = response.data;
          setFormData((prevData) => ({
            ...prevData,
            endereco: logradouro || '',
            bairro: bairro || '',
            cidade: localidade || '',
            uf: uf || '',
          }));
        }
      } catch (error) {
        setCepError('Erro ao buscar o CEP. Tente novamente.');
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
                value={formData.phone || ''}
                onChange={(e) => {
                  const formattedPhone = e.target.value
                    .replace(/\D/g, '')
                    .replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')
                    .slice(0, 15);
                  handleChange({ target: { name: 'phone', value: formattedPhone } });
                }}
                sx={{
                  flex: '1 1 45%',
                }}
              />
              <InputMask
                mask="999.999.999-99"
                value={formData.cpf}
                onChange={(e) => handleChange({ target: { name: 'cpf', value: e.target.value } })}
              >
                {() => (
                  <TextField
                    fullWidth
                    label="CPF"
                    name="cpf"
                    sx={{ flex: '1 1 45%' }}
                  />
                )}
              </InputMask>
              <TextField
                fullWidth
                label="RG"
                name="rg"
                value={formData.rg || ''}
                onChange={(e) => {
                  const formattedRG = e.target.value
                    .replace(/\D/g, '')
                    .replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3')
                    .slice(0, 10);
                  handleChange({ target: { name: 'rg', value: formattedRG } });
                }}
                sx={{
                  flex: '1 1 45%',
                }}
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
                  placeholder="12345-678"
                  inputProps={{ maxLength: 10 }}
                  error={!!cepError}
                  helperText={cepError}
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
              <Typography variant="body1" color="error" gutterBottom sx={{ mt: 2 }}>
                ⚠️ É necessário possuir um cartão de crédito para realizar o empréstimo.
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Limite disponível"
                name="limiteDisponivel"
                value={formData.limiteDisponivel}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Valor de empréstimo desejado"
                name="valorEmprestimo"
                value={formData.valorEmprestimo}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Limite disponível (R$)"
                name="availableLimit"
                value={formData.availableLimit || ''}
                onChange={handleChange}
                sx={{
                  flex: '1 1 45%',
                }}
              />
              <TextField
                fullWidth
                label="Valor solicitado (R$)"
                name="requestedAmount"
                value={formData.requestedAmount || ''}
                onChange={handleChange}
                sx={{
                  flex: '1 1 45%',
                }}
              />
              <Select
                fullWidth
                margin="normal"
                name="bandeiraCartao"
                value={formData.bandeiraCartao}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Selecione a bandeira
                </MenuItem>
                <MenuItem value="Visa">Visa</MenuItem>
                <MenuItem value="MasterCard">MasterCard</MenuItem>
                <MenuItem value="Elo">Elo</MenuItem>
              </Select>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.confirmacao}
                    onChange={handleCheckboxChange}
                    name="confirmacao"
                  />
                }
                label="Afirmo que possuo um cartão de crédito com limite disponível para realizar meu empréstimo."
              />
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