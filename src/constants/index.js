  //TODO: integrate the data from the backend
export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "experience",
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
];

export const technologies = [
  {
    name: "MongoDB",
    icon: "https://letsprogram.in/assets/images/icons/mongodb.svg",
  },
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
      "Implemented MFT solutions using IBM Sterling Suite & Tectia, managing B2B file transfers across 3000+ servers and 10,000+ daily transactions.",  
      "Automated deployments using Shell scripts, Control-M, and Terraform, reducing downtime by 30% and optimizing onboarding time by 20%.",  
      "Designed and managed SOAP & RESTful APIs on TIBCO, integrating with MQ & Kafka while implementing DevSecOps security testing in Azure DevOps.",  
      "Monitored and troubleshot production issues using Kibana and Grafana, optimizing system security and minimizing financial penalties.",  
      "Developed CI/CD pipelines using Jenkins, collaborated with cross-functional teams, and participated in 50+ code reviews for efficient delivery."  
    ],
  },
  {
    title: "Cloud Infrastructure Specialist",
    company_name: "Siemens Healthineers (Bangalore)",
    icon: "https://companieslogo.com/img/orig/SHL.DE-ff92833b.png?t=1720244493",
    iconBg: "#383E56",
    date: "October 2022 - December 2022",
    points: [
      "Developed data flows on integration platform GoAnywhereMFT",
      "Coordinated across teams to ensure seamless integration, development and testing",
      "Implemented TCP/IP protocols"
  ],
  },
  {
    title: "Senior System Engineer",
    company_name: "Infosys (Pune)",
    icon: "https://companieslogo.com/img/orig/INFY-bf47e1fb.png?t=1720244492",
    iconBg: "#383E56",
    date: "September 2019 - October 2022",
    points: [
      "Designed & built integration flows, creating over 200 routing channels, configured various templates, adapters, schedulers, and mailboxes, while also developing robust business processes for data exchanges.",
      "Onboarded 100+ partners with protocols like SFTP, FTPS, AS2, and Connect Direct, for efficient file transfers.",
      "Documented on Confluence, conducted KT sessions, & led transitions to production with minimal downtime",
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
        name: "angular",
        color: "pink-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "blue-text-gradient ",
      },
    ],
    image: "images/aicontentgenerator.png",
    source_code_link: "https://github.com/nihharikadubey/NoteVault-DevOps-Powered-Todo-Application",
  },
  {
    name: "Wanderlust---Modern-Travel-Blog-Platform",
    description:
      "Wanderlust is a full-stack travel blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js) and deployed using modern DevOps practices. This project demonstrates end-to-end implementation of a production-grade application with robust CI/CD, security scanning, and monitoring.",
    tags: [
      {
        name: "angular",
        color: "pink-text-gradient",
      },
      {
        name: "python",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "blue-text-gradient ",
      },
    ],
    image: "images/socialmediaresizer.png",
    source_code_link: "https://github.com/nihharikadubey/Wanderlust---Modern-Travel-Blog-Platform",
  },
  {
    name: "KubeSecOps--Enterprise-Three-Tier-Application-Platform",
    description:
      "KubeSecOps is a comprehensive, enterprise-grade DevSecOps platform that demonstrates the implementation of a secure, scalable, and highly available three-tier application architecture. Built on AWS EKS.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: "images/scrumpoker.png",
    source_code_link: "https://github.com/nihharikadubey/KubeSecOps--Enterprise-Three-Tier-Application-Platform",
  },
];
