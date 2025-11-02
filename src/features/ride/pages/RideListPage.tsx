import { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Link } from 'react-router-dom';
import { RideStatus } from '../types';
import type { Ride, RideSearchFilters } from '../types';
import { RideCard } from '../components/RideCard';

// Mock data - en producción vendría de una API
const mockRides: Ride[] = [
  {
    id: 1,
    driverUserId: 101,
    origin: 'Universidad UPC - San Isidro',
    destination: 'Miraflores - Parque Kennedy',
    availableSeats: 3,
    departureTime: '2024-01-15T08:00:00',
    driverAverageRating: 4.8,
    status: RideStatus.OPEN
  },
  {
    id: 2,
    driverUserId: 102,
    origin: 'Universidad UPC - Monterrico',
    destination: 'San Borja - Metro',
    availableSeats: 2,
    departureTime: '2024-01-15T18:30:00',
    driverAverageRating: 4.5,
    status: RideStatus.OPEN
  },
  {
    id: 3,
    driverUserId: 103,
    origin: 'Surco - Jockey Plaza',
    destination: 'Universidad UPC - San Isidro',
    availableSeats: 1,
    departureTime: '2024-01-16T07:15:00',
    driverAverageRating: 4.9,
    status: RideStatus.OPEN
  }
];

export const RideListPage = () => {
  const [rides, _setRides] = useState<Ride[]>(mockRides);
  const [filters, setFilters] = useState<RideSearchFilters>({});
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8 lg:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Viajes Disponibles
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Encuentra el viaje perfecto para tu destino
          </p>
        </div>

        {/* Filters Sidebar */}
        <div className="xl:w-80 2xl:w-96 flex-shrink-0">
          <div className="sticky top-6">
            <Card
              className="shadow-lg border-0 bg-white/80 backdrop-blur-sm"
              footer={()=>(<Button
                  label="Buscar"
                  icon="pi pi-search"
                  className='w-full mt-5'
                  loading={loading}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 1000);
                  }}
                />)}
            >
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mx-0 flex items-center gap-2">
                  <i className="pi pi-filter text-blue-600"></i>
                  Filtros de Búsqueda
                </h3>
                
                <div className="space-y-4 flex felx-col gap-3">
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <i className="pi pi-map-marker text-green-600 text-xs"></i>
                      Origen
                    </label>
                    <InputText
                      placeholder="¿Desde dónde viajas?"
                      value={filters.origin || ''}
                      onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-colors"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <i className="pi pi-flag text-red-600 text-xs"></i>
                      Destino
                    </label>
                    <InputText
                      placeholder="¿A dónde vas?"
                      value={filters.destination || ''}
                      onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-colors"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <i className="pi pi-calendar text-xs"></i>
                      Fecha
                    </label>
                    <Calendar
                      placeholder="Selecciona fecha"
                      value={filters.departureDate ? new Date(filters.departureDate) : null}
                      onChange={(e) => setFilters({ ...filters, departureDate: e.value ? e.value.toISOString().split('T')[0] : undefined })}
                      className="w-full"
                      showIcon
                      dateFormat="dd/mm/yy"
                      inputClassName="p-3 border-2 border-gray-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Results Section */}
        <div>
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center my-4 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {rides.length} viajes encontrados
              </h2>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <i className="pi pi-sort-amount-down text-xs"></i>
                Ordenados por hora de salida
              </p>
            </div>
            
            <Link to="/rides/request" className='w-full sm:w-auto'>
              <Button
                label="Solicitar Viaje"
                icon="pi pi-plus"
                className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                severity="success"
              />
            </Link>
          </div>

          {/* Rides Grid */}
          <div className="flex flex-column gap-6">
            {rides.map((ride) => (
              <div key={ride.id} className="transform transition-all duration-200 hover:scale-101">
                <RideCard ride={ride} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {rides.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <div className="text-gray-300 text-8xl mb-6">
                  <i className="pi pi-car"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  No se encontraron viajes
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Intenta ajustar tus filtros de búsqueda o explora otras opciones
                </p>
                <Link to="/rides/request">
                  <Button
                    label="Solicitar un Viaje"
                    icon="pi pi-plus"
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    severity="success"
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};