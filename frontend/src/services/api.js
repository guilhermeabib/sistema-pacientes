import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const pacienteApi = {
  listar: (page = 1, limit = 10) =>
    api.get(`/pacientes?page=${page}&limit=${limit}`),

  buscarPorId: (id) => api.get(`/pacientes/${id}`),

  criar: (dados) => api.post('/pacientes', dados),

  atualizar: (id, dados) => api.put(`/pacientes/${id}`, dados),

  deletar: (id) => api.delete(`/pacientes/${id}`),
};

export default api;
