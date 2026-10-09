import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, X, CheckCircle, ExternalLink } from 'lucide-react';

const ResumeSection = ({ personal, resumeDetails, profile }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const personalData = personal || profile || {};
  const details = resumeDetails || {};

  const name = personalData.name || 'Rohith B';
  const resumeUrl = personalData.resume || personalData.resumeUrl || details.resumeUrl;
  const headline = details.headline || `${name}'s Technical Resume`;

  const keyHighlights = details.highlights || [
    'B.Tech Information Technology degree with strong engineering principles',
    'Full-Stack competence with React.js, Node.js, Express, and MongoDB',
    'Designing scalable REST APIs and modern responsive user experiences',
    'Strong focus on performance, code cleanlines, and modern UI engineering',
  ];

  return (
    <>
      <section id="resume" className="py-24 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-5xl mx-auto z-10 relative">
          
          {/* Header */}
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs uppercase tracking-widest font-mono mb-3">
              <FileText className="w-3 h-3 text-cyan-400" />
              <span>07 // Document</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Curriculum <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Vitae</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Download or view my complete technical resume and qualifications.
            </p>
          </div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-10 rounded-2xl bg-[#0E0E28]/80 backdrop-blur-xl border border-purple-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-2xl font-bold text-white">
                  {headline}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Looking for a full-stack developer who brings high attention to detail, modern styling, and clean API architecture? Here is a breakdown of my qualifications:
                </p>

                <ul className="space-y-2.5 pt-2">
                  {keyHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4 items-stretch justify-center">
                {resumeUrl ? (
                  <>
                    <a
                      href={resumeUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 px-6 rounded-full font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-[0_0_20px_rgba(155,93,229,0.5)] flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Resume (PDF)</span>
                    </a>

                    <button
                      onClick={() => setIsPreviewOpen(true)}
                      className="w-full py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider text-slate-200 bg-[#121232] border border-purple-500/30 hover:border-cyan-400 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-cyan-400" />
                      <span>Preview in Browser</span>
                    </button>
                  </>
                ) : (
                  <div className="p-4 rounded-xl bg-[#121232] border border-purple-500/20 text-center">
                    <p className="text-xs text-slate-400">
                      Resume PDF will be made available shortly.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && resumeUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl h-[85vh] bg-[#0E0E28] border border-purple-500/30 rounded-2xl overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20">
                <span className="text-sm font-bold text-white">Resume Preview</span>
                <div className="flex items-center gap-3">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    Open in new tab <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="p-1 rounded-full text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <iframe src={resumeUrl} className="w-full flex-1" title="Resume" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResumeSection;
