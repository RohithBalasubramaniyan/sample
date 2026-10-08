import React from 'react';
import * as Icons from 'lucide-react';
import { Github, Linkedin, Twitter, Instagram } from './BrandIcons';

const iconMap = {
  // Common tech & skill icons
  code: Icons.Code,
  atom: Icons.Atom,
  palette: Icons.Palette,
  layout: Icons.Layout,
  server: Icons.Server,
  cpu: Icons.Cpu,
  database: Icons.Database,
  gitbranch: Icons.GitBranch,
  layers: Icons.Layers,
  terminal: Icons.Terminal,
  filecode: Icons.FileCode,
  globe: Icons.Globe,
  laptop: Icons.Laptop,
  smartphone: Icons.Smartphone,
  shield: Icons.Shield,
  cloud: Icons.Cloud,
  
  // Social & contact
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  mail: Icons.Mail,
  phone: Icons.Phone,
  mapPin: Icons.MapPin,
  externalLink: Icons.ExternalLink,

  // General & portfolio
  user: Icons.User,
  briefcase: Icons.Briefcase,
  graduationcap: Icons.GraduationCap,
  award: Icons.Award,
  bookopen: Icons.BookOpen,
  filetext: Icons.FileText,
  download: Icons.Download,
  send: Icons.Send,
  check: Icons.Check,
  sparkles: Icons.Sparkles,
};

const DynamicIcon = ({ name, className = 'w-5 h-5', ...props }) => {
  if (!name) return <Icons.Code className={className} {...props} />;
  
  // Look up case-insensitively
  const cleanKey = name.toLowerCase().replace(/[^a-z]/g, '');
  const IconComponent = iconMap[cleanKey] || Icons[name] || Icons.Code;

  return <IconComponent className={className} {...props} />;
};

export default DynamicIcon;
