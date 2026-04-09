import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ListaPacientes from './pages/ListaPacientes';
import FormularioPaciente from './pages/FormularioPaciente';
import DetalhesPaciente from './pages/DetalhesPaciente';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ListaPacientes />} />
        <Route path="/cadastrar" element={<FormularioPaciente />} />
        <Route path="/editar/:id" element={<FormularioPaciente />} />
        <Route path="/paciente/:id" element={<DetalhesPaciente />} />
      </Routes>
    </Layout>
  );
}

export default App;
