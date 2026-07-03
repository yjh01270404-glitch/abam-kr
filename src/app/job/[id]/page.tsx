import { getJobById, getAllJobs } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, MapPin, Clock, ShieldCheck, PhoneCall, MessageCircle } from 'lucide-react';
import styles from './detail.module.css';

export async function generateStaticParams() {
  const jobs = getAllJobs();
  return jobs.map((job) => ({
    id: String(job.id),
  }));
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const job = getJobById(resolvedParams.id);

  if (!job) {
    notFound();
  }

  return (
    <div className={styles.container}>
      {/* Header / Nav */}
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          <ChevronLeft size={24} />
        </Link>
        <div className={styles.headerTitle}>상세 정보</div>
        <div style={{ width: 24 }}></div> {/* Balance layout */}
      </header>

      <main className={styles.main}>
        {/* Hero Image */}
        {job.image && (
          <div className={styles.heroImageWrapper}>
            <img src={job.image} alt={job.title} className={styles.heroImage} />
            {job.type === 'top' && (
              <div className={styles.heroBadge}>
                <ShieldCheck size={16} /> 100% 인증
              </div>
            )}
          </div>
        )}

        {/* Content Wrapper */}
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>{job.title}</h1>
          <div className={styles.pay}>{job.pay}</div>

          <div className={styles.metaList}>
            <div className={styles.metaItem}>
              <MapPin size={18} className={styles.metaIcon} />
              <span>{job.location}</span>
            </div>
            <div className={styles.metaItem}>
              <Clock size={18} className={styles.metaIcon} />
              <span>{job.workHours}</span>
            </div>
          </div>

          <div className={styles.divider}></div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>상세 내용</h2>
            <div className={styles.sectionContent}>
              <p>{job.description}</p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>자격 요건</h2>
            <div className={styles.sectionContent}>
              <p>{job.requirements}</p>
            </div>
          </section>
        </div>
      </main>

      {/* Floating Action Bar */}
      <div className={styles.floatingActionBar}>
        <button className={`${styles.actionButton} ${styles.actionOutline}`}>
          <MessageCircle size={20} />
          문자지원
        </button>
        <button className={`${styles.actionButton} ${styles.actionPrimary}`}>
          <PhoneCall size={20} />
          전화하기
        </button>
      </div>
    </div>
  );
}
