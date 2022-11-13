const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

// Временно для теста пока нет БД
let CONTACTS = [
  {
    id: 123,
    name: 'Dima',
    value: '88001002424',
    marked: false,
  },
]
app.use(express.json())
app.use(cors())

// GET
app.get('/api/contacts', (req, res) => {
  res.status(200).json(CONTACTS)
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
  const idx = CONTACTS.findIndex((c) => c.id == req.params.id)
  // TODO: данные приходят. id читается как строка. marked тоже? Всегда строкой? Не меняются типы? Поэтому нужно использовать не строгое сравнение? Как правильно чтобы искючить багов в будущем?
  CONTACTS[idx] = req.body
  res.status(200).json({ contacts: CONTACTS[idx], message: 'Contact Сhanged' })
})

const PORT = 5000

app.use(express.static('/'))

app.get('/', (res) => {
  res.status(200).json('Server worked ' + PORT)
})
app.listen(PORT, () => {
  console.log('Server start on port: ' + PORT)
})
