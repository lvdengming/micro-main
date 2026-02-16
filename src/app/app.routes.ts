/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-01-25 18:44:20
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-02-16 22:23:03
 */
import { Routes } from '@angular/router';
import { EmptyComponent } from '../pages/empty/empty.component';
import { HomeComponent } from '../pages/home/home.component';

export enum RouteName {
  HOME = 'home',
  DETAIL = 'detail',
  ANGULAR_HOME = 'angular-home',
  Angular_DETAIL = 'angular-detail',
}

export const routes: Routes = [
  {
    path: RouteName.HOME,
    component: HomeComponent,
  },
  {
    path: RouteName.DETAIL,
    loadComponent: () => import('../pages/detail/detail.component').then((m) => m.DetailComponent),
  },
  {
    path: RouteName.ANGULAR_HOME,
    component: EmptyComponent,
  },
  {
    path: RouteName.Angular_DETAIL,
    component: EmptyComponent,
  },
  {
    path: '**',
    redirectTo: RouteName.HOME,
  },
];
