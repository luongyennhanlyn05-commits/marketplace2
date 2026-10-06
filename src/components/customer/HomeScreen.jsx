import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  Bell,
  Sparkles,
  ShieldCheck,
  Star,
  ChevronRight,
  Flower2,
  Smile,
  MapPin,
  Navigation,
  Phone,
  Flag,
  X,
  AlertTriangle,
  ExternalLink,
  Clock,
  Car,
  Coffee,
  Wifi,
  Camera
} from 'lucide-react';
import { CustomerVipCard } from './CustomerVipCard';

export const HomeScreen = () => {
  const {
    shopInfo,
    services,
    staffList,
    reviews,
    reportReview,
    setBookingService,
    setBookingStaff,
    setIsBookingOpen,
    setCustomerTab,
    unreadCount
  } = useApp();

  const [isReviewsExpanded, setIsReviewsExpanded] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all');
  const [reportingReview, setReportingReview] = useState(null);
  const [reportReason, setReportReason] = useState('Nội dung thô tục / xúc phạm');

  const [shopOpenStatus] = useState(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const totalMinutes = currentHour * 60 + currentMinute;
    // 08:30 is 510; 21:00 is 1260
    return totalMinutes >= 510 && totalMinutes <= 1260;
  });

  const isShopOpen = () => shopOpenStatus;

  const handleStartBooking = (service, staff = null) => {
    setBookingService(service || services[0]);
    if (staff) setBookingStaff(staff);
    setIsBookingOpen(true);
  };

  // 3 Mini Featured Services
  const featuredServices = [
    {
      id: 'svc_massage',
      name: 'Massage Trị Liệu',
      duration: '60p',
      price: '350.000đ',
      icon: Flower2,
      matchedService: services.find((s) => s.id === 'svc_spa_1') || services[0]
    },
    {
      id: 'svc_skin',
      name: 'Chăm Sóc Da',
      duration: '75p',
      price: '450.000đ',
      icon: Smile,
      matchedService: services.find((s) => s.id === 'svc_skin_1') || services[1]
    },
    {
      id: 'svc_hair',
      name: 'Gội Dưỡng Sinh',
      duration: '60p',
      price: '250.000đ',
      icon: Sparkles,
      matchedService: services.find((s) => s.id === 'svc_hair_1') || services[2]
    }
  ];

  // Specific stylized staff roles
  const staffRoles = {
    staff_tri: 'Chuyên gia trị liệu',
    staff_mai: 'Chăm sóc da',
    staff_huong: 'Nail & Mi nghệ thuật',
    staff_ha: 'Gội đầu dưỡng sinh'
  };

  // Only valid approved reviews
  const approvedReviews = useMemo(() => {
    return (reviews || []).filter((r) => r.status === 'APPROVED');
  }, [reviews]);

  const displayedReviews = useMemo(() => {
    if (reviewFilter === '5star') return approvedReviews.filter((r) => r.rating === 5);
    if (reviewFilter === 'images') return approvedReviews.filter((r) => r.images && r.images.length > 0);
    return approvedReviews;
  }, [approvedReviews, reviewFilter]);

  const handleSendReport = () => {
    if (reportingReview) {
      reportReview(reportingReview.id, reportReason);
      setReportingReview(null);
    }
  };

  return (
    <div style={{ paddingBottom: '140px' }} className="animate-fade-up">
      {/* 1. Header */}
      <header style={{
        padding: '14px 20px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo & Tên thương hiệu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            backgroundColor: '#5C1929',
            color: '#FAF6F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-serif)',
            fontSize: '18px',
            fontWeight: '600',
            boxShadow: '0 3px 10px rgba(92, 25, 41, 0.25)',
            border: '1px solid rgba(196, 158, 101, 0.3)'
          }}>
            B
          </div>
          <div>
            <div style={{
              fontSize: '15px',
              fontWeight: '800',
              color: '#3E101B',
              letterSpacing: '-0.01em',
              lineHeight: '1.2'
            }}>
              Tiệm B • Luxury Spa
            </div>
            <div style={{
              fontSize: '11px',
              color: 'rgba(62, 16, 27, 0.6)',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              marginTop: '2px'
            }}>
              <MapPin size={11} color="#C49E65" />
              <span>86 Pasteur, Q.1</span>
              <span>•</span>
              <span style={{
                color: isShopOpen() ? '#2E7D32' : '#C62828',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px'
              }}>
                <span style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: isShopOpen() ? '#2E7D32' : '#C62828',
                  display: 'inline-block'
                }} />
                {isShopOpen() ? 'Đang mở' : 'Đóng cửa'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions bên phải */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href={`tel:${shopInfo.hotline ? shopInfo.hotline.replace(/\s+/g, '') : '0908888999'}`}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#5C1929',
              border: '1px solid rgba(196, 158, 101, 0.25)',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
              textDecoration: 'none'
            }}
            title="Gọi Hotline"
          >
            <Phone size={15} />
          </a>

          <button
            onClick={() => setCustomerTab('notifications')}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#5C1929',
              position: 'relative',
              border: '1px solid rgba(196, 158, 101, 0.25)',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
            }}
            title="Thông báo"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '7px',
                right: '7px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#5C1929',
                border: '1.5px solid #FFFFFF'
              }} />
            )}
          </button>
        </div>
      </header>

      {/* 2. Thẻ Hội Viên VIP Tiệm B */}
      <CustomerVipCard />

      {/* 3. Hero Card */}
      <section style={{ padding: '0 20px 18px' }}>
        <div className="warm-glass-card" style={{
          overflow: 'hidden',
          borderRadius: '22px',
          border: '1px solid rgba(196, 158, 101, 0.22)'
        }}>
          <div style={{ height: '150px', position: 'relative', overflow: 'hidden' }}>
            <img
              src={shopInfo.coverImage}
              alt="Không gian thư giãn Tiệm B"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(20, 6, 10, 0.05) 30%, rgba(20, 6, 10, 0.75) 100%)'
            }} />

            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '14px',
              right: '14px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{
                  fontSize: '9.5px',
                  fontWeight: '800',
                  color: '#E0C89F',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase'
                }}>
                  Thư Giãn & Phục Hồi
                </span>
                <h1 style={{
                  fontSize: '17px',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: '600',
                  color: '#FAF6F0',
                  margin: '1px 0 0',
                  lineHeight: '1.2'
                }}>
                  Không gian riêng tư & tinh tế
                </h1>
              </div>

              <button
                onClick={() => handleStartBooking(services[0])}
                className="btn-burgundy-cta"
                style={{
                  height: '36px',
                  padding: '0 14px',
                  borderRadius: '12px',
                  fontSize: '11.5px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <CalendarCheck size={14} />
                <span>Đặt lịch</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dịch Vụ Nổi Bật */}
      <section style={{ padding: '0 20px 20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
          <h2 style={{
            fontSize: '13px',
            fontWeight: '800',
            color: '#3E101B',
            letterSpacing: '0.2px'
          }}>
            Dịch vụ nổi bật
          </h2>

          <button
            onClick={() => setCustomerTab('menu')}
            style={{
              fontSize: '11.5px',
              fontWeight: '700',
              color: '#5C1929',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <span>Tất cả dịch vụ</span>
            <ChevronRight size={13} />
          </button>
        </div>

        {/* 3 Mini Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px'
        }}>
          {featuredServices.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleStartBooking(item.matchedService)}
                className="warm-glass-card"
                style={{
                  padding: '12px 8px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(196, 158, 101, 0.18)'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#FBF0EC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#5C1929',
                  marginBottom: '8px'
                }}>
                  <IconComponent size={18} />
                </div>

                <div style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  color: '#3E101B',
                  lineHeight: '1.3',
                  marginBottom: '3px',
                  minHeight: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.name}
                </div>

                <div style={{
                  fontSize: '10.5px',
                  fontWeight: '800',
                  color: '#5C1929',
                  backgroundColor: 'rgba(245, 221, 215, 0.45)',
                  padding: '2px 6px',
                  borderRadius: '999px',
                  width: '100%'
                }}>
                  {item.price}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Chuyên Viên Đang Trực */}
      <section style={{ padding: '0 20px 20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
          <h2 style={{
            fontSize: '13px',
            fontWeight: '800',
            color: '#3E101B',
            letterSpacing: '0.2px'
          }}>
            Chuyên viên lành nghề
          </h2>
          <span style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.55)' }}>
            Chọn thợ yêu thích
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none'
        }}>
          {staffList.slice(1).map((st) => {
            const roleTitle = staffRoles[st.id] || 'Kỹ thuật viên';
            return (
              <div
                key={st.id}
                onClick={() => handleStartBooking(services[0], st)}
                className="warm-glass-card"
                style={{
                  minWidth: '120px',
                  padding: '12px 8px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(196, 158, 101, 0.18)'
                }}
              >
                <div style={{ position: 'relative', marginBottom: '6px' }}>
                  <img
                    src={st.avatar}
                    alt={st.name}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1.5px solid rgba(196, 158, 101, 0.4)',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)'
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '999px',
                    padding: '1px 4px',
                    fontSize: '8.5px',
                    fontWeight: '800',
                    color: '#5C1929',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1px'
                  }}>
                    <Star size={8} fill="#C49E65" color="#C49E65" />
                    <span>{st.rating}</span>
                  </span>
                </div>

                <div style={{
                  fontSize: '11.5px',
                  fontWeight: '800',
                  color: '#3E101B',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%'
                }}>
                  {st.name}
                </div>

                <div style={{
                  fontSize: '9.5px',
                  color: 'rgba(62, 16, 27, 0.6)',
                  marginTop: '1px'
                }}>
                  {roleTitle}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Trải Nghiệm Khách Hàng */}
      <section style={{ padding: '0 20px 20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
          <div>
            <h2 style={{
              fontSize: '13px',
              fontWeight: '800',
              color: '#3E101B',
              letterSpacing: '0.2px'
            }}>
              Đánh giá thực tế
            </h2>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'rgba(196, 158, 101, 0.15)',
            padding: '3px 8px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: '800',
            color: '#5C1929'
          }}>
            <Star size={11} fill="#C49E65" color="#C49E65" />
            <span>{shopInfo.rating} / 5.0</span>
            <span style={{ fontSize: '10px', opacity: 0.7 }}>({shopInfo.reviewCount || 186})</span>
          </div>
        </div>

        {/* Highlight Review Card */}
        {approvedReviews.length > 0 && (
          <div
            className="warm-glass-card"
            style={{
              borderRadius: '18px',
              padding: '14px',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(196, 158, 101, 0.22)',
              marginBottom: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src={approvedReviews[0].avatar}
                  alt={approvedReviews[0].author}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#3E101B' }}>
                    {approvedReviews[0].author}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ display: 'flex', gap: '1px' }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={10} fill="#C49E65" color="#C49E65" />
                      ))}
                    </div>
                    <span style={{ fontSize: '9.5px', color: 'rgba(62, 16, 27, 0.5)' }}>
                      • {approvedReviews[0].serviceName}
                    </span>
                  </div>
                </div>
              </div>

              <span style={{
                fontSize: '9px',
                fontWeight: '700',
                backgroundColor: '#E8F5E9',
                color: '#2E7D32',
                padding: '2px 6px',
                borderRadius: '4px'
              }}>
                ✓ Đã trải nghiệm
              </span>
            </div>

            <p style={{
              fontSize: '11.5px',
              color: 'rgba(62, 16, 27, 0.85)',
              lineHeight: '1.45',
              fontStyle: 'italic',
              margin: '0 0 8px'
            }}>
              "{approvedReviews[0].comment}"
            </p>

            {/* Quick Google Maps Review Link & View All Trigger */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '8px' }}>
              <a
                href={shopInfo.googleMapsReviewUrl || 'https://maps.google.com/?q=86+Pasteur+Ben+Nghe+Quan+1+Ho+Chi+Minh#review'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '10.5px',
                  fontWeight: '700',
                  color: '#2E7D32',
                  textDecoration: 'none'
                }}
              >
                <MapPin size={12} />
                <span>Google Maps Review</span>
                <ExternalLink size={10} />
              </a>

              <button
                onClick={() => setIsReviewsExpanded(!isReviewsExpanded)}
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#5C1929',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px'
                }}
              >
                <span>{isReviewsExpanded ? 'Thu gọn' : `Xem thêm (${approvedReviews.length})`}</span>
                <ChevronRight size={13} style={{ transform: isReviewsExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
            </div>
          </div>
        )}

        {/* Expandable Review List */}
        {isReviewsExpanded && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }} className="animate-fade-up">
            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
              {[
                { id: 'all', label: `Tất cả (${approvedReviews.length})`, icon: null },
                { id: '5star', label: '5 sao', icon: Star },
                { id: 'images', label: 'Có ảnh', icon: Camera }
              ].map((f) => {
                const isAct = reviewFilter === f.id;
                const Icon = f.icon;
                return (
                  <button
                    key={f.id}
                    onClick={() => setReviewFilter(f.id)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '10.5px',
                      fontWeight: isAct ? '800' : '600',
                      backgroundColor: isAct ? '#5C1929' : '#FFFFFF',
                      color: isAct ? '#FAF6F0' : '#3E101B',
                      border: isAct ? 'none' : '1px solid rgba(196, 158, 101, 0.25)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {Icon && <Icon size={10} fill={isAct ? '#FAF6F0' : '#C49E65'} color={isAct ? '#FAF6F0' : '#C49E65'} />}
                    <span>{f.label}</span>
                  </button>
                );
              })}
            </div>

            {displayedReviews.slice(1).map((rev) => (
              <div
                key={rev.id}
                className="warm-glass-card"
                style={{
                  borderRadius: '16px',
                  padding: '12px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(196, 158, 101, 0.18)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '11.5px', fontWeight: '800', color: '#3E101B' }}>
                        {rev.author}
                      </div>
                      <div style={{ fontSize: '9.5px', color: 'rgba(62, 16, 27, 0.5)' }}>
                        {rev.date} • {rev.serviceName}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setReportingReview(rev)}
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: 'rgba(62, 16, 27, 0.45)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px',
                      fontSize: '9.5px'
                    }}
                  >
                    <Flag size={10} />
                    <span>Báo cáo</span>
                  </button>
                </div>

                <p style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.8)', lineHeight: '1.4', margin: 0 }}>
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 7. Thông Tin Cơ Sở Tiệm B */}
      <section style={{ padding: '0 20px 16px' }}>
        <div
          className="warm-glass-card"
          style={{
            borderRadius: '20px',
            padding: '16px',
            border: '1px solid rgba(196, 158, 101, 0.22)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#3E101B' }}>
              Thông tin cơ sở
            </div>
            <span style={{ fontSize: '10.5px', color: '#2E7D32', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} />
              <span>08:30 - 21:00</span>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '12px' }}>
            <MapPin size={16} color="#5C1929" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#3E101B' }}>
                {shopInfo.address}
              </div>
              <div style={{ fontSize: '10px', color: 'rgba(62, 16, 27, 0.55)', marginTop: '1px' }}>
                Trung tâm Quận 1 • Cách bạn ~1.2 km
              </div>
            </div>
          </div>

          {/* 2 Quick Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            <a
              href={shopInfo.googleMapsUrl || 'https://maps.google.com/?q=86+Pasteur+Ben+Nghe+Quan+1+Ho+Chi+Minh'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '8px 10px',
                borderRadius: '12px',
                backgroundColor: '#FBF0EC',
                color: '#5C1929',
                fontSize: '11px',
                fontWeight: '700',
                textDecoration: 'none',
                border: '1px solid rgba(196, 158, 101, 0.25)'
              }}
            >
              <Navigation size={13} color="#5C1929" />
              <span>Chỉ đường</span>
            </a>

            <a
              href={`tel:${shopInfo.hotline ? shopInfo.hotline.replace(/\s+/g, '') : '0908888999'}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '8px 10px',
                borderRadius: '12px',
                backgroundColor: '#5C1929',
                color: '#FAF6F0',
                fontSize: '11px',
                fontWeight: '700',
                textDecoration: 'none'
              }}
            >
              <Phone size={13} color="#FAF6F0" />
              <span>Gọi lễ tân</span>
            </a>
          </div>

          {/* Clean Vector Amenities Chips */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6px',
            fontSize: '10px',
            color: '#3E101B',
            fontWeight: '600'
          }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', padding: '5px 8px', borderRadius: '8px', border: '1px solid rgba(196, 158, 101, 0.18)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Car size={12} color="#5C1929" />
              <span>Chỗ đỗ xe máy & ô tô</span>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', padding: '5px 8px', borderRadius: '8px', border: '1px solid rgba(196, 158, 101, 0.18)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Coffee size={12} color="#5C1929" />
              <span>Trà thảo mộc & bánh</span>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', padding: '5px 8px', borderRadius: '8px', border: '1px solid rgba(196, 158, 101, 0.18)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Sparkles size={12} color="#C49E65" />
              <span>Phòng riêng VIP</span>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', padding: '5px 8px', borderRadius: '8px', border: '1px solid rgba(196, 158, 101, 0.18)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Wifi size={12} color="#5C1929" />
              <span>Wi-Fi 5G & sạc ghế</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Cam Kết Minh Bạch */}
      <section style={{ padding: '0 20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          padding: '8px 12px',
          borderRadius: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.55)',
          border: '1px solid rgba(196, 158, 101, 0.15)',
          fontSize: '10.5px',
          color: 'rgba(62, 16, 27, 0.7)'
        }}>
          <ShieldCheck size={14} color="#5C1929" />
          <span>Hoàn 100% tiền cọc khi thông báo hủy trước 24 giờ</span>
        </div>
      </section>

      {/* COMMUNITY VIOLATION REPORT MODAL */}
      {reportingReview && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(20, 6, 10, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setReportingReview(null)}
        >
          <div
            className="warm-glass-card animate-fade-up"
            style={{
              width: '100%',
              maxWidth: '320px',
              backgroundColor: '#FFFDF9',
              borderRadius: '20px',
              padding: '18px',
              border: '1px solid rgba(196, 158, 101, 0.35)',
              boxShadow: '0 16px 36px rgba(0,0,0,0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={16} color="#C62828" />
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#5C1929' }}>
                  Báo cáo đánh giá
                </h3>
              </div>
              <button
                onClick={() => setReportingReview(null)}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={13} />
              </button>
            </div>

            <p style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.7)', lineHeight: 1.4, margin: '0 0 10px' }}>
              Bạn đang báo cáo nhận xét của <strong>{reportingReview.author}</strong>.
            </p>

            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '10px',
                fontSize: '11px',
                border: '1px solid rgba(196, 158, 101, 0.35)',
                backgroundColor: '#FFFFFF',
                marginBottom: '14px'
              }}
            >
              <option value="Nội dung thô tục / xúc phạm cá nhân thợ">Nội dung thô tục / xúc phạm</option>
              <option value="Spam quảng cáo thương hiệu đối thủ">Spam quảng cáo</option>
              <option value="Thông tin sai sự thật / vu khống">Thông tin sai sự thật</option>
              <option value="Vi phạm quyền riêng tư">Vi phạm quyền riêng tư</option>
            </select>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setReportingReview(null)}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '10px',
                  border: '1px solid rgba(0,0,0,0.15)',
                  backgroundColor: 'transparent',
                  color: '#5C1929',
                  fontSize: '11.5px',
                  fontWeight: '700'
                }}
              >
                Hủy
              </button>
              <button
                onClick={handleSendReport}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#C62828',
                  color: '#FFFFFF',
                  fontSize: '11.5px',
                  fontWeight: '700'
                }}
              >
                Gửi báo cáo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
