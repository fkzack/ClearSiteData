console.log("entering clearData.js");

var clear_callback = function () {
  console.log("cleared");
};

chrome.action.onClicked.addListener((tab) => {
  var full_url = tab.url.split("/");
  var protocol = full_url[0];
  var subdomain = full_url[2];
  var full_host = full_url[2].split(".");
  var host;
  if (full_host.length < 3) {
    host = full_url[2];
  } else {
    host = full_host.slice(full_host.length - 2, full_host.length).join(".");
  }

  var base_url = protocol + "//" + host;
  var sub_url = protocol + "//" + subdomain;
  var hosts = [base_url, sub_url];

  console.log("clearing hosts: " + hosts);

  chrome.browsingData.remove(
    {
      origins: hosts,
    },
    {
      appcache: true,
      cache: true,
      cacheStorage: true,
      cookies: true,
      //"downloads": true,
      fileSystems: true,
      //"formData": true,
      //"history": true,
      indexedDB: true,
      localStorage: true,
      //"serverBoundCertificates": true,
      pluginData: true,
      //"passwords": true,
      serviceWorkers: true,
      webSQL: true,
    },
    clear_callback,
  );
});
