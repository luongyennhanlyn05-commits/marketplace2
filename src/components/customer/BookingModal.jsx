import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Calendar,
  Clock,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  CreditCard,
  Wallet,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Timer,
  UserCheck,
  Check,
  Crown
} from 'lucide-react';
import { TIME_SLOTS, SERVICE_ADDONS } from '../../data/mockData';

export const BookingModal = () => {
  const {
    isBookingOpen,
    setIsBookingOpen,
    bookingService,
    bookingStaff,
    services,
    staffList,
    lockedSlots,
    shopInfo,
    createBooking,
    setCustomerTab,
    userTier,
    getTierDiscount,
    membershipTiers,
    displayMode
  } = useApp();

  const [step, setStep] = useState(1);

  // Form State
  const [selectedService, setSelectedService] = useState(bookingService || services[0]);
  const [selectedStaff, setSelectedStaff] = useState(bookingStaff || staffList[0]);
  const [selectedDate, setSelectedDate] = useState('2026-10-04');
  const [selectedTime, setSelectedTime] = useState('14:30');
  const [fullName, setFullName] = useState('Nguyễn Thùy Linh');
  const [phoneNumber, setPhoneNumber] = useState('0988 234 567');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('vietqr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedBooking, setCompletedBooking] = useState(null);

  // Hold slot countdown timer (Module b)
  const [holdSeconds, setHoldSeconds] = useState(300); // 5 minutes

  useEffect(() => {
    if (step !== 2) return;
    const interval = setInterval(() => {
      setHoldSeconds((prev) => {
        if (prev <= 1) {
          alert('Thời gian tạm giữ khung giờ đã hết. Vui lòng chọn lại giờ!');
          setStep(1);
          return 300;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  if (!isBookingOpen) return null;

  const currentService = selectedService || services[0];
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const addonsDuration = selectedAddons.reduce((sum, a) => sum + a.duration, 0);
  const subtotalPrice = currentService.price + addonsTotal;
  const vipDiscountPercent = getTierDiscount(userTier);
  const vipDiscountAmount = Math.round((subtotalPrice * vipDiscountPercent) / 100);
  const totalPrice = subtotalPrice - vipDiscountAmount;
  const totalDuration = currentService.duration + addonsDuration;
  const depositAmount = currentService?.deposit || 50000;
  const remainingAmount = Math.max(0, totalPrice - depositAmount);
  const activeTierObj = membershipTiers.find((t) => t.id === userTier);

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const formatTimer = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const isSlotLocked = (time) => {
    const slotKey = `${selectedDate}_${time}`;
    return lockedSlots.includes(slotKey);
  };

  const handleProceedToHold = () => {
    if (!selectedTime) {
      alert('Vui lòng chọn khung giờ!');
      return;
    }
    if (isSlotLocked(selectedTime)) {
      alert('Khung giờ này đã bị Tiệm B khóa hoặc đã kín chỗ. Vui lòng chọn giờ khác!');
      return;
    }
    setHoldSeconds(300);
    setStep(2);
  };

  const handleConfirmDepositPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const newBooking = createBooking({
        serviceId: currentService.id,
        serviceName: currentService.name,
        staffName: selectedStaff?.name || 'Tiệm B tự sắp xếp',
        date: selectedDate,
        time: selectedTime,
        customerName: fullName,
        customerPhone: phoneNumber,
        addons: selectedAddons.map((a) => a.name),
        totalPrice: totalPrice,
        depositAmount: depositAmount,
        paymentMethod: paymentMethod
      });

      setIsProcessing(false);
      setCompletedBooking(newBooking);
      setStep(3);
    }, 1100);
  };

  const handleClose = () => {
    setIsBookingOpen(false);
    setStep(1);
  };

  const isDesktop = displayMode === 'full' || displayMode === 'desktop';

  const modalContent = (
    <div
      className={isDesktop ? 'animate-fade-up' : 'animate-slide-up'}
      style={{
        position: isDesktop ? 'relative' : 'absolute',
        inset: isDesktop ? 'auto' : 0,
        width: '100%',
        maxWidth: isDesktop ? '520px' : 'none',
        maxHeight: isDesktop ? '88vh' : 'none',
        borderRadius: isDesktop ? '24px' : 0,
        backgroundColor: '#F8F2EC',
        zIndex: isDesktop ? 2010 : 960,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        boxShadow: isDesktop ? '0 25px 60px rgba(0,0,0,0.4)' : 'none'
      }}
    >
      {/* Top Header - Warm Glass */}
      <div style={{
        padding: '14px 18px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201, 168, 117, 0.22)',
        boxShadow: '0 4px 16px rgba(105, 31, 49, 0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {step === 2 && (
            <button onClick={() => setStep(1)} style={{ color: '#691F31', display: 'flex', alignItems: 'center', padding: '4px' }}>
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <div style={{ fontSize: '10px', color: 'rgba(105, 31, 49, 0.65)', fontWeight: '700' }}>
              {shopInfo.name}
            </div>
            <h2 style={{ fontSize: '14px', fontWeight: '800', color: '#691F31' }}>
              {step === 1 && '1. Chọn Dịch Vụ, Thợ & Giờ Hẹn'}
              {step === 2 && '2. Giữ Slot & Đặt Cọc Sandbox'}
              {step === 3 && '3. Xác Nhận Lịch Hẹn Thành Công!'}
            </h2>
          </div>
        </div>

        <button
          onClick={handleClose}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#F6E1DB',
            color: '#691F31',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(201, 168, 117, 0.25)'
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress Line */}
      <div style={{ display: 'flex', gap: '6px', padding: '8px 18px', backgroundColor: '#F8F2EC' }}>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            style={{
              flex: 1,
              height: '4px',
              borderRadius: '999px',
              backgroundColor: step >= s ? '#691F31' : 'rgba(105, 31, 49, 0.12)',
              transition: 'all 0.3s'
            }}
          />
        ))}
      </div>

      <div style={{ padding: '14px 18px 80px', flex: 1 }}>
        {/* STEP 1: SERVICE, STAFF, DATE, TIME */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-up">
            {/* Chọn Dịch Vụ */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '8px' }}>
                Chọn dịch vụ làm đẹp tại Tiệm B:
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {services.map((svc) => {
                  const isSel = currentService.id === svc.id;
                  return (
                    <div
                      key={svc.id}
                      onClick={() => setSelectedService(svc)}
                      className="warm-glass-card"
                      style={{
                        padding: '12px 14px',
                        borderRadius: '16px',
                        backgroundColor: isSel ? 'rgba(246, 225, 219, 0.55)' : 'rgba(255, 255, 255, 0.85)',
                        border: isSel ? '2px solid #691F31' : '1px solid rgba(201, 168, 117, 0.22)',
                        boxShadow: isSel ? '0 4px 14px rgba(105, 31, 49, 0.12)' : 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#691F31' }}>
                          {svc.name}
                        </div>
                        <div style={{ fontSize: '10.5px', color: 'rgba(105, 31, 49, 0.72)', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ backgroundColor: '#F6E1DB', padding: '2px 7px', borderRadius: '999px', fontWeight: '700', color: '#691F31' }}>
                            {svc.duration} phút
                          </span>
                          <span>Cọc giữ slot: <strong>{svc.deposit.toLocaleString()}đ</strong></span>
                        </div>
                      </div>
                      <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#691F31' }}>
                        {svc.price.toLocaleString()}đ
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dịch vụ chọn thêm (Add-on upsell cho Tiệm B) */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#691F31', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Sparkles size={13} color="#C9A875" />
                  <span>Ưu đãi chọn thêm (Dịch vụ đi kèm):</span>
                </label>
                <span style={{ fontSize: '10.5px', color: 'rgba(105, 31, 49, 0.65)' }}>Tùy chọn</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {SERVICE_ADDONS.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className="warm-glass-card hover-blush"
                      style={{
                        padding: '10px 14px',
                        borderRadius: '16px',
                        backgroundColor: isChecked ? 'rgba(246, 225, 219, 0.6)' : 'rgba(255, 255, 255, 0.85)',
                        border: isChecked ? '1.5px solid #691F31' : '1px solid rgba(201, 168, 117, 0.22)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '6px',
                          backgroundColor: isChecked ? '#691F31' : 'transparent',
                          border: isChecked ? 'none' : '1.5px solid rgba(105, 31, 49, 0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFF8F4',
                          flexShrink: 0
                        }}>
                          {isChecked && <Check size={12} />}
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: isChecked ? '800' : '600', color: '#691F31' }}>
                            {addon.name}
                          </div>
                          <div style={{ fontSize: '10px', color: 'rgba(105, 31, 49, 0.65)' }}>
                            +{addon.duration} phút làm đẹp
                          </div>
                        </div>
                      </div>

                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#691F31' }}>
                        +{addon.price.toLocaleString()}đ
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chọn Chuyên Viên / Stylist */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#691F31', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <UserCheck size={14} />
                <span>Chọn chuyên viên phục vụ bạn:</span>
              </label>
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                {staffList.map((st) => {
                  const isSel = (selectedStaff?.id || staffList[0].id) === st.id;
                  return (
                    <div
                      key={st.id}
                      onClick={() => setSelectedStaff(st)}
                      style={{
                        minWidth: '105px',
                        padding: '10px 8px',
                        borderRadius: '16px',
                        textAlign: 'center',
                        backgroundColor: isSel ? '#691F31' : 'rgba(255, 255, 255, 0.85)',
                        color: isSel ? '#F8F2EC' : '#691F31',
                        border: isSel ? '1.5px solid #691F31' : '1px solid rgba(201, 168, 117, 0.22)',
                        cursor: 'pointer',
                        boxShadow: isSel ? '0 4px 12px rgba(105, 31, 49, 0.25)' : 'none',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      <img
                        src={st.avatar}
                        alt={st.name}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 4px', border: isSel ? '1.5px solid #F6E1DB' : '1px solid rgba(201, 168, 117, 0.3)' }}
                      />
                      <div style={{ fontSize: '11px', fontWeight: '800', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {st.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chọn Ngày */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#691F31', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Calendar size={14} />
                <span>Chọn ngày đến Tiệm B:</span>
              </label>
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                {[
                  { date: '2026-10-04', label: 'Hôm nay', day: 'CN, 04/10' },
                  { date: '2026-10-05', label: 'Ngày mai', day: 'T2, 05/10' },
                  { date: '2026-10-06', label: 'Ngày kia', day: 'T3, 06/10' },
                  { date: '2026-10-07', label: 'Thứ Tư', day: 'T4, 07/10' }
                ].map((d) => {
                  const isSel = selectedDate === d.date;
                  return (
                    <button
                      key={d.date}
                      onClick={() => setSelectedDate(d.date)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '16px',
                        textAlign: 'center',
                        minWidth: '90px',
                        backgroundColor: isSel ? '#691F31' : 'rgba(255, 255, 255, 0.85)',
                        color: isSel ? '#F8F2EC' : '#691F31',
                        border: isSel ? '1.5px solid #691F31' : '1px solid rgba(201, 168, 117, 0.22)',
                        boxShadow: isSel ? '0 4px 12px rgba(105, 31, 49, 0.25)' : 'none',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      <div style={{ fontSize: '10px', opacity: 0.8 }}>{d.label}</div>
                      <div style={{ fontSize: '12px', fontWeight: '800', marginTop: '2px' }}>{d.day}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chọn Khung Giờ (Module b) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#691F31', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} />
                  <span>Chọn giờ phục vụ:</span>
                </label>
                <div style={{ display: 'flex', gap: '8px', fontSize: '10px', color: 'rgba(105, 31, 49, 0.6)' }}>
                  <span>● Trống</span>
                  <span style={{ color: '#999' }}>● Đã khóa</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {TIME_SLOTS.map((slot) => {
                  const locked = isSlotLocked(slot);
                  const isSel = selectedTime === slot;

                  if (locked) {
                    return (
                      <div
                        key={slot}
                        style={{
                          padding: '10px 4px',
                          borderRadius: '12px',
                          textAlign: 'center',
                          backgroundColor: '#EBEBEB',
                          color: '#A0A0A0',
                          fontSize: '11px',
                          fontWeight: '600',
                          border: '1px dashed #CCC',
                          cursor: 'not-allowed'
                        }}
                      >
                        <div>{slot}</div>
                        <div style={{ fontSize: '8.5px' }}>Đã khóa</div>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      style={{
                        padding: '10px 4px',
                        borderRadius: '12px',
                        textAlign: 'center',
                        backgroundColor: isSel ? '#691F31' : 'rgba(255, 255, 255, 0.85)',
                        color: isSel ? '#F8F2EC' : '#691F31',
                        fontSize: '12px',
                        fontWeight: isSel ? '800' : '600',
                        border: isSel ? '1.5px solid #691F31' : '1px solid rgba(201, 168, 117, 0.22)',
                        boxShadow: isSel ? '0 3px 10px rgba(105, 31, 49, 0.25)' : 'none',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Thông Tin Người Đặt */}
            <div className="warm-glass-card" style={{
              borderRadius: '20px',
              padding: '16px 18px',
              border: '1px solid rgba(201, 168, 117, 0.25)'
            }}>
              <h4 style={{ fontSize: '12.5px', fontWeight: '800', color: '#691F31', marginBottom: '8px' }}>
                Thông tin nhận lịch hẹn
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Họ và tên của bạn"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: '#FFFFFF',
                    color: '#691F31',
                    border: '1px solid rgba(201, 168, 117, 0.25)'
                  }}
                />
                <input
                  type="text"
                  placeholder="Số điện thoại Zalo"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: '#FFFFFF',
                    color: '#691F31',
                    border: '1px solid rgba(201, 168, 117, 0.25)'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: HOLD TIMER & DEPOSIT CHECKOUT (Module b & c) */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade-up">
            {/* Slot Hold Banner */}
            <div
              className="animate-pulse-ring"
              style={{
                backgroundColor: '#691F31',
                color: '#FFF8F4',
                borderRadius: '20px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 6px 20px rgba(105, 31, 49, 0.28)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Timer size={22} color="#F1D0C9" />
                <div>
                  <div style={{ fontSize: '10.5px', opacity: '0.85', color: '#F6E1DB' }}>Tiệm B đang giữ slot riêng cho bạn:</div>
                  <div style={{ fontSize: '13.5px', fontWeight: '800' }}>
                    {selectedTime} • {selectedDate} ({selectedStaff?.name})
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: 'rgba(241, 208, 201, 0.22)',
                border: '1px solid rgba(241, 208, 201, 0.6)',
                borderRadius: '12px',
                padding: '5px 12px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '9px', display: 'block', opacity: 0.85, fontWeight: '700', color: '#F1D0C9' }}>HẾT HẠN</span>
                <span style={{ fontSize: '15px', fontWeight: '800', fontFamily: 'monospace' }}>
                  {formatTimer(holdSeconds)}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '11.5px', color: 'rgba(105, 31, 49, 0.72)', lineHeight: '1.45', padding: '0 4px' }}>
              Khung giờ này được khóa riêng cho bạn trong <strong>5:00 phút</strong> để tránh khách khác đặt trùng lịch tại Tiệm B.
            </p>

            {/* Chi tiết tiền cọc */}
            <div className="warm-glass-card" style={{
              borderRadius: '20px',
              padding: '16px 18px',
              border: '1px solid rgba(201, 168, 117, 0.25)'
            }}>
              <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#691F31', marginBottom: '10px' }}>
                Chi tiết thanh toán cọc giữ chỗ
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(105, 31, 49, 0.75)' }}>
                  <span>Dịch vụ: {currentService.name}</span>
                  <span style={{ fontWeight: '600' }}>{currentService.price.toLocaleString()}đ</span>
                </div>

                {selectedAddons.map((addon) => (
                  <div key={addon.id} style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(105, 31, 49, 0.75)', paddingLeft: '8px', fontSize: '11.5px' }}>
                    <span>+ {addon.name}</span>
                    <span style={{ fontWeight: '600' }}>+{addon.price.toLocaleString()}đ</span>
                  </div>
                ))}

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(105, 31, 49, 0.75)', fontSize: '11.5px', borderTop: '1px dashed rgba(105, 31, 49, 0.2)', paddingTop: '6px' }}>
                  <span>Tạm tính dịch vụ:</span>
                  <span>{subtotalPrice.toLocaleString()}đ</span>
                </div>

                {vipDiscountPercent > 0 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#2E7D32',
                    backgroundColor: 'rgba(46, 125, 50, 0.08)',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '11.5px',
                    fontWeight: '700'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Crown size={12} color="#2E7D32" />
                      <span>Đặc quyền {activeTierObj?.name || 'Hội viên VIP'} (-{vipDiscountPercent}%):</span>
                    </span>
                    <span>-{vipDiscountAmount.toLocaleString()}đ</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#691F31', fontWeight: '800' }}>
                  <span>Tổng sau ưu đãi VIP:</span>
                  <span>{totalPrice.toLocaleString()}đ</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 14px',
                  backgroundColor: 'rgba(246, 225, 219, 0.45)',
                  borderRadius: '12px',
                  fontWeight: '700',
                  color: '#691F31',
                  border: '1px solid rgba(201, 168, 117, 0.25)'
                }}>
                  <span>TIỀN ĐẶT CỌC GIỮ CHỖ:</span>
                  <span style={{ fontSize: '15px', fontWeight: '800', color: '#691F31' }}>{depositAmount.toLocaleString()}đ</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(105, 31, 49, 0.65)', fontSize: '11px', paddingTop: '2px' }}>
                  <span>Thanh toán nốt tại quầy Tiệm B:</span>
                  <span style={{ fontWeight: '600' }}>{remainingAmount.toLocaleString()}đ</span>
                </div>
              </div>
            </div>

            {/* Cổng thanh toán Sandbox */}
            <div className="warm-glass-card" style={{
              borderRadius: '20px',
              padding: '16px 18px',
              border: '1px solid rgba(201, 168, 117, 0.25)'
            }}>
              <label style={{ fontSize: '12.5px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '10px' }}>
                Phương thức cọc Sandbox trải nghiệm:
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { id: 'vietqr', name: 'Quét Mã VietQR Chuyển Khoản (Khuyên dùng)', icon: QrCode },
                  { id: 'momo', name: 'Ví Điện Tử MoMo Sandbox', icon: Wallet },
                  { id: 'vnpay', name: 'Cổng VNPAY-QR', icon: CreditCard }
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isChecked = paymentMethod === pm.id;
                  return (
                    <div
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      style={{
                        padding: '11px 14px',
                        borderRadius: '14px',
                        backgroundColor: isChecked ? '#691F31' : 'rgba(255, 255, 255, 0.9)',
                        color: isChecked ? '#FFF8F4' : '#691F31',
                        border: isChecked ? '1.5px solid #691F31' : '1px solid rgba(201, 168, 117, 0.22)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      <Icon size={18} color={isChecked ? '#F1D0C9' : '#691F31'} />
                      <span style={{ fontSize: '11.5px', fontWeight: isChecked ? '700' : '600', flex: 1 }}>
                        {pm.name}
                      </span>
                      {isChecked && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F1D0C9' }} />}
                    </div>
                  );
                })}
              </div>

              {paymentMethod === 'vietqr' && (
                <div style={{
                  marginTop: '12px',
                  padding: '12px',
                  backgroundColor: 'rgba(246, 225, 219, 0.45)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '1px dashed #691F31'
                }}>
                  <div style={{
                    width: '68px',
                    height: '68px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '10px',
                    padding: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(201, 168, 117, 0.25)'
                  }}>
                    <QrCode size={54} color="#691F31" />
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#691F31', lineHeight: '1.45' }}>
                    <div style={{ fontWeight: '800', color: '#691F31' }}>VIETQR CỌC TIỆM B</div>
                    <div>Số tiền: <strong>{depositAmount.toLocaleString()}đ</strong></div>
                    <div>Nội dung: <strong>BOOKING TIEM B</strong></div>
                    <div style={{ color: '#2E7D32', fontWeight: 'bold' }}>Tự động ghi nhận cọc qua Webhook</div>
                  </div>
                </div>
              )}
            </div>

            {/* Hoàn Cọc */}
            <div className="warm-glass-card" style={{
              borderRadius: '16px',
              padding: '10px 14px',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              border: '1px solid rgba(201, 168, 117, 0.22)'
            }}>
              <ShieldCheck size={18} color="#691F31" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '11px', color: '#691F31', lineHeight: '1.4' }}>
                <strong>Cam kết hoàn cọc 100%:</strong> Quý khách được hoàn lại toàn bộ số tiền đặt cọc nếu thực hiện thao tác hủy lịch hẹn trước 24 giờ.
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION */}
        {step === 3 && completedBooking && (
          <div className="animate-fade-up" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#F6E1DB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #691F31'
            }}>
              <CheckCircle2 size={36} color="#691F31" />
            </div>

            <div>
              <span style={{ backgroundColor: '#F1D0C9', color: '#691F31', fontSize: '11px', fontWeight: '800', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(201, 168, 117, 0.3)' }}>
                MÃ HẸN: #{completedBooking.id}
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#691F31', marginTop: '10px' }}>
                Đặt Lịch Thành Công Tại Tiệm B!
              </h3>
              <p style={{ fontSize: '12px', color: 'rgba(105, 31, 49, 0.72)', marginTop: '4px' }}>
                Tiệm B đã giữ khung giờ phục vụ và gửi tin nhắn xác nhận đến bạn.
              </p>
            </div>

            {/* Ticket Card */}
            <div className="warm-glass-card" style={{
              width: '100%',
              borderRadius: '22px',
              padding: '18px',
              textAlign: 'left',
              border: '1px solid rgba(201, 168, 117, 0.28)'
            }}>
              <div style={{ borderBottom: '1px dashed rgba(105, 31, 49, 0.2)', paddingBottom: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '10.5px', color: 'rgba(105, 31, 49, 0.6)' }}>Địa chỉ Tiệm B:</div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#691F31' }}>{shopInfo.name}</div>
                <div style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.8)' }}>{shopInfo.address}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '11px', marginBottom: '14px' }}>
                <div>
                  <span style={{ color: 'rgba(105, 31, 49, 0.6)' }}>Ngày hẹn:</span>
                  <div style={{ fontWeight: '700', color: '#691F31' }}>{completedBooking.date}</div>
                </div>
                <div>
                  <span style={{ color: 'rgba(105, 31, 49, 0.6)' }}>Khung giờ:</span>
                  <div style={{ fontWeight: '700', color: '#691F31' }}>{completedBooking.time}</div>
                </div>
                <div>
                  <span style={{ color: 'rgba(105, 31, 49, 0.6)' }}>Chuyên viên:</span>
                  <div style={{ fontWeight: '700', color: '#691F31' }}>{completedBooking.staffName}</div>
                </div>
                <div>
                  <span style={{ color: 'rgba(105, 31, 49, 0.6)' }}>Đã cọc:</span>
                  <div style={{ fontWeight: '800', color: '#2E7D32', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{completedBooking.depositAmount.toLocaleString()}đ</span>
                    <CheckCircle2 size={13} color="#2E7D32" />
                  </div>
                </div>
                {completedBooking.addons && completedBooking.addons.length > 0 && (
                  <div style={{ gridColumn: 'span 2', backgroundColor: 'rgba(241, 208, 201, 0.45)', padding: '6px 10px', borderRadius: '10px', fontSize: '10.5px', color: '#691F31' }}>
                    <span style={{ fontWeight: '700' }}>Dịch vụ kèm theo: </span>
                    <span>{completedBooking.addons.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* QR Check-in */}
              <div style={{ backgroundColor: 'rgba(246, 225, 219, 0.45)', borderRadius: '14px', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(201, 168, 117, 0.25)' }}>
                <QrCode size={38} color="#691F31" />
                <div style={{ fontSize: '10.5px', color: '#691F31', lineHeight: '1.35' }}>
                  Đưa mã QR này tại quầy lễ tân Tiệm B để check-in dịch vụ nhanh chóng.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px' }}>
              <button
                onClick={() => {
                  handleClose();
                  setCustomerTab('bookings');
                }}
                className="btn-burgundy-cta"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '16px',
                  fontSize: '13px',
                  fontWeight: '700',
                  boxShadow: '0 6px 20px rgba(105, 31, 49, 0.28)'
                }}
              >
                Xem Lịch Hẹn Của Tôi
              </button>
              <button
                onClick={handleClose}
                style={{ width: '100%', padding: '10px', backgroundColor: 'transparent', color: '#691F31', fontSize: '12px', fontWeight: '600' }}
              >
                Về Trang Chủ Tiệm B
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Actions */}
      {step === 1 && (
        <div style={{
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(201, 168, 117, 0.22)',
          boxShadow: '0 -4px 16px rgba(105, 31, 49, 0.05)',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 30
        }}>
          <div>
            <div style={{ fontSize: '10.5px', color: 'rgba(105, 31, 49, 0.65)' }}>
              Tổng: <strong>{totalPrice.toLocaleString()}đ</strong> ({totalDuration}p)
            </div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#691F31' }}>
              Cọc giữ slot: {depositAmount.toLocaleString()}đ
            </div>
          </div>

          <button
            onClick={handleProceedToHold}
            className="btn-burgundy-cta"
            style={{
              padding: '11px 22px',
              borderRadius: '16px',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(105, 31, 49, 0.25)'
            }}
          >
            <span>Tiếp tục đặt cọc</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(201, 168, 117, 0.22)',
          boxShadow: '0 -4px 16px rgba(105, 31, 49, 0.05)',
          padding: '12px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 30
        }}>
          <button
            disabled={isProcessing}
            onClick={handleConfirmDepositPayment}
            className="btn-burgundy-cta"
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '16px',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: isProcessing ? 0.7 : 1,
              boxShadow: '0 6px 20px rgba(105, 31, 49, 0.28)'
            }}
          >
            <Sparkles size={16} color="#F1D0C9" />
            <span>
              {isProcessing
                ? 'Đang kết nối cổng Sandbox & ghi nhận cọc...'
                : `Xác Nhận Đặt Cọc (${depositAmount.toLocaleString()}đ)`}
            </span>
          </button>
        </div>
      )}
    </div>
  );

  if (isDesktop) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(24, 8, 14, 0.72)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}>
        {modalContent}
      </div>
    );
  }

  return modalContent;
};
