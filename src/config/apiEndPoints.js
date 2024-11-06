const API_BASE_URL = 'https://localhost:7186/api';

const endpoints = {
    // Usuario
    login: `${API_BASE_URL}/Usuario/login`,
    cadastrarUsuario: `${API_BASE_URL}/Usuario/cadastrar-usuario`,
    desativar: `${API_BASE_URL}/Usuario/desativar`,
    ativar: `${API_BASE_URL}/Usuario/ativar`,
    buscarPorEmail: `${API_BASE_URL}/Usuario/buscar-por-email`,
    // Cultura
    culturas: `${API_BASE_URL}/Cultura/todas`,
    cadastrarCultura: `${API_BASE_URL}/Cultura/cadastrar`,
    alterarCultura: `${API_BASE_URL}/Cultura/atualizar`,
    cultura: `${API_BASE_URL}/Cultura`,
    // Produtor Rural
    produtores: `${API_BASE_URL}/ProdutorRural/buscar-todos`,
    produtorPorId: `${API_BASE_URL}/ProdutorRural/buscar-por-id`,
    produtorPorCPF: `${API_BASE_URL}/ProdutorRural/buscar-por-cpf`,
    produtorPorCNPJ: `${API_BASE_URL}/ProdutorRural/buscar-por-cnpj`,
    cadastrarProdutor: `${API_BASE_URL}/ProdutorRural/cadastrar`,
    alterarProdutor: `${API_BASE_URL}/ProdutorRural/atualizar`,
    deletarProdutor: `${API_BASE_URL}/ProdutorRural/deletar`,
    // Fazenda
    fazendas: `${API_BASE_URL}/Fazenda/todas`,
    cadastrarFazenda: `${API_BASE_URL}/Fazenda/cadastrar`,
    fazenda: `${API_BASE_URL}/Fazenda`,
    atualizarFazenda: `${API_BASE_URL}/Fazenda/atualizar`,
    // Fazenda Cultura
    fazendaCulturas: `${API_BASE_URL}/FazendaCultura/todas`,
    cadastrarFazendaCultura: `${API_BASE_URL}/FazendaCultura/cadastrar`,
    fazendaCultura: `${API_BASE_URL}/FazendaCultura`,
    atualizarFazendaCultura: `${API_BASE_URL}/FazendaCultura/atualizar`,
    // Dashboard
    totalFazendas: `${API_BASE_URL}/DashBoard/total-fazendas`,
    totalHectaresFazendas: `${API_BASE_URL}/DashBoard/total-hectares-fazendas`,
    produtoresEstado: `${API_BASE_URL}/DashBoard/produtores-por-estado`,
    culturasPlantadas: `${API_BASE_URL}/DashBoard/culturas-plantadas`,
    usoSolo: `${API_BASE_URL}/DashBoard/uso-solo`,
};

export default endpoints;