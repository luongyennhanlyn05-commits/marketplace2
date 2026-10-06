import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarDays,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Star,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Phone,
  Sparkles,
  QrCode
} from 'lucide-react';

export const DesktopCustomerBookings = () => {
  const { bookings, cancelBooking, setReviewBooking, shopInfo, setCustomerTab } = useApp();
  const [filter, setFilter] = useState('all');

  const filtered = bookings.filter((b) => {
    if (filter === 'CONFIRMED') return b.status === 'CONFIRMED';
    if (filter === 'COMPLETED') return b.status === 'COMPLETED';
    if (filter === 'CANCELLED') return b.status === 'CANCELLED';
    return true;
  });

  const confirmedCount = bookings.filter((b) => b.status === 'CONFIRMED').length;
  const completedCount = bookings.filter((b) => b.status === 'COMPLETED').length;
  const cancelledCount = bookings.filter((b) => b.status === 'CANCELLED').length;

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
            LỊCH HẸN TIỆM B
          </span>
          <span style={{ fontSize: '13px', color: 'rgba(62, 16, 27, 0.65)' }}>
            • Quản lý lịch hẹn, theo dõi tiền cọc và đánh giá dịch vụ
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
          Lịch Hẹn Của Tôi Tại Tiệm B
        </h1>
      </div>

      {/* 2-Column Responsive Hub */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 320px) 1fr',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* Left Column: Summary & Policy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Status Filters Card */}
          <div className="warm-glass-card" style={{ padding: '22px', borderRadius: '20px' }}>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#3E101B', marginBottom: '14px' }}>
              Trạng thái lịch hẹn
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { id: 'all', label: 'Tất cả lịch hẹn', count: bookings.length },
                { id: 'CONFIRMED', label: 'Sắp tới (Đã cọc)', count: confirmedCount },
                { id: 'COMPLETED', label: 'Đã hoàn thành', count: completedCount },
                { id: 'CANCELLED', label: 'Đã hủy & Hoàn cọc', count: cancelledCount }
              ].map((t) => {
                const isSel = filter === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setFilter(t.id)}
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
                      border: isSel ? '1px solid #5C1929' : '1px solid transparent',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{t.label}</span>
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 7px',
                      borderRadius: '999px',
                      backgroundColor: isSel ? 'rgba(255, 255, 255, 0.2)' : '#FBF0EC',
                      color: isSel ? '#FAF6F0' : '#5C1929',
                      fontWeight: '700'
                    }}>
                      {t.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deposit & Cancellation Policy */}
          <div className="warm-glass-card" style={{ padding: '20px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ShieldCheck size={18} color="#2E7D32" />
              <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#2E7D32' }}>
                Chính Sách Hoàn Cọc 100%
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(62, 16, 27, 0.75)', lineHeight: 1.5, margin: 0 }}>
              {shopInfo.depositPolicy || 'Tiệm B cam kết hoàn 100% tiền cọc tự động qua VietQR nếu quý khách cần đổi giờ hoặc hủy trước 24 giờ.'}
            </p>
          </div>

          {/* Quick Booking CTA Card */}
          <div style={{
            background: 'linear-gradient(135deg, #2A1017 0%, #15050A 100%)',
            borderRadius: '20px',
            padding: '20px',
            color: '#FAF6F0',
            border: '1px solid rgba(196, 158, 101, 0.3)'
          }}>
            <div style={{ fontSize: '15px', fontWeight: '800', marginBottom: '6px', fontFamily: 'var(--font-serif)' }}>
              Muốn đặt thêm dịch vụ?
            </div>
            <p style={{ fontSize: '12px', opacity: 0.85, lineHeight: 1.5, marginBottom: '14px' }}>
              Xem ngay menu trị liệu cổ vai gáy, làm tóc và nail art cao cấp tại Tiệm B.
            </p>
            <button
              onClick={() => setCustomerTab('menu')}
              style={{
                width: '100%',
                padding: '9px',
                borderRadius: '10px',
                backgroundColor: '#C49E65',
                color: '#18080E',
                fontSize: '12px',
                fontWeight: '800'
              }}
            >
              Khám Phá Menu Dịch Vụ
            </button>
          </div>
        </div>

        {/* Right Column: Spa Ticket Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {filtered.length === 0 ? (
            <div className="warm-glass-card" style={{
              padding: '60px 20px',
              borderRadius: '20px',
              textAlign: 'center',
              color: 'rgba(62, 16, 27, 0.6)'
            }}>
              <CalendarDays size={40} color="#C49E65" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#3E101B', marginBottom: '6px' }}>
                Không có lịch hẹn nào trong mục này
              </h3>
              <p style={{ fontSize: '13px', marginBottom: '18px' }}>
                Hãy đặt lịch làm đẹp tại Tiệm B để trải nghiệm dịch vụ đẳng cấp!
              </p>
              <button
                onClick={() => setCustomerTab('menu')}
                className="btn-burgundy-cta"
                style={{ padding: '0 20px', height: '38px', borderRadius: '10px', fontSize: '12.5px' }}
              >
                Đặt Lịch Ngay
              </button>
            </div>
          ) : (
            filtered.map((b) => {
              const isConfirmed = b.status === 'CONFIRMED';
              const isCompleted = b.status === 'COMPLETED';
              const isCancelled = b.status === 'CANCELLED';

              return (
                <div
                  key={b.id}
                  className="warm-glass-card"
                  style={{
                    borderRadius: '20px',
                    padding: '24px',
                    border: isConfirmed ? '1.5px solid #C49E65' : '1px solid rgba(196, 158, 101, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    boxShadow: '0 8px 24px rgba(92, 25, 41, 0.05)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '800',
                          backgroundColor: '#FBF0EC',
                          color: '#5C1929',
                          padding: '2px 8px',
                          borderRadius: '6px'
                        }}>
                          MÃ LỊCH: #{b.id}
                        </span>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          backgroundColor: isConfirmed ? '#E8F5E9' : isCompleted ? '#E3F2FD' : '#FFEBEE',
                          color: isConfirmed ? '#2E7D32' : isCompleted ? '#1565C0' : '#C62828'
                        }}>
                          {b.statusLabel || b.status}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#3E101B', margin: '0 0 4px' }}>
                        {b.serviceName}
                      </h3>
                      <div style={{ fontSize: '13px', color: 'rgba(62, 16, 27, 0.65)' }}>
                        Chuyên viên phục vụ: <strong style={{ color: '#5C1929' }}>{b.staffName || 'Tiệm B sắp xếp thợ chính'}</strong>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '18px', fontWeight: '800', color: '#5C1929' }}>
                        {b.totalPrice ? b.totalPrice.toLocaleString() : '---'}đ
                      </div>
                      <div style={{ fontSize: '12px', color: '#2E7D32', fontWeight: '700' }}>
                        ✓ Đã thanh toán cọc: {b.depositAmount ? b.depositAmount.toLocaleString() : '---'}đ
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details Bar */}
                  <div style={{
                    padding: '14px 18px',
                    backgroundColor: '#FBF0EC',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    fontSize: '13px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5C1929', fontWeight: '800' }}>
                      <Clock size={16} />
                      <span>{b.time} • Ngày {b.date}</span>
                    </div>

                    <a
                      href={shopInfo.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        color: '#5C1929',
                        fontSize: '12.5px',
                        fontWeight: '700',
                        textDecoration: 'none'
                      }}
                    >
                      <MapPin size={14} />
                      <span>86 Pasteur, Bến Nghé, Q.1</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  {/* Actions Footer */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '10px',
                    borderTop: '1px solid rgba(196, 158, 101, 0.15)',
                    paddingTop: '14px'
                  }}>
                    {isConfirmed && (
                      <button
                        onClick={() => {
                          if (window.confirm('Bạn có chắc muốn hủy lịch này? Tiệm B sẽ hoàn 100% tiền cọc tự động.')) {
                            cancelBooking(b.id);
                          }
                        }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '10px',
                          backgroundColor: '#FFEBEE',
                          color: '#C62828',
                          fontSize: '12.5px',
                          fontWeight: '700'
                        }}
                      >
                        Hủy lịch & Hoàn cọc 100%
                      </button>
                    )}

                    {!b.hasReviewed && (isConfirmed || isCompleted) && (
                      <button
                        onClick={() => setReviewBooking(b)}
                        className="btn-burgundy-cta"
                        style={{
                          height: '36px',
                          padding: '0 18px',
                          borderRadius: '10px',
                          fontSize: '12.5px',
                          gap: '6px'
                        }}
                      >
                        <Star size={14} fill="#FAF6F0" />
                        <span>Đánh giá dịch vụ (+ Voucher 50k)</span>
                      </button>
                    )}
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
