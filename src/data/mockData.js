// Dữ liệu Mock chuẩn cho Web/App Đặt Lịch của riêng TIỆM B (B Beauty & Personal Care)

export const SHOP_B_INFO = {
  id: 'shop_b',
  name: 'B Beauty & Luxury Spa',
  shortName: 'Tiệm B',
  tagline: 'Không gian thư giãn đẳng cấp & chăm sóc vẻ đẹp chuẩn chuyên gia',
  rating: 4.9,
  reviewCount: 186,
  address: '86 Pasteur, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  hotline: '0908 888 999',
  openTime: '08:30',
  closeTime: '21:00',
  googleMapsUrl: 'https://maps.google.com/?q=86+Pasteur+Ben+Nghe+Quan+1+Ho+Chi+Minh',
  googleMapsReviewUrl: 'https://maps.google.com/?q=86+Pasteur+Ben+Nghe+Quan+1+Ho+Chi+Minh#review',
  zaloPhone: '0908888999',
  facebookName: 'B Beauty & Luxury Spa',
  instagramTag: '@bbeautyspa.saigon',
  amenities: [
    'Có chỗ đỗ ô tô & xe máy miễn phí',
    'Trà thảo mộc & bánh ngọt đón tiếp',
    'Phòng trị liệu riêng tư chuẩn VIP',
    'Wi-Fi 5G & sạc điện thoại tại ghế'
  ],
  depositRate: 20, // 20%
  depositPolicy: 'Quý khách vui lòng đặt cọc giữ khung giờ phục vụ riêng. Tiệm B cam kết hoàn 100% tiền cọc nếu hủy trước 24 giờ.',
  coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'
  ],
  description: 'Tiệm B là không gian làm đẹp cao cấp tích hợp Hair Studio, Nail Art và Spa Trị Liệu. Với đội ngũ thợ lành nghề trên 5 năm kinh nghiệm và trang thiết bị chuẩn y khoa, Tiệm B mang đến trải nghiệm thư giãn tinh tế nhất cho bạn.'
};

export const SERVICE_ADDONS = [
  { id: 'addon_mask', name: 'Đắp mặt nạ ngọc trai thảo mộc dưỡng trắng', price: 35000, duration: 10 },
  { id: 'addon_stone', name: 'Massage đá nóng bazan cổ vai gáy giải mỏi', price: 50000, duration: 15 },
  { id: 'addon_scrub', name: 'Tẩy tế bào chết da đầu / móng hữu cơ', price: 40000, duration: 10 },
  { id: 'addon_serum', name: 'Ủ tinh chất serum phục hồi tế bào gốc', price: 65000, duration: 15 }
];

export const SHOP_B_CATEGORIES = [
  { id: 'all', name: 'Tất cả dịch vụ', icon: 'Sparkles' },
  { id: 'hair', name: 'Tạo Mẫu Tóc', icon: 'Scissors' },
  { id: 'spa', name: 'Spa & Massage', icon: 'Flower2' },
  { id: 'nail', name: 'Nail & Mi Nghệ Thuật', icon: 'HeartHandshake' },
  { id: 'skin', name: 'Chăm Sóc Da Y Khoa', icon: 'Smile' },
  { id: 'combo', name: 'Combo Tiết Kiệm', icon: 'Crown' }
];

export const SHOP_B_STAFF = [
  {
    id: 'staff_any',
    name: 'Chuyên viên ngẫu nhiên',
    role: 'Tiệm B tự sắp xếp thợ phù hợp nhất',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    experience: 'Chuẩn quy trình'
  },
  {
    id: 'staff_1',
    name: 'Master Minh Trí',
    role: 'Chuyên gia Tạo mẫu Tóc Hàn Quốc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5.0,
    experience: '8 năm kinh nghiệm'
  },
  {
    id: 'staff_2',
    name: 'KTV Ngọc Mai',
    role: 'Kỹ thuật viên Trưởng Spa & Trị liệu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    experience: '6 năm kinh nghiệm'
  },
  {
    id: 'staff_3',
    name: 'Artist Lan Hương',
    role: 'Nghệ nhân Nail Art & Nối Mi Thiết Kế',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    experience: '5 năm kinh nghiệm'
  }
];

