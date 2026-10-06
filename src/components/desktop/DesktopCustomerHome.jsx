import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Star,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  ChevronRight,
  Plus,
  Car,
  Coffee,
  Wifi,
  Crown,
  HeartHandshake
} from 'lucide-react';
import { SHOP_B_CATEGORIES } from '../../data/mockData';

export const DesktopCustomerHome = () => {
  const {
    shopInfo,
    services,
    staffList,
    reviews,
    setCustomerTab,
    setBookingService,
    setIsBookingOpen,
    setIsVipModalOpen
  } = useApp();

  const handleBookService = (svc) => {
    setBookingService(svc);
    setIsBookingOpen(true);
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '24px 32px 60px' }}>
      {/* Luxury Hero Banner */}
      <div style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        height: '380px',
        marginBottom: '32px',
        boxShadow: '0 16px 40px rgba(92, 25, 41, 0.15)',
        border: '1px solid rgba(196, 158, 101, 0.3)'
      }}>
        <img
          src={shopInfo.coverImage}
          alt={shopInfo.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(24, 8, 14, 0.92) 0%, rgba(24, 8, 14, 0.65) 55%, rgba(24, 8, 14, 0.2) 100%)'
        }} />

        <div style={{
          position: 'absolute',
          inset: 0,
          padding: '40px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '680px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{
              backgroundColor: '#C49E65',
              color: '#18080E',
              fontSize: '11px',
              fontWeight: '800',
              padding: '4px 12px',
              borderRadius: '999px',
              letterSpacing: '0.5px'
            }}>
              TIỆM B • LUXURY BEAUTY & SPA
            </span>
            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(6px)',
              color: '#FAF6F0',
              fontSize: '11px',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '999px'
            }}>
              ● Đang mở cửa ({shopInfo.openTime} - {shopInfo.closeTime})
            </span>
          </div>

          <h1 style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#FAF6F0',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '12px'
          }}>
            Nâng Niêu Vẻ Đẹp & Thư Giãn Tinh Thần
          </h1>

          <p style={{
            fontSize: '14px',
            color: 'rgba(250, 246, 240, 0.85)',
            lineHeight: 1.6,
            marginBottom: '24px'
          }}>
            {shopInfo.description}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleBookService(services[0])}
              className="btn-burgundy-cta"
              style={{
                height: '46px',
                padding: '0 24px',
                borderRadius: '12px',
                fontSize: '14px',
                gap: '8px',
                backgroundColor: '#FAF6F0',
                color: '#5C1929'
              }}
            >
              <Sparkles size={16} />
              <span>Đặt lịch ngay hôm nay</span>
            </button>

            <button
              onClick={() => setCustomerTab('menu')}
              style={{
                height: '46px',
                padding: '0 22px',
                borderRadius: '12px',
                fontSize: '13.5px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                color: '#FAF6F0',
                fontWeight: '700',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>Xem thực đơn dịch vụ</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#3E101B', marginBottom: '14px' }}>
          Dịch Vụ Nổi Bật Tại Tiệm B
        </h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {SHOP_B_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCustomerTab('menu')}
              className="warm-glass-card"
              style={{
                padding: '10px 18px',
                borderRadius: '14px',
                fontSize: '13px',
                fontWeight: '700',
                color: '#3E101B',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={14} color="#C49E65" />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Services Grid */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#3E101B', margin: 0 }}>
              Gói Trị Liệu & Làm Đẹp Được Yêu Thích Nhất
            </h2>
            <p style={{ fontSize: '13px', color: 'rgba(62, 16, 27, 0.65)', marginTop: '2px' }}>
              Cam kết dịch vụ chuẩn 5 sao, giữ chỗ đúng giờ với tiền cọc minh bạch
            </p>
          </div>
          <button
            onClick={() => setCustomerTab('menu')}
            style={{ fontSize: '13px', color: '#5C1929', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <span>Xem tất cả ({services.length})</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px'
        }}>
          {services.map((svc) => (
            <div
              key={svc.id}
              className="warm-glass-card"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(196, 158, 101, 0.22)'
              }}
            >
              <div style={{ height: '170px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={svc.image}
                  alt={svc.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(24, 8, 14, 0.75) 0%, transparent 60%)'
                }} />

                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <span style={{
                    backgroundColor: 'rgba(92, 25, 41, 0.9)',
                    backdropFilter: 'blur(6px)',
                    color: '#FAF6F0',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '3px 10px',
                    borderRadius: '8px'
                  }}>
                    {svc.categoryLabel || svc.category}
                  </span>
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '12px',
                  color: '#FAF6F0',
                  fontSize: '18px',
                  fontWeight: '800'
                }}>
                  {svc.price.toLocaleString()}đ
                </div>
              </div>

              <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: '#3E101B', marginBottom: '8px' }}>
                  {svc.name}
                </h3>
                <p style={{
                  fontSize: '12.5px',
                  color: 'rgba(62, 16, 27, 0.7)',
                  lineHeight: '1.5',
                  marginBottom: '14px',
                  flex: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {svc.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  backgroundColor: '#FBF0EC',
                  borderRadius: '12px',
                  marginBottom: '14px',
                  fontSize: '12px'
                }}>
                  <span style={{ color: '#5C1929', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {svc.duration} phút
                  </span>
                  <span style={{ color: 'rgba(62, 16, 27, 0.7)' }}>
                    Cọc: <strong style={{ color: '#5C1929' }}>{svc.deposit.toLocaleString()}đ</strong>
                  </span>
                </div>

                <button
                  onClick={() => handleBookService(svc)}
                  className="btn-burgundy-cta"
                  style={{ width: '100%', height: '38px', borderRadius: '10px', fontSize: '13px', gap: '6px' }}
                >
                  <Plus size={15} />
                  <span>Đặt Lịch Ngay</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff & Specialists */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#3E101B', marginBottom: '16px' }}>
          Đội Ngũ Chuyên Viên Tay Nghề Cao
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '18px'
        }}>
          {staffList.filter((s) => s.id !== 'staff_any').map((staff) => (
            <div
              key={staff.id}
              className="warm-glass-card"
              style={{
                padding: '18px',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <img
                src={staff.avatar}
                alt={staff.name}
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: '#3E101B', margin: '0 0 2px' }}>
                  {staff.name}
                </h4>
                <div style={{ fontSize: '11.5px', color: '#5C1929', fontWeight: '600' }}>
                  {staff.role}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.6)', marginTop: '2px' }}>
                  {staff.experience} • {staff.rating} ★
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VIP Membership Promo Card */}
      <div style={{
        background: 'linear-gradient(135deg, #2A1017 0%, #15060B 100%)',
        borderRadius: '24px',
        padding: '32px 40px',
        color: '#FAF6F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px',
        marginBottom: '40px',
        border: '1px solid rgba(196, 158, 101, 0.4)'
      }}>
        <div style={{ maxWidth: '640px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Crown size={20} color="#E0C89F" />
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#E0C89F', letterSpacing: '0.5px' }}>
              CHƯƠNG TRÌNH KHÁCH HÀNG VIP TIỆM B
            </span>
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 8px', fontFamily: 'var(--font-serif)' }}>
            Đăng Ký Hội Viên - Nhận Ngay Ưu Đãi Lên Đến 25%
          </h3>
          <p style={{ fontSize: '13.5px', opacity: 0.85, margin: 0, lineHeight: 1.5 }}>
            Tận hưởng phòng VIP trị liệu riêng tư, ưu tiên chọn chuyên gia và tặng kèm gói ủ dưỡng phục hồi tế bào gốc độc quyền.
          </p>
        </div>

        <button
          onClick={() => setIsVipModalOpen(true)}
          style={{
            backgroundColor: '#C49E65',
            color: '#18080E',
            padding: '14px 28px',
            borderRadius: '12px',
            fontWeight: '800',
            fontSize: '13.5px',
            boxShadow: '0 4px 16px rgba(196, 158, 101, 0.4)'
          }}
        >
          Khám Phá Hạng Thẻ VIP
        </button>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#3E101B', marginBottom: '16px' }}>
          Đánh Giá Từ Khách Hàng Thực Tế ({reviews.length})
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '20px'
        }}>
          {reviews.slice(0, 3).map((r) => (
            <div
              key={r.id}
              className="warm-glass-card card-hover-ombre"
              style={{
                padding: '20px',
                borderRadius: '20px',
                border: '1px solid rgba(240, 174, 164, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={r.avatar}
                    alt={r.author}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(240, 174, 164, 0.4)' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '800', color: '#3E101B' }}>
                        {r.author}
                      </span>
                      {r.verifiedBooking && (
                        <span style={{
                          fontSize: '9.5px',
                          fontWeight: '700',
                          backgroundColor: '#E8F5E9',
                          color: '#2E7D32',
                          padding: '1px 6px',
                          borderRadius: '4px'
                        }}>
                          ✓ Đã dùng dịch vụ
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                      <div style={{ display: 'flex', gap: '1px' }}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} style={{ color: s <= r.rating ? '#EAB308' : '#D1D5DB', fontSize: '11px' }}>★</span>
                        ))}
                      </div>
                      <span style={{ fontSize: '10.5px', color: 'rgba(62, 16, 27, 0.55)' }}>• {r.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {r.serviceName && (
                <div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    backgroundColor: 'rgba(253, 237, 234, 0.85)',
                    color: '#5C1929',
                    padding: '3px 10px',
                    borderRadius: '8px',
                    display: 'inline-block'
                  }}>
                    {r.serviceName}
                  </span>
                </div>
              )}

              <p style={{ fontSize: '12.5px', color: 'rgba(62, 16, 27, 0.85)', lineHeight: 1.5, margin: 0, flex: 1 }}>
                "{r.comment}"
              </p>

              {r.tags && r.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {r.tags.map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '10px',
                        fontWeight: '600',
                        backgroundColor: 'rgba(255, 246, 243, 0.95)',
                        color: 'rgba(92, 25, 41, 0.85)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: '1px solid rgba(240, 174, 164, 0.3)'
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              {r.images && r.images.length > 0 && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  {r.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Feedback"
                      style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                  ))}
                </div>
              )}

              {r.shopReply && (
                <div style={{
                  backgroundColor: 'rgba(255, 248, 246, 0.75)',
                  borderLeft: '3px solid #691F31',
                  borderRadius: '0 10px 10px 0',
                  padding: '8px 12px',
                  fontSize: '11px',
                  color: '#691F31'
                }}>
                  <div style={{ fontWeight: '800', marginBottom: '2px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>💬 Phản hồi từ Tiệm B:</span>
                    <span style={{ fontSize: '9.5px', color: 'rgba(62, 16, 27, 0.55)', fontWeight: 'normal' }}>{r.shopReply.date}</span>
                  </div>
                  <div style={{ lineHeight: 1.45, color: 'rgba(62, 16, 27, 0.85)' }}>{r.shopReply.text}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
