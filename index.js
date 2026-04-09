const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();

const ffmpegPath = path.join(__dirname, 'ffmpeg');
app.get('/', (req, res) => {
    res.send('Proxy funcionando');
});
app.get('/radio', (req, res) => {
    res.setHeader('Content-Type', 'audio/mpeg');

    const ffmpeg = spawn(ffmpegPath, [
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

app.listen(process.env.PORT || 10000, () => {
    console.log('Servidor iniciado');
});