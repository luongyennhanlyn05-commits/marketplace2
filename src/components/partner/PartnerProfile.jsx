import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Store,
  CheckCircle2,
  Save,
  Star,
  Camera,
  ShieldCheck,
  Sparkles,
  Users,
  Trash2,
  Car,
  Coffee,
  Wifi,
  Check,
  ChevronRight,
  Clock,
  Phone,
  MapPin,
  FileText
} from 'lucide-react';
import { PartnerReviews } from './PartnerReviews';

export const PartnerProfile = () => {
  const { shopInfo, updateShopInfo, reviews, staffList } = useApp();
  const [profileTab, setProfileTab] = useState('brand'); // 'brand' | 'operations' | 'staff' | 'reviews'

  const flaggedCount = reviews.filter((r) => r.status === 'FLAGGED').length;

  const cleanText = (str) => {
    if (typeof str !== 'string') return '';
    return str.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim();
  };

  const getAmenityIcon = (text) => {
    const t = text.toLowerCase();
    if (t.includes('đỗ') || t.includes('xe') || t.includes('ô tô')) return <Car size={14} color="#5C1929" />;
    if (t.includes('trà') || t.includes('bánh') || t.includes('nước')) return <Coffee size={14} color="#5C1929" />;
    if (t.includes('wi-fi') || t.includes('wifi') || t.includes('sạc')) return <Wifi size={14} color="#5C1929" />;
    return <Sparkles size={14} color="#C49E65" />;
  };

  const [formData, setFormData] = useState({
    name: shopInfo.name || 'B Beauty & Luxury Spa',
    tagline: shopInfo.tagline || 'Không gian thư giãn đẳng cấp & chăm sóc vẻ đẹp chuẩn chuyên gia',
    address: shopInfo.address || '86 Pasteur, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    hotline: shopInfo.hotline || '0908 888 999',
    openTime: shopInfo.openTime || '08:30',
    closeTime: shopInfo.closeTime || '21:00',
    description: shopInfo.description || 'Tiệm B là không gian làm đẹp cao cấp tích hợp Hair Studio, Nail Art và Spa Trị Liệu.',
    depositRate: shopInfo.depositRate || 20,
    depositPolicy: shopInfo.depositPolicy || 'Quý khách vui lòng đặt cọc giữ khung giờ phục vụ riêng. Tiệm B cam kết hoàn 100% tiền cọc nếu hủy trước 24 giờ.',
    gallery: shopInfo.gallery || [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: (shopInfo.amenities || [
      'Có chỗ đỗ ô tô & xe máy miễn phí',
      'Trà thảo mộc & bánh ngọt đón tiếp',
      'Phòng trị liệu riêng tư chuẩn VIP',
      'Wi-Fi 5G & sạc điện thoại tại ghế'
    ]).map(cleanText)
  });

  const [newAmenityText, setNewAmenityText] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    if (e) e.preventDefault();
    updateShopInfo(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddAmenity = () => {
    if (!newAmenityText.trim()) return;
    const cleaned = cleanText(newAmenityText.trim());
    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, cleaned]
    }));
    setNewAmenityText('');
  };

  const handleRemoveAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  return (
    <div style={{ padding: '14px 18px 140px' }} className="animate-fade-up">
      {/* 1. Header Tiệm B Profile */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <h2 style={{ fontSize: '17px', fontWeight: '800', color: '#3E101B', letterSpacing: '-0.01em' }}>
            Hồ Sơ & Cấu Hình Cơ Sở
          </h2>
          <p style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.6)', marginTop: '1px' }}>
            Thông tin hiển thị cho khách hàng trên ứng dụng
          </p>
        </div>

        <button
          onClick={handleSave}
          className="btn-burgundy-cta"
          style={{
            padding: '7px 14px',
            borderRadius: '12px',
            fontSize: '11.5px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          {saveSuccess ? <Check size={13} color="#FAF6F0" /> : <Save size={13} />}
          <span>{saveSuccess ? 'Đã lưu' : 'Lưu hồ sơ'}</span>
        </button>
      </div>

      {/* 2. Clean Segmented Navigation */}
      <div style={{
        display: 'flex',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        padding: '3px',
        marginBottom: '16px',
        border: '1px solid rgba(196, 158, 101, 0.2)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
      }}>
        {[
          { id: 'brand', label: 'Cơ sở & Ảnh', icon: Store },
          { id: 'operations', label: 'Chính sách cọc', icon: ShieldCheck },
          { id: 'staff', label: 'Chuyên viên', icon: Users },
          { id: 'reviews', label: 'Đánh giá', icon: Star, badge: flaggedCount }
        ].map((tab) => {
          const Icon = tab.icon;
          const isAct = profileTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setProfileTab(tab.id)}
              style={{
                flex: 1,
                padding: '7px 4px',
                borderRadius: '10px',
                fontSize: '11px',
                fontWeight: isAct ? '800' : '600',
                backgroundColor: isAct ? '#5C1929' : 'transparent',
                color: isAct ? '#FAF6F0' : '#3E101B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                position: 'relative',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={12} />
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span style={{
                  backgroundColor: isAct ? '#F5DDD7' : '#5C1929',
                  color: isAct ? '#5C1929' : '#FAF6F0',
                  borderRadius: '999px',
                  padding: '1px 5px',
                  fontSize: '9px',
                  fontWeight: '800'
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: BRAND & GENERAL PROFILE */}
      {profileTab === 'brand' && (
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Card 1: Thông tin cơ bản */}
          <div className="warm-glass-card" style={{
            borderRadius: '18px',
            padding: '16px',
            border: '1px solid rgba(196, 158, 101, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#3E101B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Store size={15} color="#5C1929" />
              <span>Thông tin thương hiệu</span>
            </div>

            <div>
              <span style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.7)', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                Tên cơ sở:
              </span>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '12px' }}
              />
            </div>

            <div>
              <span style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.7)', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                Địa chỉ cơ sở:
              </span>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '12px' }}
              />
            </div>

            <div>
              <span style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.7)', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                Khẩu hiệu / Tagline:
              </span>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '12px' }}
              />
            </div>

            <div>
              <span style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.7)', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                Giới thiệu không gian tiệm:
              </span>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '11.5px', resize: 'none', lineHeight: '1.45' }}
              />
            </div>
          </div>

          {/* Card 2: Liên hệ & Giờ phục vụ */}
          <div className="warm-glass-card" style={{
            borderRadius: '18px',
            padding: '16px',
            border: '1px solid rgba(196, 158, 101, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#3E101B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={15} color="#5C1929" />
              <span>Liên hệ & Phục vụ</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.7)', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                  Hotline đặt hẹn:
                </span>
                <input
                  type="text"
                  value={formData.hotline}
                  onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                  style={{ width: '100%', padding: '9px 10px', borderRadius: '10px', fontSize: '11.5px' }}
                />
              </div>

              <div>
                <span style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.7)', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                  Giờ mở cửa:
                </span>
                <input
                  type="text"
                  value={`${formData.openTime} - ${formData.closeTime}`}
                  onChange={(e) => {
                    const parts = e.target.value.split('-');
                    if (parts.length === 2) {
                      setFormData({ ...formData, openTime: parts[0].trim(), closeTime: parts[1].trim() });
                    }
                  }}
                  style={{ width: '100%', padding: '9px 10px', borderRadius: '10px', fontSize: '11.5px' }}
                />
              </div>
            </div>
          </div>

          {/* Card 3: Bộ sưu tập ảnh không gian */}
          <div className="warm-glass-card" style={{
            borderRadius: '18px',
            padding: '16px',
            border: '1px solid rgba(196, 158, 101, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#3E101B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Camera size={15} color="#5C1929" />
                <span>Không gian tiệm ({formData.gallery.length} ảnh)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '10.5px', color: 'rgba(62, 16, 27, 0.55)' }}>
                <span>Vuốt ngang</span>
                <ChevronRight size={12} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              {formData.gallery.map((imgUrl, i) => (
                <div
                  key={i}
                  style={{
                    width: '120px',
                    height: '80px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    position: 'relative',
                    border: '1px solid rgba(196, 158, 101, 0.25)'
                  }}
                >
                  <img
                    src={imgUrl}
                    alt={`Ảnh cơ sở ${i + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {i === 0 && (
                    <span style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: '4px',
                      backgroundColor: '#5C1929',
                      color: '#FAF6F0',
                      fontSize: '8.5px',
                      fontWeight: '800',
                      padding: '1px 5px',
                      borderRadius: '4px'
                    }}>
                      Ảnh bìa
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Tiện ích đón tiếp (Clean Vector Icons) */}
          <div className="warm-glass-card" style={{
            borderRadius: '18px',
            padding: '16px',
            border: '1px solid rgba(196, 158, 101, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#3E101B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={15} color="#C49E65" />
              <span>Tiện ích phục vụ khách</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {formData.amenities.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(196, 158, 101, 0.18)',
                    fontSize: '11.5px',
                    color: '#3E101B'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {getAmenityIcon(item)}
                    <span>{item}</span>
                  </div>
                  <button type="button" onClick={() => handleRemoveAmenity(index)} style={{ color: 'rgba(62, 16, 27, 0.4)' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}

              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                <input
                  type="text"
                  value={newAmenityText}
                  onChange={(e) => setNewAmenityText(e.target.value)}
                  placeholder="Thêm tiện ích (VD: Ghế massage tự động)..."
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '10px', fontSize: '11.5px' }}
                />
                <button
                  type="button"
                  onClick={handleAddAmenity}
                  className="btn-burgundy-cta"
                  style={{
                    padding: '0 14px',
                    height: '34px',
                    borderRadius: '10px',
                    fontSize: '11px',
                    fontWeight: '700'
                  }}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-burgundy-cta"
            style={{ width: '100%', height: '44px', gap: '6px', marginTop: '4px' }}
          >
            {saveSuccess ? <Check size={16} /> : <Save size={16} />}
            <span>{saveSuccess ? 'Đã lưu toàn bộ hồ sơ cơ sở' : 'Lưu thay đổi cơ sở Tiệm B'}</span>
          </button>
        </form>
      )}

      {/* TAB CONTENT: OPERATIONS & DEPOSIT POLICY */}
      {profileTab === 'operations' && (
        <div className="warm-glass-card" style={{
          borderRadius: '18px',
          padding: '16px',
          border: '1px solid rgba(196, 158, 101, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#3E101B', margin: 0 }}>
              Chính Sách Đặt Cọc & Hoàn Tiền
            </h3>
            <p style={{ fontSize: '11px', color: 'rgba(62, 16, 27, 0.6)', marginTop: '2px' }}>
              Quy định đặt cọc bảo đảm giữ khung giờ riêng cho khách
            </p>
          </div>

          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '6px' }}>
              Tỷ lệ đặt cọc:
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[15, 20, 25, 30].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setFormData({ ...formData, depositRate: rate })}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    borderRadius: '10px',
                    fontWeight: '800',
                    fontSize: '12.5px',
                    backgroundColor: formData.depositRate === rate ? '#5C1929' : '#FFFFFF',
                    color: formData.depositRate === rate ? '#FAF6F0' : '#3E101B',
                    border: formData.depositRate === rate ? 'none' : '1px solid rgba(196, 158, 101, 0.25)',
                    boxShadow: formData.depositRate === rate ? '0 2px 8px rgba(92, 25, 41, 0.2)' : 'none'
                  }}
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '4px' }}>
              Cam kết hoàn tiền cọc hiển thị cho khách:
            </span>
            <textarea
              rows={3}
              value={formData.depositPolicy}
              onChange={(e) => setFormData({ ...formData, depositPolicy: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '11.5px', resize: 'none', lineHeight: '1.45' }}
            />
          </div>

          <div style={{
            backgroundColor: '#FBF0EC',
            borderRadius: '12px',
            padding: '10px 12px',
            fontSize: '11px',
            color: '#5C1929',
            lineHeight: '1.45',
            border: '1px solid rgba(196, 158, 101, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ShieldCheck size={16} color="#5C1929" style={{ flexShrink: 0 }} />
            <div>
              <strong>Đặc quyền VIP:</strong> Hội viên Thẻ Kim Cương (Diamond VIP) được miễn trừ phạt cọc và được hỗ trợ dời lịch linh hoạt 100%.
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="btn-burgundy-cta"
            style={{ width: '100%', height: '44px', gap: '5px' }}
          >
            {saveSuccess ? <Check size={15} /> : <Save size={15} />}
            <span>{saveSuccess ? 'Đã lưu chính sách' : 'Cập nhật chính sách cọc'}</span>
          </button>
        </div>
      )}

      {/* TAB CONTENT: STAFF LIST */}
      {profileTab === 'staff' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {staffList.map((staff) => (
            <div
              key={staff.id}
              className="warm-glass-card"
              style={{
                borderRadius: '16px',
                padding: '12px 14px',
                border: '1px solid rgba(196, 158, 101, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={staff.avatar}
                  alt={staff.name}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid rgba(196, 158, 101, 0.35)' }}
                />
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#3E101B' }}>
                    {staff.name}
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'rgba(62, 16, 27, 0.6)' }}>
                    {staff.role}
                  </div>
                </div>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                backgroundColor: 'rgba(196, 158, 101, 0.15)',
                padding: '2px 7px',
                borderRadius: '6px',
                fontSize: '10.5px',
                fontWeight: '800',
                color: '#5C1929'
              }}>
                <Star size={10} fill="#C49E65" color="#C49E65" />
                <span>{staff.rating}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: REVIEWS & MODERATION */}
      {profileTab === 'reviews' && <PartnerReviews />}
    </div>
  );
};
