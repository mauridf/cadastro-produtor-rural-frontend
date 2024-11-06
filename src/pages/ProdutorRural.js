import React, { useState, useEffect } from 'react';
import { Container, TextField, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import endpoints from '../config/apiEndPoints';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import ProdutorFormModal from './ProdutorFormModal';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function ProdutorRuralPage() {
  const [produtores, setProdutores] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredProdutores, setFilteredProdutores] = useState([]);
  const [page, setPage] = useState(0); // Página atual
  const [rowsPerPage, setRowsPerPage] = useState(10); // Número de registros por página
  const [openModal, setOpenModal] = useState(false);
  const [selectedProdutor, setSelectedProdutor] = useState(null); // Produtor selecionado para editar
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [produtorToDelete, setProdutorToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutores = async () => {
      try {
        const response = await axios.get(endpoints.produtores);
        setProdutores(response.data);
        setFilteredProdutores(response.data); // Inicialmente todos os produtores
      } catch (error) {
        console.error('Erro ao buscar produtores:', error);
      }
    };
    fetchProdutores();
  }, []);

  useEffect(() => {
    setFilteredProdutores(
      produtores.filter((produtor) =>
        produtor.nome.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, produtores]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (produtor = null) => {
    setSelectedProdutor(produtor);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveProdutor = () => {
    setOpenModal(false);
    axios.get(endpoints.produtores).then((response) => setProdutores(response.data));
  };

  const handleEdit = (id) => {
    const produtor = produtores.find((prod) => prod.id === id);
    handleOpenModal(produtor);
  };

  const handleConfirmDelete = (id) => {
    setProdutorToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${endpoints.deletarProdutor}/${produtorToDelete}`);
      setProdutores(produtores.filter((produtor) => produtor.id !== produtorToDelete)); // Atualiza a lista
      setConfirmDeleteOpen(false);
      setProdutorToDelete(null);
    } catch (error) {
      console.error('Erro ao deletar produtor:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4, color: '#2e7d32' }}>
        Produtores Rurais
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Pesquisar por nome"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: '300px', backgroundColor: 'white', borderRadius: 1 }}
          InputLabelProps={{
            style: { color: '#2e7d32' },
          }}
          InputProps={{
            style: { color: '#2e7d32' },
          }}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#2e7d32',
            '&:hover': {
              backgroundColor: '#1b5e20',
            },
          }}
          onClick={() => handleOpenModal()}
        >
          Cadastrar Novo
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#a5d6a7' }}>
              <TableCell sx={{ color: '#2e7d32', fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell sx={{ color: '#2e7d32', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: '#2e7d32', fontWeight: 'bold' }}>CPF/CNPJ</TableCell>
              <TableCell sx={{ color: '#2e7d32', fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProdutores
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((produtor) => (
                <TableRow key={produtor.id}>
                  <TableCell>{produtor.nome}</TableCell>
                  <TableCell>{produtor.email}</TableCell>
                  <TableCell>{produtor.cpfCnpj}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(produtor.id)}>
                      <Edit sx={{ color: '#2e7d32' }} />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleConfirmDelete(produtor.id)}>
                      <Delete sx={{ color: '#e53935' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredProdutores.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Registros por página"
        sx={{
          color: '#2e7d32',
          '.MuiTablePagination-actions': {
            color: '#2e7d32',
          },
        }}
      />

      <ProdutorFormModal
        open={openModal}
        handleClose={handleCloseModal}
        produtor={selectedProdutor}
        onSave={handleSaveProdutor}
      />

      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja excluir este produtor?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            color="secondary"
            sx={{ color: '#e53935' }}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ProdutorRuralPage;
