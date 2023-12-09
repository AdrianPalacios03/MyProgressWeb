import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter';
import './theme/App.css';
import 'react-tooltip/dist/react-tooltip.css';

function App() {
  return (
    <BrowserRouter>
      <div className='bg'></div>
      <div className="container">
        <AppRouter />
      </div>
    </BrowserRouter>

  )
}

export default App
