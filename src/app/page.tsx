import Hero3D from '@/components/Hero3D';
import AboutSection from '@/components/AboutSection';
import BrandSlider from '@/components/BrandSlider';
import ServicesGrid from '@/components/ServicesGrid';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import JourneyTimeline from '@/components/JourneyTimeline';
import WhyChooseUs from '@/components/WhyChooseUs';
import EventCalculator from '@/components/EventCalculator';
import PricingPackages from '@/components/PricingPackages';
import BlogFAQContact from '@/components/BlogFAQContact';
import MultiStepWizard from '@/components/MultiStepWizard';
import AIRecommendationAssistant from '@/components/AIRecommendationAssistant';
import LeadCapturePopups from '@/components/LeadCapturePopups';

export default function Home() {
  return (
    <>
      {/* 3D Visual Hero Presentation */}
      <Hero3D />

      {/* Brand Logos Slider */}
      <BrandSlider />

      {/* About Company & Stats Milestones */}
      <AboutSection />

      {/* Staging Services Grid */}
      <ServicesGrid />

      {/* Portfolio Gallery & Before/After Slider */}
      <PortfolioShowcase />

      {/* Planning Timeline Journey */}
      <JourneyTimeline />

      {/* Value Propositions */}
      <WhyChooseUs />

      {/* Budget Estimator Widget */}
      <EventCalculator />

      {/* Pricing and Staging Packages Compare */}
      <PricingPackages />

      {/* Blog Previews, Accordion FAQ, & Contact Forms */}
      <BlogFAQContact />

      {/* Lead Generation & CRM Modals */}
      <MultiStepWizard />
      <AIRecommendationAssistant />
      <LeadCapturePopups />
    </>
  );
}
