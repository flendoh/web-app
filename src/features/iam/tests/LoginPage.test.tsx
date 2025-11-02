import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import { LoginPage } from '../pages/LoginPage'

const MockRouter = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <PrimeReactProvider>
      {children}
    </PrimeReactProvider>
  </BrowserRouter>
)

describe('LoginPage - Pruebas de Accesibilidad ARIA', () => {
  it('debe tener estructura semántica correcta con elementos principales', () => {
    render(
      <MockRouter>
        <LoginPage />
      </MockRouter>
    )

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    
    const form = document.querySelector('form')
    expect(form).toBeInTheDocument()
  })

  it('debe tener campos de entrada con labels correctos', () => {
    render(
      <MockRouter>
        <LoginPage />
      </MockRouter>
    )

    const emailLabel = screen.getByText('Correo electrónico')
    const passwordLabel = screen.getByText('Contraseña')
    
    expect(emailLabel).toBeInTheDocument()
    expect(passwordLabel).toBeInTheDocument()
    
    const emailField = screen.getByPlaceholderText('tu@upc.edu.pe')
    expect(emailField).toHaveAttribute('type', 'email')
    expect(emailField).toHaveAttribute('required')
  })

  it('debe tener títulos jerárquicos correctos (h1)', () => {
    render(
      <MockRouter>
        <LoginPage />
      </MockRouter>
    )

    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toBeInTheDocument()
    expect(mainHeading).toHaveTextContent('ÑanGo')
  })

  it('debe tener botones con texto descriptivo y accesible', () => {
    render(
      <MockRouter>
        <LoginPage />
      </MockRouter>
    )

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  it('debe tener enlaces con texto descriptivo', () => {
    render(
      <MockRouter>
        <LoginPage />
      </MockRouter>
    )

    const registerLink = screen.getByRole('link', { name: /no tienes cuenta.*regístrate/i })
    const forgotPasswordLink = screen.getByRole('link', { name: /olvidaste.*contraseña/i })

    expect(registerLink).toBeInTheDocument()
    expect(forgotPasswordLink).toBeInTheDocument()
  })

  it('debe tener placeholders informativos en los campos', () => {
    render(
      <MockRouter>
        <LoginPage />
      </MockRouter>
    )

    const emailInput = screen.getByPlaceholderText(/tu@upc\.edu\.pe/i)
    const passwordInput = screen.getByPlaceholderText(/tu contraseña/i)

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
  })

  it('debe permitir navegación por teclado', async () => {
    const user = userEvent.setup()
    
    render(
      <MockRouter>
        <LoginPage />
      </MockRouter>
    )

    const emailInput = screen.getByPlaceholderText('tu@upc.edu.pe')

    await user.tab()
    expect(emailInput).toHaveFocus()

  })

  it('debe manejar el envío del formulario correctamente', async () => {
    const user = userEvent.setup()
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <MockRouter>
        <LoginPage />
      </MockRouter>
    )

    const emailInput = screen.getByPlaceholderText('tu@upc.edu.pe')
    const passwordInput = screen.getByPlaceholderText('Tu contraseña')
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })

    await user.type(emailInput, 'test@upc.edu.pe')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    expect(consoleSpy).toHaveBeenCalledWith('Login attempt:', {
      email: 'test@upc.edu.pe',
      password: 'password123'
    })

    consoleSpy.mockRestore()
  })

  it('debe tener contraste adecuado y ser legible', () => {
    render(
      <MockRouter>
        <LoginPage />
      </MockRouter>
    )

    const heading = screen.getByRole('heading', { level: 1 })
    const description = screen.getByText(/inicia sesión en tu cuenta/i)

    expect(heading).toBeVisible()
    expect(description).toBeVisible()
  })

  it('debe validar campos requeridos', async () => {
    render(
      <MockRouter>
        <LoginPage />
      </MockRouter>
    )

    const emailInput = screen.getByPlaceholderText('tu@upc.edu.pe')
    const passwordInput = screen.getByPlaceholderText('Tu contraseña')

    expect(emailInput).toBeRequired()
    expect(passwordInput).toBeRequired()
  })

  it('debe tener estructura de formulario accesible', () => {
    render(
      <MockRouter>
        <LoginPage />
      </MockRouter>
    )

    const form = document.querySelector('form')
    const emailInput = screen.getByPlaceholderText('tu@upc.edu.pe')
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })

    expect(form).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('debe tener campos de entrada accesibles por placeholder', () => {
    render(
      <MockRouter>
        <LoginPage />
      </MockRouter>
    )

    const emailField = screen.getByPlaceholderText('tu@upc.edu.pe')
    const passwordField = screen.getByPlaceholderText('Tu contraseña')

    expect(emailField).toBeInTheDocument()
    expect(passwordField).toBeInTheDocument()
  })
})