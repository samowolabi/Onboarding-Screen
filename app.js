if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}

var displayMode = null;

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

            @media only screen 
            and (min-width: 320px) 
            and (max-width: 480px) {
                .promotionBarDiv {
                    padding: 1.4rem 1rem; 
                }
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
    if((displayMode == null) || (displayMode == 'browser')){
        if (typeof(document.querySelector('.promotionBarDiv')) != 'undefined' && document.querySelector('.promotionBarDiv') != null){
        } else {
            showInstallPromotion();
        }
    }
}

var myTimer;
var count = 0;

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
        myTimer = setInterval(showInstallPromotionIntervalFunc, 15000);
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
  //console.log('I am being called');
   // Optionally, send analytics event that PWA install promo was shown.
  //console.log(`'beforeinstallprompt' event was fired.`);
  
    if(count === 0) {
        // Update UI notify the user they can install the PWA
        showInstallPromotion();
        count++
    } else {
        myTimer = setInterval(showInstallPromotionIntervalFunc, 15000);
    }
});


// Detects if device is on iOS 
const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test( userAgent );
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
    alert('Prompt is called');
  
    if(count === 0) {
        // Update UI notify the user they can install the PWA
        showInstallPromotion();
        count++
    } else {
        myTimer = setInterval(showInstallPromotionIntervalFunc, 15000);
    }
} else {
    alert('Prompt is not called');
}

 
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
    });
}