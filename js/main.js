let templateName = "Special Design";
document.title = templateName;

let toggleBtn = document.querySelector(".toggle-menu")
let liLinks = document.querySelectorAll(".links li")
toggleBtn.onclick = function () {
    document.querySelector(".links").classList.toggle("open")
    document.querySelector(".toggle-menu").classList.toggle("menu-active")
    document.querySelector(".toggle-menu").classList.toggle("specific")
}

liLinks.forEach((li) => {
    li.onclick = function () {
        document.querySelector(".links").classList.remove("open")
    }
})

document.addEventListener("click", function (e) {
    if (e.target.className === "overlay") {
        document.querySelector(".links").classList.remove("open")
        document.querySelector(".toggle-menu").classList.remove("menu-active")
        document.querySelector(".toggle-menu").classList.remove("specific")
        document.querySelector(".settings-box").classList.remove("open")
    }
})


// Select Landing Page Element
let duration = 10000;
let landingBackGround = document.querySelector(".landing-page")
var img = `url('./imgs/0${1}.jpg')`;
landingBackGround.style.background = img
landingBackGround.style.backgroundSize = "cover";
landingBackGround.style.backgroundRepeat = "no-repeat";

function backgroundRandomFunc() {
    let random = (Math.trunc(Math.random() * 9) + 1)
    img = `url('./imgs/0${random}.jpg')`
    landingBackGround.style.backgroundImage = img;
    window.localStorage.setItem("current_background", img);
}
let backgroundInterval = setInterval(backgroundRandomFunc, duration);

// scroll to clicked Class from [bullet + links]
document.querySelector(".links").addEventListener("click", scrollToClass)
document.querySelectorAll(".bullet").forEach(e => e.addEventListener("click", scrollToClass))

function scrollToClass(e) {
    let targetClass = e.target.dataset.section;
    const ele = document.querySelector(`${targetClass}`);
    ele.scrollIntoView({
        behavior: 'smooth',
    });
}

// Select Skills Selector
let skills = document.querySelector(".skills");
let spans = document.querySelectorAll(".skill-progress span");
window.onscroll = function () {
    if (window.scrollY >= skills.offsetTop - 400) {
        spans.forEach(e => {
            e.style.width = e.dataset.progress;
        });
    }

    // To Close Toggle Menu
    if (window.scrollY >= document.querySelector(".landing-page").offsetTop + 200) {
        document.querySelector(".links").classList.remove("open")
        document.querySelector(".toggle-menu").classList.remove("menu-active")
        document.querySelector(".toggle-menu").classList.remove("specific")
    }
}

// Create Popup With The Image
let imgContainer = document.querySelector(".images-box")
let imgs = Array.from(imgContainer.children)

imgs.forEach(image => {
    image.onclick = function () {
        let div = document.createElement("div")
        let p = document.createElement("p")
        let img = document.createElement("img")
        let btn = document.createElement("span")
        let bg = document.createElement("div")
        // Add Content of Each Ele
        btn.innerHTML = "X"
        img.src = image.src
        p.innerHTML = image.alt
        // Add Classes T Elements
        div.className = "alertImgs"
        bg.className = "alertSlide"
        btn.className = "alertBtn"
        p.className = "alertText"
        // Append Ele in HTML
        document.body.appendChild(bg)
        document.body.appendChild(div)
        div.appendChild(p)
        div.appendChild(img)
        div.appendChild(btn)
        // Function To Remove Alert 
        btn.addEventListener("click", function (e) {
            e.target.parentElement.remove()
            bg.remove();
        })
        window.addEventListener("click", function (e) {
            if (e.target.className === "alertSlide") {
                e.target.remove();
                div.remove();
            }
        })
    }
});

// #########################################################
// #########################################################

// // Settings Box 
var toggle = document.querySelector(".toggle-settings")
toggle.onclick = function () {
    document.querySelector(".settings-box").classList.toggle("open")
    toggle.children[0].classList.toggle("fa-spin")
}

