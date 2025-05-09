import { Typography, TextField, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const Step3 = ({ formData, handleChange, handleCheckboxChange }) => {
  const currencyMask = createNumberMask({
    prefix: 'R$ ',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    decimalSymbol: ',',
    allowDecimal: true,
    decimalLimit: 2,
  });

  return (
    <>
      <Typography variant="body1" color="error" gutterBottom sx={{ mt: 2 }}>
        ⚠️ É necessário possuir um cartão de crédito para realizar o empréstimo.
      </Typography>
      <MaskedInput
        mask={currencyMask}
        value={formData.limiteDisponivel}
        onChange={(e) => handleChange({ target: { name: 'limiteDisponivel', value: e.target.value } })}
        render={(ref, props) => (
          <TextField
            {...props}
            inputRef={ref}
            fullWidth
            label="Limite disponível (R$)"
            name="limiteDisponivel"
            sx={{ flex: '1 1 45%' }}
          />
        )}
      />
      <MaskedInput
        mask={currencyMask}
        value={formData.valorEmprestimo}
        onChange={(e) => handleChange({ target: { name: 'valorEmprestimo', value: e.target.value } })}
        render={(ref, props) => (
          <TextField
            {...props}
            inputRef={ref}
            fullWidth
            label="Valor do Empréstimo Desejado (R$)"
            name="valorEmprestimo"
            sx={{ flex: '1 1 45%' }}
          />
        )}
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
  );
};

export default Step3;
