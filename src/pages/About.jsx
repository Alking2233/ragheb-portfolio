import { motion } from 'framer-motion';
// استيراد الأيقونات المطلوبة للصفحة كاملة
import { FaTools, FaCode, FaCertificate, FaBriefcase, FaUniversity, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import TechBadge from '../components/projects/TechBadge'; 

export default function AboutMe() {
  // بيانات المهارات والخبرات يمكن نقلها لاحقاً إلى Strapi إذا أردت إدارة ديناميكية
    const skills = [
    { category: 'Frontend Development', items: ['React.js', 'JavaScript (ES6+)', 'HTML5/CSS3', 'Tailwind CSS', 'Bootstrap'] },
    { category: 'CMS & E-Commerce', items: ['WordPress', 'Elementor Pro', 'WooCommerce', 'Jannah Theme', 'ACF'] },
    { category: 'Backend & Tools', items: ['Node.js', 'Strapi CMS', 'Git/GitHub', 'REST APIs', 'SQL Basics'] },
    { category: 'Engineering & Design', items: ['AutoCAD', 'CorelDRAW', 'CNC Programming', 'Electrical Systems Knowledge'] }
  ];

  const certifications = [
    'CCNA (Cisco Certified Network Associate)',
    'Professional Web Developer Certificate',
    'Advanced WordPress Development'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container py-20 min-h-screen text-white"
    >
      
      {/* === Hero Section: Introduction === */}
      <section className="mb-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* --- العمود الأيسر: الصورة مع الحركة الدائرية --- */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 flex items-center justify-center">
          
          {/* 1. الحلقة الذهبية الدوارة (الخلفية) */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold/40 animate-[spin_10s_linear_infinite]"></div>
          
          {/* 2. التوهج الخفيف خلف الصورة */}
          <div className="absolute inset-4 rounded-full bg-linear-to-tr from-gold/20 to-transparent blur-xl"></div>

          {/* 3. صورة البروفايل نفسها */}
          <img 
            src="/public/profile.jpg" /* تأكد من وجود الملف هنا */
            alt="Ragheb Yossof - Multidisciplinary Developer" 
            className="relative z-10 w-[90%] h-[90%] object-cover rounded-full border-4 border-night shadow-2xl ring-1 ring-white/10"
          />
        </div>

        {/* --- العمود الأيمن: النص والعناوين --- */}
        <div className="flex-1 space-y-6 text-center lg:text-left max-w-2xl">
          
          {/* العنوان الرئيسي الكبير */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Hi, I'm <span className="text-gold block md:inline-block">Ragheb Yossof.</span>
          </h1>

          {/* الجملة الافتتاحية القوية (Sub-headline) */}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-300 leading-relaxed">
            Bridging the gap between <span className="text-white underline decoration-gold decoration-2 underline-offset-4">Precision Engineering</span> and <span className="text-white underline decoration-gold decoration-2 underline-offset-4">Creative Coding</span>.
          </h2>

          {/* الوصف التفصيلي */}
          <p className="text-lg text-mist leading-relaxed">
            With expertise spanning CNC design, electrical systems, and modern web development, I deliver digital products that combine aesthetic excellence with technical reliability. My background in IT Engineering ensures every line of code is structured, efficient, and scalable.
          </p>

          {/* أزرار الإجراءات */}
          <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-4">
             <a href="#skills" className="px-8 py-3.5 rounded-full bg-gold text-night font-bold hover:bg-yellow-400 hover:shadow-lg hover:shadow-gold/20 transition-all transform hover:-translate-y-1">
               View My Skills
             </a>
             <a href="/contact" className="px-8 py-3.5 rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm">
               Let's Talk
             </a>
          </div>

          {/* روابط التواصل الاجتماعي السريعة تحت الأزرار */}
          <div className="flex justify-center lg:justify-start gap-6 pt-2 text-gray-400">
            <a href="#" aria-label="GitHub" className="hover:text-gold transition-colors"><FaGithub size={24}/></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gold transition-colors"><FaLinkedin size={24}/></a>
            <a href="mailto:ragheb.yossof@gmail.com" aria-label="Email" className="hover:text-gold transition-colors"><FaEnvelope size={24}/></a>
          </div>

        </div>
      </section>

      {/* === The Journey: From Hardware to Code === */}
      <section className="mb-20 relative">
        <h2 className="font-display text-3xl font-bold mb-12 flex items-center gap-3">
          <FaBriefcase className="text-gold" /> My Professional Journey
        </h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Step 1: Academic Foundation */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-card border border-white/5 hover:border-gold/30 transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-900/30 flex items-center justify-center mb-4 text-blue-400">
              <FaUniversity size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">IT Engineering Graduate</h3>
            <p className="text-mist text-sm leading-relaxed">
              Studied at Tishreen University. Built a strong foundation in logic, algorithms, and system architecture, which now informs my approach to clean code structure.
            </p>
          </motion.div>

          {/* Step 2: Industrial Experience */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-card border border-white/5 hover:border-gold/30 transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-orange-900/30 flex items-center justify-center mb-4 text-orange-400">
              <FaTools size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">SEC Tartus Engineer</h3>
            <p className="text-mist text-sm leading-relaxed">
              Worked in electrical engineering and maintenance. This role honed my problem-solving skills under pressure and attention to detail—traits I bring to debugging and performance optimization today.
            </p>
          </motion.div>

          {/* Step 3: Digital Transformation */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-card border border-white/5 hover:border-gold/30 transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-green-900/30 flex items-center justify-center mb-4 text-green-400">
              <FaCode size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Web Developer</h3>
            <p className="text-mist text-sm leading-relaxed">
              Transitioned into full-stack development. Leveraging tools like React, Strapi, and WordPress to create scalable digital products for diverse clients, combining design aesthetics with technical robustness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* === Skills Matrix === */}
      <section id="skills" className="mb-20">
        <h2 className="font-display text-3xl font-bold mb-8 flex items-center gap-3">
          <FaCode className="text-gold" /> Technical Arsenal
        </h2>
        
        <div className="space-y-8">
          {skills.map((skillGroup, idx) => (
            <div key={idx} className="bg-card/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-gold mb-4">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((item) => (
                  <TechBadge key={item}>{item}</TechBadge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === Certifications === */}
      <section className="mb-12">
        <h2 className="font-display text-3xl font-bold mb-8 flex items-center gap-3">
          <FaCertificate className="text-gold" /> Credentials & Certifications
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {certifications.map((cert, index) => (
            <li key={index} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-gold text-xl">✓</span>
              <span className="text-sm font-medium text-gray-300">{cert}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* === Fun Fact / Personal Touch === */}
      <div className="mt-12 p-6 rounded-2xl bg-linear-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 text-center italic text-mist">
        "When I'm not coding, you'll find me exploring Islamic history or optimizing prayer time calculations using JavaScript logic."
      </div>

    </motion.div>
  );
}
  