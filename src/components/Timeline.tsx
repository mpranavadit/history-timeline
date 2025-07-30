import React, { useEffect, useRef, useState } from 'react';
import { Artifact } from '../data/artifacts';

interface TimelineProps {
  filteredData: any;
  artifacts: Artifact[];
  onArtifactClick?: (artifact: Artifact) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ filteredData, artifacts, onArtifactClick }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timelineInstance, setTimelineInstance] = useState<any>(null);

  useEffect(() => {
    const loadTimelineJS = async () => {
      try {
        // Check if TimelineJS is already loaded
        if ((window as any).TL) {
          initializeTimeline();
          return;
        }

        // Load TimelineJS CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css';
        document.head.appendChild(cssLink);

        // Load TimelineJS JavaScript
        const script = document.createElement('script');
        script.src = 'https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js';
        script.onload = () => {
          initializeTimeline();
        };
        script.onerror = () => {
          setError('Failed to load TimelineJS library');
          setIsLoading(false);
        };
        document.head.appendChild(script);
      } catch (err) {
        setError('Error loading timeline resources');
        setIsLoading(false);
      }
    };

    const initializeTimeline = () => {
      if (timelineRef.current && (window as any).TL && filteredData) {
        try {
          // Clear existing timeline
          timelineRef.current.innerHTML = '';
          
          // Destroy existing timeline instance
          if (timelineInstance) {
            timelineInstance.destroy?.();
          }

          // Create new timeline with enhanced options
          const newTimeline = new (window as any).TL.Timeline(timelineRef.current, filteredData, {
            height: 650,
            width: '100%',
            initial_zoom: 1,
            zoom_sequence: [0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
            timenav_height: 200,
            timenav_height_percentage: 30,
            marker_height_min: 40,
            marker_width_min: 120,
            start_at_slide: 0,
            hash_bookmark: false,
            default_bg_color: { r: 255, g: 255, b: 255 },
            scale_factor: 3,
            trackResize: true,
            language: 'en',
            ga_property_id: null,
            debug: false,
            slide_padding_lr: 100,
            slide_default_fade: '0%',
            duration: 1000,
            ease: 'TL.Ease.easeInOutQuint',
            dragging: true,
            slide_background_color: '#ffffff',
            slide_text_color: '#333333'
          });

          setTimelineInstance(newTimeline);
          setIsLoading(false);
          setError(null);

          // Add click event listeners if artifacts and callback are provided
          if (artifacts && onArtifactClick) {
            setTimeout(() => {
              const markers = timelineRef.current?.querySelectorAll('.tl-timemarker');
              markers?.forEach((marker, index) => {
                const artifact = artifacts[index];
                if (artifact) {
                  marker.addEventListener('click', () => {
                    onArtifactClick(artifact);
                  });
                  (marker as HTMLElement).style.cursor = 'pointer';
                }
              });
            }, 1000);
          }

        } catch (err) {
          setError('Failed to initialize timeline');
          setIsLoading(false);
        }
      }
    };

    loadTimelineJS();

    // Cleanup function
    return () => {
      if (timelineInstance) {
        timelineInstance.destroy?.();
      }
    };
  }, [filteredData, artifacts, onArtifactClick]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (timelineInstance && timelineInstance.updateDisplay) {
        timelineInstance.updateDisplay();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [timelineInstance]);

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6">
          <h2 className="text-2xl font-bold mb-2">Timeline Unavailable</h2>
          <p className="text-red-100">There was an issue loading the interactive timeline</p>
        </div>
        <div className="p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Timeline Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Please check your internet connection and try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Interactive Timeline</h2>
            <p className="text-blue-100">
              Click on any point to explore the artifact in detail • Drag to navigate through time
            </p>
          </div>
          <div className="text-4xl opacity-80">⏳</div>
        </div>
        
        {/* Timeline Stats */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex flex-wrap gap-4 text-sm text-blue-100">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
              <span>{artifacts.length} Historical Events</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
              <span>4,500+ Years Covered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
              <span>Multiple Civilizations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10" style={{ height: '650px' }}>
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading Interactive Timeline...</p>
              <p className="text-sm text-gray-500 mt-2">Preparing historical artifacts</p>
            </div>
          </div>
        )}
        
        <div 
          ref={timelineRef} 
          className="timeline-container bg-gray-50" 
          style={{ height: '650px', minHeight: '650px' }}
        />
      </div>

      {/* Timeline Instructions */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h4 className="font-bold text-gray-800 mb-3 text-center">How to Use the Timeline</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <p className="font-semibold text-gray-800">Navigate</p>
              <p>Drag the timeline or use the navigation bar below to move through different time periods</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <p className="font-semibold text-gray-800">Explore</p>
              <p>Click on any marker or slide to see detailed information about the artifact</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-orange-600 font-bold">3</span>
              </div>
              <p className="font-semibold text-gray-800">Zoom</p>
              <p>Use the zoom controls to focus on specific time periods or get an overview</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};