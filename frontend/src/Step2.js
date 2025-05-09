import { TextField, Box } from '@mui/material';

const Step2 = ({ formData, handleChange, handleCepChange, cepError }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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
);

export default Step2;
