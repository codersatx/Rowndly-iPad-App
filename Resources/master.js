var win = Ti.UI.currentWindow;
var wb = Ti.UI.createWebView();
var input_url = Ti.UI.createTextField({
        	color:'#336699',
		    //value:e.row.url,
		    height:32,
		    //width:'80%',
		    top:10,
		    left:78,
		    right:85,
		    keyboardType:Titanium.UI.KEYBOARD_URL,
			returnKeyType:Titanium.UI.RETURNKEY_GO,
		    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		    keyboardToolbarColor: '#999',   
		    keyboardToolbarHeight: 40,
        }); 


win.backgroundImage = 'iphone/Default-Landscape.png';
win.backgroundColor = '#000';
var view_add_rownd = Ti.UI.createView({width:200, height:100, backgroundColor:'#000', borderRadius:4});
var label_add_rownd = Ti.UI.createLabel({text:'Adding Rownd...', color:'#ffffff', width:'auto', height:'auto', top:20});
var actInd = Titanium.UI.createActivityIndicator({
			    height:'auto',
			    width:10,
			    color:'#000000',
			    top:50,
			    style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
			});
			view_add_rownd.add(label_add_rownd);
        	view_add_rownd.add(actInd);
        	actInd.show();
        	
        	
var button_close_popover = Ti.UI.createButton({title:'Close'});
var popover = Ti.UI.iPad.createPopover({ 
			width:300, 
			height:500,
			title:'My Rownds',
			rightNavButton:button_close_popover,
			//leftNavButton:canc,
			barColor:'#111'
		});
var data = [{title:"Loading Rownds..."}];
var rssTable = Titanium.UI.createTableView({data:data});
var onClickFunction = false;

var xhr = Ti.Network.createHTTPClient();
  xhr.onload = function() {
    try {
      if (onClickFunction) {
        rssTable.removeEventListener('click', onClickFunction);
      }
      
      var doc = this.responseXML.documentElement;
      var items = doc.getElementsByTagName("item");
      var x = 0;
      var doctitle = doc.evaluate("//channel/title/text()").item(0).nodeValue;
      for (var c=0;c<items.length;c++) {
        var item = items.item(c);
        //var thumbnails = item.getElementsByTagName("media:thumbnail");
        //if (thumbnails && thumbnails.length > 0) {
          var url = item.getElementsByTagName("link").item(0).text;
          var title = item.getElementsByTagName("title").item(0).text;
          var description = item.getElementsByTagName("description").item(0).text;
          var last_rownd = item.getElementsByTagName("pubDate").item(0).text;
          var row = Ti.UI.createTableViewRow({height:75,hasDetail:true});
          var label_title = Ti.UI.createLabel({
            text:title,
            left:10,
            //top:10,
            height:30,
            top:5,
            width:250,
            font:{fontWeight:'bold'}
          });
          var label_description = Ti.UI.createLabel({
            text:description,
            left:10,
            top:30,
            height:15,
            width:250,
            font:{fontSize:11}
          });
          var label_last_rownd = Ti.UI.createLabel({
            text:'Last rownd:'+ last_rownd,
            left:10,
            top:45,
            height:15,
            width:250,
            font:{fontSize:11}
          });
          row.add(label_title);
          row.add(label_description);
          row.add(label_last_rownd);
          data[x++] = row;
          row.url = url;
          row.doctitle = title;
        //}
      }
      onClickFunction = function(e) {
      	popover.hide({animated:true});
      	//detailWindow.title = e.row.doctitle;
        var win_rownd = Ti.UI.createWindow({title:e.row.doctitle, top:54});
        wb.url = e.row.url;
        win_rownd.add(wb);
        
        var view_address = Ti.UI.createView({height:54, backgroundColor:'#cccccc', top:0});
        
        var button_open_safari = Ti.UI.createButton({top:0, right:0, systemButton:Titanium.UI.iPhone.SystemButton.ACTION});
        
        win.rightNavButton = button_open_safari;
        
        var button_back = Ti.UI.createButton({backgroundImage:'images/back.png', width:32, height:32, left:10, top:10});
        var button_forward = Ti.UI.createButton({backgroundImage:'images/forward.png', width:32, height:32, left:42, top:10, color:'#cccccc'});
        var button_go = Ti.UI.createButton({backgroundImage:'images/go.png', width:32, height:32, right:46, top:10});
        var button_add = Ti.UI.createButton({backgroundImage:'images/add.png', width:32, height:32, right:10, top:10});
        
        
        input_url.value = e.row.url;
        
        view_address.add(button_back);
        view_address.add(button_forward);
        view_address.add(button_go);
        view_address.add(button_add);
        view_address.add(input_url);
        
        button_open_safari.addEventListener('click', function(){
        	Titanium.Platform.openURL(input_url.value);
        });
		
		input_url.addEventListener('blur', function(e){
			go_to_url();
		});
		
		button_go.addEventListener('click', function(){
			input_url.blur();
			go_to_url();       	 	
		});
		
		button_add.addEventListener('click', function(){
			input_url.blur();
			add_url(); 	 	
		});
		
		button_back.addEventListener('click', function(){
			if(wb.canGoBack)
			{
				wb.goBack();
			}
		});
		
		button_forward.addEventListener('click', function(){
			if(wb.canGoForward)
			{
				wb.goForward();
			}
		});
		
		if(wb.loading)
		{
			show_activity();
		}
		
		
		function go_to_url()
		{
			var win_rownd = Ti.UI.createWindow({title:e.row.doctitle, top:60});
        	var wb = Ti.UI.createWebView({url:input_url.value});
       	 	win_rownd.add(wb);
       	 	win.add(win_rownd);
		}
		
		function add_url()
		{
        	//button_add.title = '';
        	win.add(view_add_rownd);
        	var url = 'http://rowndly.com/ipad.php?user_id=1&url='+ input_url.value;
       	 	var xhr_2 = Ti.Network.createHTTPClient();
       	 	xhr_2.onload = function() {
       	 		if(this.responseText == 'Success')
       	 		{
       	 			win.remove(view_add_rownd);
       	 			alert('Rownd added successfully.');
       	 			//view_address.remove(actInd);
       	 			//button_add.title = '+';
       	 		}
       	 	};
 			xhr_2.open("GET", url);
  			xhr_2.send();	
		}
        win.add(view_address);
        win.add(win_rownd);
        //win.open({animated:true});
        
      };
      rssTable.addEventListener('click', onClickFunction);
      rssTable.setData(data);
    }
    catch(E) {
      alert(E);
    }
  };
  xhr.open("GET","http://rowndly.com/api/rss/1/corner123");
  xhr.send();

var button_my_rownds = Ti.UI.createButton({
		title:'My Rownds',
		height:50,
		width:300,
		top:100
	});

win.leftNavButton = button_my_rownds;

button_my_rownds.addEventListener('click', function(){
	
	popover.add(rssTable);
	popover.show({animated:true, view:button_my_rownds});
	button_close_popover.addEventListener('click', function(){
		popover.hide({animated:true});
	});
	win.addEventListener('focus', function(){
		popover.hide({animated:true});
	});
});
