import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Cat, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export default function App() {
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);

  const handleStart = () => {
    setShowQuestion(true);
  };

  const handleYes = () => {
    setAnswer('yes');
  };

  const handleNoHover = () => {
    // Make "No" button run away
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoClickCount(prev => prev + 1);
  };

  // Floating hearts background
  const FloatingHeart = ({ delay }: { delay: number }) => (
    <motion.div
      className="absolute text-pink-300 opacity-30"
      style={{
        left: `${Math.random() * 100}%`,
        top: '100%',
      }}
      animate={{
        y: [0, -1000],
        x: [0, Math.random() * 100 - 50],
        rotate: [0, 360],
        scale: [0.5, 1.2, 0.5],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay: delay,
        ease: 'linear',
      }}
    >
      <Heart className="w-8 h-8 fill-current" />
    </motion.div>
  );

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-purple-300 overflow-hidden">
      {/* Animated background hearts */}
      {[...Array(15)].map((_, i) => (
        <FloatingHeart key={i} delay={i * 0.5} />
      ))}

      {/* Confetti on YES */}
      <AnimatePresence>
        {answer === 'yes' && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={300}
            recycle={false}
            colors={['#ff69b4', '#ff1493', '#ffc0cb', '#ff6eb4', '#db7093']}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!showQuestion && !answer && (
            <motion.div
              key="intro"
              className="text-center px-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              {/* Cat with hearts */}
              <motion.div
                className="mb-8"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="relative inline-block">
                  <Cat className="w-32 h-32 text-pink-600" strokeWidth={1.5} />
                  <motion.div
                    className="absolute -top-4 -right-4"
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <Heart className="w-12 h-12 text-red-500 fill-red-500" />
                  </motion.div>
                  <motion.div
                    className="absolute -top-2 -left-6"
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: 0.5,
                    }}
                  >
                    <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.h1
                className="text-6xl mb-6 text-pink-800"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Hiya Darling!
              </motion.h1>

              <motion.p
                className="text-2xl text-pink-700 mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                I have something important to ask you...
              </motion.p>

              <motion.button
                onClick={handleStart}
                className="px-12 py-4 bg-pink-600 text-white rounded-full text-xl hover:bg-pink-700 transition-colors shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Click here! 💕
              </motion.button>
            </motion.div>
          )}

          {showQuestion && !answer && (
            <motion.div
              key="question"
              className="text-center px-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              {/* Multiple cats */}
              <motion.div
                className="flex justify-center gap-8 mb-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  animate={{
                    rotate: [-10, 10, -10],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Cat className="w-20 h-20 text-pink-600" />
                </motion.div>
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <Heart className="w-24 h-24 text-red-500 fill-red-500" />
                </motion.div>
                <motion.div
                  animate={{
                    rotate: [10, -10, 10],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Cat className="w-20 h-20 text-pink-600" />
                </motion.div>
              </motion.div>

              <motion.h1
                className="text-7xl mb-8 text-pink-800"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Will you be my Valentine Sam?
              </motion.h1>

              {noClickCount > 0 && (
                <motion.p
                  className="text-xl text-pink-700 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {noClickCount === 1 && "Pretty please? 🥺"}
                  {noClickCount === 2 && "The cats really want you to say yes! 😺"}
                  {noClickCount === 3 && "You can't say no forever! 💕"}
                  {noClickCount >= 4 && "Just click YES already! 😸"}
                </motion.p>
              )}

              <motion.div
                className="flex gap-6 justify-center items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={handleYes}
                  className="px-16 py-6 bg-pink-600 text-white rounded-full text-3xl hover:bg-pink-700 transition-colors shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    scale: {
                      duration: 1,
                      repeat: Infinity,
                    },
                  }}
                >
                  YES! 💖
                </motion.button>

                <motion.button
                  onMouseEnter={handleNoHover}
                  onClick={handleNoHover}
                  className="px-12 py-4 bg-gray-400 text-white rounded-full text-xl hover:bg-gray-500 transition-colors shadow-lg"
                  animate={{
                    x: noButtonPosition.x,
                    y: noButtonPosition.y,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                  }}
                >
                  No
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {answer === 'yes' && (
            <motion.div
              key="celebration"
              className="text-center px-8"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
            >
              {/* Large cat celebration */}
              <motion.div
                className="mb-8"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Cat className="w-40 h-40 text-pink-700 mx-auto" strokeWidth={1.5} />
              </motion.div>

              <motion.div
                className="relative inline-block mb-6"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <h1 className="text-8xl text-pink-800">
                  YAY! 
                </h1>
                <Sparkles className="absolute -top-8 -right-8 w-16 h-16 text-yellow-400 fill-yellow-400" />
                <Sparkles className="absolute -bottom-4 -left-8 w-12 h-12 text-yellow-400 fill-yellow-400" />
              </motion.div>

              <motion.p
                className="text-4xl text-pink-700 mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Hehehehe, I Knew IT  
              </motion.p>

              <motion.div
                className="flex justify-center gap-4 mt-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  >
                    <Heart className="w-12 h-12 text-pink-600 fill-pink-600" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                className="text-2xl text-pink-600 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                I'll see you on the 14th Ms.Samantha Lyons 💕
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
