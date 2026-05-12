'use client';

import { Printer } from 'lucide-react';

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Firebase', 'Supabase', 'REST APIs'] },
  { category: 'Tools', items: ['Git', 'Vercel', 'VS Code', 'Figma'] },
  { category: 'Mobile', items: ['Flutter', 'React Native'] },
];

const experience = [
  {
    role: 'Full Stack Developer',
    company: 'Freelance / Self-Employed',
    period: '2023 — Present',
    items: [
      'Built and deployed 9+ production web applications using Next.js, React, and Firebase',
      'Developed an e-commerce marketplace serving hundreds of vendors (Madaba Women Market)',
      'Created a smart attendance system with real-time sync and comprehensive reporting dashboards',
      'Designed and implemented booking management systems with payment integration',
      'Built bilingual (Arabic/English) applications with full RTL support',
    ],
  },
];

const education = [
  {
    degree: 'Bachelor of Computer Science',
    institution: 'University of the People',
    period: '2023 — Present',
  },
];

const projects = [
  'Madaba Women Market — Next.js, Firebase, E-commerce marketplace',
  'Smart Attendance — React, Firebase, Real-time dashboard',
  'Madaba Halls — Next.js, Supabase, Booking system',
  'Sheikh Youssef — Next.js, Clerk, CMS platform',
];

export default function CVPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-6 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Printer className="w-4 h-4" />
            Save as PDF / Print
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden print:shadow-none print:border-none print:rounded-none">
          {/* Header */}
          <div className="px-10 pt-12 pb-8 print:pt-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Abdullah Abu Sghaira</h1>
                <p className="text-lg text-blue-600 dark:text-blue-400 mt-1">Full Stack Developer</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-sm text-gray-500 dark:text-gray-400">
                  <span>abdoocoder.dev</span>
                  <span>github.com/abdoocoder</span>
                  <span>linkedin.com/in/abdullah-abosagherah-64b37357</span>
                  <span>abdooraf3@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-10 pb-12 space-y-8 print:space-y-6">
            {/* Summary */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Summary</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Full Stack Developer with expertise in React, Next.js, TypeScript, and Firebase. 
                I build performant, accessible web applications with clean architecture and polished user experiences. 
                Experienced in developing bilingual (Arabic/English) applications, e-commerce platforms, 
                real-time dashboards, and booking management systems.
              </p>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Skills</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {skills.map((group) => (
                  <div key={group.category}>
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">{group.category}</h3>
                    <ul className="space-y-1">
                      {group.items.map((skill) => (
                        <li key={skill} className="text-sm text-gray-700 dark:text-gray-300">{skill}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.role}>
                  <div className="flex items-baseline justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{exp.role}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-400 dark:text-gray-500 shrink-0 ml-4">{exp.period}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.items.map((item, i) => (
                      <li key={i} className="text-sm text-gray-700 dark:text-gray-300 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-300 dark:before:bg-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Key Projects</h2>
              <ul className="space-y-1.5">
                {projects.map((project, i) => (
                  <li key={i} className="text-sm text-gray-700 dark:text-gray-300 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-300 dark:before:bg-gray-600">
                    {project}
                  </li>
                ))}
              </ul>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Education</h2>
              {education.map((edu) => (
                <div key={edu.degree} className="flex items-baseline justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{edu.degree}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500 shrink-0 ml-4">{edu.period}</span>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
