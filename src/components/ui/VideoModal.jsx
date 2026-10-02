import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

export default function VideoModal({ isOpen, onClose, videoUrl, title }) {
  // تحويل رابط يوتيوب العادي إلى رابط Embed
  const getEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    
    if (videoId) {
      // أضفنا mute=1 لضمان التشغيل الفوري بدون تغبيش أو شاشة بداية
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1&mute=1`;
    }
    return url;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-night/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-coal shadow-2xl"
            onClick={(e) => e.stopPropagation()} // منع الإغلاق عند الضغط داخل الفيديو
          >
            {/* رأس النافذة */}
            <div className="flex items-center justify-between border-b border-white/5 p-4">
              <h3 className="font-display text-lg font-bold text-white truncate pr-4">{title}</h3>
              <button 
                onClick={onClose}
                className="rounded-full p-1 text-mist transition-colors hover:bg-white/10 hover:text-gold"
                aria-label="Close video"
              >
                <HiX className="h-6 w-6" />
              </button>
            </div>

            {/* حاوية الفيديو (نسبة 16:9) */}
            <div className="relative aspect-video w-full bg-black">
              {videoUrl ? (
                <iframe
                  src={getEmbedUrl(videoUrl)}
                  title={title}
                  className="absolute inset-0 h-full w-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="grid h-full place-items-center text-mist">
                  <p>Video demo coming soon...</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}