import React from 'react';
import ReactDOM from 'react-dom';

import { createHashHistory } from 'History';

import { Router, Route, useRouterHistory, IndexRedirect } from 'react-router';

import { syncHistoryWithStore, RouterStore } from 'mobx-react-router';

import { Provider } from 'mobx-react';

import Module from 'weansDemo02';

const routing = new RouterStore();

const allStore = {
  routing,
  ...Module.store,
};

const browserHistory = useRouterHistory(createHashHistory)({
  queryKey: '_key',
  basename: '/',
});

const history = syncHistoryWithStore(browserHistory, allStore.routing);

const Home = props => props.children;

const Root = () => (
  <Provider {...allStore}>
    <Router history={history}>
      <Route name='root' breadcrumbName='根路由' path='/' component={Home}>
        <IndexRedirect to='main/ns_demo02/index' />
        <Route name='main' breadcrumbName='入口' path='/main' component={Home}>
          { Module.Route }
        </Route>
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('container'));
