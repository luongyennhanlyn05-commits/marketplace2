import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export const MobileFrame = ({ children }) => {
  const { displayMode, themeOption } = useApp();
  const [currentTime, setCurrentTime] = useState('09:41');
  const [isMobileDevice, setIsMobileDevice] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth <= 640 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(window.innerWidth <= 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // When on mobile screen OR user explicitly chose 'full' mode:
  // Render seamless native mobile app view without redundant outer frame/island
  if (isMobileDevice || displayMode === 'full') {
    return (
      <main
        data-theme={themeOption}
        style={{
          minHeight: '100dvh',
          height: '100dvh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '0',
          backgroundColor: '#F8F2EC',
          overflow: 'hidden'
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: '520px',
          height: '100%',
          backgroundColor: '#F8F2EC',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated 3D Depth Canvas Layer */}
          <div className="ambient-3d-canvas">
            <div className="ambient-orb ambient-orb-1" />
            <div className="ambient-orb ambient-orb-2" />
            <div className="ambient-orb ambient-orb-3" />
          </div>

          <div style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          }}>
            {children}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{
      minHeight: 'calc(100vh - 54px)',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Outer 3D Atmospheric Ambient Glow */}
      <div className="outer-ambient-glow" />

      {/* iPhone 16 Pro Chassis - Clean, Solid & Even */}
      <div
        data-theme={themeOption}
        style={{
        width: '100%',
        maxWidth: '414px',
        height: '848px',
        maxHeight: '92vh',
        backgroundColor: '#F8F2EC',
        borderRadius: '50px',
        border: '9px solid #2A141C',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.75)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1
      }}>
        {/* iOS Dynamic Island & Status Bar */}
        <div style={{
          height: '46px',
          width: '100%',
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 26px',
          fontSize: '13px',
          fontWeight: '700',
          color: '#691F31',
          zIndex: 900,
          flexShrink: 0
        }}>
          <span>{currentTime}</span>

          {/* Dynamic Island pill */}
          <div style={{
            width: '116px',
            height: '26px',
            backgroundColor: '#1E0E14',
            borderRadius: '20px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '9px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: '#0a0a0a',
              marginRight: '24px'
            }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Signal size={13} />
            <Wifi size={13} />
            <BatteryMedium size={16} />
          </div>
        </div>

        {/* Inner App Content Viewport - Fixed height with internal scroll for content */}
        <div style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#F8F2EC',
          transform: 'translateZ(0)'
        }}>
          {/* Animated 3D Depth Canvas Layer */}
          <div className="ambient-3d-canvas">
            <div className="ambient-orb ambient-orb-1" />
            <div className="ambient-orb ambient-orb-2" />
            <div className="ambient-orb ambient-orb-3" />
          </div>

          <div style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          }}>
            {children}
          </div>
        </div>

        {/* Home Indicator */}
        <div style={{
          height: '18px',
          width: '100%',
          backgroundColor: '#F8F2EC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          zIndex: 900
        }}>
          <div style={{
            width: '130px',
            height: '4px',
            borderRadius: '999px',
            backgroundColor: 'rgba(105, 31, 49, 0.22)'
          }} />
        </div>
      </div>
    </main>
  );
};
