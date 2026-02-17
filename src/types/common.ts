/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-02-17 21:10:57
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-02-17 21:36:39
 */

/** 全局初始状态 */
export interface InitGlobalState {
  /** 应用名称 */
  appName: string;
  /** 应用加载时间戳 */
  loadedTimeStr: string;
}

/** 全局状态 */
export interface GlobalState extends InitGlobalState {
  /** 状态来源 */
  from: 'main' | 'angular';
  /** 状态更新时间 */
  timeStr: string;
  /** 传递的数据 */
  data: any;
}
