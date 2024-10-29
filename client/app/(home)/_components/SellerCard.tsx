// SellerCard.tsx
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface SellerProps {
  name: string;
  loading: boolean; // Add a loading prop to control skeleton display
}

const SellerCard = ({ name, loading }: SellerProps) => {
  return (
    <div className="w-full h-60 bg-gray-50 p-4 rounded-md shadow-md transition-shadow">
      {loading ? (
        // ShadCN Skeleton Loader adjusted for larger content
        <div className="animate-pulse space-y-6 h-full flex flex-col justify-around">
          <Skeleton className="h-10 w-3/4" />   {/* Title skeleton */}
          <Skeleton className="h-8 w-5/6" />    {/* Subtitle skeleton */}
          <Skeleton className="h-8 w-1/2" />    {/* Footer skeleton */}
        </div>
      ) : (
        // Actual Card Content
        <div className="text-lg font-semibold text-gray-800">{name}</div>
      )}
    </div>
  );
};

export default SellerCard;
