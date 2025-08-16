import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnalyticsDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Keyboard shortcut to open dashboard
    const handleKeyPress = (e) => {
      if (e.key === 'a' && e.ctrlKey && e.altKey) {
        e.preventDefault();
        loadAnalytics();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const loadAnalytics = () => {
    const performanceMetrics = JSON.parse(localStorage.getItem('performanceMetrics') || '[]');
    const userEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
    
    // Calculate averages
    if (performanceMetrics.length > 0) {
      const avgLoadTime = performanceMetrics.reduce((acc, m) => acc + m.pageLoadTime, 0) / performanceMetrics.length;
      const avgRenderTime = performanceMetrics.reduce((acc, m) => acc + m.renderTime, 0) / performanceMetrics.length;
      
      setMetrics({
        avgLoadTime: Math.round(avgLoadTime),
        avgRenderTime: Math.round(avgRenderTime),
        totalSessions: performanceMetrics.length,
        lastSession: performanceMetrics[performanceMetrics.length - 1],
      });
    }

    // Get event summary
    const eventSummary = userEvents.reduce((acc, event) => {
      acc[event.name] = (acc[event.name] || 0) + 1;
      return acc;
    }, {});

    setEvents(Object.entries(eventSummary).map(([name, count]) => ({ name, count })));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]"
          />
          
          {/* Dashboard Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[71] w-full max-w-4xl max-h-[80vh] overflow-y-auto"
          >
            <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>📊</span> Analytics Dashboard
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors text-xl"
                >
                  ✕
                </button>
              </div>
              
              {metrics ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Performance Metrics */}
                  <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
                    <h4 className="text-lg font-semibold text-cyan-400 mb-4">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Avg Load Time:</span>
                        <span className="text-white font-mono">{metrics.avgLoadTime}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Avg Render Time:</span>
                        <span className="text-white font-mono">{metrics.avgRenderTime}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Sessions:</span>
                        <span className="text-white font-mono">{metrics.totalSessions}</span>
                      </div>
                    </div>
                  </div>

                  {/* User Events */}
                  <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
                    <h4 className="text-lg font-semibold text-blue-400 mb-4">User Events</h4>
                    <div className="space-y-2">
                      {events.slice(0, 5).map((event, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-slate-400">{event.name}:</span>
                          <span className="text-white font-mono">{event.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Score */}
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl p-6 border border-cyan-500/30 md:col-span-2">
                    <h4 className="text-lg font-semibold text-white mb-4">Performance Score</h4>
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-24">
                        <svg className="w-full h-full -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-slate-700/30"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - (metrics.avgLoadTime < 3000 ? 0.9 : 0.5))}`}
                            className="text-cyan-400 transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            {metrics.avgLoadTime < 3000 ? 'A' : 'B'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          {metrics.avgLoadTime < 3000 ? 'Excellent Performance' : 'Good Performance'}
                        </p>
                        <p className="text-slate-400 text-sm mt-1">
                          Your site loads in under {Math.round(metrics.avgLoadTime / 1000)}s
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400">No analytics data available yet.</p>
                  <p className="text-slate-500 text-sm mt-2">Navigate around the site to generate data.</p>
                </div>
              )}

              <div className="mt-6 text-center">
                <p className="text-slate-500 text-xs">
                  Press <kbd className="px-2 py-0.5 bg-slate-700/50 rounded text-cyan-400 font-mono">Ctrl+Alt+A</kbd> to open this dashboard
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnalyticsDashboard;