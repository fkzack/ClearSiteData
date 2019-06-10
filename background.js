var clear_callback = function(){
	console.log('cleared');
};

chrome.browserAction.onClicked.addListener(function(tab){	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {			
		
		var full_url = tabs[0].url.split('/');
		var protocol = full_url[0];
		var full_host = full_url[2].split('.');
		var host
		if (full_host.length < 3) {
			host = full_url[2];		
		} else {
			host = full_host.slice(full_host.length-2, full_host.length).join(".")
		}
		
		var base_url = protocol + '//' + host;		
		console.log('url: ' + full_url.join("") + ' --> ' +  base_url);			
		chrome.browsingData.remove(
			{
				"origins": [base_url]
			},
			{
				"appcache": true,
				"cache": true,
				"cacheStorage": true,
				"cookies": true,
				//"downloads": true,
				//"fileSystems": true,
				//"formData": true,
				//"history": true,
				"indexedDB": true,
				"localStorage": true,
				//"serverBoundCertificates": true,
				"pluginData": true,
				//"passwords": true,
				//"serviceWorkers": true,
				"webSQL": true
			}
			
			
		);
    });	
});




	