// const express = require('express')
// const cors = require('cors')
// const path = require('path')
// const mysql = require('mysql2')
import express from 'express'
import cors from 'cors'
import path from 'path'
import mysql from 'mysql'

// Конфигурация localhost 136.243.14.123
let CONTACTS = []

const connect = mysql.createConnection({
  host: '136.243.14.123',
  user: 'koshk402_d_koshkarev',
  database: 'koshk402_allbd',
  password: 'iL6gM6mM3l',
})

async function start() {
  console.log('3')
  connect.connect((err) => {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('DB Connect')
    }
  })
}

async function getDB(sql, res) {
  console.log('2')
  await start()
  console.log('4')
  connect.query(sql, function (err, results) {
    console.log('5')
    if (err) console.log(err)
    console.log('results', results)
    CONTACTS = results
    console.log('6')
    CONTACTS = results
    res.status(200).json(CONTACTS)
    // return (CONTACTS = results)
  })
  console.log('7')
  connect.end()
}

const app = express()
app.use(express.json())
app.use(cors())

// GET
app.get('/api/contacts', (req, res) => {
  console.log('1')
  const sql = `SELECT * FROM spisok`
  getDB(sql, res)
  console.log('10')
  // res.status(200).json(CONTACTS)
})
// POST
app.post('/api/contacts', (req, res) => {
  // TODO: т.к. система id как строку почему-то, то пришлось писать Data.now()+'' чтобы не использовать v4. Как в js явно задать тип переменной. ts?
  if (req.body) {
    const contact = { ...req.body, id: Date.now() + '', marked: false }
    CONTACTS.push(contact)
    res.status(201).json(CONTACTS)
  } else {
    console.log('POST. RESPONSE: ', req.body)
    res.status(400).json(req.body)
  }
})
// DELETE
app.delete(`/api/contacts/:id`, (req, res) => {
  CONTACTS = CONTACTS.filter((c) => c.id !== req.params.id)
  res.status(200).json({ contacts: CONTACTS, message: 'Contact Delete' })
})
// PUT
app.put('/api/contacts/:id', (req, res) => {
  console.log('REQ', req.params)
  console.log('REQ', req.body)
  const idx = CONTACTS.findIndex((c) => c.id == req.params.id)
  // TODO: данные приходят. id читается как строка. marked тоже? Всегда строкой? Не меняются типы? Поэтому нужно использовать не строгое сравнение? Как правильно чтобы искючить багов в будущем?
  CONTACTS[idx] = req.body
  res.status(200).json({ contacts: CONTACTS[idx], message: 'Contact Сhanged' })
})

const PORT = 5000

app.use(express.static('/'))

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve('index.html'))
})
app.listen(PORT, () => {
  console.log('Server start on port: ' + PORT)
})
