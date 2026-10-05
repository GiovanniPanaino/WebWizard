import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BuilderHeader from '../components/builder/BuilderHeader';
import BuilderProgress from '../components/builder/BuilderProgress';
import ProjectStage from '../components/builder/ProjectStage';
import BrandingStage from '../components/builder/BrandingStage';
import WebsitePreview from '../components/builder/WebsitePreview';
import { packages } from '../data/packages';
import { projectTypes } from '../data/projectTypes';
import '../styles/builder.css';

export default function BuildProject() {
  const [selectedProjectTypeId, setSelectedProjectTypeId] = useState(null);
  const [activeStage, setActiveStage] = useState('project');
  const [branding, setBranding] = useState({ businessName: '', tagline: '', brandColor: '#8e6b45', logo: null });
  const stageHeadingRef = useRef(null);
  const previousStageRef = useRef(activeStage);
  const logoUrl = branding.logo?.url;
  const brandingComplete = Boolean(branding.businessName.trim());

  useEffect(() => () => {
    if (logoUrl) URL.revokeObjectURL(logoUrl);
  }, [logoUrl]);

  useLayoutEffect(() => {
    if (previousStageRef.current !== activeStage) {
      stageHeadingRef.current?.focus({ preventScroll: true });
      previousStageRef.current = activeStage;
    }
  }, [activeStage]);

  function changeStage(stage) {
    if (!selectedProjectTypeId || !['project', 'branding'].includes(stage)) return;
    setActiveStage(stage);
  }

  function updateBranding(field, value) {
    setBranding(current => ({ ...current, [field]: value }));
  }

  function selectLogo(file) {
    updateBranding('logo', file ? { name: file.name, url: URL.createObjectURL(file) } : null);
  }
  const selectedProjectType = projectTypes.find(type => type.id === selectedProjectTypeId);
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
      <BuilderProgress projectComplete={Boolean(selectedProjectType)} brandingComplete={brandingComplete} activeStage={activeStage} onStageChange={changeStage} />
      <div className="builder-workspace">
        <div className="builder-controls">{activeStage === 'branding'
          ? <BrandingStage branding={branding} onChange={updateBranding} onLogoSelect={selectLogo} complete={brandingComplete} headingRef={stageHeadingRef} />
          : <ProjectStage selectedId={selectedProjectTypeId} onSelect={setSelectedProjectTypeId} onContinue={() => changeStage('branding')} headingRef={stageHeadingRef} />}</div>
        <WebsitePreview branding={branding} sections={selectedProjectType?.sections} projectType={selectedProjectType?.label} />
      </div>
    </main>
  </div>;
}
