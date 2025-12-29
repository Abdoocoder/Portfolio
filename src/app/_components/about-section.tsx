import Image from "next/image";
import { SectionHeading } from "./section-heading";

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <SectionHeading>About Me</SectionHeading>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I am an Information Technology specialist from Jordan with a passion for developing web systems that drive digital transformation. With a solid foundation in IT and ongoing studies in Business Administration, I bring a unique blend of technical expertise and strategic thinking to every project.
              </p>
              <p>
                My professional experience is rooted in the public sector, where I've focused on automating workflows and modernizing administrative systems. I thrive on analyzing complex processes and re-engineering them into efficient, user-centric digital solutions. My goal is to leverage technology to enhance organizational effectiveness and create seamless user experiences.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/my-photo.jpg"
              alt="Professional portrait of Abdullah Abu Sghaira"
              width={400}
              height={500}
              data-ai-hint="professional man"
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
