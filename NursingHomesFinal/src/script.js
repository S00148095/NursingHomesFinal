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
var tier1month = 39;
var tier2month = 69;
var tier3month = 99;
var tier4month = 149;
var tier1year = 399;
var tier2year = 699;
var tier3year = 999;
var tier4year = 1499;
var grandtotal = 0;

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
function populateCheckboxes(name, tier) {
    var boxes = $('input:radio');
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].value == tier && boxes[i].name == name) {
            boxes[i].setAttribute("checked", "true");
            break;
        }
    }
}
function calcPaymentTotal() {
    try {
        var tier1total = 0;
        var tier2total = 0;
        var tier3total = 0;
        var tier4total = 0;
        grandtotal = 0;
        var tier1 = 0;
        var tier2 = 0;
        var tier3 = 0;        
        var tier4 = 0;
        var boxes = $('input:radio:checked');
        var payment = boxes[boxes.length - 1];
        var option = payment.value;
        if (option == "month") {
            tier1 = tier1month;
            tier2 = tier2month;
            tier3 = tier3month;            
            tier4 = tier4month;
        }
        else if (option == "year") {
            tier1 = tier1year;
            tier2 = tier2year;
            tier3 = tier3year;
            tier4 = tier4year;
        }
        for (var i = 0; i < boxes.length; i++) {
            if (boxes[i].value === "1") {
                tier1total += tier1;
                grandtotal += tier1;
            }
            else if (boxes[i].value === "2") {
                tier2total += tier2;
                grandtotal += tier2;
            }
            else if (boxes[i].value === "3") {
                tier3total += tier3;
                grandtotal += tier3;
            }
            else if (boxes[i].value === "4") {
                tier4total += tier4;
                grandtotal += tier4;
            }
        }
        $('#tier1total').html("€" + tier1total + " p/" + option);
        $('#tier2total').html("€" + tier2total + " p/" + option);
        $('#tier3total').html("€" + tier3total + " p/" + option);        
        $('#tier4total').html("€" + tier4total + " p/" + option);
        $('#grandtotal').html("€" + grandtotal + " p/" + option);
    }
    catch (error) {
        console.log(error);
    }
    finally { }
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
        calcPaymentTotal: function () {
            calcPaymentTotal();
            return grandtotal;
        },
        initPopup: function (value) {
            initPopup(value);
        },
        closePopup: function (value) {
            closePopup(value);
        },
        initFullpage: function (value) {
            initFullpage(value);
        },
        PopBoxes: function (name, tier) {
            populateCheckboxes(name, tier);
            calcPaymentTotal();
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