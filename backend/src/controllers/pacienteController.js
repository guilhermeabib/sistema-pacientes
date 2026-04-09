const pacienteService = require('../services/pacienteService');

function validarPaciente(dados) {
  const erros = [];
  if (!dados.nome || dados.nome.trim().length < 3) {
    erros.push('Nome deve ter pelo menos 3 caracteres');
  }
  if (!dados.cpf || !/^\d{11}$/.test(dados.cpf.replace(/\D/g, ''))) {
    erros.push('CPF deve conter 11 dígitos');
  }
  if (!dados.data_nascimento) {
    erros.push('Data de nascimento é obrigatória');
  }
  if (!dados.genero || !['Masculino', 'Feminino', 'Outro'].includes(dados.genero)) {
    erros.push('Gênero deve ser Masculino, Feminino ou Outro');
  }
  if (!dados.endereco || dados.endereco.trim().length < 5) {
    erros.push('Endereço deve ter pelo menos 5 caracteres');
  }
  if (!dados.telefone || dados.telefone.trim().length < 10) {
    erros.push('Telefone deve ter pelo menos 10 caracteres');
  }
  if (!dados.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
    erros.push('E-mail inválido');
  }
  return erros;
}

const pacienteController = {
  async listar(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const resultado = await pacienteService.listarTodos(page, limit);
      res.json(resultado);
    } catch (error) {
      console.error('Erro ao listar pacientes:', error);
      res.status(500).json({ error: 'Erro ao listar pacientes' });
    }
  },

  async buscarPorId(req, res) {
    try {
      const paciente = await pacienteService.buscarPorId(req.params.id);
      if (!paciente) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
      res.json(paciente);
    } catch (error) {
      console.error('Erro ao buscar paciente:', error);
      res.status(500).json({ error: 'Erro ao buscar paciente' });
    }
  },

  async criar(req, res) {
    try {
      const erros = validarPaciente(req.body);
      if (erros.length > 0) {
        return res.status(400).json({ errors: erros });
      }
      const paciente = await pacienteService.criar(req.body);
      res.status(201).json(paciente);
    } catch (error) {
      console.error('Erro ao criar paciente:', error);
      res.status(500).json({ error: 'Erro ao criar paciente' });
    }
  },

  async atualizar(req, res) {
    try {
      const erros = validarPaciente(req.body);
      if (erros.length > 0) {
        return res.status(400).json({ errors: erros });
      }
      const atualizado = await pacienteService.atualizar(req.params.id, req.body);
      if (!atualizado) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
      res.json({ message: 'Paciente atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      res.status(500).json({ error: 'Erro ao atualizar paciente' });
    }
  },

  async deletar(req, res) {
    try {
      const deletado = await pacienteService.deletar(req.params.id);
      if (!deletado) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
      res.json({ message: 'Paciente deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar paciente:', error);
      res.status(500).json({ error: 'Erro ao deletar paciente' });
    }
  },
};

module.exports = pacienteController;
