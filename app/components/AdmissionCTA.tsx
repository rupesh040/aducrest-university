import { Photo, PrimaryButton, SectionHeading, Icon } from './Primitives';
import type { AdmissionCTASection } from '@/app/data/types';

export function AdmissionCTA({data}:{data:AdmissionCTASection}) {
  return (
    <section className="admission-cta-section">
      <div className="container">
        <div className="admission-cta">
          <div className="cta-content">
            <SectionHeading heading={data.heading} align="left" />
            <div className="cta-features">
              {data.features.map(feature => <div key={feature.label}><Icon name={feature.icon} size={25} /><span>{feature.label}</span></div>)}
            </div>
            <PrimaryButton button={data.button} />
          </div>
          <Photo asset={data.image} className="cta-photo" sizes="(max-width: 499px) calc(100vw - 36px), (max-width: 899px) 460px, (max-width: 1199px) 42vw, 460px" />
        </div>
      </div>
    </section>
  );
}
