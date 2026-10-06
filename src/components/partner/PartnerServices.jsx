import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Edit2, Trash2, Clock, X, Check } from 'lucide-react';

export const PartnerServices = () => {
  const { services, saveService, deleteService } = useApp();

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

    saveService({
      ...formService,
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

  return (
    <div style={{ padding: '16px 18px 150px' }} className="animate-fade-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#62202F' }}>
            Menu & Bảng Giá Tiệm B
          </h2>
          <p style={{ fontSize: '11px', color: 'rgba(98, 32, 47, 0.7)', marginTop: '2px' }}>
            {services.length} dịch vụ đang niêm yết
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          style={{
            backgroundColor: '#62202F',
            color: '#FBF7E8',
            padding: '7px 14px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 8px rgba(98, 32, 47, 0.2)'
          }}
        >
          <Plus size={14} />
          <span>Thêm dịch vụ</span>
        </button>
      </div>

      {/* Services List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {services.map((svc) => (
          <div
            key={svc.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '14px',
              border: '1px solid rgba(98, 32, 47, 0.12)',
              boxShadow: '0 2px 8px rgba(98, 32, 47, 0.03)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <div>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#62202F' }}>
                  {svc.name}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'rgba(98, 32, 47, 0.65)', marginTop: '2px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Clock size={11} /> {svc.duration} phút
                  </span>
                  <span>•</span>
                  <span>Cọc: <strong>{svc.deposit.toLocaleString()}đ</strong></span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#62202F' }}>
                  {svc.price.toLocaleString()}đ
                </span>
              </div>
            </div>

            <p style={{ fontSize: '11px', color: 'rgba(98, 32, 47, 0.7)', lineHeight: '1.4', marginBottom: '10px' }}>
              {svc.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px dashed rgba(98, 32, 47, 0.12)', paddingTop: '8px' }}>
              <button
                onClick={() => handleOpenEdit(svc)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '999px',
                  backgroundColor: '#F5D0C6',
                  color: '#62202F',
                  fontSize: '11px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Edit2 size={11} />
                <span>Chỉnh sửa</span>
              </button>

              <button
                onClick={() => handleDelete(svc.id)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '999px',
                  backgroundColor: '#FFEBEE',
                  color: '#C62828',
                  fontSize: '11px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Trash2 size={11} />
                <span>Xóa</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add / Edit Service */}
      {isEditing && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(35, 17, 21, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 980,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div
            className="animate-fade-up"
            style={{
              width: '100%',
              maxWidth: '360px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '20px',
              border: '1.5px solid #F5D0C6',
              boxShadow: '0 12px 36px rgba(0,0,0,0.3)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setIsEditing(false)}
              style={{ position: 'absolute', top: '14px', right: '14px', color: '#62202F' }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#62202F', marginBottom: '14px' }}>
              {formService.id ? 'Chỉnh Sửa Dịch Vụ' : 'Thêm Dịch Vụ Mới Cho Tiệm B'}
            </h3>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#62202F', display: 'block', marginBottom: '3px' }}>
                  Tên dịch vụ làm đẹp:
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Gội đầu dưỡng sinh thảo dược"
                  value={formService.name}
                  onChange={(e) => setFormService({ ...formService, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', fontSize: '12px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#62202F', display: 'block', marginBottom: '3px' }}>
                    Giá niêm yết (VNĐ):
                  </label>
                  <input
                    type="number"
                    value={formService.price}
                    onChange={(e) => setFormService({ ...formService, price: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', fontSize: '12px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#62202F', display: 'block', marginBottom: '3px' }}>
                    Thời lượng (phút):
                  </label>
                  <input
                    type="number"
                    value={formService.duration}
                    onChange={(e) => setFormService({ ...formService, duration: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', fontSize: '12px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#62202F', display: 'block', marginBottom: '3px' }}>
                  Tiền đặt cọc giữ slot (VNĐ):
                </label>
                <input
                  type="number"
                  value={formService.deposit}
                  onChange={(e) => setFormService({ ...formService, deposit: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', fontSize: '12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#62202F', display: 'block', marginBottom: '3px' }}>
                  Mô tả quy trình:
                </label>
                <textarea
                  rows={2}
                  value={formService.description}
                  onChange={(e) => setFormService({ ...formService, description: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', resize: 'none' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '6px',
                  backgroundColor: '#62202F',
                  color: '#FBF7E8',
                  padding: '11px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Check size={14} />
                <span>Lưu Dịch Vụ Vào Menu Tiệm B</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
