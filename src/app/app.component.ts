/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-01-25 18:44:20
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-02-17 09:57:48
 */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { start } from 'qiankun';
import { RouteName } from './app.routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
})
export class AppComponent implements OnInit {
  public readonly RouteName = RouteName;

  ngOnInit(): void {
    start({
      sandbox: true,
      prefetch: 'all',
    });
  }
}
