'use client';

import { useState } from 'react';
import CustomDealCreationModal from '../../components/CustomDealCreationModal';

export default function CustomDealsPage() {
  const [open, setOpen] = useState(true);
  return (
    <CustomDealCreationModal open={open} onClose={() => setOpen(false)} />
  );
} 