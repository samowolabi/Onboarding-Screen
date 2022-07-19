var dialogShared = {}; 
dialogShared.refreshEmailSuggestion = function(){
	var emailFieldCSSSelector = "input[type='email']";
	var emailSuggestionCSSSelector = ".emailSuggestion";
	
	var validateWithRegex = function(){
		var email = $(emailFieldCSSSelector).val();
		
		var regexValidateEmail = function(email) {
			var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
			if (filter.test(email)) {
				return true;
			} else {
				return false;
			}
		};
					 
		if(regexValidateEmail(email)){
			$(".emailError").hide();
			$("input[type='email']").removeClass("error");
		}
		else{ 
			$(".emailError").fadeIn();
			$("input[type='email']").addClass("error");
		}
	}();
	
	var validateWithMailCheck = function(){
		
		var domains = ['msn.com', 'bellsouth.net', 'telus.net', 'comcast.net', 'optusnet.com.au', 'earthlink.net', 'qq.com', 'sky.com', 'icloud.com', 'mac.com', 'sympatico.ca', 'googlemail.com', 'att.net', 'xtra.co.nz', 'web.de', 'cox.net', 'gmail.com', 'ymail.com', 'aim.com', 'rogers.com', 'verizon.net', 'rocketmail.com', 'google.com', 'optonline.net', 'sbcglobal.net', 'aol.com', 'me.com', 'btinternet.com', 'charter.net', 'shaw.ca', "yahoo.com", "hotmail.com",  "live.com", "hotmail.co.uk", "yahoo.co.uk", "facebook.com", "gmx.com", "mail.com", "outlook.com"];
		
		var topLevelDomains = ["com", "com.au", "com.tw", "ca", "co.nz", "co.uk", "de", "fr", "it", "ru", "net", "org", "edu", "gov", "jp", "nl", "kr", "se", "eu", "ie", "co.il", "us", "at", "be", "dk", "hk", "es", "gr", "ch", "no", "cz", "in", "net", "net.au", "info", "biz", "mil", "co.jp", "sg", "hu", "uk"]; 
  
  
		$(emailFieldCSSSelector).mailcheck({
			domains: domains,
			topLevelDomains: topLevelDomains,
			suggested: function(element, suggestion) {
				$(emailSuggestionCSSSelector).html("<p style='margin-bottom:0; color:#9e0000'>* Did you mean <span class='emailSuggestionText'>" + suggestion.full + "</span>?</p>");
				$(emailSuggestionCSSSelector).fadeIn();
			},
			empty: function(element) {
				$(emailSuggestionCSSSelector).hide();
			}
		});
		
	}();
	 
};

dialogShared.initName = function(formName){
	var nameElement = document.getElementById( formName + '_name' );
	$(nameElement).on('blur change', function(event) { 
		var validateWithRegex = function(){
			var name = $(nameElement).val();
			
			//At least one character
			if(name.length && name.length>=1){
				$(".nameError").hide();
				$("input[name='name']").removeClass("error");
			}
			else{ 
				$(".nameError").fadeIn();
				$("input[name='name']").addClass("error");
			}
		}();
    });
};


dialogShared.initPassword = function(formName){
	var passwordElement 	= document.getElementById( formName + '_password' );
	var passwordIconElement = document.getElementById( formName + '_password_icon' );
	var toggleElement 		= document.getElementById( formName + '_toggle' );
	
	toggleElement.addEventListener('click', function(event) {
		event.preventDefault();
		var type 	= passwordElement.getAttribute('type');
		var myClass = passwordIconElement.getAttribute('class');
		passwordElement.setAttribute('type', type === 'password' ? 'text' : 'password');
		passwordIconElement.setAttribute('class', myClass === 'fa fa-eye' ? 'fa fa-eye-slash' : 'fa fa-eye'); 
	});
	
	$(passwordElement).on('blur change', function(event) { 
		var validateWithRegex = function(){
			var password = $(passwordElement).val();
			
			//At least one character
			if(password.length && password.length>=1){
				$(".passwordError").hide();
				$("input[type='password']").removeClass("error");
			}
			else{ 
				$(".passwordError").fadeIn();
				$("input[type='password']").addClass("error");
			}
		}();
    });
};

