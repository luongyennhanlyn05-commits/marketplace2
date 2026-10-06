import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageCircleHeart,
  X,
  Send,
  PhoneCall,
  CalendarCheck
} from 'lucide-react';

let chatMessageCounter = 100;
const generateMsgId = () => {
  chatMessageCounter += 1;
  return `msg_${chatMessageCounter}`;
};

export const CustomerChatDrawer = () => {
  const { shopInfo, services, setIsBookingOpen, setBookingService } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(true);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'shop',
      time: 'Vừa xong',
      text: 'Dạ em chào anh/chị ạ! B Beauty & Luxury Spa rất vui được đón tiếp. Mình đang quan tâm đến liệu trình massage thư giãn, chăm sóc da hay gội đầu dưỡng sinh hôm nay ạ?'
    },
    {
      id: 2,
      sender: 'shop',
      time: 'Vừa xong',
      text: 'Ưu đãi hôm nay: Khách đặt lịch online được giữ slot ưu tiên và nhận voucher 50.000đ khi để lại đánh giá sau buổi trị liệu!'
    }
  ]);

  const quickPrompts = [
    { id: 'goi_dau', label: 'Bảng giá Gội Đầu Dưỡng Sinh', replyKey: 'goi_dau' },
    { id: 'son_gel', label: 'Sơn Gel OPI bảo hành bao lâu?', replyKey: 'son_gel' },
    { id: 'gio_trong', label: 'Khung giờ trống chiều nay', replyKey: 'gio_trong' },
    { id: 'hoan_coc', label: 'Chính sách cọc & hủy lịch', replyKey: 'hoan_coc' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const generateShopReply = (userQuery) => {
    const query = userQuery.toLowerCase();

    if (query.includes('gội') || query.includes('dưỡng sinh') || userQuery === 'goi_dau') {
      const matched = services.find((s) => s.id === 'svc_shampoo') || services[1];
      return {
        text: 'Dạ gói Gội Đầu Dưỡng Sinh Trung Hoa 14 Bước của Tiệm B có giá 150.000đ (thời lượng 45 phút). Bao gồm: xông tinh dầu thảo mộc, massage bấm huyệt cổ vai gáy và sấy tạo kiểu tóc mềm mượt. Tiệm cọc giữ chỗ 50.000đ ạ!',
        actionService: matched
      };
    }

    if (query.includes('sơn gel') || query.includes('móng') || query.includes('nail') || userQuery === 'son_gel') {
      const matched = services.find((s) => s.id === 'svc_nail_gel') || services[0];
      return {
        text: 'Dạ gói Sơn Gel Hàn Quốc + Cắt Da Sửa Móng OPI tại Tiệm B có giá 180.000đ. Tiệm dùng 100% sơn chính hãng OPI & gel nhập khẩu Hàn Quốc, cam kết bảo hành nước sơn bóng đẹp 4 tuần không tróc ạ!',
        actionService: matched
      };
    }

    if (query.includes('giờ') || query.includes('trống') || query.includes('hôm nay') || userQuery === 'gio_trong') {
      return {
        text: 'Dạ hôm nay Tiệm B còn các khung giờ đẹp: 14:30 (Master Minh Trí), 16:00 (KTV Ngọc Mai) và 18:30 (KTV Thu Thảo). Bạn có thể bấm nút đặt lịch bên dưới để khóa slot ngay trong 5 phút tránh bị trùng giờ nhé ạ!'
      };
    }

    if (query.includes('cọc') || query.includes('hủy') || query.includes('tiền') || userQuery === 'hoan_coc') {
      return {
        text: 'Dạ Tiệm B cam kết HOÀN CỌC 100% tự động nếu quý khách bấm hủy lịch trước 24 giờ trên app. Tiền cọc giữ chỗ chỉ từ 50.000đ nhằm đảm bảo thợ đã chuẩn bị sẵn sàng phòng riêng đón bạn ạ!'
      };
    }

    return {
      text: 'Dạ Tiệm B đã ghi nhận câu hỏi của bạn. Chuyên viên tư vấn đang online và sẵn sàng phục vụ. Bạn có thể xem bảng giá đầy đủ hoặc gọi trực tiếp Hotline 0909.123.456 của Tiệm B nhé!'
    };
  };

  const handleSendMessage = (textToSend, isQuickKey = false) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: generateMsgId(),
      sender: 'user',
      time: 'Bây giờ',
      text: isQuickKey ? quickPrompts.find((p) => p.replyKey === textToSend)?.label || text : text
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!isQuickKey) setInputText('');

    // Simulate smart bot response
    setIsTyping(true);
    setTimeout(() => {
      const replyData = generateShopReply(textToSend);
      setMessages((prev) => [
        ...prev,
        {
          id: generateMsgId(),
          sender: 'shop',
          time: 'Vừa xong',
          text: replyData.text,
          actionService: replyData.actionService
        }
      ]);
      setIsTyping(false);
    }, 850);
  };

  const handleBookFromChat = (svc) => {
    setIsOpen(false);
    setBookingService(svc);
    setIsBookingOpen(true);
  };

  return (
    <>
      {/* 1. NÚT TRÒN NHỎ NHỎ BÊN PHẢI (Floating Round Chat Button) */}
      {!isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '88px',
            right: 'max(16px, calc(50% - 200px))',
            zIndex: 920
          }}
          className="animate-fade-up"
        >
          <button
            onClick={() => {
              setIsOpen(true);
              setUnreadBadge(false);
            }}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#691F31',
              color: '#FFF8F4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(105, 31, 49, 0.35)',
              border: '1.5px solid rgba(201, 168, 117, 0.45)',
              position: 'relative',
              transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(105, 31, 49, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(105, 31, 49, 0.35)';
            }}
            title="Trò chuyện với Tiệm B"
          >
            <MessageCircleHeart size={22} color="#F1D0C9" />

            {/* Online Green Indicator Dot */}
            <span
              style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: '#2E7D32',
                border: '2px solid #FFF8F4'
              }}
            />

            {/* Unread badge highlight */}
            {unreadBadge && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  left: '-4px',
                  backgroundColor: '#F1D0C9',
                  color: '#691F31',
                  fontSize: '9px',
                  fontWeight: '800',
                  padding: '2px 5px',
                  borderRadius: '999px',
                  border: '1px solid #691F31',
                  boxShadow: '0 2px 6px rgba(105, 31, 49, 0.2)'
                }}
              >
                1
              </span>
            )}
          </button>
        </div>
      )}

      {/* 2. KHUNG TIN NHẮN TRÒ CHUYỆN (Chat Drawer Modal) */}
      {isOpen && (
        <div
          className="animate-slide-up"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 960,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F8F2EC',
            overflow: 'hidden'
          }}
        >
          {/* Header Warm Glassmorphism */}
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(201, 168, 117, 0.25)',
              boxShadow: '0 4px 16px rgba(105, 31, 49, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 10
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Spa Avatar */}
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#691F31',
                  color: '#FFF8F4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '18px',
                  fontWeight: '700',
                  border: '1.5px solid #C9A875',
                  boxShadow: '0 2px 8px rgba(105, 31, 49, 0.2)',
                  position: 'relative'
                }}
              >
                B
                <span
                  style={{
                    position: 'absolute',
                    bottom: '0px',
                    right: '0px',
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    backgroundColor: '#2E7D32',
                    border: '1.5px solid #FFF'
                  }}
                />
              </div>

              <div>
                <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#691F31', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>{shopInfo.name}</span>
                  <span style={{ fontSize: '9.5px', backgroundColor: '#F1D0C9', color: '#691F31', padding: '1px 6px', borderRadius: '999px', fontWeight: '800' }}>
                    Tư vấn
                  </span>
                </div>
                <div style={{ fontSize: '10.5px', color: '#2E7D32', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>● Đang trực tuyến (Phản hồi tức thì)</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <a
                href={`tel:${shopInfo.hotline ? shopInfo.hotline.replace(/\s+/g, '') : '0908888999'}`}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#F6E1DB',
                  color: '#691F31',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(201, 168, 117, 0.25)',
                  textDecoration: 'none'
                }}
                title={`Gọi Hotline Tiệm B (${shopInfo.hotline || '0908 888 999'})`}
              >
                <PhoneCall size={14} />
              </a>

              <button
                onClick={() => setIsOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#F6E1DB',
                  color: '#691F31',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(201, 168, 117, 0.25)'
                }}
                title="Đóng khung chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat Message Thread */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {/* Timestamp Notice */}
            <div style={{ textAlign: 'center', margin: '4px 0' }}>
              <span style={{ fontSize: '10.5px', color: 'rgba(105, 31, 49, 0.55)', backgroundColor: 'rgba(255, 255, 255, 0.65)', padding: '3px 10px', borderRadius: '999px', border: '1px solid rgba(201, 168, 117, 0.2)' }}>
                Hôm nay • Kênh tư vấn trực tiếp của Tiệm B
              </span>
            </div>

            {/* Messages */}
            {messages.map((m) => {
              const isShop = m.sender === 'shop';
              return (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isShop ? 'flex-start' : 'flex-end',
                    gap: '4px'
                  }}
                  className="animate-fade-up"
                >
                  <div
                    style={{
                      maxWidth: '82%',
                      padding: '12px 14px',
                      borderRadius: isShop ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
                      backgroundColor: isShop ? 'rgba(255, 255, 255, 0.95)' : '#691F31',
                      color: isShop ? '#691F31' : '#FFF8F4',
                      fontSize: '12.5px',
                      lineHeight: '1.45',
                      boxShadow: isShop
                        ? '0 4px 14px rgba(105, 31, 49, 0.05)'
                        : '0 4px 14px rgba(105, 31, 49, 0.25)',
                      border: isShop ? '1px solid rgba(201, 168, 117, 0.25)' : 'none'
                    }}
                  >
                    {m.text}

                    {/* Interactive Action inside Chat */}
                    {m.actionService && (
                      <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed rgba(105, 31, 49, 0.18)' }}>
                        <div style={{ fontSize: '11px', color: 'rgba(105, 31, 49, 0.75)', marginBottom: '6px' }}>
                          Gợi ý cho bạn: <strong>{m.actionService.name}</strong> ({m.actionService.price.toLocaleString()}đ)
                        </div>
                        <button
                          onClick={() => handleBookFromChat(m.actionService)}
                          className="btn-burgundy-cta"
                          style={{
                            height: '36px',
                            padding: '0 14px',
                            borderRadius: '12px',
                            fontSize: '11.5px',
                            fontWeight: '700',
                            gap: '5px'
                          }}
                        >
                          <CalendarCheck size={13} />
                          <span>Đặt Dịch Vụ Này Ngay</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <span style={{ fontSize: '9.5px', color: 'rgba(105, 31, 49, 0.5)', padding: '0 4px' }}>
                    {m.time}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '14px', width: 'fit-content', border: '1px solid rgba(201, 168, 117, 0.2)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#691F31', animation: 'bounce 1s infinite' }} />
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#691F31', animation: 'bounce 1s infinite 0.2s' }} />
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#691F31', animation: 'bounce 1s infinite 0.4s' }} />
                <span style={{ fontSize: '10.5px', color: 'rgba(105, 31, 49, 0.65)', marginLeft: '4px' }}>
                  Tiệm B đang soạn tin...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Chips */}
          <div
            style={{
              padding: '6px 14px',
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(10px)',
              borderTop: '1px solid rgba(201, 168, 117, 0.18)',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              scrollbarWidth: 'none'
            }}
          >
            {quickPrompts.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSendMessage(p.replyKey, true)}
                className="hover-blush"
                style={{
                  padding: '6px 11px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#691F31',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(201, 168, 117, 0.25)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Footer Input Box */}
          <div
            style={{
              padding: '10px 14px 14px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(201, 168, 117, 0.22)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <input
              type="text"
              placeholder="Nhập câu hỏi tư vấn với Tiệm B..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              style={{
                flex: 1,
                padding: '11px 14px',
                borderRadius: '14px',
                fontSize: '12px',
                backgroundColor: '#FFFFFF',
                color: '#691F31',
                border: '1px solid rgba(201, 168, 117, 0.25)'
              }}
            />

            <button
              onClick={() => handleSendMessage()}
              className="btn-burgundy-cta"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(105, 31, 49, 0.25)'
              }}
              title="Gửi tin nhắn"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
