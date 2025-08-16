import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '../hoc';

const InfrastructureVisualizer = () => {
  const [activeArchitecture, setActiveArchitecture] = useState('microservices');
  const [hoveredComponent, setHoveredComponent] = useState(null);

  const architectures = {
    microservices: {
      title: 'Microservices Architecture',
      description: 'Scalable containerized microservices on Kubernetes',
      components: [
        { id: 'lb', name: 'Load Balancer', type: 'network', x: 50, y: 10, icon: '⚖️' },
        { id: 'api', name: 'API Gateway', type: 'gateway', x: 50, y: 25, icon: '🚪' },
        { id: 'auth', name: 'Auth Service', type: 'service', x: 20, y: 40, icon: '🔐' },
        { id: 'user', name: 'User Service', type: 'service', x: 35, y: 40, icon: '👤' },
        { id: 'order', name: 'Order Service', type: 'service', x: 50, y: 40, icon: '📦' },
        { id: 'payment', name: 'Payment Service', type: 'service', x: 65, y: 40, icon: '💳' },
        { id: 'notif', name: 'Notification Service', type: 'service', x: 80, y: 40, icon: '🔔' },
        { id: 'db1', name: 'PostgreSQL', type: 'database', x: 20, y: 60, icon: '🐘' },
        { id: 'db2', name: 'MongoDB', type: 'database', x: 50, y: 60, icon: '🍃' },
        { id: 'cache', name: 'Redis Cache', type: 'cache', x: 80, y: 60, icon: '⚡' },
        { id: 'queue', name: 'Message Queue', type: 'queue', x: 50, y: 75, icon: '📨' },
        { id: 'monitor', name: 'Monitoring', type: 'monitoring', x: 20, y: 85, icon: '📊' },
        { id: 'logs', name: 'Log Aggregation', type: 'logging', x: 80, y: 85, icon: '📝' },
      ],
      connections: [
        { from: 'lb', to: 'api' },
        { from: 'api', to: 'auth' },
        { from: 'api', to: 'user' },
        { from: 'api', to: 'order' },
        { from: 'api', to: 'payment' },
        { from: 'api', to: 'notif' },
        { from: 'auth', to: 'db1' },
        { from: 'user', to: 'db1' },
        { from: 'order', to: 'db2' },
        { from: 'payment', to: 'db2' },
        { from: 'notif', to: 'queue' },
        { from: 'order', to: 'cache' },
        { from: 'payment', to: 'cache' },
      ],
    },
    serverless: {
      title: 'Serverless Architecture',
      description: 'Event-driven serverless functions on AWS',
      components: [
        { id: 'cdn', name: 'CloudFront CDN', type: 'network', x: 50, y: 10, icon: '🌐' },
        { id: 's3', name: 'S3 Static Assets', type: 'storage', x: 20, y: 25, icon: '🪣' },
        { id: 'apigw', name: 'API Gateway', type: 'gateway', x: 50, y: 25, icon: '🚪' },
        { id: 'lambda1', name: 'Auth Lambda', type: 'function', x: 20, y: 45, icon: 'λ' },
        { id: 'lambda2', name: 'Process Lambda', type: 'function', x: 40, y: 45, icon: 'λ' },
        { id: 'lambda3', name: 'Analytics Lambda', type: 'function', x: 60, y: 45, icon: 'λ' },
        { id: 'lambda4', name: 'Notification Lambda', type: 'function', x: 80, y: 45, icon: 'λ' },
        { id: 'dynamo', name: 'DynamoDB', type: 'database', x: 30, y: 65, icon: '🗄️' },
        { id: 'rds', name: 'RDS Aurora', type: 'database', x: 70, y: 65, icon: '🏛️' },
        { id: 'sqs', name: 'SQS Queue', type: 'queue', x: 50, y: 80, icon: '📤' },
        { id: 'sns', name: 'SNS Topics', type: 'notification', x: 20, y: 80, icon: '📢' },
        { id: 'cw', name: 'CloudWatch', type: 'monitoring', x: 80, y: 80, icon: '👁️' },
      ],
      connections: [
        { from: 'cdn', to: 's3' },
        { from: 'cdn', to: 'apigw' },
        { from: 'apigw', to: 'lambda1' },
        { from: 'apigw', to: 'lambda2' },
        { from: 'apigw', to: 'lambda3' },
        { from: 'lambda1', to: 'dynamo' },
        { from: 'lambda2', to: 'dynamo' },
        { from: 'lambda2', to: 'sqs' },
        { from: 'lambda3', to: 'rds' },
        { from: 'lambda4', to: 'sns' },
        { from: 'sqs', to: 'lambda4' },
      ],
    },
    cicd: {
      title: 'CI/CD Pipeline',
      description: 'Automated deployment pipeline with GitOps',
      components: [
        { id: 'git', name: 'GitHub', type: 'vcs', x: 10, y: 50, icon: '🐙' },
        { id: 'jenkins', name: 'Jenkins', type: 'ci', x: 30, y: 30, icon: '🤖' },
        { id: 'sonar', name: 'SonarQube', type: 'quality', x: 30, y: 70, icon: '🔍' },
        { id: 'build', name: 'Build & Test', type: 'process', x: 50, y: 30, icon: '🔨' },
        { id: 'scan', name: 'Security Scan', type: 'security', x: 50, y: 50, icon: '🛡️' },
        { id: 'registry', name: 'Container Registry', type: 'storage', x: 50, y: 70, icon: '📦' },
        { id: 'argo', name: 'ArgoCD', type: 'cd', x: 70, y: 50, icon: '🔄' },
        { id: 'k8s', name: 'Kubernetes', type: 'orchestration', x: 90, y: 50, icon: '☸️' },
        { id: 'helm', name: 'Helm Charts', type: 'package', x: 70, y: 20, icon: '⎈' },
        { id: 'prom', name: 'Prometheus', type: 'monitoring', x: 90, y: 20, icon: '📈' },
        { id: 'grafana', name: 'Grafana', type: 'visualization', x: 90, y: 80, icon: '📊' },
      ],
      connections: [
        { from: 'git', to: 'jenkins' },
        { from: 'jenkins', to: 'build' },
        { from: 'jenkins', to: 'sonar' },
        { from: 'build', to: 'scan' },
        { from: 'scan', to: 'registry' },
        { from: 'registry', to: 'argo' },
        { from: 'helm', to: 'argo' },
        { from: 'argo', to: 'k8s' },
        { from: 'k8s', to: 'prom' },
        { from: 'prom', to: 'grafana' },
      ],
    },
  };

  const getComponentStyle = (type) => {
    const styles = {
      network: 'from-blue-500 to-cyan-500',
      gateway: 'from-purple-500 to-pink-500',
      service: 'from-green-500 to-emerald-500',
      function: 'from-orange-500 to-yellow-500',
      database: 'from-red-500 to-rose-500',
      storage: 'from-indigo-500 to-blue-500',
      cache: 'from-teal-500 to-cyan-500',
      queue: 'from-violet-500 to-purple-500',
      monitoring: 'from-gray-500 to-slate-500',
      vcs: 'from-gray-600 to-gray-700',
      ci: 'from-blue-600 to-blue-700',
      cd: 'from-green-600 to-green-700',
      security: 'from-red-600 to-red-700',
      orchestration: 'from-blue-500 to-blue-600',
    };
    return styles[type] || 'from-gray-500 to-gray-600';
  };

  const currentArch = architectures[activeArchitecture];

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
            Cloud Architecture
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Infrastructure <span className="text-cyan-400">Visualizer</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Interactive visualization of modern cloud architectures and deployment patterns
          </p>
        </motion.div>

        {/* Architecture Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.keys(architectures).map((key) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveArchitecture(key)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeArchitecture === key
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-800/50 text-white/70 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              {architectures[key].title}
            </motion.button>
          ))}
        </div>

        {/* Architecture Visualization */}
        <motion.div
          key={activeArchitecture}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8"
        >
          <h3 className="text-xl font-semibold text-white mb-2">{currentArch.title}</h3>
          <p className="text-white/60 mb-6">{currentArch.description}</p>

          {/* Interactive Diagram */}
          <div className="relative h-[500px] bg-slate-900/50 rounded-lg overflow-hidden">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {currentArch.connections.map((conn, index) => {
                const fromComp = currentArch.components.find(c => c.id === conn.from);
                const toComp = currentArch.components.find(c => c.id === conn.to);
                if (!fromComp || !toComp) return null;

                return (
                  <motion.line
                    key={`${conn.from}-${conn.to}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    x1={`${fromComp.x}%`}
                    y1={`${fromComp.y}%`}
                    x2={`${toComp.x}%`}
                    y2={`${toComp.y}%`}
                    stroke="rgb(34, 211, 238)"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                  />
                );
              })}
            </svg>

            {/* Components */}
            {currentArch.components.map((component, index) => (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                onHoverStart={() => setHoveredComponent(component)}
                onHoverEnd={() => setHoveredComponent(null)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
                style={{ left: `${component.x}%`, top: `${component.y}%` }}
              >
                <div className={`relative group`}>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getComponentStyle(component.type)} 
                    flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <span className="text-2xl">{component.icon}</span>
                  </div>
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {component.name}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Component Details */}
            <AnimatePresence>
              {hoveredComponent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 max-w-xs"
                >
                  <h4 className="text-white font-semibold mb-1">{hoveredComponent.name}</h4>
                  <p className="text-white/60 text-sm capitalize">Type: {hoveredComponent.type}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            {['service', 'database', 'network', 'monitoring'].map((type) => (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded bg-gradient-to-br ${getComponentStyle(type)}`} />
                <span className="text-white/60 text-sm capitalize">{type}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(InfrastructureVisualizer, 'infrastructure');