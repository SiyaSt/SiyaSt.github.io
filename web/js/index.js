console.log("Hello");

(function () {
    const startTime = performance.now();

    window.addEventListener('load', function () {
        const endTime = performance.now();
        const loadTime = endTime - startTime;

        document.getElementById('load-time').textContent = loadTime.toFixed(2);
    });
})();


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('#menu')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll('.tab');
    const currentLocation = document.location.pathname;

    console.log(currentLocation);

    tabs.forEach(tab => {
        const tabName = tab.getAttribute('data-tab');
        const tabUrls = {
            'tab1': '/SiyaSt.github.io/web/index.html',
            'tab2': '/SiyaSt.github.io/web/aboutTarot.html',
            'tab3': '/SiyaSt.github.io/web/aboutUs.html'
        };

        if (currentLocation === tabUrls[tabName]) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active')
        }
        if (currentLocation === tabUrls[tabName].toLocaleLowerCase()) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active')
        }
    });

});