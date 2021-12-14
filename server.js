const http = require('http')

const todos = [
  {id: 1, text: "Todo One"},
  {id: 2, text: "Todo Two"},
  {id: 3, text: "Todo Three"}

]


const server = http.createServer((req, res) => {

  // const {headers, url, method} = req
  // console.log(headers, url, method)
  // console.log(req.method)

  // res.setHeader('Content-Type', 'text/plain')

  // res.setHeader('X-Powered-By', 'Nodejs')

  // res.setHeader('Content-Type', 'text/html')

  
  // res.write('<h1>Hello<h1>')
  // res.statusCode = 404
  // res.setHeader('Content-Type', 'application/json')

  

  // console.log(req.headers.authorization)
  const {method, url} = req
  let body = []

  req.on('data', chunk => {

    body.push(chunk)

  })
  .on('end', () => {

    body = Buffer.concat(body).toString()
    let status = 404
    const response = {
      succes: false,
      data:null,
      error: null

    }

   if(method === 'GET' && url === '/todos') {
     status=200
     response.succes = true
     response.data = todos
   }else if(method === 'POST' && url === '/todos'){
    const {id, text} = JSON.parse(body)

    if(!id || !text){
      status = 400
      response.error = 'Please add id and text'
    }else{
      todos.push({id, text})
      status = 201,
      response.success = true,
      response.data = todos
    }

    

   }

    res.writeHead(status, {
      'Content-Type' : 'application/json',
      'X-Powered-By': 'Nodejs'

    })

    res.end(JSON.stringify(response)
    )
  })


 
})

const PORT = 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))