import { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import Card from '../components/Card';
import Pane from '../components/Pane';
import ProfileContext from '../components/ProfileContext';
import Title from '../components/Title';

async function fetchGHProjects(repos) {
  try {
    const orgs = await Promise.all(
      repos.map(({ endpoint }) =>
        axios.get(endpoint, { Accept: 'application/vnd.github+json' })
      )
    );

    return orgs
      .reduce((acc, { data }, index) => {
        return [
          ...acc,
          ...data.filter(({ name }) => repos[index].highlights.includes(name)),
        ];
      }, [])
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
        })
      );
  } catch (error) {
    console.error(error);
    return [];
  }
}

function GhostCard() {
  return (
    <Card className="h-48 px-4 py-2">
      <div className="flex flex-col space-y-6 py-1 animate-pulse">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-gray-300 rounded col-span-2"></div>
          <div className="h-2 bg-gray-300 rounded col-span-1"></div>
        </div>
        <div className="space-y-3">
          <div className="h-2 bg-gray-300 rounded"></div>
          <div className="h-2 bg-gray-300 rounded"></div>
          <div className="h-2 bg-gray-300 rounded"></div>
          <div className="h-2 bg-gray-300 rounded"></div>
        </div>
      </div>
    </Card>
  );
}

function ProjectCard({ title, description, language, stars, href }) {
  return (
    <Card className="h-48" href={href}>
      <div className="flex justify-between rounded-t-md m-0 px-4 py-2">
        <h4 className="font-medium">{title}</h4>
        {stars > 0 ? (
          <div className="flex items-center">
            <i className="icofont icofont-star text-yellow-500 mr-0.5"></i>
            <span className="text-sm font-medium text-gray-500">{stars}</span>
          </div>
        ) : null}
      </div>
      <p className="mt-1 mb-4 px-4 text-gray-600 text-sm">{language}</p>
      <p className="px-4 mb-4 text-gray-500 text-sm">{description}</p>
    </Card>
  );
}

export default function Portfolio() {
  const profile = useContext(ProfileContext);

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function init() {
      setLoading(true);
      const projects = await fetchGHProjects(profile.githubRepos);
      setProjects(projects);
      setLoading(false);
    }
    init();
  }, [profile.githubRepos]);

  return (
    <Pane className="py-10">
      <section className="pb-4 px-10 max-md:px-4">
        <Title>Side projects</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {loading
            ? [1, 2, 3, 4, 5, 6, 7].map((key) => <GhostCard key={key} />)
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
                )
              )}
        </div>
      </section>
      <section className="pb-4 px-10 max-md:px-4">
        <Title>Open source contributions</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {profile.opensourceContributions.map(
            ({ title, description, url }) => (
              <ProjectCard
                key={title}
                title={title}
                description={description}
                href={url}
              />
            )
          )}
        </div>
      </section>
    </Pane>
  );
}
