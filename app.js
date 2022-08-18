if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}

let showInstallPromotion = () => {
    let html = `
        <div style="opacity:1; transition: 0.6s; width: 100%; background-color:#F5BD41; position:fixed; z-index: 90; left:0; bottom:0; padding: 1.4rem 0; height: auto; display: flex; flex-direction: column; align-items: center;">
            <h1 style="text-align:center;">Easily access The Piano Encyclopedia!</h1>
            <button onClick="installPWAApp()" style="cursor: pointer; padding: 1.35rem 5rem; background-color: #000000; color: #ffffff; border: 0; border-radius: 40px; margin-bottom: 1rem; font-weight: 600; ">Install</button>
            <button onClick="hideInstallPromotion()" style="cursor: pointer; padding: 0.75rem 3.25rem; background: rgba(255, 255, 255, 0.2); color: #000000; border: 0;">Not Now</button>
        </div>
    `;
    document.querySelector('.installPromotionDiv').innerHTML = html;
}

let hideInstallPromotion = () => {
    let element = document.querySelector('.installPromotionDiv > div')
    element.style.opacity = 0;
    element.addEventListener('transitionend', function(event) {
        document.querySelector('.installPromotionDiv').innerHTML = ``;
    }, false );
    element.addEventListener('webkitTransitionend', function(event) {
        document.querySelector('.installPromotionDiv').innerHTML = ``;
    }, false );
}

// Initialize deferredPrompt for use later to show browser install prompt.
var deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
  // Optionally, send analytics event that PWA install promo was shown.
  console.log(`'beforeinstallprompt' event was fired.`);
});
 
const installPWAApp = async() => {
    // Hide the app provided install promotion
    hideInstallPromotion();
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
}

if(window.matchMedia){
	function getPWADisplayMode() {
	  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
	  if (document.referrer.startsWith('android-app://')) {
		return 'twa';
	  } else if (navigator.standalone || isStandalone) {
		return 'standalone';
	  }
	  return 'browser';
	}
	
	console.log("Display mode:" + getPWADisplayMode());

	window.matchMedia('(display-mode: standalone)').addEventListener('change', (evt) => {
	  let displayMode = 'browser';
	  if (evt.matches) {
		displayMode = 'standalone';
	  }
	  // Log display mode change to analytics
	  console.log('DISPLAY_MODE_CHANGED', displayMode);
	});
}