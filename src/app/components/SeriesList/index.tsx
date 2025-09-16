"use client";

import { getActiveSeries } from "@/app/utils/seriesUtils";
import SeriesCard from "../SeriesCard";

const SeriesList = () => {
  const activeSeries = getActiveSeries();

  if (activeSeries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No series available at this time.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-50">
      {activeSeries.map((series) => (
        <SeriesCard
          key={series.seriesId}
          series={series}
          cardWidth="w-full"
        />
      ))}
    </div>
  );
};

export default SeriesList;