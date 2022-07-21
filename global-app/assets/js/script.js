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
    showHideLoader('open'); // Show Loader
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