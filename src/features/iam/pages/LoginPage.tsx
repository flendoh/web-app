import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <section className="w-full max-w-sm sm:max-w-md">
        <Card className="p-4 sm:p-6 shadow-lg">
          <header className="text-center mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">ÑanGo</h1>
            <p className="text-sm sm:text-base text-gray-600">Inicia sesión en tu cuenta</p>
          </header>
          
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 flex flex-col gap-3">
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
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
                placeholder="Tu contraseña"
                className="w-full"
                inputClassName="text-sm sm:text-base"
                feedback={false}
                toggleMask
                required
              />
            </div>
            
            <Button
              type="submit"
              label="Iniciar Sesión"
              className="w-full text-sm sm:text-base py-2 sm:py-3"
            />
          </form>
          
          <footer className="mt-4 sm:mt-6 text-center space-y-2">
            <Link 
              to="/auth/forgot-password" 
              className="block text-xs sm:text-sm text-blue-600 hover:text-blue-800 mb-2"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <Link 
              to="/auth/register" 
              className="block text-xs sm:text-sm text-blue-600 hover:text-blue-800"
            >
              ¿No tienes cuenta? Regístrate
            </Link>
          </footer>
        </Card>
      </section>
    </main>
  );
};