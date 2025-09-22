'use client';
import Image from 'next/image';
import { useMemo } from 'react';
import Card from '@/components/cards/Card';
import Pane from '@/components/Pane';
import Stepper from '@/components/Stepper';
import Title from '@/components/Title';
import { useProfile } from '@/providers/ProfileProvider';

export default function Resume() {
  const profile = useProfile();

  const [resumeValues, educationValues, companyLogo] = useMemo(() => {
    const companyLogo = new Map();
    const resumeValues =
      profile?.experience?.map(({ job, company, timeSpan, description }) => {
        companyLogo.set(company.name, {
          name: company.name,
          url: company.logoUrl,
          size: company.logoSizePx,
        });
        return {
          title: `${job} at ${company.name}`,
          subTitle: timeSpan,
          value: description,
        };
      }) || [];
    const educationValues =
      profile?.education?.map(({ school, degree, timeSpan }) => ({
        title: degree,
        subTitle: timeSpan,
        value: school,
      })) || [];
    return [resumeValues, educationValues, Array.from(companyLogo.values())];
  }, [profile?.education, profile?.experience]);

  return (
    <Pane className="py-10">
      <section className="px-10 max-md:px-4 pb-4">
        <Title>They trusted me</Title>
        <div className="grid grid-cols-5 max-md:grid-cols-3 gap-4 pt-8 pb-4">
          {companyLogo.map(({ name, url, size }) => (
            <Card
              key={name}
              className="flex items-center justify-center border-none"
            >
              <div className="flex items-center justify-center h-16">
                <Image
                  src={url}
                  alt={`${name} logo`}
                  height={size}
                  width={size}
                />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="pb-4 px-10 max-md:px-4">
        <Stepper
          className="ml-4 py-4"
          icon="icofont-briefcase-1"
          variant="resume"
          title="Experience"
          values={resumeValues}
        />
      </section>

      <section className="pb-4 px-10 max-md:px-4">
        <Stepper
          className="ml-4 py-4"
          icon="icofont-graduate"
          variant="resume"
          title="Education"
          values={educationValues}
        />
      </section>
    </Pane>
  );
}
