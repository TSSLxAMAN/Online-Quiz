import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </Provider>
)
