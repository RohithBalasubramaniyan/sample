import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, ExternalLink, CheckCircle, Sparkles, X } from 'lucide-react';

const ResumeSection = ({ personal, resumeDetails, profile }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const personalData = personal || profile || {};
  const details = resumeDetails || {};

  const name = personalData.name || 'Rohith B';
  const resumeUrl = personalData.resume || personalData.resumeUrl || details.resumeUrl;
  const headline = details.headline || `${name}'s Official Resume`;

  const keyHighlights = details.highlights || [
    'Bachelor of Technology in Information Technology (VTU)',
    'Proficient in JavaScript (ES6+), React.js, Node.js, Express, and MongoDB',
    'Practical experience designing RESTful APIs and responsive Tailwind interfaces',
    'Version control with Git/GitHub, Clean Architecture, and Agile practices',
  ];

  return (
    <section id="resume" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Curriculum Vitae
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Resume & Professional Summary
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Preview or download my complete resume for a detailed view of my academic coursework, technical projects, and career milestones.
          </p>
        </div>

        {/* Resume Showcase Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                Updated & Ready for Review
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {headline}
              </h3>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                  Key Qualifications Highlight:
                </p>
                {keyHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                {resumeUrl ? (
                  <>
                    <a
                      href={resumeUrl}
                      download={`${name.replace(/\s+/g, '_')}_Resume.pdf`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>

                    <button
                      onClick={() => setIsPreviewOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all duration-200"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                  </>
                ) : (
                  <div className="text-sm text-slate-400 italic">
                    Resume file is being updated. Available upon request.
                  </div>
                )}
              </div>
            </div>

            {/* Right Mini Preview Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={() => resumeUrl && setIsPreviewOpen(true)}
                className={`w-56 sm:w-64 aspect-[1/1.4] bg-white rounded-2xl p-5 shadow-2xl text-slate-800 flex flex-col justify-between transform transition-all duration-300 border-4 border-slate-700/60 ${
                  resumeUrl ? 'cursor-pointer hover:scale-105 hover:rotate-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b pb-3 mb-3">
                    <div>
                      <div className="font-bold text-sm text-slate-900">{name}</div>
                      <div className="text-[10px] text-blue-600 font-medium">
                        {personalData.role || personalData.title || 'Software Engineer'}
                      </div>
                    </div>
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-200 rounded-full w-full"></div>
                    <div className="h-2 bg-slate-100 rounded-full w-4/5"></div>
                    <div className="h-2 bg-slate-100 rounded-full w-3/4"></div>
                    <div className="h-2 bg-slate-200 rounded-full w-full mt-4"></div>
                    <div className="h-2 bg-slate-100 rounded-full w-5/6"></div>
                  </div>
                </div>

                <div className="pt-4 border-t flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span>PDF Document</span>
                  <span className="text-blue-600 flex items-center gap-1">
                    Click to view <Eye className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Modal Preview */}
      {isPreviewOpen && resumeUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 w-full max-w-4xl h-[85vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-slate-700">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-400" />
                <h4 className="text-white font-bold text-sm sm:text-base">
                  {name} - Resume Preview
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-800">
              <iframe
                src={resumeUrl}
                title="Resume PDF"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResumeSection;
