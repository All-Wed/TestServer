Server
app.use(express.json()) // для использования формате json Предварительно не нужно устанавливать как модуль
app.use(cors()) // чтобы не ругался на разные домены. Обязательно ставим дополнительно как мудуль
res.set('Access-Control-Allow-Origin', '*') // нужны для принятия заголовков любых. но с cors они не нужны
res.header('Access-Control-Allow-Origin', '*') // понять в чем отличие от res.set и что лучше использовать

Client
accept: 'application/json' // стандарт заголовком. Разные multi и т.д. не нужны
'Content-Type': 'application/json'
// оставил как пример, за место axios
// async request(url, method = 'GET', data = null) {
//   try {
//     const headers = {}
//     let body
//     if (data) {
//       headers['Content-Type'] = 'application/json'
//       body = JSON.stringify(data)
//     }
//     const responce = await fetch(url, {
//       method,
//       headers,
//       body,
//     })
//     return await responce.json()
//   } catch (e) {
//     console.log(e)
//   }
// }