express = require 'express'
router = express.Router()

router.get '/', (req, res) ->
	res.render 'index',
		title: 'Lifeplus DropZone'

router.post '/file-upload', (req, res) ->
	res.render 'file-upload',
		title: 'File Upload'

module.exports = router