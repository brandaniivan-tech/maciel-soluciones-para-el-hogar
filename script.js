/**
 * SCRIPT.JS - Maciel Soluciones para el Hogar
 * Funcionalidades interactivas avanzadas y optimización de conversión (CRO)
 * Enfoque UX/UI Premium - Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. CONFIGURACIÓN DE CONTACTO (WHATSAPP)
  // ==========================================
  const PHONE_NUMBER = '1127022543'; // Teléfono para la API de WhatsApp sin guiones
  const CLIENT_NAME = 'Maciel Soluciones para el Hogar';

  /**
   * Genera el enlace de WhatsApp con un mensaje personalizado y codificado
   */
  function getWhatsAppLink(message) {
    const encodedText = encodeURIComponent(message);
    return `https://wa.me/${PHONE_NUMBER}?text=${encodedText}`;
  }

  // ==========================================
  // 2. DETECCIÓN DE SCROLL PARA EL HEADER
  // ==========================================
  const header = document.querySelector('.header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Ejecutar al cargar para verificar estado inicial

  // ==========================================
  // 3. MENÚ DE NAVEGACIÓN MÓVIL
  // ==========================================
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      
      // Animación de las líneas del hamburger menu
      const spans = mobileToggle.querySelectorAll('span');
      if (mobileToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ==========================================
  // 4. OBSERVADOR DE REVELACIÓN (SCROLL ANIMATIONS)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Una vez revelado, dejamos de observarlo para optimizar rendimiento
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Se activa un poco antes de que entre al viewport
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback para navegadores antiguos
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ==========================================
  // 5. BOTÓN DE WHATSAPP FLOTANTE (REVELACIÓN CON RETRASO)
  // ==========================================
  const whatsappFloat = document.getElementById('whatsapp-float');

  if (whatsappFloat) {
    const toggleFloat = () => {
      if (window.scrollY > 400) {
        whatsappFloat.classList.add('visible');
      } else {
        whatsappFloat.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleFloat);
    toggleFloat(); // Verificar estado inicial
  }

  // ==========================================
  // 6. ASIGNACIÓN DINÁMICA DE MENSAJES WHATSAPP (CRO)
  // ==========================================

  // Mensaje base para consultas generales
  const generalMsg = `Hola ${CLIENT_NAME}, visité su página web y me gustaría consultar por un presupuesto para un trabajo en mi hogar.`;
  
  // Establecer enlaces generales por defecto
  const generalWhatsappBtns = document.querySelectorAll('.wa-general-trigger');
  generalWhatsappBtns.forEach(btn => {
    btn.setAttribute('href', getWhatsAppLink(generalMsg));
    btn.setAttribute('target', '_blank');
  });

  // Mensajes específicos para las PROFESIONES
  const professionWhatsappLinks = document.querySelectorAll('.wa-profession-trigger');
  professionWhatsappLinks.forEach(card => {
    const profession = card.getAttribute('data-profession');
    const msg = `Hola ${CLIENT_NAME}, necesito un servicio de *${profession}* en mi hogar. ¿Podrías brindarme información y un presupuesto estimado? Muchas gracias.`;
    
    // Si la profesión es un botón directo dentro de la tarjeta
    const btn = card.querySelector('a') || card;
    if (btn) {
      btn.setAttribute('href', getWhatsAppLink(msg));
      btn.setAttribute('target', '_blank');
    }
  });

  // Mensajes específicos para los SERVICIOS
  const serviceWhatsappLinks = document.querySelectorAll('.wa-service-trigger');
  serviceWhatsappLinks.forEach(card => {
    const serviceName = card.getAttribute('data-service');
    const msg = `Hola ${CLIENT_NAME}, estoy buscando presupuesto para el servicio de *${serviceName}*. ¿Tenés disponibilidad en CABA? Gracias.`;
    
    card.addEventListener('click', (e) => {
      // Hacer que toda la tarjeta sea clickable hacia WhatsApp, 
      // a menos que se agreguen más interacciones luego
      window.open(getWhatsAppLink(msg), '_blank');
    });
    
    // Asegurar que sea accesible vía teclado
    card.style.cursor = 'pointer';
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.open(getWhatsAppLink(msg), '_blank');
      }
    });
  });

  // Mensajes específicos para las ZONAS de trabajo
  const zoneTags = document.querySelectorAll('.zone-tag');
  zoneTags.forEach(tag => {
    const zoneName = tag.getAttribute('data-zone');
    const msg = `Hola ${CLIENT_NAME}, me encuentro en la zona de *${zoneName}* y necesito realizar un trabajo en mi domicilio. ¿Tenés disponibilidad para venir por esta zona?`;
    
    tag.addEventListener('click', () => {
      window.open(getWhatsAppLink(msg), '_blank');
    });
    
    tag.style.cursor = 'pointer';
    tag.setAttribute('tabindex', '0');
    tag.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.open(getWhatsAppLink(msg), '_blank');
      }
    });
  });

});
