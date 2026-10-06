import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SHOP_B_INFO,
  SHOP_B_STAFF,
  INITIAL_SERVICES,
  INITIAL_BOOKINGS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
  MEMBERSHIP_CARDS,
  INITIAL_VIP_MEMBERS
} from '../data/mockData';

const AppContext = createContext();

const STORAGE_KEYS = {
  SHOP_INFO: 'tiem_b_shop_info_v2',
  SERVICES: 'tiem_b_services_v2',
  BOOKINGS: 'tiem_b_bookings_v2',
  REVIEWS: 'tiem_b_reviews_v2',
  NOTIFICATIONS: 'tiem_b_notifications_v2',
  LOCKED_SLOTS: 'tiem_b_locked_slots_v2',
  USER_TIER: 'tiem_b_user_tier_v2',
  THEME_OPTION: 'tiem_b_theme_option_v2',
  VIP_MEMBERS: 'tiem_b_vip_members_v2',
  MEMBERSHIP_TIERS: 'tiem_b_membership_tiers_v2'
};

export const AppProvider = ({ children }) => {
  // Theme Option: 'option1' (Solid Pastel Pink) | 'option2' (Rose Velvet Boutique) | 'option3' (Dewy Pink Glass)
  const [themeOption, setThemeOption] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.THEME_OPTION) || 'option1';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME_OPTION, themeOption);
  }, [themeOption]);
  // Current View: 'customer' (Khách của tiệm B) | 'owner' (Chủ tiệm B)
  const [currentRole, setCurrentRole] = useState('customer');

  // Customer Navigation: 'home' | 'menu' | 'bookings' | 'notifications'
  const [customerTab, setCustomerTab] = useState('home');

  // Owner Navigation: 'dashboard' | 'calendar' | 'services' | 'memberships' | 'shop_profile'
  const [ownerTab, setOwnerTab] = useState('dashboard');

  // Display Mode: 'frame' | 'full'
  const [displayMode, setDisplayMode] = useState('frame');

  // Clean emojis helper for amenities
  const cleanAmenitiesList = (list) => {
    if (!Array.isArray(list)) return [];
    return list.map((a) => (typeof a === 'string' ? a.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim() : a));
  };

  // Shop B Information
  const [shopInfo, setShopInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SHOP_INFO);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          amenities: cleanAmenitiesList(parsed.amenities || SHOP_B_INFO.amenities)
        };
      }
      return {
        ...SHOP_B_INFO,
        amenities: cleanAmenitiesList(SHOP_B_INFO.amenities)
      };
    } catch {
      return {
        ...SHOP_B_INFO,
        amenities: cleanAmenitiesList(SHOP_B_INFO.amenities)
      };
    }
  });

  // Services Menu of Tiệm B
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  // Staff list of Tiệm B
  const [staffList] = useState(SHOP_B_STAFF);

  // Customer Bookings
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // Reviews of Tiệm B
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Locked Slots of Tiệm B (Keyed by date_time)
  const [lockedSlots, setLockedSlots] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOCKED_SLOTS);
      return saved ? JSON.parse(saved) : ['2026-10-04_11:00', '2026-10-05_15:30'];
    } catch {
      return ['2026-10-04_11:00', '2026-10-05_15:30'];
    }
  });

  // Active VIP Tier of Customer ('standard', 'card_silver', 'card_gold', 'card_diamond')
  const [userTier, setUserTier] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.USER_TIER) || 'card_gold';
  });

  // VIP Members List (Module CRM for Tiệm B)
  const [vipMembers, setVipMembers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VIP_MEMBERS);
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_VIP_MEMBERS;
    } catch {
      return INITIAL_VIP_MEMBERS;
    }
  });

  // Membership Tiers Configuration
  const [membershipTiers, setMembershipTiers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEMBERSHIP_TIERS);
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : MEMBERSHIP_CARDS;
    } catch {
      return MEMBERSHIP_CARDS;
    }
  });

  // Customer VIP Registration Modal
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);

  // Booking Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState(null);
  const [bookingStaff, setBookingStaff] = useState(SHOP_B_STAFF[0]);
  const [reviewBooking, setReviewBooking] = useState(null);

  // Search & Category Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Synchronize state with LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHOP_INFO, JSON.stringify(shopInfo));
  }, [shopInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOCKED_SLOTS, JSON.stringify(lockedSlots));
  }, [lockedSlots]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_TIER, userTier);
  }, [userTier]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIP_MEMBERS, JSON.stringify(vipMembers));
  }, [vipMembers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEMBERSHIP_TIERS, JSON.stringify(membershipTiers));
  }, [membershipTiers]);

  // Reset to initial demo state
  const resetDemoData = () => {
    localStorage.clear();
    setShopInfo(SHOP_B_INFO);
    setServices(INITIAL_SERVICES);
    setBookings(INITIAL_BOOKINGS);
    setReviews(INITIAL_REVIEWS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setLockedSlots(['2026-10-04_11:00', '2026-10-05_15:30']);
    setUserTier('card_gold');
    setVipMembers(INITIAL_VIP_MEMBERS);
    setMembershipTiers(MEMBERSHIP_CARDS);
    setIsBookingOpen(false);
    setIsVipModalOpen(false);
    setBookingService(null);
    setReviewBooking(null);
    alert('Đã khôi phục dữ liệu mẫu Tiệm B thành công!');
  };

  // Create Booking at Tiệm B
  const createBooking = (newBookingData) => {
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'CONFIRMED',
      statusLabel: 'Đã xác nhận cọc',
      hasReviewed: false,
      ...newBookingData
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Send confirmation notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      type: 'payment',
      title: 'Đặt lịch tại Tiệm B thành công',
      body: `Lịch hẹn #${newBooking.id} (${newBooking.serviceName}) lúc ${newBooking.time} ngày ${newBooking.date} đã được Tiệm B xác nhận.`,
      time: 'Vừa xong',
      read: false,
      bookingId: newBooking.id
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newBooking;
  };

  // Cancel Booking
  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((item) => {
        if (item.id === bookingId) {
          return {
            ...item,
            status: 'CANCELLED',
            statusLabel: 'Đã hủy & Hoàn cọc 100%'
          };
        }
        return item;
      })
    );

    const cancelNotif = {
      id: `notif-${Date.now()}`,
      type: 'reminder',
      title: 'Hủy lịch & Hoàn cọc thành công',
      body: `Tiệm B đã xử lý hủy lịch #${bookingId}. Toàn bộ số tiền cọc đã được hoàn về tài khoản của bạn.`,
      time: 'Vừa xong',
      read: false
    };
    setNotifications((prev) => [cancelNotif, ...prev]);
  };

  // Recalculate shop rating based on approved reviews only
  const updateShopRatingFromReviews = (reviewList) => {
    const approved = reviewList.filter((r) => r.status === 'APPROVED');
    if (approved.length === 0) return;
    const avg = (
      approved.reduce((sum, r) => sum + r.rating, 0) / approved.length
    ).toFixed(1);
    setShopInfo((prev) => ({
      ...prev,
      rating: parseFloat(avg),
      reviewCount: approved.length
    }));
  };

  // Submit Review for Tiệm B (Hệ thống đánh giá sau dịch vụ)
  const submitReview = ({ bookingId, serviceName, rating, comment, tags, images }) => {
    const newReview = {
      id: `r-${Date.now()}`,
      author: 'Bạn (Khách hàng đã trải nghiệm)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      serviceName: serviceName || 'Dịch vụ Tiệm B',
      rating,
      date: 'Hôm nay',
      comment,
      tags: tags || ['Hài lòng'],
      status: 'APPROVED', // Mặc định hiển thị nếu hợp lệ
      verifiedBooking: true,
      images: images || [],
      shopReply: null
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    updateShopRatingFromReviews(updatedReviews);

    // Update booking hasReviewed
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, hasReviewed: true, userRating: rating } : b))
    );

    const rewardNotif = {
      id: `notif-${Date.now()}`,
      type: 'promo',
      title: 'Tiệm B cảm ơn đánh giá của bạn!',
      body: 'Bạn nhận được voucher giảm 50.000đ cho lần làm đẹp tiếp theo.',
      time: 'Vừa xong',
      read: false
    };
    setNotifications((prev) => [rewardNotif, ...prev]);
  };

  // Mark Booking as Completed (Mô phỏng khách hoàn thành dịch vụ)
  const completeBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status: 'COMPLETED', statusLabel: 'Đã hoàn thành' }
          : b
      )
    );
  };

  // Reply to Customer Review (Chủ tiệm phản hồi khách hàng)
  const replyReview = (reviewId, replyText) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              shopReply: {
                text: replyText,
                date: 'Hôm nay'
              }
            }
          : r
      )
    );
  };

  // Moderate Review (Quản lý & xử lý vi phạm quy định cộng đồng Marketplace)
  const moderateReview = (reviewId, newStatus, reason) => {
    setReviews((prev) => {
      const next = prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              status: newStatus,
              moderationReason: reason || r.moderationReason
            }
          : r
      );
      updateShopRatingFromReviews(next);
      return next;
    });
  };

  // Report Review (Khách hàng hoặc thành viên báo cáo vi phạm)
  const reportReview = (reviewId, reason) => {
    moderateReview(reviewId, 'FLAGGED', reason || 'Người dùng báo cáo vi phạm tiêu chuẩn cộng đồng');
    alert('Cảm ơn bạn đã báo cáo. Đội ngũ kiểm duyệt Marketplace sẽ xem xét và xử lý đánh giá này trong vòng 24h!');
  };

  // Lock / Unlock Slot (Chủ tiệm B)
  const toggleSlotLock = (slotKey) => {
    setLockedSlots((prev) =>
      prev.includes(slotKey) ? prev.filter((k) => k !== slotKey) : [...prev, slotKey]
    );
  };

  // Lock all slots on a specific date
  const lockAllSlotsForDate = (date, slots) => {
    setLockedSlots((prev) => {
      const keysToAdd = slots.map((s) => `${date}_${s}`);
      const set = new Set([...prev, ...keysToAdd]);
      return Array.from(set);
    });
  };

  // Unlock all slots on a specific date
  const unlockAllSlotsForDate = (date) => {
    setLockedSlots((prev) => prev.filter((k) => !k.startsWith(`${date}_`)));
  };

  // Add / Edit Service of Tiệm B
  const saveService = (serviceData) => {
    setServices((prev) => {
      const index = prev.findIndex((s) => s.id === serviceData.id);
      if (index >= 0) {
        const next = [...prev];
        next[index] = serviceData;
        return next;
      }
      return [
        ...prev,
        {
          ...serviceData,
          id: `b_s_${Date.now()}`
        }
      ];
    });
  };

  // Delete Service of Tiệm B
  const deleteService = (serviceId) => {
    setServices((prev) => prev.filter((s) => s.id !== serviceId));
  };

  // Update Shop B Profile
  const updateShopInfo = (newInfo) => {
    setShopInfo((prev) => ({ ...prev, ...newInfo }));
  };

  // Mark all notifications as read
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // VIP Operations
  const registerVipMember = ({ tierId, fullName, phone, birthday, note }) => {
    const tier = membershipTiers.find((t) => t.id === tierId) || membershipTiers[1];
    const prefix = tierId === 'card_diamond' ? 'DIA' : tierId === 'card_gold' ? 'GLD' : 'SLV';
    const cardCode = `TB-${prefix}-${Math.floor(100 + Math.random() * 900)}`;

    const newMember = {
      id: `vip_${Date.now()}`,
      cardCode,
      tier: tierId,
      tierName: tier.name,
      fullName: fullName || 'Khách Hàng VIP',
      phone: phone || '0988 888 999',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      joinDate: new Date().toLocaleDateString('vi-VN'),
      expiryDate: tierId === 'card_diamond' ? 'Trọn đời' : '12 tháng',
      totalSpent: tier.price,
      visitsCount: 1,
      favoriteStaff: 'Chuyên viên ngẫu nhiên',
      note: note || (birthday ? `Sinh nhật: ${birthday}` : 'Đăng ký trực tuyến qua app'),
      status: 'ACTIVE',
      benefitsUsed: 'Mới kích hoạt'
    };

    setUserTier(tierId);
    setVipMembers((prev) => [newMember, ...prev]);

    // Send notification
    const welcomeNotif = {
      id: `notif-${Date.now()}`,
      type: 'promo',
      title: `Chúc mừng bạn đã là ${tier.name}!`,
      body: `Mã thẻ ${cardCode} đã kích hoạt. Bạn được giảm ngay ${tier.discount} cho tất cả các dịch vụ đặt lịch tại Tiệm B!`,
      time: 'Vừa xong',
      read: false
    };
    setNotifications((prev) => [welcomeNotif, ...prev]);
    return newMember;
  };

  const updateVipMember = (memberId, fields) => {
    setVipMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, ...fields } : m))
    );
  };

  const addVipMember = (newMember) => {
    setVipMembers((prev) => [newMember, ...prev]);
  };

  const deleteVipMember = (memberId) => {
    setVipMembers((prev) => prev.filter((m) => m.id !== memberId));
  };

  const updateMembershipTier = (tierId, fields) => {
    setMembershipTiers((prev) =>
      prev.map((t) => (t.id === tierId ? { ...t, ...fields } : t))
    );
  };

  const getTierDiscount = (tierId = userTier) => {
    const tier = membershipTiers.find((t) => t.id === tierId);
    return tier?.discountPercent || (tierId === 'card_diamond' ? 25 : tierId === 'card_gold' ? 15 : tierId === 'card_silver' ? 5 : 0);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        customerTab,
        setCustomerTab,
        ownerTab,
        setOwnerTab,
        displayMode,
        setDisplayMode,
        shopInfo,
        services,
        staffList,
        bookings,
        reviews,
        notifications,
        unreadCount,
        markAllNotificationsRead,
        lockedSlots,
        setLockedSlots,
        toggleSlotLock,
        lockAllSlotsForDate,
        unlockAllSlotsForDate,
        userTier,
        setUserTier,
        vipMembers,
        setVipMembers,
        membershipTiers,
        setMembershipTiers,
        isVipModalOpen,
        setIsVipModalOpen,
        registerVipMember,
        updateVipMember,
        addVipMember,
        deleteVipMember,
        updateMembershipTier,
        getTierDiscount,
        isBookingOpen,
        setIsBookingOpen,
        bookingService,
        setBookingService,
        bookingStaff,
        setBookingStaff,
        reviewBooking,
        setReviewBooking,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        createBooking,
        cancelBooking,
        completeBooking,
        submitReview,
        replyReview,
        moderateReview,
        reportReview,
        saveService,
        deleteService,
        updateShopInfo,
        resetDemoData,
        themeOption,
        setThemeOption
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react/only-export-components, react-refresh/only-export-components
export const useApp = () => useContext(AppContext);
