(function() {
  var channels, clearRequireSave, delay, delayInterval, id, id3d, prevCaption, prevName, prevTitle, requireSave, saveCaption, saveName, saveRequired, selectedLanguage, setLanguage, socket, staticKeys, translations, updateTranslations;

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

  translations = {
    de: {
      "drop_zone": "Drop Zone",
      "leadin": "Teilen Sie den Spaß eines Lifeplus-Events indem Sie Ihre Fotos oder Videos in die DropZone hochladen.",
      "show_help": "Hilfe anzeigen",
      "hide_help": "Hilfe ausblenden",
      "share_your_photos": "Teilen Sie Ihre Fotos oder Videos",
      "click_tap_or_drag": "Dateien durch Anklicken Berühren oder Drag & Drop hier einfügen",
      "your_name": "Mein Name",
      "cancel": "Abbrechen",
      "canceled": "Annulliert",
      "remove": "Entfernen",
      "caption": "Bildunterschrift (optional)",
      "save_changes": "Änderungen Speichern",
      "all_changes_saved": "Alle Änderungen gespeichert wurden",
      "help_text": "<h2>Erste Schritte</h2><p>Zum Hochladen eines Bildes oder Videos einfach das Kästchen unten anklicken (oder berühren). Das System fordert Sie zur Auswahl einer Datei auf – das Hochladen beginnt sobald Sie eine Datei ausgewählt haben. Während des Hochladens in die DropZone zeigt das System einen Fortschrittsbalken unter dem Bild oder Video an. War das Hochladen erfolgreich wird ein Häkchen angezeigt.</p><h2>Bilder per Drag & Drop verschieben</h2><p>Wenn Sie einen Computer oder ein anderes Gerät benutzen mit dem das Ziehen und Ablegen von Dateien in einem Webbrowser-Fenster möglich ist können Sie mehrere Dateien gleichzeitig auswählen und per Drag & Drop in das Feld unten einfügen.</p><h2>Beschriftung</h2><p>Das Beschriftungsfeld der Datei anklicken oder berühren um eine optionale Beschriftung hinzuzufügen. Das System speichert während des Schreibens automatisch den Text den Sie eingeben.</p><h2>Ihren Namen eingeben</h2><p>Sie haben die Möglichkeit Ihren Namen in das Feld „Mein Name“ einzutragen. Wie bei der Beschriftung speichert das System auch hier den Text während Sie ihn eintippen. Die Eingabe Ihres Namens hilft uns Sie bei Problemen mit dem Hochladen zu kontaktieren.</p>"
    },
    en: {
      "drop_zone": "Drop Zone",
      "leadin": "Share the fun of a Lifeplus event with others by uploading your event photos or videos to the Drop Zone.",
      "show_help": "Show Help",
      "hide_help": "Hide Help",
      "share_your_photos": "Share Your Photos or Videos",
      "click_tap_or_drag": "Click tap or drag and drop your files here",
      "your_name": "Your name",
      "cancel": "Cancel",
      "canceled": "Canceled",
      "remove": "Remove",
      "caption": "Caption (optional)",
      "save_changes": "Save Changes",
      "all_changes_saved": "All Changes Have Been Saved",
      "help_text": "<h2>Getting started</h2><p>To upload an image or video simply click (or tap) the box below. The system prompts you to select a file—select one and the system starts the upload process. The system displays a progress bar below the image or video as it is uploading to the DropZone and a checkmark when it has finished uploading.</p><h2>Dragging and dropping images</h2><p>If you are using a desktop computer or other device that allows you to drag and drop files into a web browser window you can select multiple files at once and drag them into the box below.</p><h2>Captioning</h2><p>Click or tap on the file's caption box to add an optional caption. The system automatically saves the text you enter as you type it.</p><h2>Entering your name</h2><p>You can optionally enter your name in the <em>Your Name</em> box. As with the caption boxes the system automatically saves the text as you type it. Entering your name helps us to contact you if there are problems with the upload.</p>"
    },
    es: {
      "drop_zone": "Drop Zone",
      "leadin": "Comparta la diversión de un evento de Lifeplus con otras personas cargando sus fotos o vídeos del evento en DropZone",
      "show_help": "Mostrar ayuda",
      "hide_help": "Ocultar ayuda",
      "share_your_photos": "Comparta sus fotos o vídeos",
      "click_tap_or_drag": "Haga clic toque o arrastre y suelte aquí sus archivos",
      "your_name": "Su nombre",
      "cancel": "Cancelar",
      "canceled": "Cancelado",
      "remove": "Quitar",
      "caption": "Subtítulo (opcional)",
      "save_changes": "Guardar cambios",
      "all_changes_saved": "Todos los cambios se han guardado",
      "help_text": "<h2>Introducción</h2><p>Para cargar una imagen o un vídeo solo tiene que hacer clic (o tocar) en el cuadro siguiente. El sistema le pedirá que seleccione un archivo para iniciar el proceso de carga. El sistema muestra una barra de progreso debajo de la imagen o del vídeo mientras se carga a DropZone y cuando finaliza el proceso de carga muestra una marca de verificación.</p><h2>Cómo arrastrar y soltar imágenes</h2><p>Si utiliza un equipo de sobremesa u otro dispositivo que le permite arrastrar y soltar archivos en la ventana de un navegador web puede seleccionar varios archivos a la vez y arrastrarlos al cuadro que se muestra a continuación.</p><h2>Títulos</h2><p>Haga clic o toque en el cuadro de título para añadir un título opcional. El sistema guarda automáticamente el texto a medida que lo va escribiendo.</p><h2>Cómo introducir su nombre</h2><p>Tiene la opción de introducir su nombre en el cuadro <em>Su nombre</em>. Al igual que sucede con los cuadros de título el sistema guarda automáticamente el texto a medida que lo va escribiendo. Introducir su nombre nos ayuda a ponernos en contacto con usted si se produce algún problema con la carga.</p>"
    },
    fi: {
      "drop_zone": "Drop Zone",
      "leadin": "Jaa Lifeplus-tapahtuma muiden kanssa lataamalla tapahtuman valokuvat tai videot Drop Zoneen",
      "show_help": "Näytä Ohje",
      "hide_help": "Piilota Ohje",
      "share_your_photos": "Jaa valokuvasi tai videosi",
      "click_tap_or_drag": "Napsauta napauta tai vedä ja pudota tiedostosi tähän",
      "your_name": "Oma nimesi",
      "cancel": "Peruuta",
      "canceled": "Peruttu",
      "remove": "Poistaa",
      "caption": "Kuvateksti (valinnainen)",
      "save_changes": "Tallenna muutokset",
      "all_changes_saved": "Kaikki muutokset on tallennettu",
      "help_text": "<h2>Aloittaminen</h2><p>Lataa kuva tai video napsauttamalla tai napauttamalla alla olevaa ruutua. Järjestelmä kehottaa valitsemaan tiedoston. Valitse tiedosto ja järjestelmä aloittaa lataamisen. Järjestelmä näyttää tilanneilmaisimen DropZoneen ladattavan kuvan tai videon alapuolella ja valintamerkin latauksen päätyttyä.</p><h2>Kuvien vetäminen ja pudottaminen</h2><p>Jos käytät pöytätietokonetta tai muuta laitetta jossa on mahdollista vetää ja pudottaa tiedostoja selainikkunaan voit valita useita tiedostoja kerralla ja vetää ne alla olevaan ruutuun.</p><h2>Kuvatekstin lisääminen</h2><p>Lisää valinnainen kuvateksti napsauttamalla tai napauttamalla tiedoston kuvatekstiruutua. Järjestelmä tallentaa tekstin automaattisesti kirjoitettaessa. </p><h2>Nimen kirjoittaminen</h2><p>Voit kirjoittaa nimesi Oma nimesi -ruutuun. Kuvatekstien tapaan järjestelmä tallentaa tekstin automaattisesti kirjoitettaessa. Jos kirjoitat nimesi voimme ottaa sinuun yhteyttä jos latauksessa ilmenee ongelmia.</p>"
    },
    fr: {
      "drop_zone": "Drop Zone",
      "leadin": "Partagez les meilleurs moments des événements Lifeplus avec d'autres utilisateurs en chargeant les photos ou vidéos de ces événements dans la zone de chargement.",
      "show_help": "Afficher l'aide",
      "hide_help": "Masquer l'aide",
      "share_your_photos": "Partagez vos photos ou vidéos",
      "click_tap_or_drag": "Effectuez un glisser-déposer en cliquant ou en appuyant pour déplacer vos fichiers ici",
      "your_name": "Votre nom",
      "cancel": "Annuler",
      "canceled": "Annulé",
      "remove": "Supprimer",
      "caption": "Légende (facultatif)",
      "save_changes": "Enregistrer les modifications",
      "all_changes_saved": "Tous les changements ont été enregistrés",
      "help_text": "<h2>Démarrage</h2><p>Pour charger une image ou une vidéo il vous suffit de cliquer (ou d'appuyer) sur le bouton ci-dessous. Sélectionnez un fichier lorsque le système vous y invite. Le système lance ensuite le processus de chargement. Une barre de progression s'affiche sous l'image ou la vidéo en cours de chargement vers la zone de chargement. Lorsque le chargement est terminé une coche s'affiche.</p><h2>Glisser-déposer des images</h2><p>Si vous utilisez un ordinateur de bureau ou tout autre périphérique vous permettant de faire un glisser-déposer pour déplacer les fichiers afin de les charger dans la fenêtre d'un navigateur Web vous pouvez sélectionner plusieurs fichiers à la fois et les déplacer dans la fenêtre ci-dessous.</p><h2>Sous-titres</h2><p>Si vous souhaitez ajouter un sous-titre cliquez ou appuyez sur la zone correspondante du fichier. Le système enregistre automatiquement le texte au fur et à mesure que vous le saisissez.</p><h2>Saisie du nom</h2><p>Si vous le souhaitez vous pouvez saisir votre nom dans la zone de texte « Your Name » (Votre nom). Comme pour l'ajout de sous-titres le système enregistre automatiquement le texte que vous saisissez. Ajouter votre nom vous permet d'être contacté en cas de problème avec le chargement des fichiers.</p>"
    },
    it: {
      "drop_zone": "Drop Zone",
      "leadin": "Condividete le emozioni di un evento Lifeplus con altri utenti caricando le vostre foto e i video dell'evento su DropZone",
      "show_help": "Mostra Aiuto",
      "hide_help": "Nascondi Aiuto",
      "share_your_photos": "Condividere foto e video",
      "click_tap_or_drag": "Fare clic toccare o trascinare e rilasciare i file qui",
      "your_name": "Nome",
      "cancel": "Annulla",
      "canceled": "Annullato",
      "remove": "Rimuovere",
      "caption": "Didascalia (optional)",
      "save_changes": "Salva modifiche",
      "all_changes_saved": "Tutte le modifiche sono state salvate",
      "help_text": "<h2>Guida rapida</h2><p>Per caricare un'immagine o un video basta fare clic (o toccare) sulla casella di seguito. Il sistema vi chiederà di selezionare un file; una volta selezionato il file il sistema avvierà il processo di caricamento. Il sistema visualizza una barra con lo stato di avanzamento del caricamento dell'immagine o del video su DropZone; al termine dell'operazione verrà visualizzato un segno di spunta.</p><h2>Trascinare e rilasciare immagini</h2><p>Se state usando un computer o un dispositivo che consente di trascinare e rilasciare file nella finestra di un browser Web potete selezionare più file contemporaneamente e trascinarli nella casella di seguito.</p><h2>Didascalie</h2><p>Toccate o fate clic sulla casella della didascalia del file se desiderate aggiungere una didascalia. Il sistema salva automaticamente il testo immesso man mano che digitate. </p><h2>Indicare il vostro nome</h2><p>Se lo desiderate potete indicare il vostro nome nell'apposita casella. Come per la casella dedicata alle didascalie il sistema salva automaticamente il testo man mano che digitate. Indicando il vostro nome ci è possibile contattarvi in caso di problemi con il caricamento.</p>"
    },
    ja: {
      "drop_zone": "ドロップゾーン",
      "leadin": "ドロップゾーンから写真やビデオをアップロードして、ライフプラスのイベントで過ごした楽しいひと時を共有しましょう。",
      "show_help": "ヘルプを表示する",
      "hide_help": "ヘルプを閉じる",
      "share_your_photos": "写真・ビデオを共有",
      "click_tap_or_drag": "こちらをクリックするか、ファイルをここにドラッグ＆ドロップして下さい。",
      "your_name": "お名前",
      "cancel": "キャンセル",
      "canceled": "キャンセル",
      "remove": "削除する",
      "caption": "キャプション（オプション）",
      "save_changes": "変更の保存",
      "all_changes_saved": "すべての変更を保存しました",
      "help_text": "<h2>手順について</h2><p>共有したい写真とビデオはこちらから簡単にアップロードできます。まずは下のボックスをクリック（もしくはタップ）して下さい。すると、ファイルを選択するようご案内が出ます。ファイルをひとつ選ぶと、アップロードが自動的に始まります。アップロードしている間は進行状況がバーで示されます。完了するとチェックマークが表示されます。</p><h2>ドラッグ＆ドロップでアップロード</h2><p>パソコンなどブラウザのウィンドウにドラッグ＆ドロップが可能な機器をお使いの場合は、複数のファイルを同時に選択して下のボックス上へドラッグ＆ドロップすると、まとめてアップロードができます。</p><h2>コメントについて</h2><p>コメントボックスを使うと、写真やビデオに投稿者コメントを付けることができます。入力した文字列は自動的に保存されます。 </p><h2>お名前</h2><p>「お名前」のボックスに記名していただけます。入力した文字列は自動的に保存されます。記名は必須ではありませんが、アップロードがうまくいかなかった場合などに連絡できるなどのメリットがあります。</p>"
    },
    nl: {
      "drop_zone": "Drop Zone",
      "leadin": "Deel het plezier van een Lifeplus-evenement met anderen door foto's of video's van het evenement te uploaden naar de Drop Zone",
      "show_help": "Help weergeven",
      "hide_help": "Help verbergen",
      "share_your_photos": "Deel uw foto's of video's",
      "click_tap_or_drag": "Klik tik of sleep uw bestanden hierheen",
      "your_name": "Uw naam",
      "cancel": "Annuleren",
      "canceled": "Geannuleerd",
      "remove": "Verwijderen",
      "caption": "Onderschrift (optioneel)",
      "save_changes": "Wijzigingen Opslaan",
      "all_changes_saved": "Alle wijzigingen zijn opgeslagen",
      "help_text": "<h2>Aan de slag</h2><p>Klik (of tik) op het vak hieronder om een foto of video te uploaden. Selecteer een bestand wanneer het systeem u daarom vraagt. Het systeem start vervolgens het uploadproces. Het systeem toont eerst een voortgangsbalk onder de foto of video terwijl deze wordt geüpload naar de DropZone en een vinkje wanneer het uploaden is voltooid.</p><h2>Foto's slepen</h2><p>U kunt meerdere bestanden tegelijk selecteren en ze naar het vak hieronder slepen als u een computer of een ander apparaat gebruikt waarmee u bestanden kunt slepen naar een browservenster.</p><h2>Onderschrift</h2><p>Klik of tik op het onderschriftvakje van het bestand om eventueel een onderschrift toe te voegen. Het systeem slaat automatisch uw tekst op terwijl u typt. </p><h2>Uw naam invullen</h2><p>U kunt eventueel uw naam invullen in het vakje <em>Uwnaam</em>. Net als bij de onderschriftvakjes slaat het systeem automatisch uw tekst op terwijl u typt. Vul uw naam in zodat wij contact met u op kunnen nemen als er problemen zijn met de upload.</p>"
    },
    sv: {
      "drop_zone": "Drop Zone",
      "leadin": "Dela dina foton eller videor från ett Lifeplus-evenemang genom att överföra dem till Drop Zone",
      "show_help": "Visa hjälpavsnittet",
      "hide_help": "Dölj hjälpavsnittet",
      "share_your_photos": "Dela dina foton eller videor",
      "click_tap_or_drag": "Klicka tryck eller dra-och-släpp dina filer här",
      "your_name": "Ditt namn",
      "cancel": "Avbryt",
      "canceled": "Annulleras",
      "remove": "Avlägsna",
      "caption": "Bildtext (tillval)",
      "save_changes": "Spara ändringar",
      "all_changes_saved": "Alla ändringar har sparats",
      "help_text": "<h2>Komma igång</h2><p>Om du vill överföra en bild eller video klickar du bara (eller trycker) på rutan nedan. Då ombes du att välja en fil och när du har gjort ditt val påbörjas överföringsprocessen. I systemet visas en förloppsindikator under bilden eller videon när den överförs till Drop Zone och när överföringen är klar visas en bock.</p><h2>Dra och släppa bilder</h2><p>Om du använder en stationär dator eller en annan enhet där du kan dra och släppa filer i ett webbläsarfönster går det att välja flera filer samtidigt och dra dem till rutan nedan.</p><h2>Bildtext</h2><p>Klicka eller tryck på filens bildtextruta om du vill lägga till en valfri bildtext Texten du skriver där sparas automatiskt medan du skriver.</p><h2>Ange ditt namn</h2><p>Om du vill kan du ange ditt namn i rutan <em>Ditt namn</em>. Precis som för bildtextrutorna sparas texten när du skriver in den. Om du anger ditt namn blir det lättare för oss att kontakta dig om det skulle uppstå problem vid överföringen.</p>"
    }
  };

  staticKeys = ['drop_zone', 'leadin', 'show_help', 'hide_help', 'share_your_photos', 'click_tap_or_drag', 'your_name', 'cancel', 'help_text', 'caption', 'all_changes_saved', 'save_changes'];

  selectedLanguage = 'de';

  updateTranslations = function() {
    var key, l, translation, _results;
    l = staticKeys.length;
    $('.dz-remove').html(translations[selectedLanguage]['remove']);
    $('.dz-cancel').html(translations[selectedLanguage]['cancel']);
    _results = [];
    while (l--) {
      key = staticKeys[l];
      translation = translations[selectedLanguage][key];
      if (translation) {
        _results.push($(".translate[data-key='" + key + "']").html(translation));
      } else {
        _results.push($(".translate[data-key='" + key + "']").html(key));
      }
    }
    return _results;
  };

  setLanguage = function(slug) {
    selectedLanguage = slug;
    return updateTranslations();
  };

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

  $(document).delegate('.caption', 'keyup', function() {
    var $container, $this, fileName;
    $this = $(this);
    $container = $this.closest('.dz-preview');
    fileName = $container.find('.dz-filename').text();
    return saveCaption(fileName, $this.val());
  }).delegate('.full-name', 'keyup', function() {
    return saveName($(this).val());
  }).delegate('.help-toggle', 'click', function() {
    $('.help-text').toggle('slow');
    return $('.help-toggle').toggle();
  }).delegate('.language-selector button', 'click', function() {
    return setLanguage($(this).attr('data-slug'));
  }).ready(function() {
    var dz, err;
    Dropzone.options.LifeplusDropzone = {
      maxFileSize: 500,
      dictDefaultMessage: $('.dropzone-message').html(),
      previewTemplate: $('.dropzone-preview').html(),
      addRemoveLinks: true,
      dictCancelUpload: translations[selectedLanguage]['cancel'],
      dictCancelUploadConfirmation: translations[selectedLanguage]['canceled'],
      dictRemoveFile: translations[selectedLanguage]['remove'],
      headers: {
        'x-user-id': id,
        'x-user-id-3d': id3d
      }
    };
    try {
      dz = new Dropzone('#LifeplusDropzone');
      dz.on('complete', updateTranslations);
      dz.on('success', updateTranslations);
      return updateTranslations();
    } catch (_error) {
      err = _error;
      return console.log(err);
    }
  });

}).call(this);
