/**
 * Cấu hình nội dung & sự kiện tập trung — CHƯƠNG CUỐI
 *
 * Thay thế các trường [ĐIỀN_THÔNG_TIN] và đường dẫn ảnh `src`
 * (ví dụ '/assets/hero-portrait.webp') khi bạn đã sẵn sàng ảnh và thông tin chính thức.
 */

export const eventConfig = {
  project: {
    title: 'MỘT CHƯƠNG RỰC RỠ',
    subtitleEn: 'THE LAST CHAPTER',
    tagline: 'Mỗi cái kết đều là một khởi đầu mới.',
    monogram: 'TL',
    establishedYear: '2022',
    graduationYear: '2026',
    experience: {
      enable3D: true,
      enableSound: false,
    },
  },

  graduate: {
    fullName: 'Mai Phan Thảo Linh',
    shortName: 'Thảo Linh',
    degree: '[CHUYÊN_NGÀNH]',
    university: 'Trường Đại học Quốc tế – ĐHQG-HCM (HCMIU)',
    classLabel: 'NIÊN KHÓA 2022 – 2026',
    signatureText: 'Mai Phan Thảo Linh',
  },

  prelude: {
    eyebrow: 'MỘT KHOẢNH KHẮC ĐÁNG ĐỂ SẺ CHIA',
    genericRecipientLine: 'Một tấm thiệp đặc biệt dành riêng cho bạn',
    personalizedPrefix: 'Thân gửi',
    ctaLabel: 'Chạm để mở thiệp mời',
    skipLabel: 'Bỏ qua phần mở đầu',
    sealMonogram: '26',
  },

  hero: {
    headlineLines: ['MỘT CHƯƠNG', 'RỰC RỠ'],
    supportingLine: 'Bốn năm thanh xuân. Ngàn mảnh ký ức. Một ngày thật đáng nhớ.',
    scrollHint: 'Cuộn xuống để bắt đầu câu chuyện',
    transitionLine: 'Có những câu chuyện sinh ra là để nhớ mãi về sau.',
    portrait: {
      src: '/assets/graduate-hero.jpg',
      alt: 'Mai Phan Thảo Linh trong trang phục lễ tốt nghiệp',
      aspectRatio: '3 / 2',
      recommendedSpec: 'PUBLIC/ASSETS/GRADUATE-HERO.JPG · 3:2',
      mood: 'hero-noir',
      plateLabel: 'BẢN IN 00 / CHÂN DUNG',
    },
  },

  story: {
    eyebrow: 'PHẦN 02 · KỶ YẾU HÀNH TRÌNH',
    headingLines: ['BỐN NĂM,', 'NGÀN KỶ NIỆM.'],
    subtitle: 'Từ những bỡ ngỡ đầu tiên, những thành quả nho nhỏ, đến từng khoảnh khắc chẳng thể nào quên.',
    chapters: [
      {
        id: 'chapter-01',
        number: '01',
        title: 'Khởi Đầu',
        period: '2022 — MÙA THU ĐẦU TIÊN',
        layout: 'full-landscape',
        description:
          'Lần đầu bước qua cánh cổng đại học với đôi chút bỡ ngỡ, những gương mặt mới quen và niềm háo hức trước trang giấy trắng của tuổi đôi mươi.',
        quote: '“Mọi hành trình dài đều bắt đầu từ một bước chân đầy hồi hộp.”',
        image: {
          src: '/assets/photo-01.jpg',
          alt: 'Mai Phan Thảo Linh với dải choàng tốt nghiệp HCMIU bên hành lang nắng',
          aspectRatio: '3 / 2',
          recommendedSpec: 'CHƯƠNG 01 · 3:2',
          mood: 'warm-sepia',
          plateLabel: 'ẢNH 01 · THU 2022',
        },
      },
      {
        id: 'chapter-02',
        number: '02',
        title: 'Tìm Thấy Chính Mình',
        period: '2023 — NHỮNG ĐÊM THỨC TRẮNG & TRƯỞNG THÀNH',
        layout: 'asymmetric-split',
        description:
          'Những đêm chạy deadline bên ly cà phê nguội, những đồ án mãi 2 giờ sáng mới hoàn thành, và hành trình học cách tin vào lựa chọn của bản thân.',
        annotation: 'Bốn năm lớn lên dưới hàng cột trắng đầy nắng.',
        image: {
          src: '/assets/photo-02.jpg',
          alt: 'Mai Phan Thảo Linh dưới hàng cột trắng trong ánh nắng sớm',
          aspectRatio: '3 / 4',
          recommendedSpec: 'CHƯƠNG 02 · 3:4',
          mood: 'editorial-slate',
          plateLabel: 'ẢNH 02 · LƯU TRỮ 2023',
        },
      },
      {
        id: 'chapter-03',
        number: '03',
        title: 'Những Điều Nhỏ Bé',
        period: '2024 — KHOẢNH KHẮC ĐỜI THƯỜNG',
        layout: 'polaroid-wall',
        description:
          'Tiếng cười giòn tan giữa giờ giải lao, những buổi chiều đầy nắng trên bãi cỏ xanh và những người bạn đã biến giảng đường thành ngôi nhà thứ hai.',
        image: {
          src: '/assets/photo-03.jpg',
          alt: 'Mai Phan Thảo Linh ngồi trên bãi cỏ xanh ngập nắng trong lễ phục tốt nghiệp',
          aspectRatio: '4 / 3',
          recommendedSpec: 'CHƯƠNG 03 · 4:3',
          mood: 'golden-hour',
          plateLabel: 'ẢNH 03 · 2024',
        },
        accentImages: [
          {
            src: '/assets/photo-04.jpg',
            alt: 'Nụ cười rạng rỡ tinh nghịch bên hành lang',
            caption: 'Một chút tinh nghịch giữa ngày nắng',
            date: '14.10.24',
            mood: 'warm-film',
            recommendedSpec: '4:5',
          },
          {
            src: '/assets/photo-05.jpg',
            alt: 'Chân dung studio chạm nhẹ vành mũ tốt nghiệp',
            caption: 'Chạm nhẹ vành mũ cử nhân',
            date: '02.12.24',
            mood: 'burgundy-tint',
            recommendedSpec: '4:5',
          },
          {
            src: '/assets/photo-06.jpg',
            alt: 'Khoảnh khắc dịu dàng dưới nắng chiều hành lang',
            caption: 'Nắng chiều ghé qua hành lang quen',
            date: '19.05.25',
            mood: 'editorial-slate',
            recommendedSpec: '4:5',
          },
        ],
      },
      {
        id: 'chapter-04',
        number: '04',
        title: 'Năm Cuối',
        period: '2025–2026 — VẠCH ĐÍCH THANH XUÂN',
        layout: 'dramatic-spread',
        description:
          'Những bản nháp khóa luận, kỳ thi cuối cùng, những bước chân chậm lại qua sân trường quen thuộc và cảm giác bốn năm trôi qua nhanh như một cái chớp mắt.',
        quote: '“Lúc ấy ta đâu hay mình đang tạo nên kỷ niệm, ta chỉ biết mình đã sống trọn từng ngày.”',
        image: {
          src: '/assets/photo-06.jpg',
          alt: 'Chân dung Mai Phan Thảo Linh trong ánh nắng chiều năm cuối',
          aspectRatio: '3 / 2',
          recommendedSpec: 'CHƯƠNG 04 · 3:2',
          mood: 'cinematic-dusk',
          plateLabel: 'ẢNH 04 · 2026',
        },
      },
    ],
  },

  gallery: {
    eyebrow: 'GÓC LƯU TRỮ · KHOẢNH KHẮC CHỌN LỌC',
    title: 'Những Khung Hình Còn Mãi',
    subtitle: 'Chạm vào từng tấm ảnh Polaroid để xem lớn. Trên máy tính, bạn có thể kéo nhẹ để sắp xếp lại.',
    items: [
      {
        id: 'mem-01',
        src: '/assets/photo-01.jpg',
        caption: 'Nụ cười dịu dàng cùng dải choàng HCMIU',
        date: 'NIÊN KHÓA 2022–2026',
        rotation: -5,
        mood: 'warm-sepia',
        recommendedSpec: '3:2',
      },
      {
        id: 'mem-02',
        src: '/assets/photo-02.jpg',
        caption: 'Sải bước dưới hàng cột trắng đầy nắng',
        date: 'THANH XUÂN',
        rotation: 4,
        mood: 'editorial-slate',
        recommendedSpec: '2:3',
      },
      {
        id: 'mem-03',
        src: '/assets/photo-03.jpg',
        caption: 'Chiều nắng nhẹ trên thảm cỏ xanh',
        date: 'KỶ NIỆM',
        rotation: -3,
        mood: 'golden-hour',
        recommendedSpec: '3:2',
      },
      {
        id: 'mem-04',
        src: '/assets/photo-04.jpg',
        caption: 'Một khoảnh khắc thật hồn nhiên',
        date: 'TUỔI ĐÔI MƯƠI',
        rotation: 6,
        mood: 'burgundy-tint',
        recommendedSpec: '3:2',
      },
      {
        id: 'mem-05',
        src: '/assets/photo-05.jpg',
        caption: 'Chính thức chạm tay vào cột mốc mới',
        date: 'CHÂN DUNG STUDIO',
        rotation: -4,
        mood: 'warm-film',
        recommendedSpec: '2:3',
      },
      {
        id: 'mem-06',
        src: '/assets/photo-07.jpg',
        caption: 'Nụ cười rạng rỡ nhất cho ngày tốt nghiệp',
        date: 'THÁNG 11 · 2026',
        rotation: 3,
        mood: 'cinematic-dusk',
        recommendedSpec: '3:2',
      },
    ],
  },

  moment: {
    eyebrow: 'PHẦN 03 · KHOẢNH KHẮC TỎA SÁNG',
    preludeLines: ['VÀ RỒI,', 'NGÀY ẤY CŨNG ĐẾN.'],
    headline: 'MÌNH LÀM ĐƯỢC RỒI.',
    subline: 'Và mình thật sự mong được chia sẻ niềm vui này cùng bạn.',
    tossHint: 'Chạm vào mũ tốt nghiệp để tung lại',
  },

  ceremony: {
    eyebrow: 'PHẦN 04 · THIỆP MỜI',
    leadLine: 'TRÂN TRỌNG KÍNH MỜI',
    subLeadLine: 'ĐẾN CHUNG VUI TRONG LỄ TỐT NGHIỆP CỦA',
    isoStart: '2026-11-29T12:30:00',
    isoEnd: '2026-11-29T13:30:00',
    timezone: 'Asia/Ho_Chi_Minh',
    displayDateDay: '29',
    displayDateMonthYear: 'THÁNG 11 · 2026',
    displayWeekday: 'CHỦ NHẬT',
    displayDateFull: 'Chủ Nhật, 29/11/2026',
    startTime: '12:30 – 13:30',
    venueName: 'Hội trường Trần Chí Đạo, Nhà Điều hành ĐHQG-HCM',
    fullAddress: 'Phường Linh Xuân, TP.HCM',
    dressCode: 'Lịch sự · Tông trắng kem, đen hoặc xanh navy',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=H%E1%BB%99i+tr%C6%B0%E1%BB%9Dng+Tr%E1%BA%A7n+Ch%C3%AD+%C4%90%E1%BA%A1o+Nh%C3%A0+%C4%90i%E1%BB%81u+h%C3%A0nh+%C4%90HQG-HCM+Ph%C6%B0%E1%BB%9Dng+Linh+Xu%C3%A2n+TP.HCM',
    notes: [
      {
        label: 'Thời gian có mặt',
        detail: 'Bạn nên đến sớm khoảng 15–20 phút để gửi xe và chụp ảnh cùng Thảo Linh trước giờ làm lễ nhé.',
      },
      {
        label: 'Hẹn chụp ảnh',
        detail: 'Ngay sau khung giờ lễ (12:30 – 13:30), mình sẽ có mặt tại sảnh và khuôn viên Nhà Điều hành để chụp ảnh cùng gia đình & bạn bè.',
      },
      {
        label: 'Liên hệ',
        detail: '[SỐ_ĐIỆN_THOẠI] (Gọi điện / Zalo / Messenger)',
      },
    ],
  },

  seeYouThere: {
    eyebrow: 'PHẦN 05 · HẸN GẶP NHAU',
    headingLines: ['THÊM MỘT KỶ NIỆM,', 'CÓ BẠN TRONG ĐÓ.'],
    subtitle:
      'Nếu bạn sắp xếp được thời gian ghé qua, cứ nhắn nhẹ cho mình một tiếng nhé — mình rất mong được chụp cùng bạn vài tấm hình thật đẹp.',
    countdownLabel: 'ĐẾM NGƯỢC ĐẾN NGÀY LỄ',
    countdownEndedText: 'Ngày lễ tốt nghiệp đã đến — hẹn gặp bạn tại khuôn viên trường!',
    keepsakeTitle: 'Tạo Thẻ Mời Kỷ Niệm',
    keepsakeNote:
      'Nhập tên của bạn để lưu riêng một tấm thẻ mời kỷ niệm (xử lý hoàn toàn trên trình duyệt của bạn).',
    // Cấu hình các kênh liên hệ trực tiếp (để trống chuỗi '' nếu không muốn hiển thị nút đó)
    contacts: [
      {
        id: 'messenger',
        label: 'Nhắn qua Messenger',
        href: 'https://m.me/your-username',
        primary: true,
      },
      {
        id: 'zalo',
        label: 'Nhắn qua Zalo',
        href: 'https://zalo.me/0900000000',
        primary: false,
      },
      {
        id: 'phone',
        label: 'Gọi trực tiếp',
        href: 'tel:+84900000000',
        primary: false,
      },
      {
        id: 'email',
        label: 'Gửi Email',
        href: 'mailto:your-email@example.com?subject=Ch%C3%BAc%20m%E1%BB%ABng%20t%E1%BB%91t%20nghi%E1%BB%87p!',
        primary: false,
      },
    ],
  },

  epilogue: {
    eyebrow: 'PHẦN 06 · LỜI KẾT',
    headlineLines: ['KHÉP LẠI MỘT CHƯƠNG.', 'MỞ RA VẠN ĐIỀU MỚI.'],
    supportingCopy: 'Cảm ơn bạn vì đã là một phần thật đẹp trong câu chuyện của mình.',
    portrait: {
      src: '/assets/photo-07.jpg',
      alt: 'Nụ cười rạng rỡ của Mai Phan Thảo Linh trong ngày tốt nghiệp',
      aspectRatio: '3 / 2',
      recommendedSpec: 'ẢNH KẾT · 3:2',
      mood: 'cinematic-dusk',
      plateLabel: 'BẢN IN CUỐI · KHÓA 2026',
    },
  },
};
