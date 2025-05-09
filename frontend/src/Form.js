import React, { useState } from 'react';
import { Button, Container, Typography, Box, Stepper, Step, StepLabel } from '@mui/material';
import axios from 'axios';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Menu from './Menu';

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
    limiteDisponivel: '',
    valorEmprestimo: '',
    bandeiraCartao: '',
    confirmacao: false,
    availableLimit: '',
    requestedAmount: '',
  });

  const [cepError, setCepError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [currentView, setCurrentView] = useState('dadosPessoais');

  const steps = ['Informações Pessoais', 'Dados de Endereço', 'Finalizar'];

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

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
    <>
      <Menu onNavigate={handleNavigate} />
      {currentView === 'dadosPessoais' && (
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
              {activeStep === 0 && <Step1 formData={formData} handleChange={handleChange} />}
              {activeStep === 1 && (
                <Step2
                  formData={formData}
                  handleChange={handleChange}
                  handleCepChange={handleCepChange}
                  cepError={cepError}
                />
              )}
              {activeStep === 2 && (
                <Step3
                  formData={formData}
                  handleChange={handleChange}
                  handleCheckboxChange={handleCheckboxChange}
                />
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
      )}
      {currentView === 'solicitarEmprestimo' && (
        <Typography variant="h4" align="center" sx={{ mt: 5 }}>
          Página de Solicitação de Empréstimo em construção.
        </Typography>
      )}
    </>
  );
}

export default Form;