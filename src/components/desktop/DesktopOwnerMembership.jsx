import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Crown,
  Search,
  Plus,
  Edit3,
  Check,
  X,
  Trash2
} from 'lucide-react';

export const DesktopOwnerMembership = () => {
  const {
    vipMembers = [],
    membershipTiers = [],
    updateVipMember,
    addVipMember,
    deleteVipMember
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTierFilter, setSelectedTierFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [tempNote, setTempNote] = useState('');

  const [newMember, setNewMember] = useState({
    fullName: '',
    phone: '',
    tier: 'card_gold',
    note: '',
    favoriteStaff: 'Chuyên viên ngẫu nhiên'
  });

  const filteredMembers = vipMembers.filter((m) => {
    const matchTier = selectedTierFilter === 'all' || m.tier === selectedTierFilter;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      m.fullName.toLowerCase().includes(q) ||
      m.phone.includes(q) ||
      m.cardCode.toLowerCase().includes(q) ||
      (m.note && m.note.toLowerCase().includes(q));
    return matchTier && matchSearch;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newMember.fullName.trim() || !newMember.phone.trim()) {
      alert('Vui lòng nhập họ tên và số điện thoại!');
      return;
    }

    const tierObj = membershipTiers.find((t) => t.id === newMember.tier) || membershipTiers[1];
    const prefix = newMember.tier === 'card_diamond' ? 'DIA' : newMember.tier === 'card_gold' ? 'GLD' : 'SLV';
    const cardCode = `TB-${prefix}-${Math.floor(100 + Math.random() * 900)}`;

    addVipMember({
      id: `vip_${Date.now()}`,
      cardCode,
      tier: newMember.tier,
      tierName: tierObj.name,
      fullName: newMember.fullName,
      phone: newMember.phone,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      joinDate: new Date().toLocaleDateString('vi-VN'),
      expiryDate: newMember.tier === 'card_diamond' ? 'Trọn đời' : '12 tháng',
      totalSpent: tierObj.price,
      visitsCount: 1,
      favoriteStaff: newMember.favoriteStaff,
      note: newMember.note || 'Tạo tại quầy lễ tân',
      status: 'ACTIVE',
      benefitsUsed: 'Mới kích hoạt'
    });

    setIsAddModalOpen(false);
    setNewMember({
      fullName: '',
      phone: '',
      tier: 'card_gold',
      note: '',
      favoriteStaff: 'Chuyên viên ngẫu nhiên'
    });
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '24px 32px 60px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              backgroundColor: '#5C1929',
              color: '#FAF6F0',
              fontSize: '11px',
              fontWeight: '800',
              padding: '3px 10px',
              borderRadius: '999px'
            }}>
              CRM TIỆM B
            </span>
            <span style={{ fontSize: '13px', color: 'rgba(62, 16, 27, 0.65)' }}>
              • Quản lý {vipMembers.length} Hội viên VIP & Gói thẻ thành viên
            </span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#3E101B', margin: 0 }}>
            Thẻ VIP & Khách Hàng Thân Thiết
          </h1>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-burgundy-cta"
          style={{ height: '42px', padding: '0 20px', borderRadius: '12px', gap: '8px', fontSize: '13px' }}
        >
          <Plus size={16} />
          <span>Thêm hội viên VIP</span>
        </button>
      </div>

      {/* 3 Membership Tiers Overview Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {membershipTiers.map((tier) => {
          const membersInTier = vipMembers.filter((m) => m.tier === tier.id).length;
          const isDiamond = tier.id === 'card_diamond';
          const isGold = tier.id === 'card_gold';

          return (
            <div
              key={tier.id}
              className="warm-glass-card"
              style={{
                borderRadius: '20px',
                padding: '24px',
                border: isDiamond ? '2px solid #8A6D3B' : isGold ? '2px solid #C49E65' : '1px solid rgba(196, 158, 101, 0.25)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Crown size={18} color={isDiamond ? '#8A6D3B' : isGold ? '#C49E65' : '#718096'} />
                    <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#3E101B', margin: 0 }}>
                      {tier.name}
                    </h3>
                  </div>
                  <span style={{ fontSize: '12px', color: 'rgba(62, 16, 27, 0.65)' }}>
                    {membersInTier} thành viên sở hữu
                  </span>
                </div>

                <div style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  backgroundColor: isDiamond ? '#5C1929' : isGold ? '#FBF0EC' : '#EDF2F7',
                  color: isDiamond ? '#FAF6F0' : isGold ? '#5C1929' : '#4A5568',
                  fontSize: '11px',
                  fontWeight: '800'
                }}>
                  {tier.discount}
                </div>
              </div>

              <div style={{ fontSize: '20px', fontWeight: '800', color: '#5C1929', marginBottom: '12px' }}>
                {tier.price?.toLocaleString()}đ <span style={{ fontSize: '12px', color: 'rgba(62, 16, 27, 0.5)', fontWeight: '500' }}>/ năm</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'rgba(62, 16, 27, 0.8)' }}>
                {tier.benefits?.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={13} color="#2E7D32" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="warm-glass-card" style={{
        padding: '16px 20px',
        borderRadius: '18px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#3E101B', marginRight: '4px' }}>
            Hạng thẻ:
          </span>
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'card_diamond', label: 'Diamond VIP' },
            { id: 'card_gold', label: 'Gold VIP' },
            { id: 'card_silver', label: 'Silver VIP' }
          ].map((t) => {
            const isSel = selectedTierFilter === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTierFilter(t.id)}
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
                {t.label}
              </button>
            );
          })}
        </div>

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
            placeholder="Tìm tên, SĐT, mã thẻ VIP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '12.5px',
              width: '100%',
              padding: 0,
              boxShadow: 'none'
            }}
          />
        </div>
      </div>

      {/* VIP Members Grid / Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '20px'
      }}>
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="warm-glass-card"
            style={{
              borderRadius: '20px',
              padding: '20px',
              border: '1px solid rgba(196, 158, 101, 0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img
                  src={member.avatar}
                  alt={member.fullName}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#3E101B', margin: '0 0 2px' }}>
                    {member.fullName}
                  </h4>
                  <div style={{ fontSize: '12px', color: 'rgba(62, 16, 27, 0.65)' }}>
                    SĐT: <strong>{member.phone}</strong>
                  </div>
                </div>
              </div>

              <div style={{
                padding: '4px 10px',
                borderRadius: '8px',
                backgroundColor: member.tier === 'card_diamond' ? '#5C1929' : member.tier === 'card_gold' ? '#FBF0EC' : '#EDF2F7',
                color: member.tier === 'card_diamond' ? '#FAF6F0' : member.tier === 'card_gold' ? '#5C1929' : '#4A5568',
                fontSize: '11px',
                fontWeight: '800'
              }}>
                {member.cardCode}
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              padding: '10px 14px',
              backgroundColor: '#FBF0EC',
              borderRadius: '12px',
              marginBottom: '12px',
              fontSize: '12px'
            }}>
              <div>
                <span style={{ color: 'rgba(62, 16, 27, 0.6)' }}>Tổng chi tiêu:</span>
                <div style={{ fontWeight: '800', color: '#5C1929' }}>
                  {member.totalSpent?.toLocaleString()}đ
                </div>
              </div>
              <div>
                <span style={{ color: 'rgba(62, 16, 27, 0.6)' }}>Số lần ghé tiệm:</span>
                <div style={{ fontWeight: '800', color: '#3E101B' }}>
                  {member.visitsCount || 1} lần
                </div>
              </div>
            </div>

            {/* Note & Actions */}
            <div style={{
              fontSize: '12px',
              color: 'rgba(62, 16, 27, 0.7)',
              marginBottom: '12px',
              padding: '8px 12px',
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid rgba(196, 158, 101, 0.15)'
            }}>
              {editingNoteId === member.id ? (
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input
                    type="text"
                    value={tempNote}
                    onChange={(e) => setTempNote(e.target.value)}
                    style={{ flex: 1, padding: '4px 8px', fontSize: '12px', borderRadius: '6px' }}
                  />
                  <button
                    onClick={() => {
                      updateVipMember(member.id, { note: tempNote });
                      setEditingNoteId(null);
                    }}
                    style={{ padding: '4px 8px', backgroundColor: '#5C1929', color: '#FAF6F0', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}
                  >
                    Lưu
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{member.note || 'Chưa có ghi chú'}</span>
                  <button
                    onClick={() => {
                      setEditingNoteId(member.id);
                      setTempNote(member.note || '');
                    }}
                    style={{ color: '#5C1929', padding: '2px' }}
                  >
                    <Edit3 size={13} />
                  </button>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  if (window.confirm(`Xóa hội viên ${member.fullName} khỏi danh sách VIP?`)) {
                    deleteVipMember(member.id);
                  }
                }}
                style={{
                  padding: '5px 12px',
                  borderRadius: '8px',
                  backgroundColor: '#FFEBEE',
                  color: '#C62828',
                  fontSize: '11.5px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Trash2 size={12} />
                <span>Xóa thành viên</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add VIP Member Modal */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(24, 8, 14, 0.65)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '480px',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '26px',
            position: 'relative'
          }}>
            <button
              onClick={() => setIsAddModalOpen(false)}
              style={{ position: 'absolute', top: '18px', right: '18px', color: '#5C1929' }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#3E101B', marginBottom: '16px' }}>
              Thêm Hội Viên VIP Mới
            </h3>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '4px' }}>
                  Họ và tên khách hàng:
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Phương Thảo"
                  value={newMember.fullName}
                  onChange={(e) => setNewMember({ ...newMember, fullName: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '4px' }}>
                  Số điện thoại:
                </label>
                <input
                  type="tel"
                  placeholder="Ví dụ: 0912 345 678"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '4px' }}>
                  Hạng thẻ thành viên:
                </label>
                <select
                  value={newMember.tier}
                  onChange={(e) => setNewMember({ ...newMember, tier: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '13px' }}
                >
                  {membershipTiers.map((t) => (
                    <option key={t.id} value={t.id}>{t.name} ({t.discount})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '4px' }}>
                  Ghi chú (Sở thích / Ngày sinh):
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Sinh nhật 15/10, thích tinh dầu sả chanh"
                  value={newMember.note}
                  onChange={(e) => setNewMember({ ...newMember, note: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{ flex: 1, padding: '11px', borderRadius: '10px', border: '1px solid rgba(196, 158, 101, 0.3)', fontWeight: '700', fontSize: '13px' }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn-burgundy-cta"
                  style={{ flex: 2, height: 'auto', padding: '11px', borderRadius: '10px', fontSize: '13px' }}
                >
                  Lưu Hội Viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
