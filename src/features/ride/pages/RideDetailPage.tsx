import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Rating } from 'primereact/rating';
import { Divider } from 'primereact/divider';
import { Avatar } from 'primereact/avatar';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { RideStatus } from '../types';
import type { Ride } from '../types';

// Mock data - en producción vendría de una API
const mockRide: Ride = {
  id: 1,
  driverUserId: 101,
  origin: 'Universidad UPC - San Isidro',
  destination: 'Miraflores - Parque Kennedy',
  availableSeats: 3,
  departureTime: '2024-01-15T08:00:00',
  driverAverageRating: 4.8,
  status: RideStatus.OPEN,
  rating: undefined,
  passengerUserId: undefined
};

const mockDriver = {
  id: 101,
  name: 'Carlos Mendoza',
  email: 'carlos.mendoza@upc.edu.pe',
  phone: '+51 987 654 321',
  avatar: undefined,
  carModel: 'Toyota Corolla 2020',
  carPlate: 'ABC-123',
  memberSince: '2023-03-15'
};

export const RideDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ride, setRide] = useState<Ride | undefined>(undefined);
  const [driver, setDriver] = useState<any>(undefined);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [selectedRide, setSelectedRide] = useState<Ride | undefined>(undefined);
  const [selectedPassenger, setSelectedPassenger] = useState<any>(undefined);
  const [bookingMessage, setBookingMessage] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    setRide(mockRide);
    setDriver(mockDriver);
  }, [id]);

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('es-PE', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('es-PE', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const getStatusBadge = (status: keyof typeof RideStatus) => {
    const statusConfig = {
      [RideStatus.OPEN]: { severity: 'success' as const, label: 'Disponible' },
      [RideStatus.COMPLETED]: { severity: 'info' as const, label: 'Completado' },
      [RideStatus.CANCELLED]: { severity: 'danger' as const, label: 'Cancelado' }
    };
    
    return statusConfig[status];
  };

  const handleBookRide = () => {
    setSelectedRide(ride);
    setShowBookingDialog(true);
  };

  const handleContactDriver = () => {
    setSelectedPassenger(driver);
    setShowContactDialog(true);
  };

  const confirmBooking = () => {
    console.log('Booking confirmed:', { ride: selectedRide, message: bookingMessage });
    setShowBookingDialog(false);
    setBookingMessage('');
    // Aquí iría la lógica para confirmar la reserva
  };

  const sendMessage = () => {
    console.log('Message sent:', { driver: selectedPassenger, message: contactMessage });
    setShowContactDialog(false);
    setContactMessage('');
    // Aquí iría la lógica para enviar el mensaje
  };

  if (!ride || !driver) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="text-center py-8">
            <i className="pi pi-spin pi-spinner text-4xl text-blue-600 mb-4"></i>
            <p className="text-gray-600">Cargando detalles del viaje...</p>
          </div>
        </Card>
      </div>
    );
  }

  const dateTime = formatDateTime(ride.departureTime);
  const statusBadge = getStatusBadge(ride.status);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <Button
            icon="pi pi-arrow-left"
            rounded
            outlined
            onClick={() => navigate(-1)}
            className="flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
              Detalles del Viaje
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Información completa del viaje
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Overview Card */}
            <Card className="shadow-sm">
              <div className="space-y-6">
                {/* Status and Route */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge
                        value={statusBadge.label}
                        severity={statusBadge.severity}
                        className="text-sm"
                      />
                      <span className="text-sm text-gray-600">
                        ID: #{ride.id}
                      </span>
                    </div>
                    
                    {/* Route Visualization */}
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center mt-1 flex-shrink-0">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <div className="w-0.5 h-12 bg-gray-300"></div>
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 min-w-0 space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Origen</p>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">
                            {ride.origin}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Destino</p>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">
                            {ride.destination}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Divider />

                {/* Trip Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Fecha</p>
                      <p className="font-medium text-gray-900">{dateTime.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Hora de salida</p>
                      <p className="font-medium text-gray-900 text-lg">{dateTime.time}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Asientos disponibles</p>
                      <p className="font-medium text-gray-900 text-lg">{ride.availableSeats}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Precio estimado</p>
                      <p className="font-medium text-green-600 text-lg">S/ 15.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Driver Information Card */}
            <Card className="shadow-sm mt-5">
              <div className="space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Información del Conductor
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Driver Avatar and Basic Info */}
                  <div className="flex items-center gap-4 sm:flex-col sm:items-center sm:text-center">
                    <Avatar
                      image={driver.avatar}
                      icon="pi pi-user"
                      size="xlarge"
                      shape="circle"
                      className="bg-blue-100 text-blue-600 flex-shrink-0"
                    />
                    <div className="flex-1 sm:flex-none">
                      <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
                        {driver.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Miembro desde {new Date(driver.memberSince).getFullYear()}
                      </p>
                    </div>
                  </div>

                  {/* Driver Details */}
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Calificación</p>
                        <div className="flex items-center justify-center gap-2">
                          <Rating
                            value={ride.driverAverageRating}
                            readOnly
                            cancel={false}
                            className="text-sm"
                          />
                          <span className="font-medium text-gray-900">
                            {ride.driverAverageRating}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Vehículo</p>
                        <p className="font-medium text-gray-900">{driver.carModel}</p>
                        <p className="text-sm text-gray-600">{driver.carPlate}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        label="Contactar"
                        icon="pi pi-phone"
                        outlined
                        className="flex-1"
                        onClick={handleContactDriver}
                      />
                      <Button
                        label="Ver Perfil"
                        icon="pi pi-user"
                        outlined
                        className="flex-1"
                        onClick={() => console.log('Ver perfil del conductor')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Safety Tips Card - Mobile/Tablet Only */}
            <Card className="shadow-sm lg:hidden">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <i className="pi pi-shield text-green-600"></i>
                  Consejos de Seguridad
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <i className="pi pi-check-circle text-green-500 mt-0.5 flex-shrink-0"></i>
                    <span>Verifica la identidad del conductor antes de subir</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="pi pi-check-circle text-green-500 mt-0.5 flex-shrink-0"></i>
                    <span>Comparte tu ubicación con familiares o amigos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="pi pi-check-circle text-green-500 mt-0.5 flex-shrink-0"></i>
                    <span>Usa el cinturón de seguridad durante todo el viaje</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <Card className="shadow-sm sticky top-6">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 mb-1">S/ 15.00</p>
                  <p className="text-sm text-gray-600">Precio por persona</p>
                </div>
                
                <Divider />
                
                <div className="space-y-3 flex gap-3">
                  {ride.status === RideStatus.OPEN ? (
                    <Button
                      label="Reservar Asiento"
                      icon="pi pi-calendar-plus"
                      className="w-full"
                      size="large"
                      onClick={handleBookRide}
                    />
                  ) : (
                    <Button
                      label="No Disponible"
                      className="w-full"
                      size="large"
                      disabled
                    />
                  )}
                  
                  <Button
                    label="Compartir Viaje"
                    icon="pi pi-share-alt"
                    outlined
                    className="w-full"
                    onClick={() => console.log('Compartir viaje')}
                  />
                </div>
                
                <div className="text-center pt-2">
                  <p className="text-xs text-gray-500">
                    Cancela gratis hasta 2 horas antes
                  </p>
                </div>
              </div>
            </Card>

            {/* Safety Tips Card - Desktop Only */}
            <Card className="shadow-sm hidden lg:block mt-5">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <i className="pi pi-shield text-green-600"></i>
                  Consejos de Seguridad
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <i className="pi pi-check-circle text-green-500 mt-0.5 flex-shrink-0"></i>
                    <span>Verifica la identidad del conductor antes de subir</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="pi pi-check-circle text-green-500 mt-0.5 flex-shrink-0"></i>
                    <span>Comparte tu ubicación con familiares o amigos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="pi pi-check-circle text-green-500 mt-0.5 flex-shrink-0"></i>
                    <span>Usa el cinturón de seguridad durante todo el viaje</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="pi pi-check-circle text-green-500 mt-0.5 flex-shrink-0"></i>
                    <span>Reporta cualquier comportamiento inapropiado</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Booking Dialog */}
        <Dialog
          header="Confirmar Reserva"
          visible={showBookingDialog}
          onHide={() => setShowBookingDialog(false)}
          className="w-full max-w-md mx-4"
          breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        >
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Resumen del Viaje</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Origen:</strong> {selectedRide?.origin}</p>
                <p><strong>Destino:</strong> {selectedRide?.destination}</p>
                <p><strong>Fecha:</strong> {selectedRide && formatDateTime(selectedRide.departureTime).date}</p>
                <p><strong>Hora:</strong> {selectedRide && formatDateTime(selectedRide.departureTime).time}</p>
                <p><strong>Precio:</strong> S/ 15.00</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje para el conductor (opcional)
              </label>
              <InputTextarea
                value={bookingMessage}
                onChange={(e) => setBookingMessage(e.target.value)}
                placeholder="Ej: Estaré esperando en la puerta principal..."
                rows={3}
                className="w-full"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                label="Cancelar"
                outlined
                className="flex-1"
                onClick={() => setShowBookingDialog(false)}
              />
              <Button
                label="Confirmar Reserva"
                className="flex-1"
                onClick={confirmBooking}
              />
            </div>
          </div>
        </Dialog>

        {/* Contact Dialog */}
        <Dialog
          header="Contactar Conductor"
          visible={showContactDialog}
          onHide={() => setShowContactDialog(false)}
          className="w-full max-w-md mx-4"
          breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Avatar
                image={selectedPassenger?.avatar}
                icon="pi pi-user"
                size="large"
                shape="circle"
                className="bg-blue-100 text-blue-600"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{selectedPassenger?.name}</h4>
                <p className="text-sm text-gray-600">{selectedPassenger?.phone}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje
              </label>
              <InputTextarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                rows={4}
                className="w-full"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                label="Cancelar"
                outlined
                className="flex-1"
                onClick={() => setShowContactDialog(false)}
              />
              <Button
                label="Enviar Mensaje"
                className="flex-1"
                onClick={sendMessage}
              />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};