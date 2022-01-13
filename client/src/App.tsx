import React from 'react';
import Router from './router'
import './styles/style.scss'
import './styles/styles.pageLogin.scss'
import './styles/styles.register.scss'
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { store } from './redux';
function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
