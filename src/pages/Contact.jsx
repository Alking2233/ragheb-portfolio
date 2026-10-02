import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import ContactForm from '../components/contact/ContactForm';

export default function ContactPage() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container py-20 min-h-screen text-white"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* رأس الصفحة */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold">Let's Build Something <span className="text-gold">Amazing</span></h1>
          <p className="text-lg text-mist max-w-2xl mx-auto">
            Have a project in mind? Want to collaborate? Or just want to say hi? Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* معلومات التواصل الجانبية */}
          <div className="lg:col-span-1 space-y-8">
            <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-gold/10 text-gold shrink-0">
                  <FaEnvelope size={20}/>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Email</h3>
                  <a href="mailto:ragheb.yossof@gmail.com" className="text-mist hover:text-gold transition-colors break-all">
                    ragheb.yossof@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-gold/10 text-gold shrink-0">
                  <FaMapMarkerAlt size={20}/>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Location</h3>
                  <p className="text-mist">Syria (Remote Friendly)</p>
                </div>
              </div>
              
               <div className="pt-4 border-t border-white/10">
                 <h3 className="font-semibold text-white mb-2">Response Time</h3>
                 <p className="text-sm text-mist">Usually within 24-48 hours on business days.</p>
               </div>
            </div>
            
            {/* بطاقة إضافية لتحفيز الثقة */}
             <div className="p-6 rounded-2xl bg-linear-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20">
               <p className="italic text-sm text-gray-300 leading-relaxed">
                 "I prioritize clear communication and reliable delivery. Whether it's a quick fix or a full-scale application, treat your project with the same precision I apply to engineering systems."
               </p>
             </div>
          </div>

          {/* النموذج الرئيسي */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

        </div>
      </div>
    </motion.section>
  );
}