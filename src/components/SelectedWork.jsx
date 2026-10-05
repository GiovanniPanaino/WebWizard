import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectMedia from './ProjectMedia';
import '../styles/selected-work.css';

function ProjectActions({ project }) {
  const externalActions = [
    { url: project.liveUrl, label: 'VIEW LIVE' },
    { url: project.demoUrl, label: 'VIEW DEMO' },
  ].filter(action => action.url);
  if (!externalActions.length && !project.caseStudyUrl) return null;
  return <div className="project-actions">
    {externalActions.map(action => <a key={action.label} className="button" href={action.url} target="_blank" rel="noopener noreferrer" aria-label={`${action.label}: ${project.title} (opens in a new tab)`}>{action.label}<ArrowUpRight aria-hidden="true" /></a>)}
    {project.caseStudyUrl && <Link className="button" to={project.caseStudyUrl} aria-label={`View project: ${project.title}`}>VIEW PROJECT<ArrowUpRight aria-hidden="true" /></Link>}
  </div>;
}

export default function SelectedWork() {
  return <section id="portfolio" className="selected-work container" aria-labelledby="work-heading">
    <header className="work-intro">
      <p className="eyebrow">SELECTED WORK</p>
      <h2 id="work-heading">Built for real<br />business requirements.</h2>
      <p>A selection of websites, applications and business systems designed around specific operational and customer needs.</p>
    </header>
    <div className="work-projects">{projects.map(project => <article key={project.id} className={`work-project work-project--${project.media.variant}`} aria-labelledby={`${project.id}-title`}>
      <div className="project-meta"><span className="project-category"><span aria-hidden="true">{project.number} / </span>{project.category}</span><span className="project-status">{project.status}</span></div>
      <h3 id={`${project.id}-title`}>{project.title}</h3>
      <ProjectMedia media={project.media} />
      <div className="project-copy">
        <p className="project-description">{project.description}</p>
        <ul className="project-capabilities" aria-label={`${project.title} capabilities`}>{project.capabilities.map(capability => <li key={capability}>{capability}</li>)}</ul>
        {project.technologies.length > 0 && <ul className="project-technologies" aria-label={`${project.title} technologies`}>{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>}
        <ProjectActions project={project} />
      </div>
    </article>)}</div>
  </section>;
}
