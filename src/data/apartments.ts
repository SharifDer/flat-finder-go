
export interface Apartment {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string; // This represents 'address' in the schema
  images: string[];
  bedrooms: number; // This represents 'number_of_rooms' in the schema
  bathrooms: number; // This represents 'number_of_bathrooms' in the schema
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  available: boolean; // This represents 'status' in the schema
  dateAvailable: string;
  type: string;
}

export const apartments: Apartment[] = [
  {
    id: '1',
    title: 'شقة حديثة وسط المدينة',
    description: 'شقة مشرقة وواسعة وسط المدينة مع إطلالات رائعة على المدينة. تتميز هذه الوحدة المجددة حديثًا بأرضيات خشبية، وأجهزة من الفولاذ المقاوم للصدأ، ونوافذ كبيرة تملأ المساحة بالضوء الطبيعي. تقع في موقع مركزي مع سهولة الوصول إلى وسائل النقل العام والمطاعم والتسوق.',
    price: 130000,
    location: 'شارع الزبيري، وسط المدينة، صنعاء',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1630699144867-37acec97df5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    bedrooms: 2,
    bathrooms: 1,
    contactName: 'محمد علي',
    contactEmail: 'mohammed@example.com',
    contactPhone: '777 123 456',
    available: true,
    dateAvailable: '01-06-2024',
    type: 'شقة',
  },
  {
    id: '2',
    title: 'استديو مريح في منطقة حدة',
    description: 'شقة استديو ساحرة في حي هادئ مع مرافق رائعة. تشمل هذه الوحدة المريحة مطبخًا مجهزًا بالكامل، وحلول تخزين مدمجة، والوصول إلى حديقة مشتركة. مثالية للمهني أو الطالب الذي يبحث عن سكن بأسعار معقولة في موقع مناسب.',
    price: 50000,
    location: 'شارع القاهرة، حدة، صنعاء',
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1585129777188-9c5d2876bd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
    ],
    bedrooms: 0,
    bathrooms: 1,
    contactName: 'سارة الأحمد',
    contactEmail: 'sara@example.com',
    contactPhone: '734 987 654',
    available: true,
    dateAvailable: '15-05-2024',
    type: 'استديو',
  },
  {
    id: '3',
    title: 'شقة فاخرة 3 غرف نوم مع شرفة',
    description: 'شقة رائعة من 3 غرف نوم مع تشطيبات راقية وشرفة خاصة. تتميز هذه الوحدة الفاخرة بمطبخ فاخر مع أسطح رخامية، وحمامات على طراز المنتجعات، وخزائن ملابس، ونوافذ من الأرض إلى السقف. تقدم الشرفة الخاصة الكبيرة مناظر بانورامية وهي مثالية للترفيه.',
    price: 15000,
    location: 'شارع الستين، النهضة، صنعاء',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80',
      'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    bedrooms: 3,
    bathrooms: 2,
    contactName: 'أحمد الهاشمي',
    contactEmail: 'ahmed@example.com',
    contactPhone: '771 456 789',
    available: true,
    dateAvailable: '15-06-2024',
    type: 'شقة',
  },
  {
    id: '4',
    title: 'شقة مجددة غرفة نوم واحدة مع حديقة',
    description: 'شقة مجددة بشكل جميل من غرفة نوم واحدة مع وصول مباشر إلى حديقة مشتركة. تتميز هذه الوحدة الساحرة بمطبخ عصري وحمام محدث ومساحة معيشة مشرقة. تقع في حي سكني هادئ مع سهولة الوصول إلى الحدائق والمقاهي ووسائل النقل العام.',
    price: 90000,
    location: 'شارع تعز، الروضة، صنعاء',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
    ],
    bedrooms: 1,
    bathrooms: 1,
    contactName: 'ليلى القاضي',
    contactEmail: 'laila@example.com',
    contactPhone: '713 234 567',
    available: true,
    dateAvailable: '01-05-2024',
    type: 'شقة',
  },
  {
    id: '5',
    title: 'منزل مستقل بغرفتي نوم',
    description: 'منزل من طابقين مع تشطيبات حديثة ومدخل خاص. توفر هذه الوحدة الواسعة منطقة معيشة بمخطط مفتوح، ومطبخ محدث، وغرفتي نوم كبيرتين. تشمل فناء خاص صغير مثالي للاسترخاء في الهواء الطلق. تقع في حي نابض بالحياة قريب من المحلات التجارية والمطاعم.',
    price: 160000,
    location: 'شارع الثلاثين، الجراف، صنعاء',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
    ],
    bedrooms: 2,
    bathrooms: 1.5,
    contactName: 'خالد المقطري',
    contactEmail: 'khaled@example.com',
    contactPhone: '735 876 543',
    available: false,
    dateAvailable: '01-06-2024',
    type: 'منزل',
  },
  {
    id: '6',
    title: 'استديو مفروش قرب الجامعة',
    description: 'شقة استديو مفروشة بالكامل مثالية للطلاب أو المهنيين الشباب. تأتي هذه الوحدة الفعالة كاملة مع أثاث عصري، ومطبخ كامل، وجميع الأجهزة الضرورية. تقع على بعد بضعة مباني فقط من الجامعة وقريبة من وسائل النقل العام والمقاهي والمحلات التجارية.',
    price: 195000,
    location: 'شارع الجامعة، حي الجامعة، صنعاء',
    images: [
      'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1585128792020-803d29415281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      'https://images.unsplash.com/photo-1631048500142-57a376d35990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    bedrooms: 0,
    bathrooms: 1,
    contactName: 'نورا السقاف',
    contactEmail: 'noura@example.com',
    contactPhone: '711 345 678',
    available: false,
    dateAvailable: '01-05-2024',
    type: 'استديو',
  }
];

export const featuredApartments = apartments.slice(0, 3);
