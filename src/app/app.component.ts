/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-01-25 18:44:20
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-02-18 10:38:08
 */
import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { initGlobalState, MicroAppStateActions, start } from 'qiankun';
import { GlobalState } from '../types/common';
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

  /** 微前端全局状态 */
  public readonly globalStates = signal<Array<GlobalState>>([]);

  /** 微前端传值 actions */
  private __actions?: MicroAppStateActions;

  constructor(
    private readonly __date: DatePipe,
    private readonly __cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    start({
      sandbox: true,
      prefetch: 'all',
    });

    // 初始化 qiankun 全局状态，子应用可通过 initGlobalState 订阅变化
    const initState: GlobalState = {
      appName: 'micro-main',
      loadedTimeStr: this.__getTimeStr(),
      from: 'main',
      timeStr: this.__getTimeStr(),
      data: 'Hello from main -- ' + Math.random().toString(16).slice(2, 6),
    };
    this.__actions = initGlobalState(initState);

    // 监听全局状态变化（包括子应用改变全局状态）
    // 第二个参数 fireImmediately 为 true，表示立即执行一次回调，获取初始状态
    this.__actions.onGlobalStateChange((state: Record<string, any>, prev: Record<string, any>) => {
      const states = [state as GlobalState, ...this.globalStates()];
      this.globalStates.set(states);

      // onGlobalStateChange 回调在 qiankun 内部执行，Angular 无法感知到状态变化，需要手动触发变更检测
      this.__cdr.detectChanges();
    }, true);
  }

  /** 向微前端发送数据 */
  public sendData(): void {
    if (!this.__actions) return;

    // setGlobalState 是 Object.assign 方式，订阅者会拿到合并后的全局状态
    const state: GlobalState = {
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
