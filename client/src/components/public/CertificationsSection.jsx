import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, CheckCircle } from 'lucide-react';

const CertificationsSection = ({ certifications = [] }) => {
  return (
    <section id="certifications" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs uppercase tracking-widest font-mono mb-3">
            <Award className="w-3 h-3 text-cyan-400" />
            <span>06 // Credentials</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Licenses & <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
            Verified technical certifications and assessments.
          </p>
        </div>

        {/* Certifications Grid */}
        {certifications.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            Certifications will appear here once added.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-6 rounded-2xl bg-[#0E0E28]/70 backdrop-blur-xl border border-purple-500/20 hover:border-cyan-400/50 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.4)] group flex items-start justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    <span className="text-xs font-mono text-purple-300">
                      {cert.issuer}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>

                  <p className="text-xs font-mono text-slate-400">
                    Issued: {cert.issueDate || 'Verified'}
                  </p>

                  {cert.credentialId && (
                    <p className="text-[11px] font-mono text-slate-500">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 hover:text-white hover:bg-cyan-500/20 transition-colors shrink-0"
                    title="View Credential"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default CertificationsSection;
