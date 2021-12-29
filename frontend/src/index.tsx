import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './components/App/App';
import { store } from './store/store';
import * as serviceWorker from './serviceWorker';

import 'react-toastify/dist/ReactToastify.min.css';
import './index.css';
import './styles/colors.css';
import './styles/PrimaryButton.css';
import './styles/SecondaryButton.css';
import './styles/RedButton.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer className="toast" />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your store to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
