const chokidar = require('chokidar');
const { exec } = require('child_process');

function runCommand() {
  exec('pnpm gen-output', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    console.error(`output files has been generated`);
  });
}

const watcher = chokidar.watch(['./src'], {
  ignored: /node_modules/,
  persistent: true,
});

watcher.on('change', (path) => {
  console.log(`File ${path} has been changed`);
  runCommand();
});
