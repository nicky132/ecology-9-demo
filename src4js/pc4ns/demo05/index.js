import React from 'react';
import Route from 'react-router/lib/Route';
import { WeaLocaleProvider } from 'ecCom'

import BaseOrgTable from './components';

import stores from './stores';
import './style/index';

// 读取系统多语言配置
let getLocaleLabel = WeaLocaleProvider.getLocaleLabel.bind(this, 'ns_demo05');

// 不需要读取系统多语言
getLocaleLabel = function(nextState, replace, callback) { callback();};

const Home = props => props.children;

const Routes = (
  <Route key='ns_demo05' path='ns_demo05' onEnter={getLocaleLabel} component={Home}>
    <Route key='index' path='index' component={BaseOrgTable} />
  </Route>
);

module.exports = {
  Route: Routes,
  store: stores,
};
