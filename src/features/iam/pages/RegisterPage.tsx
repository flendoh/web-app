import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt:', { email, password });
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <section className="w-full max-w-sm sm:max-w-md">
        <Card className="p-4 sm:p-6 shadow-lg">
          <header className="text-center mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">ÑanGo</h1>
            <p className="text-sm sm:text-base text-gray-600">Crea tu cuenta universitaria</p>
          </header>
          
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 flex flex-col gap-3">
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Correo electrónico universitario
              </label>
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@upc.edu.pe"
                className="w-full text-sm sm:text-base"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Crea una contraseña segura"
                className="w-full"
                inputClassName="text-sm sm:text-base"
                feedback={false}
                toggleMask
                required
              />
            </div>
            
            <Button
              type="submit"
              label="Crear Cuenta"
              className="w-full text-sm sm:text-base py-2 sm:py-3"
            />
          </form>
          
          <footer className="mt-4 sm:mt-6 text-center">
            <Link 
              to="/auth/login" 
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-800"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </footer>
        </Card>
      </section>
    </main>
  );
};