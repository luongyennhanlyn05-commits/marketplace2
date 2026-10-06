import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Plus, Clock, Sparkles } from 'lucide-react';
import { SHOP_B_CATEGORIES } from '../../data/mockData';

export const DesktopCustomerServices = () => {
  const { services, selectedCategory, setSelectedCategory, setBookingService, setIsBookingOpen } = useApp();
  const [keyword, setKeyword] = useState('');

  const filtered = services.filter((s) => {
    const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchQuery =
      s.name.toLowerCase().includes(keyword.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(keyword.toLowerCase()));
    return matchCat && matchQuery;
  });

  const handleBook = (svc) => {
    setBookingService(svc);
    setIsBookingOpen(true);
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '24px 32px 60px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#3E101B', margin: '0 0 6px' }}>
          Menu Dịch Vụ & Bảng Giá Tiệm B
        </h1>
        <p style={{ fontSize: '13.5px', color: 'rgba(62, 16, 27, 0.65)', margin: 0 }}>
          Bảng giá & mức cọc minh bạch theo tiêu chuẩn Spa cao cấp Quận 1
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="warm-glass-card" style={{
        padding: '16px 20px',
        borderRadius: '18px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#3E101B', marginRight: '4px' }}>
            Danh mục:
          </span>
          {SHOP_B_CATEGORIES.map((c) => {
            const isSel = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: isSel ? '700' : '500',
                  backgroundColor: isSel ? '#5C1929' : 'rgba(255, 255, 255, 0.8)',
                  color: isSel ? '#FAF6F0' : '#3E101B',
                  border: isSel ? '1px solid #5C1929' : '1px solid rgba(196, 158, 101, 0.25)',
                  boxShadow: isSel ? '0 2px 8px rgba(92, 25, 41, 0.2)' : 'none'
                }}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#FFFFFF',
          borderRadius: '999px',
          padding: '7px 16px',
          border: '1px solid rgba(196, 158, 101, 0.3)',
          minWidth: '280px'
        }}>
          <Search size={15} color="rgba(62, 16, 27, 0.5)" />
          <input
            type="text"
            placeholder="Tìm theo tên dịch vụ, liệu trình..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '12.5px',
              width: '100%',
              padding: 0,
              boxShadow: 'none'
            }}
          />
          {keyword && (
            <button onClick={() => setKeyword('')} style={{ fontSize: '11px', color: '#5C1929', fontWeight: '700' }}>
              Xóa
            </button>
          )}
        </div>
      </div>

      {/* Services Multi-Column Responsive Grid */}
      {filtered.length === 0 ? (
        <div className="warm-glass-card" style={{
          padding: '60px 20px',
          borderRadius: '20px',
          textAlign: 'center',
          color: 'rgba(62, 16, 27, 0.6)'
        }}>
          <Sparkles size={36} color="#C49E65" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#3E101B', marginBottom: '6px' }}>
            Không tìm thấy dịch vụ nào phù hợp!
          </h3>
          <p style={{ fontSize: '13px' }}>
            Vui lòng thử từ khóa khác hoặc chọn lại danh mục!
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px'
        }}>
          {filtered.map((s) => (
            <div
              key={s.id}
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
                  src={s.image}
                  alt={s.name}
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
                    {s.categoryLabel || s.category}
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
                  {s.price.toLocaleString()}đ
                </div>
              </div>

              <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: '#3E101B', marginBottom: '8px' }}>
                  {s.name}
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
                  {s.description}
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
                    <Clock size={13} /> {s.duration} phút
                  </span>
                  <span style={{ color: 'rgba(62, 16, 27, 0.7)' }}>
                    Cọc: <strong style={{ color: '#5C1929' }}>{s.deposit.toLocaleString()}đ</strong>
                  </span>
                </div>

                <button
                  onClick={() => handleBook(s)}
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
      )}
    </div>
  );
};
