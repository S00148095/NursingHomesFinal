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

function Expand() {
    $('.contentexpanded').slideToggle('slow');
}
function Expand1() {
    $('.contentexpanded1').slideToggle('slow');
}
function Expand2() {
    $('.contentexpanded2').slideToggle('slow');
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
        clear: function () {
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

})(myExtObject || {})
