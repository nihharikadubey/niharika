  //TODO: integrate the data from the backend
export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Experience",
  },
  {
    id: "tech",
    title: "Skills",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const technologies = [

  {
    name: "git",
    icon: "https://skillicons.dev/icons/?i=git",
  },
  {
    name: "Kubernetes",
    icon: "https://skillicons.dev/icons/?i=kubernetes",
  },
  { 
    name:"Shell",
    icon:"https://skillicons.dev/icons/?i=powershell",
  },
  { 
    name:"Linux",
    icon:"https://skillicons.dev/icons/?i=linux",
  },
  { 
    name:"Bash",
    icon:"https://skillicons.dev/icons/?i=bash",
  },
  { 
    name:"SQL",
    icon:"https://skillicons.dev/icons/?i=mysql",
  },
  {
    name: "MongoDB",
    icon: "https://letsprogram.in/assets/images/icons/mongodb.svg",
  },
  { 
    name:"Java",
    icon:"https://skillicons.dev/icons/?i=java",
  },
  { 
    name:"Terraform",
    icon:"https://skillicons.dev/icons/?i=terraform",
  },
  { 
    name:"Ansible",
    icon:"https://skillicons.dev/icons/?i=ansible",
  },
  {
    name:"AWS",
    icon:"https://skillicons.dev/icons/?i=aws",
  },
  {
    name:"Azure",
    icon:"https://skillicons.dev/icons/?i=azure",
  },
  {
    name:"Docker",
    icon:"https://skillicons.dev/icons/?i=docker",
  },
  {
    name:"Jenkins",
    icon:"https://skillicons.dev/icons/?i=jenkins",
  },
  {
    name:"Prometheus",
    icon:"https://skillicons.dev/icons/?i=prometheus",
  },
  {
    name:"Grafana",
    icon:"https://skillicons.dev/icons/?i=grafana",
  },
  {
    name:"SFTP",
    icon:"https://img.shields.io/badge/SFTP-0B3D91?style=flat-square&logo=internet-explorer&logoColor=white",
  },
  {
    name:"Connect",
    icon:"https://img.shields.io/badge/Connect_Direct-0055A4?style=flat-square&logo=ibm&logoColor=white",
  },
  {
    name:"MQ",
    icon:"https://skillicons.dev/icons/?i=rabbitmq",
  },
  {
    name:"Kafka",
    icon:"https://skillicons.dev/icons/?i=kafka",
  },
];

export const experiences = [
  {
    title: "Infrastructure Engineer",
    company_name: "OCBC Bank (Singapore)",
    icon: "https://companieslogo.com/img/orig/O39.SI_BIG-dde1ca6e.png?t=1729873664",
    iconBg: "#383E56",
    date: "December 2022 - Present",
    points: [
      // "Implemented Managed File Transfer Integration Solutions(MFT) for Distributed Systems using IBM Sterling Suite & Tectia to enable secure & automated data exchange & led B2B file transfers across 3000+ servers globally.",
      // "Designed solutions that handled 10,000+ daily transactions ensuring security and minimal downtime.",
      // "Configured integration tools, managed PGP, SSH, SSL keys/certs, worked on SFTP, FTPS, AS2, CD protocols.",
      // "Build Performance Testing Environment & developed scripts that automated deployment of 500+ services.",
      // "SOAP & Restful API Management on TIBCO tool along with MQ & Kafka connections for seamless integration.",
      // "Implemented & managed Linux-based systems, applied network fundamentals to optimize system security.",
      // "Optimised integration & reduced 20% onboarding time by documenting solutions, SOPs & issues on Confluence.",
      // "Created Shell Scripts to automate tasks & jobs via Control-M therefore reducing downtime by 30% effectively.",
      // "Minimized financial penalties by troubleshooting production issues via analysing server logs, and tools like Kibana.",
      // "Interacted with clients to gather requirements, ensure delivery, and maintain communication with stakeholders.",
      // "Utilized the Agile framework, participated in 50+ code reviews, collaborated with cross-functional teams.",
      // "Developed CI/CD pipelines with Jenkins to efficiently automate the entire application build, test, and deployment.",
      // "Implemented DevSecOps security testing in Azure DevOps pipelines by integrating CBOM (Crypto Bill of Materials) and SBOM (Software Bill of Materials). Used Podman for CBOM and Syft for SBOM for analysis.",
      // "Provisioned infrastructure using Terraform to automate Docker orchestration & EC2 creation in AWS.",      


      "Streamlined CI/CD pipelines with Jenkins on AWS, automating deployments via Argo CD, Kubernetes, Docker, reducing deployment time by 40% & optimizing cloud costs.",
      "Implemented Secure, Automated B2B Managed File Transfer(MFT) middleware solutions across 3000+ distributed systems using IBM Sterling Suite, Control-M, protocols like SFTP, FTPS, AS2, & Connect Direct.",
      "Developed & deployed scalable AWS cloud infrastructure using EC2, S3, EKS, Lambda, RDS, VPC, Route 53, DynamoDB, enhancing performance & reducing operational costs.",
      "Automated Infrastructure as Code (IaC) using Terraform, Ansible, CloudFormation, migrated on-premises applications to AWS, improved system monitoring with Kibana, CloudWatch, Grafana, & Prometheus.",
      "Designed SOAP & RESTful APIs on TIBCO, integrating with MQ & Kafka integration handling 10,000+ file transfers across Linux, AIX, and Windows environments."       
    ],
  },
  /*{
    title: "Cloud Infrastructure Specialist",
    company_name: "Siemens Healthineers (Bangalore)",
    icon: "https://companieslogo.com/img/orig/SHL.DE-ff92833b.png?t=1720244493",
    iconBg: "#383E56",
    date: "October 2022 - December 2022",
    points: [
      "Developed data flows on integration platform GoAnywhereMFT",
      "Developed CI/CD pipelines with Jenkins to efficiently automate the entire application build, test, and deployment.",
      "Coordinated across teams to ensure seamless integration, development and testing.",
      "Implemented TCP/IP protocols."
  ],
  },*/
  
  {
    title: "Senior System Engineer",
    company_name: "Infosys (Pune)",
    icon: "https://companieslogo.com/img/orig/INFY-bf47e1fb.png?t=1720244492",
    iconBg: "#383E56",
    date: "September 2019 - October 2022",
    points: [
      "Designed & built integration flows, creating over 200 routing channels, configured various templates, adapters, schedulers, mailboxes, while also developing robust business processes for data exchanges.",
      "Created Shell Scripts to automate tasks & jobs via Control-M therefore reducing downtime by 30% effectively.",
      "Onboarded 100+ partners with protocols like SFTP, FTPS, AS2, Connect Direct, for efficient file transfers.",
      "Documented on Confluence, conducted KT sessions, & led transitions to production with minimal downtime.",
    ],
  },
  // Add more experiences here over the time
];

export const projects = [
  {
    name: "NoteVault-DevOps-Powered-Todo-Application",
    description:
      "A production-grade Todo application demonstrating modern DevOps practices, complete with CI/CD pipelines, security scanning, and multiple deployment options.",
    tags: [
      {
        name: "Jenkins",
        color: "pink-text-gradient",
      },
      {
        name: "DevSecOps",
        color: "green-text-gradient",
      },
      {
        name: "CICD",
        color: "blue-text-gradient ",
      },
    ],
    image: "images/TODO.png",
    source_code_link: "https://github.com/nihharikadubey/NoteVault-DevOps-Powered-Todo-Application",
  },
  {
    name: "Wanderlust---Modern-Travel-Blog-Platform",
    description:
      "Wanderlust is a full-stack travel blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js) and deployed using modern DevOps practices. This project demonstrates end-to-end implementation of a production-grade application with robust CI/CD, security scanning, and monitoring.",
    tags: [
      {
        name: "Kubernetes",
        color: "pink-text-gradient",
      },
      {
        name: "Graphana",
        color: "green-text-gradient",
      },
      {
        name: "ArgoCD",
        color: "blue-text-gradient ",
      },
    ],
    image: "images/wanderlust.png",
    source_code_link: "https://github.com/nihharikadubey/Wanderlust---Modern-Travel-Blog-Platform",
  },
  {
    name: "KubeSecOps--Enterprise-Three-Tier-Application-Platform",
    description:
      "KubeSecOps is a comprehensive, enterprise-grade DevSecOps platform that demonstrates the implementation of a secure, scalable, and highly available three-tier application architecture. Built on AWS EKS.",
    tags: [
      {
        name: "Kubernetes",
        color: "blue-text-gradient",
      },
      {
        name: "MongoDB",
        color: "green-text-gradient",
      },
      {
        name: "CICD",
        color: "pink-text-gradient",
      },
    ],
    image: "images/kube.png",
    source_code_link: "https://github.com/nihharikadubey/KubeSecOps--Enterprise-Three-Tier-Application-Platform",
  },
];
