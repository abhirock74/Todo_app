import './App.css';
import Router from './Component/Router/Router';
import Contaxt from './Contaxt/Contaxt';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Contaxt>
      <ToastContainer
          position="bottom-left"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          theme="light"
        />
        <Router />
      </Contaxt>
    </>

  );
}

export default App;
