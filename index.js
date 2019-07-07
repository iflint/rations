
const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')

var config = {
	host: 'localhost',
	user: 'root',
	password: 'Gr33nstripe',
	database: 'test'
}

const pool = mysql.createPool(config)

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile('/index.html', {root: __dirname}))
app.get('/api/search/:searchWord', (req, res) => {
	var searchWord = req.params.searchWord
	console.log(searchWord)
	var sqlQuery = 'SELECT * FROM food WHERE MATCH (Shrt_Desc) AGAINST ("' + searchWord + '")'

	pool.query(sqlQuery, (err, rows, fields) => {
		if (err) throw err

		res.send(rows)
	})
})

// backtick used instead of quotes for temlate literals
app.listen(port, () => console.log(`App listening on port ${port}!`))


