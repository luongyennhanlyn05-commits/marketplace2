import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  CheckCheck,
  Clock,
  Sparkles,
  CalendarDays,
  CreditCard,
  Gift,
  ShieldCheck,
  ChevronRight,
  Crown,
  Phone,
  MapPin,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const DesktopCustomerNotifications = () => {
  const {
    notifications,
    markAllNotificationsRead,
    setCustomerTab,
    setIsVipModalOpen,
    shopInfo,
    userTier
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    return n.type === activeFilter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotifIcon = (type) => {
    switch (type) {
      case 'payment':
        return {
          icon: CreditCard,
          bgColor: '#E8F5E9',
          color: '#2E7D32',
          badgeText: 'Xác nhận cọc'
        };
      case 'promo':
        return {
          icon: Gift,
          bgColor: '#FFF8E1',
          color: '#C49E65',
          badgeText: 'Ưu đãi VIP'
        };
      case 'reminder':
      default:
        return {
          icon: CalendarDays,
          bgColor: '#FBF0EC',
          color: '#5C1929',
          badgeText: 'Nhắc lịch hẹn'
        };
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 32px 80px' }}>
      {/* Top Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{
            backgroundColor: '#5C1929',
            color: '#FAF6F0',
            fontSize: '11px',
            fontWeight: '800',
            padding: '3px 10px',
            borderRadius: '999px',
            letterSpacing: '0.4px'
          }}>
            HỘP THƯ TIỆM B
          </span>
          <span style={{ fontSize: '13px', color: 'rgba(62, 16, 27, 0.65)' }}>
            • Trung tâm thông báo và cập nhật hoạt động đặt lịch
          </span>
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '800',
          color: '#3E101B',
          fontFamily: 'var(--font-serif)',
          letterSpacing: '-0.02em',
          margin: 0
        }}>
          Thông Báo & Lịch Hoạt Động
        </h1>
      </div>

      {/* 2-Column Responsive Hub */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(300px, 340px) 1fr',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* Left Column: Filter Sidebar & VIP Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Summary & Filters Card */}
          <div className="warm-glass-card" style={{ padding: '22px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bell size={18} color="#5C1929" />
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#3E101B' }}>
                  Phân loại thông báo
                </span>
              </div>
              {unreadCount > 0 && (
                <span style={{
                  backgroundColor: '#5C1929',
                  color: '#FAF6F0',
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '999px'
                }}>
                  {unreadCount} mới
                </span>
              )}
            </div>

            {/* Filter buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px' }}>
              {[
                { id: 'all', label: 'Tất cả thông báo', count: notifications.length },
                { id: 'reminder', label: 'Nhắc lịch hẹn', count: notifications.filter((n) => n.type === 'reminder').length },
                { id: 'payment', label: 'Tiền cọc & Thanh toán', count: notifications.filter((n) => n.type === 'payment').length },
                { id: 'promo', label: 'Ưu đãi & Voucher', count: notifications.filter((n) => n.type === 'promo').length }
              ].map((f) => {
                const isSel = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: isSel ? '800' : '600',
                      backgroundColor: isSel ? '#5C1929' : 'transparent',
                      color: isSel ? '#FAF6F0' : '#3E101B',
                      transition: 'all 0.15s ease',
                      border: isSel ? '1px solid #5C1929' : '1px solid transparent'
                    }}
                  >
                    <span>{f.label}</span>
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 7px',
                      borderRadius: '999px',
                      backgroundColor: isSel ? 'rgba(255, 255, 255, 0.2)' : '#FBF0EC',
                      color: isSel ? '#FAF6F0' : '#5C1929',
                      fontWeight: '700'
                    }}>
                      {f.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={markAllNotificationsRead}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '12px',
                backgroundColor: '#FBF0EC',
                color: '#5C1929',
                fontSize: '12.5px',
                fontWeight: '700',
                border: '1px solid rgba(196, 158, 101, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <CheckCheck size={16} />
              <span>Đánh dấu đã đọc tất cả</span>
            </button>
          </div>

          {/* VIP Member Privilege Card */}
          <div style={{
            background: 'linear-gradient(135deg, #2B0E17 0%, #15050A 100%)',
            borderRadius: '20px',
            padding: '22px',
            color: '#FAF6F0',
            border: '1.5px solid #C49E65',
            boxShadow: '0 12px 30px rgba(92, 25, 41, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Crown size={18} color="#E0C89F" />
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#E0C89F', letterSpacing: '0.6px' }}>
                HỘI VIÊN TIỆM B
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 6px', fontFamily: 'var(--font-serif)' }}>
              Quyền Lợi VIP Của Bạn
            </h3>
            <p style={{ fontSize: '12px', opacity: 0.85, lineHeight: 1.5, marginBottom: '16px' }}>
              Được giảm ngay 15% cho tất cả các liệu trình làm đẹp, ưu tiên giữ khung giờ vàng cuối tuần.
            </p>
            <button
              onClick={() => setIsVipModalOpen(true)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: '#C49E65',
                color: '#18080E',
                fontSize: '12.5px',
                fontWeight: '800'
              }}
            >
              Xem Thẻ VIP Của Tôi
            </button>
          </div>

          {/* Quick Help Card */}
          <div className="warm-glass-card" style={{ padding: '18px', borderRadius: '18px', fontSize: '12.5px' }}>
            <div style={{ fontWeight: '800', color: '#3E101B', marginBottom: '8px' }}>
              Cần hỗ trợ về lịch hẹn?
            </div>
            <div style={{ color: 'rgba(62, 16, 27, 0.7)', lineHeight: 1.5, marginBottom: '10px' }}>
              Hotline tiếp nhận đổi lịch hoặc hỗ trợ hoàn tiền cọc 24/7:
            </div>
            <a
              href="tel:0908888999"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#5C1929',
                fontWeight: '800',
                textDecoration: 'none'
              }}
            >
              <Phone size={14} />
              <span>0908 888 999 (Tiệm B Hotline)</span>
            </a>
          </div>
        </div>

        {/* Right Column: Rich Notification Cards Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredNotifications.length === 0 ? (
            <div className="warm-glass-card" style={{
              padding: '60px 20px',
              borderRadius: '20px',
              textAlign: 'center',
              color: 'rgba(62, 16, 27, 0.6)'
            }}>
              <Bell size={36} color="#C49E65" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#3E101B', marginBottom: '4px' }}>
                Không có thông báo nào trong mục này
              </h3>
              <p style={{ fontSize: '13px' }}>
                Các cập nhật mới nhất từ Tiệm B sẽ xuất hiện tại đây!
              </p>
            </div>
          ) : (
            filteredNotifications.map((n) => {
              const meta = getNotifIcon(n.type);
              const Icon = meta.icon;

              return (
                <div
                  key={n.id}
                  className="warm-glass-card"
                  style={{
                    borderRadius: '20px',
                    padding: '22px 24px',
                    border: n.read ? '1px solid rgba(196, 158, 101, 0.18)' : '1.5px solid #C49E65',
                    backgroundColor: n.read ? 'rgba(255, 255, 255, 0.9)' : '#FFFFFF',
                    boxShadow: n.read ? '0 2px 12px rgba(0,0,0,0.02)' : '0 8px 24px rgba(92, 25, 41, 0.08)',
                    position: 'relative',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    {/* Category Icon */}
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      backgroundColor: meta.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: meta.color,
                      flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
                    }}>
                      <Icon size={22} />
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '800',
                            backgroundColor: meta.bgColor,
                            color: meta.color,
                            padding: '2px 8px',
                            borderRadius: '6px'
                          }}>
                            {meta.badgeText}
                          </span>
                          {!n.read && (
                            <span style={{
                              fontSize: '10.5px',
                              fontWeight: '800',
                              backgroundColor: '#5C1929',
                              color: '#FAF6F0',
                              padding: '2px 7px',
                              borderRadius: '999px'
                            }}>
                              Mới
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'rgba(62, 16, 27, 0.5)' }}>
                          <Clock size={12} />
                          <span>{n.time}</span>
                        </div>
                      </div>

                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '800',
                        color: '#3E101B',
                        marginBottom: '6px',
                        lineHeight: 1.3
                      }}>
                        {n.title.replace(/[⏰💳✨🎁]/g, '').trim()}
                      </h3>

                      <p style={{
                        fontSize: '13px',
                        color: 'rgba(62, 16, 27, 0.8)',
                        lineHeight: 1.55,
                        margin: '0 0 14px'
                      }}>
                        {n.body}
                      </p>

                      {/* Interactive Action Button inside Notification */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid rgba(196, 158, 101, 0.15)',
                        paddingTop: '12px'
                      }}>
                        <div style={{ fontSize: '11.5px', color: 'rgba(62, 16, 27, 0.6)' }}>
                          Cơ sở: <strong>86 Pasteur, Bến Nghé, Quận 1</strong>
                        </div>

                        {n.type === 'payment' || n.type === 'reminder' ? (
                          <button
                            onClick={() => setCustomerTab('bookings')}
                            style={{
                              padding: '6px 14px',
                              borderRadius: '8px',
                              backgroundColor: '#5C1929',
                              color: '#FAF6F0',
                              fontSize: '12px',
                              fontWeight: '700',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <span>Xem lịch hẹn của tôi</span>
                            <ChevronRight size={13} />
                          </button>
                        ) : (
                          <button
                            onClick={() => setCustomerTab('menu')}
                            style={{
                              padding: '6px 14px',
                              borderRadius: '8px',
                              backgroundColor: '#C49E65',
                              color: '#18080E',
                              fontSize: '12px',
                              fontWeight: '800',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <span>Đặt lịch dùng ưu đãi</span>
                            <ChevronRight size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
