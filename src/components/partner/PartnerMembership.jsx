import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Crown,
  Search,
  Plus,
  Phone,
  Sparkles,
  Users,
  ChevronDown,
  Edit3,
  Check,
  X,
  Gift,
  Settings,
  ArrowUpRight
} from 'lucide-react';

export const PartnerMembership = () => {
  const {
    vipMembers = [],
    membershipTiers = [],
    updateVipMember,
    addVipMember,
    updateMembershipTier
  } = useApp();

  const [activeMainTab, setActiveMainTab] = useState('crm'); // 'crm' | 'tiers'
  const [selectedTierFilter, setSelectedTierFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMemberId, setExpandedMemberId] = useState(null);

  // Edit Note State
  const [editingNoteMemberId, setEditingNoteMemberId] = useState(null);
  const [tempNote, setTempNote] = useState('');

  // Add Member Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMemberData, setNewMemberData] = useState({
    fullName: '',
    phone: '',
    tier: 'card_gold',
    note: '',
    favoriteStaff: 'Chuyên viên ngẫu nhiên'
  });

  const tiersList = Array.isArray(membershipTiers) ? membershipTiers : [];
  const membersList = Array.isArray(vipMembers) ? vipMembers : [];

  // Filtered members
  const filteredMembers = membersList.filter((m) => {
    const matchesTier = selectedTierFilter === 'all' || m.tier === selectedTierFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      m.fullName.toLowerCase().includes(q) ||
      m.phone.includes(q) ||
      m.cardCode.toLowerCase().includes(q) ||
      (m.note && m.note.toLowerCase().includes(q));
    return matchesTier && matchesSearch;
  });

  // Metrics
  const totalVipCount = membersList.length;
  const diamondCount = membersList.filter((m) => m.tier === 'card_diamond').length;
  const goldCount = membersList.filter((m) => m.tier === 'card_gold').length;
  const silverCount = membersList.filter((m) => m.tier === 'card_silver').length;
  const totalVipRevenue = membersList.reduce((sum, m) => sum + (m.totalSpent || 0), 0);

  const toggleExpand = (id) => {
    setExpandedMemberId((prev) => (prev === id ? null : id));
    setEditingNoteMemberId(null);
  };

  const handleStartEditNote = (e, member) => {
    e.stopPropagation();
    setEditingNoteMemberId(member.id);
    setTempNote(member.note || '');
  };

  const handleSaveNote = (e, memberId) => {
    e.stopPropagation();
    updateVipMember(memberId, { note: tempNote });
    setEditingNoteMemberId(null);
  };

  const handleCreateNewMember = (e) => {
    e.preventDefault();
    if (!newMemberData.fullName.trim() || !newMemberData.phone.trim()) {
      alert('Vui lòng nhập họ tên và số điện thoại!');
      return;
    }

    const tierObj = tiersList.find((t) => t.id === newMemberData.tier) || tiersList[1];
    const prefix = newMemberData.tier === 'card_diamond' ? 'DIA' : newMemberData.tier === 'card_gold' ? 'GLD' : 'SLV';
    const cardCode = `TB-${prefix}-${Math.floor(100 + Math.random() * 900)}`;

    const newMember = {
      id: `vip_${Date.now()}`,
      cardCode,
      tier: newMemberData.tier,
      tierName: tierObj?.name || 'Thẻ Vàng',
      fullName: newMemberData.fullName.trim(),
      phone: newMemberData.phone.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      joinDate: new Date().toLocaleDateString('vi-VN'),
      expiryDate: newMemberData.tier === 'card_diamond' ? 'Trọn đời' : '12 tháng',
      totalSpent: tierObj?.price || 1500000,
      visitsCount: 1,
      favoriteStaff: newMemberData.favoriteStaff,
      note: newMemberData.note.trim() || 'Đăng ký trực tiếp tại quầy',
      status: 'ACTIVE',
      benefitsUsed: 'Mới đăng ký tại quầy'
    };

    addVipMember(newMember);
    setIsAddModalOpen(false);
    setNewMemberData({
      fullName: '',
      phone: '',
      tier: 'card_gold',
      note: '',
      favoriteStaff: 'Chuyên viên ngẫu nhiên'
    });
    alert(`Đã thêm hội viên ${newMember.fullName} thành công!`);
  };

  const handleUpgradeTier = (e, member) => {
    e.stopPropagation();
    const nextTier =
      member.tier === 'card_silver'
        ? 'card_gold'
        : member.tier === 'card_gold'
          ? 'card_diamond'
          : null;

    if (!nextTier) {
      alert(`Khách hàng ${member.fullName} đã ở hạng cao nhất: Thẻ Kim Cương (Diamond VIP)!`);
      return;
    }

    const tierObj = tiersList.find((t) => t.id === nextTier);
    if (window.confirm(`Xác nhận nâng hạng cho ${member.fullName} lên ${tierObj?.name}?`)) {
      updateVipMember(member.id, {
        tier: nextTier,
        tierName: tierObj?.name,
        cardCode: member.cardCode.replace(/TB-[A-Z]+/, `TB-${nextTier === 'card_diamond' ? 'DIA' : 'GLD'}`)
      });
      alert(`Đã nâng hạng thành công cho ${member.fullName}!`);
    }
  };

  return (
    <div style={{ padding: '20px 20px 130px' }} className="animate-fade-up">
      {/* 1. Header Thoáng Đãng Chuẩn Luxury */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#691F31', margin: 0, letterSpacing: '-0.3px' }}>
            Hội Viên VIP Tiệm B
          </h2>
          <p style={{ fontSize: '12px', color: 'rgba(105, 31, 49, 0.65)', marginTop: '3px' }}>
            Chăm sóc cá nhân hóa theo từng hạng thẻ
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setActiveMainTab(activeMainTab === 'crm' ? 'tiers' : 'crm')}
            style={{
              padding: '8px 12px',
              borderRadius: '999px',
              backgroundColor: activeMainTab === 'tiers' ? '#691F31' : '#F6E1DB',
              color: activeMainTab === 'tiers' ? '#FFF8F4' : '#691F31',
              fontSize: '11px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Settings size={13} />
            <span>{activeMainTab === 'crm' ? 'Gói thẻ' : 'DS Khách'}</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: '#691F31',
              color: '#FFF8F4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(105, 31, 49, 0.25)'
            }}
            title="Thêm khách VIP mới"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* 2. Thanh Tóm Tắt Tinh Tế (Zen Summary Strip) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: '18px',
        padding: '12px 18px',
        marginBottom: '18px',
        border: '1px solid rgba(201, 168, 117, 0.25)',
        boxShadow: '0 4px 16px rgba(105, 31, 49, 0.03)'
      }}>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '10px', color: 'rgba(105, 31, 49, 0.6)', fontWeight: '600' }}>HỘI VIÊN</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#691F31', marginTop: '1px' }}>{totalVipCount}</div>
        </div>

        <div style={{ width: '1px', height: '26px', backgroundColor: 'rgba(201, 168, 117, 0.2)' }} />

        <div style={{ textAlign: 'center', flex: 1.2 }}>
          <div style={{ fontSize: '10px', color: 'rgba(105, 31, 49, 0.6)', fontWeight: '600' }}>DOANH THU</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#691F31', marginTop: '1px' }}>
            {(totalVipRevenue / 1000000).toFixed(1)}tr
          </div>
        </div>

        <div style={{ width: '1px', height: '26px', backgroundColor: 'rgba(201, 168, 117, 0.2)' }} />

        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '10px', color: 'rgba(105, 31, 49, 0.6)', fontWeight: '600' }}>GIỮ CHÂN</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#2E7D32', marginTop: '1px' }}>96.5%</div>
        </div>
      </div>

      {activeMainTab === 'crm' ? (
        <>
          {/* 3. Tìm Kiếm & Lọc Gói Rộng Rãi */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#FFFFFF',
              borderRadius: '999px',
              padding: '9px 16px',
              border: '1px solid rgba(201, 168, 117, 0.25)',
              boxShadow: '0 2px 8px rgba(105, 31, 49, 0.03)'
            }}>
              <Search size={15} color="rgba(105, 31, 49, 0.5)" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên khách, SĐT, sở thích..."
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '12.5px',
                  width: '100%',
                  outline: 'none'
                }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}>
                  <X size={14} color="#691F31" />
                </button>
              )}
            </div>

            {/* Pill Filters */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
              {[
                { id: 'all', label: `Tất cả (${totalVipCount})` },
                { id: 'card_diamond', label: `Kim Cương (${diamondCount})` },
                { id: 'card_gold', label: `Vàng VIP (${goldCount})` },
                { id: 'card_silver', label: `Bạc (${silverCount})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTierFilter(tab.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: selectedTierFilter === tab.id ? '800' : '600',
                    backgroundColor: selectedTierFilter === tab.id ? '#691F31' : '#FFFFFF',
                    color: selectedTierFilter === tab.id ? '#FFF8F4' : 'rgba(105, 31, 49, 0.75)',
                    border: '1px solid rgba(201, 168, 117, 0.22)',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.18s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Danh Sách Khách VIP Dạng Thu Gọn Thanh Lịch */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredMembers.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '36px 16px',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                color: 'rgba(105, 31, 49, 0.6)',
                fontSize: '12.5px',
                border: '1px solid rgba(201, 168, 117, 0.2)'
              }}>
                Không có khách VIP nào khớp với tìm kiếm.
              </div>
            ) : (
              filteredMembers.map((member) => {
                const isExpanded = expandedMemberId === member.id;
                const isDiamond = member.tier === 'card_diamond';
                const isGold = member.tier === 'card_gold';
                const isEditingNote = editingNoteMemberId === member.id;

                const badgeBg = isDiamond ? '#1C0B11' : isGold ? '#691F31' : '#686868';
                const badgeColor = isDiamond ? '#D9BD8C' : '#FFF8F4';
                const tierNameShort = isDiamond ? 'Kim Cương' : isGold ? 'Vàng VIP' : 'Bạc';

                return (
                  <div
                    key={member.id}
                    onClick={() => toggleExpand(member.id)}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '20px',
                      padding: '14px 16px',
                      border: isExpanded
                        ? '1.5px solid #691F31'
                        : '1px solid rgba(201, 168, 117, 0.24)',
                      boxShadow: isExpanded
                        ? '0 8px 24px rgba(105, 31, 49, 0.08)'
                        : '0 2px 8px rgba(105, 31, 49, 0.02)',
                      cursor: 'pointer',
                      transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    {/* Collapsed Clean Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={member.avatar}
                          alt={member.fullName}
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '14px',
                            objectFit: 'cover',
                            border: `2px solid ${isDiamond ? '#D9BD8C' : '#F1D0C9'}`,
                            flexShrink: 0
                          }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '14.5px', fontWeight: '800', color: '#691F31' }}>
                              {member.fullName}
                            </span>
                            <span style={{
                              fontSize: '9px',
                              fontWeight: '800',
                              padding: '2px 7px',
                              borderRadius: '999px',
                              backgroundColor: badgeBg,
                              color: badgeColor
                            }}>
                              {tierNameShort}
                            </span>
                          </div>
                          <div style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.65)', marginTop: '2px' }}>
                            {member.phone} • {member.cardCode}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#691F31' }}>
                            {(member.totalSpent / 1000).toLocaleString()}k
                          </div>
                          <div style={{ fontSize: '10px', color: 'rgba(105, 31, 49, 0.55)' }}>
                            {member.visitsCount} lượt
                          </div>
                        </div>

                        <div style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s',
                          color: '#691F31'
                        }}>
                          <ChevronDown size={18} />
                        </div>
                      </div>
                    </div>

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="animate-fade-up"
                        style={{
                          marginTop: '14px',
                          paddingTop: '12px',
                          borderTop: '1px solid rgba(201, 168, 117, 0.2)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                          cursor: 'default'
                        }}
                      >
                        {/* 2 Pills: Thợ ruột & Hạn thẻ */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <div style={{
                            flex: 1,
                            backgroundColor: '#F8F2EC',
                            borderRadius: '12px',
                            padding: '8px 12px',
                            fontSize: '11px',
                            color: '#691F31'
                          }}>
                            <span style={{ opacity: 0.65, display: 'block', fontSize: '9.5px' }}>THỢ YÊU THÍCH</span>
                            <strong>{member.favoriteStaff}</strong>
                          </div>

                          <div style={{
                            flex: 1,
                            backgroundColor: '#F8F2EC',
                            borderRadius: '12px',
                            padding: '8px 12px',
                            fontSize: '11px',
                            color: '#691F31'
                          }}>
                            <span style={{ opacity: 0.65, display: 'block', fontSize: '9.5px' }}>HẠN DÙNG THẺ</span>
                            <strong style={{ color: '#2E7D32' }}>{member.expiryDate}</strong>
                          </div>
                        </div>

                        {/* Note Box */}
                        <div style={{
                          backgroundColor: '#FFF8F4',
                          borderRadius: '12px',
                          padding: '10px 12px',
                          border: '1px solid rgba(201, 168, 117, 0.25)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#691F31' }}>
                              Sở thích & Ghi chú chăm sóc riêng:
                            </span>
                            {!isEditingNote && (
                              <button
                                onClick={(e) => handleStartEditNote(e, member)}
                                style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', color: '#691F31', fontWeight: '700' }}
                              >
                                <Edit3 size={11} />
                                <span>Sửa</span>
                              </button>
                            )}
                          </div>

                          {isEditingNote ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <textarea
                                rows={2}
                                value={tempNote}
                                onChange={(e) => setTempNote(e.target.value)}
                                style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', fontSize: '11.5px' }}
                              />
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                <button
                                  onClick={() => setEditingNoteMemberId(null)}
                                  style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '10.5px', backgroundColor: '#F8F2EC' }}
                                >
                                  Hủy
                                </button>
                                <button
                                  onClick={(e) => handleSaveNote(e, member.id)}
                                  style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '10.5px', backgroundColor: '#691F31', color: '#FFF8F4', fontWeight: '700' }}
                                >
                                  Lưu
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p style={{ fontSize: '11.5px', color: 'rgba(105, 31, 49, 0.85)', margin: 0, lineHeight: '1.45' }}>
                              {member.note || 'Chưa có ghi chú riêng.'}
                            </p>
                          )}
                        </div>

                        {/* Quick Actions */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <a
                            href={`tel:${member.phone.replace(/\s+/g, '')}`}
                            style={{
                              flex: 1,
                              padding: '8px',
                              borderRadius: '10px',
                              backgroundColor: '#691F31',
                              color: '#FFF8F4',
                              fontSize: '11px',
                              fontWeight: '700',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              textDecoration: 'none'
                            }}
                          >
                            <Phone size={13} />
                            <span>Gọi điện</span>
                          </a>

                          <button
                            onClick={(e) => handleUpgradeTier(e, member)}
                            style={{
                              flex: 1,
                              padding: '8px',
                              borderRadius: '10px',
                              backgroundColor: '#F6E1DB',
                              color: '#691F31',
                              fontSize: '11px',
                              fontWeight: '700',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px'
                            }}
                          >
                            <Crown size={13} />
                            <span>Nâng hạng</span>
                          </button>

                          <button
                            onClick={() => alert(`Đã gửi voucher quà tặng tri ân giảm 100.000đ cho khách VIP ${member.fullName}!`)}
                            style={{
                              width: '36px',
                              borderRadius: '10px',
                              backgroundColor: '#F8F2EC',
                              color: '#691F31',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            title="Tặng voucher tri ân"
                          >
                            <Gift size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </>
      ) : (
        /* Cấu Hình 3 Gói Thẻ */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {tiersList.map((tier) => (
            <div
              key={tier.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '22px',
                padding: '18px',
                border: tier.highlight ? '2px solid #691F31' : '1px solid rgba(201, 168, 117, 0.25)',
                boxShadow: '0 4px 16px rgba(105, 31, 49, 0.04)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(105, 31, 49, 0.6)' }}>
                    {tier.badge}
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#691F31', margin: '2px 0 0' }}>
                    {tier.name}
                  </h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#691F31' }}>
                    {tier.price.toLocaleString()}đ
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'rgba(105, 31, 49, 0.55)' }}>
                    {tier.validity}
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#FFF8F4',
                borderRadius: '12px',
                padding: '10px 14px',
                margin: '10px 0',
                border: '1px solid rgba(201, 168, 117, 0.2)'
              }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#691F31', marginBottom: '6px' }}>
                  Giảm {tier.discount} toàn menu
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {tier.benefits.map((b, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'rgba(105, 31, 49, 0.8)' }}>
                      <Check size={12} color="#691F31" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  const newPrice = prompt(`Nhập giá bán mới cho ${tier.name} (VNĐ):`, tier.price);
                  if (newPrice && !isNaN(Number(newPrice))) {
                    updateMembershipTier(tier.id, { price: Number(newPrice) });
                    alert(`Đã cập nhật giá gói ${tier.name}!`);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: '700',
                  backgroundColor: tier.highlight ? '#691F31' : '#F6E1DB',
                  color: tier.highlight ? '#FFF8F4' : '#691F31'
                }}
              >
                Chỉnh sửa giá gói & Quyền lợi
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 5. Modal Thêm Khách Mới Tại Quầy */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(28, 11, 17, 0.65)',
          backdropFilter: 'blur(6px)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '420px',
            padding: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#691F31', margin: 0 }}>
                Thêm Khách VIP Tại Quầy
              </h3>
              <button onClick={() => setIsAddModalOpen(false)}>
                <X size={18} color="#691F31" />
              </button>
            </div>

            <form onSubmit={handleCreateNewMember} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#691F31', display: 'block', marginBottom: '3px' }}>Họ và tên:</span>
                <input
                  type="text"
                  required
                  value={newMemberData.fullName}
                  onChange={(e) => setNewMemberData({ ...newMemberData, fullName: e.target.value })}
                  placeholder="VD: Chị Minh Hằng"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '12px' }}
                />
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#691F31', display: 'block', marginBottom: '3px' }}>Số điện thoại:</span>
                <input
                  type="tel"
                  required
                  value={newMemberData.phone}
                  onChange={(e) => setNewMemberData({ ...newMemberData, phone: e.target.value })}
                  placeholder="09..."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '12px' }}
                />
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#691F31', display: 'block', marginBottom: '3px' }}>Gói thẻ VIP:</span>
                <select
                  value={newMemberData.tier}
                  onChange={(e) => setNewMemberData({ ...newMemberData, tier: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '12px' }}
                >
                  {tiersList.map((t) => (
                    <option key={t.id} value={t.id}>{t.name} (Giảm {t.discount})</option>
                  ))}
                </select>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#691F31', display: 'block', marginBottom: '3px' }}>Ghi chú riêng:</span>
                <textarea
                  rows={2}
                  value={newMemberData.note}
                  onChange={(e) => setNewMemberData({ ...newMemberData, note: e.target.value })}
                  placeholder="VD: Thích uốn tóc sóng lơi, phòng yên tĩnh..."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '12px' }}
                />
              </div>

              <button type="submit" className="btn-burgundy-cta" style={{ width: '100%', height: '44px', marginTop: '4px' }}>
                Kích Hoạt Thẻ Cho Khách
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
