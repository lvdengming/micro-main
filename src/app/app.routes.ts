/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-01-25 18:44:20
 * @LastEditors: error: git config user.email & please set dead value or install git
 * @LastEditTime: 2026-05-17 11:06:22
 */
import { Routes } from '@angular/router';
import { EmptyComponent } from '../pages/empty/empty.component';

export enum RouteName {
  HOME = 'home',
  DETAIL = 'detail',
  ANGULAR_HOME = 'angular-home',
  ANGULAR_DETAIL = 'angular-detail',
  REACT_HOME = 'react-home',
  REACT_DETAIL = 'react-detail',
  VUE_HOME = 'vue-home',
  VUE_DETAIL = 'vue-detail',
}

export const routes: Routes = [
  {
    path: RouteName.HOME,
    loadComponent: () =>
      import('../pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: RouteName.DETAIL,
    loadComponent: () =>
      import('../pages/detail/detail.component').then((m) => m.DetailComponent),
  },
  {
    path: RouteName.ANGULAR_HOME,
    component: EmptyComponent,
  },
  {
    path: RouteName.ANGULAR_DETAIL,
    component: EmptyComponent,
  },
  {
    path: RouteName.REACT_HOME,
    component: EmptyComponent,
  },
  {
    path: RouteName.REACT_DETAIL,
    component: EmptyComponent,
  },
  {
    path: RouteName.VUE_HOME,
    component: EmptyComponent,
  },
  {
    path: RouteName.VUE_DETAIL,
    component: EmptyComponent,
  },
  {
    path: '**',
    redirectTo: RouteName.HOME,
  },
];
