import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Star,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Send,
  EyeOff,
  MapPin,
  ExternalLink,
  Check
} from 'lucide-react';

export const PartnerReviews = () => {
  const { reviews, replyReview, moderateReview, shopInfo } = useApp();

  const [activeFilter, setActiveFilter] = useState('APPROVED'); // 'APPROVED' | 'FLAGGED' | 'HIDDEN' | 'ALL'
  const [replyingReviewId, setReplyingReviewId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [moderatingReviewId, setModeratingReviewId] = useState(null);
  const [selectedViolationReason, setSelectedViolationReason] = useState('Ngôn từ xúc phạm / thiếu chuẩn mực');

  const VIOLATION_REASONS = [
    'Ngôn từ xúc phạm, thô tục, công kích danh dự kỹ thuật viên',
    'Spam quảng cáo thương hiệu đối thủ hoặc đường link lạ',
    'Thông tin sai lệch hoàn toàn, không có lịch hẹn thực tế',
    'Tiết lộ thông tin cá nhân / số điện thoại trái phép'
  ];

  // Counts
  const approvedReviews = reviews.filter((r) => r.status === 'APPROVED');
  const flaggedReviews = reviews.filter((r) => r.status === 'FLAGGED');
  const hiddenReviews = reviews.filter((r) => r.status === 'HIDDEN');

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'ALL') return true;
    return r.status === activeFilter;
  });

  const handleOpenReply = (review) => {
    setReplyingReviewId(review.id);
    setReplyText(review.shopReply?.text || '');
  };

  const handleSendReply = (reviewId) => {
    if (!replyText.trim()) {
      alert('Vui lòng nhập nội dung phản hồi của bạn!');
      return;
    }
    replyReview(reviewId, replyText.trim());
    setReplyingReviewId(null);
    setReplyText('');
    alert('Đã gửi phản hồi thành công! Khách hàng sẽ thấy phản hồi chính thức của Tiệm B trên hồ sơ.');
  };

  const handleApplyViolation = (reviewId) => {
    moderateReview(reviewId, 'HIDDEN', selectedViolationReason);
    setModeratingReviewId(null);
    alert('Đã ẩn đánh giá khỏi hồ sơ công khai do vi phạm quy định cộng đồng Marketplace!');
  };

  const handleApprove = (reviewId) => {
    moderateReview(reviewId, 'APPROVED', null);
    alert('Đã phê duyệt hiển thị đánh giá hợp lệ lên hồ sơ Tiệm B!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Overview Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {/* Approved card */}
        <div
          onClick={() => setActiveFilter('APPROVED')}
          className="warm-glass-card"
          style={{
            padding: '12px 10px',
            borderRadius: '18px',
            textAlign: 'center',
            cursor: 'pointer',
            border: activeFilter === 'APPROVED' ? '2px solid #2E7D32' : '1px solid rgba(201, 168, 117, 0.25)',
            background: activeFilter === 'APPROVED' ? 'rgba(232, 245, 233, 0.7)' : '#FFFFFF'
          }}
        >
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#2E7D32', textTransform: 'uppercase' }}>
            Hợp Lệ (Hiển thị)
          </div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#2E7D32', marginTop: '2px' }}>
            {approvedReviews.length}
          </div>
          <div style={{ fontSize: '9.5px', color: '#666', marginTop: '2px' }}>
            ⭐ {shopInfo.rating} / 5.0
          </div>
        </div>

        {/* Flagged card */}
        <div
          onClick={() => setActiveFilter('FLAGGED')}
          className="warm-glass-card"
          style={{
            padding: '12px 10px',
            borderRadius: '18px',
            textAlign: 'center',
            cursor: 'pointer',
            border: activeFilter === 'FLAGGED' ? '2px solid #D97706' : '1px solid rgba(201, 168, 117, 0.25)',
            background: activeFilter === 'FLAGGED' ? 'rgba(254, 243, 199, 0.7)' : '#FFFFFF'
          }}
        >
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#D97706', textTransform: 'uppercase' }}>
            Bị Báo Cáo
          </div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#D97706', marginTop: '2px' }}>
            {flaggedReviews.length}
          </div>
          <div style={{ fontSize: '9.5px', color: '#666', marginTop: '2px' }}>
            Cần kiểm duyệt
          </div>
        </div>

        {/* Hidden card */}
        <div
          onClick={() => setActiveFilter('HIDDEN')}
          className="warm-glass-card"
          style={{
            padding: '12px 10px',
            borderRadius: '18px',
            textAlign: 'center',
            cursor: 'pointer',
            border: activeFilter === 'HIDDEN' ? '2px solid #C62828' : '1px solid rgba(201, 168, 117, 0.25)',
            background: activeFilter === 'HIDDEN' ? 'rgba(255, 235, 238, 0.7)' : '#FFFFFF'
          }}
        >
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#C62828', textTransform: 'uppercase' }}>
            Đã Ẩn Vi Phạm
          </div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#C62828', marginTop: '2px' }}>
            {hiddenReviews.length}
          </div>
          <div style={{ fontSize: '9.5px', color: '#666', marginTop: '2px' }}>
            Đã xử lý
          </div>
        </div>
      </div>

      {/* Policy Guidance Alert */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        padding: '10px 12px',
        borderRadius: '14px',
        backgroundColor: 'rgba(241, 208, 201, 0.45)',
        border: '1px solid rgba(201, 168, 117, 0.3)',
        fontSize: '11px',
        color: '#691F31',
        lineHeight: 1.4
      }}>
        <ShieldCheck size={16} color="#691F31" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Chính sách Marketplace:</strong> Các đánh giá hợp lệ từ khách hàng có booking thực tế sẽ hiển thị công khai. Nền tảng cho phép ẩn các đánh giá spam, thù ghét hoặc sai sự thật theo tiêu chuẩn cộng đồng.
        </div>
      </div>

      {/* Google Maps Sync Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        borderRadius: '14px',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(201, 168, 117, 0.3)',
        fontSize: '11px',
        color: '#691F31'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPin size={15} color="#2E7D32" />
          <span>Đồng bộ đánh giá Google Maps: <strong>{shopInfo.name}</strong></span>
        </div>
        <a
          href={shopInfo.googleMapsReviewUrl || shopInfo.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '10.5px',
            fontWeight: '700',
            color: '#691F31',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            textDecoration: 'none'
          }}
        >
          <span>Mở Maps</span>
          <ExternalLink size={11} />
        </a>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        paddingBottom: '4px',
        scrollbarWidth: 'none'
      }}>
        {[
          { id: 'APPROVED', label: `Hợp lệ (${approvedReviews.length})` },
          { id: 'FLAGGED', label: `Cần xử lý (${flaggedReviews.length})` },
          { id: 'HIDDEN', label: `Đã ẩn (${hiddenReviews.length})` },
          { id: 'ALL', label: `Tất cả (${reviews.length})` }
        ].map((tab) => {
          const isAct = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: isAct ? '800' : '600',
                backgroundColor: isAct ? '#691F31' : '#FFFFFF',
                color: isAct ? '#FFF8F4' : '#691F31',
                border: isAct ? '1.5px solid #691F31' : '1px solid rgba(201, 168, 117, 0.3)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Reviews List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredReviews.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '30px 16px',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid rgba(201, 168, 117, 0.25)',
            color: '#8C5A65',
            fontSize: '12px'
          }}>
            Không có đánh giá nào trong danh mục này.
          </div>
        ) : (
          filteredReviews.map((rev) => {
            const isApproved = rev.status === 'APPROVED';
            const isFlagged = rev.status === 'FLAGGED';
            const isHidden = rev.status === 'HIDDEN';

            return (
              <div
                key={rev.id}
                className="warm-glass-card"
                style={{
                  borderRadius: '20px',
                  padding: '14px 16px',
                  backgroundColor: '#FFFFFF',
                  border: isFlagged
                    ? '1.5px solid #D97706'
                    : isHidden
                    ? '1.5px dashed #C62828'
                    : '1px solid rgba(201, 168, 117, 0.28)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  opacity: isHidden ? 0.75 : 1
                }}
              >
                {/* Header: Author + Rating + Moderation Status */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1px solid rgba(201, 168, 117, 0.4)'
                      }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '800', color: '#691F31' }}>
                          {rev.author}
                        </span>
                        {rev.verifiedBooking && (
                          <span style={{
                            fontSize: '9px',
                            backgroundColor: '#E8F5E9',
                            color: '#2E7D32',
                            padding: '1px 5px',
                            borderRadius: '4px',
                            fontWeight: '700',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '2px'
                          }}>
                            <Check size={9} />
                            <span>Đã hoàn thành lịch</span>
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <div style={{ display: 'flex', gap: '1px' }}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={12}
                              fill={s <= rev.rating ? '#C9A875' : 'none'}
                              color="#C9A875"
                            />
                          ))}
                        </div>
                        <span style={{ fontSize: '10.5px', color: '#8C5A65' }}>• {rev.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {isApproved && (
                      <span style={{
                        fontSize: '9.5px',
                        fontWeight: '700',
                        color: '#2E7D32',
                        backgroundColor: 'rgba(46, 125, 50, 0.1)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}>
                        <CheckCircle2 size={11} />
                        <span>Hiển thị</span>
                      </span>
                    )}
                    {isFlagged && (
                      <span style={{
                        fontSize: '9.5px',
                        fontWeight: '700',
                        color: '#D97706',
                        backgroundColor: 'rgba(217, 119, 6, 0.12)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}>
                        <AlertTriangle size={11} />
                        <span>Bị báo cáo</span>
                      </span>
                    )}
                    {isHidden && (
                      <span style={{
                        fontSize: '9.5px',
                        fontWeight: '700',
                        color: '#C62828',
                        backgroundColor: 'rgba(198, 40, 40, 0.1)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}>
                        <EyeOff size={11} />
                        <span>Đã ẩn vi phạm</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Service Name & Comment */}
                <div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#691F31',
                    marginBottom: '4px'
                  }}>
                    {rev.serviceName}
                  </div>
                  <p style={{
                    fontSize: '12px',
                    color: '#4A1525',
                    lineHeight: '1.45',
                    margin: 0
                  }}>
                    "{rev.comment}"
                  </p>
                </div>

                {/* Tags & Images */}
                {rev.tags && rev.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {rev.tags.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '9.5px',
                          backgroundColor: 'rgba(241, 208, 201, 0.4)',
                          color: '#691F31',
                          padding: '2px 7px',
                          borderRadius: '6px',
                          fontWeight: '600'
                        }}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                {rev.images && rev.images.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {rev.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Feedback khách hàng"
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '10px',
                          objectFit: 'cover',
                          border: '1px solid rgba(201, 168, 117, 0.3)'
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Moderation Reason Alert (if flagged or hidden) */}
                {rev.moderationReason && (
                  <div style={{
                    backgroundColor: isHidden ? '#FFEBEE' : '#FFFBEB',
                    border: `1px solid ${isHidden ? '#FFCDD2' : '#FDE68A'}`,
                    borderRadius: '10px',
                    padding: '8px 10px',
                    fontSize: '10.5px',
                    color: isHidden ? '#C62828' : '#92400E',
                    lineHeight: 1.35
                  }}>
                    <strong>Lý do kiểm duyệt:</strong> {rev.moderationReason}
                  </div>
                )}

                {/* Existing Shop Reply Display */}
                {rev.shopReply && (
                  <div style={{
                    backgroundColor: 'rgba(248, 242, 236, 0.8)',
                    borderLeft: '3px solid #691F31',
                    borderRadius: '0 12px 12px 0',
                    padding: '8px 12px',
                    fontSize: '11px',
                    color: '#691F31'
                  }}>
                    <div style={{ fontWeight: '800', marginBottom: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <MessageSquare size={12} color="#691F31" />
                        <span>Phản hồi từ Tiệm B:</span>
                      </span>
                      <span style={{ fontSize: '9.5px', color: '#8C5A65', fontWeight: 'normal' }}>{rev.shopReply.date}</span>
                    </div>
                    <div style={{ lineHeight: 1.4 }}>{rev.shopReply.text}</div>
                  </div>
                )}

                {/* Reply Form */}
                {replyingReviewId === rev.id && (
                  <div style={{
                    marginTop: '6px',
                    padding: '10px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(241, 208, 201, 0.35)',
                    border: '1px solid rgba(201, 168, 117, 0.35)'
                  }}>
                    <label style={{ fontSize: '11px', fontWeight: '800', color: '#691F31', display: 'block', marginBottom: '4px' }}>
                      Nhập phản hồi gửi tới {rev.author}:
                    </label>
                    <textarea
                      rows={2}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Cảm ơn bạn đã ghé tiệm hoặc giải trình rõ ràng..."
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '10px',
                        border: '1px solid rgba(201, 168, 117, 0.4)',
                        fontSize: '11.5px',
                        outline: 'none',
                        resize: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '6px' }}>
                      <button
                        onClick={() => setReplyingReviewId(null)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: '#8C5A65',
                          fontSize: '11px',
                          cursor: 'pointer'
                        }}
                      >
                        Hủy
                      </button>
                      <button
                        onClick={() => handleSendReply(rev.id)}
                        style={{
                          padding: '5px 12px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: '#691F31',
                          color: '#FFF8F4',
                          fontSize: '11px',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        <Send size={11} />
                        <span>Gửi phản hồi</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Moderation Reason Selector */}
                {moderatingReviewId === rev.id && (
                  <div style={{
                    marginTop: '6px',
                    padding: '10px',
                    borderRadius: '14px',
                    backgroundColor: '#FFEBEE',
                    border: '1px solid #FFCDD2'
                  }}>
                    <label style={{ fontSize: '11px', fontWeight: '800', color: '#C62828', display: 'block', marginBottom: '4px' }}>
                      Chọn lý do xử lý vi phạm Marketplace:
                    </label>
                    <select
                      value={selectedViolationReason}
                      onChange={(e) => setSelectedViolationReason(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '6px 8px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        marginBottom: '8px',
                        border: '1px solid #EF9A9A'
                      }}
                    >
                      {VIOLATION_REASONS.map((r, idx) => (
                        <option key={idx} value={r}>{r}</option>
                      ))}
                    </select>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                      <button
                        onClick={() => setModeratingReviewId(null)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: '#666',
                          fontSize: '11px',
                          cursor: 'pointer'
                        }}
                      >
                        Hủy
                      </button>
                      <button
                        onClick={() => handleApplyViolation(rev.id)}
                        style={{
                          padding: '5px 12px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: '#C62828',
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        Xác nhận ẩn vi phạm
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons Toolbar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(201, 168, 117, 0.2)',
                  paddingTop: '8px',
                  marginTop: '2px'
                }}>
                  {/* Reply Button */}
                  <button
                    onClick={() => handleOpenReply(rev)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '999px',
                      border: '1px solid rgba(105, 31, 49, 0.3)',
                      backgroundColor: '#FFF8F4',
                      color: '#691F31',
                      fontSize: '11px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <MessageSquare size={12} />
                    <span>{rev.shopReply ? 'Sửa phản hồi' : 'Trả lời khách'}</span>
                  </button>

                  {/* Moderation Actions */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {!isApproved && (
                      <button
                        onClick={() => handleApprove(rev.id)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '999px',
                          border: '1px solid rgba(46, 125, 50, 0.3)',
                          backgroundColor: '#E8F5E9',
                          color: '#2E7D32',
                          fontSize: '10.5px',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          cursor: 'pointer'
                        }}
                      >
                        <CheckCircle2 size={12} />
                        <span>Duyệt hiển thị</span>
                      </button>
                    )}

                    {!isHidden && (
                      <button
                        onClick={() => setModeratingReviewId(rev.id)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '999px',
                          border: '1px solid rgba(198, 40, 40, 0.3)',
                          backgroundColor: '#FFEBEE',
                          color: '#C62828',
                          fontSize: '10.5px',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          cursor: 'pointer'
                        }}
                      >
                        <EyeOff size={12} />
                        <span>Ẩn vi phạm</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
