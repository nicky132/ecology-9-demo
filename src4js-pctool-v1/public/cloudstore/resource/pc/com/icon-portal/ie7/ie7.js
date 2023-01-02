/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icon-portal\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-portal-AuthorityCenter-o': '&#xe900;',
		'icon-portal-Workflow': '&#xe90e;',
		'icon-portal-portal': '&#xe914;',
		'icon-portal-operation': '&#xe915;',
		'icon-portal-Modular': '&#xe916;',
		'icon-portal-ModelingEngine': '&#xe917;',
		'icon-portal-MobileEngine': '&#xe918;',
		'icon-portal-Journal': '&#xe919;',
		'icon-portal-integration': '&#xe91a;',
		'icon-portal-content': '&#xe91b;',
		'icon-portal-CloudStore': '&#xe91c;',
		'icon-portal-AuthorityCenter': '&#xe91d;',
		'icon-portal-Workflow-o': '&#xe91e;',
		'icon-portal-portal-o': '&#xe91f;',
		'icon-portal-operation-o': '&#xe920;',
		'icon-portal-Modular-o': '&#xe921;',
		'icon-portal-ModelingEngine-o': '&#xe922;',
		'icon-portal-MobileEngine-o': '&#xe923;',
		'icon-portal-Journal-o': '&#xe924;',
		'icon-portal-integration-o': '&#xe925;',
		'icon-portal-content-o': '&#xe926;',
		'icon-portal-CloudStore-o': '&#xe927;',
		'icon-portal-blog': '&#xe96a;',
		'icon-portal-blog-o': '&#xe902;',
		'icon-portal-car': '&#xe96b;',
		'icon-portal-car-o': '&#xe903;',
		'icon-portal-common': '&#xe96c;',
		'icon-portal-common-o': '&#xe904;',
		'icon-portal-cowork': '&#xe96d;',
		'icon-portal-cowork-o': '&#xe905;',
		'icon-portal-crm': '&#xe96e;',
		'icon-portal-crm-o': '&#xe906;',
		'icon-portal-cs': '&#xe96f;',
		'icon-portal-cs-o': '&#xe907;',
		'icon-portal-demo': '&#xe970;',
		'icon-portal-demo-o': '&#xe908;',
		'icon-portal-doc': '&#xe971;',
		'icon-portal-doc-o': '&#xe909;',
		'icon-portal-email': '&#xe972;',
		'icon-portal-email-o': '&#xe90a;',
		'icon-portal-fa': '&#xe973;',
		'icon-portal-fa-o': '&#xe90b;',
		'icon-portal-home': '&#xe974;',
		'icon-portal-hrm': '&#xe975;',
		'icon-portal-hrm-o': '&#xe90c;',
		'icon-portal-implement': '&#xe976;',
		'icon-portal-implement-o': '&#xe90d;',
		'icon-portal-investigate': '&#xe977;',
		'icon-portal-investigate-o': '&#xe90f;',
		'icon-portal-kpi': '&#xe978;',
		'icon-portal-kpi-o': '&#xe910;',
		'icon-portal-license': '&#xe979;',
		'icon-portal-license-o': '&#xe911;',
		'icon-portal-meeting': '&#xe97a;',
		'icon-portal-meeting-o': '&#xe912;',
		'icon-portal-message': '&#xe97b;',
		'icon-portal-schedule-o': '&#xe913;',
		'icon-portal-news': '&#xe97c;',
		'icon-portal-news-o': '&#xe928;',
		'icon-portal-official': '&#xe97d;',
		'icon-portal-official-o': '&#xe929;',
		'icon-portal-photo': '&#xe97e;',
		'icon-portal-photo-o': '&#xe92a;',
		'icon-portal-project': '&#xe97f;',
		'icon-portal-project-o': '&#xe92b;',
		'icon-portal-reportform': '&#xe980;',
		'icon-portal-reportform-o': '&#xe92c;',
		'icon-portal-satisfaction': '&#xe981;',
		'icon-portal-satisfaction-o': '&#xe92d;',
		'icon-portal-schedule': '&#xe982;',
		'icon-portal-si': '&#xe983;',
		'icon-portal-si-o': '&#xe92e;',
		'icon-portal-store': '&#xe984;',
		'icon-portal-workflow': '&#xe985;',
		'icon-portal-ws': '&#xe986;',
		'icon-portal-ws-o': '&#xe92f;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
