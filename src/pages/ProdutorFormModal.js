import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  CircularProgress,
  Typography,
  MenuItem,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import InputMask from 'react-input-mask';
import axios from 'axios';
import endpoints from '../config/apiEndPoints';

const UFs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

function ProdutorFormModal({ open, handleClose, produtor, onSave }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (produtor) {
      setNome(produtor.nome || '');
      setCpf(produtor.cpf || '');
      setNomeFantasia(produtor.nomeFantasia || '');
      setCnpj(produtor.cnpj || '');
      setEmail(produtor.email || '');
      setTelefone(produtor.telefone || '');
      setEndereco(produtor.endereco || '');
      setCidade(produtor.cidade || '');
      setUf(produtor.uf || '');
      setCep(produtor.cep || '');
    }
  }, [produtor]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = { nome, cpf, nomeFantasia, cnpj, email, telefone, endereco, cidade, uf, cep };
      if (produtor) {
        // Atualizar produtor
        await axios.put(`${endpoints.alterarProdutor}/${produtor.id}`, data);
      } else {
        // Cadastrar novo produtor
        await axios.post(endpoints.cadastrarProdutor, data);
      }
      setLoading(false);
      onSave();
      handleClose(); // Fechar modal após sucesso
    } catch (err) {
      setLoading(false);
      setError('Erro ao salvar os dados. Tente novamente.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ backgroundColor: '#2e7d32', color: 'white' }}>
        {produtor ? 'Editar Produtor Rural' : 'Cadastrar Produtor Rural'}
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <InputMask
            mask="999.999.999-99"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          >
            {() => <TextField label="CPF" fullWidth margin="normal" required />}
          </InputMask>
          <TextField
            label="Nome Fantasia"
            fullWidth
            margin="normal"
            value={nomeFantasia}
            onChange={(e) => setNomeFantasia(e.target.value)}
          />
          <InputMask
            mask="99.999.999/9999-99"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          >
            {() => <TextField label="CNPJ" fullWidth margin="normal" />}
          </InputMask>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputMask mask="(99) 99999-9999" value={telefone} onChange={(e) => setTelefone(e.target.value)}>
            {() => <TextField label="Telefone" fullWidth margin="normal" required />}
          </InputMask>
          <TextField
            label="Endereço"
            fullWidth
            margin="normal"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
          <TextField
            label="Cidade"
            fullWidth
            margin="normal"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required
          />
          <TextField
            select
            label="UF"
            fullWidth
            margin="normal"
            value={uf}
            onChange={(e) => setUf(e.target.value)}
            required
          >
            {UFs.map((uf) => (
              <MenuItem key={uf} value={uf}>
                {uf}
              </MenuItem>
            ))}
          </TextField>
          <InputMask mask="99999-999" value={cep} onChange={(e) => setCep(e.target.value)}>
            {() => <TextField label="CEP" fullWidth margin="normal" required />}
          </InputMask>
        </Box>
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#2e7d32' }}>
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          sx={{
            backgroundColor: '#2e7d32',
            '&:hover': { backgroundColor: '#1b5e20' },
            color: 'white',
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProdutorFormModal;
