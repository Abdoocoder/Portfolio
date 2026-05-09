'use client';

import { motion } from "framer-motion";
import { Star } from 'lucide-react';
import { SectionHeading } from './section-heading';
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
        name: 'John Doe',
        role: 'Project Manager',
        company: 'Tech Solutions Inc.',
        content: 'Abdullah delivered exceptional work on our web application. His attention to detail and technical expertise made the project a huge success.',
        rating: 5,
    },
    {
        id: '2',
        name: 'Sarah Smith',
        role: 'CEO',
        company: 'Digital Innovations',
        content: 'Working with Abdullah was a pleasure. He understood our requirements perfectly and delivered beyond our expectations.',
        rating: 5,
    },
    {
        id: '3',
        name: 'Ahmed Hassan',
        role: 'CTO',
        company: 'StartupHub',
        content: 'Abdullah\'s full-stack development skills are outstanding. He built a robust and scalable solution for our platform.',
        rating: 5,
    },
];

export function TestimonialsSection() {
    return (
        <section className="py-20 sm:py-32 bg-background overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading className="text-center">What Clients Say</SectionHeading>
                <motion.p
                    className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Testimonials from satisfied clients I&apos;ve worked with
                </motion.p>

                <motion.div
                    className="mt-12 max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                    <Carousel opts={{ align: 'start', loop: true }} className="w-full">
                        <CarouselContent>
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                                    <motion.div
                                        whileHover={{ y: -6, boxShadow: "0 16px 32px rgba(0,0,0,0.1)" }}
                                        transition={{ type: "spring", stiffness: 280, damping: 20 }}
                                        className="h-full p-1"
                                    >
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
                                    </motion.div>
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