dialogShared.initEmailSuggestion = function(formName){
 
	$(".emailSuggestion").on('click', function(event) {
		event.preventDefault();
		var suggestedEmail = $(".emailSuggestion" + " .emailSuggestionText").text();
		$("input[type='email']").val(suggestedEmail);
		$(".emailSuggestion").hide();
		return false;
	});
	
	var emailElement = $("#" + formName + '_email');
	emailElement.on('blur change', function(event) { 
		dialogShared.refreshEmailSuggestion(); 
    });
	 
};


		
$('<div id="dialogLogin" class="materialDialog materialDialogLogin" data-on-init-callback="dialogLogin.init(thisComponent)"></div>').appendTo('body');
var dialogLogin = {};
dialogLogin.init = function(thisComponent) {
 
    thisComponent.html(` 
	<h3 style="text-align: center">MEMBERS AREA</h3>
	<div class="materialDialogContent"> 
		<div class="materialAuthFormWrapper col-sm-12 text-center">
			<div class="materialAuthForm">
				<div class="materialAuthFormHeader materialText materialThemeLightGrey">
					<h4>The Piano Encyclopedia</h4> 
				</div>
				<!--
				<a href="#" class="materialButtonOutline">
					<i class="fa fa-facebook-official" aria-hidden="true"></i>
					<span><span class="hidden-xs">Continue With </span>Facebook</span>
				</a>
				<div class="materialAuthFormDivider materialText materialThemeLightGrey">
					<p>OR</p>
				</div>
				-->
				<form class="togglePaswordForm" data-on-submit-callback="dialogLogin.submit(value, thisSelection, thisComponent)"  action=""> 
				
					<div class="materialAuthFormInput">
							<input placeholder="Email" 		name="email"    id="login_email"    type="email" autocomplete="email"  auto  class="materialInputTextArea" required>
							
							<div class="materialAuthFormSecondaryText emailError" style="display: none">
								<p style="margin-bottom:0; color:#9e0000">* Please enter a valid email address</p>
							</div>
							
							<div class="materialAuthFormSecondaryText emailSuggestion" style="display: none; cursor: pointer;">
								<p><a class="materialLink materialThemeLightGrey" style="margin-bottom:0" href="javascript:" >Did you mean <span class="emailSuggestionText"></span>?</a></p>
							</div>
							
							<input placeholder="Password"   name="password" id="login_password" type="password" autocomplete="current-password"class="materialInputTextArea" required>
							<span id="login_toggle" style="position: absolute; right: 0; padding-top: 25px; padding-right:10px; cursor: pointer;">
							   <i class="fa fa-eye" id="login_password_icon"></i>
							</span>
							
							<div class="materialAuthFormSecondaryText passwordError" style="display: none">
								<p style="margin-bottom:0; color:#9e0000">* Please enter your password.</p>
							</div>
					</div> 
					<div class="materialAuthFormSecondaryText">
						<a class="materialLink materialThemeLightGrey" href="javascript:" data-on-click-callback="materialDialog.show('dialogResetPassword', {modal: true});">Forgot Your Password?</a>
					</div> 
					<div>
						<input type="submit" class="materialButtonFill" value="LOG IN">
					</div>
				
				</form>
				
				<div class="materialAuthFormBelowText materialText" style="font-weight: bold">
					<span>Need an Account?</span>
					<a class="materialLink" href="javascript:"  data-on-click-callback="materialDialog.show('dialogSignup', {modal: true});">Create an Account</a>
				</div>
			</div>
		</div>
	</div> 
	`);
     
	
	dialogShared.initPassword('login');
	dialogShared.initEmailSuggestion('login');
    
};

 

