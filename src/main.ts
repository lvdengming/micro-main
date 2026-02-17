/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-01-25 18:44:20
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-02-17 10:27:02
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { registerMicroApps } from 'qiankun';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

const getMicroApp = (name: string) => ({
  name,
  entry: `//localhost:8001`,
  container: '#micro-app',
  activeRule: (location: Location) => location.pathname === `/${name}`,
});

registerMicroApps([getMicroApp('angular-home'), getMicroApp('angular-detail')]);

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
