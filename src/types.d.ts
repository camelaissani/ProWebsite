export type LevelType = 'novice' | 'intermediate' | 'advanced' | 'expert';
export type ProfileType = {
  name: string;
  pictureUrl: string;
  pictureSizePx: number;
  title: string;
  slogan: string;
  job: string;
  email: string;
  location: string;
  cvUrl: string;
  linkedInUrl: string;
  twitterUrl: string;
  githubUrl: string;
  intro: string;
  values: {
    name: string;
    logo: string;
  }[];
  codeSkills: {
    technology: string;
    level: LevelType;
  }[];
  frameworkLibrarySkills: {
    technology: string;
    level: LevelType;
  }[];
  experience: {
    job: string;
    company: {
      name: string;
      logoUrl: string;
      logoSizePx: number;
    };
    timeSpan: string;
    description: string;
  }[];
  education: {
    school: string;
    degree: string;
    timeSpan: string;
  }[];
  githubRepos: {
    endpoint: string;
    highlights: string[];
  }[];
  opensourceContributions: {
    title: string;
    description: string;
    url: string;
  }[];
};
