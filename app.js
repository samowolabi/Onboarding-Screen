if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}

var displayMode = null;


// const checkIfPWAAppIsInstalled = async() => {
//     const relatedApps = await navigator.getInstalledRelatedApps();
//     relatedApps.forEach((app) => {
//         console.log(app.id, app.platform, app.url);
//     });
// }
// checkIfPWAAppIsInstalled();


// let outcomeText = '';

// // Show Install Promtion Bar on Interval
// let showInstallPromotionInterval = () => {
//     if (typeof(document.querySelector('.promotionBarDiv')) != 'undefined' && document.querySelector('.promotionBarDiv') != null){
//     } else {
//         showInstallPromotion();
//     }
// }
// let setShowInstallPromotionInterval = setInterval(showInstallPromotionInterval, 10000);
 
// clearInterval(setShowInstallPromotionInterval);
// setShowInstallPromotionInterval = setInterval(showInstallPromotionInterval, 10000);


let showInstallPromotion = () => {
    let html = `
        <style>
            .promotionBarDiv {
                opacity:1; 
                transition: 0.6s; 
                width: 100%; 
                background-color:#F5BD41; 
                position:fixed; 
                z-index: 90; 
                left:0; 
                bottom:0; 
                padding: 1.4rem 0; 
                height: auto; 
                display: flex; 
                flex-direction: column; 
                align-items: center;
            }

            .installPromotionButton {
                cursor: pointer;
                padding: 1.35rem 5rem;
                background-color: #000000;
                color: #ffffff;
                border: 0;
                border-radius: 40px;
                margin-bottom: 1rem;
                font-weight: 600;
                font-size: 1.1em;
                transition: 0.35s;
            }

            .hideInstallPromotionButton {
                cursor: pointer;
                padding: 0.75rem 3.25rem;
                background: transparent;
                color: #4e3600;
                border: 0;
                font-weight: bold;
                transition: 0.35s;
            }

            .installPromotionButton:hover, .hideInstallPromotionButton:hover {
                opacity: 70%;
            }
        </style>

        <div class="promotionBarDiv">
            <h1 style="text-align:center;">Add The Piano Encyclopedia to Home Screen</h1>
            <button class="installPromotionButton" onclick="installPWAApp()">Install</button>
            <button class="hideInstallPromotionButton" onclick="hideInstallPromotion('notInstalled')">Not Now</button>
        </div>
    `;
    document.querySelector('.installPromotionDiv').innerHTML = html;
}


let showInstallPromotionIntervalFunc = () => {
    console.log(new Date().toUTCString());
    console.log(displayMode);
    if (typeof(document.querySelector('.promotionBarDiv')) != 'undefined' && document.querySelector('.promotionBarDiv') != null){
    } else {
        showInstallPromotion();
    }
}
var myTimer = setInterval(showInstallPromotionIntervalFunc, 5000);

let hideInstallPromotion = (state) => {
    let element = document.querySelector('.installPromotionDiv > div')
    element.style.opacity = 0;
    element.addEventListener('transitionend', function(event) {
        document.querySelector('.installPromotionDiv').innerHTML = ``;
    }, false );
    element.addEventListener('webkitTransitionend', function(event) {
        document.querySelector('.installPromotionDiv').innerHTML = ``;
    }, false );

    if(state = 'notInstalled') {
        clearInterval(myTimer);
        myTimer = setInterval(showInstallPromotionIntervalFunc, 5000);
    } else {
        clearInterval(myTimer);
    }
}


// Initialize deferredPrompt for use later to show browser install prompt.
var deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  console.log(e);
   // Optionally, send analytics event that PWA install promo was shown.
  //console.log(`'beforeinstallprompt' event was fired.`);
  
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
});

 
const installPWAApp = async() => {
    // Hide the app provided install promotion
    hideInstallPromotion('notInstalled');
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
	  displayMode = 'browser';
	  if (evt.matches) {
		displayMode = 'standalone';
	  }
	  // Log display mode change to analytics
	  console.log('DISPLAY_MODE_CHANGED', displayMode);
      hideInstallPromotion('');
	});
}