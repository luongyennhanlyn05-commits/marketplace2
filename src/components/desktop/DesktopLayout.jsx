import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  CalendarDays,
  Sparkles,
  Crown,
  Store,
  Home,
  CalendarCheck,
  Bell,
  User,
  RotateCcw,
  Smartphone,
  ChevronRight
} from 'lucide-react';

import { DesktopOwnerServices } from './DesktopOwnerServices';
import { DesktopOwnerDashboard } from './DesktopOwnerDashboard';
import { DesktopOwnerCalendar } from './DesktopOwnerCalendar';
import { DesktopOwnerMembership } from './DesktopOwnerMembership';
import { DesktopOwnerProfile } from './DesktopOwnerProfile';

import { DesktopCustomerHome } from './DesktopCustomerHome';
import { DesktopCustomerServices } from './DesktopCustomerServices';
import { DesktopCustomerBookings } from './DesktopCustomerBookings';
import { DesktopCustomerNotifications } from './DesktopCustomerNotifications';

import { BookingModal } from '../customer/BookingModal';
import { ReviewModal } from '../customer/ReviewModal';
import { VipRegistrationModal } from '../customer/VipRegistrationModal';
import { CustomerChatDrawer } from '../customer/CustomerChatDrawer';

export const DesktopLayout = () => {
  const {
    currentRole,
    setCurrentRole,
    customerTab,
    setCustomerTab,
    ownerTab,
    setOwnerTab,
    setDisplayMode,
    shopInfo,
    unreadCount,
    bookings,
    isBookingOpen,
    bookingService,
    resetDemoData
  } = useApp();

  const confirmedCount = bookings.filter((b) => b.status === 'CONFIRMED').length;
  const totalDepositRevenue = bookings
    .filter((b) => b.status === 'CONFIRMED' || b.status === 'COMPLETED')
    .reduce((sum, b) => sum + (b.depositAmount || 0), 0);

  // If in Owner mode on desktop: render Left Sidebar + Content
  if (currentRole === 'owner') {
    const navItems = [
      { id: 'dashboard', label: 'Báo cáo & Tổng quan', icon: LayoutDashboard },
      { id: 'calendar', label: 'Lịch tiệm & Khóa slot', icon: CalendarDays },
      { id: 'services', label: 'Menu & Bảng giá', icon: Sparkles },
      { id: 'memberships', label: 'Thẻ VIP & Hội viên', icon: Crown },
      { id: 'shop_profile', label: 'Cơ sở B & Đánh giá', icon: Store }
    ];

    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#F8F2EC',
        color: '#3E101B'
      }}>
        {/* Left Sidebar */}
        <aside style={{
          width: '280px',
          backgroundColor: '#18080E',
          borderRight: '1px solid rgba(196, 158, 101, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 100,
          flexShrink: 0
        }}>
          {/* Brand & Store Header */}
          <div style={{
            padding: '24px 20px',
            borderBottom: '1px solid rgba(196, 158, 101, 0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: '#5C1929',
                border: '1.5px solid #C49E65',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FAF6F0',
                fontWeight: '800',
                fontSize: '18px',
                fontFamily: 'var(--font-serif)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
              }}>
                B
              </div>
              <div>
                <h2 style={{
                  color: '#FAF6F0',
                  fontSize: '15px',
                  fontWeight: '800',
                  letterSpacing: '0.2px',
                  margin: 0,
                  lineHeight: 1.2
                }}>
                  {shopInfo.name}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                  <span style={{ fontSize: '11px', color: '#2E7D32', fontWeight: '700' }}>● Đang mở cửa</span>
                  <span style={{ fontSize: '11px', color: 'rgba(250, 246, 240, 0.5)' }}>• Pasteur, Q.1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ padding: '20px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{
              fontSize: '10.5px',
              fontWeight: '800',
              color: '#C49E65',
              letterSpacing: '0.8px',
              paddingLeft: '12px',
              marginBottom: '6px'
            }}>
              QUẢN LÝ TIỆM B
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = ownerTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setOwnerTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    fontSize: '13.5px',
                    fontWeight: isActive ? '800' : '600',
                    backgroundColor: isActive ? '#5C1929' : 'transparent',
                    color: isActive ? '#FAF6F0' : 'rgba(250, 246, 240, 0.7)',
                    border: isActive ? '1px solid rgba(196, 158, 101, 0.35)' : '1px solid transparent',
                    boxShadow: isActive ? '0 4px 14px rgba(0,0,0,0.3)' : 'none',
                    textAlign: 'left',
                    transition: 'all 0.18s ease'
                  }}
                >
                  <Icon size={18} color={isActive ? '#E0C89F' : 'rgba(250, 246, 240, 0.6)'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Metrics Widget in Sidebar */}
          <div style={{
            padding: '16px',
            margin: '0 14px 16px',
            borderRadius: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(196, 158, 101, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: 'rgba(250, 246, 240, 0.6)' }}>Tiền cọc đã nhận:</span>
              <strong style={{ fontSize: '12px', color: '#E0C89F' }}>{totalDepositRevenue.toLocaleString()}đ</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', color: 'rgba(250, 246, 240, 0.6)' }}>Lịch hẹn chờ:</span>
              <strong style={{ fontSize: '12px', color: '#FAF6F0' }}>{confirmedCount} khách</strong>
            </div>
          </div>

          {/* Sidebar Footer Controls */}
          <div style={{
            padding: '14px',
            borderTop: '1px solid rgba(196, 158, 101, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {/* Role Toggle Pill */}
            <div style={{
              display: 'flex',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '3px',
              border: '1px solid rgba(196, 158, 101, 0.25)'
            }}>
              <button
                onClick={() => setCurrentRole('customer')}
                style={{
                  flex: 1,
                  padding: '6px 8px',
                  borderRadius: '7px',
                  fontSize: '11.5px',
                  fontWeight: '700',
                  backgroundColor: currentRole === 'customer' ? '#5C1929' : 'transparent',
                  color: currentRole === 'customer' ? '#FAF6F0' : 'rgba(250, 246, 240, 0.65)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <User size={12} />
                <span>Khách</span>
              </button>
              <button
                onClick={() => setCurrentRole('owner')}
                style={{
                  flex: 1,
                  padding: '6px 8px',
                  borderRadius: '7px',
                  fontSize: '11.5px',
                  fontWeight: '700',
                  backgroundColor: currentRole === 'owner' ? '#5C1929' : 'transparent',
                  color: currentRole === 'owner' ? '#FAF6F0' : 'rgba(250, 246, 240, 0.65)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Store size={12} />
                <span>Chủ tiệm</span>
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setDisplayMode('frame')}
                title="Khung điện thoại"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  padding: '7px 8px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  color: 'rgba(250, 246, 240, 0.8)',
                  fontSize: '11px',
                  fontWeight: '600',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Smartphone size={12} />
                <span>Điện thoại</span>
              </button>

              <button
                onClick={resetDemoData}
                title="Khôi phục dữ liệu gốc"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  padding: '7px 10px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  color: 'rgba(250, 246, 240, 0.7)',
                  fontSize: '11px',
                  fontWeight: '600',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <RotateCcw size={11} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', overflowY: 'auto' }}>
          {/* Top Bar on Desktop */}
          <header style={{
            height: '64px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid rgba(196, 158, 101, 0.2)',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 90,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'rgba(62, 16, 27, 0.7)' }}>
              <span>Tiệm B</span>
              <ChevronRight size={14} />
              <strong style={{ color: '#5C1929' }}>
                {ownerTab === 'dashboard' && 'Báo cáo & Tổng quan'}
                {ownerTab === 'calendar' && 'Lịch tiệm & Khóa slot'}
                {ownerTab === 'services' && 'Menu & Bảng giá dịch vụ'}
                {ownerTab === 'memberships' && 'Thẻ VIP & Hội viên'}
                {ownerTab === 'shop_profile' && 'Thông tin cơ sở & Đánh giá'}
              </strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{
                fontSize: '11.5px',
                fontWeight: '700',
                backgroundColor: '#FBF0EC',
                color: '#5C1929',
                padding: '5px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(196, 158, 101, 0.25)'
              }}>
                Chế độ Quản trị Chủ Tiệm B
              </span>

              <button
                onClick={resetDemoData}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'rgba(62, 16, 27, 0.7)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(0,0,0,0.04)'
                }}
              >
                <RotateCcw size={13} />
                <span>Reset Demo</span>
              </button>
            </div>
          </header>

          {/* Scrollable View Content */}
          <main style={{ flex: 1, backgroundColor: '#FAF6F0' }}>
            {ownerTab === 'dashboard' && <DesktopOwnerDashboard />}
            {ownerTab === 'calendar' && <DesktopOwnerCalendar />}
            {ownerTab === 'services' && <DesktopOwnerServices />}
            {ownerTab === 'memberships' && <DesktopOwnerMembership />}
            {ownerTab === 'shop_profile' && <DesktopOwnerProfile />}
          </main>
        </div>

        {/* Global Modals */}
        {isBookingOpen && <BookingModal key={bookingService?.id || 'booking-modal'} />}
        <ReviewModal />
        <VipRegistrationModal />
      </div>
    );
  }

  // Customer Mode on Desktop
  const customerNavItems = [
    { id: 'home', label: 'Trang Chủ', icon: Home },
    { id: 'menu', label: 'Menu Dịch Vụ', icon: Sparkles },
    { id: 'bookings', label: 'Lịch Hẹn Của Tôi', icon: CalendarCheck, badge: confirmedCount },
    { id: 'notifications', label: 'Thông Báo', icon: Bell, badge: unreadCount }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#FAF6F0',
      color: '#3E101B'
    }}>
      {/* Desktop Customer Top Header */}
      <header style={{
        backgroundColor: '#18080E',
        borderBottom: '1px solid rgba(196, 158, 101, 0.25)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '0 32px'
      }}>
        <div style={{
          maxWidth: '1360px',
          margin: '0 auto',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          {/* Logo & Store */}
          <div
            onClick={() => setCustomerTab('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#5C1929',
              border: '1.5px solid #C49E65',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FAF6F0',
              fontWeight: '800',
              fontSize: '20px',
              fontFamily: 'var(--font-serif)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
              B
            </div>
            <div>
              <h1 style={{
                color: '#FAF6F0',
                fontSize: '17px',
                fontWeight: '800',
                margin: 0,
                letterSpacing: '0.2px'
              }}>
                {shopInfo.name}
              </h1>
              <span style={{ fontSize: '11px', color: 'rgba(250, 246, 240, 0.6)' }}>
                86 Pasteur, Q.1 • Hotline: {shopInfo.hotline}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {customerNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = customerTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCustomerTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    fontSize: '13.5px',
                    fontWeight: isActive ? '800' : '600',
                    backgroundColor: isActive ? '#5C1929' : 'transparent',
                    color: isActive ? '#FAF6F0' : 'rgba(250, 246, 240, 0.75)',
                    border: isActive ? '1px solid rgba(196, 158, 101, 0.35)' : '1px solid transparent',
                    boxShadow: isActive ? '0 2px 10px rgba(0,0,0,0.3)' : 'none',
                    position: 'relative',
                    transition: 'all 0.18s ease'
                  }}
                >
                  <Icon size={16} color={isActive ? '#E0C89F' : 'rgba(250, 246, 240, 0.7)'} />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span style={{
                      backgroundColor: '#C49E65',
                      color: '#18080E',
                      fontSize: '10px',
                      fontWeight: '800',
                      padding: '1px 6px',
                      borderRadius: '999px'
                    }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Role Toggle & View Mode */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Role Toggle Pill */}
            <div style={{
              display: 'flex',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '3px',
              border: '1px solid rgba(196, 158, 101, 0.25)'
            }}>
              <button
                onClick={() => setCurrentRole('customer')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '7px',
                  fontSize: '12px',
                  fontWeight: '700',
                  backgroundColor: currentRole === 'customer' ? '#5C1929' : 'transparent',
                  color: currentRole === 'customer' ? '#FAF6F0' : 'rgba(250, 246, 240, 0.65)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: currentRole === 'customer' ? '0 2px 6px rgba(0,0,0,0.3)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <User size={13} />
                <span>Khách hàng</span>
              </button>
              <button
                onClick={() => setCurrentRole('owner')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '7px',
                  fontSize: '12px',
                  fontWeight: '700',
                  backgroundColor: currentRole === 'owner' ? '#5C1929' : 'transparent',
                  color: currentRole === 'owner' ? '#FAF6F0' : 'rgba(250, 246, 240, 0.65)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: currentRole === 'owner' ? '0 2px 6px rgba(0,0,0,0.3)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Store size={13} />
                <span>Chủ tiệm</span>
              </button>
            </div>

            {/* View Mode Toggle */}
            <button
              onClick={() => setDisplayMode('frame')}
              title="Chuyển sang Khung điện thoại (Mobile)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FAF6F0',
                fontSize: '11.5px',
                fontWeight: '600',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <Smartphone size={13} />
              <span>Khung đ.thoại</span>
            </button>

            {/* Reset Demo */}
            <button
              onClick={resetDemoData}
              title="Khôi phục dữ liệu gốc"
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                color: 'rgba(250, 246, 240, 0.75)',
                fontSize: '11.5px',
                fontWeight: '600',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, backgroundColor: '#FAF6F0' }}>
        {customerTab === 'home' && <DesktopCustomerHome />}
        {customerTab === 'menu' && <DesktopCustomerServices />}
        {customerTab === 'bookings' && <DesktopCustomerBookings />}
        {customerTab === 'notifications' && <DesktopCustomerNotifications />}
      </main>

      {/* Global Modals for Booking, Reviews & VIP */}
      {isBookingOpen && <BookingModal key={bookingService?.id || 'booking-modal'} />}
      <ReviewModal />
      <VipRegistrationModal />

      {/* Live Customer Chat */}
      <CustomerChatDrawer />
    </div>
  );
};
