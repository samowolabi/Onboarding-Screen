// Loader Function
let showHideLoader = (status) => {
    if(status === 'open') {
        document.querySelector('body').style.overflow = "hidden";
        document.querySelector('.loadingIconContainer').classList.add('active');
    }
    if(status === 'close') {
        document.querySelector('body').style.removeProperty('overflow');
        document.querySelector('.loadingIconContainer').classList.remove('active');
    }
}


// Placeholder
let placeholderHTML = `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; background: #000000;">
    <div class="materialPlaceHolder" style="width: 40%; height:60px; margin-top: 5rem;"></div>
    <div class="materialPlaceHolderDiv">
        <div id="" data-button="" class="materialCard" style="">
            <div class="materialCardImg materialPlaceHolder"></div>
            <div class="content materialPlaceHolder" style="margin-top:4px; height:55px;"></div>
        </div>
        <div id="" data-button="" class="materialCard" style="">
            <div class="materialCardImg materialPlaceHolder"></div>
            <div class="content materialPlaceHolder" style="margin-top:4px; height:55px;"></div>
        </div>
        <div id="" data-button="" class="materialCard" style="">
            <div class="materialCardImg materialPlaceHolder"></div>
            <div class="content materialPlaceHolder" style="margin-top:4px; height:55px;"></div>
        </div>
        <div id="" data-button="" class="materialCard" style="">
            <div class="materialCardImg materialPlaceHolder"></div>
            <div class="content materialPlaceHolder" style="margin-top:4px; height:55px;"></div>
        </div>
    </div>
    </div>
`;


let showHidePlaceHolder = (status) => {
    if(status === 'open') {
        document.querySelector('.homePageSwitchAppsContainer').innerHTML = placeholderHTML;
    }
    if(status === 'close') {
        document.querySelector('.homePageSwitchAppsContainer').innerHTML = '';
    }
}


// Toggle Navigate Pages
let openCloseFloatingButton = () => {
    document.querySelector('.materialFloatingButtonContainer').classList.toggle('active');
    document.querySelector('.materialFloatingButtonContainer .materialFloatingButton').classList.toggle('active');
}
document.querySelector('.materialFloatingButtonContainer .materialFloatingButton').addEventListener('click', function (event) {
    openCloseFloatingButton();
});
document.querySelector('.materialFloatingButtonContainer .materialFloatingLinkButton').addEventListener('click', function (event) {
    openCloseFloatingButton();
});


// Call Ajax Function
const callAjaxFunc = (formData, callback) => {
    showHidePlaceHolder('open'); // Show PlaceHolder
    $.ajax({
        dataType: "text", //To avoid parsing of JSON
        url: "https://pianoencyclopedia.com/en/app-generic/global/", 
        cache: false, 
        type: "POST",
        crossDomain: true,
        headers: {
            "accept": "application/json"
        },
        data: formData,
    })
    .done(callback)
    .fail(function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest + ' ' + textStatus + ' ' + errorThrown);
        //materialDialog.alertNoInternetConnection();	 
    });
}


// Hide Loader on setTimeout
let showHideLoaderTimeout = () => {
    showHideLoader('close'); // Hide Loader
}

// Load App iframe
let loadAppIframeFunc = (iframeURL) => {
    let parentSelectorContainer = 'homePageSwitchAppsContainer';
    showHideLoader('open'); // Show Loader

    const setShowHideLoaderTimeout = setTimeout(showHideLoaderTimeout, 1000);

    let htmlContent = `
        <iframe src="${iframeURL}" title="The Piano Encyclopedia Global App"></iframe>
    `;
    document.querySelector('.' + parentSelectorContainer).innerHTML = htmlContent;

    document.querySelector('.' + parentSelectorContainer + ' iframe').onload = () => {
        showHideLoader('close');
        clearTimeout(setShowHideLoaderTimeout);
    };
}

let openLightBox = (htmlContent) => {
    dialogRewardPointsAdded.init = function(thisComponent) {
        thisComponent.html(htmlContent);
    }
    //Show dialog
    materialDialog.show("dialogRewardPointsAdded", {});
}


// Open App Details in Modal
let openAppDetails = (thisElement) => {
    let appButtonLinkFunc = () => { 
        if(thisElement.getAttribute('data-status') === 'locked') {
            return `
                <button class="materialButtonOutline materialThemeDark" onclick="loadAppIframeFunc('${thisElement.getAttribute('data-salesUrl')}')" data-value="close">Read More</button>
                <button class="materialButtonFill materialThemeDark" onclick="loadAppIframeFunc('${thisElement.getAttribute('data-orderUrl')}')" data-value="close">Order Now</button>
            `;
        } else {
            return `
                <button class="materialButtonFill materialThemeDark" onclick="loadAppIframeFunc('${thisElement.getAttribute('data-url')}')" data-value="close">Start Learning</button>
            `;
        }
    };

    let htmlContent = `
        <section class="materialLightBox">
            <div> 
                <img src="${thisElement.getAttribute('data-image')}" alt="">
                <div class="content">
                    <h2 class="materialHeader materialThemeDark fontFamilyOptimus">${thisElement.getAttribute('data-title')}</h2>
                    <h3 class="materialHeader materialThemeDark fontFamilyLato">${thisElement.getAttribute('data-subtitle')}</h3>
                    <p class="materialParagraph materialThemeDark">
                        ${thisElement.getAttribute('data-description') !== 'undefined' ? thisElement.getAttribute('data-description') : ''}
                    </p>
                    <div class="buttonGroup">${appButtonLinkFunc()}</div>
                </div>
            </div>
        </section>
    `;
    openLightBox(htmlContent);
}


