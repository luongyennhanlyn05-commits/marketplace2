import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Plus, Star, Clock } from 'lucide-react';
import { SHOP_B_CATEGORIES } from '../../data/mockData';

export const ServicesScreen = () => {
  const { services, selectedCategory, setSelectedCategory, setBookingService, setIsBookingOpen } = useApp();
  const [keyword, setKeyword] = useState('');

  const filtered = services.filter((s) => {
    const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchQuery =
      s.name.toLowerCase().includes(keyword.toLowerCase()) ||
      s.description.toLowerCase().includes(keyword.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleBook = (svc) => {
    setBookingService(svc);
    setIsBookingOpen(true);
  };

  return (
    <div style={{ padding: '14px 18px 140px' }} className="animate-fade-up">
      {/* Title */}
      <div style={{ marginBottom: '12px' }}>
        <h2 style={{
          fontSize: '17px',
          fontWeight: '800',
          color: '#3E101B',
          letterSpacing: '-0.01em'
        }}>
          Menu Dịch Vụ
        </h2>
        <p style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.6)', marginTop: '1px' }}>
          Bảng giá & mức cọc minh bạch theo tiêu chuẩn Spa
        </p>
      </div>

      {/* Clean Search Input */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#FFFFFF',
        borderRadius: '999px',
        padding: '9px 14px',
        border: '1px solid rgba(196, 158, 101, 0.22)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
        marginBottom: '12px'
      }}>
        <Search size={15} color="rgba(62, 16, 27, 0.5)" />
        <input
          type="text"
          placeholder="Tìm tên dịch vụ, liệu trình..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '12px',
            width: '100%',
            padding: 0,
            color: '#3E101B',
            boxShadow: 'none'
          }}
        />
        {keyword && (
          <button onClick={() => setKeyword('')} style={{ fontSize: '11px', color: '#5C1929', fontWeight: '700' }}>
            Xóa
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        paddingBottom: '4px',
        marginBottom: '14px',
        scrollbarWidth: 'none'
      }}>
        {SHOP_B_CATEGORIES.map((c) => {
          const isSel = selectedCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              style={{
                padding: '6px 13px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: isSel ? '800' : '600',
                backgroundColor: isSel ? '#5C1929' : '#FFFFFF',
                color: isSel ? '#FAF6F0' : '#3E101B',
                border: isSel ? 'none' : '1px solid rgba(196, 158, 101, 0.2)',
                boxShadow: isSel ? '0 3px 10px rgba(92, 25, 41, 0.22)' : 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Services List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.length === 0 ? (
          <div className="warm-glass-card" style={{ textAlign: 'center', padding: '36px 10px', color: 'rgba(62, 16, 27, 0.5)', fontSize: '12px', borderRadius: '18px' }}>
            Không tìm thấy dịch vụ nào phù hợp!
          </div>
        ) : (
          filtered.map((s) => (
            <div
              key={s.id}
              onClick={() => handleBook(s)}
              className="warm-glass-card"
              style={{
                padding: '14px 16px',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                cursor: 'pointer',
                border: '1px solid rgba(196, 158, 101, 0.18)'
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{
                  fontSize: '13px',
                  fontWeight: '800',
                  color: '#3E101B',
                  marginBottom: '2px',
                  lineHeight: '1.3'
                }}>
                  {s.name}
                </h3>

                <p style={{
                  fontSize: '10.5px',
                  color: 'rgba(62, 16, 27, 0.65)',
                  lineHeight: '1.35',
                  marginBottom: '6px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {s.description}
                </p>

                <div style={{
                  fontSize: '10px',
                  color: 'rgba(62, 16, 27, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{
                    backgroundColor: '#FBF0EC',
                    padding: '2px 6px',
                    borderRadius: '6px',
                    fontWeight: '700',
                    color: '#5C1929',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}>
                    <Clock size={10} />
                    {s.duration}p
                  </span>
                  <span>Cọc: <strong style={{ color: '#3E101B' }}>{s.deposit.toLocaleString()}đ</strong></span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                <div style={{
                  fontSize: '13.5px',
                  fontWeight: '800',
                  color: '#5C1929'
                }}>
                  {s.price.toLocaleString()}đ
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBook(s);
                  }}
                  className="btn-burgundy-cta"
                  style={{
                    height: '28px',
                    padding: '0 12px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}
                >
                  <Plus size={12} />
                  <span>Đặt</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
