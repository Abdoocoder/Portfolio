'use client';

import { motion, useReducedMotion } from "framer-motion";
import { Star } from 'lucide-react';
import { SectionHeading } from './section-heading';
import { useContext } from 'react';
import { LanguageContext } from '../context/language-context';
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    avatar?: string;
}

const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Mohammad Al-Zoubi',
        role: 'Project Manager',
        company: 'Madaba Women Market',
        content: 'Abdullah built our entire e-commerce platform from scratch. The marketplace handles hundreds of vendors seamlessly, and his Firebase integration made inventory management effortless. The project was delivered on time and exceeded our expectations.',
        rating: 5,
    },
    {
        id: '2',
        name: 'Dr. Khalid Al-Rawashdeh',
        role: 'Academic Director',
        company: 'Attendance System Project',
        content: 'The smart attendance system Abdullah developed transformed how we track student participation. The dashboard is intuitive, the reporting is comprehensive, and the real-time sync across devices works flawlessly. Highly recommended.',
        rating: 5,
    },
    {
        id: '3',
        name: 'Youssef Al-Husseini',
        role: 'Venue Owner',
        company: 'Madaba Halls',
        content: 'Abdullah created a complete booking management system for our event halls. The online reservation flow, payment integration, and calendar management saved us countless hours of manual work. Professional and talented.',
        rating: 5,
    },
];

function FloatingCard({ children, index }: { children: React.ReactNode; index: number }) {
    const prefersReducedMotion = useReducedMotion();
    if (prefersReducedMotion) {
        return <div className="h-full p-1"><div className="hover:translate-y-[-10px] hover:scale-[1.01] transition-transform duration-300">{children}</div></div>;
    }
    return (
        <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
                duration: 4 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
            }}
            whileHover={{ y: -10, scale: 1.01 }}
            className="h-full p-1"
        >
            {children}
        </motion.div>
    );
}

export function TestimonialsSection() {
    const { language } = useContext(LanguageContext);
    const translations = language === 'ar' ? arTranslations.testimonials : enTranslations.testimonials;
    return (
        <section role="region" aria-label="Testimonials" className="py-20 sm:py-32 bg-background overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading className="text-center">{translations.title}</SectionHeading>
                <motion.p
                    className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {translations.subtitle}
                </motion.p>

                <motion.div
                    className="mt-12 max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                    <Carousel opts={{ align: 'start', loop: true }} className="w-full" aria-label="Testimonials carousel">
                        <CarouselContent>
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                                    <FloatingCard index={index}>
                                        <Card className="p-6 h-full flex flex-col">
                                            <div className="flex items-center gap-4 mb-4">
                                                <motion.div
                                                    initial={{ scale: 0, rotate: -10 }}
                                                    whileInView={{ scale: 1, rotate: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ type: "spring", stiffness: 250, delay: 0.1 * index }}
                                                >
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                                        <AvatarFallback>
                                                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </motion.div>
                                                <div>
                                                    <h4 className="font-semibold">{testimonial.name}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {testimonial.role} at {testimonial.company}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-1 mb-4">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: 0.05 * i + 0.2 * index, type: "spring" }}
                                                    >
                                                        <Star
                                                            className={`h-4 w-4 ${i < testimonial.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                                                        />
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <p className="text-muted-foreground flex-grow">
                                                &ldquo;{testimonial.content}&rdquo;
                                            </p>
                                        </Card>
                                    </FloatingCard>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </motion.div>
            </div>
        </section>
    );
}
