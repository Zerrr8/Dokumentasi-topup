/* script.js */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

function setActive(el) {
    // Hanya untuk efek visual klik, navigasi sudah dihandle oleh router/link
    el.classList.add('active');
    if (window.innerWidth <= 768) toggleSidebar();
}

function toggleFaq(item) {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

function copyCode(btn) {
    const codeBlock = btn.closest('.code-block');
    const code = codeBlock.querySelector('pre').textContent;
    navigator.clipboard.writeText(code).then(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.style.color = 'var(--success)';
        btn.style.borderColor = 'var(--success)';
        setTimeout(() => {
            btn.innerHTML = '<i class="far fa-copy"></i> Copy';
            btn.style.color = ''; btn.style.borderColor = '';
        }, 2000);
    });
}

function filterNav() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const sections = document.querySelectorAll('.nav-section');
    sections.forEach(section => {
        let hasVisible = false;
        section.querySelectorAll('.nav-link').forEach(link => {
            const match = link.textContent.toLowerCase().includes(query);
            link.style.display = match ? 'flex' : 'none';
            if (match) hasVisible = true;
        });
        section.style.display = hasVisible ? 'block' : 'none';
        const title = section.querySelector('.nav-section-title');
        if(title) title.style.display = hasVisible ? 'block' : 'none';
    });
}

// Inisialisasi saat load
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
            link.classList.add('active');
            const text = link.textContent.trim().split('\n')[0].trim();
            const bc = document.getElementById('breadcrumbCurrent');
            if (bc) bc.textContent = text;
        }
    });

    // Observer Animasi
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.stat-card, .card, .game-card, .step').forEach(el => {
        el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; el.style.transition = 'all 0.5s ease';
        observer.observe(el);
    });
});