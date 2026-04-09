import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { pacienteApi } from '../services/api';
import { FiArrowLeft, FiEdit, FiTrash2 } from 'react-icons/fi';

function DetalhesPaciente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    pacienteApi
      .buscarPorId(id)
      .then((res) => setPaciente(res.data))
      .catch(() => setErro('Erro ao carregar dados do paciente.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDeletar = async () => {
    if (!window.confirm(`Deseja realmente excluir o paciente "${paciente.nome}"?`)) return;
    try {
      await pacienteApi.deletar(id);
      navigate('/');
    } catch (error) {
      setErro('Erro ao excluir paciente.');
    }
  };

  const formatarData = (data) => {
    if (!data) return '-';
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {erro}
        </div>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Voltar à lista
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-gray-600 hover:text-gray-800 transition"
        >
          <FiArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Detalhes do Paciente</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{paciente.nome}</h2>
            <p className="text-gray-500 text-sm mt-1">ID: {paciente.id}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/editar/${paciente.id}`)}
              className="flex items-center gap-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition text-sm font-medium"
            >
              <FiEdit size={16} /> Editar
            </button>
            <button
              onClick={handleDeletar}
              className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium"
            >
              <FiTrash2 size={16} /> Excluir
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">CPF</p>
              <p className="text-lg text-gray-800">{paciente.cpf}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Data de Nascimento</p>
              <p className="text-lg text-gray-800">{formatarData(paciente.data_nascimento)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Gênero</p>
              <p className="text-lg text-gray-800">{paciente.genero}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Endereço</p>
              <p className="text-lg text-gray-800">{paciente.endereco}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Telefone</p>
              <p className="text-lg text-gray-800">{paciente.telefone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">E-mail</p>
              <p className="text-lg text-gray-800">{paciente.email}</p>
            </div>
          </div>
        </div>

        {paciente.criado_em && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-400">
              Cadastrado em: {formatarData(paciente.criado_em)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetalhesPaciente;
