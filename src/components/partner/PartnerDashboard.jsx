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
  TrendingUp,
  Clock
} from 'lucide-react';

export const PartnerDashboard = () => {
  const { shopInfo, services, setOwnerTab, bookings, reviews } = useApp();

  const confirmedCount = bookings.filter((b) => b.status === 'CONFIRMED').length;
  const totalDepositRevenue = bookings
    .filter((b) => b.status === 'CONFIRMED' || b.status === 'COMPLETED')
    .reduce((sum, b) => sum + (b.depositAmount || 0), 0);

  return (
    <div style={{ padding: '14px 18px 140px' }} className="animate-fade-up">
      {/* Top Shop Card */}
      <div className="warm-glass-card" style={{
        borderRadius: '18px',
        padding: '14px',
        marginBottom: '14px',
        border: '1px solid rgba(196, 158, 101, 0.25)'
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <img
            src={shopInfo.coverImage}
            alt={shopInfo.name}
            style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span style={{
                fontSize: '9.5px',
                fontWeight: '800',
                padding: '2px 7px',
                borderRadius: '999px',
                backgroundColor: '#5C1929',
                color: '#FAF6F0'
              }}>
                CHỦ TIỆM B
              </span>
              <span style={{ fontSize: '9.5px', color: '#2E7D32', fontWeight: 'bold' }}>● Đang hoạt động</span>
            </div>

            <h2 style={{ fontSize: '13.5px', fontWeight: '800', color: '#3E101B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {shopInfo.name}
            </h2>
            <p style={{ fontSize: '10.5px', color: 'rgba(62, 16, 27, 0.6)' }}>
              86 Pasteur, Bến Nghé, Quận 1
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
        <div className="warm-glass-card" style={{
          borderRadius: '16px',
          padding: '12px',
          border: '1px solid rgba(196, 158, 101, 0.18)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(62, 16, 27, 0.65)', fontSize: '10.5px', marginBottom: '4px' }}>
            <DollarSign size={13} color="#5C1929" />
            <span>Tiền cọc nhận</span>
          </div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#5C1929' }}>
            {totalDepositRevenue.toLocaleString()}đ
          </div>
        </div>

        <div className="warm-glass-card" style={{
          borderRadius: '16px',
          padding: '12px',
          border: '1px solid rgba(196, 158, 101, 0.18)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(62, 16, 27, 0.65)', fontSize: '10.5px', marginBottom: '4px' }}>
            <CalendarDays size={13} color="#5C1929" />
            <span>Lịch hẹn chờ</span>
          </div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#5C1929' }}>
            {confirmedCount} lịch hẹn
          </div>
        </div>

        <div className="warm-glass-card" style={{
          borderRadius: '16px',
          padding: '12px',
          border: '1px solid rgba(196, 158, 101, 0.18)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(62, 16, 27, 0.65)', fontSize: '10.5px', marginBottom: '4px' }}>
            <Star size={13} color="#C49E65" />
            <span>Đánh giá tiệm</span>
          </div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#3E101B' }}>
            {shopInfo.rating} ⭐ ({shopInfo.reviewCount})
          </div>
        </div>

        <div className="warm-glass-card" style={{
          borderRadius: '16px',
          padding: '12px',
          border: '1px solid rgba(196, 158, 101, 0.18)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(62, 16, 27, 0.65)', fontSize: '10.5px', marginBottom: '4px' }}>
            <Sparkles size={13} color="#5C1929" />
            <span>Menu dịch vụ</span>
          </div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#3E101B' }}>
            {services.length} dịch vụ
          </div>
        </div>
      </div>

      {/* Management Shortcuts */}
      <h3 style={{ fontSize: '12.5px', fontWeight: '800', color: '#3E101B', marginBottom: '8px', letterSpacing: '0.2px' }}>
        Quản lý vận hành
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Calendar & Lock Slots */}
        <div
          onClick={() => setOwnerTab('calendar')}
          className="warm-glass-card"
          style={{
            borderRadius: '16px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            border: '1px solid rgba(196, 158, 101, 0.18)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              backgroundColor: '#FBF0EC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#5C1929'
            }}>
              <CalendarDays size={16} />
            </div>
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#3E101B' }}>
                Lịch Làm Việc & Khóa Khung Giờ
              </div>
              <div style={{ fontSize: '10.5px', color: 'rgba(62, 16, 27, 0.6)' }}>
                Khóa slot khi thợ bận hoặc tiệm kín chỗ
              </div>
            </div>
          </div>
          <ChevronRight size={15} color="#5C1929" />
        </div>

        {/* Services & Price Menu */}
        <div
          onClick={() => setOwnerTab('services')}
          className="warm-glass-card"
          style={{
            borderRadius: '16px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            border: '1px solid rgba(196, 158, 101, 0.18)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              backgroundColor: '#FBF0EC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#5C1929'
            }}>
              <Sparkles size={16} />
            </div>
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#3E101B' }}>
                Danh Mục Dịch Vụ & Bảng Giá
              </div>
              <div style={{ fontSize: '10.5px', color: 'rgba(62, 16, 27, 0.6)' }}>
                Thêm mới, chỉnh sửa giá cọc và thời lượng
              </div>
            </div>
          </div>
          <ChevronRight size={15} color="#5C1929" />
        </div>

        {/* VIP Memberships */}
        <div
          onClick={() => setOwnerTab('memberships')}
          className="warm-glass-card"
          style={{
            borderRadius: '16px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            border: '1px solid rgba(196, 158, 101, 0.18)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              backgroundColor: '#5C1929',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FAF6F0'
            }}>
              <Crown size={16} color="#E0C89F" />
            </div>
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#3E101B' }}>
                Gói Thẻ Thành Viên & Ưu Đãi VIP
              </div>
              <div style={{ fontSize: '10.5px', color: 'rgba(62, 16, 27, 0.6)' }}>
                Quản lý các hạng thẻ Thân thiết, Gold VIP, Diamond
              </div>
            </div>
          </div>
          <ChevronRight size={15} color="#5C1929" />
        </div>

        {/* Reviews */}
        <div
          onClick={() => setOwnerTab('shop_profile')}
          className="warm-glass-card"
          style={{
            borderRadius: '16px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            border: '1px solid rgba(196, 158, 101, 0.18)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              backgroundColor: '#FBF0EC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#5C1929'
            }}>
              <Star size={16} fill="#C49E65" color="#C49E65" />
            </div>
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#3E101B', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span>Đánh Giá & Phản Hồi</span>
                <span style={{ fontSize: '9.5px', backgroundColor: '#E8F5E9', color: '#2E7D32', padding: '1px 5px', borderRadius: '4px', fontWeight: '700' }}>
                  {shopInfo.rating}⭐ ({reviews.length})
                </span>
              </div>
              <div style={{ fontSize: '10.5px', color: 'rgba(62, 16, 27, 0.6)' }}>
                Xem phản hồi khách hàng & báo cáo vi phạm
              </div>
            </div>
          </div>
          <ChevronRight size={15} color="#5C1929" />
        </div>

        {/* Shop Info */}
        <div
          onClick={() => setOwnerTab('shop_profile')}
          className="warm-glass-card"
          style={{
            borderRadius: '16px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            border: '1px solid rgba(196, 158, 101, 0.18)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              backgroundColor: '#FBF0EC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#5C1929'
            }}>
              <Store size={16} />
            </div>
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#3E101B' }}>
                Thông Tin Cơ Sở Tiệm B
              </div>
              <div style={{ fontSize: '10.5px', color: 'rgba(62, 16, 27, 0.6)' }}>
                Địa chỉ, Hotline, giờ hoạt động và hình ảnh
              </div>
            </div>
          </div>
          <ChevronRight size={15} color="#5C1929" />
        </div>
      </div>
    </div>
  );
};
