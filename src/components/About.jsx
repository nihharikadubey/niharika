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
Integration and Infrastructure Engineer with 6 years of experience in the Middleware domain, specializing in Managed File Transfer (MFT), Service-Oriented Architecture (SOA), and cloud-integration solutions. Experienced in designing, implementing, and managing enterprise-grade integration platforms using IBM Sterling Suite, Tectia, Tibco, MQ, and TCP/IP Network Protocols to ensure secure and efficient data transmission. Proficient in automation and DevOps practices, leveraging CI/CD pipelines, Kubernetes, Docker, Ansible, and Terraform to streamline deployments, enhance scalability, and improve operational efficiency. Skilled in monitoring and observability tools like Grafana for real-time system performance tracking and proactive issue resolution. Strong hands-on experience in SQL, Shell scripting, and UNIX/Linux environments, with a focus on optimizing infrastructure performance, troubleshooting middleware issues, and ensuring seamless integrations across distributed systems. Well-versed in AWS cloud services, implementing cloud-native solutions to enhance reliability and scalability. Passionate about driving automation, improving system resilience, and delivering robust integration solutions for modern enterprise environments.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {/* Add service cards here if needed */}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
