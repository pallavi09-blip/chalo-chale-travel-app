// Hero carousel: pause/play videos as slides change
document.addEventListener("DOMContentLoaded", function () {
    var carousel = document.getElementById("heroCarousel");
    if (!carousel) return;

    function playActiveVideo() {
        carousel.querySelectorAll(".carousel-item video").forEach(function (v) {
            if (v.closest(".carousel-item").classList.contains("active")) {
                v.play().catch(function () {});
            } else {
                v.pause();
            }
        });
    }

    carousel.addEventListener("slide.bs.carousel", function () {
        carousel.querySelectorAll(".carousel-item video").forEach(function (v) {
            v.pause();
        });
    });
    carousel.addEventListener("slid.bs.carousel", playActiveVideo);
    playActiveVideo();
});

// Booking page: live-updating summary panel
document.addEventListener("DOMContentLoaded", function () {
    var pkgSelect = document.getElementById("package");
    var destSelect = document.getElementById("destination");
    var travelersInput = document.getElementById("travelers");
    var checkinInput = document.getElementById("checkin");
    var checkoutInput = document.getElementById("checkout");

    if (!pkgSelect) return; // not the booking page

    var prices = {
        "Basic — Rs. 15,000/person": 15000,
        "Standard — Rs. 28,000/person": 28000,
        "Premium — Rs. 55,000/person": 55000
    };

    function updateSummary() {
        var pkg = pkgSelect.value;
        var dest = destSelect.value;
        var travelers = parseInt(travelersInput.value, 10) || 0;
        var checkin = checkinInput.value;
        var checkout = checkoutInput.value;

        document.getElementById("sumPackage").textContent = pkg ? pkg.split(" — ")[0] : "—";
        document.getElementById("sumDestination").textContent = dest || "—";
        document.getElementById("sumTravelers").textContent = travelers || "—";

        var dates = "—";
        if (checkin && checkout) dates = checkin + " → " + checkout;
        else if (checkin) dates = checkin + " → ?";
        document.getElementById("sumDates").textContent = dates;

        var total = document.getElementById("sumTotal");
        if (pkg && travelers) {
            total.textContent = "Rs. " + (prices[pkg] * travelers).toLocaleString("en-IN");
        } else {
            total.textContent = "—";
        }
    }

    [pkgSelect, destSelect, travelersInput, checkinInput, checkoutInput].forEach(function (el) {
        el.addEventListener("change", updateSummary);
        el.addEventListener("input", updateSummary);
    });
});
