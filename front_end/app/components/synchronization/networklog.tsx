'use client';

import React from 'react';

/**
 * NetworkLog Component
 * 
 * Displays the connection history for the current session.
 */
const NetworkLog = () => {
  const history = [
    { time: '14:32', status: 'Connected', latency: '48ms', color: 'text-green-500', bgColor: 'bg-green-50' },
    { time: '14:20', status: 'Connection lost', latency: null, color: 'text-red-500', bgColor: 'bg-red-50' },
    { time: '14:08', status: 'Connected', latency: '112ms', color: 'text-green-500', bgColor: 'bg-green-50' },
    { time: '13:55', status: 'Connected', latency: '61ms', color: 'text-green-500', bgColor: 'bg-green-50' },
    { time: '13:44', status: 'Connection lost', latency: null, color: 'text-red-500', bgColor: 'bg-red-50' },
    { time: '13:30', status: 'Connected', latency: '89ms', color: 'text-green-500', bgColor: 'bg-green-50' },
  ];

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">
          Connection history for this session
        </h3>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          6 Events Recorded
        </span>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[39px] top-0 bottom-0 w-0.5 bg-gray-100"></div>

        <div className="space-y-6">
          {history.map((event, index) => (
            <div key={index} className="flex items-start relative group">
              {/* Time */}
              <div className="w-16 shrink-0 pt-1">
                <span className="text-xs font-black text-gray-400 tabular-nums">
                  {event.time}
                </span>
              </div>

              {/* Status Indicator Dot */}
              <div className={`relative z-10 w-4 h-4 rounded-full border-4 border-white shadow-sm mt-1.5 -ml-2 ${
                event.status === 'Connected' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>

              {/* Event Card */}
              <div className={`ml-6 flex-1 p-4 rounded-2xl border border-transparent transition-all group-hover:border-gray-100 hover:shadow-sm ${event.bgColor}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs font-black uppercase tracking-widest ${event.color}`}>
                      {event.status}
                    </p>
                    {event.status === 'Connection lost' && (
                      <p className="text-[10px] font-bold text-red-700/50 uppercase tracking-tighter mt-0.5">
                        Intermittent network failure detected
                      </p>
                    )}
                  </div>
                  {event.latency && (
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Latency</p>
                      <p className="text-xs font-black text-olive">{event.latency}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-yellow-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">
            Historical logs are cleared every 24 hours to optimize local storage performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NetworkLog;
