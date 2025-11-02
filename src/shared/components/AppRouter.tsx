import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../types/routes';

import { IAMRouter } from '../../features/iam/components/IAMRouter';
import { ProfileRouter } from '../../features/profile/components/ProfileRouter';
import { ReportRouter } from '../../features/report/components/ReportRouter';
import { RideRouter } from '../../features/ride/components/RideRouter';

const HomePage = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>Bienvenido a la Ñango</h1>
    <p>Selecciona una opción del menú para comenzar</p>
    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      <a href="/auth/login" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
        Iniciar Sesión
      </a>
      <a href="/rides" style={{ padding: '0.5rem 1rem', backgroundColor: '#dc3545', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
        Viajes
      </a>
    </div>
  </div>
);

const NotFoundPage = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>404 - Página no encontrada</h1>
    <p>La página que buscas no existe.</p>
    <a href="/" style={{ color: '#007bff', textDecoration: 'none' }}>
      Volver al inicio
    </a>
  </div>
);

export const AppRouter = () => {
  return (
    <Routes>
        {/* Ruta principal */}
        <Route path={ROUTES.HOME} element={<HomePage />} />
        
        {/* Rutas de cada feature */}
        <Route path={`${ROUTES.IAM.BASE}/*`} element={<IAMRouter />} />
        <Route path={`${ROUTES.PROFILE.BASE}/*`} element={<ProfileRouter />} />
        <Route path={`${ROUTES.REPORT.BASE}/*`} element={<ReportRouter />} />
        <Route path={`${ROUTES.RIDE.BASE}/*`} element={<RideRouter />} />
        
        {/* Ruta catch-all para páginas no encontradas */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
};