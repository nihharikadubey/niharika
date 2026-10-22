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
    name: "Google Cloud",
    icon: "https://skillicons.dev/icons/?i=gcp",
  },
  {
    name: "Python",
    icon: "https://skillicons.dev/icons/?i=python",
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
    icon: "https://skillicons.dev/icons?i=mongodb",
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
    name:"Docker",
    icon:"https://skillicons.dev/icons/?i=docker",
  },
  {
    name:"Jenkins",
    icon:"https://skillicons.dev/icons/?i=jenkins",
  },
  {
    name:"SFTP",
    icon:"https://img.shields.io/badge/SFTP-0B3D91?style=flat-square&logo=internet-explorer&logoColor=white",
  },
  {
    name:"Connect",
    icon:"https://img.shields.io/badge/Connect_Direct-0055A4?style=flat-square&logo=ibm&logoColor=white",
  },
];

export const experiences = [
  {
    title: "Senior DevOps Engineer",
    company_name: "HSBC Bank (Bangalore)",
    icon: "hsbc.png",
    iconBg: "#383E56",
    date: "April 2025 - Present",
    points: [
      "Built CI/CD pipelines with Jenkins to onboard applications and deploy & auto-scale them on Kubernetes (Google Cloud Platform).",
      "Worked on Docker and Kubernetes manifests, using Helm charts to deploy applications like BigID & Datavisa.",
      "Deployed application releases from Development into Production and performed health checks after each release.",
      "Managed infrastructure as code with Terraform, updating Windows & SQL Server images to resolve violations.",
      "Set up monitoring & alerting, fixed cloud security violations, renewed SSL certificates via Venafi, integrated HashiCorp Vault with SAML SSO, optimized cloud costs, and managed version control via Git & GCR.",
    ],
  },
  {
    title: "Infrastructure Engineer",
    company_name: "OCBC Bank (Singapore)",
    icon: "https://companieslogo.com/img/orig/O39.SI_BIG-dde1ca6e.png?t=1729873664",
    iconBg: "#383E56",
    date: "December 2022 - March 2025",
    points: [
      "Implemented Managed File Transfer (MFT) middleware with IBM Sterling Suite & Tectia, enabling secure automated data exchange and B2B file transfers across 3000+ on-prem servers.",
      "Configured integration tools and managed PGP, SSH & SSL keys/certificates across SFTP, FTPS, AS2 and Connect:Direct protocols.",
      "Designed & deployed middleware applications handling 10,000+ daily file transfers on Linux & Windows.",
      "Managed SOAP & RESTful APIs on Tibco and minimized financial penalties by troubleshooting production issues via server logs and Kibana.",
      "Built CI/CD pipelines to onboard & deploy apps on Kubernetes using Jenkins & Docker; cut onboarding time by 20% and incident resolution time by 25% via SOPs and proactive issue management on Jira & Confluence.",
    ],
  },
  {
    title: "Senior System Engineer",
    company_name: "Infosys (Pune)",
    icon: "https://companieslogo.com/img/orig/INFY-bf47e1fb.png?t=1720244492",
    iconBg: "#383E56",
    date: "September 2019 - October 2022",
    points: [
      "Designed & built integration flows on IBM Sterling Suite (Sterling Integrator, File Gateway, Connect:Direct) — creating routing channels, templates, adapters, schedulers, mailboxes and robust business processes for data exchange.",
      "Onboarded 100+ partners with protocols like SFTP, FTPS, AS2 and Connect:Direct, gathering requirements and maintaining communication with clients & stakeholders.",
      "Created technical documentation in Confluence, conducted KT sessions, led transitions to production and participated in 50+ code reviews.",
    ],
  },
  // Add more experiences here over the time
];

export const projects = [
  {
    name: "Deploy Kubernetes Apps on Google Cloud",
    description:
      "Google Cloud Skills Boost skill badge (Oct 2026) — deploying and managing containerized applications on Google Kubernetes Engine (GKE): building images, rolling out Deployments, scaling workloads, and exposing Services.",
    tags: [
      {
        name: "Google Cloud",
        color: "blue-text-gradient",
      },
      {
        name: "GKE",
        color: "green-text-gradient",
      },
      {
        name: "Kubernetes",
        color: "pink-text-gradient",
      },
    ],
    image: "images/gcp-gke-deploy.svg",
    source_code_link: "https://www.skills.google/public_profiles/0e183ac0-2668-4d0a-bb62-6ece9104b00c",
  },
  {
    name: "Google Cloud Arcade — Base Camp",
    description:
      "Google Cloud Arcade program (Base Camp, Aug 2026) — hands-on labs and gaming challenges earning Arcade points and skill badges across Google Cloud services.",
    tags: [
      {
        name: "Google Cloud",
        color: "blue-text-gradient",
      },
      {
        name: "Arcade",
        color: "green-text-gradient",
      },
      {
        name: "Hands-on Labs",
        color: "pink-text-gradient",
      },
    ],
    image: "images/gcp-arcade.svg",
    source_code_link: "https://www.skills.google/public_profiles/0e183ac0-2668-4d0a-bb62-6ece9104b00c",
  },
  {
    name: "Monitoring in Google Cloud",
    description:
      "Google Cloud Skills Boost skill badge (Aug 2026) — Cloud Operations: building dashboards, metrics and uptime checks, configuring alerting policies, and using Cloud Logging & Cloud Monitoring for observability.",
    tags: [
      {
        name: "Google Cloud",
        color: "blue-text-gradient",
      },
      {
        name: "Cloud Monitoring",
        color: "green-text-gradient",
      },
      {
        name: "Observability",
        color: "pink-text-gradient",
      },
    ],
    image: "images/gcp-monitoring.svg",
    source_code_link: "https://www.skills.google/public_profiles/0e183ac0-2668-4d0a-bb62-6ece9104b00c",
  },
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
        name: "MongoDB",
        color: "green-text-gradient",
      },
      {
        name: "CICD",
        color: "blue-text-gradient ",
      },
    ],
    image: "images/wanderlust.png",
    source_code_link: "https://github.com/nihharikadubey/Wanderlust---Modern-Travel-Blog-Platform",
  },
  {
    name: "KubeSecOps--Enterprise-Three-Tier-Application-Platform",
    description:
      "KubeSecOps is a comprehensive, enterprise-grade DevSecOps platform that demonstrates the implementation of a secure, scalable, and highly available three-tier application architecture. Built on Kubernetes.",
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
