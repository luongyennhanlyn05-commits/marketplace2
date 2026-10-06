import React from 'react';
import { useApp } from '../../context/AppContext';
import { Smartphone, Monitor, RotateCcw, User, Store } from 'lucide-react';

export const TopDemoBar = () => {
  const {
    currentRole,
    setCurrentRole,
    displayMode,
    setDisplayMode,
    resetDemoData,
    unreadCount
  } = useApp();

  return (
    <header style={{
      width: '100%',
      backgroundColor: '#18080E',
      borderBottom: '1px solid rgba(245, 221, 215, 0.12)',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '10px',
      zIndex: 1000,
      position: 'relative'
    }}>
      {/* Brand Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '9px',
          backgroundColor: '#5C1929',
          color: '#FAF6F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #C49E65',
          fontWeight: '700',
          fontSize: '14px',
          fontFamily: 'var(--font-serif)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}>
          B
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#FAF6F0', fontWeight: '800', fontSize: '13px', letterSpacing: '0.3px', lineHeight: 1.2 }}>
            B Beauty & Luxury Spa
          </span>
          <span style={{ color: 'rgba(250, 246, 240, 0.55)', fontSize: '10px' }}>
            Preview Mode
          </span>
        </div>
      </div>

      {/* Role Switcher & Screen Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {/* Role Toggle */}
        <div style={{
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.07)',
          borderRadius: '10px',
          padding: '2px',
          border: '1px solid rgba(196, 158, 101, 0.2)'
        }}>
          <button
            onClick={() => setCurrentRole('customer')}
            style={{
              padding: '5px 12px',
              borderRadius: '8px',
              fontSize: '11.5px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: currentRole === 'customer' ? '#5C1929' : 'transparent',
              color: currentRole === 'customer' ? '#FAF6F0' : 'rgba(250, 246, 240, 0.65)',
              boxShadow: currentRole === 'customer' ? '0 2px 6px rgba(0,0,0,0.3)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <User size={13} />
            <span>Khách hàng</span>
            {unreadCount > 0 && currentRole !== 'customer' && (
              <span style={{
                backgroundColor: '#F5DDD7',
                color: '#5C1929',
                borderRadius: '50%',
                width: '14px',
                height: '14px',
                fontSize: '9px',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentRole('owner')}
            style={{
              padding: '5px 12px',
              borderRadius: '8px',
              fontSize: '11.5px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: currentRole === 'owner' ? '#5C1929' : 'transparent',
              color: currentRole === 'owner' ? '#FAF6F0' : 'rgba(250, 246, 240, 0.65)',
              boxShadow: currentRole === 'owner' ? '0 2px 6px rgba(0,0,0,0.3)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <Store size={13} />
            <span>Chủ tiệm</span>
          </button>
        </div>

        {/* View Mode Toggle */}
        <div style={{
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.07)',
          borderRadius: '8px',
          padding: '2px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <button
            onClick={() => setDisplayMode('frame')}
            title="Khung điện thoại (Mobile)"
            style={{
              padding: '5px 8px',
              borderRadius: '6px',
              backgroundColor: displayMode === 'frame' ? 'rgba(245, 221, 215, 0.2)' : 'transparent',
              color: displayMode === 'frame' ? '#F5DDD7' : 'rgba(250, 246, 240, 0.55)'
            }}
          >
            <Smartphone size={14} />
          </button>
          <button
            onClick={() => setDisplayMode('full')}
            title="Chế độ máy tính (Desktop)"
            style={{
              padding: '5px 8px',
              borderRadius: '6px',
              backgroundColor: (displayMode === 'full' || displayMode === 'desktop') ? 'rgba(245, 221, 215, 0.2)' : 'transparent',
              color: (displayMode === 'full' || displayMode === 'desktop') ? '#F5DDD7' : 'rgba(250, 246, 240, 0.55)'
            }}
          >
            <Monitor size={14} />
          </button>
        </div>

        {/* Reset Demo */}
        <button
          onClick={resetDemoData}
          title="Khôi phục dữ liệu gốc"
          style={{
            padding: '5px 10px',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'rgba(250, 246, 240, 0.8)',
            fontSize: '11px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>
    </header>
  );
};
