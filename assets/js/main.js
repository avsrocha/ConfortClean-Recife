/**
 * ConfortClean - Landing Page JavaScript
 * Funcionalidades: Menu Mobile, Scroll Suave, Formulário, Animações
 */

(function () {
    'use strict';

    // ==================== VARIÁVEIS GLOBAIS ====================
    const header = document.querySelector('.top-app-bar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const fab = document.querySelector('.fab');
    const testimonialsTrack = document.getElementById('testimonialsTrack');

    // ==================== MENU MOBILE ====================

    /**
     * Toggle do menu mobile
     */
    function toggleMobileMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('nav-menu--open');
        document.body.classList.toggle('menu-open');

        // Muda o ícone
        const icon = menuToggle.querySelector('.material-symbols-outlined');
        icon.textContent = isExpanded ? 'menu' : 'close';
    }

    /**
     * Fecha o menu mobile ao clicar em um link
     */
    function closeMobileMenu() {
        if (window.innerWidth < 905 && navMenu.classList.contains('nav-menu--open')) {
            toggleMobileMenu();
        }
    }

    /**
     * Event listeners para o menu mobile
     */
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // ==================== SCROLL BEHAVIOR ====================

    let lastScrollTop = 0;
    const scrollThreshold = 100;

    /**
     * Oculta/mostra header ao fazer scroll (hide on scroll down)
     */
    function handleHeaderScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > scrollThreshold) {
            header.classList.add('scrolled');

            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    /**
     * Mostra/oculta FAB baseado no scroll
     */
    function handleFabVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 300) {
            fab.style.opacity = '1';
            fab.style.visibility = 'visible';
        } else {
            fab.style.opacity = '0';
            fab.style.visibility = 'hidden';
        }
    }

    /**
     * Throttle function para otimizar performance
     */
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;

        return function () {
            const context = this;
            const args = arguments;
            const currentTime = Date.now();

            if (currentTime - lastExecTime < delay) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    lastExecTime = currentTime;
                    func.apply(context, args);
                }, delay);
            } else {
                lastExecTime = currentTime;
                func.apply(context, args);
            }
        };
    }

    // Event listener para scroll com throttle
    window.addEventListener('scroll', throttle(function () {
        handleHeaderScroll();
        handleFabVisibility();
    }, 100));

    // ==================== SMOOTH SCROLL ====================

    /**
     * Scroll suave para âncoras internas
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Ignora links vazios ou só com #
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(href);

            if (targetElement) {
                e.preventDefault();

                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Atualiza URL sem recarregar a página
                history.pushState(null, null, href);
            }
        });
    });

    // ==================== FORMULÁRIO DE CONTATO ====================

    /**
     * Validação e submissão do formulário
     */
    if (contactForm) {
        // Máscara de telefone brasileiro
        const phoneInput = document.getElementById('phone');

        if (phoneInput) {
            phoneInput.addEventListener('input', function (e) {
                let value = e.target.value.replace(/\D/g, '');

                if (value.length > 0) {
                    if (value.length <= 2) {
                        value = `(${value}`;
                    } else if (value.length <= 7) {
                        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                    } else if (value.length <= 11) {
                        value = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7, 11)}`;
                    } else {
                        value = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7, 11)}`;
                    }
                }

                e.target.value = value;
            });
        }

        // Validação em tempo real
        const formInputs = contactForm.querySelectorAll('.form-input, .form-textarea');

        formInputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });

        // Submissão do formulário
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Valida todos os campos
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                showFormStatus('Por favor, preencha todos os campos corretamente.', 'error');
                return;
            }

            // Desabilita o botão de submit
            const submitButton = contactForm.querySelector('.btn-submit');
            const originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="material-symbols-outlined">hourglass_empty</span> Enviando...';

            // Coleta os dados do formulário
            const name = contactForm.name.value;
            const email = contactForm.email.value;
            const phone = contactForm.phone.value;
            const service = contactForm.service.value;
            const message = contactForm.message.value || 'Nenhuma mensagem adicional';

            // Formata a mensagem para WhatsApp
            const whatsappMessage = `*Nova mensagem do formulário - ConfortClean*

*DADOS DO FORMULÁRIO:*

👤 *Nome:* ${name}
📧 *E-mail:* ${email}
📱 *Telefone:* ${phone}
🛋️ *Serviço Desejado:* ${service}
💬 *Mensagem:* ${message}

---
*Recebido via formulário do website*`.trim();

            // Codifica a mensagem para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);

            // Redireciona para WhatsApp com autoabertura
            const whatsappUrl = `https://wa.me/5581973019151?text=${encodedMessage}`;

            // Abre WhatsApp
            window.open(whatsappUrl, '_blank');

            // Mostra mensagem de sucesso
            showFormStatus('Redirecionando para WhatsApp! Entraremos em contato em breve.', 'success');

            // Limpa o formulário
            contactForm.reset();

            // Reabilita o botão após 2 segundos
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }, 2000);
        });
    }

    /**
     * Valida um campo individual
     */
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        // Remove classe de erro anterior
        field.classList.remove('error');

        // Campo obrigatório
        if (field.hasAttribute('required') && value === '') {
            isValid = false;
        }

        // Validação de email
        if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
            }
        }

        // Validação de telefone
        if (field.type === 'tel' && value !== '') {
            const phoneRegex = /\(\d{2}\)\s\d{1}\s\d{4}-\d{4}/;
            if (!phoneRegex.test(value)) {
                isValid = false;
            }
        }

        if (!isValid) {
            field.classList.add('error');
        }

        return isValid;
    }

    /**
     * Exibe mensagem de status do formulário
     */
    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;

        // Auto-oculta mensagem de sucesso após 5 segundos
        if (type === 'success') {
            setTimeout(() => {
                formStatus.className = 'form-status';
            }, 5000);
        }
    }

    // ==================== ANIMAÇÕES DE SCROLL (INTERSECTION OBSERVER) ====================

    /**
     * Anima elementos ao entrarem na viewport
     */
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Elementos para animar
        const animatedElements = document.querySelectorAll(
            '.service-card, .instagram-card, .reviews-card, .contact-info, .contact-form-wrapper'
        );

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }

    // CSS para elementos animados
    const style = document.createElement('style');
    style.textContent = `
        .animated {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        /* Estilos para menu mobile */
        @media (max-width: 904px) {
            .nav-menu {
                position: fixed;
                top: 80px;
                left: 0;
                right: 0;
                background-color: var(--color-white);
                box-shadow: var(--elevation-3);
                padding: var(--spacing-lg);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease-out;
            }

            .nav-menu--open {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }

            .nav-list {
                flex-direction: column;
                gap: 0;
            }

            .nav-link {
                display: block;
                padding: var(--spacing-md);
                border-radius: var(--radius-sm);
            }

            .menu-open {
                overflow: hidden;
            }
        }

        /* FAB visibility */
        .fab {
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease-out, visibility 0.3s ease-out, transform 0.2s ease-out;
        }

        /* Erro de validação de formulário */
        .form-input.error,
        .form-textarea.error {
            border-color: #dc2626 !important;
            background-color: #fef2f2;
        }
    `;
    document.head.appendChild(style);

    // ==================== INSTAGRAM FEED (OPCIONAL) ====================

    /**
     * Carrega feed do Instagram via widget
     * Nota: Requer configuração do widget (LightWidget, SnapWidget, etc.)
     */
    function loadInstagramFeed() {
        const instagramContainer = document.getElementById('instagram-feed');

        if (!instagramContainer) return;

        // Exemplo de implementação com LightWidget:
        // Substitua SEU_WIDGET_ID pelo ID real do widget
        /*
        const script = document.createElement('script');
        script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
        script.async = true;
        document.body.appendChild(script);

        const iframe = document.createElement('iframe');
        iframe.src = '//lightwidget.com/widgets/SEU_WIDGET_ID.html';
        iframe.scrolling = 'no';
        iframe.className = 'lightwidget-widget';
        iframe.style.width = '100%';
        iframe.style.border = '0';
        iframe.style.overflow = 'hidden';

        instagramContainer.innerHTML = '';
        instagramContainer.appendChild(iframe);
        */

        // Por enquanto, mantém a galeria estática como fallback
        console.log('Instagram feed: usando galeria estática como fallback');
    }

    // ==================== LAZY LOADING DE IMAGENS ====================

    /**
     * Implementa lazy loading para navegadores que não suportam nativamente
     */
    function initLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // Navegador suporta lazy loading nativo
            return;
        }

        // Fallback para navegadores antigos
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
    // ==================== CARROSSEL DE DEPOIMENTOS ====================

    /**
     * Duplica os testimonials para criar loop infinito perfeito
     */
    function initTestimonialsCarousel() {
        if (!testimonialsTrack) return;

        const cards = Array.from(testimonialsTrack.children);

        // Duplica todos os cards para criar loop infinito
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            testimonialsTrack.appendChild(clone);
        });

        // Ajusta duração da animação baseado no número de cards
        const totalCards = cards.length;
        const duration = totalCards * 5; // 5 segundos por card
        testimonialsTrack.style.animationDuration = `${duration}s`;
    }

    // ==================== INICIALIZAÇÃO ====================

    /**
     * Inicializa todas as funcionalidades quando o DOM estiver pronto
     */
    function init() {
        console.log('ConfortClean Landing Page - Inicializado');

        // Inicializa animações de scroll
        if ('IntersectionObserver' in window) {
            initScrollAnimations();
            initLazyLoading();
            // Inicializa carrossel de depoimentos
            initTestimonialsCarousel();

        }

        // Carrega Instagram feed
        loadInstagramFeed();

        // Define estado inicial do FAB
        if (fab) {
            fab.style.opacity = '0';
            fab.style.visibility = 'hidden';
        }

        // Marca links ativos baseado na seção visível
        const sections = document.querySelectorAll('section[id]');

        window.addEventListener('scroll', throttle(() => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.pageYOffset >= sectionTop - header.offsetHeight - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, 100));
    }

    // Executa init quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ==================== SERVICE WORKER (OPCIONAL - PWA) ====================

    /**
     * Registra Service Worker para funcionalidade offline (PWA)
     */
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Descomente para ativar PWA:
            /*
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registrado:', registration);
                })
                .catch(error => {
                    console.log('Erro ao registrar Service Worker:', error);
                });
            */
        });
    }

})();
