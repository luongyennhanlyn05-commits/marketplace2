import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, ExternalLink, MapPin, Gift, CheckCircle2 } from 'lucide-react';

export const ReviewModal = () => {
  const { reviewBooking, setReviewBooking, submitReview, shopInfo } = useApp();
  const [hasOpenedMaps, setHasOpenedMaps] = useState(false);

  if (!reviewBooking) return null;

  const mapsReviewUrl =
    shopInfo.googleMapsReviewUrl ||
    shopInfo.googleMapsUrl ||
    'https://maps.google.com/?q=86+Pasteur+Ben+Nghe+Quan+1+Ho+Chi+Minh#review';

  const handleOpenGoogleMaps = () => {
    // Open Google Maps review link in a new tab
    window.open(mapsReviewUrl, '_blank', 'noopener,noreferrer');

    // Automatically reward the customer & mark as reviewed
    submitReview({
      bookingId: reviewBooking.id,
      serviceName: reviewBooking.serviceName,
      rating: 5,
      comment: 'Đã để lại đánh giá 5 sao trên Google Maps của Tiệm B.',
      tags: ['Đánh giá Google Maps ⭐⭐⭐⭐⭐']
    });

    setHasOpenedMaps(true);
  };

  const handleClose = () => {
    setReviewBooking(null);
    setHasOpenedMaps(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(30, 8, 14, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 18px'
      }}
      onClick={handleClose}
    >
      <div
        className="warm-glass-card animate-fade-up"
        style={{
          width: '100%',
          maxWidth: '350px',
          backgroundColor: '#FFFDF9',
          borderRadius: '26px',
          padding: '22px 20px',
          boxShadow: '0 20px 45px rgba(105, 31, 49, 0.35)',
          border: '1.5px solid rgba(201, 168, 117, 0.4)',
          position: 'relative',
          textAlign: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'rgba(105, 31, 49, 0.08)',
            color: '#691F31',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={15} />
        </button>

        {!hasOpenedMaps ? (
          <>
            {/* Google Maps Pin & Star Badge */}
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #F1D0C9 0%, #E8BCB1 100%)',
              color: '#691F31',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px',
              boxShadow: '0 6px 16px rgba(105, 31, 49, 0.15)'
            }}>
              <MapPin size={28} color="#691F31" />
            </div>

            <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#691F31', margin: '0 0 4px' }}>
              Đánh Giá Trên Google Maps
            </h3>

            <p style={{ fontSize: '11px', color: '#8C5A65', margin: '0 0 10px' }}>
              Lịch hẹn <strong>#{reviewBooking.id}</strong> • {shopInfo.name}
            </p>

            <div style={{
              display: 'inline-block',
              backgroundColor: 'rgba(241, 208, 201, 0.5)',
              color: '#691F31',
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: '700',
              marginBottom: '14px'
            }}>
              {reviewBooking.serviceName}
            </div>

            {/* 5 Stars Visual */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              marginBottom: '14px'
            }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={26} fill="#C9A875" color="#C9A875" />
              ))}
            </div>

            {/* Reward Box */}
            <div style={{
              backgroundColor: 'rgba(248, 242, 236, 0.85)',
              borderRadius: '16px',
              padding: '12px 14px',
              border: '1px solid rgba(201, 168, 117, 0.3)',
              marginBottom: '18px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#FFF8F4',
                color: '#691F31',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Gift size={20} color="#691F31" />
              </div>
              <div style={{ fontSize: '11.5px', color: '#691F31', lineHeight: '1.4' }}>
                Dành 30 giây để lại đánh giá 5 sao trên Google Maps của tiệm để nhận ngay <strong>Voucher 50.000đ</strong>!
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={handleOpenGoogleMaps}
                style={{
                  width: '100%',
                  padding: '13px',
                  backgroundColor: '#691F31',
                  color: '#FFF8F4',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: '700',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(105, 31, 49, 0.28)',
                  transition: 'all 0.18s ease'
                }}
              >
                <span>Mở Google Maps Đánh Giá</span>
                <ExternalLink size={14} />
              </button>

              <button
                onClick={handleClose}
                style={{
                  width: '100%',
                  padding: '9px',
                  backgroundColor: 'transparent',
                  color: '#8C5A65',
                  borderRadius: '999px',
                  fontSize: '11.5px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Để sau
              </button>
            </div>
          </>
        ) : (
          /* SUCCESS STATE */
          <div style={{ padding: '10px 0' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#E8F5E9',
              color: '#2E7D32',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px'
            }}>
              <CheckCircle2 size={30} />
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#691F31', margin: '0 0 6px' }}>
              Cảm Ơn Đánh Giá Của Bạn!
            </h3>

            <p style={{ fontSize: '11.5px', color: '#8C5A65', lineHeight: 1.4, margin: '0 0 16px' }}>
              Tiệm B đã ghi nhận đánh giá của bạn trên Google Maps và gửi tặng bạn <strong>Voucher 50.000đ</strong> vào mục Thông báo!
            </p>

            <button
              onClick={handleClose}
              style={{
                width: '100%',
                padding: '11px',
                backgroundColor: '#691F31',
                color: '#FFF8F4',
                borderRadius: '999px',
                fontSize: '12.5px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Hoàn tất & Quay lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
