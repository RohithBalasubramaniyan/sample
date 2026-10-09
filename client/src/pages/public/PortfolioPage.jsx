import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import HeroSection from '../../components/public/HeroSection';
import AboutSection from '../../components/public/AboutSection';
import SkillsSection from '../../components/public/SkillsSection';
import ProjectsSection from '../../components/public/ProjectsSection';
import EducationSection from '../../components/public/EducationSection';
import ExperienceSection from '../../components/public/ExperienceSection';
import CertificationsSection from '../../components/public/CertificationsSection';
import ResumeSection from '../../components/public/ResumeSection';
import ContactSection from '../../components/public/ContactSection';
import portfolioData from '../../data/portfolioData';
import api from '../../api';

const PortfolioPage = () => {
  const [personal, setPersonal] = useState(portfolioData.personal);
  const [about, setAbout] = useState(portfolioData.about);
  const [skills, setSkills] = useState(portfolioData.skills);
  const [projects, setProjects] = useState(portfolioData.projects);
  const [education, setEducation] = useState(portfolioData.education);
  const [experience, setExperience] = useState(portfolioData.experience);
  const [certifications, setCertifications] = useState(portfolioData.certifications);
  const [resumeDetails, setResumeDetails] = useState(portfolioData.resumeDetails);
  const [socialLinks, setSocialLinks] = useState(portfolioData.socialLinks);
  const [contact, setContact] = useState(portfolioData.contact);

  useEffect(() => {
    let isMounted = true;

    const fetchAllDynamicData = async () => {
      try {
        const [
          profileRes,
          skillsRes,
          projectsRes,
          educationRes,
          experienceRes,
          certificationsRes,
          socialLinksRes,
        ] = await Promise.allSettled([
          api.get('/profile'),
          api.get('/skills'),
          api.get('/projects'),
          api.get('/education'),
          api.get('/experience'),
          api.get('/certifications'),
          api.get('/social-links'),
        ]);

        if (!isMounted) return;

        if (profileRes.status === 'fulfilled' && profileRes.value?.data) {
          const p = profileRes.value.data;
          setPersonal((prev) => ({
            ...prev,
            name: p.name || prev.name,
            role: p.title || prev.role,
            title: p.title || prev.title,
            email: p.email || prev.email,
            phone: p.phone || prev.phone,
            location: p.location || prev.location,
            profileImage: p.profileImage || prev.profileImage,
            resume: p.resumeUrl || prev.resume,
            resumeUrl: p.resumeUrl || prev.resumeUrl,
            bio: p.bio || prev.bio,
            tagline: p.tagline || p.bio || prev.tagline,
            statusBadge: p.statusBadge || prev.statusBadge,
            greeting: p.greeting || prev.greeting || 'Hello, I am',
            workType: p.workType || prev.specialization,
            specialization: p.workType || prev.specialization,
            viewProjectsText: p.viewProjectsText || 'View Projects',
            viewResumeText: p.viewResumeText || 'Download Resume',
            careerObjective: p.careerObjective || prev.careerObjective,
            interests: p.interests?.length > 0 ? p.interests : prev.interests,
            currentLearning: p.currentLearning?.length > 0 ? p.currentLearning : prev.currentLearning,
            aboutTitle: p.aboutTitle || prev.aboutTitle,
            aboutSubtitle: p.aboutSubtitle || prev.aboutSubtitle,
            aboutDescription: p.aboutDescription || prev.aboutDescription,
          }));

          setAbout((prev) => ({
            ...prev,
            title: p.aboutTitle || prev.title,
            aboutTitle: p.aboutTitle || prev.title,
            subtitle: p.aboutSubtitle || prev.subtitle,
            aboutSubtitle: p.aboutSubtitle || prev.subtitle,
            description: p.aboutDescription || p.bio || prev.description,
            aboutDescription: p.aboutDescription || prev.description,
            careerObjective: p.careerObjective || prev.careerObjective,
            interests: p.interests?.length > 0 ? p.interests : prev.interests,
            currentLearning: p.currentLearning?.length > 0 ? p.currentLearning : prev.currentLearning,
          }));

          setContact((prev) => ({
            ...prev,
            email: p.email || prev.email,
            phone: p.phone || prev.phone,
            location: p.location || prev.location,
          }));
        }

        if (skillsRes.status === 'fulfilled' && Array.isArray(skillsRes.value?.data) && skillsRes.value.data.length > 0) {
          setSkills(skillsRes.value.data);
        }
        if (projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value?.data) && projectsRes.value.data.length > 0) {
          setProjects(projectsRes.value.data);
        }
        if (educationRes.status === 'fulfilled' && Array.isArray(educationRes.value?.data) && educationRes.value.data.length > 0) {
          setEducation(educationRes.value.data);
        }
        if (experienceRes.status === 'fulfilled' && Array.isArray(experienceRes.value?.data) && experienceRes.value.data.length > 0) {
          setExperience(experienceRes.value.data);
        }
        if (certificationsRes.status === 'fulfilled' && Array.isArray(certificationsRes.value?.data) && certificationsRes.value.data.length > 0) {
          setCertifications(certificationsRes.value.data);
        }
        if (socialLinksRes.status === 'fulfilled' && Array.isArray(socialLinksRes.value?.data) && socialLinksRes.value.data.length > 0) {
          setSocialLinks(socialLinksRes.value.data);
        }
      } catch (err) {
        console.warn('Backend offline or fetching error, using cached portfolio data:', err);
      }
    };

    fetchAllDynamicData();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A18] text-[#F0F0FF] relative overflow-hidden font-sans selection:bg-purple-500/40 selection:text-white">
      {/* Ambient background glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-[20%] right-[-10%] w-[550px] h-[550px] rounded-full bg-cyan-500/12 blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-violet-600/10 blur-[160px] pointer-events-none -z-10" />
      
      <Navbar personal={personal} profile={personal} />
      <main className="flex-1 relative z-10">
        <HeroSection personal={personal} profile={personal} socialLinks={socialLinks} />
        <AboutSection about={about} personal={personal} profile={personal} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <EducationSection education={education} />
        <ExperienceSection experience={experience} />
        <CertificationsSection certifications={certifications} />
        <ResumeSection personal={personal} profile={personal} resumeDetails={resumeDetails} />
        <ContactSection contact={contact} personal={personal} profile={personal} />
      </main>
      <Footer personal={personal} profile={personal} socialLinks={socialLinks} />
    </div>
  );
};

export default PortfolioPage;
