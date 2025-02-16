const navMenu = [
  { name: 'Главная', link: '/' },
  { name: 'Трепанг', link: '/trepang' },
  { name: 'О нас', link: '/about' },
  { name: 'Доставка', link: '/delivery' },
];

export const useNavList = () => {
  return navMenu;
};

const goodsList = [
  {
    id: 1,
    name: 'Трепанг на меду',
    description: '',
    wbUrl: 'https://www.wildberries.ru/catalog/250511457/detail.aspx',
    ozonUrl: 'https://www.ozon.ru/context/detail/id/222073067/',
    price: 7399,
    discount: 63, // в процентах
    slug: '',
    images: [
      '/images/goods/dp1.webp',
      '/images/goods/dp1-2.webp',
      '/images/goods/dp1-3.webp',
      '/images/goods/dp1-4.webp',
      '/images/goods/dp1-5.webp',
    ],
  },
  {
    id: 2,
    name: 'Трепанг в капсулах',
    description: '',
    list: [],
    wbUrl:
      'https://www.wildberries.ru/catalog/256311216/detail.aspx?targetUrl=EX',
    price: 5999,
    discount: 21, // в процентах
    slug: '',
    images: [
      '/images/goods/dp2.webp',
      '/images/goods/dp2-2.webp',
      '/images/goods/dp2-3.webp',
      '/images/goods/dp2-4.webp',
      '/images/goods/dp2-5.webp',
      '/images/goods/dp2-6.webp',
    ],
  },
  {
    id: 3,
    name: 'Экстракт трепанга',
    description: '',
    list: [],
    wbUrl:
      'https://www.wildberries.ru/catalog/250540124/detail.aspx?targetUrl=EX',
    price: 2700,
    discount: 50, // в процентах
    slug: '',
    images: [
      '/images/goods/dp3.webp',
      '/images/goods/dp3-2.webp',
      '/images/goods/dp3-3.webp',
      '/images/goods/dp3-4.webp',
      '/images/goods/dp3-5.webp',
    ],
  },
  {
    id: 4,
    name: 'Икра морского ежа',
    description: '',
    list: [],
    price: 3899,
    discount: 35, // в процентах
    wbUrl:
      'https://www.wildberries.ru/catalog/256315343/detail.aspx?targetUrl=EX',
    slug: '',
    images: [
      '/images/goods/dp4.webp',
      '/images/goods/dp4-2.webp',
      '/images/goods/dp4-3.webp',
      '/images/goods/dp4-4.webp',
      '/images/goods/dp4-5.webp',
    ],
  },
  {
    id: 5,
    name: 'Трепанг сушеный',
    description: '',
    list: [],
    price: 30500,
    discount: 0, // в процентах
    wbUrl:
      'https://www.wildberries.ru/catalog/268048494/detail.aspx?targetUrl=EX',
    slug: '',
    images: ['/images/goods/dp5.webp', '/images/goods/dp5-2.webp'],
  },
  {
    id: 6,
    name: 'Морской коллаген',
    description: '',
    list: [],
    price: 5999,
    discount: 60, // в процентах
    wbUrl:
      'https://www.wildberries.ru/catalog/250076234/detail.aspx?targetUrl=EX',
    slug: '',
    images: [
      '/images/goods/dp6.webp',
      '/images/goods/dp6-2.webp',
      '/images/goods/dp6-3.webp',
      '/images/goods/dp6-4.webp',
    ],
  },
  {
    id: 7,
    name: 'Экстракт плоского ежа',
    description: '',
    list: [],
    price: 3599,
    discount: 0, // в процентах
    wbUrl:
      'https://www.wildberries.ru/catalog/261663755/detail.aspx?targetUrl=EX',
    slug: '',
    images: [
      '/images/goods/dp7-1.webp',
      '/images/goods/dp7-2.webp',
      '/images/goods/dp7-3.webp',
      '/images/goods/dp7-4.webp',
    ],
  },
];

export const useGoodsData = (slug?: string) => {
  // Если slug не передан, возвращаем весь массив
  if (!slug) {
    return goodsList;
  }

  // Находим объект с заданным значением slug
  const foundObject = goodsList.find((item) => item.slug === slug);

  // Возвращаем найденный объект или null, если не найдено
  return foundObject || null;
};
