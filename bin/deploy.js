#!/usr/bin/env node

'use strict';

var shell = require('shelljs');
var chalk = require('chalk');

var buildFolder = 'dist';

 
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

var repos = shell.exec('git remote get-url origin').stdout.trim();
var reposArrPath = repos.split('/');
var length = reposArrPath.length;
var base = '/' + reposArrPath[length - 1].split('.')[0] + '/';

var dirtyUsername = reposArrPath[reposArrPath.length - 2].split(':');
var Username = dirtyUsername[dirtyUsername.length - 1];

if (shell.exec('ng build --prod --bh ' + base).code !== 0) {

  shell.echo('Error: Build error');
  shell.exit(1);
}

if(!repos){
  shell.echo('Remote url not found');
  shell.exit(1);
}

shell.cd(buildFolder);


if (shell.exec('cp ./index.html ./404.html').code !== 0) {
  shell.echo('Error: create 404.html failed');

  shell.exit(1);
}

if (shell.exec('git init').code !== 0) {
  shell.echo('Error: git init failed');
}

if (shell.exec('git remote add upstream "' + repos + '"').code !== 0) {
  shell.echo('Error: Git repos add remote failed');
}

if (shell.exec('git fetch upstream').code !== 0) {
  shell.echo('Error: Git repos add remote');
}

if (shell.exec('git checkout gh-pages').code !== 0) {
    shell.exec('git push upstream --delete gh-pages');
}

if (shell.exec('git add -A .').code !== 0) {
  shell.echo('Error: Git add failed');

}

if (shell.exec('git commit -m "deploy project"').code !== 0) {
  shell.echo('Error: Git commit failed');
}


if (shell.exec('git push -q upstream HEAD:gh-pages').code !== 0) {
  shell.echo('Error: Git push failed');
}


shell.cd('../');

if (shell.exec('rm -R ./dist').code !== 0) {
  shell.echo('Error: remove dist failed');
}

console.log(chalk.green('Deployment success!'));
console.log(chalk.blue('https://' + Username + '.github.io' + base));

