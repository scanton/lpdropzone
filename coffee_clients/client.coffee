socket = io()
saveRequired = false
channels = {}
delayInterval = 800
prevCaption = prevName = prevTitle = ''

id = new Fingerprint({ie_activex: true}).get()
id3d = new Fingerprint({canvas: true}).get()
socket.emit 'id:user',
	id: id
	id3d: id3d

delay = do ->
	(channel, callback) ->
		clearTimeout channels[channel] if channels[channel]
		channels[channel] = setTimeout callback, delayInterval

requireSave = ->
	saveRequired = true
	$('.changes-saved-notice').hide 'fast'
	$('.save-changes-button').show 'fast'
clearRequireSave = ->
	saveRequired = false
	$('.changes-saved-notice').show 'fast'
	$('.save-changes-button').hide 'fast'

saveCaption = (file, caption) ->
	if caption != prevCaption
		requireSave()
		delay(
			'caption'
			->
				socket.emit 'save:caption',
					file: file
					caption: caption
				clearRequireSave()
		)
	prevCaption = caption
saveName = (name) ->
	if name != prevName
		requireSave()
		delay(
			'name'
			->
				socket.emit 'save:name',
					name: name
				clearRequireSave()
		)
	prevName = name

$(document)
	.delegate '.caption', 'keyup', ->
		$this = $ this
		$container = $this.closest '.dz-preview'
		fileName = $container.find('.dz-filename').text()
		saveCaption fileName, $this.val()
	.delegate '.full-name', 'keyup', ->
		saveName $(this).val()
	.ready ->
		Dropzone.options.LifeplusDropzone =
			maxFileSize: 10
			dictDefaultMessage: $('.dropzone-message').html()
			previewTemplate: $('.dropzone-preview').html()
			headers: 
				'x-user-id': id
				'x-user-id-3d': id3d