dialogLogin.submit = function(value, thisSelection, thisComponent) {
	var emailField 	 =  $('input[name=email]', thisComponent);
	var passwordField =  $('input[name=password]', thisComponent);
	var email = $('input[name=email]', thisComponent).val();
	var password = $('input[name=password]', thisComponent).val();

	materialDialog.waitStart("Login in...");	
  
    if(!(email && password && !emailField.hasClass("error") && !passwordField.hasClass("error") )){
		materialDialog.alert("Oops!", "There is missing or invalid information. Please fix it and try again!", {
			hideCallback: function(){}
		}); 
    }
	else{  
		$.ajax({
			dataType: "json",
			url: "https://learn.pianoencyclopedia.com/hydra/global-app-user-authentication.php", 
			cache: false, 
			type: "POST",
			crossDomain: true,
			headers: {
				"accept": "application/json"
			},
			data: {
                "url": window.location.href,
                "referrer": document.referrer,
                "action": "login",
				"password": password,
				"email": email, 
				"appName":  config.appName	 
			} 
		})
		.done(function(data) { 
			console.log(data); 
			localStorage.setItem('hs_uid',  data.hs_uid);
			localStorage.setItem('hs_uidh', data.hs_uidh);
	  
			if(!data.success){
				materialDialog.alert("Invalid Credentials", "You entered a wrong password and email combination. Please try again...", {
					hideCallback: function(){} 
				});
			}else{
				//Reload this page now that user is succesfully authenticated
				location.reload();
				thisComponent.hide();
			}
			 
		})
		.fail(function(XMLHttpRequest, textStatus, errorThrown) {
			console.log('Error Getting status for parameters: - Error:' + errorThrown);
			materialDialog.alertNoInternetConnection();	  
		});
	}
	
	materialDialog.waitEnd();	 
   
};

/***/
var emailRemoteValidation = { 
	validNo: function(valid, code, description){
		materialDialog.alert("Oops! Invalid email address...", "It seems you made a spelling mistake. Please re-enter your email address and try again.", {
			 buttonCaption: "Try again",
			 hideCallback: function(){ 
				$("input[type='email']").val(""); 
				dialogShared.refreshEmailSuggestion();
			 } 
		})
	},
	validMaybe: function(previousComponent, valid, code, description){
		 materialDialog.question("Please confirm.", "Please double-check there is no spelling mistake: <b>" + emailRemoteValidation.data.email + "</b>. Is it correct?",{
			  "buttonNo":{
				caption: "No",
				value: "no"
			   },
			  "buttonYes":{
				caption: "Yes",
				value: "yes"
			  },
			  "hideCallback": function(thisComponent){
					console.log("Maybe result: ", thisComponent.lastValue);
					
					if(thisComponent.lastValue === "yes"){	
						emailRemoteValidation.validYes();
						previousComponent.hide();
					}else{
						$('input[type=email]').val(''); 
						dialogShared.refreshEmailSuggestion();
					}
			  }
			  
		});
		return false;
	},
	validYes: function(){
		
		var signup = function(){
			materialDialog.waitStart("Creating account...");
		
			$.ajax({  
				dataType: "json",
				url: "https://learn.pianoencyclopedia.com/hydra/global-app-user-authentication.php", 
				cache: false, 
				type: "POST",
				crossDomain: true,
				headers: {
					"accept": "application/json"
				},
				data: {
					"url": window.location.href,
					"referrer": document.referrer,
					"action": "signup",
					"password": emailRemoteValidation.data.password, 
					"name": emailRemoteValidation.data.name,
					"email": emailRemoteValidation.data.email, 
					"appName":  config.appName		 
				} 
			})
			.done(function(data) { 
				localStorage.setItem('hs_uid',  data.hs_uid);
				localStorage.setItem('hs_uidh', data.hs_uidh); 
				
				console.log(data); 
		  
				if(!data.success){
					var title ="";
					var subtitle="";
					
					switch(data.error){ 
						case "INVALID_PARAMS":
							var title =  "Oops!";
							var subtitle = "An error was triggered because this page is misconfigured, please contact support@pianoencyclopedia.com so we can fix this!";
							break;
						case "MISSING_NAME_EMAIL_PASSWORD":
							var title =  "Oops!";
							var subtitle = "You must enter your name, email, and a desired password. Please try again...";
							break;
						case "EMAIL_EXISTS":
							var title =  "Oops!";
							var subtitle = "There is already a user with this email address. If this is your account, try to login and if you forgot your password click on the 'Forgot Your Password' link to recover it. Else, try to signup with a different email address.";
							break;
						case "EMAIL_NOT_VALID":
							var title =  "Oops!";
							var subtitle = "Email is not valid: please enter a valid email address.";
							break;	
						default:
							var title =  "Oops!";
							var subtitle = "You must enter your name, email, and a desired password. Please try again...";
					}
					 
					materialDialog.alert(title, subtitle, {
						hideCallback: function(){}
					}); 
					return false;
					
				}else{
					//Refresh to login automatically.
					location.reload(); 
					materialDialog.alert("Congratulations!", "We have sent you an email to "+ emailRemoteValidation.data.email +". Please check your email to get your password and use it to login. If you cannot find the email, please check your Spam folder.", {
						hideCallback: function(){
							materialDialog.show("dialogLogin", {"modal": true});
						}
					}); 
					return true;
					
					/*
					function gtag_report_conversion(url) {
						 var callback = function () {
						 if (typeof(url) != 'undefined') {
						  window.location = url;
						}
					  };
					  gtag('event', 'conversion', {
						  'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
						  'value': 1.0,
						  'currency': 'USD',
						 'event_callback': callback
					  });
					return false;
					}
					*/
				
				}
				 
			})
			 .fail(function(XMLHttpRequest, textStatus, errorThrown) {
				console.log('Error Getting status for parameters: - Error:' + errorThrown);
				//TODO:mostrar el error?
				materialDialog.alertNoInternetConnection();	 
				return false;
			})  
			.always(function() { 
				materialDialog.waitEnd();
			}); 
		}();
		
	},
	validateAndSignup: function(thisComponent, maxNumberOfRetries, waitMsBeforeRetrying, retries){
		materialDialog.waitStart("Almost ready...");
	 
		/* Default number of retries to 1 (value used to count recursive calls) */
		retries = (typeof retries !== 'undefined') ? retries : 1;
			
		$.ajax({
			type: "POST",
			url: "https://pianoencyclopedia.com/en/ajax/verify-email-remotely/",
			data: {
				"s": "frgd5nqRs3",
				"email": emailRemoteValidation.data.email,
				"form_data": emailRemoteValidation.data.formData,
				"format": "json"
			},
			dataType: "json"
		})
		.done(function(data) {
			//Now analyze the success parameter inside the received data
			switch (data.success) {
				case "yes":
						switch(data.valid){
							case "yes":
									emailRemoteValidation.validYes();
									thisComponent.hide();
								 break;
							case "no":
									emailRemoteValidation.validNo(data.valid, data.code, data.description);
								break;
							case "maybe":
									emailRemoteValidation.validMaybe(thisComponent, data.valid, data.code, data.description); 
								 break;
						}
					break;
				case "retry":
					//retry 
					if (retries < maxNumberOfRetries) {
						window.setTimeout(function() { 
							emailRemoteValidation.validateAndSignup(thisComponent, maxNumberOfRetries, waitMsBeforeRetrying, retries);
						}, waitMsBeforeRetrying);
						retries++;
					} else { 
						emailRemoteValidation.validMaybe(thisComponent, "maybe", "n/a", "n/a");
					}

					break;
				case "no":
					emailRemoteValidation.validNo(data.valid, data.code, data.description);
					
					break;
				default:
					settings.callbackMaybeValid(settings, "error", "n/a", "n/a");
			};
		})
		.fail(function(ajaxObject, errorCode) {
			//retry 
			if (retries < maxNumberOfRetries) {
				window.setTimeout(function() {
					emailRemoteValidation.validateAndSignup(thisComponent, maxNumberOfRetries, waitMsBeforeRetrying, retries);
				}, waitMsBeforeRetrying);
				retries++;
			} else {
				//Ajax request failed after several attempts (e.g "service not available") 
				emailRemoteValidation.validMaybe(thisComponent, "error", "n/a", "n/a");
			}
		})
		.always(function() { 
			materialDialog.waitEnd();
		});
	},
	data : {}
};

$('<div id="dialogSignup" class="materialDialog materialDialogSignup" data-on-init-callback="dialogSignup.init(thisComponent)"></div>').appendTo('body');
var dialogSignup = {};
dialogSignup.init = function(thisComponent) {
 
	var sequenceIdCrypt = app.getQueryParameter("seq") || "";
 
    thisComponent.html(` 
	<h3 style="text-align: center">MEMBERS AREA</h3>
	<div class="materialDialogContent"> 
		<div class="materialAuthFormWrapper col-sm-12 text-center">
			<div class="materialAuthForm">
				<div class="materialAuthFormHeader materialText materialThemeLightGrey">
					<h4>The Piano Encyclopedia</h4> 
				</div>
				
				<!--
				<a href="#" class="materialButtonOutline">
					<i class="fa fa-facebook-official" aria-hidden="true"></i>
					<span><span class="hidden-xs">SignUp With</span>Facebook</span>
				</a>
				
				<a href="#" class="materialButtonOutline">
					<i class="fa fa-google" aria-hidden="true"></i>
					<span><span class="hidden-xs">SignUp With</span>Google</span>
				</a>
				
				<div class="materialAuthFormSubtitle materialText materialThemeLightGrey">
					<p>We won't post without your permission</p>
				</div>
				<div class="materialAuthFormDivider materialText materialThemeLightGrey">
					<p>OR</p>
				</div>
				-->
				
				<form action="" data-on-submit-callback="dialogSignup.submit(value, thisSelection, thisComponent)">
				
					<div class="materialAuthFormInput">
							<input name="custom_url_referer" 			 type="hidden"  value="${document.referrer}">
							<input name="custom_url_location" 			 type="hidden"  value="${window.location.href}">
							<input name="custom_hydra_sequence_id_crypt" type="hidden"  value="${sequenceIdCrypt}">
							
							<input placeholder="Name" name="name" id="signup_name" type="text" class="materialInputTextArea" autocomplete="name"  required>
							
							<div class="materialAuthFormSecondaryText nameError" style="display: none">
								<p style="margin-bottom:0; color:#9e0000">* Please enter your name.</p>
							</div>
							
							<input placeholder="Email" name="email" id="signup_email" type="email" autocomplete="email" class="materialInputTextArea" required>
							
							<div class="materialAuthFormSecondaryText emailError" style="display: none">
								<p style="margin-bottom:0; color:#9e0000">* Please enter a valid email address</p>
							</div>
							
							<div class="materialAuthFormSecondaryText emailSuggestion" style="display: none; cursor: pointer;">
								<p><a class="materialLink materialThemeLightGrey" style="margin-bottom:0" href="javascript:" >Did you mean <span class="emailSuggestionText"></span>?</a></p>
							</div>
							
							<input placeholder="Password" name="password" id="signup_password" type="password" autocomplete="current-password" class="materialInputTextArea" required> 
							<span id="signup_toggle" style="position: absolute; right: 0; padding-top: 25px; padding-right:10px; cursor: pointer;">
							   <i class="fa fa-eye" id="signup_password_icon"></i>
							</span>
							
							<div class="materialAuthFormSecondaryText passwordError" style="display: none">
								<p style="margin-bottom:0; color:#9e0000">* Please enter a desired password.</p>
							</div>
					</div> 
					
					<div class="materialAuthFormActionText materialText materialThemeLightGrey" style="padding: 30px 0 5px 0;">
						<p>Start learning piano for free!</p>
					</div> 
					
					<div>
						<input type="submit" class="materialButtonFill"  value="GET FREE ACCESS">
					</div>
				
				</form>
				
				<div class="materialAuthFormActionText materialText materialThemeLightGrey" style="font-size: 11pt;">
					<p>By creating an account, you agree to our <a class="materialLink materialThemeLightGrey" target="_blank" href="https://pianoencyclopedia.com/en/privacy-policy/">Privacy Policy</a> and <a class="materialLink materialThemeLightGrey" href="https://pianoencyclopedia.com/en/terms-of-use/" target="_blank">Terms of Use</a></p>
				</div> 
				
				<div class="materialAuthFormBelowText materialText" style="font-weight: bold">
					<span>Already have an Account?</span>
					<a class="materialLink" href="javascript:" data-on-click-callback="materialDialog.show('dialogLogin', {modal: true});">Sign in.</a>
				</div>
			</div>
		</div> 
	</div> 
	`);
	
	dialogShared.initName('signup');
	dialogShared.initPassword('signup');
	dialogShared.initEmailSuggestion('signup');
	
};



