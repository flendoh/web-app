import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';

export const ProfileViewPage = () => {
  // Datos de ejemplo del usuario - estructura que coincide con la API
  const profileData = {
    id: 1,
    fullName: 'Juan Pérez García',
    email: 'juan.perez@email.com',
    phone: '+1 234 567 8900',
    licenseNumber: 'LIC-123456',
    bio: 'Desarrollador apasionado por la tecnología y la innovación. Con experiencia en transporte compartido y comprometido con la seguridad vial.',
    rating: 4.8,
    userId: 'user-123',
    userType: 'DRIVER',
    joinDate: '15 de Enero, 2024'
  };

  const getUserTypeLabel = (userType: string) => {
    switch (userType) {
      case 'DRIVER':
        return { label: 'Conductor', severity: 'success' as const };
      case 'PASSENGER':
        return { label: 'Pasajero', severity: 'info' as const };
      default:
        return { label: 'Usuario', severity: 'warning' as const };
    }
  };

  const userTypeInfo = getUserTypeLabel(profileData.userType);

  const header = (
    <div className="flex align-items-center justify-content-between p-5">
      <div className="flex align-items-center gap-3">
        <Avatar 
          image="https://via.placeholder.com/150/007bff/ffffff?text=JP" 
          size="xlarge" 
          shape="circle"
          className="border-2 border-primary"
        />
        <div>
          <h1 className="text-2xl font-bold text-900 mb-1">{profileData.fullName}</h1>
          <div className="flex align-items-center gap-2">
            <Tag 
              value={userTypeInfo.label} 
              severity={userTypeInfo.severity}
              className="text-sm"
            />
            <Badge value="Verificado" severity="success" className="ml-2"></Badge>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-primary mb-1">
          {profileData.rating}
          <i className="pi pi-star-fill text-yellow-500 ml-2"></i>
        </div>
        <div className="text-600 text-sm">Calificación</div>
      </div>
    </div>
  );

  const footer = (
    <div className="flex flex-wrap gap-2 justify-content-end">
      <Button 
        label="Editar Perfil" 
        icon="pi pi-user-edit"
        className="p-button-primary"
        onClick={() => window.location.href = '/profile/edit'}
      />
      <Button 
        label="Configuración" 
        icon="pi pi-cog"
        className="p-button-secondary"
        onClick={() => window.location.href = '/profile/settings'}
      />
      <Button 
        label="Volver al Inicio" 
        icon="pi pi-home"
        className="p-button-success"
        onClick={() => window.location.href = '/'}
      />
    </div>
  );

  return (
    <div className="surface-ground min-h-screen py-4">
      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-8 mx-auto">
        <Card header={header} footer={footer} className="border-none shadow-none">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-900 mb-3">
              <i className="pi pi-info-circle mr-2" />
              Información Personal
            </h3>
            <Divider className="mb-4" />
          </div>

          <div className="flex flex-wrap justify-content-center gap-5">
            <div className="text-center p-3">
              <div className="text-600 font-medium mb-2">Email</div>
              <div className="text-900 flex align-items-center justify-content-center">
                <i className="pi pi-envelope text-primary mr-2" />
                <span>{profileData.email}</span>
              </div>
            </div>

            <div className="text-center p-3">
              <div className="text-600 font-medium mb-2">Teléfono</div>
              <div className="text-900 flex align-items-center justify-content-center">
                <i className="pi pi-phone text-primary mr-2" />
                <span>{profileData.phone}</span>
              </div>
            </div>

            <div className="text-center p-3">
              <div className="text-600 font-medium mb-2">
                Número de Licencia
              </div>
              <div className="text-900 flex align-items-center justify-content-center">
                <i className="pi pi-id-card text-primary mr-2" />
                <span>{profileData.licenseNumber}</span>
                <Badge value="Válida" severity="success" className="ml-2" />
              </div>
            </div>

            <div className="text-center p-3">
              <div className="text-600 font-medium mb-2">Miembro desde</div>
              <div className="text-900 flex align-items-center justify-content-center">
                <i className="pi pi-calendar text-primary mr-2" />
                <span>{profileData.joinDate}</span>
              </div>
            </div>
            {profileData.bio && (
              <div className="col-12">
                <Divider />
                <div className="field">
                  <label className="block text-600 font-medium mb-2">
                    <i className="pi pi-quote-left mr-1"></i>
                    Biografía
                  </label>
                  <div className="surface-50 p-3 border-round">
                    <p className="text-900 m-0 line-height-3">{profileData.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};