export const INITIAL_SERVICES = [
  {
    id: 'b_s1',
    name: 'Trị Liệu Cổ Vai Gáy Chuyên Sâu Đá Nóng',
    category: 'spa',
    categoryLabel: 'Spa & Massage',
    duration: 60,
    price: 450000,
    deposit: 90000,
    isPopular: true,
    description: 'Ấn huyệt đả thông kinh lạc, chườm ngải cứu và đá bazan giải tỏa căng cơ vai cổ tức thì.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b_s2',
    name: 'Uốn Sóng Lơi Tự Nhiên + Phục Hồi Keratin',
    category: 'hair',
    categoryLabel: 'Tạo Mẫu Tóc',
    duration: 120,
    price: 850000,
    deposit: 150000,
    isPopular: true,
    description: 'Công nghệ uốn sóng nước Hàn Quốc mềm mại, tặng 1 lần dưỡng phục hồi keratin suôn mượt.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b_s3',
    name: 'Sơn Gel Hàn Quốc + Cắt Da Sửa Móng OPI',
    category: 'nail',
    categoryLabel: 'Nail & Mi',
    duration: 45,
    price: 180000,
    deposit: 50000,
    isPopular: true,
    description: 'Chăm sóc viền móng êm dịu, bảo hành màu sơn bóng bền đẹp 4 tuần không tróc.',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b_s4',
    name: 'Gội Đầu Dưỡng Sinh Trung Hoa 14 Bước',
    category: 'spa',
    categoryLabel: 'Spa & Massage',
    duration: 50,
    price: 250000,
    deposit: 50000,
    isPopular: false,
    description: 'Thư giãn vùng đầu với canh thảo dược, đắp mặt nạ ngọc trai và massage giải tỏa mệt mỏi.',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b_s5',
    name: 'Điện Di Tinh Chất Cá Hồi Căng Bóng Trẻ Hóa',
    category: 'skin',
    categoryLabel: 'Chăm Sóc Da',
    duration: 70,
    price: 650000,
    deposit: 130000,
    isPopular: false,
    description: 'Cấp ẩm đa tầng HA + DNA cá hồi hồi sinh làn da bóng khỏe, se khít lỗ chân lông.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b_s6',
    name: 'Combo Toàn Diện: Tóc Xinh + Nail Gel + Dưỡng Sinh',
    category: 'combo',
    categoryLabel: 'Combo Tiết Kiệm',
    duration: 150,
    price: 1100000,
    deposit: 200000,
    isPopular: true,
    description: 'Trọn gói làm đẹp hoàn hảo đón tuần mới, tiết kiệm 250.000đ so với đặt từng dịch vụ lẻ.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'BK-9921',
    serviceId: 'b_s1',
    serviceName: 'Trị Liệu Cổ Vai Gáy Chuyên Sâu Đá Nóng',
    staffName: 'KTV Ngọc Mai',
    date: '2026-10-04',
    time: '16:30',
    customerName: 'Nguyễn Thùy Linh',
    customerPhone: '0988 234 567',
    totalPrice: 450000,
    depositAmount: 90000,
    status: 'CONFIRMED', // CONFIRMED, COMPLETED, CANCELLED
    statusLabel: 'Đã xác nhận cọc',
    createdAt: '2026-10-04 10:15',
    hasReviewed: false
  },
  {
    id: 'BK-9922',
    serviceId: 'b_s3',
    serviceName: 'Sơn Gel Hàn Quốc + Cắt Da Sửa Móng OPI',
    staffName: 'Artist Lan Hương',
    date: '2026-10-04',
    time: '10:00',
    customerName: 'Trần Thị Mai Phương',
    customerPhone: '0912 345 678',
    totalPrice: 180000,
    depositAmount: 50000,
    status: 'CONFIRMED',
    statusLabel: 'Đã xác nhận cọc',
    createdAt: '2026-10-03 18:20',
    hasReviewed: false
  },
  {
    id: 'BK-9923',
    serviceId: 'b_s2',
    serviceName: 'Uốn Sóng Lơi Tự Nhiên + Phục Hồi Keratin',
    staffName: 'Master Minh Trí',
    date: '2026-10-05',
    time: '14:30',
    customerName: 'Lê Hoàng Yến',
    customerPhone: '0933 888 123',
    totalPrice: 850000,
    depositAmount: 170000,
    status: 'CONFIRMED',
    statusLabel: 'Đã xác nhận cọc',
    createdAt: '2026-10-03 21:05',
    hasReviewed: false
  },
  {
    id: 'BK-9924',
    serviceId: 'b_s4',
    serviceName: 'Gội Đầu Dưỡng Sinh Thảo Dược Chuẩn Trung Hoa',
    staffName: 'KTV Ngọc Mai',
    date: '2026-10-07',
    time: '09:00',
    customerName: 'Phạm Quỳnh Chi',
    customerPhone: '0977 456 789',
    totalPrice: 280000,
    depositAmount: 60000,
    status: 'CONFIRMED',
    statusLabel: 'Đã xác nhận cọc',
    createdAt: '2026-10-04 08:30',
    hasReviewed: false
  },
  {
    id: 'BK-9925',
    serviceId: 'b_s1',
    serviceName: 'Trị Liệu Cổ Vai Gáy Chuyên Sâu Đá Nóng',
    staffName: 'KTV Thảo Vy',
    date: '2026-10-10',
    time: '15:30',
    customerName: 'Vũ Bích Ngọc',
    customerPhone: '0909 112 233',
    totalPrice: 450000,
    depositAmount: 90000,
    status: 'CONFIRMED',
    statusLabel: 'Đã xác nhận cọc',
    createdAt: '2026-10-02 11:00',
    hasReviewed: false
  },
  {
    id: 'BK-9926',
    serviceId: 'b_s5',
    serviceName: 'Nhuộm Nâu Tây Ánh Khói + Phủ Bóng Collagen',
    staffName: 'Master Minh Trí',
    date: '2026-10-15',
    time: '13:30',
    customerName: 'Đặng Thu Thảo',
    customerPhone: '0981 777 999',
    totalPrice: 950000,
    depositAmount: 200000,
    status: 'CONFIRMED',
    statusLabel: 'Đã xác nhận cọc',
    createdAt: '2026-10-01 16:45',
    hasReviewed: false
  },
  {
    id: 'BK-8754',
    serviceId: 'b_s3',
    serviceName: 'Sơn Gel Hàn Quốc + Cắt Da Sửa Móng OPI',
    staffName: 'Artist Lan Hương',
    date: '2026-09-30',
    time: '10:00',
    customerName: 'Nguyễn Thùy Linh',
    customerPhone: '0988 234 567',
    totalPrice: 180000,
    depositAmount: 50000,
    status: 'COMPLETED',
    statusLabel: 'Đã hoàn thành',
    createdAt: '2026-09-29 14:20',
    hasReviewed: true,
    userRating: 5
  },
  {
    id: 'BK-7612',
    serviceId: 'b_s2',
    serviceName: 'Uốn Sóng Lơi Tự Nhiên + Phục Hồi Keratin',
    staffName: 'Master Minh Trí',
    date: '2026-09-25',
    time: '14:00',
    customerName: 'Nguyễn Thùy Linh',
    customerPhone: '0988 234 567',
    totalPrice: 850000,
    depositAmount: 150000,
    status: 'CANCELLED',
    statusLabel: 'Đã hủy & Hoàn cọc 100%',
    createdAt: '2026-09-23 09:10',
    hasReviewed: false
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'r1',
    author: 'Ngọc Mai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    serviceName: 'Trị Liệu Cổ Vai Gáy Chuyên Sâu Đá Nóng',
    serviceCategory: 'spa',
    rating: 5,
    date: '02/10/2026',
    comment: 'Không gian Tiệm B rất thơm mùi tinh dầu thảo mộc và yên tĩnh. Bạn KTV ấn huyệt cực kỳ có lực và đúng chỗ mỏi, sau 60p vai gáy nhẹ tênh!',
    tags: ['Kỹ thuật viên đỉnh', 'Không gian sạch sẽ', 'Thảo dược thơm'],
    status: 'APPROVED', // 'APPROVED' | 'FLAGGED' | 'HIDDEN'
    verifiedBooking: true,
    images: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80'
    ],
    shopReply: {
      text: 'Tiệm B xin cảm ơn chị Ngọc Mai rất nhiều ạ! Chúc chị luôn nhiều năng lượng và tiệm rất mong được đón tiếp chị ở những buổi trị liệu tiếp theo nhé.',
      date: '03/10/2026'
    }
  },
  {
    id: 'r2',
    author: 'Thu Hương',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    serviceName: 'Uốn Sóng Lơi Tự Nhiên + Phục Hồi Keratin',
    serviceCategory: 'hair',
    rating: 5,
    date: '28/09/2026',
    comment: 'Anh Trí cắt tạo form tóc bay và uốn sóng lơi siêu tự nhiên. Đi làm ai cũng khen trẻ ra mấy tuổi. Đặt cọc qua web đến nơi có thợ làm liền không phải chờ!',
    tags: ['Đúng giờ', 'Tóc đẹp như ý', 'Phục vụ chu đáo'],
    status: 'APPROVED',
    verifiedBooking: true,
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80'
    ],
    shopReply: {
      text: 'Dạ cảm ơn chị Hương ạ! Anh Trí và Tiệm B luôn sẵn sàng đồng hành cùng mái tóc bồng bềnh của chị. Chúc chị luôn tự tin!',
      date: '29/09/2026'
    }
  },
  {
    id: 'r3',
    author: 'Minh Hằng',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    serviceName: 'Sơn Gel Hàn Quốc + Cắt Da Sửa Móng OPI',
    serviceCategory: 'nail',
    rating: 5,
    date: '22/09/2026',
    comment: 'Mẫu móng vẽ tỉ mỉ từng chi tiết, thợ nhặt da rất êm không bị xước hay chảy máu. Trà dưỡng nhan của tiệm mời khách rất ngon. Sẽ ghé Tiệm B dài lâu.',
    tags: ['Mẫu vẽ đẹp', 'Trà ngon', 'Thợ tay nghề cao'],
    status: 'APPROVED',
    verifiedBooking: true,
    images: [
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=400&q=80'
    ],
    shopReply: null
  },
  {
    id: 'r4',
    author: 'Hoàng Yến',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    serviceName: 'Gội Đầu Dưỡng Sinh Thảo Dược Chuẩn Trung Hoa',
    serviceCategory: 'spa',
    rating: 4,
    date: '18/09/2026',
    comment: 'Kỹ thuật viên gội rất êm và thơm mùi bồ kết thảo mộc. Tuy nhiên cuối tuần hơi đông nên phòng massage hơi có tiếng ồn nhẹ từ sảnh ngoài. Còn lại mọi thứ đều rất chu đáo!',
    tags: ['Gội êm', 'Thảo mộc tự nhiên', 'Nên đặt trước'],
    status: 'APPROVED',
    verifiedBooking: true,
    images: [],
    shopReply: {
      text: 'Tiệm B xin chân thành ghi nhận phản hồi của chị Yến về việc cách âm cuối tuần ạ. Tiệm đã bổ sung cửa kính cách âm kép cho phòng gội để đảm bảo sự yên tĩnh tuyệt đối cho quý khách. Rất mong được đón tiếp chị lần sau!',
      date: '19/09/2026'
    }
  },
  {
    id: 'r-flagged-1',
    author: 'Nick Ảo (Tài khoản nghi vấn)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    serviceName: 'Trị Liệu Cổ Vai Gáy Chuyên Sâu Đá Nóng',
    serviceCategory: 'spa',
    rating: 1,
    date: '03/10/2026',
    comment: 'Tiệm làm tệ hại lừa đảo tiền cọc!!! Mọi người qua tiệm XYZ ở quận 3 làm rẻ hơn nhiều đừng tới đây...',
    tags: ['Cạnh tranh bẩn'],
    status: 'FLAGGED', // Đang bị báo cáo vi phạm chính sách cộng đồng
    moderationReason: 'Nghi vấn spam quảng cáo đối thủ & chứa nội dung vu khống vi phạm điều khoản Marketplace.',
    verifiedBooking: false,
    images: [],
    shopReply: null
  },
  {
    id: 'r-hidden-1',
    author: 'User Vi Phạm',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    serviceName: 'Sơn Gel Hàn Quốc + Cắt Da Sửa Móng OPI',
    serviceCategory: 'nail',
    rating: 1,
    date: '15/09/2026',
    comment: '[Nội dung đã bị ẩn do sử dụng từ ngữ thô tục, xúc phạm cá nhân thợ làm móng]',
    tags: ['Vi phạm quy tắc'],
    status: 'HIDDEN', // Đã bị nền tảng Marketplace ẩn
    moderationReason: 'Vi phạm quy định cộng đồng: Sử dụng ngôn từ xúc phạm danh dự nhân phẩm thợ làm nghề.',
    verifiedBooking: false,
    images: [],
    shopReply: null
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'reminder',
    title: 'Nhắc hẹn hôm nay tại Tiệm B',
    body: 'Bạn có lịch hẹn lúc 16:30 chiều nay tại Tiệm B (86 Pasteur, Q1). Vui lòng đến sớm 10 phút nhé!',
    time: '30 phút trước',
    read: false,
    bookingId: 'BK-9921'
  },
  {
    id: 'notif-2',
    type: 'payment',
    title: 'Đặt cọc thành công',
    body: 'Đã nhận khoản đặt cọc 90.000đ cho lịch hẹn #BK-9921 tại Tiệm B qua VietQR Sandbox.',
    time: '5 giờ trước',
    read: true,
    bookingId: 'BK-9921'
  },
  {
    id: 'notif-3',
    type: 'promo',
    title: 'Ưu đãi Thành Viên Tiệm B',
    body: 'Tặng voucher 100.000đ khi đăng ký Thẻ Thành Viên Gold VIP trong tháng này.',
    time: 'Hôm qua',
    read: true
  }
];

