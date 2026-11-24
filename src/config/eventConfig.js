/**
 * Cấu hình nội dung & sự kiện tập trung — MỘT CHƯƠNG RỰC RỠ
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
    degree: 'Cử nhân',
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
    scrollHint: 'Cuộn xuống để tiếp tục',
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

  moment: {
    eyebrow: 'PHẦN 02 · KHOẢNH KHẮC TỎA SÁNG',
    preludeLines: ['VÀ RỒI,', 'NGÀY ẤY CŨNG ĐẾN.'],
    headline: 'MÌNH LÀM ĐƯỢC RỒI.',
    subline: 'Và mình thật sự mong được chia sẻ niềm vui này cùng bạn.',
    tossHint: 'Chạm vào mũ tốt nghiệp để tung lại',
  },

  ceremony: {
    eyebrow: 'PHẦN 03 · THIỆP MỜI',
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
    contactText: '0966099132 (Gọi điện / Zalo / Messenger)',
    metroGuide: 'Metro ĐHQG → Xe bus 166, 170 → Nhà Điều hành ĐHQG → Đi bộ vào trong',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=H%E1%BB%99i+tr%C6%B0%E1%BB%9Dng+Tr%E1%BA%A7n+Ch%C3%AD+%C4%90%E1%BA%A1o+Nh%C3%A0+%C4%90i%E1%BB%81u+h%C3%A0nh+%C4%90HQG-HCM+Ph%C6%B0%E1%BB%9Dng+Linh+Xu%C3%A2n+TP.HCM',
  },

  story: {
    eyebrow: 'PHẦN 04 · KỶ YẾU HÀNH TRÌNH',
    headingLines: ['BỐN NĂM,', 'NGÀN KỶ NIỆM.'],
    subtitle:
      'Từ những bỡ ngỡ đầu tiên, những thành quả nho nhỏ, đến từng khoảnh khắc chẳng thể nào quên.',
    chapters: [
      {
        id: 'chapter-01',
        number: '01',
        title: 'Khởi Đầu',
        period: '2022 — MÙA THU ĐẦU TIÊN',
        description:
          'Lần đầu bước qua cánh cổng đại học với đôi chút bỡ ngỡ, những gương mặt mới quen và niềm háo hức trước trang giấy trắng của tuổi đôi mươi.',
        quote: '“Mọi hành trình dài đều bắt đầu từ một bước chân đầy hồi hộp.”',
      },
      {
        id: 'chapter-02',
        number: '02',
        title: 'Tìm Thấy Chính Mình',
        period: '2023 — NHỮNG ĐÊM THỨC TRẮNG & TRƯỞNG THÀNH',
        description:
          '“Những ngày thi học bài tới sáng, những đêm dài chạy deadline mãi mới hoàn thành và hành trình học cách tin vào lựa chọn của bản thân.”',
      },
      {
        id: 'chapter-03',
        number: '03',
        title: 'Những Điều Nhỏ Bé',
        period: '2024 — KHOẢNH KHẮC ĐỜI THƯỜNG',
        description:
          '“Tiếng cười giòn tan giữa giờ giải lao, những buổi học cùng thầy cô đáng nhớ và những người bạn đã biến giảng đường thành ngôi nhà thứ hai.”',
      },
      {
        id: 'chapter-04',
        number: '04',
        title: 'Năm Cuối',
        period: '2025–2026 — VẠCH ĐÍCH THANH XUÂN',
        description:
          'Những bản nháp khóa luận, kỳ thi cuối cùng, những bước chân chậm lại qua sân trường quen thuộc và cảm giác bốn năm trôi qua nhanh như một cái chớp mắt.',
        quote:
          '“Lúc ấy ta đâu hay mình đang tạo nên kỷ niệm, ta chỉ biết mình đã sống trọn từng ngày.”',
      },
    ],
  },

  gallery: {
    eyebrow: 'GÓC LƯU TRỮ',
    title: 'Cuốn Phim Kỷ Yếu',
    subtitle:
      'Chạm vào từng tấm ảnh Polaroid để xem lớn. Trên máy tính, bạn có thể kéo nhẹ để sắp xếp lại.',
    items: [
      {
        id: 'mem-01',
        src: '/assets/photo-01.jpg',
        alt: 'Ảnh kỷ yếu 01 — Mai Phan Thảo Linh',
        rotation: -4,
        mood: 'warm-sepia',
      },
      {
        id: 'mem-02',
        src: '/assets/photo-02.jpg',
        alt: 'Ảnh kỷ yếu 02 — Mai Phan Thảo Linh',
        rotation: 3.5,
        mood: 'editorial-slate',
      },
      {
        id: 'mem-03',
        src: '/assets/photo-03.jpg',
        alt: 'Ảnh kỷ yếu 03 — Mai Phan Thảo Linh',
        rotation: -2.5,
        mood: 'golden-hour',
      },
      {
        id: 'mem-04',
        src: '/assets/photo-04.jpg',
        alt: 'Ảnh kỷ yếu 04 — Mai Phan Thảo Linh',
        rotation: 4.5,
        mood: 'burgundy-tint',
      },
      {
        id: 'mem-05',
        src: '/assets/photo-05.jpg',
        alt: 'Ảnh kỷ yếu 05 — Mai Phan Thảo Linh',
        rotation: -3.5,
        mood: 'warm-film',
      },
      {
        id: 'mem-06',
        src: '/assets/photo-06.jpg',
        alt: 'Ảnh kỷ yếu 06 — Mai Phan Thảo Linh',
        rotation: 3,
        mood: 'cinematic-dusk',
      },
      {
        id: 'mem-07',
        src: '/assets/photo-07.jpg',
        alt: 'Ảnh kỷ yếu 07 — Mai Phan Thảo Linh',
        rotation: -2,
        mood: 'cinematic-dusk',
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
