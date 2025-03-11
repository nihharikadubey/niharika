import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
Infrastructure, DevOps, & Cloud Engineer with 6 years of experience in AWS Cloud Integration, Middleware, Managed File Transfer and SOA across banking, healthcare & retail sectors. Proficient in automation and DevOps practices, AWS Services, leveraging CI/CD pipelines, Kubernetes, Docker, Ansible, and Terraform to streamline deployments, enhance scalability, and improve operational efficiency. Skilled in monitoring and observability tools like Grafana & Prometheus for real-time system performance tracking and proactive issue resolution. Strong hands-on experience in Scripting, and UNIX/Linux environments, with a focus on optimizing infrastructure performance, troubleshooting middleware issues, and ensuring seamless integrations across distributed systems. Well-versed in AWS cloud services, implementing cloud-native solutions to enhance reliability and scalability. Passionate about driving automation, improving system resilience, and delivering robust integration solutions for modern enterprise environments. Proficient in team leadership & individual contributions.      </motion.p>
      <div className='mt-20 flex flex-wrap gap-10'>
        {/* Add service cards here if needed */}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
