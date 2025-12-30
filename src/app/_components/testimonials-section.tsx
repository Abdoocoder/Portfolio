'use client';

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
        <section className="py-20 sm:py-32 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading className="text-center">What Clients Say</SectionHeading>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground text-center">
                    Testimonials from satisfied clients I&apos;ve worked with
                </p>

                <div className="mt-12 max-w-5xl mx-auto">
                    <Carousel
                        opts={{
                            align: 'start',
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {testimonials.map((testimonial) => (
                                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                                    <Card className="p-6 h-full flex flex-col">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                                <AvatarFallback>
                                                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-semibold">{testimonial.name}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {testimonial.role} at {testimonial.company}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-1 mb-4">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < testimonial.rating
                                                        ? 'fill-primary text-primary'
                                                        : 'text-muted-foreground'
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        <p className="text-muted-foreground flex-grow">
                                            &ldquo;{testimonial.content}&rdquo;
                                        </p>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
