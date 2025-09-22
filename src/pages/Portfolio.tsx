'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import GhostCard from '@/components/cards/GhostCard';
import ProjectCard from '@/components/cards/ProjectCard';
import Pane from '@/components/Pane';
import Title from '@/components/Title';
import { useProfile } from '@/providers/ProfileProvider';
import type { ProfileType } from '@/types';

type GithubProjectType = {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  html_url: string;
  forks: number;
  fork: boolean;
  archived: boolean;
};

async function fetchGHProjects(repos: ProfileType['githubRepos'] | undefined) {
  if (repos === undefined) return [];

  try {
    const responses = await Promise.all(
      repos.map(({ endpoint }) =>
        axios.get<GithubProjectType[]>(endpoint, {
          headers: {
            Accept: 'application/vnd.github+json',
          },
        }),
      ),
    );

    return responses
      .reduce<GithubProjectType[]>((acc, { data }, index) => {
        data
          .filter(({ name }) => repos[index].highlights.includes(name))
          .forEach((project) => {
            acc.push(project);
          });
        return acc;
      }, [] as GithubProjectType[])
      .map(
        ({
          name,
          description,
          language,
          stargazers_count,
          html_url,
          forks,
          fork,
          archived,
        }) => ({
          name,
          description,
          language,
          stargazers_count,
          html_url,
          forks,
          fork,
          archived,
        }),
      );
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function Portfolio() {
  const profile = useProfile();

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<GithubProjectType[]>([]);

  useEffect(() => {
    async function init() {
      setLoading(true);
      const projects = await fetchGHProjects(profile?.githubRepos);
      setProjects(projects);
      setLoading(false);
    }
    if (profile?.githubRepos) {
      init();
    }
  }, [profile?.githubRepos]);

  return profile ? (
    <Pane className="py-10">
      <section className="pb-4 px-10 max-md:px-4">
        <Title>Side projects</Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {loading
            ? [...Array(6)].map((key) => <GhostCard key={key} />)
            : projects.map(
                ({
                  name,
                  description,
                  language,
                  stargazers_count,
                  html_url,
                }) => (
                  <ProjectCard
                    key={name}
                    title={name}
                    description={description}
                    language={language}
                    stars={stargazers_count}
                    href={`${html_url}#readme`}
                  />
                ),
              )}
        </div>
      </section>
      <section className="pb-4 px-10 max-md:px-4">
        <Title>Open source contributions</Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {profile.opensourceContributions.map(
            ({ title, description, url }) => (
              <ProjectCard
                key={title}
                title={title}
                description={description}
                href={url}
              />
            ),
          )}
        </div>
      </section>
    </Pane>
  ) : null;
}
