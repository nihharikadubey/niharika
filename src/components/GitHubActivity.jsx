import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';

const GitHubActivity = () => {
  const [githubData, setGithubData] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = 'nihharikadubey';

  useEffect(() => {
    // Fetch GitHub user data
    const fetchGitHubData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        setGithubData(data);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };

    // Generate mock contribution data (replace with actual GitHub contributions API if available)
    const generateContributions = () => {
      const weeks = 52;
      const daysPerWeek = 7;
      const contributionData = [];
      
      for (let week = 0; week < weeks; week++) {
        for (let day = 0; day < daysPerWeek; day++) {
          const date = new Date();
          date.setDate(date.getDate() - (weeks - week) * 7 - (daysPerWeek - day));
          
          // Generate random contribution count (0-4)
          const count = Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0;
          
          contributionData.push({
            date: date.toISOString().split('T')[0],
            count,
            week,
            day,
          });
        }
      }
      
      setContributions(contributionData);
      setLoading(false);
    };

    fetchGitHubData();
    generateContributions();
  }, []);

  const getContributionColor = (count) => {
    if (count === 0) return 'bg-slate-800';
    if (count === 1) return 'bg-cyan-900';
    if (count === 2) return 'bg-cyan-700';
    if (count === 3) return 'bg-cyan-500';
    return 'bg-cyan-400';
  };

  const stats = [
    { label: 'Public Repos', value: githubData?.public_repos || '0', icon: '📦' },
    { label: 'Followers', value: githubData?.followers || '0', icon: '👥' },
    { label: 'Following', value: githubData?.following || '0', icon: '🔗' },
    { label: 'Public Gists', value: githubData?.public_gists || '0', icon: '📝' },
  ];

  const recentActivity = [
    { type: 'commit', repo: 'niharika', message: 'Add portfolio enhancements', time: '2 hours ago' },
    { type: 'pr', repo: 'kubernetes-deploy', message: 'Update deployment configs', time: '1 day ago' },
    { type: 'issue', repo: 'aws-infrastructure', message: 'Optimize Lambda functions', time: '3 days ago' },
    { type: 'star', repo: 'devops-toolkit', message: 'Starred repository', time: '5 days ago' },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'commit': return '💾';
      case 'pr': return '🔀';
      case 'issue': return '🐛';
      case 'star': return '⭐';
      default: return '📌';
    }
  };

  return (
    <section className="relative w-full py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-cyan-400 text-sm uppercase tracking-wider mb-2">
            Open Source
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            GitHub <span className="text-cyan-400">Activity</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Contributing to open source and building tools for the DevOps community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contribution Graph */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Contribution Graph
            </h3>
            
            {/* Contribution Heatmap */}
            {!loading && (
              <div className="overflow-x-auto">
                <div className="inline-block">
                  <div className="flex gap-1">
                    {Array.from({ length: 52 }, (_, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-1">
                        {contributions
                          .filter(c => c.week === weekIndex)
                          .map((contribution, dayIndex) => (
                            <motion.div
                              key={`${weekIndex}-${dayIndex}`}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: weekIndex * 0.01 + dayIndex * 0.001 }}
                              whileHover={{ scale: 1.2 }}
                              className={`w-3 h-3 rounded-sm ${getContributionColor(contribution.count)} 
                                cursor-pointer transition-all duration-200`}
                              title={`${contribution.date}: ${contribution.count} contributions`}
                            />
                          ))}
                      </div>
                    ))}
                  </div>
                  
                  {/* Legend */}
                  <div className="flex items-center gap-2 mt-4 text-xs text-white/60">
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map(count => (
                      <div
                        key={count}
                        className={`w-3 h-3 rounded-sm ${getContributionColor(count)}`}
                      />
                    ))}
                    <span>More</span>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Recent Activity
            </h3>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <span className="text-xl">{getActivityIcon(activity.type)}</span>
                  <div className="flex-1">
                    <p className="text-white text-sm group-hover:text-cyan-400 transition-colors">
                      {activity.message}
                    </p>
                    <p className="text-white/40 text-xs">
                      {activity.repo} • {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View on GitHub Button */}
            <motion.a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-700/50 
                hover:bg-slate-700/70 rounded-lg text-white transition-all duration-300 group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="group-hover:translate-x-1 transition-transform">
                View on GitHub
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(GitHubActivity, 'github-activity');