
var telInput = $("#phone"),
errorMsg = $("#error-msg"),
validMsg = $("#valid-msg");

// initialise plugin
telInput.intlTelInput({

allowExtensions: false,
formatOnDisplay: false,
autoFormat: false,
autoHideDialCode: false,
autoPlaceholder: true,
defaultCountry: "auto",
ipinfoToken: "yolo",

nationalMode: false,
numberType: "MOBILE",
//onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
preferredCountries: ['sa', 'ae', 'qa','om','bh','kw','ma'],
preventInvalidNumbers: true,
separateDialCode: false,
initialCountry: "sa",
geoIpLookup: function(callback) {
$.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
  var countryCode = (resp && resp.country) ? resp.country : "";
  callback(countryCode);
});
},
 utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js"
});

var reset = function() {
telInput.removeClass("error");
errorMsg.addClass("hide");
validMsg.addClass("hide");
};


// on blur: validate
telInput.blur(function() {
reset();
if ($.trim(telInput.val())) {
  if (telInput.intlTelInput("isValidNumber")) {
    validMsg.removeClass("hide");
  } else {
    telInput.addClass("error");
    errorMsg.removeClass("hide");
  }
}
});

// on keyup / change flag: reset
telInput.on("keyup change", reset);

let inp = document.querySelector("input")
let btn = document.querySelector("button")

btn.addEventListener("click",()=>{
    let h1  = document.querySelector("h1").innerHTML = inp.value
})


var readOnlyLength = telInput.val().length;

$('#output').text(readOnlyLength);

telInput.on('keypress, keydown', function(event) {
  var $field = $(this);
  $('#output').text(event.which + '-' + this.selectionStart);
  if ((event.which != 37 && (event.which != 39)) &&
    ((this.selectionStart < readOnlyLength) ||
      ((this.selectionStart == readOnlyLength) && (event.which == 8)))) {
    return false;
  }
});


