import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, CreditCard, Sparkles, CheckCheck, Bell } from 'lucide-react';

export const NotificationsScreen = () => {
  const { notifications, markAllNotificationsRead, setCustomerTab, shopInfo } = useApp();
  const [filterType, setFilterType] = useState('all');

  const filtered = notifications.filter((n) => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  const getNotifIcon = (type) => {
    switch (type) {
      case 'reminder':
        return <Clock size={16} color="#5C1929" />;
      case 'payment':
        return <CreditCard size={16} color="#5C1929" />;
      default:
        return <Sparkles size={16} color="#5C1929" />;
    }
  };

  return (
    <div style={{ padding: '14px 18px 140px' }} className="animate-fade-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <h2 style={{ fontSize: '17px', fontWeight: '800', color: '#3E101B', letterSpacing: '-0.01em' }}>
            Thông Báo Lịch Hẹn
          </h2>
          <p style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.6)', marginTop: '1px' }}>
            Nhắc hẹn tự động & biên lai đặt cọc
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          style={{
            fontSize: '11px',
            color: '#5C1929',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: '#FBF0EC',
            padding: '4px 10px',
            borderRadius: '999px',
            border: '1px solid rgba(196, 158, 101, 0.25)'
          }}
        >
          <CheckCheck size={12} />
          <span>Đã đọc tất cả</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'all', label: 'Tất cả', icon: Bell },
          { id: 'reminder', label: 'Nhắc lịch', icon: Clock },
          { id: 'payment', label: 'Thanh toán cọc', icon: CreditCard }
        ].map((tab) => {
          const Icon = tab.icon;
          const isAct = filterType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              style={{
                padding: '5px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: isAct ? '800' : '600',
                backgroundColor: isAct ? '#5C1929' : '#FFFFFF',
                color: isAct ? '#FAF6F0' : '#3E101B',
                border: isAct ? 'none' : '1px solid rgba(196, 158, 101, 0.2)',
                boxShadow: isAct ? '0 3px 10px rgba(92, 25, 41, 0.2)' : 'none',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={12} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.map((n) => (
          <div
            key={n.id}
            className="warm-glass-card"
            style={{
              borderRadius: '16px',
              padding: '12px 14px',
              border: n.read ? '1px solid rgba(196, 158, 101, 0.18)' : '1.5px solid #5C1929',
              display: 'flex',
              gap: '10px',
              position: 'relative'
            }}
          >
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              backgroundColor: '#FBF0EC',
              border: '1px solid rgba(196, 158, 101, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {getNotifIcon(n.type)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                <h4 style={{ fontSize: '12.5px', fontWeight: '800', color: '#3E101B' }}>
                  {n.title.replace(/[⏰💳✨]/g, '').trim()}
                </h4>
                <span style={{ fontSize: '9.5px', color: 'rgba(62, 16, 27, 0.5)' }}>
                  {n.time}
                </span>
              </div>

              <p style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.7)', lineHeight: '1.4', marginBottom: n.bookingId ? '4px' : '0' }}>
                {n.body}
              </p>

              {n.bookingId && (
                <button
                  onClick={() => setCustomerTab('bookings')}
                  style={{ fontSize: '10.5px', fontWeight: '700', color: '#5C1929', textDecoration: 'underline' }}
                >
                  Xem chi tiết lịch hẹn →
                </button>
              )}
            </div>

            {!n.read && (
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#5C1929'
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
