import React from 'react';
import './Preguntas.css';

const Preguntas = () => {
  const faqs = [
    {
      question: "¿Cuál es el tiempo de entrega?",
      answer: "El tiempo de entrega estándar es de 3 a 5 días hábiles. Para zonas remotas, puede tomar hasta 7 días hábiles."
    },
    {
      question: "¿Cómo puedo realizar un cambio o devolución?",
      answer: "Puedes solicitar un cambio o devolución dentro de los 30 días posteriores a la compra. El producto debe estar sin usar y en su empaque original."
    },
    {
      question: "¿Ofrecen envío gratuito?",
      answer: "Sí, ofrecemos envío gratuito en compras superiores a $50.000."
    },
    {
      question: "¿Cuáles son las formas de pago aceptadas?",
      answer: "Aceptamos tarjetas de crédito, débito, transferencias bancarias y PayPal."
    },
    {
      question: "¿Tienen tiendas físicas?",
      answer: "Sí, contamos con tiendas físicas en las principales ciudades. Puedes encontrar la ubicación más cercana en nuestra sección de 'Tiendas'."
    }
  ];

  const toggleAccordion = (index) => {
    const items = document.querySelectorAll('.accordion-item');
    items.forEach((item, i) => {
      if (i === index) {
        item.classList.toggle('active');
      } else {
        item.classList.remove('active');
      }
    });
  };

  return (
    <div className="preguntas-container">
      <SiteHeader />
      <main className="preguntas-main">
        <div className="preguntas-content">
          <CategoriesSidebar />
          <div className="preguntas-list">
            <h1 className="preguntas-title">Preguntas Frecuentes</h1>
            <div className="accordion">
              {faqs.map((faq, index) => (
                <div className="accordion-item" key={index} onClick={() => toggleAccordion(index)}>
                  <div className="accordion-trigger">{faq.question}</div>
                  <div className="accordion-content">{faq.answer}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Preguntas;