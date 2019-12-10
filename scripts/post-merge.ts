import execa from 'execa';
import chalk from 'chalk';

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
    console.log(
      chalk.yellow(
        'Seems like some dependencies changed, consider running `yarn`',
      ),
    );
  }
})();
