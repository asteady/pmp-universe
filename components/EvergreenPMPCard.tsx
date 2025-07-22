import React, { useState } from 'react';
import CardBase from './CardBase';
import CardDetailsModal from './CardDetailsModal';

const EvergreenPMPCard = ({ deal }: { deal: any }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <CardBase
        dealName={deal.name}
        uniqueReach={deal.scale}
        badge={deal.type}
        subcategory={deal.subCategory}
        description={deal.description}
        type="Evergreen"
        bottomLabel="EXPERIENTIAL RECOMMENDATIONS"
      >
        <button
          className="mt-8 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => setModalOpen(true)}
        >
          View Details
        </button>
      </CardBase>
      <CardDetailsModal open={modalOpen} onClose={() => setModalOpen(false)} deal={deal} />
    </>
  );
};

export default EvergreenPMPCard; 