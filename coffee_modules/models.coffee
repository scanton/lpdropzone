mongoose = require 'mongoose'
Schema = mongoose.Schema
MongoId = Schema.Types.ObjectId

module.exports =
	Caption: mongoose.model('Caption',
		file: String
		caption: String
		ip: String
		sig: String
		domain: String
		socketId: String
		created: { type: Date, default: Date.now }
	)
	Name: mongoose.model('Name',
		name: String
		ip: String
		sig: String
		domain: String
		socketId: String
		created: { type: Date, default: Date.now }
	)