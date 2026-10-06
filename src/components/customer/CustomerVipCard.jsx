import React from 'react';
import { useApp } from '../../context/AppContext';
import { Crown, Sparkles, ChevronRight } from 'lucide-react';

export const CustomerVipCard = () => {
  const { userTier, membershipTiers = [], setIsVipModalOpen } = useApp();

  const tiersList = Array.isArray(membershipTiers) ? membershipTiers : [];
  const activeTier = tiersList.find((t) => t.id === userTier);
  const isVip = userTier && userTier !== 'standard' && Boolean(activeTier);

  if (!isVip) {
    return (
      <div style={{ padding: '0 20px 14px' }}>
        <div
          onClick={() => setIsVipModalOpen(true)}
          className="warm-glass-card"
          style={{
            borderRadius: '18px',
            padding: '12px 16px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(251, 240, 236, 0.9) 100%)',
            border: '1px solid rgba(196, 158, 101, 0.28)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            boxShadow: '0 4px 16px -2px rgba(92, 25, 41, 0.06)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              backgroundColor: '#5C1929',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(92, 25, 41, 0.2)'
            }}>
              <Crown size={18} color="#E0C89F" />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#5C1929', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Thẻ VIP Tiệm B</span>
                <span style={{
                  fontSize: '9px',
                  backgroundColor: '#5C1929',
                  color: '#FAF6F0',
                  padding: '1px 6px',
                  borderRadius: '999px',
                  fontWeight: '700'
                }}>
                  Giảm đến 25%
                </span>
              </div>
              <div style={{ fontSize: '10.5px', color: 'rgba(62, 16, 27, 0.65)', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Đặc quyền giảm giá trọn đời & quà tặng sinh nhật
              </div>
            </div>
          </div>

          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: 'rgba(92, 25, 41, 0.08)',
            color: '#5C1929',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <ChevronRight size={15} />
          </div>
        </div>
      </div>
    );
  }

  // Active VIP Member Card View
  const isDiamond = userTier === 'card_diamond';
  const isGold = userTier === 'card_gold';

  const cardGradient = isDiamond
    ? 'linear-gradient(135deg, #15070C 0%, #3B1019 60%, #15070C 100%)'
    : isGold
      ? 'linear-gradient(135deg, #5C1929 0%, #40101C 60%, #290810 100%)'
      : 'linear-gradient(135deg, #3A3A3A 0%, #222222 100%)';

  const accentColor = isDiamond ? '#E6B8FF' : isGold ? '#E0C89F' : '#E0E0E0';

  return (
    <div style={{ padding: '0 20px 14px' }}>
      <div
        style={{
          borderRadius: '18px',
          padding: '14px 16px',
          background: cardGradient,
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 24px -3px rgba(92, 25, 41, 0.3)',
          border: `1px solid ${accentColor}44`
        }}
      >
        {/* Metallic Aura */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)`,
          pointerEvents: 'none'
        }} />

        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1, marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <Crown size={16} color={accentColor} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#FAF6F0', lineHeight: 1.2 }}>
                {activeTier.name}
              </div>
            </div>
          </div>

          <span style={{
            fontSize: '10px',
            fontWeight: '800',
            backgroundColor: `${accentColor}25`,
            color: accentColor,
            border: `1px solid ${accentColor}55`,
            padding: '2px 8px',
            borderRadius: '999px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px'
          }}>
            <Sparkles size={10} />
            Giảm {activeTier.discount}
          </span>
        </div>

        {/* Card Number & Info Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px' }}>
          <div style={{
            fontSize: '11px',
            fontFamily: 'monospace',
            letterSpacing: '1.5px',
            color: 'rgba(250, 246, 240, 0.85)'
          }}>
            TB-{isDiamond ? 'DIA' : isGold ? 'GLD' : 'SLV'}-8829
          </div>

          <button
            onClick={() => setIsVipModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              fontSize: '10px',
              fontWeight: '700',
              color: accentColor,
              backgroundColor: 'rgba(255,255,255,0.08)',
              padding: '3px 9px',
              borderRadius: '999px',
              border: `1px solid ${accentColor}33`
            }}
          >
            <span>Chi tiết</span>
            <ChevronRight size={11} />
          </button>
        </div>
      </div>
    </div>
  );
};
