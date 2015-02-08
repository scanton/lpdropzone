(function() {
  var channels, clearRequireSave, delay, delayInterval, id, id3d, prevCaption, prevName, prevTitle, requireSave, saveCaption, saveName, saveRequired, saveTitle, socket;

  socket = io();

  saveRequired = false;

  channels = {};

  delayInterval = 800;

  prevCaption = prevName = prevTitle = '';

  id = new Fingerprint({
    ie_activex: true
  }).get();

  id3d = new Fingerprint({
    canvas: true
  }).get();

  socket.emit('id:user', {
    id: id,
    id3d: id3d
  });

  delay = (function() {
    return function(channel, callback) {
      if (channels[channel]) {
        clearTimeout(channels[channel]);
      }
      return channels[channel] = setTimeout(callback, delayInterval);
    };
  })();

  requireSave = function() {
    saveRequired = true;
    $('.changes-saved-notice').hide('fast');
    return $('.save-changes-button').show('fast');
  };

  clearRequireSave = function() {
    saveRequired = false;
    $('.changes-saved-notice').show('fast');
    return $('.save-changes-button').hide('fast');
  };

  saveCaption = function(file, caption) {
    if (caption !== prevCaption) {
      requireSave();
      delay('caption', function() {
        socket.emit('save:caption', {
          file: file,
          caption: caption
        });
        return clearRequireSave();
      });
    }
    return prevCaption = caption;
  };

  saveName = function(name) {
    if (name !== prevName) {
      requireSave();
      delay('name', function() {
        socket.emit('save:name', {
          name: name
        });
        return clearRequireSave();
      });
    }
    return prevName = name;
  };

  saveTitle = function(title) {
    if (title !== prevTitle) {
      requireSave();
      delay('title', function() {
        socket.emit('save:title', {
          title: title
        });
        return clearRequireSave();
      });
    }
    return prevTitle = title;
  };

  $(document).delegate('.caption', 'keyup', function() {
    var $container, $this, fileName;
    $this = $(this);
    $container = $this.closest('.dz-preview');
    fileName = $container.find('.dz-filename').text();
    return saveCaption(fileName, $this.val());
  }).delegate('.full-name', 'keyup', function() {
    return saveName($(this).val());
  }).delegate('.group-title', 'keyup', function() {
    return saveTitle($(this).val());
  }).ready(function() {
    return Dropzone.options.LifeplusDropzone = {
      maxFileSize: 10,
      dictDefaultMessage: $('.dropzone-message').html(),
      previewTemplate: $('.dropzone-preview').html(),
      headers: {
        'x-user-id': id,
        'x-user-id-3d': id3d
      }
    };
  });

}).call(this);
