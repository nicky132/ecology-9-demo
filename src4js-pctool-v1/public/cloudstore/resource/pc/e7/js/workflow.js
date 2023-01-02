//compatible for workflow of e7 make by cloudstore
function showIframe(div,hi,wi)
{
	 div.style.width = 373+"px";
     div.style.height = 216+"px";
     div.style.left = (wi > 1000 ? (W / 2 - 200) : wi )+"px";
     div.style.top = (hi > 400 ? (H / 2 - 140) : hi )+"px";
	 div.style.display = 'block';
	 if(content==undefined||content==null)
	 {
	 	content = M('mainsupports').innerHTML;
	 }
	 div.innerHTML = "";
	 oIframe.id = 'HelpFrame';
     div.appendChild(oIframe);
     oIframe.frameborder = 1;
     oIframe.style.position = 'absolute';
     oIframe.style.zIndex = 9;
     
     oIframe.style.width = 373+"px"; 
     oIframe.style.height = 217+"px";
     oIframe.style.top = 'auto';
     oIframe.style.left = 'auto';
     oIframe.style.display = 'block';
     message_table_Div.id="message_table";
     message_table_Div.className="xTable_message";
     div.appendChild(message_table_Div);
     
     message_table_Div.innerHTML=content;
     message_table_Div.style.position="absolute"
     message_table_Div.style.width = 373+"px";
     message_table_Div.style.height = 216+"px";
     message_table_Div.style.padding = "0px";
     message_table_Div.style.margin = "0px";
     message_table_Div.style.border = "0px";
     message_table_Div.style.zIndex= "10";
     message_table_Div.style.display="block";
     message_table_Div.style.top="0px";
     message_table_Div.style.left="0px";
	 console.dir(div);
}