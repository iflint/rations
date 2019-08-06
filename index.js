
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

app.use(express.static(__dirname+'/public'))

var allCollections = {
	highProtein : [10182, 22118, 1001]
}

app.get('/', (req, res) => res.sendFile('/index.html', {root: __dirname}))
app.get('/search/:itemId', (req, res) => res.sendFile('/search.html', {root: __dirname}))
app.get('/collections/:collectionId', (req, res) => res.sendFile('/collection.html', {root: __dirname}))
app.get('/blog/:postId', (req, res) => res.sendFile('/blog/'+req.params.postId+'.html', {root: __dirname}))
app.get('/api/search/:searchWord', (req, res) => {
	var searchWord = req.params.searchWord
	console.log(searchWord)

	// searchWord must be enclosed in single quotes
	var sqlQuery = "SELECT * FROM food WHERE shrt_desc % '"+searchWord+"'"
	
	pool.query(sqlQuery)
		.then((response) => res.send(response.rows))
		.catch((err) => console.error('Error executing query', err.stack))
})
app.get('/api/collection/:searchWord', (req, res) => {
	var searchWord = req.params.searchWord
	console.log(searchWord)

	// searchWord must be enclosed in single quotes
	var sqlQuery = "SELECT * FROM food WHERE ndb_no IN ("+allCollections[searchWord].join()+")"

	console.log(sqlQuery)
	
	pool.query(sqlQuery)
		.then((response) => res.send(response.rows))
		.catch((err) => console.error('Error executing query', err.stack))
})

// backtick used instead of quotes for temlate literals
app.listen(port, () => console.log(`App listening on port ${port}!`))


