import CardBase from './CardBase';
import { useState } from 'react';
import CardDetailsModal from './CardDetailsModal';

const SeasonalPMPCard = ({ deal }: { deal: any }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <CardBase
        dealName={deal.name}
        uniqueReach={deal.scale}
        badge="Meeting Moments"
        subcategory={deal.subCategory}
        description={deal.description}
        type="Seasonal"
        bottomLabel="EXPERIENTIAL RECOMMENDATIONS"
      >
        <button
          className="mt-8 w-full bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
          onClick={() => setModalOpen(true)}
        >
          View Details
        </button>
      </CardBase>
      <CardDetailsModal open={modalOpen} onClose={() => setModalOpen(false)} deal={deal} />
    </>
  );
};

export default SeasonalPMPCard; 