import { Building2, Utensils, BriefcaseBusiness, Images, Package, CalendarDays, Blocks } from 'lucide-react';

const projectTypes = [
  { label: 'BUSINESS WEBSITE', icon: Building2 },
  { label: 'RESTAURANT / HOSPITALITY', icon: Utensils },
  { label: 'SERVICES', icon: BriefcaseBusiness },
  { label: 'PORTFOLIO', icon: Images },
  { label: 'CATALOGUE', icon: Package },
  { label: 'BOOKING / APPOINTMENTS', icon: CalendarDays },
  { label: 'CUSTOM', icon: Blocks },
];

export default function ProjectStage() {
  return <section className="builder-project-stage" aria-labelledby="builder-project-heading">
    <p className="builder-stage-label"><span>01</span> PROJECT</p>
    <h2 id="builder-project-heading">What are we building?</h2>
    <p className="builder-stage-description" id="builder-options-note">Choose the type of website you'd like to create.</p>
    <ul className="builder-options" aria-describedby="builder-options-note">
      {projectTypes.map(({ label, icon: Icon }) => <li key={label}>
        <button className="builder-option" type="button" disabled><Icon aria-hidden="true" /><span>{label}</span></button>
      </li>)}
    </ul>
  </section>;
}
