import { Routes, Route, Navigate } from 'react-router-dom';
import { RideListPage } from '../pages/RideListPage';
import { RideRequestPage } from '../pages/RideRequestPage';
import { RideDetailPage } from '../pages/RideDetailPage';

export const RideRouter = () => {
  return (
    <Routes>
      {/* Redirección por defecto a la lista de viajes */}
      <Route path="/" element={<Navigate to="/rides/list" replace />} />
      
      {/* Lista de viajes disponibles */}
      <Route path="/list" element={<RideListPage />} />
      
      {/* Solicitar nuevo viaje */}
      <Route path="/request" element={<RideRequestPage />} />
      
      {/* Ver detalle de viaje específico */}
      <Route path="/:id" element={<RideDetailPage />} />
      
      {/* Ruta catch-all para rutas no encontradas dentro de rides */}
      <Route path="*" element={<Navigate to="/rides/list" replace />} />
    </Routes>
  );
};