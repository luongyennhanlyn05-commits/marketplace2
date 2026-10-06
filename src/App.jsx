import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopDemoBar } from './components/layout/TopDemoBar';
import { MobileFrame } from './components/layout/MobileFrame';
import { BottomNavBar } from './components/layout/BottomNavBar';
import { Sparkles } from 'lucide-react';

// Customer Components for Tiệm B
import { HomeScreen } from './components/customer/HomeScreen';
import { ServicesScreen } from './components/customer/ServicesScreen';
import { MyBookingsScreen } from './components/customer/MyBookingsScreen';
import { NotificationsScreen } from './components/customer/NotificationsScreen';
import { BookingModal } from './components/customer/BookingModal';
import { ReviewModal } from './components/customer/ReviewModal';
import { CustomerChatDrawer } from './components/customer/CustomerChatDrawer';
import { VipRegistrationModal } from './components/customer/VipRegistrationModal';

// Owner Components for Tiệm B
import { PartnerDashboard } from './components/partner/PartnerDashboard';
import { PartnerCalendar } from './components/partner/PartnerCalendar';
import { PartnerServices } from './components/partner/PartnerServices';
import { PartnerMembership } from './components/partner/PartnerMembership';
import { PartnerProfile } from './components/partner/PartnerProfile';

import { DesktopLayout } from './components/desktop/DesktopLayout';

const AppContent = () => {
  const { currentRole, customerTab, ownerTab, isBookingOpen, bookingService, displayMode } = useApp();

  if (displayMode === 'full' || displayMode === 'desktop') {
    return <DesktopLayout />;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#1E0C12'
    }}>
      {/* Top Demo Bar */}
      <TopDemoBar />

      {/* Main Viewport Container */}
      <MobileFrame>
        {/* Scrollable View Content - The only scrolling area */}
        <div style={{ flex: 1, width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
          {currentRole === 'customer' ? (
            <>
              {customerTab === 'home' && <HomeScreen />}
              {customerTab === 'menu' && <ServicesScreen />}
              {customerTab === 'bookings' && <MyBookingsScreen />}
              {customerTab === 'notifications' && <NotificationsScreen />}
            </>
          ) : (
            <>
              {ownerTab === 'dashboard' && <PartnerDashboard />}
              {ownerTab === 'calendar' && <PartnerCalendar />}
              {ownerTab === 'services' && <PartnerServices />}
              {ownerTab === 'memberships' && <PartnerMembership />}
              {ownerTab === 'shop_profile' && <PartnerProfile />}
            </>
          )}
        </div>

        {/* Global Modals for Booking, Reviews & VIP */}
        {isBookingOpen && <BookingModal key={bookingService?.id || 'booking-modal'} />}
        <ReviewModal />
        <VipRegistrationModal />

        {/* Live Customer Chat Floating Button & Drawer */}
        {currentRole === 'customer' && <CustomerChatDrawer />}

        {/* Bottom App Navigation */}
        <BottomNavBar />
      </MobileFrame>
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F8F2EC',
          color: '#691F31',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: '#F1D0C9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px'
          }}>
            <Sparkles size={24} color="#691F31" />
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>
            Đang tải dữ liệu Tiệm B...
          </h2>
          <p style={{ fontSize: '12.5px', opacity: 0.8, marginBottom: '20px', maxWidth: '340px', lineHeight: '1.5' }}>
            Hệ thống đang đồng bộ phiên bản mới nhất với các gói VIP. Vui lòng bấm nút bên dưới để làm mới dữ liệu!
          </p>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{
              padding: '12px 24px',
              borderRadius: '999px',
              backgroundColor: '#691F31',
              color: '#FFF8F4',
              fontWeight: '700',
              fontSize: '13.5px',
              boxShadow: '0 4px 14px rgba(105, 31, 49, 0.3)'
            }}
          >
            Làm Mới & Đồng Bộ Ngay
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}

