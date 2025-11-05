// Animação de Digitação
        const roles = ['Developer', 'Designer' ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingElement = document.querySelector('.typing');
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseTime = 2000;

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentRole.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }

            setTimeout(type, speed);
        }

        // Começar a animação de digitação
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(type, 500);

            // Animação de Progresso
            const circles = document.querySelectorAll('.progress');
            circles.forEach(circle => {
                const percentageText = circle.parentElement.nextElementSibling.querySelector('span');
                const percentage = parseInt(percentageText.textContent.replace('%', ''));
                const circumference = 2 * Math.PI * 50;
                const offset = circumference - (percentage / 100) * circumference;

                // Circulo cheio
                circle.style.strokeDashoffset = circumference;

                // Animação até o deslocamento máximo
                setTimeout(() => {
                    circle.style.strokeDashoffset = offset;
                }, 1000); // Delay no inicio do carregamento da página (vou me arrepender depois de deixar os comentários confusos e não entender depois
            });
        });

        // Ativar animação de scroll do menu
        const navLinks = document.querySelectorAll('.nav-menu a');
        const sections = document.querySelectorAll('section');

        function updateActiveLink() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink);

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Hamburger menu 
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('nav');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });



        // Formulário de contato
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Validação Simples
            if (!name || !email || !message) {
                alert('Harap isi semua field!');
                return;
            }

            alert(`Terima kasih ${name}! Pesan Anda telah dikirim.`);

            contactForm.reset();
        });

        // Carrossel de certificações (mudei para as linguagens de programação)
        const certCarouselWrapper = document.querySelector('.carousel-wrapper');
        const certPrevBtn = document.querySelector('.carousel-btn.prev');
        const certNextBtn = document.querySelector('.carousel-btn.next');

        let certCurrentIndex = 0;
        let certSlidesToShow = window.innerWidth > 768 ? 3 : 1;
        const certTotalSlides = document.querySelectorAll('.certificate-card').length;
        let certMaxIndex = certTotalSlides - certSlidesToShow;

        function updateCertCarousel() {
            const translateX = -certCurrentIndex * (100 / certSlidesToShow);
            certCarouselWrapper.style.transform = `translateX(${translateX}%)`;
        }

        certPrevBtn.addEventListener('click', () => {
            if (certCurrentIndex > 0) {
                certCurrentIndex--;
                updateCertCarousel();
            }
        });

        certNextBtn.addEventListener('click', () => {
            if (certCurrentIndex < certMaxIndex) {
                certCurrentIndex++;
                updateCertCarousel();
            }
        });

        window.addEventListener('resize', () => {
            const newSlidesToShow = window.innerWidth > 768 ? 3 : 1;
            if (newSlidesToShow !== certSlidesToShow) {
                certSlidesToShow = newSlidesToShow;
                certMaxIndex = certTotalSlides - certSlidesToShow;
                certCurrentIndex = Math.min(certCurrentIndex, certMaxIndex);
                updateCertCarousel();
            }
        });

        // Linguagens de Programação: sem barras de progresso
