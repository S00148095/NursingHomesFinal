var facilities = ["Live-In Carers",
    "Chiropody",
    "Oratory",
    "Visiting Area",
    "Hairdressing",
    "Laundry",
    "Library",
    "WiFi",
    "Resident GP",
    "Dietician",
    "Dental Care",
    "Pool",
    "Garden",
    "Group Outings",
    "Bingo"];

var careTypes = ["Alzheimer’s",
    "Cancer",
    "Hearing",
    "Speech",
    "Visual",
    "Residential",
    "Respite",
    "Convalescent",
    "Dementia",
    "Physiotherapy"];

var lat = null;
var long = null;
var storedaddress;
var keycounter = 0;
var isfinished;

function initPopup(id) {
    $("#"+id).fadeToggle();
}
function closePopup(id) {
    $("#"+id).fadeOut();
}
function initFullpage(value) {
    if (typeof $.fn.fullpage.destroy == 'function') {
        $.fn.fullpage.destroy('all');
    }
    if (value == "home") {
        $('#fullpage').fullpage(
            {
                scrollOverflow: true
            }
        );
    }
}
function rad(x) {
    return x * Math.PI / 180;
}
function compareLatLong(testaddress, testlat, testlong) {
    var R = 6371; // Earth’s mean radius in meters
    var dLat = rad(lat - testlat);
    var dLong = rad(long - testlong);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(lat)) * Math.cos(rad(testlat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    var testObject = {
        address: testaddress,
        long: testlong,
        lat: testlat,
        distance: parseInt(d)
    };
    localStorage.setItem(keycounter, JSON.stringify(testObject));
    keycounter++;
}
function getLatitudeLongitude(testaddress) {
    var promise = new Promise(function (resolve, reject) {
        testaddress = testaddress || 'Dublin, Ireland';
        geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({
                'address': testaddress
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    lat = results[0].geometry.location.lat();
                    long = results[0].geometry.location.lng();
                    storedaddress = testaddress;
                    resolve("success");
                }
            });
        }
    });
    return promise;
}
function GetLocalData(address, array) {
    for (var i = 0; i < array.length; i++) {
        var temp = array[i];
        for (var j = 0; j < localStorage.length; j++) {
            var k = localStorage.key(j);
            try {
                var v = JSON.parse(localStorage.getItem(k));
            }
            catch (e) {
            }
            if (v.lat == temp[0] && v.long == temp[1] && v.address == address) {
                temp[2] = v.distance;
                array[i] = temp;
            }
        }
    }
    return array;
}
function moveUp() {
    $.fn.fullpage.moveSectionUp();
}
function geocomplete() {
    $("#geocomplete").geocomplete();
}
function Expand() {
    $(".contentvisible").toggle();
    $('.contentexpanded').slideToggle('slow');
}
function Expand1() {
    $('.contentexpanded1').slideToggle('slow');
    $(".contentvisible1").toggle();
}
function Expand2() {
    $('.contentexpanded2').slideToggle('slow');
    $(".contentvisible2").toggle();
}
function Clear() {
    $("textarea, select").val("");
    Expand1();
}
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollButton").style.display = "block";
    } else {
        document.getElementById("scrollButton").style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
var myExtObject = (function () {
    return {
        initPopup: function (value) {
            initPopup(value);
        },
        closePopup: function (value) {
            closePopup(value);
        },
        initFullpage: function (value) {
            initFullpage(value);
        },
        InitTabs: function () {
            $('.menu .item').tab();
        },
        ClearData: function () {
            localStorage.clear();
        },
        RetrieveData: function (address, testarray) {
            return GetLocalData(address, testarray);
        },
        checkFinished: function () {
            return isfinished;
        },
        CalculateDistance: function (address, lats, longs) {
            keycounter = 0;
            isfinished = false;
            getLatitudeLongitude(address)
                .then(function () {
                    var promise = new Promise(function (resolve, reject) {
                        for (var i = 0; i < lats.length; i++) {
                            compareLatLong(address, lats[i], longs[i]);
                        }
                        resolve("success");
                    });
                    return promise;
                })
                .then(function () {
                    isfinished = true;
                })
                .catch(function (error) {
                    alert(error.message);
                });
        },
        Clear: function () {
            $("textarea, select").val("");
            Expand1();
        },
        Populate: function Populate(check) {
            var shown = 0;
            var FacilitiesTable = "<tr>"
            for (var i = 0; i < 15; i++) {
                if (shown % 5 == 0 && shown != 0) FacilitiesTable += "</tr><tr>";
                if (check[i]) {
                    FacilitiesTable += "<td>" + facilities[i] + "</td>"
                    shown++;
                }
            }
            FacilitiesTable += "</tr>"
            $('#Facilities').html(FacilitiesTable);
        },
        PopulateCare: function PopulateCare(check) {
            var shown = 0;
            var CareTable = "<tr>"
            for (var i = 0; i < 10; i++) {
                if (shown % 5 == 0 && shown != 0) CareTable += "</tr><tr>";
                if (check[i]) {
                    CareTable += "<td>" + careTypes[i] + "</td>"
                    shown++;
                }
            }
            CareTable += "</tr>"
            $('#Care').html(CareTable);
        }
    }

})(myExtObject || {});