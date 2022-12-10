// const express = require('express')
// const cors = require('cors')
// const path = require('path')
// const mysql = require('mysql2')
import express from 'express'
import cors from 'cors'
import path from 'path'
import mysql from 'mysql'

// Конфигурация localhost 136.243.14.123
const connect = mysql.createConnection({
  host: '136.243.14.123',
  user: 'koshk402_d_koshkarev',
  database: 'koshk402_allbd',
  password: 'iL6gM6mM3l',
})
// var 1
async function connectDB(sql, res, status, message) {
  connect.connect((err) => {
    console.log('DB Connect Success')
    workDB(sql, res, status, message)
    // if (err) {
    //   console.log('DB Connect Error', err)
    // }
  })
}

function workDB(sql, res, status, message) {
  connect.query(sql, function (err, results) {
    if (err) {
      console.log(err)
      // connect.end()
    } else {
      res.status(status).json({ contact: results, message: message })
      // connect.end()
    }
  })
}

const app = express()
app.use(express.json())
app.use(cors())

let CONTACTS = []
// GET
app.get('/api/contacts', (req, res) => {
  const sql = `SELECT * FROM spisok`
  const status = 200
  const message = 'Get Contact'
  connectDB(sql, res, status, message)
  // res.status(200).json(CONTACTS) // пока не могу настроить async
})
// POST
app.post('/api/contacts', (req, res) => {
  // TODO: т.к. система id как строку почему-то, то пришлось писать Data.now()+'' чтобы не использовать v4. Как в js явно задать тип переменной. ts?
  if (req.body) {
    // const VALUES = [...req.body]
    const sql = `INSERT INTO spisok (name, value) VALUES ('${req.body.name}', '${req.body.value}')`
    const status = 201
    const message = 'Contact Create'
    connectDB(sql, res, status, message)
    // res.status(201).json(CONTACTS)
  } else {
    console.log('POST-RESPONSE: ', req.body)
    res.status(400).json(req.body)
  }
})
// DELETE
app.delete(`/api/contacts/:id`, (req, res) => {
  const sql = `DELETE FROM spisok WHERE id = '${req.params.id}'`
  const status = 200
  const message = 'Contact Delete'
  connectDB(sql, res, status, message)
  // CONTACTS = CONTACTS.filter((c) => c.id !== req.params.id)
  // res.status(200).json({ contacts: CONTACTS, message: 'Contact Delete' })
})
// PUT
app.put('/api/contacts/:id', (req, res) => {
  console.log('REQ1', req.params)
  console.log('REQ2', req.body)
  const sql = `UPDATE spisok SET marked = '${
    req.body.marked * 1
  }' WHERE id = '${req.params.id}'`
  const status = 200
  const message = 'Contact Marked'
  connectDB(sql, res, status, message)

  // const idx = CONTACTS.findIndex((c) => c.id == req.params.id)
  // TODO: данные приходят. id читается как строка. marked тоже? Всегда строкой? Не меняются типы? Поэтому нужно использовать не строгое сравнение? Как правильно чтобы искючить багов в будущем?
  // CONTACTS[idx] = req.body
  // res.status(200).json({ contacts: CONTACTS[idx], message: 'Contact Сhanged' })
})

const PORT = 5000

app.use(express.static('/'))

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve('index.html'))
})
app.listen(PORT, () => {
  console.log('Server start on port: ' + PORT)
})
