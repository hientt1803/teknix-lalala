import React from 'react';

export const PreviewMap = () => {
   return (
      <div className="w-full h-full">
         <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d412.9606186499424!2d105.78897083926898!3d10.036187677578459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a062a3e9cca7d5%3A0x603899f0e51b778d!2zMUMgxJAuIELDoCBUcmnhu4d1LCBUw6JuIEFuLCBOaW5oIEtp4buBdSwgQ-G6p24gVGjGoSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1733221626756!5m2!1svi!2s"
            width="100%"
            height="600"
            className="border border-neutral-300"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
         ></iframe>
      </div>
   );
};
