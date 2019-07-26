
const express = require('express')
const app = express()
const port = 3000

const { Pool } = require('pg')
// should replace these with environment variables
const pool = new Pool({
	host: 'localhost',
    user: 'postgres',
    password: 'Gr33nstripe',
    database: 'testdb',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile('/index.html', {root: __dirname}))
app.get('/search/:food', (req, res) => res.sendFile('/search.html', {root: __dirname}))
app.get('/api/search/:searchWord', (req, res) => {
	var searchWord = req.params.searchWord
	console.log(searchWord)

	// searchWord must be enclosed in single quotes
	var sqlQuery = "SELECT * FROM food WHERE shrt_desc % '"+searchWord+"'"
	
	pool.query(sqlQuery)
		.then((response) => res.send(response.rows))
		.catch((err) => console.error('Error executing query', err.stack))
})

// backtick used instead of quotes for temlate literals
app.listen(port, () => console.log(`App listening on port ${port}!`))


