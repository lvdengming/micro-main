/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-01-25 18:44:20
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-02-18 10:38:08
 */
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { initGlobalState, MicroAppStateActions, start } from 'qiankun';
import { GlobalState, InitGlobalState } from '../types/common';
import { RouteName } from './app.routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  providers: [DatePipe],
})
export class AppComponent implements OnInit {
  public readonly RouteName = RouteName;

  public readonly microStates = signal<Array<GlobalState>>([]);

  /** 初始状态 */
  private __initState!: InitGlobalState;

  /** 微前端传值 actions */
  private __actions?: MicroAppStateActions;

  constructor(private readonly __date: DatePipe) {}

  ngOnInit(): void {
    start({
      sandbox: true,
      prefetch: 'all',
    });

    // 初始化 qiankun 全局状态，子应用可通过 initGlobalState 订阅变化
    this.__initState = {
      appName: 'micro-main',
      loadedTimeStr: this.__getTimeStr(),
    };
    this.__actions = initGlobalState(this.__initState);

    // 监听全局状态变化（包括子应用改变全局状态）
    this.__actions.onGlobalStateChange((state: Record<string, any>, prev: Record<string, any>) => {
      let states = this.microStates();
      states = [state as GlobalState, ...states];
      this.microStates.set(states);
    });
  }

  /** 向微前端发送数据 */
  public sendData(): void {
    if (!this.__actions) return;

    const state: GlobalState = {
      ...this.__initState,
      from: 'main',
      timeStr: this.__getTimeStr(),
      data: 'Hello from main -- ' + Math.random().toString(16).slice(2, 6),
    };

    this.__actions.setGlobalState(state);
  }

  /** 获取时间字符串 */
  private __getTimeStr(): string {
    return this.__date.transform(new Date(), 'yyyy-MM-dd HH:mm:ss') ?? '';
  }
}
