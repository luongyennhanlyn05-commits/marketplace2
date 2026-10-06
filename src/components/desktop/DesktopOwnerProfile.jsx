import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Store,
  Star,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Check,
  Sparkles,
  MessageCircle,
  CornerDownRight,
  Send,
  Flag,
  Coffee,
  Car,
  Wifi
} from 'lucide-react';

export const DesktopOwnerProfile = () => {
  const { shopInfo, updateShopInfo, reviews, replyReview, moderateReview } = useApp();

  const [formData, setFormData] = useState({
    name: shopInfo.name || '',
    address: shopInfo.address || '',
    hotline: shopInfo.hotline || '',
    openTime: shopInfo.openTime || '08:30',
    closeTime: shopInfo.closeTime || '21:00',
    description: shopInfo.description || '',
    depositRate: shopInfo.depositRate || 20
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    updateShopInfo(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSendReply = (reviewId) => {
    if (!replyText.trim()) return;
    replyReview(reviewId, replyText);
    setActiveReplyId(null);
    setReplyText('');
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '24px 32px 60px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{
            backgroundColor: '#5C1929',
            color: '#FAF6F0',
            fontSize: '11px',
            fontWeight: '800',
            padding: '3px 10px',
            borderRadius: '999px'
          }}>
            HỒ SƠ CƠ SỞ
          </span>
          <span style={{ fontSize: '13px', color: 'rgba(62, 16, 27, 0.65)' }}>
            • Thông tin cơ sở & Phản hồi khách hàng
          </span>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#3E101B', margin: 0 }}>
          Thông Tin Cơ Sở Tiệm B & Đánh Giá
        </h1>
      </div>

      {/* 2-Column Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(380px, 1fr) minmax(420px, 1.2fr)',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* Left Column: Shop Profile Form */}
        <div className="warm-glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: '800', color: '#3E101B', marginBottom: '16px' }}>
            Thông Tin Tiệm B
          </h2>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '4px' }}>
                Tên thương hiệu tiệm:
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '4px' }}>
                Địa chỉ cơ sở:
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '4px' }}>
                  Hotline đặt lịch:
                </label>
                <input
                  type="text"
                  value={formData.hotline}
                  onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '4px' }}>
                  Tỷ lệ cọc giữ chỗ (%):
                </label>
                <input
                  type="number"
                  value={formData.depositRate}
                  onChange={(e) => setFormData({ ...formData, depositRate: Number(e.target.value) })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '4px' }}>
                  Giờ mở cửa:
                </label>
                <input
                  type="text"
                  value={formData.openTime}
                  onChange={(e) => setFormData({ ...formData, openTime: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '4px' }}>
                  Giờ đóng cửa:
                </label>
                <input
                  type="text"
                  value={formData.closeTime}
                  onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '13px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '4px' }}>
                Giới thiệu không gian & phong cách:
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '13px', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
              {savedSuccess ? (
                <span style={{ color: '#2E7D32', fontSize: '12.5px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={16} /> Đã lưu thông tin thành công!
                </span>
              ) : <div />}

              <button
                type="submit"
                className="btn-burgundy-cta"
                style={{ padding: '0 24px', height: '42px', borderRadius: '12px', fontSize: '13px' }}
              >
                Lưu Thay Đổi
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Customer Reviews & Replies */}
        <div className="warm-glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: '800', color: '#3E101B', margin: 0 }}>
                Đánh Giá Của Khách Hàng ({reviews.length})
              </h2>
              <p style={{ fontSize: '12px', color: 'rgba(62, 16, 27, 0.65)', marginTop: '2px' }}>
                Điểm trung bình: <strong>{shopInfo.rating} ★</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {reviews.map((rev) => (
              <div
                key={rev.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '16px',
                  border: '1px solid rgba(196, 158, 101, 0.2)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#3E101B', margin: 0 }}>
                        {rev.author}
                      </h4>
                      <div style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.6)' }}>
                        {rev.serviceName} • {rev.date}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#C49E65' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        fill={i < rev.rating ? '#C49E65' : 'transparent'}
                        color="#C49E65"
                      />
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: '12.5px', color: 'rgba(62, 16, 27, 0.8)', lineHeight: '1.45', marginBottom: '10px' }}>
                  {rev.comment}
                </p>

                {/* Shop Reply Display */}
                {rev.shopReply && (
                  <div style={{
                    backgroundColor: '#FBF0EC',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontSize: '12px',
                    color: '#5C1929',
                    marginBottom: '8px',
                    borderLeft: '3px solid #5C1929'
                  }}>
                    <strong style={{ display: 'block', marginBottom: '2px' }}>
                      Tiệm B đã phản hồi ({rev.shopReply.date}):
                    </strong>
                    {rev.shopReply.text}
                  </div>
                )}

                {/* Reply Form / Button */}
                {activeReplyId === rev.id ? (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <input
                      type="text"
                      placeholder="Nhập lời cảm ơn hoặc phản hồi của Tiệm B..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      style={{ flex: 1, padding: '7px 12px', borderRadius: '8px', fontSize: '12px' }}
                    />
                    <button
                      onClick={() => handleSendReply(rev.id)}
                      className="btn-burgundy-cta"
                      style={{ height: '34px', padding: '0 14px', borderRadius: '8px', fontSize: '11.5px' }}
                    >
                      Gửi
                    </button>
                    <button
                      onClick={() => setActiveReplyId(null)}
                      style={{ padding: '0 10px', fontSize: '11.5px', color: 'rgba(62, 16, 27, 0.6)' }}
                    >
                      Hủy
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    {!rev.shopReply && (
                      <button
                        onClick={() => {
                          setActiveReplyId(rev.id);
                          setReplyText('');
                        }}
                        style={{
                          fontSize: '11.5px',
                          color: '#5C1929',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <CornerDownRight size={13} />
                        <span>Phản hồi khách hàng</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
