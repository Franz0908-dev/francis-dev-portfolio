import { Award, ExternalLink, FileText } from 'lucide-react'
import { certifications } from '../../data/portfolio'
import { assetUrl } from '../../lib/assetUrl'
import { SectionHeading } from '../ui/SectionHeading'

export function CertificationsSection() {
  return (
    <section id="certifications" className="content-section section-card" aria-labelledby="certifications-title">
      <SectionHeading id="certifications-title" number="04" title="Certifications & training" description="Internship completion, technical training, and workshops." />
      <div className="certification-grid">
        {certifications.map(item => (
          <article className="certification-card" key={item.title}>
            {item.preview && item.publicFile && (
              <a className="certification-card__preview" href={assetUrl(item.publicFile)} target="_blank" rel="noreferrer" aria-label={`Open ${item.title} PDF`}>
                <img
                  src={assetUrl(item.preview.image)}
                  alt={item.preview.alt ?? `${item.title} certificate preview${item.issuer === 'TESDA' ? ' (learner ID and QR code redacted)' : ''}`}
                  width={item.preview.width}
                  height={item.preview.height}
                  loading="eager"
                  decoding="async"
                />
              </a>
            )}
            <div className="certification-card__details">
              {!item.preview && <Award aria-hidden="true" size={24} />}
              <h3>{item.title}</h3>
              <p>{item.issuer}</p>
              {item.event && <p className="certification-card__event">{item.event}</p>}
              {item.detail && <small>{item.detail}</small>}
              {item.date && <small>Issued {item.date}</small>}
              {item.note && <p className="certification-card__note">{item.note}</p>}
              {item.publicFile && <a href={assetUrl(item.publicFile)} target="_blank" rel="noreferrer" type="application/pdf" aria-label={`${item.documentLabel ?? 'View certificate'}: ${item.title}`}><FileText aria-hidden="true" size={16} /> {item.documentLabel ?? 'View certificate'}</a>}
              {item.verificationUrl && <a href={item.verificationUrl} target="_blank" rel="noreferrer"><ExternalLink aria-hidden="true" size={16} /> Official verification</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
