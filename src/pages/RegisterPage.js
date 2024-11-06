import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Card, CardContent, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import endpoints from '../config/apiEndPoints'; // Importar os endpoints centralizados

function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senhaHash, setSenhaHash] = useState('');
  const [role, setRole] = useState(''); // Estado para armazenar a role selecionada
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redirecionar o usuário

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Limpa qualquer erro anterior

    try {
      const response = await axios.post(endpoints.cadastrarUsuario, {
        nome: nome,
        email: email,
        senhaHash: senhaHash,
        role: role,
        dataCadastro: new Date().toISOString(),
      });
      // Se o cadastro for bem-sucedido, redireciona para a página de login
      navigate('/login');
    } catch (error) {
      // Exibe a mensagem de erro
      setError('Ocorreu um erro ao registrar o usuário. Verifique os dados e tente novamente.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // Centraliza verticalmente
        }}
      >
        <Card sx={{ width: '100%', boxShadow: 3, borderRadius: 2, backgroundColor: '#a5d6a7' }}> {/* Cor verde clara */}
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                Cadastro de Usuário
              </Typography>

              <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nome"
                  label="Nome"
                  name="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  autoFocus
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="senhaHash"
                  label="Senha"
                  type="password"
                  id="senhaHash"
                  autoComplete="current-password"
                  value={senhaHash}
                  onChange={(e) => setSenhaHash(e.target.value)}
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                />

                {/* Campo de seleção de Role */}
                <FormControl fullWidth margin="normal">
                  <InputLabel id="role-select-label">Selecione o Tipo de Usuário</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role"
                    value={role}
                    label="Selecione o Tipo de Usuário"
                    onChange={(e) => setRole(e.target.value)}
                    required
                    sx={{ backgroundColor: 'white', borderRadius: 1 }}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Produtor">Produtor</MenuItem>
                  </Select>
                </FormControl>

                {error && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: '#2e7d32', // Cor verde escuro para o botão
                    '&:hover': {
                      backgroundColor: '#1b5e20',
                    },
                  }}
                >
                  Cadastrar
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default RegisterPage;
