const pool = require('../config/database');

const pacienteService = {
  async listarTodos(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(
      'SELECT * FROM pacientes ORDER BY id DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM pacientes');
    return { data: rows, total, page, totalPages: Math.ceil(total / limit) };
  },

  async buscarPorId(id) {
    const [rows] = await pool.query('SELECT * FROM pacientes WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async criar(paciente) {
    const { nome, cpf, data_nascimento, genero, endereco, telefone, email } = paciente;
    const [result] = await pool.query(
      'INSERT INTO pacientes (nome, cpf, data_nascimento, genero, endereco, telefone, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nome, cpf, data_nascimento, genero, endereco, telefone, email]
    );
    return { id: result.insertId, ...paciente };
  },

  async atualizar(id, paciente) {
    const { nome, cpf, data_nascimento, genero, endereco, telefone, email } = paciente;
    const [result] = await pool.query(
      'UPDATE pacientes SET nome = ?, cpf = ?, data_nascimento = ?, genero = ?, endereco = ?, telefone = ?, email = ? WHERE id = ?',
      [nome, cpf, data_nascimento, genero, endereco, telefone, email, id]
    );
    return result.affectedRows > 0;
  },

  async deletar(id) {
    const [result] = await pool.query('DELETE FROM pacientes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = pacienteService;
