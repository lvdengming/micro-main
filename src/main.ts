/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-01-25 18:44:20
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-03-10 01:18:33
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { registerMicroApps } from 'qiankun';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

const getMicroApp = (name: string) => ({
  name,
  entry: environment.production ? 'http://8.141.84.169:8001/index.html' : '//localhost:8001',
  container: '#micro-app',
  activeRule: (location: Location) => location.pathname === `/${name}`,
});

registerMicroApps([getMicroApp('angular-home'), getMicroApp('angular-detail')]);

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

console.log('Current environment is', environment);
