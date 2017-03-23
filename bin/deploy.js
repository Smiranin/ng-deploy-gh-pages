#!/usr/bin/env node

'use strict';

var shell = require('shelljs');


var folder = 'dist';
 
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

var repos = shell.exec('git remote get-url origin').stdout.trim();
var reposArrPath = repos.split('/');
var length = reposArrPath.length;
var base = reposArrPath[length - 1].split('.')[0];


if (shell.exec('ng build --prod --bh /' + base + '/').code !== 0) {
  shell.echo('Error: Build error');
  shell.exit(1);
}

if(!repos){
  shell.echo('Remote url not faund');
  shell.exit(1);
}

shell.cd(folder);



if (shell.exec('cp ./index.html ./404.html').code !== 0) {
  shell.echo('Error: copy');
  shell.exit(1);
}

if (shell.exec('git init').code !== 0) {
  shell.echo('Error: git init');
 // shell.exit(1);
}
if (shell.exec('git remote add upstream "' + repos + '"').code !== 0) {
  shell.echo('Error: Git repos add remote');
 // shell.exit(1);
}

if (shell.exec('git fetch upstream').code !== 0) {
  shell.echo('Error: Git repos add remote');
 // shell.exit(1);
}

if (shell.exec('git reset upstream/gh-pages').code !== 0) {
  shell.echo('Error: reset');
 // shell.exit(1);
}

if (shell.exec('git add -A .').code !== 0) {
  shell.echo('Error: Git add');
 // shell.exit(1);
}

if (shell.exec('git commit -m "deploy project"').code !== 0) {
  shell.echo('Error: Git commit failed');
 //shell.exit(1);
}


if (shell.exec('git push -q upstream HEAD:gh-pages').code !== 0) {
  shell.echo('Error: Git push');
  //shell.exit(1);
}


shell.cd('../');


if (shell.exec('rm -R ./dist').code !== 0) {
  shell.echo('Error: remove dist');
  shell.exit(1);
}
