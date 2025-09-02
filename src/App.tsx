import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin, Star, Music } from 'lucide-react';

interface FloatingHeart {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
}

interface LoveGameState {
  noClickCount: number;
  yesButtonSize: number;
  noButtonSize: number;
  currentQuestion: string;
  showFinalMessage: boolean;
}

function App() {
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [daysTogether, setDaysTogether] = useState(0);
  const [daysSinceFirstMeet, setDaysSinceFirstMeet] = useState(0);
  const [loveGame, setLoveGame] = useState<LoveGameState>({
    noClickCount: 0,
    yesButtonSize: 100,
    noButtonSize: 100,
    currentQuestion: "Məni sevirsən?",
    showFinalMessage: false
  });

  // Tarihlər
  const firstMeetDate = new Date('2024-02-02');
  const coupleDate = new Date('2024-02-19');

  const questions = [
    "Məni sevirsən?",
    "Dəqiq olsun... Məni sevirsən?",
    "Lap lap lap dəqiqqqq olsun, məni sevirsənnn??",
    "Yenə də əmin deyiləm... Məni həqiqətən sevirsən?",
    "Son dəfə soruşuram... Məni sevirsən, əzizim?",
    "Artıq bilirəm cavabını... Məni sevirsən! ❤️"
  ];

  useEffect(() => {
    const calculateDays = () => {
      const today = new Date();
      const diffTime1 = Math.abs(today.getTime() - coupleDate.getTime());
      const diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
      
      const diffTime2 = Math.abs(today.getTime() - firstMeetDate.getTime());
      const diffDays2 = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24));
      
      setDaysTogether(diffDays1);
      setDaysSinceFirstMeet(diffDays2);
    };

    calculateDays();
    const interval = setInterval(calculateDays, 86400000); // Update daily
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const createFloatingHeart = () => {
      const newHeart: FloatingHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        animationDuration: 3 + Math.random() * 4,
        size: 20 + Math.random() * 10,
      };
      
      setFloatingHearts(prev => [...prev, newHeart]);
      
      setTimeout(() => {
        setFloatingHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, newHeart.animationDuration * 1000);
    };

    const interval = setInterval(createFloatingHeart, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleNoClick = () => {
    if (loveGame.noClickCount < 5) {
      const newNoClickCount = loveGame.noClickCount + 1;
      setLoveGame(prev => ({
        ...prev,
        noClickCount: newNoClickCount,
        yesButtonSize: prev.yesButtonSize + 20,
        noButtonSize: Math.max(prev.noButtonSize - 15, 10),
        currentQuestion: questions[newNoClickCount] || questions[questions.length - 1]
      }));
    }
  };

  const handleYesClick = () => {
    setLoveGame(prev => ({
      ...prev,
      showFinalMessage: true
    }));
    
    // Create celebration hearts
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const celebrationHeart: FloatingHeart = {
          id: Date.now() + Math.random() + i,
          left: Math.random() * 100,
          animationDuration: 2 + Math.random() * 2,
          size: 30 + Math.random() * 20,
        };
        setFloatingHearts(prev => [...prev, celebrationHeart]);
      }, i * 200);
    }
  };

  const messages = [
    "Sən mənim həyatımın ən gözəl hissəsisən 💕",
    "Hər gün səninlə olmaq arzusundayam 🌟",
    "Səninlə tanış olmaq həyatımın ən gözəl hadisəsi idi 🌸",
    "Uzaqlıq bizim sevgimizi daha da gücləndirir 💖",
    "Sən mənim ürəyimin sahibisən, əzizim 👑"
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 animate-gradient-x"></div>
      
      {/* Floating Hearts */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-10"
          style={{
            left: `${heart.left}%`,
            bottom: '-20px',
            animation: `float-up ${heart.animationDuration}s ease-out forwards`,
            fontSize: `${heart.size}px`,
          }}
        >
          ❤️
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-20 min-h-screen">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            <div className="mb-8 animate-bounce">
              <Heart className="w-20 h-20 mx-auto text-pink-300 fill-current" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 font-dancing bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent animate-pulse">
              Tural ❤️ Səkinə
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 font-light opacity-90 animate-fade-in">
              Bizim sevgi hekayəmiz
            </p>
            
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
              <p className="text-lg md:text-xl leading-relaxed font-light">
                "İki ürək arasındaki məsafə, sevgi ilə doldurulduqda, 
                ən qısa məsafəyə çevrilir."
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 font-dancing">
              Bizim Tarixçəmiz
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* First Meet */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <Calendar className="w-8 h-8 text-pink-300 mr-4" />
                  <h3 className="text-2xl font-semibold text-white">İlk Görüş</h3>
                </div>
                <p className="text-pink-100 text-lg mb-4">2 Fevral 2024</p>
                <p className="text-white/90 leading-relaxed">
                  O gün bizim taleyimiz birləşdi. İlk dəfə gözlərinə baxanda, 
                  ürəyimin necə döyündüyünü hiss etdim.
                </p>
                <div className="mt-6 text-center">
                  <span className="text-3xl font-bold text-pink-300">{daysSinceFirstMeet}</span>
                  <p className="text-white/80">gün əvvəl tanış olduq</p>
                </div>
              </div>

              {/* Became Couple */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <Heart className="w-8 h-8 text-purple-300 mr-4 fill-current" />
                  <h3 className="text-2xl font-semibold text-white">Sevgili Olduq</h3>
                </div>
                <p className="text-purple-100 text-lg mb-4">19 Fevral 2024</p>
                <p className="text-white/90 leading-relaxed">
                  Bu gün sən mənim həyatımın ən böyük xoşbəxtliyinə çevrildin. 
                  "Bəli" dedin və ürəyim uçmağa başladı.
                </p>
                <div className="mt-6 text-center">
                  <span className="text-3xl font-bold text-purple-300">{daysTogether}</span>
                  <p className="text-white/80">gündür sevgiliyik</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Love Messages */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 font-dancing">
              Sənə Olan Sevgim
            </h2>
            
            <div className="grid gap-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 transform hover:bg-white/20 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <p className="text-white text-lg md:text-xl text-center leading-relaxed">
                    {message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 font-dancing">
              Xatirələrimiz
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 flex items-center justify-center group hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <img
                    src={`https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1`}
                    alt={`Xatirəmiz ${i}`}
                    className="w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Love Game */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20 text-center">
              {!loveGame.showFinalMessage ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 font-dancing animate-pulse-heart">
                    {loveGame.currentQuestion}
                  </h2>
                  
                  <div className="flex items-center justify-center space-x-8 flex-wrap gap-4">
                    <button
                      onClick={handleYesClick}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-white/30"
                      style={{
                        width: `${loveGame.yesButtonSize}px`,
                        height: `${loveGame.yesButtonSize * 0.4}px`,
                        fontSize: `${Math.max(loveGame.yesButtonSize * 0.15, 16)}px`
                      }}
                    >
                      HƏ ❤️
                    </button>
                    
                    {loveGame.noButtonSize > 15 && (
                      <button
                        onClick={handleNoClick}
                        className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-white/20"
                        style={{
                          width: `${loveGame.noButtonSize}px`,
                          height: `${loveGame.noButtonSize * 0.4}px`,
                          fontSize: `${Math.max(loveGame.noButtonSize * 0.15, 10)}px`
                        }}
                      >
                        YOX
                      </button>
                    )}
                  </div>
                  
                  {loveGame.noClickCount > 0 && (
                    <p className="mt-8 text-pink-200 text-lg animate-bounce">
                      Həqiqətən? 🥺 Yenidən düşün...
                    </p>
                  )}
                </>
              ) : (
                <div className="animate-fade-in">
                  <div className="mb-8">
                    <Heart className="w-24 h-24 mx-auto text-pink-300 fill-current animate-pulse-heart" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-dancing">
                    Mən də səni sevirəmmmm! 💕
                  </h2>
                  <p className="text-xl md:text-2xl text-pink-200 mb-6">
                    Bilirdim ki, sən məni sevirsən! 
                  </p>
                  <p className="text-lg text-white/90 leading-relaxed">
                    Sən mənim həyatımın ən gözəl hissəsisən, əzizim Səkinə! 
                    Bu uzaq məsafə bizim sevgimizi daha da gücləndirir. 
                    Tezliklə yanında olacağam! ❤️✨
                  </p>
                  <div className="mt-8 flex justify-center space-x-4">
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '0s' }}>💕</span>
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>💖</span>
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>💗</span>
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '0.6s' }}>💝</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Promise Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20">
              <Music className="w-16 h-16 mx-auto mb-8 text-yellow-300" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-dancing">
                Sənə Verdiyim Söz
              </h2>
              <div className="space-y-6 text-white/90 text-lg md:text-xl leading-relaxed">
                <p>
                  "Əzizim Səkinə, bu məsafə bizim sevgimizi sınaya bilməz. 
                  Hər gün səni düşünürəm, hər gecə yuxularımda səninləyəm."
                </p>
                <p>
                  "Tezliklə yanına gələcəyəm və bir daha heç vaxt səndən ayrılmayacağam. 
                  Sən mənim həyatımın ən böyük səadətisən."
                </p>
                <p className="font-semibold text-pink-200">
                  "Səni çox sevirəm! ❤️"
                </p>
                <p className="text-right font-dancing text-2xl text-purple-200">
                  - Turałından
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center">
          <div className="flex items-center justify-center space-x-4 text-white/80">
            <MapPin className="w-5 h-5" />
            <span>Uzaq məsafə, yaxın ürəklər</span>
            <Heart className="w-5 h-5 fill-current text-pink-300" />
          </div>
          <p className="mt-4 text-white/60 text-sm">
            Sevgi sərhədləri tanımır 💕
          </p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes float-up {
          to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out 0.5s both;
        }
        
        .font-dancing {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>
    </div>
  );
}

export default App;