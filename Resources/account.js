var win = Ti.UI.currentWindow;

var username = Ti.UI.createTextField({
	backgroundColor:'#ffffff', 
	width:300, 
	height:40, 
	top:20, 
	left:20, 
	right:20, 
	hintText:'username',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE});
	
var password = Ti.UI.createTextField({
	backgroundColor:'#ffffff', 
	width:300, 
	height:40, 
	top:70, 
	left:20, 
	right:20, 
	hintText:'password',
	passwordMask:true,
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE});

var button_login = Ti.UI.createButton({
	title:'Login',
	height:40,
	color:'#fff',
	backgroundColor:'#333333',
	backgroundImage:'',
	right:20,
	left:20,
	top:130,
	width:300
});
win.add(username);
win.add(password);
win.add(button_login);

button_login.addEventListener('click', function(){
	var username_val = username.value;
	var password_val = password.value;
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		var response = eval('('+this.responseText+')');
		alert(response.status);
	};
  	xhr.open("POST","http://rowndly.com/users/login");
  	xhr.send({username:username_val, password:password_val});
	
});
