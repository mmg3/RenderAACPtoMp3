const express = require('express');
const { spawn } = require('child_process');

const app = express();

app.get('/radio', (req, res) => {
    res.setHeader('Content-Type', 'audio/mpeg');

    const ffmpeg = spawn('ffmpeg', [
        '-i', 'https://canelaradio.makrodigital.com/stream/canelaradiotungurahua',
        '-f', 'mp3',
        '-acodec', 'libmp3lame',
        '-ab', '128k',
        '-'
    ]);

    ffmpeg.stdout.pipe(res);

    ffmpeg.stderr.on('data', (data) => {
        console.error(data.toString());
    });
});

app.get('/', (req, res) => {
    res.send('Proxy funcionando');
});

app.listen(process.env.PORT || 10000, () => {
    console.log('Servidor iniciado');
});