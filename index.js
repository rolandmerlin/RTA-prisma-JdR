//// WEB Server
const express = require('express')
const app = express()
const cors = require('cors')

const { PrismaClient } = require('@prisma/client')

app.use(cors())
app.use( express.static('dist') )

const prisma = new PrismaClient()

const socket_auth = require('./socket/auth.js')
const socket_ping = require('./socket/ping.js')
const crud = require('./socket/crud.js')

const { WebSocketServer } = require('ws')
const wss = new WebSocketServer({ port:3001 })

const extends_wb = require('./socket/extends.js')

extends_wb.wss_extends(wss)
wss.on('connection',(ws)=>{
    extends_wb.ws_extends(ws)
    ws.on('message',(msg)=>{
        let message = JSON.parse(String(msg))
        console.log('-----------------')
        console.log(message)
        if (typeof message.action==='undefined') return
        if (/ping:/.test(message.action)) return socket_ping(message,wss,ws,crud,prisma)
        if (/auth:/.test(message.action)) return socket_auth(message,wss,ws,crud,prisma)
    })
    ws.send('Hello')
})

app.use(express.static('dist'))

app.listen(3000,'127.0.0.1',()=>{ console.log('--- Hi, Server is running ---') })