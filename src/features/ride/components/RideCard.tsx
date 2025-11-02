import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Rating } from 'primereact/rating';
import { Link } from 'react-router-dom';
import { RideStatus } from '../types';
import type { Ride, RideStatusType } from '../types';

interface RideCardProps {
  ride: Ride;
}

const getStatusBadge = (status: RideStatusType) => {
  switch (status) {
    case RideStatus.OPEN:
      return <Badge value="Disponible" severity="success" className="text-xs" />;
    case RideStatus.COMPLETED:
      return <Badge value="Completado" severity="info" className="text-xs" />;
    case RideStatus.CANCELLED:
      return <Badge value="Cancelado" severity="danger" className="text-xs" />;
    default:
      return <Badge value="Desconocido" severity="secondary" className="text-xs" />;
  }
};

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  
  return {
    date: date.toLocaleDateString('es-ES', dateOptions),
    time: date.toLocaleTimeString('es-ES', timeOptions)
  };
};

export const RideCard: React.FC<RideCardProps> = ({ ride }) => {
  const dateTime = formatDateTime(ride.departureTime);

  const footer = () => (
    <div className="flex gap-2">
      <Link to={`/rides/${ride.id}`} className="flex-1">
        <Button
          label="Ver Detalles"
          icon="pi pi-eye"
          className="w-full"
          outlined
          size="small"
        />
      </Link>
      {ride.status === RideStatus.OPEN && ride.availableSeats > 0 && (
        <Button
          label="Reservar"
          icon="pi pi-check"
          severity="success"
          size="small"
        />
      )}
    </div>
  );

  return (
    <Card
      className="hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200"
      key={ride.id}
      footer={footer()}
    >
      <div className="space-y-4">
        {/* Header with Status */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <i className="pi pi-map-marker text-blue-600 text-sm"></i>
              <span className="text-sm font-medium text-gray-900">{ride.origin}</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="pi pi-flag text-green-600 text-sm"></i>
              <span className="text-sm font-medium text-gray-900">{ride.destination}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {getStatusBadge(ride.status)}
            <div className="text-right">
              <div className="text-xs text-gray-500">Asientos</div>
              <div className="text-lg font-bold text-blue-600">{ride.availableSeats}</div>
            </div>
          </div>
        </div>

        {/* Date and Time Info */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Fecha</div>
                <div className="text-sm font-semibold text-gray-900">{dateTime.date}</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Hora</div>
                <div className="text-sm font-semibold text-gray-900">{dateTime.time}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Rating 
                value={ride.driverAverageRating || 0} 
                readOnly 
                cancel={false} 
                className="text-yellow-400"
                pt={{
                  onIcon: { className: 'text-yellow-400 text-sm' },
                  offIcon: { className: 'text-gray-300 text-sm' }
                }}
              />
              <span className="text-sm font-medium text-gray-700">
                {ride.driverAverageRating?.toFixed(1) || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};