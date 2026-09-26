import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-stone-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-black leading-none">
            Client Voices
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-8 rounded-3xl border border-stone-200 flex flex-col justify-between"
            >
              <p className="text-stone-700 font-navigation font-medium text-lg leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>
              <div>
                <h4 className="text-black font-bold uppercase tracking-wider text-xs mb-1">
                  {testimonial.author}
                </h4>
                <p className="text-stone-500 text-[10px] uppercase tracking-widest font-bold">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
