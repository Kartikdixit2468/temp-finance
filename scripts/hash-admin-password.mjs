import { randomBytes, scryptSync } from 'node:crypto';

const readHiddenPassword = () =>
  new Promise((resolve, reject) => {
    if (!process.stdin.isTTY || typeof process.stdin.setRawMode !== 'function') {
      let value = '';
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (chunk) => {
        value += chunk;
      });
      process.stdin.on('end', () => resolve(value.trimEnd()));
      process.stdin.on('error', reject);
      return;
    }

    process.stdout.write('Admin password: ');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    let value = '';

    const cleanup = () => {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdout.write('\n');
    };

    process.stdin.on('data', (key) => {
      if (key === '\u0003') {
        cleanup();
        reject(new Error('Cancelled'));
        return;
      }
      if (key === '\r' || key === '\n') {
        cleanup();
        resolve(value);
        return;
      }
      if (key === '\u007f') {
        value = value.slice(0, -1);
        return;
      }
      value += key;
    });
  });

try {
  const password = await readHiddenPassword();
  if (password.length < 12) {
    throw new Error('Use a password with at least 12 characters.');
  }

  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  process.stdout.write(`ADMIN_PASSWORD_HASH=scrypt$${salt.toString('hex')}$${hash.toString('hex')}\n`);
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : 'Unable to hash password'}\n`);
  process.exitCode = 1;
}
