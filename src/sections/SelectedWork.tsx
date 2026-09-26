import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ArrowRight } from 'lucide-react';

export const SelectedWork: React.FC = () => {
  return (
    <section className="py-24 bg-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-black leading-none">
            Selected Work
          </h2>
          <Link 
            to="/work" 
            className="flex items-center gap-2 text-xs font-cta font-bold uppercase tracking-[0.14em] text-stone-500 hover:text-black transition-colors"
          >
            <span>View All Cases</span>
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="flex flex-col gap-16 md:gap-32">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col md:flex-row gap-8 md:gap-16 items-center"
            >
              {/* Media Container */}
              <Link 
                to={`/work/${project.slug}`} 
                className={`w-full md:w-[60%] overflow-hidden rounded-3xl aspect-[4/3] md:aspect-video relative ${index % 2 !== 0 ? 'md:order-last' : ''}`}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.22,1,0.36,1]"
                />
              </Link>

              {/* Text Container */}
              <div className="w-full md:w-[40%] flex flex-col">
                <div className="flex items-center gap-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
                  <span>{project.client}</span>
                  <span className="w-1 h-1 bg-stone-300 rounded-full" />
                  <span>{project.category}</span>
                </div>
                
                <Link to={`/work/${project.slug}`}>
                  <h3 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-black mb-6 group-hover:opacity-70 transition-opacity">
                    {project.title}
                  </h3>
                </Link>
                
                <p className="text-stone-600 font-navigation text-sm md:text-base leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 border border-stone-200 rounded-full text-[10px] font-bold uppercase tracking-wider text-stone-600 bg-stone-50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
