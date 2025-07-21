'use client';

import { useState } from 'react';
import RFPGeneratorModal from '../../components/RFPGeneratorModal';

export default function RFPGeneratorPage() {
  const [open, setOpen] = useState(true);
  return (
    <RFPGeneratorModal open={open} onClose={() => setOpen(false)} />
  );
} 