import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';

export const ProfileEditPage = () => {
  const [formData, setFormData] = useState({
    fullName: 'Juan Pérez García',
    email: 'juan.perez@email.com',
    phone: '+1 234 567 8900',
    licenseNumber: 'LIC-123456',
    bio: 'Desarrollador. Con experiencia en transporte compartido y comprometido con la seguridad vial.'
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }
    
    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'El número de licencia es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Profile update:', formData);
      // Aquí iría la llamada a la API
      alert('Perfil actualizado correctamente');
    }
  };

  const getFormErrorMessage = (field: string) => {
    return errors[field] ? <small className="p-error">{errors[field]}</small> : null;
  };

  const header = (
    <div className="flex align-items-center gap-2 p-4">
      <i className="pi pi-user-edit text-2xl"></i>
      <h2 className="text-xl font-semibold m-0">Editar Perfil</h2>
    </div>
  );

  return (
    <div className="surface-ground min-h-screen py-4">
      <div className="surface-card p-5 shadow-2 border-round w-full mx-auto">
        <Card header={header} className="border-none shadow-none">
          <form onSubmit={handleSubmit} className="p-fluid">
            <div className="flex flex-column gap-4">
              <div className="field">
                <label htmlFor="fullName" className="block text-900 font-medium mb-2">
                  Nombre Completo *
                </label>
                <InputText
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className={classNames('w-full', { 'p-invalid': errors.fullName })}
                  placeholder="Ingrese su nombre completo"
                />
                {getFormErrorMessage('fullName')}
              </div>
              
              <div className="field">
                <label htmlFor="email" className="block text-900 font-medium mb-2">
                  Email *
                </label>
                <InputText
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={classNames('w-full', { 'p-invalid': errors.email })}
                  placeholder="ejemplo@email.com"
                />
                {getFormErrorMessage('email')}
              </div>
              
              <div className="field">
                <label htmlFor="phone" className="block text-900 font-medium mb-2">
                  Teléfono *
                </label>
                <InputText
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={classNames('w-full', { 'p-invalid': errors.phone })}
                  placeholder="+1 234 567 8900"
                />
                {getFormErrorMessage('phone')}
              </div>
              
              <div className="field">
                <label htmlFor="licenseNumber" className="block text-900 font-medium mb-2">
                  Número de Licencia *
                </label>
                <InputText
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => handleChange('licenseNumber', e.target.value)}
                  className={classNames('w-full', { 'p-invalid': errors.licenseNumber })}
                  placeholder="LIC-123456"
                />
                {getFormErrorMessage('licenseNumber')}
              </div>
              
              <div className="field">
                <label htmlFor="bio" className="block text-900 font-medium mb-2">
                  Biografía
                </label>
                <InputTextarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  rows={4}
                  className="w-full"
                  placeholder="Cuéntanos un poco sobre ti..."
                  autoResize
                />
                <small className="text-600">
                  Esta información será visible en tu perfil público
                </small>
              </div>
            </div>
            
            <Divider />
            
            <div className="flex flex-wrap gap-2 justify-content-end">
              <Button 
                label="Cancelar" 
                icon="pi pi-times"
                className="p-button-outlined p-button-secondary"
                onClick={() => window.history.back()}
                type="button"
              />
              <Button 
                label="Guardar Cambios" 
                icon="pi pi-check"
                className="p-button-success"
                type="submit"
              />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};