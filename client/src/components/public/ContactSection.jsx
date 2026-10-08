import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import api from '../../api';
import toast from 'react-hot-toast';

const ContactSection = ({ contact, personal, profile }) => {
  const contactData = contact || {};
  const personalData = personal || profile || {};

  const email = contactData.email || personalData.email || 'rohithb.dev@gmail.com';
  const phone = contactData.phone || personalData.phone || '+91 98765 43210';
  const location = contactData.location || personalData.location || 'India';
  const title = contactData.title || 'Get In Touch';
  const subtitle = contactData.subtitle || "Let's Discuss Projects & Opportunities";
  const description =
    contactData.description ||
    'Have a question, job opportunity, or project proposal? Send a message directly and I will respond promptly.';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/messages', formData);
      toast.success(res.data.message || 'Message sent successfully!');
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact error:', err);
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {title}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            {subtitle}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Contact Details & Availability */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                Contact Information
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Feel free to connect directly through email, phone, or the contact form. I am currently open to internship offers and developer collaborations.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Email
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="block text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                {phone && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Phone
                      </span>
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="block text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>
                )}

                {location && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Location
                      </span>
                      <p className="text-sm font-semibold text-slate-800">
                        {location}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Status pill */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Immediate availability for interviews & technical discussions.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Your message is stored securely and sent directly to my dashboard inbox.
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-emerald-900 text-sm">Message Received!</h4>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="e.g. Software Engineer Internship Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
