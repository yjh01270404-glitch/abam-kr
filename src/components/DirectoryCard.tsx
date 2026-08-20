import React from 'react';
import { JobAd } from '../lib/mockData';
import DynamicBanner from './DynamicBanner';

interface DirectoryCardProps {
  job: JobAd;
  tier?: 'vip' | 'premium' | 'general';
}

export default function DirectoryCard({ job, tier = 'general' }: DirectoryCardProps) {
  return <DynamicBanner jobAd={job} size="normal" />;
}
