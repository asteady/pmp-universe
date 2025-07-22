import React, { useState } from 'react';
import CardBase from './CardBase';
import CardDetailsModal from './CardDetailsModal';

const POIChips = ({ pois }: { pois: string[] }) => (
  pois && pois.length > 0 ? (
    <div className="flex flex-wrap gap-2 justify-center mb-2">
      {pois.map((poi, idx) => (
        <span key={idx} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium" title={poi}>{poi}</span>
      ))}
    </div>
  ) : null
);

const SurveyQuestions = ({ questions }: { questions: string[] }) => (
  <div className="mb-2">
    <h4 className="text-sm font-semibold text-foreground mb-1 text-center">Survey Questions</h4>
    <ul className="list-disc list-inside text-xs text-foreground/80">
      {questions && questions.length > 0 && questions.map((q, idx) => (
        <li key={idx}>{q}</li>
      ))}
    </ul>
  </div>
);

const CreativeExamples = ({ examples }: { examples: string[] }) => (
  <div className="mb-2">
    <h4 className="text-sm font-semibold text-foreground mb-1 text-center">Creative Examples</h4>
    <ul className="list-disc list-inside text-xs text-foreground/80">
      {examples && examples.length > 0 && examples.map((ex, idx) => (
        <li key={idx}>{ex}</li>
      ))}
    </ul>
  </div>
);

const SeasonalPMPCard = ({ deal }: { deal: any }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <CardBase
        dealName={deal.name}
        uniqueReach={deal.scale}
        badge={deal.type}
        subcategory={deal.subCategory}
        description={deal.description}
      >
        {/* Persona-driven content */}
        <POIChips pois={deal.pois || []} />
        <SurveyQuestions questions={deal.surveyQuestions || []} />
        <CreativeExamples examples={deal.creativeExamples || []} />
        <button
          className="mt-4 w-full bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
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