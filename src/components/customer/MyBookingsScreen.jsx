import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarCheck, Star, QrCode, Clock, Calendar, ShieldCheck, CheckCheck, XCircle } from 'lucide-react';

export const MyBookingsScreen = () => {
  const { bookings, cancelBooking, completeBooking, setReviewBooking, setCustomerTab, shopInfo } = useApp();
  const [activeTab, setActiveTab] = useState('CONFIRMED');

  const filtered = bookings.filter((b) => b.status === activeTab);

  const handleCancel = (booking) => {
    const confirmCancel = window.confirm(
      `Hủy lịch hẹn #${booking.id} tại ${shopInfo.name}?\n\nChính sách: Vì hủy trước 24h, bạn sẽ được HOÀN 100% tiền cọc (${booking.depositAmount.toLocaleString()}đ)!`
    );
    if (confirmCancel) {
      cancelBooking(booking.id);
    }
  };

  return (
    <div style={{ padding: '14px 18px 140px' }} className="animate-fade-up">
      <div style={{ marginBottom: '12px' }}>
        <h2 style={{ fontSize: '17px', fontWeight: '800', color: '#3E101B', letterSpacing: '-0.01em' }}>
          Lịch Hẹn Của Bạn
        </h2>
        <p style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.6)', marginTop: '1px' }}>
          Quản lý lịch làm đẹp & mã QR check-in
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        padding: '3px',
        marginBottom: '14px',
        border: '1px solid rgba(196, 158, 101, 0.2)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
      }}>
        {[
          { id: 'CONFIRMED', label: 'Sắp tới' },
          { id: 'COMPLETED', label: 'Đã xong' },
          { id: 'CANCELLED', label: 'Đã hủy' }
        ].map((tab) => {
          const count = bookings.filter((b) => b.status === tab.id).length;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '7px 0',
                borderRadius: '10px',
                fontSize: '11px',
                fontWeight: isActive ? '800' : '600',
                backgroundColor: isActive ? '#5C1929' : 'transparent',
                color: isActive ? '#FAF6F0' : '#3E101B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{tab.label}</span>
              <span style={{
                fontSize: '9px',
                backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(92, 25, 41, 0.08)',
                color: isActive ? '#FAF6F0' : '#5C1929',
                padding: '1px 6px',
                borderRadius: '999px',
                fontWeight: '800'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.length === 0 ? (
          <div className="warm-glass-card" style={{
            textAlign: 'center',
            padding: '36px 16px',
            borderRadius: '18px',
            border: '1px solid rgba(196, 158, 101, 0.2)'
          }}>
            <CalendarCheck size={32} color="rgba(92, 25, 41, 0.3)" style={{ margin: '0 auto 8px' }} />
            <p style={{ color: '#3E101B', fontWeight: '800', fontSize: '13px', marginBottom: '2px' }}>
              Chưa có lịch hẹn nào
            </p>
            <p style={{ color: 'rgba(62, 16, 27, 0.6)', fontSize: '10.5px', marginBottom: '14px' }}>
              Đặt lịch sớm để chọn khung giờ và thợ yêu thích.
            </p>
            <button
              onClick={() => setCustomerTab('menu')}
              className="btn-burgundy-cta"
              style={{
                padding: '8px 18px',
                borderRadius: '12px',
                fontSize: '11.5px',
                fontWeight: '700'
              }}
            >
              Xem menu & Đặt ngay
            </button>
          </div>
        ) : (
          filtered.map((b) => (
            <div
              key={b.id}
              className="warm-glass-card"
              style={{
                borderRadius: '18px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                border: '1px solid rgba(196, 158, 101, 0.2)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontSize: '9.5px',
                  fontWeight: '800',
                  padding: '3px 8px',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor:
                    b.status === 'CONFIRMED'
                      ? 'rgba(46, 125, 50, 0.1)'
                      : b.status === 'COMPLETED'
                      ? '#FBF0EC'
                      : 'rgba(198, 40, 40, 0.1)',
                  color:
                    b.status === 'CONFIRMED'
                      ? '#2E7D32'
                      : b.status === 'COMPLETED'
                      ? '#5C1929'
                      : '#C62828'
                }}>
                  {b.status === 'CONFIRMED' && <Clock size={10} />}
                  {b.status === 'COMPLETED' && <CheckCheck size={10} />}
                  {b.status === 'CANCELLED' && <XCircle size={10} />}
                  <span>{b.statusLabel}</span>
                </span>

                <span style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(62, 16, 27, 0.5)' }}>
                  #{b.id}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#3E101B', marginBottom: '2px' }}>
                  {b.serviceName}
                </h3>
                <div style={{ fontSize: '10.5px', color: 'rgba(62, 16, 27, 0.65)', marginBottom: '6px' }}>
                  Thợ: <strong>{b.staffName || 'Tiệm B sắp xếp'}</strong>
                </div>

                <div style={{
                  backgroundColor: '#FBF0EC',
                  padding: '9px 12px',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ fontSize: '11px', color: '#3E101B' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={12} color="#5C1929" />
                      <span>{b.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                      <Clock size={12} color="#5C1929" />
                      <span>{b.time}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '9.5px', color: 'rgba(62, 16, 27, 0.55)' }}>Đã cọc:</div>
                    <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#5C1929' }}>
                      {b.depositAmount.toLocaleString()}đ
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', paddingTop: '2px' }}>
                {b.status === 'CONFIRMED' && (
                  <>
                    <button
                      onClick={() => handleCancel(b)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '10px',
                        fontSize: '10.5px',
                        fontWeight: '600',
                        color: '#C62828',
                        backgroundColor: '#FFEBEE',
                        border: '1px solid rgba(198, 40, 40, 0.15)'
                      }}
                    >
                      Hủy & Hoàn cọc
                    </button>
                    <button
                      onClick={() => {
                        completeBooking(b.id);
                        setActiveTab('COMPLETED');
                      }}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '10px',
                        fontSize: '10.5px',
                        fontWeight: '700',
                        color: '#2E7D32',
                        backgroundColor: '#E8F5E9',
                        border: '1px solid rgba(46, 125, 50, 0.25)'
                      }}
                    >
                      ✓ Hoàn thành
                    </button>
                    <button
                      onClick={() => alert(`Mã Check-in: #${b.id}\nGiờ hẹn: ${b.time} - ${b.date}\nĐịa chỉ: ${shopInfo.address}`)}
                      className="btn-burgundy-cta"
                      style={{
                        padding: '6px 12px',
                        borderRadius: '10px',
                        fontSize: '10.5px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <QrCode size={12} />
                      <span>Check-in</span>
                    </button>
                  </>
                )}

                {b.status === 'COMPLETED' && (
                  b.hasReviewed ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      fontSize: '10.5px',
                      fontWeight: '700',
                      color: '#5C1929',
                      padding: '4px 10px',
                      backgroundColor: '#FBF0EC',
                      borderRadius: '999px'
                    }}>
                      <Star size={11} fill="#C49E65" color="#C49E65" />
                      <span>Đã đánh giá {b.userRating || 5}★</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReviewBooking(b)}
                      className="btn-burgundy-cta"
                      style={{
                        padding: '6px 14px',
                        borderRadius: '10px',
                        fontSize: '10.5px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Star size={12} fill="#FAF6F0" />
                      <span>Đánh giá dịch vụ</span>
                    </button>
                  )
                )}

                {b.status === 'CANCELLED' && (
                  <div style={{ fontSize: '10.5px', color: 'rgba(62, 16, 27, 0.6)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={12} color="#5C1929" />
                    <span>Đã hoàn tiền cọc về tài khoản</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
