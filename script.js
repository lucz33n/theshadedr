(function() {
    const t = document.querySelector('[data-theme-toggle]'),
        r = document.documentElement;
    let d = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    r.setAttribute('data-theme', d);

    function setIcon(mode) {
        if (!t) return;
        t.innerHTML = mode === 'dark' ?
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' :
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
        t.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    setIcon(d);
    t && t.addEventListener('click', () => {
        d = d === 'dark' ? 'light' : 'dark';
        r.setAttribute('data-theme', d);
        setIcon(d);
    });
    const menuBtn = document.getElementById('menu-toggle'),
        menu = document.getElementById('mobile-menu');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            const open = menu.classList.toggle('open');
            menuBtn.setAttribute('aria-expanded', String(open));
        });
    }
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => menu && menu.classList.remove('open')));
    const sections = [...document.querySelectorAll('main section[id]')],
        links = [...document.querySelectorAll('.nav-desktop a')];
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                links.forEach(l => l.classList.remove('active'));
                const found = document.querySelector('.nav-desktop a[href="#' + e.target.id + '"]');
                if (found) found.classList.add('active');
            }
        })
    }, {
        rootMargin: '-40% 0px -50% 0px'
    });
    sections.forEach(s => obs.observe(s));
    document.querySelectorAll('.faq-question').forEach(btn => btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item'),
            ans = item.querySelector('.faq-answer'),
            open = btn.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            i.querySelector('.faq-answer').style.maxHeight = '0';
            i.querySelector('.faq-answer').style.opacity = '0';
        });
        if (!open) {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
            ans.style.maxHeight = ans.scrollHeight + 'px';
            ans.style.opacity = '1';
        }
    }));
    const rev = new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('revealed');
            rev.unobserve(e.target);
        }
    }), {
        threshold: .12
    });
    document.querySelectorAll('.reveal').forEach(el => rev.observe(el));
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const b = form.querySelector('button');
            const old = b.textContent;
            b.textContent = 'Message Sent!';
            b.disabled = true;
            setTimeout(() => {
                b.textContent = old;
                b.disabled = false;
            }, 2200);
        });
    }
})();