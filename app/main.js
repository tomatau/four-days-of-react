import debug from 'debug';
import createBrowserHistory from 'history/lib/createBrowserHistory';

// Paths are relative to `app` directory
import universalRender from '../shared/universal-render';
import flux from './flux';

const { NODE_ENV } = process.env;
if (NODE_ENV === 'development') debug.enable('dev,koa');

const history = createBrowserHistory();

universalRender({ flux, history })
  .catch(err => debug('dev')(err));
