import { useState } from 'react';
import emailjs from '@emailjs/browser'; // استيراد المكتبة
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // تغيير حالة الإدخال
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'error') setStatus('idle'); // إعادة تعيين الخطأ عند الكتابة
  };

  // إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // تحقق بسيط قبل الإرسال
    if (!formData.user_name || !formData.user_email || !formData.message) {
      setErrorMsg('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      // ⚠️ استبدل القيم التالية بقيمك الحقيقية من لوحة تحكم EmailJS
      const SERVICE_ID = 'service_lwnlq2r'; 
      const TEMPLATE_ID = 'template_t38ppju';
      const PUBLIC_KEY = 'j5CFjPCHyfRisLiKD';

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
      
      setStatus('success');
      setFormData({ user_name: '', user_email: '', subject: '', message: '' }); // تفريغ الحقول
      
      // إخفاء رسالة النجاح بعد 5 ثواني
      setTimeout(() => setStatus('idle'), 5000);

    } catch (err) {
      console.error("Failed to send email:", err);
      setStatus('error');
      setErrorMsg(err.text || 'Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode='wait'>
        {status === 'success' ? (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center p-8 rounded-3xl bg-green-900/20 border border-green-500/30 text-center"
          >
            <FaCheckCircle className="text-6xl text-green-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
            <p className="text-mist">Thank you for reaching out. I'll get back to you shortly.</p>
          </motion.div>
        ) : (
          <motion.form
            key="contact-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* اسم المستخدم */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-white placeholder:text-gray-500"
                  disabled={status === 'loading'}
                />
              </div>

              {/* البريد الإلكتروني */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-white placeholder:text-gray-500"
                  disabled={status === 'loading'}
                />
              </div>
            </div>

            {/* الموضوع */}
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project Inquiry / Collaboration"
                className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-white placeholder:text-gray-500"
                disabled={status === 'loading'}
              />
            </div>

            {/* الرسالة */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-white placeholder:text-gray-500 resize-none"
                disabled={status === 'loading'}
              ></textarea>
            </div>

            {/* رسالة الخطأ إن وجدت */}
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-500/30"
              >
                <FaExclamationTriangle />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {/* زر الإرسال */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full py-4 rounded-xl font-bold text-night flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-gold/20 ${
                status === 'loading' 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-gold hover:bg-yellow-400 transform hover:-translate-y-1'
              }`}
            >
              {status === 'loading' ? (
                <>
                  <FaSpinner className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message <FaPaperPlane className="rotate-15deg" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}