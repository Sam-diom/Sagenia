import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  const header = document.getElementById('header');
  const contactForm = document.getElementById('contactForm');
  const propertiesContainer = document.getElementById('propertiesContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-scroll').forEach(el => {
    observer.observe(el);
  });

  prevBtn.addEventListener('click', () => {
    propertiesContainer.scrollBy({
      left: -360,
      behavior: 'smooth'
    });
  });

  nextBtn.addEventListener('click', () => {
    propertiesContainer.scrollBy({
      left: 360,
      behavior: 'smooth'
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
    });

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    if (name.value.trim().length < 2) {
      document.getElementById('nameError').textContent = 'Le nom doit contenir au moins 2 caractères';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      document.getElementById('emailError').textContent = 'Veuillez entrer une adresse email valide';
      isValid = false;
    }

    const phoneRegex = /^[0-9+\s()-]{10,}$/;
    if (!phoneRegex.test(phone.value.trim())) {
      document.getElementById('phoneError').textContent = 'Veuillez entrer un numéro de téléphone valide';
      isValid = false;
    }

    if (subject.value === '') {
      document.getElementById('subjectError').textContent = 'Veuillez sélectionner un sujet';
      isValid = false;
    }

    if (message.value.trim().length < 10) {
      document.getElementById('messageError').textContent = 'Le message doit contenir au moins 10 caractères';
      isValid = false;
    }

    if (isValid) {
      const formData = {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        subject: subject.value,
        message: message.value.trim(),
        date: new Date().toISOString()
      };

      console.log('Formulaire soumis:', formData);

      const successMessage = document.getElementById('successMessage');
      successMessage.classList.add('show');

      contactForm.reset();

      setTimeout(() => {
        successMessage.classList.remove('show');
      }, 5000);
    }
  });

  const navLinks = document.querySelectorAll('.nav a, .footer-section a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
