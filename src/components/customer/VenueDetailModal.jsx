import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Star,
  MapPin,
  Clock,
  Phone,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Crown,
  Heart,
  MessageSquare
} from 'lucide-react';

export const VenueDetailModal = () => {
  const { selectedVenue, setSelectedVenue, setBookingVenue, setBookingService } = useApp();
  const [activeTab, setActiveTab] = useState('services'); // 'services' | 'reviews' | 'policy'

  if (!selectedVenue) return null;

  return (
    <div
      className="animate-slide-up"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#FBF7E8',
        zIndex: 950,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}
    >
      {/* Top Floating Action Bar */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '14px',
        right: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10
      }}>
        <button
          onClick={() => setSelectedVenue(null)}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#62202F',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          <X size={18} />
        </button>

        <button
          onClick={() => alert('Đã lưu cơ sở này vào danh sách yêu thích!')}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#62202F',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          <Heart size={18} />
        </button>
      </div>

      {/* Hero Image */}
      <div style={{ height: '230px', width: '100%', position: 'relative', flexShrink: 0 }}>
        <img
          src={selectedVenue.coverImage}
          alt={selectedVenue.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {selectedVenue.isSponsored && (
          <div
            className="badge-shimmer"
            style={{
              position: 'absolute',
              bottom: '14px',
              left: '16px',
              color: '#FBF7E8',
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '10.5px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            <Crown size={13} color="#DDA74F" />
            <span>ĐỐI TÁC VIP SPONSORED</span>
          </div>
        )}
      </div>

      {/* Main Info Card */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '26px 26px 0 0',
        marginTop: '-20px',
        padding: '22px 18px 80px',
        position: 'relative',
        boxShadow: '0 -6px 24px rgba(98, 32, 47, 0.08)',
        flex: 1
      }}>
        {/* Title & Category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            color: '#62202F',
            backgroundColor: '#F5D0C6',
            padding: '2px 10px',
            borderRadius: '999px'
          }}>
            {selectedVenue.categoryLabel}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '800', color: '#62202F' }}>
            <Star size={13} fill="#DDA74F" color="#DDA74F" />
            <span>{selectedVenue.rating}</span>
            <span style={{ color: 'rgba(98,32,47,0.5)', fontWeight: '500' }}>({selectedVenue.reviewCount} đánh giá)</span>
          </div>
        </div>

        <h1 style={{
          fontSize: '20px',
          fontWeight: '800',
          color: '#62202F',
          lineHeight: '1.3',
          marginBottom: '10px'
        }}>
          {selectedVenue.name}
        </h1>

        {/* Address & Hours */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(98, 32, 47, 0.8)' }}>
            <MapPin size={14} color="#62202F" style={{ flexShrink: 0 }} />
            <span>{selectedVenue.address}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(98, 32, 47, 0.8)' }}>
            <Clock size={14} color="#62202F" style={{ flexShrink: 0 }} />
            <span>Mở cửa: {selectedVenue.openTime} - {selectedVenue.closeTime} hàng ngày</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(98, 32, 47, 0.8)' }}>
            <Phone size={14} color="#62202F" style={{ flexShrink: 0 }} />
            <span>Hotline: {selectedVenue.phone}</span>
          </div>
        </div>

        {/* Description with Soft Tint */}
        <p style={{
          fontSize: '12px',
          color: 'rgba(98, 32, 47, 0.75)',
          lineHeight: '1.6',
          backgroundColor: '#FBF7E8',
          padding: '12px 14px',
          borderRadius: '16px',
          marginBottom: '16px',
          border: '1px solid rgba(245, 208, 198, 0.6)'
        }}>
          {selectedVenue.description}
        </p>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          backgroundColor: '#FBF7E8',
          borderRadius: '999px',
          padding: '4px',
          marginBottom: '16px',
          border: '1px solid rgba(245, 208, 198, 0.8)'
        }}>
          {[
            { id: 'services', label: `Dịch vụ (${selectedVenue.services.length})` },
            { id: 'reviews', label: `Đánh giá (${selectedVenue.reviews.length})` },
            { id: 'policy', label: 'Chính sách cọc' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '8px 0',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: activeTab === tab.id ? '800' : '600',
                backgroundColor: activeTab === tab.id ? '#62202F' : 'transparent',
                color: activeTab === tab.id ? '#FBF7E8' : '#62202F',
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: SERVICES (Module a, b) */}
        {activeTab === 'services' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="animate-fade-up">
            {selectedVenue.services.map((s) => (
              <div
                key={s.id}
                className="card-hover-lift"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '14px',
                  border: '1.5px solid rgba(245, 208, 198, 0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '13.5px', fontWeight: '800', color: '#62202F', marginBottom: '2px' }}>
                      {s.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'rgba(98, 32, 47, 0.65)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Clock size={11} /> {s.duration} phút
                      </span>
                      <span>•</span>
                      <span style={{ color: '#62202F', fontWeight: '800' }}>
                        Cọc trước: {s.deposit.toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#62202F' }}>
                      {s.price.toLocaleString()}đ
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '11.5px', color: 'rgba(98, 32, 47, 0.7)', lineHeight: '1.4' }}>
                  {s.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '4px' }}>
                  <button
                    onClick={() => {
                      setBookingVenue(selectedVenue);
                      setBookingService(s);
                    }}
                    style={{
                      backgroundColor: '#62202F',
                      color: '#FBF7E8',
                      padding: '7px 16px',
                      borderRadius: '999px',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 3px 8px rgba(98, 32, 47, 0.2)'
                    }}
                  >
                    <span>Chọn & Đặt lịch</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: REVIEWS (Module e) */}
        {activeTab === 'reviews' && (
          <div className="animate-fade-up">
            {/* Rating Overview */}
            <div style={{
              backgroundColor: '#FBF7E8',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              border: '1px solid #F5D0C6'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#62202F', lineHeight: '1' }}>
                  {selectedVenue.rating}
                </div>
                <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', margin: '4px 0' }}>
                  {[1, 2, 3, 4, 5].map((st) => (
                    <Star key={st} size={12} fill="#DDA74F" color="#DDA74F" />
                  ))}
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(98, 32, 47, 0.6)' }}>
                  {selectedVenue.reviews.length} đánh giá xác thực
                </div>
              </div>

              <div style={{ height: '40px', width: '1px', backgroundColor: 'rgba(98, 32, 47, 0.15)' }} />

              <div style={{ fontSize: '11px', color: 'rgba(98, 32, 47, 0.8)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={12} color="#C49E65" />
                  <span>100% Khách đã hoàn thành</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={12} color="#2E7D32" />
                  <span>Xác thực chính xác không ảo</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MessageSquare size={12} color="#691F31" />
                  <span>Đánh giá minh bạch</span>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedVenue.reviews.map((r) => (
                <div
                  key={r.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '14px',
                    border: '1px solid rgba(98, 32, 47, 0.08)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src={r.avatar}
                        alt={r.author}
                        style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#62202F' }}>
                          {r.author}
                        </div>
                        <div style={{ fontSize: '10px', color: 'rgba(98, 32, 47, 0.5)' }}>
                          {r.date}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={11}
                          fill={s <= r.rating ? '#DDA74F' : 'none'}
                          color="#DDA74F"
                        />
                      ))}
                    </div>
                  </div>

                  <p style={{ fontSize: '12px', color: '#62202F', lineHeight: '1.4', marginBottom: '8px' }}>
                    {r.comment}
                  </p>

                  {r.tags && r.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {r.tags.map((t, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '9.5px',
                            fontWeight: '600',
                            backgroundColor: '#F5D0C6',
                            color: '#62202F',
                            padding: '2px 8px',
                            borderRadius: '999px'
                          }}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: POLICY (Module c) */}
        {activeTab === 'policy' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="animate-fade-up">
            <div style={{
              backgroundColor: '#FBF7E8',
              borderRadius: '16px',
              padding: '14px',
              border: '1.5px solid #F5D0C6'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <ShieldCheck size={18} color="#62202F" />
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#62202F' }}>
                  Cơ Chế Đặt Cọc Cam Kết
                </h4>
              </div>
              <p style={{ fontSize: '11px', color: 'rgba(98, 32, 47, 0.8)', lineHeight: '1.5' }}>
                Nhằm tránh tình trạng "bùng lịch" và đảm bảo chuyên viên được giữ đúng khung giờ phục vụ riêng cho bạn, nền tảng áp dụng mức đặt cọc tối thiểu (từ 20% giá trị dịch vụ).
              </p>
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '14px',
              border: '1px solid rgba(98, 32, 47, 0.1)'
            }}>
              <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#62202F', marginBottom: '10px' }}>
                Chính Sách Hủy Lịch & Hoàn Tiền Cọc
              </h4>
              <ul style={{ fontSize: '11px', color: 'rgba(98, 32, 47, 0.8)', lineHeight: '1.6', paddingLeft: '16px' }}>
                <li><strong>Hủy trước 24 giờ:</strong> Hoàn 100% số tiền đặt cọc vào tài khoản hoặc ví điện tử.</li>
                <li><strong>Hủy từ 12 - 24 giờ:</strong> Hoàn 50% tiền cọc hoặc hỗ trợ dời lịch miễn phí 01 lần.</li>
                <li><strong>Hủy dưới 12 giờ:</strong> Không hoàn cọc để bồi hoàn chi phí chuẩn bị cho đối tác.</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Booking Bar */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(98, 32, 47, 0.1)',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100
      }}>
        <div>
          <div style={{ fontSize: '10px', color: 'rgba(98, 32, 47, 0.6)' }}>Giá dịch vụ từ</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#62202F' }}>
            {selectedVenue.services[0]?.price.toLocaleString()}đ
          </div>
        </div>

        <button
          onClick={() => {
            setBookingVenue(selectedVenue);
            setBookingService(selectedVenue.services[0]);
          }}
          style={{
            backgroundColor: '#62202F',
            color: '#FBF7E8',
            padding: '10px 24px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 14px rgba(98, 32, 47, 0.25)'
          }}
        >
          <Sparkles size={15} />
          <span>Đặt lịch ngay</span>
        </button>
      </div>
    </div>
  );
};
