export const FIREBASE_URL = "https://yonz-official-93371-default-rtdb.firebaseio.com";
export const FIREBASE_TOKEN = "";

export const PAYMENT_CFG = {
  dana: { active: true, no: '6285814369350', name: '' },
  gopay: { active: true, no: '6285814369350', name: '' },
  ovo: { active: true, no: '6285814369350', name: '' },
  qris: {
    active: true,
    url: 'https://img2.pixhost.to/images/7943/727036977_elaina-1778940968296.jpg',
    name: ''
  },
  bank: { active: false, bankName: '', no: '', name: '' },
  'wa-confirm': true,
  'show-all': true,
  afterMsg: ''
};

export const ADMIN_WA = '6285814369350';
export const STORE_NAME = 'Sanz Store';
export const PRODUCT_LABEL = 'SANZ STORE';
export const WA_DEFAULT_MESSAGE = 'Halo Admin Sanz Store, saya ingin bertanya / memesan produk 🙏';

export const DEFAULT_PRODUCTS = [
  {
    id: 'sewa-bot',
    cat: 'bot-wa',
    title: 'Sewa Bot WA',
    imgClass: 'bot',
    imgTitle: 'SEWA BOT MULTIDEVICE PREMIUM',
    imgUrl: '',
    price: 'Rp500',
    available: 'Tersedia hingga Rp40.000',
    desc: 'Sewa bot WhatsApp dengan 1800+ fitur aktif untuk menjaga dan meramaikan grup kamu.',
    varians: [
      { name: '1 hari', price: 'Rp500' },
      { name: '3 hari', price: 'Rp2.000' },
      { name: '5 hari', price: 'Rp3.500' },
      { name: '7 hari', price: 'Rp4.000' },
      { name: '14 hari', price: 'Rp6.000' },
      { name: '1 bulan', price: 'Rp7.000' },
      { name: '3 bulan', price: 'Rp26.000' },
      { name: '1 tahun', price: 'Rp40.000' }
    ],
    features: [
      { icon: '💬', name: 'Bot WhatsApp', desc: 'Bot aktif langsung di grup kamu' },
      { icon: '🔄', name: 'Aktivasi Cepat', desc: 'Bot masuk grup setelah bayar' },
      { icon: '⚡', name: 'Fitur Lengkap', desc: '1800+ command aktif' },
      { icon: '🛡️', name: 'Support 24/7', desc: 'CS siap bantu kapan saja' }
    ]
  },
  {
    id: 'panel',
    cat: 'panel',
    title: 'Panel Bot WA',
    imgClass: 'panel',
    imgTitle: 'PANEL PTERODACTYL PREMIUM',
    imgUrl: '',
    price: 'Rp2.000',
    available: 'Tersedia hingga Rp50.000',
    desc: 'Panel pterodactyl premium menggunakan VPS legal, aktif hingga 1 bulan penuh.',
    varians: [
      { name: '1 minggu', price: 'Rp2.000' },
      { name: '2 minggu', price: 'Rp4.000' },
      { name: '1 bulan', price: 'Rp7.000' },
      { name: '2 bulan', price: 'Rp12.000' },
      { name: 'Permanen', price: 'Rp50.000' }
    ],
    features: [
      { icon: '🖥️', name: 'VPS Legal', desc: 'VPS berlisensi resmi' },
      { icon: '⚡', name: 'Performa Tinggi', desc: 'Uptime 99.9% dijamin' },
      { icon: '🔒', name: 'Aman & Stabil', desc: 'Tidak pernah down sembarangan' },
      { icon: '🛡️', name: 'Support 24/7', desc: 'CS siap bantu kapan saja' }
    ]
  },
  {
    id: 'script',
    cat: 'source-code',
    title: 'Source Code Bot WA',
    imgClass: 'sc',
    imgTitle: 'SOURCE CODE BOT WA PREMIUM',
    imgUrl: '',
    price: 'Rp75.000',
    available: 'Tersedia: Unlimited',
    desc: 'Source code bot WhatsApp premium dengan 1800+ fitur lengkap, tanpa enkripsi, siap pakai.',
    varians: [
      { name: 'Download', price: 'Rp75.000' }
    ],
    features: [
      { icon: '📦', name: 'Full Script', desc: 'Kode lengkap tanpa enkripsi' },
      { icon: '🔄', name: 'Update Gratis', desc: 'Dapat update versi terbaru' },
      { icon: '⚙️', name: '1800+ Fitur', desc: 'Menu all, game, fun, search' },
      { icon: '🛡️', name: 'Support Setup', desc: 'Bantuan instalasi oleh CS' }
    ]
  }
];