// Module f: Thẻ Thành Viên & Gói Liệu Trình của Tiệm B
export const MEMBERSHIP_CARDS = [
  {
    id: 'card_silver',
    name: 'Thẻ Bạc (Silver Member)',
    price: 500000,
    validity: '12 tháng',
    badge: 'Khách hàng Thân thiết',
    discount: '5%',
    discountPercent: 5,
    benefits: [
      'Giảm 5% toàn bộ menu dịch vụ Tiệm B',
      'Tặng 1 buổi gội đầu thảo dược sinh nhật',
      'Ưu tiên giữ khung giờ đặt trước'
    ],
    highlight: false
  },
  {
    id: 'card_gold',
    name: 'Thẻ Vàng (Gold VIP)',
    price: 1500000,
    validity: '12 tháng',
    badge: 'Phổ biến nhất tại Tiệm B',
    discount: '15%',
    discountPercent: 15,
    benefits: [
      'Giảm 15% tất cả dịch vụ làm đẹp tại Tiệm B',
      'Được quyền chọn Stylist / KTV trưởng miễn phí',
      'Tặng 1 liệu trình Cổ Vai Gáy trị giá 450K',
      'Phục vụ trà dưỡng nhan & bánh ngọt cao cấp'
    ],
    highlight: true
  },
  {
    id: 'card_diamond',
    name: 'Thẻ Kim Cương (Diamond VIP)',
    price: 3000000,
    validity: 'Trọn đời',
    badge: 'Thượng Khách Tiệm B',
    discount: '25%',
    discountPercent: 25,
    benefits: [
      'Giảm 25% trọn đời toàn bộ dịch vụ',
      'Phòng VIP riêng tư với chuyên gia trưởng',
      'Miễn phí hoàn cọc trong mọi trường hợp',
      'Tặng 2 buổi chăm sóc da chuyên sâu 1.300K'
    ],
    highlight: false
  }
];