dialogSignup.submit = function(value, thisSelection, thisComponent) {
   var nameField 	 =  $('input[name=name]', thisComponent);
   var emailField 	 =  $('input[name=email]', thisComponent);
   var passwordField =  $('input[name=password]', thisComponent);
   
   var name = $('input[name=name]', thisComponent).val();
   var email = $('input[name=email]', thisComponent).val();
   var password = $('input[name=password]', thisComponent).val();
   
 
   if(!(name && email && password && !emailField.hasClass("error") && !passwordField.hasClass("error") && !nameField.hasClass("error")  )){
		materialDialog.alert("Oops!", "There is missing or invalid information. Please fix it and try again!", {
			hideCallback: function(){}
		});  
   }else{
		
		//Used just for tracking purposes on email validation service script
		emailRemoteValidation.data.formData = $( ".materialAuthForm input" ).serialize();

		//Add here all values from form that are important for signup
		emailRemoteValidation.data.name = name;
		emailRemoteValidation.data.email = email;
		emailRemoteValidation.data.password = password;
		
		//Settings for remove validation
		var maxNumberOfRetries = 1;
		var waitMsBeforeRetrying = 500;
		
		emailRemoteValidation.validateAndSignup(thisComponent, maxNumberOfRetries, waitMsBeforeRetrying);
	  
   } 
}  

/***/

$('<div id="dialogResetPassword" class="materialDialog materialDialogResetPassword" data-on-init-callback="dialogResetPassword.init(thisComponent)"></div>').appendTo('body');
var dialogResetPassword = {};
dialogResetPassword.init = function(thisComponent) {
 
    thisComponent.html(`  
	<div class="materialDialogContent"> 
		<div class="materialAuthFormWrapper col-sm-12 text-center">
			<div class="materialAuthForm">
				<div class="materialAuthFormHeader materialText materialThemeLightGrey">
					<h4>Reset Your Password</h4>
				</div>
				
				<form action="" data-on-submit-callback="dialogResetPassword.submit(value, thisSelection, thisComponent)">
					<div class="materialAuthFormInput">
						<input placeholder="Email" name="email" type="email" autocomplete="email" id="forgot_email"   class="materialInputTextArea" required>
					</div>
					
					<div class="materialAuthFormSecondaryText emailError" style="display: none">
						<p style="margin-bottom:0; color:#9e0000">* Please enter a valid email address</p>
					</div>
					
					<div class="materialAuthFormSecondaryText emailSuggestion" style="display: none; cursor: pointer;">
						<p><a class="materialLink materialThemeLightGrey" style="margin-bottom:0" href="javascript:" >Did you mean <span class="emailSuggestionText"></span>?</a></p>
					</div>
				
					<input type="submit"  class="materialButtonFill"  value="SEND EMAIL">
				</form>
				
				<div class="materialAuthFormBelowText materialText">
					<span>Remembered your password?</span>
					<a class="materialLink" href="javascript:" data-on-click-callback="materialDialog.show('dialogLogin', {modal: true});">Log in.</a>
				</div>
			</div>
		</div> 
	</div> 
	`);
	
	dialogShared.initEmailSuggestion('forgot', false);
	 
};

