import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, ShieldCheck, CheckCircle } from 'lucide-react';

const CertificationsSection = ({ certifications = [] }) => {
  return (
    <section id="certifications" className="py-24 bg-slate-50 relative border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Credentials & Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Licenses & Certifications
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Verified technical certifications in full-stack web engineering, algorithms, and databases.
          </p>
        </div>

        {certifications.length === 0 ? (
          <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto">
            Certifications will appear here once added by the admin.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert._id || index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-blue-200 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    {cert.image && (
                      <img
                        src={cert.image}
                        alt={cert.organization}
                        className="h-7 max-w-[100px] object-contain opacity-80"
                      />
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors leading-snug mb-1.5">
                    {cert.name}
                  </h3>

                  <p className="text-sm font-medium text-slate-600 mb-4 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-500" />
                    {cert.organization}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {cert.issueDate}
                    </span>
                    {cert.credentialId && (
                      <span className="font-mono text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        ID: {cert.credentialId}
                      </span>
                    )}
                  </div>

                  {cert.certificateUrl && (
                    <a
                      href={cert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-semibold text-xs border border-slate-200 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Verify Credential
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default CertificationsSection;
