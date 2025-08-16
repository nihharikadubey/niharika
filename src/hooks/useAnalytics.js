import { useEffect } from 'react';

const useAnalytics = () => {
  useEffect(() => {
    // Track page load performance
    if (typeof window !== 'undefined' && window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      // Log performance metrics
      console.group('⚡ Performance Metrics');
      console.log(`Page Load Time: ${pageLoadTime}ms`);
      console.log(`DOM Ready Time: ${domReadyTime}ms`);
      console.log(`Render Time: ${renderTime}ms`);
      console.groupEnd();

      // Store in localStorage for analytics
      const metrics = {
        pageLoadTime,
        domReadyTime,
        renderTime,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
      };

      // Get existing metrics
      const existingMetrics = JSON.parse(localStorage.getItem('performanceMetrics') || '[]');
      existingMetrics.push(metrics);
      
      // Keep only last 10 entries
      if (existingMetrics.length > 10) {
        existingMetrics.shift();
      }
      
      localStorage.setItem('performanceMetrics', JSON.stringify(existingMetrics));
    }

    // Track user interactions
    const trackEvent = (eventName, eventData = {}) => {
      const event = {
        name: eventName,
        data: eventData,
        timestamp: new Date().toISOString(),
      };

      const events = JSON.parse(localStorage.getItem('userEvents') || '[]');
      events.push(event);
      
      // Keep only last 50 events
      if (events.length > 50) {
        events.shift();
      }
      
      localStorage.setItem('userEvents', JSON.stringify(events));
      
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Event tracked:', eventName, eventData);
      }
    };

    // Track scroll depth
    let maxScrollDepth = 0;
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = scrollPercentage;
        
        // Track milestones
        if ([25, 50, 75, 100].includes(maxScrollDepth)) {
          trackEvent('scroll_depth', { depth: maxScrollDepth });
        }
      }
    };

    // Track time on page
    const startTime = Date.now();
    const handleUnload = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      trackEvent('time_on_page', { seconds: timeOnPage });
    };

    // Track clicks on important elements
    const handleClick = (e) => {
      const target = e.target;
      
      // Track button clicks
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        trackEvent('click', {
          element: target.tagName,
          text: target.innerText?.substring(0, 30),
          href: target.href,
        });
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleUnload);
    document.addEventListener('click', handleClick);

    // Track initial page view
    trackEvent('page_view', {
      path: window.location.pathname,
      referrer: document.referrer,
    });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleUnload);
      document.removeEventListener('click', handleClick);
    };
  }, []);
};

export default useAnalytics;