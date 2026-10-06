import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarDays,
  Calendar,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Phone,
  X,
  RotateCcw
} from 'lucide-react';
import { TIME_SLOTS } from '../../data/mockData';

const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const MONTH_NAMES = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

export const PartnerCalendar = () => {
  const {
    lockedSlots,
    toggleSlotLock,
    lockAllSlotsForDate,
    unlockAllSlotsForDate,
    bookings
  } = useApp();

  // Selected date (Default to 2026-10-04)
  const [selectedDate, setSelectedDate] = useState('2026-10-04');

  // Calendar month/year navigation state
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(9); // 0-indexed: 9 = October

  // View mode: 'month' (Lịch to / toàn tháng) or 'compact' (Thanh tuần gọn)
  const [calendarMode, setCalendarMode] = useState('month');

  // Customer booking detail modal
  const [activeBookingModal, setActiveBookingModal] = useState(null);

  // Month navigation handlers
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

  const handleJumpToday = () => {
    setViewYear(2026);
    setViewMonth(9);
    setSelectedDate('2026-10-04');
  };

  // Helper formatting
  const pad = (n) => String(n).padStart(2, '0');
  const makeDateKey = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`;

  // Generate Calendar Days Grid for viewYear & viewMonth
  const calendarGrid = useMemo(() => {
    const firstDayObj = new Date(viewYear, viewMonth, 1);
    const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    // Monday-based offset (0: Monday, 6: Sunday)
    const startDayOffset = (firstDayObj.getDay() + 6) % 7;

    const days = [];

    // Previous month padding days
    for (let i = startDayOffset - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
      const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
      days.push({
        dayNumber: dayNum,
        dateKey: makeDateKey(prevYear, prevMonth, dayNum),
        isCurrentMonth: false,
        month: prevMonth,
        year: prevYear
      });
    }

    // Current month days
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      days.push({
        dayNumber: d,
        dateKey: makeDateKey(viewYear, viewMonth, d),
        isCurrentMonth: true,
        month: viewMonth,
        year: viewYear
      });
    }

    // Next month padding days to complete rows of 7
    const remaining = (7 - (days.length % 7)) % 7;
    for (let n = 1; n <= remaining; n++) {
      const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
      const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
      days.push({
        dayNumber: n,
        dateKey: makeDateKey(nextYear, nextMonth, n),
        isCurrentMonth: false,
        month: nextMonth,
        year: nextYear
      });
    }

    return days;
  }, [viewYear, viewMonth]);

  // Check if slot is locked on selected date
  const isLocked = (slot) => {
    const slotKey = `${selectedDate}_${slot}`;
    return lockedSlots.includes(slotKey);
  };

  // Get active booking on slot
  const getBookingForSlot = (slot) => {
    return bookings.find(
      (b) =>
        b.date === selectedDate &&
        b.time === slot &&
        b.status !== 'CANCELLED'
    );
  };

  // Selected date statistics
  const dayBookings = bookings.filter(
    (b) => b.date === selectedDate && b.status !== 'CANCELLED'
  );
  const dayLockedCount = TIME_SLOTS.filter((s) => isLocked(s)).length;
  const dayAvailableCount = TIME_SLOTS.length - dayBookings.length - dayLockedCount;

  // Format selected date header in Vietnamese
  const formattedSelectedDateText = useMemo(() => {
    if (!selectedDate) return '';
    const [y, m, d] = selectedDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayOfWeek = dayNames[dateObj.getDay()];
    const isToday = selectedDate === '2026-10-04';
    return {
      dayOfWeek,
      dateFormatted: `${pad(d)}/${pad(m)}/${y}`,
      fullText: `${dayOfWeek}, ${pad(d)}/${pad(m)}/${y}`,
      isToday
    };
  }, [selectedDate]);

  // Batch actions
  const handleLockAllDay = () => {
    if (lockAllSlotsForDate) {
      lockAllSlotsForDate(selectedDate, TIME_SLOTS);
    } else {
      TIME_SLOTS.forEach((slot) => {
        const slotKey = `${selectedDate}_${slot}`;
        if (!lockedSlots.includes(slotKey)) {
          toggleSlotLock(slotKey);
        }
      });
    }
  };

  const handleUnlockAllDay = () => {
    if (unlockAllSlotsForDate) {
      unlockAllSlotsForDate(selectedDate);
    } else {
      TIME_SLOTS.forEach((slot) => {
        const slotKey = `${selectedDate}_${slot}`;
        if (lockedSlots.includes(slotKey)) {
          toggleSlotLock(slotKey);
        }
      });
    }
  };

  // Monthly aggregate stats for calendar badge
  const monthlyStats = useMemo(() => {
    const currentMonthKey = `${viewYear}-${pad(viewMonth + 1)}`;
    const monthBookings = bookings.filter(
      (b) => b.date.startsWith(currentMonthKey) && b.status !== 'CANCELLED'
    );
    const monthLockedCount = lockedSlots.filter((k) => k.startsWith(currentMonthKey)).length;
    return {
      bookingCount: monthBookings.length,
      lockedCount: monthLockedCount
    };
  }, [viewYear, viewMonth, bookings, lockedSlots]);

  return (
    <div style={{ padding: '16px 18px 150px' }} className="animate-fade-up">
      {/* Screen Title & Role Header */}
      <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #691F31 0%, #8C2C45 100%)',
              color: '#FFF8F4',
              boxShadow: '0 2px 6px rgba(105, 31, 49, 0.25)'
            }}>
              <CalendarDays size={14} />
            </span>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#691F31', letterSpacing: '-0.3px', margin: 0 }}>
              Lịch Tiệm & Khóa Giờ
            </h2>
          </div>
          <p style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.7)', marginTop: '4px', lineHeight: 1.4 }}>
            Quản lý lịch hẹn, thợ bận & chủ động khóa slot để tránh trùng lịch.
          </p>
        </div>

        {/* View mode toggle button */}
        <div style={{
          display: 'flex',
          background: 'rgba(241, 208, 201, 0.45)',
          padding: '3px',
          borderRadius: '12px',
          border: '1px solid rgba(201, 168, 117, 0.3)'
        }}>
          <button
            onClick={() => setCalendarMode('month')}
            title="Lịch tháng to"
            style={{
              padding: '5px 8px',
              borderRadius: '9px',
              border: 'none',
              background: calendarMode === 'month' ? '#691F31' : 'transparent',
              color: calendarMode === 'month' ? '#FFF8F4' : '#691F31',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease'
            }}
          >
            <Calendar size={13} />
            <span>Tháng to</span>
          </button>
          <button
            onClick={() => setCalendarMode('compact')}
            title="Thanh 7 ngày gọn"
            style={{
              padding: '5px 8px',
              borderRadius: '9px',
              border: 'none',
              background: calendarMode === 'compact' ? '#691F31' : 'transparent',
              color: calendarMode === 'compact' ? '#FFF8F4' : '#691F31',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease'
            }}
          >
            <Clock size={13} />
            <span>7 ngày</span>
          </button>
        </div>
      </div>

      {/* FULL MONTH CALENDAR CARD (LỊCH TO) */}
      {calendarMode === 'month' && (
        <div
          className="warm-glass-card"
          style={{
            borderRadius: '20px',
            padding: '14px 12px 12px',
            marginBottom: '14px',
            background: 'linear-gradient(180deg, rgba(255, 253, 249, 0.95) 0%, rgba(248, 242, 236, 0.92) 100%)',
            border: '1px solid rgba(201, 168, 117, 0.35)',
            boxShadow: '0 8px 24px -6px rgba(105, 31, 49, 0.08)'
          }}
        >
          {/* Calendar Header with Month/Year Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
            padding: '0 4px'
          }}>
            {/* Prev month button */}
            <button
              onClick={handlePrevMonth}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid rgba(201, 168, 117, 0.4)',
                background: '#FFF8F4',
                color: '#691F31',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(105, 31, 49, 0.06)',
                transition: 'all 0.15s ease'
              }}
            >
              <ChevronLeft size={16} />
            </button>

            {/* Current Month & Year Display */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '15px',
                fontWeight: '800',
                color: '#691F31',
                letterSpacing: '-0.2px'
              }}>
                {MONTH_NAMES[viewMonth]}, {viewYear}
              </div>
              <div style={{ fontSize: '10px', color: '#8C5A65', marginTop: '1px' }}>
                {monthlyStats.bookingCount} lịch hẹn • {monthlyStats.lockedCount} slot khóa
              </div>
            </div>

            {/* Action buttons (Next month + Jump Today) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={handleJumpToday}
                style={{
                  padding: '4px 8px',
                  borderRadius: '10px',
                  border: '1px solid rgba(201, 168, 117, 0.4)',
                  background: selectedDate === '2026-10-04' ? 'rgba(241, 208, 201, 0.6)' : '#FFF8F4',
                  color: '#691F31',
                  fontSize: '10.5px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                <RotateCcw size={10} />
                <span>Hôm nay</span>
              </button>

              <button
                onClick={handleNextMonth}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid rgba(201, 168, 117, 0.4)',
                  background: '#FFF8F4',
                  color: '#691F31',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(105, 31, 49, 0.06)',
                  transition: 'all 0.15s ease'
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Weekday Labels (T2 -> CN) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '3px',
            marginBottom: '6px',
            textAlign: 'center'
          }}>
            {WEEKDAYS.map((w, idx) => (
              <div
                key={w}
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: idx === 6 ? '#A62639' : '#8C5A65', // CN in subtle accent
                  padding: '4px 0'
                }}
              >
                {w}
              </div>
            ))}
          </div>

          {/* Days Grid (7 columns) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px'
          }}>
            {calendarGrid.map((cell, idx) => {
              const isSel = selectedDate === cell.dateKey;
              const isToday = cell.dateKey === '2026-10-04';

              // Bookings on this cell
              const cellBookings = bookings.filter(
                (b) => b.date === cell.dateKey && b.status !== 'CANCELLED'
              );
              const hasBookings = cellBookings.length > 0;

              // Locked slots on this cell
              const cellLockedCount = lockedSlots.filter((k) =>
                k.startsWith(cell.dateKey + '_')
              ).length;
              const hasLocked = cellLockedCount > 0;

              return (
                <button
                  key={`${cell.dateKey}_${idx}`}
                  onClick={() => {
                    setSelectedDate(cell.dateKey);
                    if (!cell.isCurrentMonth) {
                      setViewMonth(cell.month);
                      setViewYear(cell.year);
                    }
                  }}
                  style={{
                    position: 'relative',
                    aspectRatio: '1',
                    minHeight: '42px',
                    borderRadius: '12px',
                    border: isSel
                      ? '2px solid #691F31'
                      : isToday
                      ? '1.5px solid #C9A875'
                      : '1px solid rgba(201, 168, 117, 0.15)',
                    background: isSel
                      ? '#691F31'
                      : isToday
                      ? 'rgba(241, 208, 201, 0.45)'
                      : cell.isCurrentMonth
                      ? '#FFFFFF'
                      : 'rgba(248, 242, 236, 0.45)',
                    color: isSel
                      ? '#FFF8F4'
                      : cell.isCurrentMonth
                      ? '#4A1525'
                      : '#BAA3A8',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: '2px',
                    boxShadow: isSel
                      ? '0 4px 12px rgba(105, 31, 49, 0.3)'
                      : 'none',
                    transform: isSel ? 'scale(1.04)' : 'none',
                    transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: cell.isCurrentMonth ? 1 : 0.45
                  }}
                >
                  {/* Today Badge Text */}
                  {isToday && !isSel && (
                    <span style={{
                      position: 'absolute',
                      top: '2px',
                      fontSize: '7.5px',
                      fontWeight: '800',
                      color: '#8C2C45',
                      lineHeight: 1
                    }}>
                      Nay
                    </span>
                  )}

                  {/* Day Number */}
                  <span style={{
                    fontSize: '12.5px',
                    fontWeight: isSel || isToday ? '800' : '600',
                    marginTop: isToday && !isSel ? '4px' : '0'
                  }}>
                    {cell.dayNumber}
                  </span>

                  {/* Indicator Dots Bar (Bookings & Locked) */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2.5px',
                    marginTop: '2px',
                    height: '5px'
                  }}>
                    {hasBookings && (
                      <span
                        title={`${cellBookings.length} lịch hẹn`}
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          backgroundColor: isSel ? '#52D478' : '#2E7D32',
                          boxShadow: '0 0 4px rgba(46, 125, 50, 0.6)'
                        }}
                      />
                    )}
                    {hasLocked && (
                      <span
                        title={`${cellLockedCount} slot đã khóa`}
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          backgroundColor: isSel ? '#FBD38D' : '#D97706'
                        }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Legend & Help footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(201, 168, 117, 0.25)',
            marginTop: '10px',
            paddingTop: '8px',
            fontSize: '10px',
            color: '#8C5A65'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2E7D32' }} />
                <span>Có khách đặt</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D97706' }} />
                <span>Đã khóa slot</span>
              </span>
            </div>
            <span style={{ fontStyle: 'italic', opacity: 0.9 }}>
              Chạm ngày để quản lý
            </span>
          </div>
        </div>
      )}

      {/* COMPACT 7-DAY STRIP (TÙY CHỌN GỌN) */}
      {calendarMode === 'compact' && (
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '14px',
          scrollbarWidth: 'none'
        }}>
          {[
            { date: '2026-10-04', label: 'Hôm nay', day: 'CN, 04/10' },
            { date: '2026-10-05', label: 'Ngày mai', day: 'T2, 05/10' },
            { date: '2026-10-06', label: 'Thứ Ba', day: 'T3, 06/10' },
            { date: '2026-10-07', label: 'Thứ Tư', day: 'T4, 07/10' },
            { date: '2026-10-08', label: 'Thứ Năm', day: 'T5, 08/10' },
            { date: '2026-10-09', label: 'Thứ Sáu', day: 'T6, 09/10' },
            { date: '2026-10-10', label: 'Thứ Bảy', day: 'T7, 10/10' }
          ].map((d) => {
            const isSel = selectedDate === d.date;
            const count = bookings.filter((b) => b.date === d.date && b.status !== 'CANCELLED').length;
            return (
              <button
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                style={{
                  padding: '9px 12px',
                  borderRadius: '14px',
                  textAlign: 'center',
                  minWidth: '85px',
                  backgroundColor: isSel ? '#691F31' : '#FFFFFF',
                  color: isSel ? '#FFF8F4' : '#691F31',
                  border: isSel ? '1.5px solid #691F31' : '1px solid rgba(201, 168, 117, 0.3)',
                  boxShadow: isSel ? '0 4px 10px rgba(105, 31, 49, 0.25)' : 'none',
                  transition: 'all 0.18s ease',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '10px', opacity: 0.85 }}>{d.label}</div>
                <div style={{ fontSize: '12px', fontWeight: '800', marginTop: '2px' }}>{d.day}</div>
                {count > 0 && (
                  <div style={{
                    fontSize: '9px',
                    marginTop: '3px',
                    padding: '1px 6px',
                    borderRadius: '6px',
                    backgroundColor: isSel ? 'rgba(255,255,255,0.2)' : 'rgba(46, 125, 50, 0.12)',
                    color: isSel ? '#FFF8F4' : '#2E7D32',
                    fontWeight: '700'
                  }}>
                    {count} khách
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* SELECTED DATE DETAILS & QUICK BATCH BAR */}
      <div
        className="warm-glass-card"
        style={{
          borderRadius: '16px',
          padding: '12px 14px',
          marginBottom: '14px',
          border: '1px solid rgba(201, 168, 117, 0.35)',
          background: '#FFFDF9'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          borderBottom: '1px solid rgba(201, 168, 117, 0.2)',
          paddingBottom: '8px',
          marginBottom: '8px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#691F31' }}>
                {formattedSelectedDateText.fullText}
              </span>
              {formattedSelectedDateText.isToday && (
                <span style={{
                  fontSize: '9.5px',
                  fontWeight: '800',
                  color: '#691F31',
                  background: 'rgba(241, 208, 201, 0.65)',
                  padding: '1px 6px',
                  borderRadius: '6px'
                }}>
                  Hôm nay
                </span>
              )}
            </div>
            {/* Quick summary badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                color: '#2E7D32',
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                padding: '2px 6px',
                borderRadius: '6px'
              }}>
                {dayBookings.length} Lịch đặt
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                color: '#D97706',
                backgroundColor: 'rgba(217, 119, 6, 0.1)',
                padding: '2px 6px',
                borderRadius: '6px'
              }}>
                {dayLockedCount} Đã khóa
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                color: '#691F31',
                backgroundColor: 'rgba(105, 31, 49, 0.08)',
                padding: '2px 6px',
                borderRadius: '6px'
              }}>
                {dayAvailableCount} Sẵn sàng
              </span>
            </div>
          </div>

          {/* Batch Lock / Unlock Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={handleLockAllDay}
              title="Khóa tất cả 10 khung giờ trong ngày"
              style={{
                padding: '5px 9px',
                borderRadius: '10px',
                border: '1px solid rgba(201, 168, 117, 0.4)',
                background: '#FFF8F4',
                color: '#691F31',
                fontSize: '10.5px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Lock size={11} />
              <span>Khóa ngày</span>
            </button>
            <button
              onClick={handleUnlockAllDay}
              title="Mở lại tất cả khung giờ"
              style={{
                padding: '5px 9px',
                borderRadius: '10px',
                border: '1px solid rgba(201, 168, 117, 0.4)',
                background: '#FFF8F4',
                color: '#2E7D32',
                fontSize: '10.5px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Unlock size={11} />
              <span>Mở tất cả</span>
            </button>
          </div>
        </div>

        {/* Tip helper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10.5px', color: '#691F31', opacity: 0.9 }}>
          <AlertCircle size={14} color="#691F31" style={{ flexShrink: 0 }} />
          <span>
            Nhấn <strong>"Khóa slot"</strong> vào khung giờ muốn nghỉ để khách không thể đặt giờ đó.
          </span>
        </div>
      </div>

      {/* TIME SLOTS LIST FOR SELECTED DATE */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
        {TIME_SLOTS.map((slot) => {
          const locked = isLocked(slot);
          const booking = getBookingForSlot(slot);
          const slotKey = `${selectedDate}_${slot}`;

          return (
            <div
              key={slot}
              className="warm-glass-card hover-blush"
              style={{
                borderRadius: '16px',
                padding: '11px 13px',
                border: locked
                  ? '1.5px dashed rgba(105, 31, 49, 0.35)'
                  : booking
                  ? '1.5px solid #2E7D32'
                  : '1px solid rgba(201, 168, 117, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                opacity: locked ? 0.78 : 1,
                background: booking
                  ? 'linear-gradient(135deg, rgba(232, 245, 233, 0.6) 0%, #FFFFFF 100%)'
                  : locked
                  ? 'rgba(248, 242, 236, 0.6)'
                  : '#FFFFFF',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Slot Time Pill */}
              <div style={{
                padding: '6px 10px',
                borderRadius: '10px',
                backgroundColor: locked
                  ? '#EAE4E0'
                  : booking
                  ? 'rgba(46, 125, 50, 0.15)'
                  : 'rgba(241, 208, 201, 0.5)',
                color: locked ? '#7A6B6E' : booking ? '#2E7D32' : '#691F31',
                fontWeight: '800',
                fontSize: '13px',
                letterSpacing: '-0.2px',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}>
                <Clock size={12} />
                <span>{slot}</span>
              </div>

              {/* Status / Customer Booking info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {booking ? (
                  <div
                    onClick={() => setActiveBookingModal(booking)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#691F31' }}>
                        {booking.customerName}
                      </span>
                      <span style={{
                        fontSize: '9px',
                        backgroundColor: '#E8F5E9',
                        color: '#2E7D32',
                        fontWeight: '800',
                        padding: '1.5px 6px',
                        borderRadius: '4px'
                      }}>
                        Đã cọc {booking.depositAmount.toLocaleString()}đ
                      </span>
                    </div>
                    <div style={{
                      fontSize: '10.5px',
                      color: 'rgba(105, 31, 49, 0.75)',
                      marginTop: '2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {booking.serviceName} • {booking.staffName}
                    </div>
                  </div>
                ) : locked ? (
                  <div style={{
                    fontSize: '11px',
                    color: '#7A6B6E',
                    fontStyle: 'italic',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <Lock size={12} color="#8C5A65" />
                    <span>Đã khóa slot (Khách không thể đặt)</span>
                  </div>
                ) : (
                  <div style={{
                    fontSize: '11.5px',
                    color: '#2E7D32',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2E7D32' }} />
                    <span>Khung giờ trống sẵn sàng đón khách</span>
                  </div>
                )}
              </div>

              {/* Action Button: Lock / Unlock or Booking details */}
              {!booking ? (
                <button
                  onClick={() => toggleSlotLock(slotKey)}
                  style={{
                    padding: '6px 13px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: locked ? '#691F31' : '#F1D0C9',
                    color: locked ? '#FFF8F4' : '#691F31',
                    boxShadow: locked
                      ? '0 2px 6px rgba(105, 31, 49, 0.25)'
                      : '0 1px 4px rgba(241, 208, 201, 0.5)',
                    transition: 'all 0.18s ease'
                  }}
                >
                  {locked ? (
                    <>
                      <Unlock size={12} />
                      <span>Mở lại</span>
                    </>
                  ) : (
                    <>
                      <Lock size={12} />
                      <span>Khóa slot</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => setActiveBookingModal(booking)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '999px',
                    fontSize: '10.5px',
                    fontWeight: '700',
                    border: '1px solid rgba(46, 125, 50, 0.35)',
                    background: '#E8F5E9',
                    color: '#2E7D32',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <CheckCircle2 size={13} />
                  <span>Chi tiết</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* APPOINTMENT DETAIL MODAL (WHEN OWNER CLICKS ON A BOOKED SLOT) */}
      {activeBookingModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(30, 8, 14, 0.55)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setActiveBookingModal(null)}
        >
          <div
            className="warm-glass-card animate-fade-up"
            style={{
              width: '100%',
              maxWidth: '360px',
              borderRadius: '24px',
              padding: '20px',
              background: '#FFFDF9',
              boxShadow: '0 20px 40px rgba(105, 31, 49, 0.25)',
              border: '1.5px solid rgba(201, 168, 117, 0.4)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'rgba(241, 208, 201, 0.6)',
                  color: '#691F31',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User size={16} />
                </span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#691F31' }}>
                    Chi Tiết Lịch Hẹn
                  </h3>
                  <span style={{ fontSize: '10.5px', color: '#8C5A65' }}>
                    Mã đặt: #{activeBookingModal.id}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveBookingModal(null)}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(105, 31, 49, 0.08)',
                  color: '#691F31',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Customer Details Box */}
            <div style={{
              background: 'rgba(248, 242, 236, 0.65)',
              borderRadius: '16px',
              padding: '12px 14px',
              marginBottom: '14px',
              border: '1px solid rgba(201, 168, 117, 0.2)'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#691F31' }}>
                {activeBookingModal.customerName}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '12px', color: '#691F31' }}>
                <Phone size={13} color="#2E7D32" />
                <span>{activeBookingModal.customerPhone}</span>
                <a
                  href={`tel:${activeBookingModal.customerPhone?.replace(/\s/g, '')}`}
                  style={{
                    marginLeft: 'auto',
                    fontSize: '10.5px',
                    fontWeight: '700',
                    color: '#2E7D32',
                    backgroundColor: '#E8F5E9',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    textDecoration: 'none'
                  }}
                >
                  Gọi ngay
                </a>
              </div>
            </div>

            {/* Service & Staff Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8C5A65' }}>Dịch vụ:</span>
                <span style={{ fontWeight: '700', color: '#691F31', textAlign: 'right', maxWidth: '65%' }}>
                  {activeBookingModal.serviceName}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8C5A65' }}>Kỹ thuật viên:</span>
                <span style={{ fontWeight: '700', color: '#691F31' }}>
                  {activeBookingModal.staffName}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8C5A65' }}>Khung giờ:</span>
                <span style={{ fontWeight: '800', color: '#691F31' }}>
                  {activeBookingModal.time} • {activeBookingModal.date}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8C5A65' }}>Trạng thái cọc:</span>
                <span style={{ fontWeight: '800', color: '#2E7D32' }}>
                  {activeBookingModal.statusLabel || 'Đã xác nhận cọc'}
                </span>
              </div>
            </div>

            {/* Payment Summary */}
            <div style={{
              borderTop: '1px dashed rgba(201, 168, 117, 0.4)',
              paddingTop: '10px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px' }}>
                <span style={{ color: '#8C5A65' }}>Tổng chi phí dịch vụ:</span>
                <span style={{ fontWeight: '700', color: '#691F31' }}>
                  {activeBookingModal.totalPrice?.toLocaleString()}đ
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px' }}>
                <span style={{ color: '#2E7D32', fontWeight: '600' }}>Tiền cọc đã nhận:</span>
                <span style={{ fontWeight: '800', color: '#2E7D32' }}>
                  {activeBookingModal.depositAmount?.toLocaleString()}đ
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '800', marginTop: '6px' }}>
                <span style={{ color: '#691F31' }}>Thu tại tiệm (80% còn lại):</span>
                <span style={{ color: '#691F31' }}>
                  {((activeBookingModal.totalPrice || 0) - (activeBookingModal.depositAmount || 0)).toLocaleString()}đ
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setActiveBookingModal(null)}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #691F31 0%, #8C2C45 100%)',
                color: '#FFF8F4',
                fontWeight: '700',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(105, 31, 49, 0.25)'
              }}
            >
              Đóng chi tiết
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
