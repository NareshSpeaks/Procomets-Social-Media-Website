import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { articles } from '../data/learn';
import { ArrowRight } from 'lucide-react';

export const Learn: React.FC = () => {
  return (
    <section className="py-24 bg-stone-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-black leading-none">
            Learn
          </h2>
          <Link 
            to="/learn" 
            className="flex items-center gap-2 text-xs font-cta font-bold uppercase tracking-[0.14em] text-stone-500 hover:text-black transition-colors"
          >
            <span>View All Insights</span>
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col cursor-pointer"
            >
              <Link to={`/learn/${article.slug}`} className="flex flex-col h-full">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={article.thumbnail} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.22,1,0.36,1]"
                  />
                </div>
                
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">
                  <span>{article.category}</span>
                  <span className="w-1 h-1 bg-stone-300 rounded-full" />
                  <span>{article.date}</span>
                </div>
                
                <h3 className="text-2xl font-display uppercase tracking-tight text-black mb-3 group-hover:text-stone-600 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-stone-600 font-navigation text-sm leading-relaxed mb-6 flex-grow">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black mt-auto">
                  <span>Read Article</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
