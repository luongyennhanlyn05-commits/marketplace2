import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Plus,
  Edit2,
  Trash2,
  Clock,
  X,
  Check,
  Search,
  Sparkles,
  Tag,
  DollarSign,
  Layers
} from 'lucide-react';
import { SHOP_B_CATEGORIES } from '../../data/mockData';

export const DesktopOwnerServices = () => {
  const { services, saveService, deleteService } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [formService, setFormService] = useState({
    id: null,
    name: '',
    category: 'spa',
    categoryLabel: 'Spa & Massage',
    description: '',
    duration: 60,
    price: 350000,
    deposit: 70000,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80'
  });

  const filteredServices = services.filter((svc) => {
    const matchCat = selectedCat === 'all' || svc.category === selectedCat;
    const matchSearch =
      svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (svc.description && svc.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleOpenAdd = () => {
    setFormService({
      id: null,
      name: '',
      category: 'spa',
      categoryLabel: 'Spa & Massage',
      description: '',
      duration: 60,
      price: 350000,
      deposit: 70000,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80'
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (svc) => {
    setFormService({ ...svc });
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formService.name.trim()) {
      alert('Vui lòng nhập tên dịch vụ!');
      return;
    }

    const catObj = SHOP_B_CATEGORIES.find((c) => c.id === formService.category);

    saveService({
      ...formService,
      categoryLabel: catObj ? catObj.name : formService.categoryLabel,
      price: Number(formService.price),
      duration: Number(formService.duration),
      deposit: Number(formService.deposit)
    });

    setIsEditing(false);
  };

  const handleDelete = (svcId) => {
    if (window.confirm('Bạn có chắc muốn xóa dịch vụ này khỏi menu của Tiệm B?')) {
      deleteService(svcId);
    }
  };

  const avgPrice = services.length > 0
    ? Math.round(services.reduce((acc, s) => acc + s.price, 0) / services.length)
    : 0;

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '24px 32px 60px' }}>
      {/* Top Header & Actions */}
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
              borderRadius: '999px',
              letterSpacing: '0.5px'
            }}>
              QUẢN TRỊ MENU TIỆM B
            </span>
            <span style={{ fontSize: '13px', color: 'rgba(62, 16, 27, 0.65)' }}>
              • {services.length} Dịch vụ đang hiển thị cho khách
            </span>
          </div>
          <h1 style={{
            fontSize: '26px',
            fontWeight: '800',
            color: '#3E101B',
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            Menu & Bảng Giá Dịch Vụ
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-burgundy-cta"
          style={{
            height: '42px',
            padding: '0 20px',
            borderRadius: '12px',
            gap: '8px',
            fontSize: '13px'
          }}
        >
          <Plus size={16} />
          <span>Thêm dịch vụ mới</span>
        </button>
      </div>

      {/* Stats Summary Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div className="warm-glass-card" style={{ padding: '16px 20px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FBF0EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5C1929' }}>
              <Layers size={16} />
            </div>
            <span style={{ fontSize: '12.5px', color: 'rgba(62, 16, 27, 0.65)', fontWeight: '600' }}>Tổng số dịch vụ</span>
          </div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#3E101B' }}>
            {services.length} <span style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(62, 16, 27, 0.5)' }}>liệu trình</span>
          </div>
        </div>

        <div className="warm-glass-card" style={{ padding: '16px 20px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FBF0EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5C1929' }}>
              <DollarSign size={16} />
            </div>
            <span style={{ fontSize: '12.5px', color: 'rgba(62, 16, 27, 0.65)', fontWeight: '600' }}>Giá trung bình</span>
          </div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#5C1929' }}>
            {avgPrice.toLocaleString()}đ
          </div>
        </div>

        <div className="warm-glass-card" style={{ padding: '16px 20px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FBF0EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5C1929' }}>
              <Sparkles size={16} />
            </div>
            <span style={{ fontSize: '12.5px', color: 'rgba(62, 16, 27, 0.65)', fontWeight: '600' }}>Tỷ lệ cọc niêm yết</span>
          </div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#3E101B' }}>
            20% <span style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(62, 16, 27, 0.5)' }}>giữ lịch hẹn</span>
          </div>
        </div>

        <div className="warm-glass-card" style={{ padding: '16px 20px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FBF0EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5C1929' }}>
              <Tag size={16} />
            </div>
            <span style={{ fontSize: '12.5px', color: 'rgba(62, 16, 27, 0.65)', fontWeight: '600' }}>Dịch vụ nổi bật</span>
          </div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#3E101B' }}>
            {services.filter((s) => s.isPopular).length || 2} <span style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(62, 16, 27, 0.5)' }}>ưu tiên</span>
          </div>
        </div>
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
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#3E101B', marginRight: '4px' }}>
            Danh mục:
          </span>
          {SHOP_B_CATEGORIES.map((c) => {
            const isSel = selectedCat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: isSel ? '700' : '500',
                  backgroundColor: isSel ? '#5C1929' : 'rgba(255, 255, 255, 0.8)',
                  color: isSel ? '#FAF6F0' : '#3E101B',
                  border: isSel ? '1px solid #5C1929' : '1px solid rgba(196, 158, 101, 0.25)',
                  boxShadow: isSel ? '0 2px 8px rgba(92, 25, 41, 0.2)' : 'none',
                  transition: 'all 0.15s ease'
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
            placeholder="Tìm theo tên dịch vụ..."
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
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ fontSize: '11px', color: '#5C1929', fontWeight: '700' }}>
              Xóa
            </button>
          )}
        </div>
      </div>

      {/* Services Multi-Column Responsive Grid */}
      {filteredServices.length === 0 ? (
        <div className="warm-glass-card" style={{
          padding: '60px 20px',
          borderRadius: '20px',
          textAlign: 'center',
          color: 'rgba(62, 16, 27, 0.6)'
        }}>
          <Sparkles size={36} color="#C49E65" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#3E101B', marginBottom: '6px' }}>
            Không tìm thấy dịch vụ phù hợp
          </h3>
          <p style={{ fontSize: '13px' }}>
            Vui lòng thử từ khóa khác hoặc chọn lại danh mục!
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '20px'
        }}>
          {filteredServices.map((svc) => (
            <div
              key={svc.id}
              className="warm-glass-card card-hover-ombre"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(240, 174, 164, 0.35)',
                boxShadow: '0 4px 18px rgba(92, 25, 41, 0.04)'
              }}
            >
              {/* Card Thumbnail Image */}
              <div style={{
                position: 'relative',
                height: '160px',
                width: '100%',
                overflow: 'hidden',
                backgroundColor: '#2A141C'
              }}>
                <img
                  src={svc.image || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80'}
                  alt={svc.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(30, 10, 16, 0.75) 0%, transparent 60%)'
                }} />

                {/* Badges on Image */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  display: 'flex',
                  gap: '6px'
                }}>
                  <span style={{
                    backgroundColor: 'rgba(92, 25, 41, 0.9)',
                    backdropFilter: 'blur(6px)',
                    color: '#FAF6F0',
                    fontSize: '10.5px',
                    fontWeight: '700',
                    padding: '3px 9px',
                    borderRadius: '8px'
                  }}>
                    {svc.categoryLabel || svc.category}
                  </span>
                  {svc.isPopular && (
                    <span style={{
                      backgroundColor: '#C49E65',
                      color: '#1E0C12',
                      fontSize: '10.5px',
                      fontWeight: '800',
                      padding: '3px 9px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}>
                      <Sparkles size={11} /> Nổi bật
                    </span>
                  )}
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '12px',
                  color: '#FAF6F0',
                  fontSize: '18px',
                  fontWeight: '800',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                  {svc.price.toLocaleString()}đ
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: '800',
                  color: '#3E101B',
                  marginBottom: '8px',
                  lineHeight: '1.3'
                }}>
                  {svc.name}
                </h3>

                <p style={{
                  fontSize: '12px',
                  color: 'rgba(62, 16, 27, 0.7)',
                  lineHeight: '1.5',
                  marginBottom: '14px',
                  flex: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {svc.description}
                </p>

                {/* Duration & Deposit Info */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  backgroundColor: '#FBF0EC',
                  borderRadius: '12px',
                  marginBottom: '14px',
                  fontSize: '11.5px'
                }}>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#5C1929',
                    fontWeight: '700'
                  }}>
                    <Clock size={13} /> {svc.duration} phút
                  </span>
                  <span style={{ color: 'rgba(62, 16, 27, 0.7)' }}>
                    Cọc giữ chỗ: <strong style={{ color: '#5C1929' }}>{svc.deposit.toLocaleString()}đ</strong>
                  </span>
                </div>

                {/* Actions Footer */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '8px',
                  borderTop: '1px solid rgba(196, 158, 101, 0.15)',
                  paddingTop: '12px'
                }}>
                  <button
                    onClick={() => handleOpenEdit(svc)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '10px',
                      backgroundColor: '#F5DDD7',
                      color: '#5C1929',
                      fontSize: '12px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Edit2 size={13} />
                    <span>Chỉnh sửa</span>
                  </button>

                  <button
                    onClick={() => handleDelete(svc.id)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '10px',
                      backgroundColor: '#FFEBEE',
                      color: '#C62828',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Trash2 size={13} />
                    <span>Xóa</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isEditing && (
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
          <div
            className="animate-fade-up"
            style={{
              width: '100%',
              maxWidth: '560px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '28px',
              border: '1.5px solid rgba(196, 158, 101, 0.3)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <button
              onClick={() => setIsEditing(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: '#5C1929',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#FBF0EC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#C49E65', letterSpacing: '0.5px' }}>
                TIỆM B • QUẢN LÝ MENU
              </span>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#3E101B', margin: '4px 0 0' }}>
                {formService.id ? 'Chỉnh Sửa Dịch Vụ' : 'Thêm Dịch Vụ Mới'}
              </h2>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '5px' }}>
                  Tên dịch vụ làm đẹp:
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Trị liệu cổ vai gáy chuyên sâu đá nóng"
                  value={formService.name}
                  onChange={(e) => setFormService({ ...formService, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '5px' }}>
                    Danh mục:
                  </label>
                  <select
                    value={formService.category}
                    onChange={(e) => setFormService({ ...formService, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', fontSize: '13px' }}
                  >
                    {SHOP_B_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '5px' }}>
                    Thời lượng (phút):
                  </label>
                  <input
                    type="number"
                    value={formService.duration}
                    onChange={(e) => setFormService({ ...formService, duration: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '5px' }}>
                    Giá niêm yết (VNĐ):
                  </label>
                  <input
                    type="number"
                    value={formService.price}
                    onChange={(e) => {
                      const newPrice = Number(e.target.value);
                      setFormService({
                        ...formService,
                        price: newPrice,
                        deposit: Math.round(newPrice * 0.2)
                      });
                    }}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '5px' }}>
                    Tiền cọc giữ chỗ (VNĐ):
                  </label>
                  <input
                    type="number"
                    value={formService.deposit}
                    onChange={(e) => setFormService({ ...formService, deposit: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '5px' }}>
                  Link ảnh minh họa:
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={formService.image}
                    onChange={(e) => setFormService({ ...formService, image: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#3E101B', display: 'block', marginBottom: '5px' }}>
                  Mô tả quy trình chi tiết:
                </label>
                <textarea
                  rows={3}
                  value={formService.description}
                  onChange={(e) => setFormService({ ...formService, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid rgba(196, 158, 101, 0.3)',
                    color: '#3E101B',
                    fontWeight: '700',
                    fontSize: '13px'
                  }}
                >
                  Hủy bỏ
                </button>

                <button
                  type="submit"
                  className="btn-burgundy-cta"
                  style={{
                    flex: 2,
                    height: 'auto',
                    padding: '12px',
                    borderRadius: '12px',
                    gap: '6px',
                    fontSize: '13px'
                  }}
                >
                  <Check size={16} />
                  <span>{formService.id ? 'Cập Nhật Dịch Vụ' : 'Lưu Dịch Vụ Vào Menu'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
