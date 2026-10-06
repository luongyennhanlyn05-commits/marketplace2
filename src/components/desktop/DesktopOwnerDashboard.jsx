import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarDays,
  DollarSign,
  Star,
  Sparkles,
  Crown,
  ChevronRight,
  Store,
  Clock,
  CheckCircle2,
  Users,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';

export const DesktopOwnerDashboard = () => {
  const { shopInfo, services, setOwnerTab, bookings, reviews, completeBooking, cancelBooking } = useApp();

  const confirmedBookings = bookings.filter((b) => b.status === 'CONFIRMED');
  const completedBookings = bookings.filter((b) => b.status === 'COMPLETED');
  const totalDepositRevenue = bookings
    .filter((b) => b.status === 'CONFIRMED' || b.status === 'COMPLETED')
    .reduce((sum, b) => sum + (b.depositAmount || 0), 0);

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '24px 32px 60px' }}>
      {/* Top Shop Banner Card */}
      <div className="warm-glass-card" style={{
        borderRadius: '20px',
        overflow: 'hidden',
        marginBottom: '24px',
        position: 'relative',
        border: '1px solid rgba(196, 158, 101, 0.25)'
      }}>
        <div style={{
          height: '140px',
          width: '100%',
          position: 'relative'
        }}>
          <img
            src={shopInfo.coverImage}
            alt={shopInfo.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(24, 8, 14, 0.9) 0%, rgba(24, 8, 14, 0.3) 100%)'
          }} />
        </div>

        <div style={{
          padding: '20px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          backgroundColor: '#FFFFFF',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundColor: '#5C1929',
              border: '2px solid #C49E65',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FAF6F0',
              fontWeight: '800',
              fontSize: '28px',
              fontFamily: 'var(--font-serif)',
              boxShadow: '0 4px 14px rgba(92, 25, 41, 0.3)'
            }}>
              B
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  backgroundColor: '#5C1929',
                  color: '#FAF6F0'
                }}>
                  CƠ SỞ CHÍNH TIỆM B
                </span>
                <span style={{
                  fontSize: '11px',
                  color: '#2E7D32',
                  fontWeight: '700',
                  backgroundColor: '#E8F5E9',
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  ● Đang mở cửa ({shopInfo.openTime} - {shopInfo.closeTime})
                </span>
              </div>
              <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#3E101B', margin: '0 0 4px' }}>
                {shopInfo.name}
              </h1>
              <p style={{ fontSize: '13px', color: 'rgba(62, 16, 27, 0.65)', margin: 0 }}>
                {shopInfo.address} • Hotline: <strong>{shopInfo.hotline}</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setOwnerTab('calendar')}
              className="btn-burgundy-cta"
              style={{ height: '40px', padding: '0 18px', borderRadius: '10px', fontSize: '12.5px', gap: '6px' }}
            >
              <CalendarDays size={15} />
              <span>Xem Lịch Đặt</span>
            </button>
            <button
              onClick={() => setOwnerTab('services')}
              style={{
                height: '40px',
                padding: '0 18px',
                borderRadius: '10px',
                fontSize: '12.5px',
                backgroundColor: '#FBF0EC',
                color: '#5C1929',
                fontWeight: '700',
                border: '1px solid rgba(196, 158, 101, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={15} />
              <span>Quản Lý Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 KPI Metrics in a Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '28px'
      }}>
        <div className="warm-glass-card" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(62, 16, 27, 0.7)', fontWeight: '600' }}>
              Tiền cọc nhận qua hệ thống
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#FBF0EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5C1929' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#5C1929', marginBottom: '4px' }}>
            {totalDepositRevenue.toLocaleString()}đ
          </div>
          <div style={{ fontSize: '11.5px', color: '#2E7D32', fontWeight: '600' }}>
            ✓ Đã xác thực thanh toán tự động
          </div>
        </div>

        <div className="warm-glass-card" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(62, 16, 27, 0.7)', fontWeight: '600' }}>
              Lịch hẹn đang chờ phục vụ
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#FBF0EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5C1929' }}>
              <CalendarDays size={18} />
            </div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#3E101B', marginBottom: '4px' }}>
            {confirmedBookings.length} <span style={{ fontSize: '14px', fontWeight: '600', color: 'rgba(62, 16, 27, 0.5)' }}>khách</span>
          </div>
          <div style={{ fontSize: '11.5px', color: '#C49E65', fontWeight: '600' }}>
            ● Cần phục vụ đúng khung giờ đã cọc
          </div>
        </div>

        <div className="warm-glass-card" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(62, 16, 27, 0.7)', fontWeight: '600' }}>
              Đánh giá trung bình
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#FFF8E1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C49E65' }}>
              <Star size={18} fill="#C49E65" />
            </div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#3E101B', marginBottom: '4px' }}>
            {shopInfo.rating} <span style={{ fontSize: '16px', color: '#C49E65' }}>★</span>
          </div>
          <div style={{ fontSize: '11.5px', color: 'rgba(62, 16, 27, 0.65)' }}>
            Dựa trên {shopInfo.reviewCount || reviews.length} lượt đánh giá thực tế
          </div>
        </div>

        <div className="warm-glass-card" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(62, 16, 27, 0.7)', fontWeight: '600' }}>
              Danh mục & Bảng giá
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#FBF0EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5C1929' }}>
              <Sparkles size={18} />
            </div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#3E101B', marginBottom: '4px' }}>
            {services.length} <span style={{ fontSize: '14px', fontWeight: '600', color: 'rgba(62, 16, 27, 0.5)' }}>dịch vụ</span>
          </div>
          <div style={{ fontSize: '11.5px', color: 'rgba(62, 16, 27, 0.65)' }}>
            Mức cọc cố định 20% giữ slot
          </div>
        </div>
      </div>

      {/* 2-Column Section: Operational Shortcuts & Recent Bookings */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(340px, 1fr) minmax(460px, 1.4fr)',
        gap: '24px'
      }}>
        {/* Left Column: Management Modules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#3E101B', margin: 0 }}>
            Quản Lý Vận Hành Tiệm B
          </h2>

          <div
            onClick={() => setOwnerTab('calendar')}
            className="warm-glass-card"
            style={{
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#FBF0EC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#5C1929'
              }}>
                <CalendarDays size={20} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#3E101B' }}>
                  Lịch Tiệm & Khóa Khung Giờ
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(62, 16, 27, 0.65)', marginTop: '2px' }}>
                  Khóa slot khi thợ bận, kiểm tra lịch khách hẹn
                </div>
              </div>
            </div>
            <ChevronRight size={18} color="#5C1929" />
          </div>

          <div
            onClick={() => setOwnerTab('services')}
            className="warm-glass-card"
            style={{
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#FBF0EC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#5C1929'
              }}>
                <Sparkles size={20} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#3E101B' }}>
                  Menu Dịch Vụ & Bảng Giá
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(62, 16, 27, 0.65)', marginTop: '2px' }}>
                  Thêm mới, sửa giá niêm yết và mức tiền cọc
                </div>
              </div>
            </div>
            <ChevronRight size={18} color="#5C1929" />
          </div>

          <div
            onClick={() => setOwnerTab('memberships')}
            className="warm-glass-card"
            style={{
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#5C1929',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FAF6F0'
              }}>
                <Crown size={20} color="#E0C89F" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#3E101B' }}>
                  Thẻ VIP & Khách Hàng Thân Thiết
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(62, 16, 27, 0.65)', marginTop: '2px' }}>
                  Quản lý hạng thẻ Thân thiết, Gold VIP, Diamond VIP
                </div>
              </div>
            </div>
            <ChevronRight size={18} color="#5C1929" />
          </div>

          <div
            onClick={() => setOwnerTab('shop_profile')}
            className="warm-glass-card"
            style={{
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#FBF0EC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#5C1929'
              }}>
                <Store size={20} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#3E101B' }}>
                  Thông Tin Cơ Sở & Đánh Giá
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(62, 16, 27, 0.65)', marginTop: '2px' }}>
                  Địa chỉ, hotline, giờ hoạt động & phản hồi khách hàng
                </div>
              </div>
            </div>
            <ChevronRight size={18} color="#5C1929" />
          </div>
        </div>

        {/* Right Column: Recent Bookings List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#3E101B', margin: 0 }}>
              Lịch Hẹn Cần Phục Vụ ({confirmedBookings.length})
            </h2>
            <button
              onClick={() => setOwnerTab('calendar')}
              style={{
                fontSize: '12px',
                color: '#5C1929',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Xem toàn bộ lịch</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="warm-glass-card" style={{
              padding: '40px 20px',
              borderRadius: '18px',
              textAlign: 'center',
              color: 'rgba(62, 16, 27, 0.6)'
            }}>
              Chưa có lịch hẹn nào!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {bookings.slice(0, 4).map((b) => (
                <div
                  key={b.id}
                  className="warm-glass-card"
                  style={{
                    borderRadius: '16px',
                    padding: '16px 18px',
                    border: '1px solid rgba(196, 158, 101, 0.2)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '800',
                          backgroundColor: '#FBF0EC',
                          color: '#5C1929',
                          padding: '2px 8px',
                          borderRadius: '6px'
                        }}>
                          #{b.id}
                        </span>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          backgroundColor: b.status === 'CONFIRMED' ? '#E8F5E9' : b.status === 'COMPLETED' ? '#E3F2FD' : '#FFEBEE',
                          color: b.status === 'CONFIRMED' ? '#2E7D32' : b.status === 'COMPLETED' ? '#1565C0' : '#C62828'
                        }}>
                          {b.statusLabel || b.status}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: '#3E101B', margin: 0 }}>
                        {b.serviceName}
                      </h4>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '14px', fontWeight: '800', color: '#5C1929' }}>
                        {b.totalPrice ? b.totalPrice.toLocaleString() : '---'}đ
                      </span>
                      <div style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.6)' }}>
                        Đã cọc: <strong>{b.depositAmount ? b.depositAmount.toLocaleString() : '---'}đ</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: 'rgba(62, 16, 27, 0.7)',
                    borderTop: '1px dashed rgba(196, 158, 101, 0.2)',
                    paddingTop: '10px',
                    marginTop: '8px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} color="#5C1929" />
                        <strong>{b.time}</strong> • {b.date}
                      </span>
                      {b.customerName && (
                        <span>Khách: <strong>{b.customerName}</strong> ({b.customerPhone})</span>
                      )}
                    </div>

                    {b.status === 'CONFIRMED' && (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => completeBooking(b.id)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '8px',
                            backgroundColor: '#E8F5E9',
                            color: '#2E7D32',
                            fontSize: '11px',
                            fontWeight: '700'
                          }}
                        >
                          Hoàn thành
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Bạn có chắc muốn hủy lịch #${b.id} và hoàn tiền cọc cho khách?`)) {
                              cancelBooking(b.id);
                            }
                          }}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '8px',
                            backgroundColor: '#FFEBEE',
                            color: '#C62828',
                            fontSize: '11px',
                            fontWeight: '700'
                          }}
                        >
                          Hủy & Hoàn cọc
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
