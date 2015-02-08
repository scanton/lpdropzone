express = require 'express'
router = express.Router()

router.get '/', (req, res) ->
	res.render 'index',
		title: 'Lifeplus DropZone'

router.post '/file-upload', (req, res) ->
	console.log req.headers
	res.render 'file-upload',
		title: 'File Upload'
		id: req.headers['x-user-id']
		id3d: req.headers['x-user-id-3d']

module.exports = router