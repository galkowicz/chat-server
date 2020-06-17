const http = require('http')

const path = require('path')

const express = require('express')

const app = express()

const server = http.createServer(app)

const db = require('./util/database')

server.listen(5000)