dialogResetPassword.submit = function(value, thisSelection, thisComponent) {
   var email 		 =  $('input[name=email]', thisComponent).val(); 
   var emailField 	 =  $('input[name=email]', thisComponent);
    
   materialDialog.waitStart("Please wait...");	
   
   if(!(email && !emailField.hasClass("error"))){
		materialDialog.alert("Oops!", "The email is invalid. Please fill in your email correctly and try again.", {
			hideCallback: function(){}
		}); 
   }
   else{
		$.ajax({  
			dataType: "json",
			url: "https://learn.pianoencyclopedia.com/hydra/global-app-user-authentication.php", 
			cache: false, 
			type: "POST",
			crossDomain: true,
			headers: {
				"accept": "application/json"
			},
			data: {
                "url": window.location.href,
                "referrer": document.referrer,
                "action": "forgot-password",
				"email": email, 
				"appName":  config.appName	
			} 
		})
		.done(function(data) { 
			console.log(data); 
			
			thisComponent.hide();
			
			//No matter the result (if email is valid or invalid, we show the same message)
			materialDialog.alert("Check your email", "We have sent you an email with your new password to "+ email +". Please check your email to get your password and use it to login. If you cannot find the email, please check your Spam folder.", {
				hideCallback: function(){
					materialDialog.show("dialogLogin", {"modal": true});
				}
			}); 
			
			materialSnackBar.push("Your login information was sent by email." );
			
		})
		.fail(function(XMLHttpRequest, textStatus, errorThrown) {
			console.log('Error Getting status for parameters: - Error:' + errorThrown);
			materialDialog.alertNoInternetConnection();	 
		});  
   }  
   
   materialDialog.waitEnd();	
};

/** **/
$('<div id="dialogLogout" class="materialDialog" data-on-init-callback="dialogLogout.init(thisComponent)"></div>').appendTo('body');
var dialogLogout = {};
dialogLogout.init = function(thisComponent) {

   
    var buttonText1 = "Cancel";
    var buttonText2 = "Yes";
    thisComponent.html(`
	<h3>Logout</h3>
	<div class="materialDialogContent">
		<h4>Are you sure you want to logout?</h4>
		 
	</div>
	<div class="materialDialogAction"> 
		<button class="materialButtonFill submit" value="no" data-on-click-callback="dialogLogout.submit(value, thisSelection, thisComponent)">${buttonText1}</button>
		<button class="materialButtonOutline submit" value="yes" data-on-click-callback="dialogLogout.submit(value, thisSelection, thisComponent)">${buttonText2}</button>
	</div>
	`);
 
};

dialogLogout.submit = function(value, thisSelection, thisComponent) {
    console.log(value);
	
	if(value=="Yes"){
		$.ajax({  
			dataType: "json",
			url: "https://learn.pianoencyclopedia.com/hydra/global-app-user-authentication.php", 
			cache: false, 
			type: "POST",
			crossDomain: true,
			headers: {
				"accept": "application/json"
			},
			data: {
                "url": window.location.href,
                "referrer": document.referrer,
                "action": "logout",
				"appName":  config.appName	
			} 
		})
		.done(function(data) { 
			console.log(data); 
			localStorage.removeItem('hs_uid');
			localStorage.removeItem('hs_uidh'); 
			
			materialDialog.show("dialogLogin", {
				modal: true,
				hideCallback: function(){}
			});
			
			thisComponent.hide();
		})
		 .fail(function(XMLHttpRequest, textStatus, errorThrown) {
			console.log('Error Getting status for parameters: - Error:' + errorThrown);
			materialDialog.alertNoInternetConnection();	 
		});  
	}

};


