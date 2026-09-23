$(document).ready(function () {

    const $menu = $('#menu');
    const $navbar = $('.navbar');
    const $backdrop = $('#navBackdrop');
    const header = document.querySelector('header');

    function closeMenu() {
        $menu.removeClass('fa-times');
        $navbar.removeClass('nav-toggle');
        $backdrop.removeClass('show');
    }

    function toggleMenu() {
        $menu.toggleClass('fa-times');
        $navbar.toggleClass('nav-toggle');
        $backdrop.toggleClass('show', $navbar.hasClass('nav-toggle'));
    }

    $menu.click(toggleMenu);
    $menu.on('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
    $backdrop.click(closeMenu);
    $('.navbar a').on('click', closeMenu);

    $(window).on('scroll load', function () {
        const top = $(window).scrollTop();

        if (top > 60) {
            document.querySelector('#scroll-top').classList.add('active');
            header.classList.add('scrolled');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
            header.classList.remove('scrolled');
        }

        // scroll progress bar
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (top / docHeight) * 100 : 0;
        document.getElementById('scrollProgress').style.width = progress + '%';

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling (offset for fixed header)
    $('a[href*="#"]').on('click', function (e) {
        const target = $(this).attr('href');
        if (target.length > 1 && $(target).length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(target).offset().top - 70,
            }, 500, 'swing');
        }
    });

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Munna Hasan";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Fullstack development", "Backend development", "WordPress Development", "DevOps & Automation", "AI & API Integration", "Digital Marketing"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img loading="lazy" src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <div class="thumb">
        <img draggable="false" loading="lazy" src="assets/images/projects/${project.image}.jpg" alt="${project.name}" />
      </div>
      <div class="content">
        <h3>${project.name}</h3>
        <p>${project.desc}</p>
        <div class="btns">
          <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> Live</a>
          <a href="${project.links.code}" class="btn btn-alt" target="_blank"><i class="fas fa-code"></i> Code</a>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 900,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        reset: false
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 150 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 8,
    speed: 400,
    glare: true,
    "max-glare": 0.15,
});
// <!-- tilt js effect ends -->


// pre loader start
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}
function fadeOut() {
    setInterval(loader, 500);
}
window.onload = fadeOut;
// pre loader end


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 900,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    reset: false
});

/* SECTION HEADINGS */
srtop.reveal('.heading', { distance: '40px', interval: 100 });

/* SCROLL HOME */
srtop.reveal('.home .hero-badge', { delay: 150 });
srtop.reveal('.home .content h2', { delay: 250 });
srtop.reveal('.home .content p', { delay: 350 });
srtop.reveal('.home .content .btn', { delay: 450 });
srtop.reveal('.home .image', { delay: 500 });
srtop.reveal('.home .socials li', { interval: 120, delay: 550 });

/* SCROLL ABOUT */
srtop.reveal('.about .row .image', { delay: 200 });
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 300 });
srtop.reveal('.about .content p', { delay: 350 });
srtop.reveal('.about .content .box', { interval: 120 });
srtop.reveal('.about .content .resumebtn', { delay: 300 });

/* SCROLL REVIEWS */
srtop.reveal('.reviews .video', { interval: 120 });

/* SCROLL SKILLS */
srtop.reveal('.skills .container', { delay: 200 });
srtop.reveal('.skills .container .bar', { interval: 60 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 180 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline .container', { interval: 200 });
srtop.reveal('.experience .morebtn', { delay: 300 });

/* SCROLL FOOTER */
srtop.reveal('.footer .box', { interval: 150 });

/* ===== GALLERY ===== */
const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif|svg)$/i;

async function fetchGalleryImages() {
    const images = new Set();
    const dir = "assets/images/gallery/";

    // reads the server's directory listing — just drop a file
    // into assets/images/gallery/ and it shows up
    try {
        const res = await fetch(dir);
        if (res.ok && (res.headers.get("content-type") || "").includes("text/html")) {
            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, "text/html");
            doc.querySelectorAll("a[href]").forEach(a => {
                const href = a.getAttribute("href");
                if (href && IMAGE_EXT.test(href) && !href.startsWith("?") && !href.startsWith("/")) {
                    const name = decodeURIComponent(href.split("/").pop());
                    images.add(dir + name);
                }
            });
        }
    } catch (e) { /* directory listing disabled */ }

    return [...images];
}

let galleryImages = [];
let lightboxIndex = 0;

function showGallery(images) {
    const container = document.getElementById("galleryContainer");
    if (!container) return;
    container.innerHTML = images.map((src, i) => `
        <div class="g-item" data-index="${i}">
            <img loading="lazy" src="${src}" alt="gallery image ${i + 1}" />
        </div>`).join("");

    container.querySelectorAll(".g-item").forEach(item => {
        item.addEventListener("click", () => openLightbox(+item.dataset.index));
    });

    if (window.ScrollReveal) {
        srtop.reveal('.gallery .g-item', { interval: 100 });
    }
}

function openLightbox(index) {
    lightboxIndex = index;
    const lb = document.getElementById('lightbox');
    document.getElementById('lightboxImg').src = galleryImages[lightboxIndex];
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
}
function closeLightbox() {
    const lb = document.getElementById('lightbox');
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
}
function stepLightbox(dir) {
    lightboxIndex = (lightboxIndex + dir + galleryImages.length) % galleryImages.length;
    document.getElementById('lightboxImg').src = galleryImages[lightboxIndex];
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(-1); });
document.getElementById('lightboxNext').addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(1); });
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
});

fetchGalleryImages().then(images => {
    galleryImages = images;
    showGallery(images);
});

/* ===== Custom cursor (fine pointers only) ===== */
(function () {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    document.body.classList.add('cursor-active');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    (function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    })();

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .btn, input, textarea, #menu, .tilt')) {
            ring.classList.add('grow');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, .btn, input, textarea, #menu, .tilt')) {
            ring.classList.remove('grow');
        }
    });
})();
