/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-01-25 18:44:20
 * @LastEditors: error: git config user.email & please set dead value or install git
 * @LastEditTime: 2026-05-17 11:07:14
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { registerMicroApps } from 'qiankun';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

const getAngularApp = (name: string) => ({
  name,
  entry: environment.production
    ? 'http://8.141.84.169:8001/index.html'
    : '//localhost:8001',
  container: '#micro-app',
  activeRule: (location: Location) => location.pathname === `/${name}`,
});

const getReactApp = (name: string) => ({
  name,
  entry: environment.production
    ? 'http://8.141.84.169:8002/index.html'
    : '//localhost:8002',
  container: '#micro-app',
  activeRule: (location: Location) => location.pathname === `/${name}`,
});

const getVueApp = (name: string) => ({
  name,
  entry: environment.production
    ? 'http://8.141.84.169:8003/index.html'
    : '//localhost:8003',
  container: '#micro-app',
  activeRule: (location: Location) => location.pathname === `/${name}`,
});

registerMicroApps([
  getAngularApp('angular-home'),
  getAngularApp('angular-detail'),
  getReactApp('react-home'),
  getReactApp('react-detail'),
  getVueApp('vue-home'),
  getVueApp('vue-detail'),
]);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);

console.log('Current environment is', environment);
