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