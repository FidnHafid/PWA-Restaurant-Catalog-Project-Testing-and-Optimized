import 'regenerator-runtime';
import '../styles/style.css';
import '../styles/responsive.css';
// eslint-disable-next-line no-unused-vars
import filter from 'lodash.filter';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
