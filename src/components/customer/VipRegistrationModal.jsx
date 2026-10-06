import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Crown,
  Check,
  Sparkles,
  QrCode,
  ShieldCheck,
  CreditCard,
  Gift,
  Star,
  CheckCircle2,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const VipRegistrationModal = () => {
  const {
    isVipModalOpen,
    setIsVipModalOpen,
    userTier,
    membershipTiers,
    registerVipMember
  } = useApp();

  const [selectedTierId, setSelectedTierId] = useState(userTier !== 'standard' ? userTier : 'card_gold');
  const [step, setStep] = useState(1); // 1: Select Tier & Info, 2: Payment/QR, 3: Success
  const [fullName, setFullName] = useState('Nguyễn Thùy Linh');
  const [phone, setPhone] = useState('0988 234 567');
  const [birthday, setBirthday] = useState('18/08/1996');
  const [note, setNote] = useState('Thích không gian yên tĩnh, trà dưỡng nhan ít đường.');
  const [paymentMethod, setPaymentMethod] = useState('vietqr');
  const [createdMember, setCreatedMember] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isVipModalOpen) return null;

  const currentTier = membershipTiers.find((t) => t.id === selectedTierId) || membershipTiers[1];

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert('Vui lòng nhập họ tên và số điện thoại!');
      return;
    }
    setStep(2);
  };

  const handleConfirmActivation = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newMember = registerVipMember({
        tierId: selectedTierId,
        fullName,
        phone,
        birthday,
        note
      });
      setCreatedMember(newMember);
      setIsProcessing(false);
      setStep(3);
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(28, 11, 17, 0.72)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    }}>
      <div
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '480px',
          maxHeight: '92vh',
          backgroundColor: '#FFFBF7',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -10px 40px rgba(105, 31, 49, 0.3)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(201, 168, 117, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              backgroundColor: '#691F31',
              color: '#F8F2EC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Crown size={18} color="#D9BD8C" />
            </div>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#691F31', margin: 0 }}>
                {step === 3 ? 'Kích Hoạt Thành Công!' : 'Đăng Ký Hội Viên VIP Tiệm B'}
              </h2>
              <p style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.65)', margin: 0 }}>
                {step === 1 ? 'Đặc quyền chăm sóc & chiết khấu lên đến 25%' : step === 2 ? 'Xác nhận thanh toán kích hoạt' : 'Chào mừng bạn đến với Tiệm B VIP'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsVipModalOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#F8F2EC',
              color: '#691F31',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div style={{
          padding: '16px 20px 30px',
          overflowY: 'auto',
          flex: 1
        }}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Tier Selection Cards */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '8px' }}>
                  1. Chọn gói thẻ VIP muốn đăng ký:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {membershipTiers.map((tier) => {
                    const isSelected = selectedTierId === tier.id;
                    const isDiamond = tier.id === 'card_diamond';
                    const isGold = tier.id === 'card_gold';

                    return (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedTierId(tier.id)}
                        style={{
                          borderRadius: '18px',
                          padding: '14px',
                          cursor: 'pointer',
                          position: 'relative',
                          border: isSelected
                            ? '2px solid #691F31'
                            : '1.5px solid rgba(201, 168, 117, 0.3)',
                          backgroundColor: isSelected
                            ? isDiamond
                              ? 'linear-gradient(135deg, #1C0B11 0%, #3B121E 100%)'
                              : isGold
                                ? '#FFF7F0'
                                : '#F7F7F9'
                            : '#FFFFFF',
                          color: isSelected && isDiamond ? '#FFF8F4' : '#691F31',
                          boxShadow: isSelected ? '0 6px 20px rgba(105, 31, 49, 0.12)' : 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {tier.highlight && (
                          <span style={{
                            position: 'absolute',
                            top: '-9px',
                            right: '16px',
                            backgroundColor: '#691F31',
                            color: '#F8F2EC',
                            fontSize: '9.5px',
                            fontWeight: '800',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            border: '1px solid #D9BD8C'
                          }}>
                            {tier.badge}
                          </span>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.8, fontWeight: '700' }}>
                              {tier.badge}
                            </div>
                            <div style={{ fontSize: '15px', fontWeight: '800', marginTop: '2px' }}>
                              {tier.name}
                            </div>
                            <div style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              marginTop: '4px',
                              backgroundColor: isSelected && isDiamond ? 'rgba(255,255,255,0.15)' : '#F1D0C9',
                              color: isSelected && isDiamond ? '#FFF8F4' : '#691F31',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: '800'
                            }}>
                              Giảm {tier.discount} toàn menu
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '16px', fontWeight: '800' }}>
                              {tier.price.toLocaleString()}đ
                            </div>
                            <div style={{ fontSize: '10px', opacity: 0.7 }}>
                              Hạn: {tier.validity}
                            </div>
                          </div>
                        </div>

                        {/* Benefits list */}
                        <div style={{
                          marginTop: '10px',
                          paddingTop: '8px',
                          borderTop: isSelected && isDiamond ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(201, 168, 117, 0.2)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '5px'
                        }}>
                          {tier.benefits.map((b, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
                              <Check size={12} color={isSelected && isDiamond ? '#D9BD8C' : '#691F31'} />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Customer Registration Info Form */}
              <form onSubmit={handleProceedToPayment} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#691F31' }}>
                  2. Thông tin hội viên nhận ưu đãi:
                </label>

                <div>
                  <span style={{ fontSize: '11px', color: '#691F31', fontWeight: '600', display: 'block', marginBottom: '3px' }}>
                    Họ và tên quý khách:
                  </span>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="VD: Nguyễn Thùy Linh"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', fontSize: '12px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#691F31', fontWeight: '600', display: 'block', marginBottom: '3px' }}>
                      Số điện thoại:
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0988..."
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', fontSize: '12px' }}
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', color: '#691F31', fontWeight: '600', display: 'block', marginBottom: '3px' }}>
                      Ngày sinh (Nhận quà):
                    </span>
                    <input
                      type="text"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      placeholder="DD/MM/YYYY"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', fontSize: '12px' }}
                    />
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: '#691F31', fontWeight: '600', display: 'block', marginBottom: '3px' }}>
                    Sở thích & Yêu cầu riêng cho Tiệm B:
                  </span>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="VD: Phòng yên tĩnh, thích KTV massage nhẹ..."
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', fontSize: '12px' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-burgundy-cta"
                  style={{ width: '100%', marginTop: '6px', gap: '8px' }}
                >
                  <span>Tiếp tục: Thanh toán {currentTier.price.toLocaleString()}đ</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-up">
              {/* Bill Summary */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px',
                border: '1px solid rgba(201, 168, 117, 0.3)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#691F31' }}>{currentTier.name}</span>
                  <span style={{ fontSize: '15px', fontWeight: '800', color: '#691F31' }}>{currentTier.price.toLocaleString()}đ</span>
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.7)' }}>
                  Hội viên: <strong>{fullName}</strong> - {phone}
                </div>
                <div style={{ fontSize: '11px', color: '#2E7D32', marginTop: '4px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={12} color="#2E7D32" />
                  <span>Tự động áp dụng giảm {currentTier.discount} ngay cho mọi lịch hẹn</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#691F31' }}>
                  Phương thức kích hoạt:
                </label>

                <div
                  onClick={() => setPaymentMethod('vietqr')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    backgroundColor: paymentMethod === 'vietqr' ? '#FFF8F4' : '#FFFFFF',
                    border: paymentMethod === 'vietqr' ? '2px solid #691F31' : '1px solid rgba(201, 168, 117, 0.3)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <QrCode size={20} color="#691F31" />
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#691F31' }}>Quét mã VietQR Sandbox</div>
                      <div style={{ fontSize: '10.5px', color: 'rgba(105, 31, 49, 0.65)' }}>Kích hoạt thẻ VIP tức thì</div>
                    </div>
                  </div>
                  {paymentMethod === 'vietqr' && <CheckCircle2 size={18} color="#691F31" />}
                </div>

                <div
                  onClick={() => setPaymentMethod('counter')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    backgroundColor: paymentMethod === 'counter' ? '#FFF8F4' : '#FFFFFF',
                    border: paymentMethod === 'counter' ? '2px solid #691F31' : '1px solid rgba(201, 168, 117, 0.3)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CreditCard size={20} color="#691F31" />
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#691F31' }}>Thanh toán trực tiếp tại Tiệm B</div>
                      <div style={{ fontSize: '10.5px', color: 'rgba(105, 31, 49, 0.65)' }}>Nhận thẻ cứng vật lý tại quầy lễ tân</div>
                    </div>
                  </div>
                  {paymentMethod === 'counter' && <CheckCircle2 size={18} color="#691F31" />}
                </div>
              </div>

              {/* QR Box if VietQR */}
              {paymentMethod === 'vietqr' && (
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '16px',
                  textAlign: 'center',
                  border: '1.5px dashed rgba(105, 31, 49, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '150px',
                    height: '150px',
                    backgroundColor: '#F8F2EC',
                    borderRadius: '12px',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #C9A875'
                  }}>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=TIEM_B_VIP_${selectedTierId}_${encodeURIComponent(fullName)}`}
                      alt="VietQR Demo"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <div style={{ fontSize: '11px', color: '#691F31', fontWeight: '700' }}>
                    Nội dung: TIEM B VIP {currentTier.name.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '10px', color: 'rgba(105, 31, 49, 0.6)' }}>
                    Mô phỏng ngân hàng Vietcombank - B Beauty Luxury Spa
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '14px',
                    backgroundColor: '#F8F2EC',
                    color: '#691F31',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}
                >
                  Quay lại
                </button>

                <button
                  type="button"
                  onClick={handleConfirmActivation}
                  disabled={isProcessing}
                  className="btn-burgundy-cta"
                  style={{ flex: 2, height: '46px', opacity: isProcessing ? 0.7 : 1 }}
                >
                  {isProcessing ? 'Đang kích hoạt thẻ...' : 'Xác nhận kích hoạt VIP'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && createdMember && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }} className="animate-fade-up">
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#E8F5E9',
                color: '#2E7D32',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle2 size={36} />
              </div>

              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#691F31', margin: 0 }}>
                  KÍCH HOẠT VIP THÀNH CÔNG!
                </h3>
                <p style={{ fontSize: '12px', color: 'rgba(105, 31, 49, 0.7)', marginTop: '4px' }}>
                  Quý khách đã chính thức trở thành hội viên {createdMember.tierName}
                </p>
              </div>

              {/* Luxury Digital Card Preview */}
              <div style={{
                width: '100%',
                borderRadius: '20px',
                padding: '20px',
                background: selectedTierId === 'card_diamond'
                  ? 'linear-gradient(135deg, #1C0B11 0%, #4A1624 50%, #2A0E18 100%)'
                  : selectedTierId === 'card_gold'
                    ? 'linear-gradient(135deg, #C9A875 0%, #691F31 60%, #4A1624 100%)'
                    : 'linear-gradient(135deg, #9E9E9E 0%, #616161 100%)',
                color: '#FFFFFF',
                boxShadow: '0 12px 30px rgba(105, 31, 49, 0.35)',
                border: '1.5px solid #D9BD8C',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.85 }}>
                      B Beauty & Luxury Spa
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#FFF8F4', marginTop: '2px' }}>
                      {createdMember.tierName}
                    </div>
                  </div>
                  <Crown size={24} color="#D9BD8C" />
                </div>

                <div style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '2px', fontFamily: 'monospace', margin: '14px 0 10px' }}>
                  {createdMember.cardCode}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '11px' }}>
                  <div>
                    <div style={{ opacity: 0.75, fontSize: '9px' }}>CHỦ THẺ</div>
                    <div style={{ fontWeight: '700', textTransform: 'uppercase' }}>{createdMember.fullName}</div>
                  </div>
                  <div>
                    <div style={{ opacity: 0.75, fontSize: '9px' }}>HẠN DÙNG</div>
                    <div style={{ fontWeight: '700' }}>{createdMember.expiryDate}</div>
                  </div>
                  <div>
                    <div style={{ opacity: 0.75, fontSize: '9px' }}>ƯU ĐÃI</div>
                    <div style={{ fontWeight: '800', color: '#F1D0C9' }}>GIẢM {currentTier.discount}</div>
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#FFF8F4',
                borderRadius: '14px',
                padding: '12px',
                width: '100%',
                fontSize: '11.5px',
                color: '#691F31',
                lineHeight: '1.5',
                border: '1px solid rgba(201, 168, 117, 0.3)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start'
              }}>
                <Gift size={16} color="#691F31" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  Ưu đãi giảm giá <strong>{currentTier.discount}</strong> đã được tích hợp tự động vào tài khoản của bạn. Mọi lần đặt hẹn tại Tiệm B sẽ được trừ trực tiếp vào hóa đơn!
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsVipModalOpen(false)}
                className="btn-burgundy-cta"
                style={{ width: '100%', height: '46px' }}
              >
                Hoàn tất & Đặt lịch trải nghiệm ngay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
