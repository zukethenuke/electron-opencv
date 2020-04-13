// import { spawn } from 'child_process';
const { spawn } = require('child_process');

const pyProcess = spawn('python', ['-u', './rtsp_stream.py'], [{
    maxBuffer: 2048 * 2024
}]);

pyProcess.stdout.on('data', (data) => {
    console.log(`******** data:${data} *********`);
});

// console.log(pyProcess)
pyProcess.on('close', (code) => {
    console.log('closing: ', code)
})