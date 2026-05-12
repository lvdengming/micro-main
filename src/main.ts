/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-01-25 18:44:20
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-13 07:55:24
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

registerMicroApps([
  getAngularApp('angular-home'),
  getAngularApp('angular-detail'),
  getReactApp('react-home'),
  getReactApp('react-detail'),
]);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);

console.log('Current environment is', environment);
