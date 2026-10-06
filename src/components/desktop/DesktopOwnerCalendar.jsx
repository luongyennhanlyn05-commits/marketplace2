import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  Unlock,
  ChevronLeft,
  ChevronRight,
  Clock,
  X
} from 'lucide-react';
import { TIME_SLOTS } from '../../data/mockData';

const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const MONTH_NAMES = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

export const DesktopOwnerCalendar = () => {
  const {
    lockedSlots,
    toggleSlotLock,
    lockAllSlotsForDate,
    unlockAllSlotsForDate,
    bookings
  } = useApp();

  const [selectedDate, setSelectedDate] = useState('2026-10-04');
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(9); // 9 = Oct
  const [selectedBookingModal, setSelectedBookingModal] = useState(null);

  const pad = (n) => String(n).padStart(2, '0');
  const makeDateKey = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`;

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const calendarGrid = useMemo(() => {
    const firstDayObj = new Date(viewYear, viewMonth, 1);
    const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();
    const startDayOffset = (firstDayObj.getDay() + 6) % 7;

    const days = [];
    for (let i = startDayOffset - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
      const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
      days.push({
        dayNumber: dayNum,
        dateKey: makeDateKey(prevYear, prevMonth, dayNum),
        isCurrentMonth: false
      });
    }

    for (let d = 1; d <= daysInCurrentMonth; d++) {
      days.push({
        dayNumber: d,
        dateKey: makeDateKey(viewYear, viewMonth, d),
        isCurrentMonth: true
      });
    }

    const remaining = (7 - (days.length % 7)) % 7;
    for (let n = 1; n <= remaining; n++) {
      const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
      const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
      days.push({
        dayNumber: n,
        dateKey: makeDateKey(nextYear, nextMonth, n),
        isCurrentMonth: false
      });
    }
    return days;
  }, [viewYear, viewMonth]);

  const isLocked = (slot) => {
    return lockedSlots.includes(`${selectedDate}_${slot}`);
  };

  const getBookingForSlot = (slot) => {
    return bookings.find(
      (b) => b.date === selectedDate && b.time === slot && b.status !== 'CANCELLED'
    );
  };

  const dayBookings = bookings.filter(
    (b) => b.date === selectedDate && b.status !== 'CANCELLED'
  );
  const dayLockedCount = TIME_SLOTS.filter((s) => isLocked(s)).length;
  const dayAvailableCount = TIME_SLOTS.length - dayBookings.length - dayLockedCount;

  const handleLockAll = () => {
    if (lockAllSlotsForDate) {
      lockAllSlotsForDate(selectedDate, TIME_SLOTS);
    } else {
      TIME_SLOTS.forEach((slot) => {
        const slotKey = `${selectedDate}_${slot}`;
        if (!lockedSlots.includes(slotKey)) toggleSlotLock(slotKey);
      });
    }
  };

  const handleUnlockAll = () => {
    if (unlockAllSlotsForDate) {
      unlockAllSlotsForDate(selectedDate);
    } else {
      TIME_SLOTS.forEach((slot) => {
        const slotKey = `${selectedDate}_${slot}`;
        if (lockedSlots.includes(slotKey)) toggleSlotLock(slotKey);
      });
    }
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '24px 32px 60px' }}>
      {/* Page Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              backgroundColor: '#5C1929',
              color: '#FAF6F0',
              fontSize: '11px',
              fontWeight: '800',
              padding: '3px 10px',
              borderRadius: '999px'
            }}>
              VẬN HÀNH TIỆM B
            </span>
            <span style={{ fontSize: '13px', color: 'rgba(62, 16, 27, 0.65)' }}>
              • Quản lý nhận khách và khóa slot chống quá tải
            </span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#3E101B', margin: 0 }}>
            Lịch Làm Việc & Khóa Khung Giờ
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleLockAll}
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              backgroundColor: '#FFEBEE',
              color: '#C62828',
              fontSize: '12.5px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Lock size={15} />
            <span>Khóa cả ngày {selectedDate}</span>
          </button>

          <button
            onClick={handleUnlockAll}
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              backgroundColor: '#E8F5E9',
              color: '#2E7D32',
              fontSize: '12.5px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Unlock size={15} />
            <span>Mở lại tất cả khung giờ</span>
          </button>
        </div>
      </div>

      {/* 2-Column Desktop Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(340px, 420px) 1fr',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* Left Column: Interactive Month Calendar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="warm-glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
            {/* Month Header Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <button
                onClick={handlePrevMonth}
                style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FBF0EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5C1929' }}
              >
                <ChevronLeft size={18} />
              </button>

              <div style={{ fontSize: '16px', fontWeight: '800', color: '#3E101B' }}>
                {MONTH_NAMES[viewMonth]} {viewYear}
              </div>

              <button
                onClick={handleNextMonth}
                style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FBF0EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5C1929' }}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Weekdays Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center', marginBottom: '8px' }}>
              {WEEKDAYS.map((w) => (
                <div key={w} style={{ fontSize: '12px', fontWeight: '800', color: 'rgba(62, 16, 27, 0.5)' }}>
                  {w}
                </div>
              ))}
            </div>

            {/* Calendar Days Cells */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
              {calendarGrid.map((d, idx) => {
                const isSelected = selectedDate === d.dateKey;
                const isToday = d.dateKey === '2026-10-04';
                const hasBookingOnDay = bookings.some((b) => b.date === d.dateKey && b.status !== 'CANCELLED');
                const isDayLocked = lockedSlots.some((k) => k.startsWith(`${d.dateKey}_`));

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(d.dateKey)}
                    style={{
                      height: '46px',
                      borderRadius: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: isSelected || isToday ? '800' : '600',
                      backgroundColor: isSelected ? '#5C1929' : isToday ? '#FBF0EC' : '#FFFFFF',
                      color: isSelected ? '#FAF6F0' : d.isCurrentMonth ? '#3E101B' : 'rgba(62, 16, 27, 0.25)',
                      border: isSelected ? '1px solid #5C1929' : isToday ? '1px solid #C49E65' : '1px solid rgba(196, 158, 101, 0.15)',
                      position: 'relative'
                    }}
                  >
                    <span>{d.dayNumber}</span>
                    <div style={{ display: 'flex', gap: '3px', marginTop: '2px' }}>
                      {hasBookingOnDay && (
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: isSelected ? '#FAF6F0' : '#2E7D32' }} />
                      )}
                      {isDayLocked && (
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: isSelected ? '#C49E65' : '#C62828' }} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Day Stats Card */}
          <div className="warm-glass-card" style={{ padding: '20px', borderRadius: '18px' }}>
            <h3 style={{ fontSize: '14.5px', fontWeight: '800', color: '#3E101B', marginBottom: '14px' }}>
              Thống kê ngày: {selectedDate}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', backgroundColor: '#E8F5E9', fontSize: '13px' }}>
                <span style={{ color: '#2E7D32', fontWeight: '700' }}>Slot đang mở / nhận khách:</span>
                <strong style={{ color: '#2E7D32' }}>{dayAvailableCount} slot</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', backgroundColor: '#E3F2FD', fontSize: '13px' }}>
                <span style={{ color: '#1565C0', fontWeight: '700' }}>Khách đã đặt & cọc:</span>
                <strong style={{ color: '#1565C0' }}>{dayBookings.length} khách</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', backgroundColor: '#FFEBEE', fontSize: '13px' }}>
                <span style={{ color: '#C62828', fontWeight: '700' }}>Khung giờ đang khóa:</span>
                <strong style={{ color: '#C62828' }}>{dayLockedCount} slot</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Time Slots Timeline Grid */}
        <div className="warm-glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#3E101B', margin: 0 }}>
                Chi Tiết Khung Giờ Ngày {selectedDate}
              </h2>
              <p style={{ fontSize: '12.5px', color: 'rgba(62, 16, 27, 0.65)', marginTop: '2px' }}>
                Nhấn trực tiếp vào từng khung giờ để Khóa hoặc Mở cho khách đặt
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {TIME_SLOTS.map((slot) => {
              const locked = isLocked(slot);
              const booked = getBookingForSlot(slot);
              const slotKey = `${selectedDate}_${slot}`;

              return (
                <div
                  key={slot}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    backgroundColor: booked ? '#F0F9FF' : locked ? '#FFF5F5' : '#FFFFFF',
                    border: booked ? '1.5px solid #BAE6FD' : locked ? '1.5px solid #FECACA' : '1px solid rgba(196, 158, 101, 0.2)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '15px',
                      fontWeight: '800',
                      color: booked ? '#0369A1' : locked ? '#991B1B' : '#5C1929',
                      minWidth: '80px'
                    }}>
                      <Clock size={16} />
                      <span>{slot}</span>
                    </div>

                    <div>
                      {booked ? (
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '13px', fontWeight: '800', color: '#0369A1' }}>
                              {booked.customerName || 'Khách đặt lịch'}
                            </span>
                            <span style={{
                              fontSize: '10.5px',
                              fontWeight: '700',
                              backgroundColor: '#E0F2FE',
                              color: '#0369A1',
                              padding: '2px 8px',
                              borderRadius: '6px'
                            }}>
                              ĐÃ CỌC {booked.depositAmount ? booked.depositAmount.toLocaleString() : '---'}đ
                            </span>
                          </div>
                          <div style={{ fontSize: '12px', color: 'rgba(3, 105, 161, 0.8)', marginTop: '2px' }}>
                            Dịch vụ: <strong>{booked.serviceName}</strong> • SĐT: {booked.customerPhone || '0908***'}
                          </div>
                        </div>
                      ) : locked ? (
                        <div>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#991B1B' }}>
                            Khung giờ đã khóa
                          </span>
                          <div style={{ fontSize: '11.5px', color: 'rgba(153, 27, 27, 0.7)' }}>
                            Khách hàng không thể đặt lịch vào giờ này
                          </div>
                        </div>
                      ) : (
                        <div>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#15803D' }}>
                            Đang mở nhận khách
                          </span>
                          <div style={{ fontSize: '11.5px', color: 'rgba(21, 128, 61, 0.7)' }}>
                            Hiển thị sẵn sàng trên ứng dụng khách hàng
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {booked ? (
                      <button
                        onClick={() => setSelectedBookingModal(booked)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#E0F2FE',
                          color: '#0369A1',
                          fontSize: '12px',
                          fontWeight: '700'
                        }}
                      >
                        Chi tiết khách
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleSlotLock(slotKey)}
                        style={{
                          padding: '7px 16px',
                          borderRadius: '10px',
                          backgroundColor: locked ? '#E8F5E9' : '#FBF0EC',
                          color: locked ? '#2E7D32' : '#5C1929',
                          fontSize: '12px',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {locked ? (
                          <>
                            <Unlock size={14} />
                            <span>Mở lại slot</span>
                          </>
                        ) : (
                          <>
                            <Lock size={14} />
                            <span>Khóa slot này</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBookingModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(24, 8, 14, 0.65)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '480px',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '24px',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedBookingModal(null)}
              style={{ position: 'absolute', top: '18px', right: '18px', color: '#5C1929' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#3E101B', marginBottom: '14px' }}>
              Thông Tin Khách Đặt Lịch
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div><strong>Mã lịch hẹn:</strong> #{selectedBookingModal.id}</div>
              <div><strong>Khách hàng:</strong> {selectedBookingModal.customerName || 'Khách đặt qua app'}</div>
              <div><strong>Số điện thoại:</strong> {selectedBookingModal.customerPhone || '0908 888 999'}</div>
              <div><strong>Dịch vụ:</strong> {selectedBookingModal.serviceName}</div>
              <div><strong>Thời gian:</strong> {selectedBookingModal.time} ngày {selectedBookingModal.date}</div>
              <div><strong>Tổng tiền:</strong> {selectedBookingModal.totalPrice?.toLocaleString()}đ</div>
              <div><strong>Tiền cọc đã chuyển:</strong> {selectedBookingModal.depositAmount?.toLocaleString()}đ</div>
              <div><strong>Trạng thái:</strong> {selectedBookingModal.statusLabel}</div>
            </div>

            <button
              onClick={() => setSelectedBookingModal(null)}
              className="btn-burgundy-cta"
              style={{ width: '100%', marginTop: '20px', height: '42px', borderRadius: '12px' }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
