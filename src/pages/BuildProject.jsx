import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BuilderHeader from '../components/builder/BuilderHeader';
import BuilderProgress from '../components/builder/BuilderProgress';
import ProjectStage from '../components/builder/ProjectStage';
import BrandingStage from '../components/builder/BrandingStage';
import SectionsStage from '../components/builder/SectionsStage';
import FeaturesStage from '../components/builder/FeaturesStage';
import WebsitePreview from '../components/builder/WebsitePreview';
import CircuitTrace from '../components/CircuitTrace';
import { packages } from '../data/packages';
import { projectTypes } from '../data/projectTypes';
import { sectionsById } from '../data/sections';
import { featureCatalogue } from '../data/features';
import { assessProject } from '../utils/assessProject';
import '../styles/builder.css';
import '../styles/builder-refinement.css';

export default function BuildProject() {
  const [selectedProjectTypeId, setSelectedProjectTypeId] = useState(null);
  const [activeStage, setActiveStage] = useState('project');
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [noExtraFeatures, setNoExtraFeatures] = useState(false);
  const [branding, setBranding] = useState({ businessName: '', tagline: '', brandColor: '#8e6b45', logo: null, heroArtwork: null });
  const stageHeadingRef = useRef(null);
  const previousStageRef = useRef(activeStage);
  const logoUrl = branding.logo?.url;
  const heroArtworkUrl = branding.heroArtwork?.url;
  const brandingComplete = Boolean(branding.businessName.trim());
  const featuresComplete = noExtraFeatures || selectedFeatures.length > 0;
  const sectionsComplete = selectedSections.some(section => section.id === 'hero')
    && selectedSections.some(section => section.id === 'contact')
    && selectedSections.some(section => !section.core);

  useEffect(() => () => {
    if (logoUrl) URL.revokeObjectURL(logoUrl);
  }, [logoUrl]);

  useEffect(() => () => {
    if (heroArtworkUrl) URL.revokeObjectURL(heroArtworkUrl);
  }, [heroArtworkUrl]);

  useLayoutEffect(() => {
    if (previousStageRef.current !== activeStage) {
      stageHeadingRef.current?.focus({ preventScroll: true });
      previousStageRef.current = activeStage;
    }
  }, [activeStage]);

  function changeStage(stage) {
    if (!selectedProjectTypeId || !['project', 'branding', 'sections', 'features'].includes(stage)
      || ['sections', 'features'].includes(stage) && !brandingComplete
      || stage === 'features' && !sectionsComplete) return;
    setActiveStage(stage);
  }

  function toggleFeature(id) {
    if (!featureCatalogue.some(feature => feature.id === id)) return;
    setNoExtraFeatures(false);
    setSelectedFeatures(current => current.includes(id) ? current.filter(featureId => featureId !== id) : [...current, id]);
  }

  function toggleNoExtraFeatures() {
    setSelectedFeatures([]);
    setNoExtraFeatures(current => !current);
  }

  function selectProject(id) {
    if (id === selectedProjectTypeId) return;
    const project = projectTypes.find(type => type.id === id);
    if (!project) return;
    setSelectedProjectTypeId(id);
    setSelectedSections(project.sections.map(section => ({ ...section })));
  }

  function addSection(id) {
    const section = sectionsById[id];
    if (!section || section.core) return;
    setSelectedSections(current => {
      if (current.some(item => item.id === id)) return current;
      const contactIndex = current.findIndex(item => item.id === 'contact');
      if (contactIndex < 0) return current;
      return [...current.slice(0, contactIndex), { ...section }, ...current.slice(contactIndex)];
    });
  }

  function removeSection(id) {
    if (!sectionsById[id] || sectionsById[id].core) return;
    setSelectedSections(current => current.filter(section => section.id !== id));
  }

  function moveSection(id, direction) {
    if (!sectionsById[id] || sectionsById[id].core || !['up', 'down'].includes(direction)) return;
    setSelectedSections(current => {
      const index = current.findIndex(section => section.id === id);
      const targetIndex = index + (direction === 'up' ? -1 : 1);
      if (index <= 0 || index >= current.length - 1 || targetIndex <= 0 || targetIndex >= current.length - 1 || current[targetIndex].core) return current;
      const reordered = [...current];
      [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];
      return reordered;
    });
  }

  function updateBranding(field, value) {
    setBranding(current => ({ ...current, [field]: value }));
  }

  function selectLogo(file) {
    updateBranding('logo', file ? { name: file.name, url: URL.createObjectURL(file) } : null);
  }

  function selectHeroArtwork(file) {
    updateBranding('heroArtwork', file ? { name: file.name, url: URL.createObjectURL(file) } : null);
  }
  const selectedProjectType = projectTypes.find(type => type.id === selectedProjectTypeId);
  const [searchParams] = useSearchParams();
  const startingPackage = packages.find(item => item.id === searchParams.get('package'));
  const insight = assessProject({ selectedFeatures, selectedSections, noExtraFeatures, startingPackageId: startingPackage?.id });

  return <div className="builder-page">
    <a className="skip-link" href="#builder-content">Skip to workshop</a>
    <BuilderHeader />
    <main id="builder-content" className="builder-main container" tabIndex={-1}>
      <div className="builder-intro">
        <div><p className="eyebrow">WEBSITE WORKSHOP</p><h1>BUILD YOUR WEBSITE</h1><p>Put the pieces together. We’ll turn your ideas into the real thing.</p></div>
        {startingPackage && <p className="builder-package"><span>STARTING FROM</span>{startingPackage.name}</p>}
      </div>
      <div className="builder-system-divider"><CircuitTrace /></div>
      <BuilderProgress projectComplete={Boolean(selectedProjectType)} brandingComplete={brandingComplete} sectionsComplete={sectionsComplete} featuresComplete={featuresComplete} activeStage={activeStage} onStageChange={changeStage} />
      <div className="builder-workspace">
        <div className="builder-controls">{activeStage === 'features'
          ? <FeaturesStage selectedFeatures={selectedFeatures} noExtraFeatures={noExtraFeatures} onToggle={toggleFeature} onNoExtraFeatures={toggleNoExtraFeatures} complete={featuresComplete} headingRef={stageHeadingRef} insight={insight} onAddSection={addSection} />
          : activeStage === 'sections'
          ? <SectionsStage selectedSections={selectedSections} onAdd={addSection} onRemove={removeSection} onMove={moveSection} complete={sectionsComplete} onContinue={() => changeStage('features')} headingRef={stageHeadingRef} />
          : activeStage === 'branding'
            ? <BrandingStage branding={branding} onChange={updateBranding} onLogoSelect={selectLogo} onHeroArtworkSelect={selectHeroArtwork} complete={brandingComplete} onContinue={() => changeStage('sections')} headingRef={stageHeadingRef} />
            : <ProjectStage selectedId={selectedProjectTypeId} onSelect={selectProject} onContinue={() => changeStage('branding')} headingRef={stageHeadingRef} />}</div>
        <WebsitePreview branding={branding} sections={selectedProjectType ? selectedSections : undefined} projectType={selectedProjectType?.label} selectedFeatures={selectedFeatures} noExtraFeatures={noExtraFeatures} />
      </div>
    </main>
  </div>;
}
