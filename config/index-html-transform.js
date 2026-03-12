/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-03-13 00:12:05
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-03-13 00:40:27
 */

const path = require('path');
const fs = require('fs');

/**
 * 静态资源部署 url
 *
 * 此项目部署到当前主机，不涉及
 *
 * 如果涉及，可通过 process.argv 获取传入的部署 url
 */
const deployUrl = '';

/** 获取 script 脚本字符串 */
const getScript = (name) => {
  return `<script src="${deployUrl}${name}" type="module"></script>`;
};

/** 向 html 中插入拆分的包 */
const insertChunks = (html, targetOptions) => {
  const chunks = ['angular', 'vendors'];
  const isBuild = targetOptions && targetOptions.target === 'build';

  // 默认本地开发环境，缓存中的资源文件名没有 hash，直接使用
  let splitChunks = chunks.map((chunk) => `${chunk}.js`);
  // 打包后的文件名包含 hash，需要从打包产物中获取
  if (isBuild) {
    // 从 angular.json 中获取打包产物路径
    const angularJson = require('../angular.json');
    const project = targetOptions.project;
    const outputPath = angularJson.projects[project].architect.build.options.outputPath;

    // 从打包产物中获取拆分的包文件名
    const fileNames = fs.readdirSync(path.resolve(process.cwd(), outputPath));
    splitChunks = fileNames.filter((name) => {
      const chunk = name.split('.')[0];
      return chunks.includes(chunk);
    });
  }

  // 获取拆分的包 script 字符串
  let chunkScripts = '';
  for (const chunk of splitChunks) {
    chunkScripts += getScript(chunk);
  }

  // 将拆分的包 script 插入到 html 中
  const mainScript = `<script src="${deployUrl}main`;
  const insertIndex = html.indexOf(mainScript);
  return `${html.slice(0, insertIndex)}${chunkScripts}${html.slice(insertIndex)}`;
};

module.exports = (targetOptions, html) => {
  return insertChunks(html, targetOptions);
};
