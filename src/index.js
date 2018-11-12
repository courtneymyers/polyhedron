// @flow

import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';
// routes
import { setupRoutes } from './routes';

const routes = setupRoutes();
const rootElement: any = document.getElementById('root');

ReactDOM.render(routes, rootElement);
unregister();
