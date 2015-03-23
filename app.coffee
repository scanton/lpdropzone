env = 'development'

config = require('./config')[env]

debug = require('debug') 'dropzone'
express = require 'express'
path = require 'path'
favicon = require 'serve-favicon'
logger = require 'morgan'
cookieParser = require 'cookie-parser'
bodyParser = require 'body-parser'
compression = require 'compression'
coffeescript = require 'connect-coffee-script'
stylus = require 'stylus'
nib = require 'nib'
crypto = require 'crypto'
mongoose = require 'mongoose'
multer  = require 'multer'

app = express()
http = require('http').Server app
io = require('socket.io') http
socketManager = require('./coffee_modules/socket-manager.coffee') io

app.set 'env', env
app.set 'port', config.port
app.set 'views', path.join(__dirname, 'views')
app.set 'view engine', 'jade'

#app.use favicon(__dirname + '/public/favicon.ico')
app.use logger('dev')
app.use compression()                       
app.use bodyParser.json()
app.use bodyParser.urlencoded(extended: false)
app.use cookieParser()
app.use multer(
    dest: './uploads/'
    rename: (fieldname, filename) ->
        return Date.now() + '_' + filename.replace(/\W+/g, '-').toLowerCase()
)
app.use stylus.middleware(
    src: path.join __dirname, 'views'
    dest: path.join __dirname, 'public'
    compile: (str, path) ->
        stylus(str)
            .set('filename', path)
            .set('compress', false)
            .use nib()
)
app.use coffeescript 
    src: __dirname + '/coffee_clients'
    dest: __dirname + '/public/javascripts'
    prefix: '/javascripts'
app.use express.static(path.join(__dirname, 'public'))
app.use '/', require './routes/index'
app.use '/partials', require './routes/partials'
app.use (req, res, next) ->
    err = new Error('Not Found')
    err.status = 404
    next err

mongoose.connect 'mongodb://localhost:27017/dropzone'
models = require './coffee_modules/models.coffee'

# error handlers

# development error handler
# will print stacktrace
if app.get('env') is 'development'
    app.use (err, req, res, next) ->
        res.status err.status or 500
        res.render 'error',
            message: err.message
            error: err

# production error handler
# no stacktraces leaked to user
app.use (err, req, res, next) ->
    res.status err.status or 500
    res.render 'error',
        message: err.message
        error: {}


server = http.listen app.get('port'), ->
    console.log 'Lifeplus DropZone configured for ' + env.toUpperCase() + ', initialized on port ' + server.address().port

module.exports = 
    app: app
    server: server
    io: io