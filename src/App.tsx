import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter';
import './theme/App.css';
import 'react-tooltip/dist/react-tooltip.css';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>

  )
}

export default App
