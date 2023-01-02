(function () {
    'use strict';
    CKEDITOR.plugins.add('juzi', {
        init: init
    });

    function init(editor) {
        if (editor.addFeature) {
            editor.addFeature({
                allowedContent: 'img[alt,id,!src]{width,height};'
            });
        }

        editor.on("contentDom", function () {
            var editableElement = editor.editable ? editor.editable() : editor.document;
            editableElement.on("paste", onPaste, null, {editor: editor});
        });


    }

    function onPaste(event) {
        var editor = event.listenerData && event.listenerData.editor;
        var $event = event.data.$;
        var clipboardData = $event.clipboardData;
        var found = false;
        var imageType = /^image/;

        if (!clipboardData) {
            return;
        }

        return Array.prototype.forEach.call(clipboardData.types, function (type, i) {
            if (found) {
                return;
            }

            if (type.match(imageType) || clipboardData.items[i].type.match(imageType)) {
                readImageAsBase64(clipboardData.items[i], editor);
                return found = true;
            }
        });
    }

    function readImageAsBase64(item, editor) {
        if (!item || typeof item.getAsFile !== 'function') {
            return;
        }

        var file = item.getAsFile();
        var reader = new FileReader();

        reader.onload = function (evt) {
			var base64 = evt.target.result;
            var element = editor.document.createElement('img', {
                attributes: {
                    src: base64
                }
            });

            // We use a timeout callback to prevent a bug where insertElement inserts at first caret
            // position
            setTimeout(function () {
                editor.insertElement(element);
            }, 10);
			upload(file, editor, element);
        };

        reader.readAsDataURL(file);
    }
	
	function upload(file, editor, element) {
		console.log("paste upload");
		var id = CKEDITOR.tools.getNextId();
		var url= editor.config.filebrowserImageUploadUrl;
		if (url.indexOf("?") == -1)
			url += "?";
		else
			url += "&";
		url += 'CKEditor=' + editor.name + '&CKEditorFuncNum=2&langCode=' + editor.langCode;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url);
		xhr.onload = function() {
			var imageUrl = xhr.responseText.match(/2,\s*'(.*?)',/)[1];
			element.data( 'cke-saved-src', imageUrl);
			element.setAttribute( 'src', imageUrl);
			element.removeAttribute( 'id' );
		}
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		var formData = new FormData();
		formData.append("upload", file);
		xhr.send(formData);		
	}
	
})();

			
