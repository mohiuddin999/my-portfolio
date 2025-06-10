const typed = new Typed(".text", {
    strings: ["Frontend Developer", "Youtuber", "Web Developer", "Full Stack Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Animate Professional Skills circular progress bars
function animateCircleProgress() {
    document.querySelectorAll('.circle-progress').forEach(progress => {
        const circle = progress.querySelector('.circle-bar');
        const text = progress.querySelector('.circle-text');
        const percent = parseInt(progress.getAttribute('data-percent'));
        const radius = circle.getAttribute('r');
        const circumference = 2 * Math.PI * radius;
        let duration = 1200;
        let start = null;

        function animate(ts) {
            if (!start) start = ts;
            let progressVal = Math.min((ts - start) / duration, 1);
            let value = Math.floor(progressVal * percent);
            text.textContent = value + '%';
            circle.style.strokeDashoffset = circumference - (circumference * value / 100);
            if (progressVal < 1) {
                requestAnimationFrame(animate);
            } else {
                text.textContent = percent + '%';
                circle.style.strokeDashoffset = circumference - (circumference * percent / 100);
            }
        }
        // Start from 0%
        text.textContent = '0%';
        circle.style.strokeDashoffset = circumference;
        requestAnimationFrame(animate);
    });
}

// Use IntersectionObserver to trigger animation when Professional Skills section is in view
function observeProfessionalSkills() {
    const section = document.querySelector('.w-full.md\\:w-1\\/2.md\\:pl-8'); // আপনার div-এর ক্লাস অনুযায়ী সিলেক্টর দিন
    if (!section) return;
    let animated = false;
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !animated) {
            animateCircleProgress();
            animated = true;
            observer.disconnect();
        }
    }, { threshold: 0.3 });
    observer.observe(section);
}

document.addEventListener('DOMContentLoaded', observeProfessionalSkills);

document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.inline-flex button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Mapping: button text -> data-category
    const categoryMap = {
        'all': 'all',
        'web design': 'web',
        'mobile apps': 'mobile',
        'ui/ux': 'uiux'
    };

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('bg-primary', 'text-black'));
            // Add active class to clicked button
            btn.classList.add('bg-primary', 'text-black');

            const filter = btn.textContent.trim().toLowerCase();
            const category = categoryMap[filter];

            portfolioItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const scrollTopBtn = document.querySelector('.scroll-top');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const menuToggleBtn = document.getElementById('menu-toggle');
    const menuIcon = menuToggleBtn.querySelector('i');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-mobile-menu');
    const menuLinks = mobileMenu.querySelectorAll('a');

    function openMenu() {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        menuIcon.classList.remove('ri-menu-line');
        menuIcon.classList.add('ri-close-line');
    }
    function closeMenu() {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        menuIcon.classList.add('ri-menu-line');
        menuIcon.classList.remove('ri-close-line');
    }

    if (menuToggleBtn && mobileMenu && closeBtn) {
        menuToggleBtn.addEventListener('click', function () {
            if (mobileMenu.classList.contains('translate-x-full')) {
                openMenu();
            } else {
                closeMenu();
            }
        });

        closeBtn.addEventListener('click', closeMenu);

        // Hide menu when a link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Optional: Hide menu when clicking outside
        mobileMenu.addEventListener('click', function (e) {
            if (e.target === mobileMenu) {
                closeMenu();
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form form');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const [name, email, subject, message] = Array.from(form.querySelectorAll('input, textarea')).map(f => f.value);

            try {
                const res = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, subject, message })
                });
                const data = await res.json();
                alert(data.message); // এই alert মেসেজটি ব্যাকএন্ড থেকে আসবে
                if (data.success) {
                    form.reset(); // সফল হলে ফর্ম রিসেট করবে
                }
            } catch (error) {
                console.error('Frontend error:', error);
                alert('মেসেজ পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'); // কোনো error হলে এই মেসেজ দেখাবে
            }
        });
    }
});

