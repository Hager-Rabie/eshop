import detect from 'detect-port';
import { exec } from 'child_process';

const DEFAULT_PORT = 3000;

async function startFrontend() {
  const port = await detect(DEFAULT_PORT); // لو 3000 مش فاضي هختار بورت فاضي
  console.log(`Frontend will run on port: ${port}`);

  const command = `cross-env PORT=${port} react-scripts start`;
  const child = exec(command, { cwd: './frontend' });

  child.stdout.on('data', (data) => process.stdout.write(data));
  child.stderr.on('data', (data) => process.stderr.write(data));
}

startFrontend();
