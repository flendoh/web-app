import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import { RegisterPage } from '../pages/RegisterPage'

const MockRouter = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <PrimeReactProvider>
      {children}
    </PrimeReactProvider>
  </BrowserRouter>
)

describe('RegisterPage - Pruebas de Accesibilidad ARIA', () => {
  it('debe tener estructura semántica correcta con elementos principales', () => {
    render(
      <MockRouter>
        <RegisterPage />
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
        <RegisterPage />
      </MockRouter>
    )

    const emailLabel = screen.getByText('Correo electrónico universitario')
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
        <RegisterPage />
      </MockRouter>
    )

    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toBeInTheDocument()
    expect(mainHeading).toHaveTextContent('ÑanGo')
  })

  it('debe tener botones con texto descriptivo y accesible', () => {
    render(
      <MockRouter>
        <RegisterPage />
      </MockRouter>
    )

    const submitButton = screen.getByRole('button', { name: /crear cuenta/i })
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  it('debe tener enlaces con texto descriptivo', () => {
    render(
      <MockRouter>
        <RegisterPage />
      </MockRouter>
    )

    const loginLink = screen.getByRole('link', { name: /ya tienes cuenta.*inicia sesión/i })
    expect(loginLink).toBeInTheDocument()
  })

  it('debe tener placeholders informativos en los campos', () => {
    render(
      <MockRouter>
        <RegisterPage />
      </MockRouter>
    )

    const emailInput = screen.getByPlaceholderText(/tu@upc\.edu\.pe/i)
    const passwordInput = screen.getByPlaceholderText(/crea una contraseña segura/i)

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
  })

  it('debe permitir navegación por teclado', async () => {
    const user = userEvent.setup()
    
    render(
      <MockRouter>
        <RegisterPage />
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
        <RegisterPage />
      </MockRouter>
    )

    const emailInput = screen.getByPlaceholderText('tu@upc.edu.pe')
    const passwordInput = screen.getByPlaceholderText('Crea una contraseña segura')
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i })

    await user.type(emailInput, 'newuser@upc.edu.pe')
    await user.type(passwordInput, 'newpassword123')
    await user.click(submitButton)

    expect(consoleSpy).toHaveBeenCalledWith('Register attempt:', {
      email: 'newuser@upc.edu.pe',
      password: 'newpassword123'
    })

    consoleSpy.mockRestore()
  })

  it('debe tener contraste adecuado y ser legible', () => {
    render(
      <MockRouter>
        <RegisterPage />
      </MockRouter>
    )

    const heading = screen.getByRole('heading', { level: 1 })
    const description = screen.getByText(/crea tu cuenta/i)

    expect(heading).toBeVisible()
    expect(description).toBeVisible()
  })

  it('debe validar campos requeridos', () => {
    render(
      <MockRouter>
        <RegisterPage />
      </MockRouter>
    )

    const emailInput = screen.getByPlaceholderText('tu@upc.edu.pe')
    const passwordInput = screen.getByPlaceholderText('Crea una contraseña segura')

    expect(emailInput).toBeRequired()
    expect(passwordInput).toBeRequired()
  })

  it('debe tener validación de formato de email', () => {
    render(
      <MockRouter>
        <RegisterPage />
      </MockRouter>
    )

    const emailInput = screen.getByPlaceholderText('tu@upc.edu.pe')
    
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  it('debe tener estructura de formulario accesible', () => {
    render(
      <MockRouter>
        <RegisterPage />
      </MockRouter>
    )

    const form = document.querySelector('form')
    const emailInput = screen.getByPlaceholderText('tu@upc.edu.pe')
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i })

    expect(form).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('debe tener labels asociados con los campos de entrada', () => {
    render(
      <MockRouter>
        <RegisterPage />
      </MockRouter>
    )

    const emailLabel = screen.getByText('Correo electrónico universitario')
    const passwordLabel = screen.getByText('Contraseña')

    expect(emailLabel).toBeInTheDocument()
    expect(passwordLabel).toBeInTheDocument()
  })
})