// Switch Colors
let colors = document.querySelectorAll(".colors-list li")
var root = document.querySelector(':root');
var rootStyle = getComputedStyle(root);
let mainColor = rootStyle.getPropertyValue('--main-color')
root.style.setProperty('--main-color', `#FF9800`)

colors.forEach(e => {
    e.addEventListener("click", function (e) {
        colors.forEach(e => {
            e.classList.remove("active")
        });
        e.currentTarget.classList.add("active")
        root.style.setProperty('--main-color', e.currentTarget.dataset.color)
        window.localStorage.setItem("color_option", e.currentTarget.dataset.color);
    })
});

// Switch Random Background Option
let randomBackgrounds = document.querySelectorAll(".random-backgrounds span")
randomBackgrounds.forEach(e => {
    e.addEventListener("click", function (e) {
        randomBackgrounds.forEach(e => {
            e.classList.remove("active")
        });
        e.currentTarget.classList.add("active")
        if (e.target.classList.contains("yes") === true) {
            backgroundInterval = setInterval(backgroundRandomFunc, duration);
            window.localStorage.setItem("background_option", "true");
        }
        if (e.target.classList.contains("yes") === false) {
            clearInterval(backgroundInterval);
            window.localStorage.setItem("background_option", "false");
        }
    })
});

// Display or Hidden Bullets Button Options Settings
let bulletsOption = document.querySelectorAll(".bullets-option span")
bulletsOption.forEach(e => {
    e.addEventListener("click", function (e) {
        bulletsOption.forEach(e => {
            e.classList.remove("active")
        });
        e.currentTarget.classList.add("active")
        if (e.target.classList.contains("yes") === true) {
            document.querySelector(".nav-bullets").style.display = "block"
            window.localStorage.setItem("bullets_option", "block");
        }
        if (e.target.classList.contains("no") === true) {
            document.querySelector(".nav-bullets").style.display = "none"
            window.localStorage.setItem("bullets_option", "none");
        }
    })
});

// Get display bullets from Storage
if (localStorage.getItem('bullets_option') != null) {
    let bulletsStored = window.localStorage.getItem("bullets_option");
    document.querySelector(".nav-bullets").style.display = bulletsStored;
    bulletsOption.forEach(e => {
        e.classList.remove("active")
        if (bulletsStored === "block") {
            if (e.dataset.display === "show") {
                e.classList.add("active")
            }
        } else if (bulletsStored === "none") {
            if (e.dataset.display === "hide") {
                e.classList.add("active")
            }
        }
    });
}

// Get the current color from Storage
if (localStorage.getItem('color_option') != null) {
    let colorStored = window.localStorage.getItem("color_option");
    root.style.setProperty('--main-color', colorStored)
    colors.forEach(e => {
        e.classList.remove("active")
        if (e.dataset.color === colorStored) {
            e.classList.add("active")
        }
    });
}

// Get the background from Storage
if (localStorage.getItem('background_option') != null) {
    let bgStored = window.localStorage.getItem("background_option");
    randomBackgrounds.forEach(e => {
        e.classList.remove("active")
        if (bgStored == "true") {
            if (e.dataset.background === "yes") {
                e.classList.add("active")
                backgroundRandomFunc()
            }
        } else if (bgStored == "false") {
            if (e.dataset.background === "no") {
                e.classList.add("active")
                clearInterval(backgroundInterval);
            }
        }
    });
}

// Get the current background from Storage
if (localStorage.getItem('current_background') != null) {
    let currentBg = window.localStorage.getItem("current_background");
    landingBackGround.style.backgroundImage = currentBg;
}

// Reset Button to get dafault 
document.querySelector(".reset-options").onclick = function () {
    // Remove Settings from local Storage;
    localStorage.removeItem("background_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("bullets_option");

    // Reload Window
    window.location.reload();
};