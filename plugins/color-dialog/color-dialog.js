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
				dialogColor.push('<div style="float:left;min-width: 7em;"><label style="width:100%;padding:0;"><input type="radio" name="color" value="' + colors[i] + '" /><font color="' + colors[i] + '">' + colors[i] + '</font></label></div>');
			}
			
			var dialogContent = [
				"<div class=\"editormd-form\" style=\"padding: 13px 0;overflow:hidden\">"
			].concat(dialogColor).concat([
				"<div class=\"fa-btns\"></div>",
				"</div>"
			]).join("\n");
			
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
					title      : dialogLang.title,
					width      : 360,
					height     : 226,
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

			var faBtns = dialog.find(".fa-btns");

			if (faBtns.html() === "")
			{
				var icons  = ["align-justify", "align-left", "align-center", "align-right"];
				var _lang  = dialogLang.aligns;
				var values = ["_default", "left", "center", "right"];

				for (var i = 0, len = icons.length; i < len; i++) 
				{
					var checked = (i === 0) ? " checked=\"checked\"" : "";
					var btn = "<a href=\"javascript:;\"><label for=\"editormd-table-dialog-radio"+i+"\" title=\"" + _lang[i] + "\">";
					btn += "<input type=\"radio\" name=\"table-align\" id=\"editormd-table-dialog-radio"+i+"\" value=\"" + values[i] + "\"" +checked + " />&nbsp;";
					btn += "<i class=\"fa fa-" + icons[i] + "\"></i>";
					btn += "</label></a>";

					faBtns.append(btn);
				}
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
