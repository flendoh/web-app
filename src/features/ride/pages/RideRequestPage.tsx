import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import type { CreateRideRequest } from '../types';

export const RideRequestPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateRideRequest>({
    origin: '',
    destination: '',
    departureTime: '',
    availableSeats: 1,
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeOptions = [
    { label: '06:00', value: '06:00' },
    { label: '06:30', value: '06:30' },
    { label: '07:00', value: '07:00' },
    { label: '07:30', value: '07:30' },
    { label: '08:00', value: '08:00' },
    { label: '08:30', value: '08:30' },
    { label: '09:00', value: '09:00' },
    { label: '09:30', value: '09:30' },
    { label: '10:00', value: '10:00' },
    { label: '10:30', value: '10:30' },
    { label: '11:00', value: '11:00' },
    { label: '11:30', value: '11:30' },
    { label: '12:00', value: '12:00' },
    { label: '12:30', value: '12:30' },
    { label: '13:00', value: '13:00' },
    { label: '13:30', value: '13:30' },
    { label: '14:00', value: '14:00' },
    { label: '14:30', value: '14:30' },
    { label: '15:00', value: '15:00' },
    { label: '15:30', value: '15:30' },
    { label: '16:00', value: '16:00' },
    { label: '16:30', value: '16:30' },
    { label: '17:00', value: '17:00' },
    { label: '17:30', value: '17:30' },
    { label: '18:00', value: '18:00' },
    { label: '18:30', value: '18:30' },
    { label: '19:00', value: '19:00' },
    { label: '19:30', value: '19:30' },
    { label: '20:00', value: '20:00' },
    { label: '20:30', value: '20:30' },
    { label: '21:00', value: '21:00' },
    { label: '21:30', value: '21:30' },
    { label: '22:00', value: '22:00' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.origin.trim()) {
      newErrors.origin = 'El origen es requerido';
    }

    if (!formData.destination.trim()) {
      newErrors.destination = 'El destino es requerido';
    }

    if (!formData.departureTime) {
      newErrors.departureTime = 'La fecha y hora son requeridas';
    }

    if (!formData.availableSeats || formData.availableSeats < 1 || formData.availableSeats > 8) {
      newErrors.availableSeats = 'Los asientos deben estar entre 1 y 8';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envío de datos
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Ride request submitted:', formData);
      
      // Mostrar mensaje de éxito y redirigir
      alert('¡Viaje publicado exitosamente!');
      navigate('/rides');
    } catch (error) {
      console.error('Error submitting ride request:', error);
      alert('Error al publicar el viaje. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CreateRideRequest, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <Button
            icon="pi pi-arrow-left"
            rounded
            outlined
            onClick={() => navigate(-1)}
            className="flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Publicar Viaje
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Comparte tu viaje con otros estudiantes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Route Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                    <i className="pi pi-map-marker text-blue-600 text-lg"></i>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      Ruta del Viaje
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {/* Origin */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Origen *
                      </label>
                      <div className="relative">
                        <i className="pi pi-circle text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2 text-sm"></i>
                        <InputText
                          value={formData.origin}
                          onChange={(e) => handleInputChange('origin', e.target.value)}
                          placeholder="Ej: Universidad UPC - San Isidro"
                          className={`w-full pl-10 ${errors.origin ? 'p-invalid' : ''}`}
                        />
                      </div>
                      {errors.origin && (
                        <small className="text-red-600">{errors.origin}</small>
                      )}
                    </div>

                    {/* Destination */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Destino *
                      </label>
                      <div className="relative">
                        <i className="pi pi-circle text-red-500 absolute left-3 top-1/2 transform -translate-y-1/2 text-sm"></i>
                        <InputText
                          value={formData.destination}
                          onChange={(e) => handleInputChange('destination', e.target.value)}
                          placeholder="Ej: Miraflores - Parque Kennedy"
                          className={`w-full pl-10 ${errors.destination ? 'p-invalid' : ''}`}
                        />
                      </div>
                      {errors.destination && (
                        <small className="text-red-600">{errors.destination}</small>
                      )}
                    </div>
                  </div>
                </div>

                {/* Schedule Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                    <i className="pi pi-calendar text-blue-600 text-lg"></i>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      Horario
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Date */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Fecha *
                      </label>
                      <Calendar
                        value={formData.departureTime ? new Date(formData.departureTime) : null}
                        onChange={(e) => {
                          if (e.value) {
                            const date = e.value as Date;
                            handleInputChange('departureTime', date.toISOString());
                          }
                        }}
                        placeholder="Selecciona una fecha"
                        className={`w-full ${errors.departureTime ? 'p-invalid' : ''}`}
                        minDate={new Date()}
                        showIcon
                        dateFormat="dd/mm/yy"
                      />
                      {errors.departureTime && (
                        <small className="text-red-600">{errors.departureTime}</small>
                      )}
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Hora de salida *
                      </label>
                      <Dropdown
                        value={formData.departureTime ? new Date(formData.departureTime).toTimeString().slice(0, 5) : ''}
                        onChange={(e) => {
                          if (formData.departureTime && e.value) {
                            const date = new Date(formData.departureTime);
                            const [hours, minutes] = e.value.split(':');
                            date.setHours(parseInt(hours), parseInt(minutes));
                            handleInputChange('departureTime', date.toISOString());
                          }
                        }}
                        options={timeOptions}
                        placeholder="Selecciona hora"
                        className="w-full"
                        showClear={false}
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle Details Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                    <i className="pi pi-car text-blue-600 text-lg"></i>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      Detalles del Vehículo
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Available Seats */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Asientos disponibles *
                      </label>
                      <InputNumber
                        value={formData.availableSeats}
                        onValueChange={(e) => handleInputChange('availableSeats', e.value)}
                        placeholder="Número de asientos"
                        className={`w-full ${errors.availableSeats ? 'p-invalid' : ''}`}
                        min={1}
                        max={8}
                        showButtons
                        buttonLayout="horizontal"
                        decrementButtonClassName="p-button-secondary"
                        incrementButtonClassName="p-button-secondary"
                      />
                      {errors.availableSeats && (
                        <small className="text-red-600">{errors.availableSeats}</small>
                      )}
                      <small className="text-gray-500">
                        Máximo 8 asientos disponibles
                      </small>
                    </div>

                    {/* Estimated Price */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Precio estimado por persona
                      </label>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <span className="text-lg font-semibold text-green-600">S/ 15.00</span>
                        <small className="text-gray-500">
                          (Precio sugerido basado en la ruta)
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                    <i className="pi pi-info-circle text-blue-600 text-lg"></i>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      Información Adicional
                    </h2>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Notas para los pasajeros (opcional)
                    </label>
                    <InputTextarea
                      value={formData.notes || ''}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Ej: Salida puntual, no fumar en el vehículo, equipaje ligero..."
                      rows={4}
                      className="w-full"
                      maxLength={500}
                    />
                    <small className="text-gray-500">
                      {(formData.notes?.length || 0)}/500 caracteres
                    </small>
                  </div>
                </div>

                {/* Form Actions - Mobile */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 lg:hidden">
                  <Button
                    type="button"
                    label="Cancelar"
                    outlined
                    className="flex-1"
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                  />
                  <Button
                    type="submit"
                    label={isSubmitting ? "Publicando..." : "Publicar Viaje"}
                    icon={isSubmitting ? "pi pi-spin pi-spinner" : "pi pi-check"}
                    className="flex-1"
                    loading={isSubmitting}
                  />
                </div>
              </form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview Card */}
            <Card className="shadow-sm sticky top-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <i className="pi pi-eye text-blue-600"></i>
                  Vista Previa
                </h3>
                
                <div className="space-y-4 text-sm">
                  {/* Route Preview */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center mt-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="w-0.5 h-8 bg-gray-300"></div>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <p className="text-gray-600">Origen</p>
                          <p className="font-medium text-gray-900">
                            {formData.origin || 'No especificado'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Destino</p>
                          <p className="font-medium text-gray-900">
                            {formData.destination || 'No especificado'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fecha:</span>
                      <span className="font-medium">
                        {formData.departureTime 
                          ? new Date(formData.departureTime).toLocaleDateString('es-PE')
                          : 'No especificada'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hora:</span>
                      <span className="font-medium">
                        {formData.departureTime 
                          ? new Date(formData.departureTime).toLocaleTimeString('es-PE', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })
                          : 'No especificada'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Asientos:</span>
                      <span className="font-medium">{formData.availableSeats || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Precio:</span>
                      <span className="font-medium text-green-600">S/ 15.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Form Actions - Desktop */}
            <Card className="shadow-sm hidden lg:block">
              <div className="space-y-3">
                <Button
                  type="submit"
                  label={isSubmitting ? "Publicando..." : "Publicar Viaje"}
                  icon={isSubmitting ? "pi pi-spin pi-spinner" : "pi pi-check"}
                  className="w-full"
                  size="large"
                  loading={isSubmitting}
                  onClick={handleSubmit}
                />
                <Button
                  type="button"
                  label="Cancelar"
                  outlined
                  className="w-full"
                  onClick={() => navigate(-1)}
                  disabled={isSubmitting}
                />
              </div>
            </Card>

            {/* Tips Card */}
            <Card className="shadow-sm">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <i className="pi pi-lightbulb text-yellow-500"></i>
                  Consejos
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <i className="pi pi-check-circle text-green-500 mt-0.5 flex-shrink-0"></i>
                    <span>Sé puntual en la hora de salida</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="pi pi-check-circle text-green-500 mt-0.5 flex-shrink-0"></i>
                    <span>Mantén tu vehículo limpio y en buen estado</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="pi pi-check-circle text-green-500 mt-0.5 flex-shrink-0"></i>
                    <span>Comunícate claramente con los pasajeros</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="pi pi-check-circle text-green-500 mt-0.5 flex-shrink-0"></i>
                    <span>Respeta las normas de tránsito</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Success Message */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <div className="text-center py-6">
                <i className="pi pi-spin pi-spinner text-4xl text-blue-600 mb-4"></i>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Publicando tu viaje...
                </h3>
                <p className="text-gray-600">
                  Por favor espera mientras procesamos tu solicitud
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};