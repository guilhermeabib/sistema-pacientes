import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pacienteApi } from '../services/api';
import { FiEye, FiEdit, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function ListaPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const carregarPacientes = async (pagina) => {
    try {
      setLoading(true);
      setErro('');
      const response = await pacienteApi.listar(pagina);
      setPacientes(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setErro('Erro ao carregar pacientes. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPacientes(page);
  }, [page]);

  const handleDeletar = async (id, nome) => {
    if (!window.confirm(`Deseja realmente excluir o paciente "${nome}"?`)) return;
    try {
      await pacienteApi.deletar(id);
      carregarPacientes(page);
    } catch (error) {
      setErro('Erro ao excluir paciente.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Lista de Pacientes</h1>
        <Link
          to="/cadastrar"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Novo Paciente
        </Link>
      </div>

      {erro && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {erro}
        </div>
      )}

      {pacientes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">Nenhum paciente cadastrado.</p>
          <Link to="/cadastrar" className="text-blue-600 hover:underline mt-2 inline-block">
            Cadastrar primeiro paciente
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Nome</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">CPF</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Telefone</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">E-mail</th>
                  <th className="text-center px-6 py-3 text-sm font-semibold text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pacientes.map((paciente) => (
                  <tr key={paciente.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">{paciente.nome}</td>
                    <td className="px-6 py-4 text-gray-600">{paciente.cpf}</td>
                    <td className="px-6 py-4 text-gray-600">{paciente.telefone}</td>
                    <td className="px-6 py-4 text-gray-600">{paciente.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => navigate(`/paciente/${paciente.id}`)}
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition"
                          title="Visualizar"
                        >
                          <FiEye size={18} />
                        </button>
                        <button
                          onClick={() => navigate(`/editar/${paciente.id}`)}
                          className="text-yellow-600 hover:bg-yellow-50 p-2 rounded-lg transition"
                          title="Editar"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeletar(paciente.id, paciente.nome)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                          title="Excluir"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <FiChevronLeft /> Anterior
              </button>
              <span className="text-gray-600 font-medium">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Próxima <FiChevronRight />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ListaPacientes;
