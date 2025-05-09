import { TextField } from '@mui/material';
import MaskedInput from 'react-text-mask';

const Step1 = ({ formData, handleChange }) => (
  <>
    <TextField
      fullWidth
      label="Nome Completo"
      name="fullName"
      value={formData.fullName}
      onChange={handleChange}
      sx={{ flex: '1 1 45%' }}
    />
    <MaskedInput
      mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      value={formData.phone}
      onChange={(e) => handleChange({ target: { name: 'phone', value: e.target.value } })}
      render={(ref, props) => (
        <TextField
          {...props}
          inputRef={ref}
          fullWidth
          label="Celular/WhatsApp"
          name="phone"
          sx={{ flex: '1 1 45%' }}
        />
      )}
    />
    <MaskedInput
      mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
      value={formData.cpf}
      onChange={(e) => handleChange({ target: { name: 'cpf', value: e.target.value } })}
      render={(ref, props) => (
        <TextField
          {...props}
          inputRef={ref}
          fullWidth
          label="CPF"
          name="cpf"
          sx={{ flex: '1 1 45%' }}
        />
      )}
    />
    <MaskedInput
      mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/]}
      value={formData.rg}
      onChange={(e) => handleChange({ target: { name: 'rg', value: e.target.value } })}
      render={(ref, props) => (
        <TextField
          {...props}
          inputRef={ref}
          fullWidth
          label="RG"
          name="rg"
          sx={{ flex: '1 1 45%' }}
        />
      )}
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
      select
      SelectProps={{ native: true }}
      sx={{ flex: '1 1 45%' }}
    >
      <option value=""></option>
      <option value="Masculino">Masculino</option>
      <option value="Feminino">Feminino</option>
      <option value="Outro">Outro</option>
    </TextField>
    <TextField
      fullWidth
      label="Estado Civil"
      name="maritalStatus"
      value={formData.maritalStatus}
      onChange={handleChange}
      select
      SelectProps={{ native: true }}
      sx={{ flex: '1 1 45%' }}
    >
      <option value=""></option>
      <option value="Solteiro(a)">Solteiro(a)</option>
      <option value="Casado(a)">Casado(a)</option>
      <option value="Divorciado(a)">Divorciado(a)</option>
      <option value="Viúvo(a)">Viúvo(a)</option>
    </TextField>
    <TextField
      fullWidth
      label="Nacionalidade"
      name="nationality"
      value={formData.nationality}
      onChange={handleChange}
      sx={{ flex: '1 1 45%' }}
    />
  </>
);

export default Step1;
