import { useSelector } from 'react-redux';
import './App.css';
import Home from './pages/Home';
import Spinner from './components/spinner';

function App() {
  const isLoading = useSelector((state) => state.alerts.loading);
  return (
    <div className="App">
      {isLoading && <Spinner />}
      <Home/>
    </div>
  );
}

export default App;
