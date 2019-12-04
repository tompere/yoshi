import execa from 'execa';
import chalk from 'chalk';
import prompts from 'prompts';
import hasYarn from 'has-yarn';

(async () => {
  const args = [
    'diff-tree',
    '-r',
    '--name-only',
    '--no-commit-id',
    'ORIG_HEAD',
    'HEAD',
  ];

  const gitDiff = execa.sync('git', args);

  if (/package\.json|yarn\.lock/.test(gitDiff.stdout)) {
    const response: { install: string } = await prompts({
      type: 'text',
      name: 'install',
      message: chalk.green(
        'Some dependencies changed, should I run `npm install`? [y/N]',
      ),
    });
    const install = response.install.toLowerCase();
    if (install === 'y' || install === 'yes') {
      if (hasYarn()) {
        execa.sync('yarn', { stdio: 'inherit' });
      } else {
        execa.sync('npm', ['install'], { stdio: 'inherit' });
      }
    }
  }
})();
