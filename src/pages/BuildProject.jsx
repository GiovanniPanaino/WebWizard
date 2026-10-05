import { useSearchParams } from 'react-router-dom';
import BuilderHeader from '../components/builder/BuilderHeader';
import BuilderProgress from '../components/builder/BuilderProgress';
import ProjectStage from '../components/builder/ProjectStage';
import WebsitePreview from '../components/builder/WebsitePreview';
import { packages } from '../data/packages';
import '../styles/builder.css';

export default function BuildProject() {
  const [searchParams] = useSearchParams();
  const startingPackage = packages.find(item => item.id === searchParams.get('package'));

  return <div className="builder-page">
    <a className="skip-link" href="#builder-content">Skip to workshop</a>
    <BuilderHeader />
    <main id="builder-content" className="builder-main container" tabIndex={-1}>
      <div className="builder-intro">
        <div><p className="eyebrow">WEBSITE WORKSHOP</p><h1>BUILD YOUR WEBSITE</h1><p>Put the pieces together. We’ll turn your ideas into the real thing.</p></div>
        {startingPackage && <p className="builder-package"><span>STARTING FROM</span>{startingPackage.name}</p>}
      </div>
      <BuilderProgress />
      <div className="builder-workspace">
        <div className="builder-controls"><ProjectStage /></div>
        <WebsitePreview />
      </div>
    </main>
  </div>;
}
