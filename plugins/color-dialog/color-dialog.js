/*!
 * Table dialog plugin for Editor.md
 *
 * @file        color-dialog.js
 * @author      mlwmlw
 * @version     1.2.1
 * @updateTime  2015-06-24
 * {@link       https://github.com/pandao/editor.md}
 * @license     MIT
 */

(function() {

	var factory = function (exports) {

		var $            = jQuery;
		var pluginName   = "color-dialog";

		var langs = {
			"zh-cn" : {
				toolbar : {
					table : "顏色選擇"
				}
			},
			"zh-tw" : {
				toolbar : {
					table : "顏色選擇"
				}
			},
			"en" : {
				toolbar : {
					table : "Color picker"
				}
			}
		};

		exports.fn.colorDialog = function() {
			var _this       = this;
			var cm          = this.cm;
			var editor      = this.editor;
			var settings    = this.settings;
			var path        = settings.path + "../plugins/" + pluginName +"/";
			var classPrefix = this.classPrefix;
			var dialogName  = classPrefix + pluginName, dialog;

			$.extend(true, this.lang, langs[this.lang.name]);
			this.setToolbar();

			var lang        = this.lang;
			var dialogLang  = lang.dialog.color;
			var colors = "Red,White,Cyan,Silver,Blue,Gray,DarkBlue,Black,LightBlue,Orange,Purple,Brown,Yellow,Maroon,Lime,Green,Magenta,Olive".split(',');
			var dialogColor = [];
			for(var i in colors) {
				dialogColor.push('<div style="float:left;min-width: 8em;"><label style="width:100%;padding:0;"><input type="radio" name="color" value="' + colors[i] + '" /><span style="margin: 0 3px;width:1em;height:1em;display:inline-block;background-color:' + colors[i] + '"></span>' + colors[i] + '</label></div>');
			}
			
			var dialogContent = [
				"<div class=\"editormd-form\" style=\"padding: 13px 0;overflow:hidden\">"
			].concat(dialogColor).join("\n");
			
			if (editor.find("." + dialogName).length > 0) 
			{
                dialog = editor.find("." + dialogName);

				this.dialogShowMask(dialog);
				this.dialogLockScreen();
				dialog.show();
			} 
			else
			{
				dialog = this.createDialog({
					name       : dialogName,
					title      : '改變字體顏色',
					width      : 360,
					height     : 320,
					mask       : settings.dialogShowMask,
					drag       : settings.dialogDraggable,
					content    : dialogContent,
					lockScreen : settings.dialogLockScreen,
					maskStyle  : {
						opacity         : settings.dialogMaskOpacity,
						backgroundColor : settings.dialogMaskBgColor
					},
					buttons    : {
                        enter : [lang.buttons.enter, function() {
									var color  = this.find("[name=\"color\"]:checked").val();
									cm.replaceSelection('<font color="' + color + '">' + cm.getSelection() + '</font>');
                           this.hide().lockScreen(false).hideMask();
                           return false;
                        }],
                        cancel : [lang.buttons.cancel, function() {                                   
                            this.hide().lockScreen(false).hideMask();
                            return false;
                        }]
					}
				});
			}
		};

	};
    
	// CommonJS/Node.js
	if (typeof require === "function" && typeof exports === "object" && typeof module === "object")
    { 
        module.exports = factory;
    }
	else if (typeof define === "function")  // AMD/CMD/Sea.js
    {
		if (define.amd) { // for Require.js

			define(["editormd"], function(editormd) {
                factory(editormd);
            });

		} else { // for Sea.js
			define(function(require) {
                var editormd = require("./../../editormd");
                factory(editormd);
            });
		}
	} 
	else
	{
        factory(window.editormd);
	}

})();