//Create dialog dynamically
$('<div id="dialogRewardPointsAdded" class="materialDialog appDetailedContentModalDialog" data-on-init-callback="dialogRewardPointsAdded.init(thisComponent)"></div>').appendTo('body');
var dialogRewardPointsAdded = {}; 

// Render App UI
let renderAppFunc = (appJSONData) => {
    let parentSelectorContainer = 'homePageSwitchAppsContainer';

    // Apps
    let appDivContent = ``;
    appJSONData.home.apps.forEach(function(value) {
        function disabledDiv() {
            return value.status === 'disabled' ? ['disabled', ''] : ['', 'onclick="openAppDetails(this)"'];
        }
        function visibleDiv() {
            return value.visible ? '' : 'hide';
        }
        function statusDiv() {
            return value.status === 'locked' ? 'locked' : '';
        }
        function highlightedDiv() {
            return value.highlight  ? 'highlighted' : '';
        }

        appDivContent += `
            <div id="${value.url}" data-button="" class="materialCard ${visibleDiv()} ${statusDiv()} ${highlightedDiv()} ${disabledDiv()[0]}" ${disabledDiv()[1]} data-image="${value.image}" data-title="${value.title}" data-subtitle="${value.subtitle}" data-description="${value.description}" data-url="${value.url}" data-salesUrl="${value.salesUrl}" data-orderUrl="${value.orderUrl}" data-status="${value.status}">
                <div class="materialCardImg">
                    <div class="materialCardImgInside" style="background-image: url(${value.image}); background-color: grey;"></div> 
                    <div class="materialCardImgOverlay "></div>
                    <div class="materialCardMediaType materialThemeLightGold materialThemeFlat">
                            <i class="fa fa-graduation-cap" title="Course"></i>
                    </div> 
                    <div class="materialCardNew materialThemeLightGold materialThemeFlat">
                        <span data-progress="0">
                            <span data-new="" style="display: inline;"><i>APP</i></span>
                            <span data-incomplete="" style="display: none;"><span data-progress-affects-html="">0</span>%</span>
                            <span data-complete="" style="display: none;"><i class="fa fa-check"></i></span>
                        </span>
                    </div>
                </div>
                <div class="content"><h3 class="materialHeader materialThemeDark fontFamilyLato">${value.title}</h3></div>
            </div>
        `;
    }); 

    let htmlContent = `
        <div><h2 class="materialHeader fontFamilyOptimus">${appJSONData.home.title}</h2></div>
        <div class="elementSeparatorOrnament"><img src="https://learn.pianoencyclopedia.com/hydra/HydraCreator/live-editor/modules-assets/app-global/img/Separator.min.png" alt=""></div>
        <div class="homePageSwitchAppsDiv">${appDivContent}</div>
    `;
    showHidePlaceHolder('close'); // Hide PlaceLoader
    document.querySelector('.' + parentSelectorContainer).innerHTML = htmlContent;
}


// Logged In Status
let loggedInStatus = (response) => {
    document.querySelector('.homePageSwitchAppsContainer h2').innerHTML = `Hi ${response.name}, The Piano Encyclopedia`; // Update Header
    document.querySelector('.materialFloatingButtonContainer .loginLogOutBtn').setAttribute("data-logged", "yes");
    document.querySelector('.materialFloatingButtonContainer .loginLogOutBtn').innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 12H3.62" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.85 8.6499L2.5 11.9999L5.85 15.3499" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

// Logged Out Status
let loggedOutStatus = () => {
    document.querySelector('.homePageSwitchAppsContainer h2').innerHTML = `The Piano Encyclopedia`; // Update Header
    document.querySelector('.materialFloatingButtonContainer .loginLogOutBtn').setAttribute("data-logged", "no")
    document.querySelector('.materialFloatingButtonContainer .loginLogOutBtn').innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12H14.88" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.65 8.6499L16 11.9999L12.65 15.3499" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

// Login and Log Out Status
let logUserInOutFunc = (response) => {
    if (response.logged) {
        loggedInStatus(response);
    } else {
        loggedOutStatus();
    }
}

let fetchedResponseCallback = (response) => {
    response = JSON.parse(response);

    // Render App UI
    renderAppFunc(response);
    material.init($("body"));

    // Update Login and Log Out Status
    logUserInOutFunc(response);
}

let formData = {
    "url": window.location.href,
    "referrer": document.referrer, 
    "hs_uid": (localStorage.getItem('hs_uid') || ""), 
    "hs_uidh": (localStorage.getItem('hs_uidh') || "")
}

// Go Home
let backToHomeFunc = () => {
    // Call Ajax Function to fetch Apps Content
    callAjaxFunc(formData, fetchedResponseCallback);
}

// loginLogOutFunc()
let loginLogOutUser = (thisElement) => {
    if(thisElement.getAttribute('data-logged') === 'yes') {
        materialDialog.show("dialogLogout", {"modal": true});
    }
    if(thisElement.getAttribute('data-logged') === 'no') {
        materialDialog.show("dialogLogin", {modal: true, hideCallback: function(){}});
    }
}

// Call Ajax Function to fetch Apps Content
callAjaxFunc(formData, fetchedResponseCallback);

