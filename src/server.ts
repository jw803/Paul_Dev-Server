import app from './App';

const PORT = 3200;

app.get('/', (req, res) => res.send('abc'));
app.listen(PORT, () => {
    console.log('Express server listening on Port ', PORT);
});
