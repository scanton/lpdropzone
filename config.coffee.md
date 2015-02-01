#DropZone Configuration

	module.exports =

#Environment specific configurations

##Development

		development:
			name: 'development'
			port: process.env.PORT || 3030
			mongoPort: 42047
			mongoDatabaseName: 'dropzone'
			mongoUser: ''
			mongoPassword: ''
			hashidSalt: 'bd2ed47b2cae56e3bfe81154e29f699a'

##Staging

		staging:
			name: 'staging'
			port: 8080
			mongoPort: 42047
			mongoDatabaseName: 'dropzone'
			mongoUser: ''
			mongoPassword: ''
			hashidSalt: 'bd2ed47b2cae56e3bfe81154e29f699a'

##Production

		production:
			name: 'production'
			port: 80
			mongoPort: 42047
			mongoDatabaseName: 'dropzone'
			mongoUser: ''
			mongoPassword: ''
			hashidSalt: 'bd2ed47b2cae56e3bfe81154e29f699a'