$('<div id="dialogChangePassword" class="materialDialog materialdialogChangePassword" data-on-init-callback="dialogChangePassword.init(thisComponent)"></div>').appendTo('body');
var dialogChangePassword = {};
dialogChangePassword.init = function(thisComponent) {
 
    thisComponent.html(`  
	<div class="materialDialogContent"> 
		<div class="materialAuthFormWrapper col-sm-12 text-center">
			<div class="materialAuthForm">
				<div class="materialAuthFormHeader materialText materialThemeLightGrey">
					<h4>Change Your Password</h4>
				</div>
				
				<form class="togglePaswordForm" action="" data-on-submit-callback="dialogChangePassword.submit(value, thisSelection, thisComponent)"  >
                       
					<input placeholder="New password"   name="password" id="change_password" type="password" autocomplete="current-password"class="materialInputTextArea" required>
					<span id="change_toggle" style="position: absolute; right: 0; padding-top: 25px; padding-right:10px; cursor: pointer;">
					   <i class="fa fa-eye" id="change_password_icon"></i>
					</span>
					
					<div class="materialAuthFormSecondaryText passwordError" style="display: none">
						<p style="margin-bottom:0; color:#9e0000">* Please enter your password.</p>
					</div>
						
					<input type="submit"  class="materialButtonFill"  value="CHANGE PASSWORD">
				
				</form> 
			</div>
		</div> 
	</div> 
	`);
	
	dialogShared.initPassword('change');
	 
};

dialogChangePassword.submit = function(value, thisSelection, thisComponent) {
   var passwordField =  $('input[name=password]', thisComponent);
   var password = $('input[name=password]', thisComponent).val();
   
   materialDialog.waitStart("Please wait...");	
   
   if(!(password && !passwordField.hasClass("error"))){
		materialDialog.alert("Oops!", "The password is empty. Please fill in your new password and try again.", {
			hideCallback: function(){
				materialDialog.show('dialogChangePassword', {});
			}
		}); 
   }
   else{
		$.ajax({  
			dataType: "json",
			url: "https://learn.pianoencyclopedia.com/hydra/global-app-user-authentication.php", 
			cache: false, 
			type: "POST",
			crossDomain: true,
			headers: {
				"accept": "application/json"
			},
			data: {
                "url": window.location.href,
                "referrer": document.referrer,
                "action": "change-password", 
				"hs_uid": (localStorage.getItem('hs_uid') || ""), 
				"hs_uidh": (localStorage.getItem('hs_uidh') || ""),
				"password": password, 
				"appName":  config.appName	
			} 
		})
		.done(function(data) { 
			console.log(data); 
			
			thisComponent.hide();
			
			if(data.success){
				materialDialog.alert("Your password was changed", "Please login again, with your new password.", {
					hideCallback: function(){
						materialDialog.show("dialogLogin", {"modal": true});
					}
				}); 
			}else{ 
				materialDialog.alert("We must verify it's you...", "As a further security measure, we ask to you to please login again with your current password to verify it's really you. After you login, please click again on change password again to complete the process.", {
					hideCallback: function(){
						materialDialog.show("dialogLogin", {"modal": true});
					}
				}); 
			}
		})
		 .fail(function(XMLHttpRequest, textStatus, errorThrown) {
			console.log('Error Getting status for parameters: - Error:' + errorThrown);
			materialDialog.alertNoInternetConnection();	
		});  
   }  
   
   materialDialog.waitEnd();
};