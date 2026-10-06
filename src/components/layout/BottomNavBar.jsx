import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Sparkles,
  CalendarCheck,
  Bell,
  LayoutDashboard,
  CalendarDays,
  Crown,
  Store
} from 'lucide-react';

export const BottomNavBar = () => {
  const {
    currentRole,
    customerTab,
    setCustomerTab,
    ownerTab,
    setOwnerTab,
    unreadCount,
    bookings
  } = useApp();

  const upcomingCount = bookings.filter((b) => b.status === 'CONFIRMED').length;

  if (currentRole === 'owner') {
    const ownerTabs = [
      { id: 'dashboard', label: 'Báo cáo', icon: LayoutDashboard },
      { id: 'calendar', label: 'Lịch tiệm', icon: CalendarDays },
      { id: 'services', label: 'Bảng giá', icon: Sparkles },
      { id: 'memberships', label: 'Thẻ VIP', icon: Crown },
      { id: 'shop_profile', label: 'Cơ sở B', icon: Store }
    ];

    return (
      <div style={{
        position: 'fixed',
        bottom: 'max(14px, env(safe-area-inset-bottom, 14px))',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 24px)',
        maxWidth: '430px',
        zIndex: 900,
        pointerEvents: 'none'
      }}>
        <nav
          className="crystal-dock"
          style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 10px',
            gap: '4px',
            pointerEvents: 'auto'
          }}
        >
          {ownerTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = ownerTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setOwnerTab(tab.id)}
                style={{
                  flex: '1 1 0',
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  padding: '4px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '3px',
                  cursor: 'pointer',
                  color: isActive ? '#691F31' : 'rgba(105, 31, 49, 0.42)',
                  fontWeight: isActive ? '800' : '500',
                  fontSize: '9px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  backgroundColor: isActive ? 'rgba(241, 208, 201, 0.72)' : 'transparent',
                  boxShadow: isActive ? '0 2px 10px rgba(105, 31, 49, 0.12), 0 0 14px rgba(241, 208, 201, 0.8)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: isActive ? 'scale(1.04)' : 'scale(1)'
                }}>
                  <Icon size={16} color={isActive ? '#691F31' : 'rgba(105, 31, 49, 0.45)'} />
                </div>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

  // Customer Bottom Navigation: 4 Core Tabs for Tiệm B
  const customerTabs = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'menu', label: 'Dịch vụ', icon: Sparkles },
    { id: 'bookings', label: 'Lịch hẹn', icon: CalendarCheck, badge: upcomingCount },
    { id: 'notifications', label: 'Thông báo', icon: Bell, badge: unreadCount }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 'max(14px, env(safe-area-inset-bottom, 14px))',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 24px)',
      maxWidth: '430px',
      zIndex: 900,
      pointerEvents: 'none'
    }}>
      <nav
        className="crystal-dock"
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          gap: '8px',
          pointerEvents: 'auto'
        }}
      >
        {customerTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = customerTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCustomerTab(tab.id)}
              style={{
                flex: '1 1 0',
                maxWidth: '74px',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                padding: '4px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                position: 'relative',
                cursor: 'pointer',
                color: isActive ? '#691F31' : 'rgba(105, 31, 49, 0.42)',
                fontWeight: isActive ? '800' : '500',
                fontSize: '9.5px',
                letterSpacing: '0.1px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                padding: '4px 14px',
                borderRadius: '999px',
                backgroundColor: isActive ? 'rgba(241, 208, 201, 0.72)' : 'transparent',
                boxShadow: isActive ? '0 2px 10px rgba(105, 31, 49, 0.12), 0 0 16px rgba(241, 208, 201, 0.85)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: isActive ? 'scale(1.04)' : 'scale(1)'
              }}>
                <Icon size={18} color={isActive ? '#691F31' : 'rgba(105, 31, 49, 0.45)'} />

                {tab.badge > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '1px',
                    backgroundColor: '#691F31',
                    color: '#F8F2EC',
                    fontSize: '8.5px',
                    fontWeight: '800',
                    borderRadius: '999px',
                    minWidth: '14px',
                    height: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 2px',
                    border: '1.5px solid rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 2px 6px rgba(105, 31, 49, 0.25)'
                  }}>
                    {tab.badge}
                  </span>
                )}
              </div>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
