import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Star, Filter } from 'lucide-react';
import { INITIAL_CATEGORIES } from '../../data/mockData';

export const SearchScreen = () => {
  const { venues, setSelectedVenue, setBookingVenue, setBookingService } = useApp();
  const [keyword, setKeyword] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [priceRange, setPriceRange] = useState('all'); // all, low (<300k), mid (300k-600k), high (>600k)
  const [minRating, setMinRating] = useState(0);

  const filteredVenues = venues.filter((v) => {
    // Keyword match
    const matchKeyword =
      v.name.toLowerCase().includes(keyword.toLowerCase()) ||
      v.address.toLowerCase().includes(keyword.toLowerCase()) ||
      v.services.some((s) => s.name.toLowerCase().includes(keyword.toLowerCase()));

    // Category match
    const matchCat = selectedCat === 'all' || v.category === selectedCat;

    // District match
    const matchDistrict = selectedDistrict === 'all' || v.district === selectedDistrict;

    // Rating match
    const matchRating = v.rating >= minRating;

    // Price range match (based on min price of service)
    const minPrice = Math.min(...v.services.map((s) => s.price));
    let matchPrice = true;
    if (priceRange === 'low') matchPrice = minPrice <= 300000;
    else if (priceRange === 'mid') matchPrice = minPrice > 300000 && minPrice <= 600000;
    else if (priceRange === 'high') matchPrice = minPrice > 600000;

    return matchKeyword && matchCat && matchDistrict && matchRating && matchPrice;
  });

  return (
    <div style={{ padding: '16px 18px 24px' }}>
      {/* Header */}
      <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#62202F', marginBottom: '14px' }}>
        Tìm kiếm & Bộ lọc Dịch vụ
      </h2>

      {/* Search Input Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        padding: '10px 14px',
        border: '1.5px solid #F5D0C6',
        boxShadow: '0 4px 14px rgba(98, 32, 47, 0.05)',
        marginBottom: '16px'
      }}>
        <Search size={18} color="#62202F" />
        <input
          type="text"
          placeholder="Nhập tên dịch vụ, spa, salon..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '13px',
            width: '100%',
            padding: 0,
            boxShadow: 'none'
          }}
        />
        {keyword && (
          <button onClick={() => setKeyword('')} style={{ fontSize: '12px', color: '#62202F', fontWeight: '700' }}>
            Hủy
          </button>
        )}
      </div>

      {/* Filter Section */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '14px',
        border: '1px solid rgba(98, 32, 47, 0.12)',
        marginBottom: '18px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <Filter size={15} color="#62202F" />
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#62202F' }}>
            Bộ lọc tiêu chí
          </span>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(98, 32, 47, 0.7)', display: 'block', marginBottom: '6px' }}>
            Loại hình làm đẹp
          </label>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {INITIAL_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: selectedCat === c.id ? '700' : '500',
                  backgroundColor: selectedCat === c.id ? '#62202F' : '#F5D0C6',
                  color: selectedCat === c.id ? '#FBF7E8' : '#62202F'
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* District & Price Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(98, 32, 47, 0.7)', display: 'block', marginBottom: '4px' }}>
              Khu vực
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                borderRadius: '8px',
                fontSize: '12px',
                border: '1px solid rgba(98, 32, 47, 0.2)'
              }}
            >
              <option value="all">Tất cả quận</option>
              <option value="Quận 1">Quận 1</option>
              <option value="Quận 3">Quận 3</option>
              <option value="Bình Thạnh">Bình Thạnh</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(98, 32, 47, 0.7)', display: 'block', marginBottom: '4px' }}>
              Mức giá dịch vụ
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                borderRadius: '8px',
                fontSize: '12px',
                border: '1px solid rgba(98, 32, 47, 0.2)'
              }}
            >
              <option value="all">Mọi mức giá</option>
              <option value="low">Dưới 300.000đ</option>
              <option value="mid">300.000đ - 600.000đ</option>
              <option value="high">Trên 600.000đ</option>
            </select>
          </div>
        </div>

        {/* Rating filter */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '6px', borderTop: '1px dashed rgba(98, 32, 47, 0.15)' }}>
          <span style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(98, 32, 47, 0.7)' }}>
            Điểm đánh giá tối thiểu:
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[0, 4.5, 4.8].map((score) => (
              <button
                key={score}
                onClick={() => setMinRating(score)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: minRating === score ? '700' : '500',
                  backgroundColor: minRating === score ? '#62202F' : '#FBF7E8',
                  color: minRating === score ? '#FBF7E8' : '#62202F',
                  border: '1px solid rgba(98, 32, 47, 0.15)'
                }}
              >
                {score === 0 ? 'Tất cả' : `${score}⭐+`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div style={{ fontSize: '12px', fontWeight: '700', color: '#62202F', marginBottom: '10px' }}>
        Kết quả ({filteredVenues.length} địa điểm)
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredVenues.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 10px', color: 'rgba(98, 32, 47, 0.6)', fontSize: '13px' }}>
            Không tìm thấy cơ sở phù hợp với tiêu chí lọc.
          </div>
        ) : (
          filteredVenues.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelectedVenue(v)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '12px',
                border: '1px solid rgba(98, 32, 47, 0.12)',
                display: 'flex',
                gap: '12px',
                cursor: 'pointer'
              }}
            >
              <img
                src={v.coverImage}
                alt={v.name}
                style={{ width: '85px', height: '85px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#62202F', backgroundColor: '#F5D0C6', padding: '1px 6px', borderRadius: '4px' }}>
                    {v.categoryLabel}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '11px', fontWeight: '700', color: '#62202F' }}>
                    <Star size={11} fill="#DDA74F" color="#DDA74F" />
                    <span>{v.rating}</span>
                  </div>
                </div>

                <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#62202F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {v.name}
                </h4>

                <div style={{ fontSize: '11px', color: 'rgba(98, 32, 47, 0.65)', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {v.address}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#62202F' }}>
                    Từ {v.services[0]?.price.toLocaleString()}đ
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setBookingVenue(v);
                      setBookingService(v.services[0]);
                    }}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: '#62202F',
                      color: '#FBF7E8',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700'
                    }}
                  >
                    Đặt lịch
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
