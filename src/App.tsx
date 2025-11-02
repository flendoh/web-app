import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './shared/components/AppRouter';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <AppRouter />
      </div>
    </BrowserRouter>
  )
}

export default App
