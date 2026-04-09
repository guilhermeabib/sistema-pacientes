import { Link, useLocation } from 'react-router-dom';
import { FiUsers, FiUserPlus, FiHome } from 'react-icons/fi';

function Layout({ children }) {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'bg-blue-700 text-white'
      : 'text-blue-100 hover:bg-blue-600';

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <FiUsers size={28} />
            Gestão de Pacientes
          </Link>
          <nav className="flex gap-2">
            <Link
              to="/"
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition ${isActive('/')}`}
            >
              <FiHome size={18} />
              Início
            </Link>
            <Link
              to="/cadastrar"
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition ${isActive('/cadastrar')}`}
            >
              <FiUserPlus size={18} />
              Novo Paciente
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>

      <footer className="bg-gray-800 text-gray-300 text-center py-4 mt-8">
        <p>
          Desenvolvido por <span className="font-semibold text-white">Guilherme Augusto Santiago Abib</span>
        </p>
        <p className="text-sm text-gray-400 mt-1">Sistema de Gestão de Pacientes - 2026</p>
      </footer>
    </div>
  );
}

export default Layout;
