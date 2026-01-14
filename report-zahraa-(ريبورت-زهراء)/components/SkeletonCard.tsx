
import React from 'react';

interface SkeletonCardProps {
  featured?: boolean;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ featured }) => {
  if (featured) {
    return (
      <div className="bg-white mb-8 overflow-hidden animate-pulse">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-gray-200 aspect-video w-full"></div>
          <div className="p-6 md:p-8 flex flex-col justify-center space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2 pt-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden flex flex-col animate-pulse">
      <div className="bg-gray-200 aspect-video w-full"></div>
      <div className="p-4 space-y-3 flex flex-col flex-grow">
        <div className="h-5 bg-gray-200 rounded w-full"></div>
        <div className="h-5 bg-gray-200 rounded w-5/6"></div>
        <div className="space-y-2 flex-grow pt-2">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-4/5"></div>
        </div>
        <div className="mt-auto pt-4 flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-12"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
