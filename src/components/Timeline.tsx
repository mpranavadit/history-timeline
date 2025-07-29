import React, { useEffect, useRef } from 'react';
import { timelineData } from '../data/artifacts';

interface TimelineProps {
  filteredData: any;
}

export const Timeline: React.FC<TimelineProps> = ({ filteredData }) => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineRef.current && (window as any).TL) {
      // Clear existing timeline
      timelineRef.current.innerHTML = '';
      
      // Create new timeline
      new (window as any).TL.Timeline(timelineRef.current, filteredData, {
        height: 600,
        initial_zoom: 2,
        zoom_sequence: [0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
        timenav_height: 150,
        timenav_height_percentage: 25,
        marker_height_min: 30,
        marker_width_min: 100,
        start_at_slide: 0,
        hash_bookmark: false,
        default_bg_color: {r: 255, g: 255, b: 255},
        scale_factor: 2
      });
    }
  }, [filteredData]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
        <h2 className="text-2xl font-bold">Interactive Timeline</h2>
        <p className="text-blue-100">Click on any point to explore the artifact in detail</p>
      </div>
      <div ref={timelineRef} className="timeline-container" style={{ height: '600px' }} />
    </div>
  );
};