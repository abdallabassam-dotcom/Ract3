import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Zap, 
  FlaskConical, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Activity, 
  HelpCircle, 
  Lightbulb,
  Droplets,
  Wind,
  Stethoscope
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState(1);

  // --- State for Section 2: Experiment ---
  const [concentration, setConcentration] = useState(1); // 1: Low (1M), 2: High (6M)
  const [reactionProgress, setReactionProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && reactionProgress < 100) {
      interval = setInterval(() => {
        // Simple comparison: High concentration (2) is much faster than low (1)
        const rate = concentration === 1 ? 0.8 : 4.5; 
        setReactionProgress((prev) => {
          const next = prev + rate;
          return next >= 100 ? 100 : next;
        });
        setTimeElapsed((prev) => prev + 0.1);
      }, 100);
    } else if (reactionProgress >= 100) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, reactionProgress, concentration]);

  const handleStartExperiment = () => {
    if (reactionProgress >= 100) {
      setReactionProgress(0);
      setTimeElapsed(0);
    }
    setIsRunning(true);
  };

  const handleResetExperiment = () => {
    setIsRunning(false);
    setReactionProgress(0);
    setTimeElapsed(0);
  };

  // --- State for Section 3: Quiz ---
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      question: "ماذا يعني زيادة 'تركيز' المادة المتفاعلة؟",
      options: ["زيادة حجم الوعاء", "زيادة عدد الجزيئات في نفس الحجم", "تقليل درجة الحرارة", "تغيير لون المادة"],
      answer: 1
    },
    {
      question: "كيف تؤثر زيادة التركيز على سرعة التفاعل؟",
      options: ["تزداد السرعة بسبب زيادة احتمالية التصادمات", "تقل السرعة لأن الجزيئات تزدحم", "لا تتأثر السرعة نهائياً", "يتوقف التفاعل بسبب الضغط"],
      answer: 0
    },
    {
      question: "لماذا يشتعل سلك المواعين في الأكسجين النقي أسرع من الهواء الجوي؟",
      options: ["لأن الأكسجين النقي أبرد", "لأن تركيز الأكسجين في الهواء 21% بينما في المخبار 100%", "لأن الهواء يحتوي على رطوبة", "لأن المخبار زجاجي"],
      answer: 1
    }
  ];

  const handleAnswerSubmit = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].answer) setScore(score + 1);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 font-sans text-slate-200 p-4 md:p-8">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drift {
          0% { transform: translate(0, 0); }
          50% { transform: translate(8px, 8px); }
          100% { transform: translate(0, 0); }
        }
        .particle { animation: drift 2s infinite ease-in-out; }
      `}} />

      <header className="max-w-6xl mx-auto mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-indigo-900/30 rounded-full border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
            <Users className="w-10 h-10 text-indigo-400" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">أثر التركيز على سرعة التفاعل</h1>
        <p className="text-slate-400 text-lg">مقارنة بصرية بين التفاعلات المخففة والمركزة</p>
      </header>

      <main className="max-w-6xl mx-auto bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-slate-800 bg-slate-950">
          {[
            { id: 1, title: 'التفسير العلمي', icon: <BookOpen className="w-5 h-5" /> },
            { id: 2, title: 'التجربة التفاعلية', icon: <FlaskConical className="w-5 h-5" /> },
            { id: 3, title: 'اختبر معلوماتك', icon: <HelpCircle className="w-5 h-5" /> },
            { id: 4, title: 'تطبيقات حياتية', icon: <Lightbulb className="w-5 h-5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[150px] py-4 px-2 flex items-center justify-center gap-2 font-semibold transition-all ${
                activeTab === tab.id 
                  ? 'bg-slate-900 text-indigo-400 border-b-2 border-indigo-400' 
                  : 'text-slate-500 hover:text-indigo-300 hover:bg-slate-800'
              }`}
            >
              {tab.icon} {tab.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-10">
          
          {/* Section 1: Explanation */}
          {activeTab === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold mb-6 text-indigo-400 flex items-center gap-2">
                <Users className="w-6 h-6" /> كيف يؤثر الزحام الجزيئي؟
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 text-lg text-slate-300 leading-relaxed">
                  <p>تعتمد سرعة التفاعل على عدد <strong>التصادمات</strong> بين الجزيئات. تخيل شارعاً هادئاً مقابل شارع مزدحم جداً؛ أين تزيد احتمالية الاصطدام؟</p>
                  <div className="bg-indigo-900/10 p-5 rounded-2xl border border-indigo-800/30">
                    <ul className="list-disc list-inside space-y-3">
                      <li><strong className="text-white">التركيز المنخفض:</strong> جزيئات قليلة متباعدة، فرص التصادم ضئيلة، التفاعل بطيء.</li>
                      <li><strong className="text-indigo-400">التركيز المرتفع:</strong> زحام جزيئي كبير، تصادمات مستمرة وعنيفة، التفاعل سريع جداً.</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col items-center gap-4">
                  <h3 className="text-xl font-bold text-slate-200">نموذج مجهري</h3>
                  <div className="flex gap-4 w-full">
                    <div className="flex-1 bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
                      <div className="h-24 relative overflow-hidden bg-slate-950 rounded-lg mb-2">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="absolute w-3 h-3 bg-indigo-500 rounded-full particle" style={{ top: `${Math.random()*70}%`, left: `${Math.random()*80}%` }}></div>
                        ))}
                      </div>
                      <span className="text-xs text-slate-500">مخفف</span>
                    </div>
                    <div className="flex-1 bg-slate-900 p-4 rounded-xl border border-indigo-900/50 text-center">
                      <div className="h-24 relative overflow-hidden bg-slate-950 rounded-lg mb-2">
                        {[...Array(20)].map((_, i) => (
                          <div key={i} className="absolute w-2 h-2 bg-indigo-400 rounded-full particle" style={{ top: `${Math.random()*70}%`, left: `${Math.random()*80}%` }}></div>
                        ))}
                      </div>
                      <span className="text-xs text-indigo-400">مركز</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Experiment (Comparison of 2 Levels) */}
          {activeTab === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold mb-6 text-indigo-400">نشاط: مقارنة التركيز المنخفض والعالي</h2>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <h3 className="font-bold mb-4 text-white">اختر التركيز للتجربة:</h3>
                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={() => {setConcentration(1); handleResetExperiment();}}
                        className={`p-4 rounded-xl border-2 transition-all flex justify-between items-center ${concentration === 1 ? 'border-indigo-500 bg-indigo-950/30' : 'border-slate-700 hover:border-slate-600'}`}
                      >
                        <div className="text-right">
                          <span className="block font-bold">تركيز منخفض (1M)</span>
                          <span className="text-xs text-slate-500">جزيئات قليلة</span>
                        </div>
                        <div className="w-4 h-4 rounded-full bg-slate-600"></div>
                      </button>
                      
                      <button 
                        onClick={() => {setConcentration(2); handleResetExperiment();}}
                        className={`p-4 rounded-xl border-2 transition-all flex justify-between items-center ${concentration === 2 ? 'border-indigo-500 bg-indigo-950/30' : 'border-slate-700 hover:border-slate-600'}`}
                      >
                        <div className="text-right">
                          <span className="block font-bold">تركيز عالي (6M)</span>
                          <span className="text-xs text-slate-500">جزيئات كثيفة</span>
                        </div>
                        <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_8px_indigo]"></div>
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button 
                      onClick={handleStartExperiment} 
                      disabled={isRunning && reactionProgress < 100} 
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
                    >
                      <Play className="w-5 h-5" /> {reactionProgress >= 100 ? 'إعادة المحاكاة' : 'بدء التفاعل'}
                    </button>
                    <button onClick={handleResetExperiment} className="w-full py-3 bg-slate-800 text-slate-400 font-bold rounded-xl flex items-center justify-center gap-2">
                      <RotateCcw className="w-5 h-5" /> تصفير النتائج
                    </button>
                  </div>
                </div>

                {/* Animation Area */}
                <div className="lg:col-span-2 bg-slate-950 p-8 rounded-3xl border border-slate-800 relative shadow-inner">
                  <div className="flex justify-between items-center mb-10">
                    <div className="text-center bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-500 block mb-1">الزمن المستغرق</span>
                      <span className="text-3xl font-mono text-indigo-400">{timeElapsed.toFixed(1)}s</span>
                    </div>
                    <div className="flex-1 px-10">
                      <span className="text-xs text-slate-500 block mb-2">مستوى اكتمال التفاعل</span>
                      <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 transition-all duration-100" style={{ width: `${reactionProgress}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center items-end h-40">
                    <div className="w-40 h-40 border-4 border-t-0 border-slate-700 rounded-b-3xl relative bg-slate-900/30 overflow-hidden">
                      <div className={`absolute bottom-0 w-full transition-all duration-300 ${concentration === 1 ? 'bg-indigo-900/20' : 'bg-indigo-600/30'}`} style={{ height: '70%' }}></div>
                      {isRunning && reactionProgress < 100 && (
                        <div className="absolute inset-0">
                          {[...Array(concentration === 1 ? 8 : 40)].map((_, i) => (
                            <div key={i} className="absolute w-2 h-2 bg-indigo-400 rounded-full" style={{ left: `${Math.random()*90}%`, bottom: `${Math.random()*70}%`, animation: `drift ${concentration === 1 ? 2 : 0.5}s infinite` }}></div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {reactionProgress >= 100 && <div className="text-center mt-6 text-green-400 font-bold animate-pulse">✓ تم التفاعل الكيميائي بالكامل!</div>}
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Quiz */}
          {activeTab === 3 && (
            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              {!showResults ? (
                <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">
                  <div className="mb-8 text-center">
                    <span className="text-indigo-400 font-bold">السؤال {currentQuestion + 1}</span>
                    <h3 className="text-2xl font-bold mt-2">{questions[currentQuestion].question}</h3>
                  </div>
                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((opt, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleAnswerSubmit(i)} 
                        disabled={selectedAnswer !== null} 
                        className={`w-full p-5 text-right rounded-2xl border-2 transition-all ${selectedAnswer === null ? 'border-slate-700 hover:border-indigo-500' : i === questions[currentQuestion].answer ? 'border-green-500 bg-green-950/30 text-green-400' : selectedAnswer === i ? 'border-red-500 bg-red-950/30 text-red-400' : 'border-slate-800 opacity-30'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center p-12 bg-slate-800 rounded-3xl border border-slate-700">
                  <h3 className="text-3xl font-bold mb-4">أحسنت! نتيجتك هي {score} من {questions.length}</h3>
                  <button onClick={() => {setShowResults(false); setCurrentQuestion(0); setScore(0);}} className="px-10 py-4 bg-indigo-600 rounded-2xl font-bold hover:bg-indigo-500 transition-colors">إعادة الاختبار</button>
                </div>
              )}
            </div>
          )}

          {/* Section 4: Applications */}
          {activeTab === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold mb-8 text-indigo-400 flex items-center gap-2"><Lightbulb className="w-6 h-6"/> تطبيقات هامة</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-800 p-6 rounded-2xl border-t-4 border-indigo-500 hover:translate-y-[-5px] transition-transform">
                  <div className="flex items-center gap-3 mb-4"><Wind className="text-indigo-400" /> <h3 className="font-bold">الأكسجين النقي</h3></div>
                  <p className="text-sm text-slate-400">احتراق المواد في الأكسجين النقي (تركيز 100%) أسرع بكثير من احتراقها في الهواء الجوي الذي يحتوي على 21% فقط أكسجين.</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-2xl border-t-4 border-indigo-500 hover:translate-y-[-5px] transition-transform">
                  <div className="flex items-center gap-3 mb-4"><Stethoscope className="text-indigo-400" /> <h3 className="font-bold">التنفس الطبي</h3></div>
                  <p className="text-sm text-slate-400">يُعطى المرضى أحياناً أكسجين بتركيز عالي لتسريع عملية انتشاره في الدم وعلاج ضيق التنفس بفعالية أكبر.</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-2xl border-t-4 border-indigo-500 hover:translate-y-[-5px] transition-transform">
                  <div className="flex items-center gap-3 mb-4"><Droplets className="text-indigo-400" /> <h3 className="font-bold">المنظفات المركزة</h3></div>
                  <p className="text-sm text-slate-400">تعمل المنظفات المركزة (ذات التركيز العالي) على تفكيك البقع الصعبة بسرعة أكبر من المنظفات المخففة بالماء.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;