export const INITIAL_VIP_MEMBERS = [
  {
    id: 'vip_1',
    cardCode: 'TB-DIA-001',
    tier: 'card_diamond',
    tierName: 'Thẻ Kim Cương (Diamond VIP)',
    fullName: 'Lê Hoàng Yến',
    phone: '0933 888 123',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    joinDate: '15/01/2025',
    expiryDate: 'Trọn đời',
    totalSpent: 18500000,
    visitsCount: 22,
    favoriteStaff: 'Master Minh Trí',
    note: 'Thích không gian phòng VIP riêng tư, uốn tóc sóng lơi Hàn Quốc, thích trà dưỡng nhan ít đường.',
    status: 'ACTIVE',
    benefitsUsed: 'Đã tặng 1 lần dưỡng phục hồi keratin'
  },
  {
    id: 'vip_2',
    cardCode: 'TB-GLD-002',
    tier: 'card_gold',
    tierName: 'Thẻ Vàng (Gold VIP)',
    fullName: 'Nguyễn Thùy Linh',
    phone: '0988 234 567',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    joinDate: '10/06/2025',
    expiryDate: '10/06/2027',
    totalSpent: 8900000,
    visitsCount: 12,
    favoriteStaff: 'KTV Ngọc Mai',
    note: 'Cổ vai gáy hay căng mỏi do ngồi văn phòng máy tính, ưu tiên massage đá bazan lực vừa phải.',
    status: 'ACTIVE',
    benefitsUsed: 'Đã nhận voucher sinh nhật'
  },
  {
    id: 'vip_3',
    cardCode: 'TB-GLD-003',
    tier: 'card_gold',
    tierName: 'Thẻ Vàng (Gold VIP)',
    fullName: 'Trần Thị Mai Phương',
    phone: '0912 345 678',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    joinDate: '20/07/2025',
    expiryDate: '20/07/2027',
    totalSpent: 6450000,
    visitsCount: 9,
    favoriteStaff: 'Artist Lan Hương',
    note: 'Rất mê vẽ móng gel nghệ thuật tông nude & pastel, thường đặt lịch vào sáng Chủ Nhật.',
    status: 'ACTIVE',
    benefitsUsed: 'Tặng 1 buổi chăm sóc viền móng OPI'
  },
  {
    id: 'vip_4',
    cardCode: 'TB-DIA-004',
    tier: 'card_diamond',
    tierName: 'Thẻ Kim Cương (Diamond VIP)',
    fullName: 'Đặng Thu Thảo',
    phone: '0981 777 999',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    joinDate: '01/03/2025',
    expiryDate: 'Trọn đời',
    totalSpent: 24600000,
    visitsCount: 28,
    favoriteStaff: 'Master Minh Trí',
    note: 'Thường xuyên nhuộm phục hồi keratin và điện di tế bào gốc cá hồi. Luôn chuẩn bị phòng riêng.',
    status: 'ACTIVE',
    benefitsUsed: 'Đã dùng 1/2 buổi chăm sóc da chuyên sâu'
  },
  {
    id: 'vip_5',
    cardCode: 'TB-SLV-005',
    tier: 'card_silver',
    tierName: 'Thẻ Bạc (Silver Member)',
    fullName: 'Phạm Quỳnh Chi',
    phone: '0977 456 789',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    joinDate: '05/08/2025',
    expiryDate: '05/08/2027',
    totalSpent: 3200000,
    visitsCount: 5,
    favoriteStaff: 'KTV Ngọc Mai',
    note: 'Khách thích gội dưỡng sinh 14 bước thảo dược thiên nhiên ấm áp.',
    status: 'ACTIVE',
    benefitsUsed: 'Đã kích hoạt ưu đãi đặt hẹn ưu tiên'
  },
  {
    id: 'vip_6',
    cardCode: 'TB-SLV-006',
    tier: 'card_silver',
    tierName: 'Thẻ Bạc (Silver Member)',
    fullName: 'Vũ Bích Ngọc',
    phone: '0909 112 233',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    joinDate: '12/09/2025',
    expiryDate: '12/09/2027',
    totalSpent: 2800000,
    visitsCount: 4,
    favoriteStaff: 'Chuyên viên ngẫu nhiên',
    note: 'Thích thử nghiệm các gói dịch vụ mới vào các dịp cuối tuần.',
    status: 'EXPIRING_SOON',
    benefitsUsed: 'Chưa sử dụng ưu đãi sinh nhật'
  }
];

export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '13:30', '14:30', '15:30', '16:30', '17:30', '18:30', '19:30'
];
