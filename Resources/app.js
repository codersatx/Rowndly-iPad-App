// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Titanium.UI.orientation =  Titanium.UI.LANDSCAPE_RIGHT;


// create tab group
var tabGroup = Titanium.UI.createTabGroup();
//
// create base UI tab and root window
//


var win1 = Titanium.UI.createWindow({  
    title:'Rowndly',
    backgroundColor:'#fff',
    url:'master.js',
    barColor:'#000000',
    orientationModes: [Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT,Titanium.UI.PORTRAIT]
    });
    
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Home',
    window:win1
});

var win2 = Titanium.UI.createWindow({  
    title:'My Account',
    backgroundColor:'#000000',
    url:'account.js',
    barColor:'#000000'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'My Account',
    window:win2
});


//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
