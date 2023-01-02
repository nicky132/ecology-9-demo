
var __colDialogNamespace__ = (function(){
	var dialog = null;
	return (function(){
		return {
			showColDialog:function(){
					dialog = new top.Dialog();
					dialog.currentWindow = window;
					dialog.okLabel = SystemEnv.getHtmlNoteName(3515,readCookie("languageidweaver"));
					dialog.cancelLabel = SystemEnv.getHtmlNoteName(3516,readCookie("languageidweaver"));
					dialog.Drag = true;
					dialog.Title = SystemEnv.getHtmlNoteName(3517,readCookie("languageidweaver"));
					dialog.Width = 600;
					dialog.Height = 400;
					dialog.URL = "/showCol.jsp";
					dialog.show();
			},
			closeColDialog:function(){
				dialog.close();
			}
		}
	})();
})();

//@deprecated
function showColDialog(){
   __colDialogNamespace__.showColDialog();
}

//@deprecated
function closeColDialog(){
	__colDialogNamespace__.closeColDialog();
}