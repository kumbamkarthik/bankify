import React from 'react';
import HeroSection from './sections/HeroSection';
import ProblemSection from './sections/ProblemSection';
import HowItWorksSection from './sections/HowItWorksSection';
import FeaturesSection from './sections/FeaturesSection';
import TargetAudienceSection from './sections/TargetAudienceSection';
import TechnologySection from './sections/TechnologySection';
import BusinessModelSection from './sections/BusinessModelSection';
import CtaSection from './sections/CtaSection';
import AppDownloadSection from './sections/AppDownloadSection';

const Body = () => {
  return (
    <div className="bg-gray-50">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TargetAudienceSection />
      <TechnologySection />
      <BusinessModelSection />
      <CtaSection />
      <AppDownloadSection />
    </div>
  );
};

export default Body;