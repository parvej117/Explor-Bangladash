export interface ShowcaseDestination {
  id: string;
  nameBn: string;
  nameEn: string;
  locationBn: string;
  locationEn: string;
  divisionBn: string;
  divisionEn: string;
  image: string;
  tagBn: string;
  tagEn: string;
  category: 'beach' | 'forest' | 'island' | 'mountain' | 'lake' | 'historical' | 'natural' | 'cultural' | 'religious';
  descriptionBn: string;
  descriptionEn: string;
  link: string;
}

// Exactly 50 Unique Bangladesh Tourist Destinations & Beautiful Places
export const SHOWCASE_DESTINATIONS: ShowcaseDestination[] = [
  // 1. Cox's Bazar Beach
  {
    id: 'coxsbazar_beach',
    nameBn: 'কক্সবাজার সমুদ্রসৈকত',
    nameEn: "Cox's Bazar Beach",
    locationBn: 'কক্সবাজার সদর',
    locationEn: "Cox's Bazar Sadar",
    divisionBn: 'চট্টগ্রাম বিভাগ',
    divisionEn: 'Chattogram Division',
    image: '/src/assets/images/coxsbazar_beach_1791899708653.jpg',
    tagBn: 'বিশ্বের দীর্ঘতম সৈকত',
    tagEn: 'Longest Sea Beach',
    category: 'beach',
    descriptionBn: '১২০ কিলোমিটার দীর্ঘ অবিচ্ছিন্ন প্রাকৃতিক বালুকাময় সৈকত, উত্তাল নীল ঢেউ ও মায়াবী সূর্যাস্ত।',
    descriptionEn: 'The world’s longest unbroken natural sandy beach spanning 120 kilometers with turquoise waves.',
    link: '/tourism/coxsbazar_beach'
  },

  // 2. Sundarbans Mangrove Forest
  {
    id: 'sundarbans_forest',
    nameBn: 'সুন্দরবন ম্যানগ্রোভ বন',
    nameEn: 'Sundarbans Forest',
    locationBn: 'বাগেরহাট, খুলনা ও সাতক্ষীরা',
    locationEn: 'Bagerhat, Khulna & Satkhira',
    divisionBn: 'খুলনা বিভাগ',
    divisionEn: 'Khulna Division',
    image: '/src/assets/images/sundarbans_mangrove_1791899708610.jpg',
    tagBn: 'ইউনেস্কো বিশ্ব ঐতিহ্য',
    tagEn: 'UNESCO World Heritage',
    category: 'forest',
    descriptionBn: 'বিশ্বের বৃহত্তম ম্যানগ্রোভ অরণ্য, রয়েল বেঙ্গল টাইগারের প্রাকৃতিক আবাস ও নদীজালের অরণ্য।',
    descriptionEn: 'The largest contiguous mangrove ecosystem on Earth and homeland of the majestic Royal Bengal Tiger.',
    link: '/tourism/sundarbans_forest'
  },

  // 3. Saint Martin's Island
  {
    id: 'saint_martin_island',
    nameBn: 'সেন্ট মার্টিন দ্বীপ',
    nameEn: "Saint Martin's Island",
    locationBn: 'টেকনাফ, কক্সবাজার',
    locationEn: "Teknaf, Cox's Bazar",
    divisionBn: 'চট্টগ্রাম বিভাগ',
    divisionEn: 'Chattogram Division',
    image: '/src/assets/images/saint_martin_island_1791903263271.jpg',
    tagBn: 'একমাত্র প্রবাল দ্বীপ',
    tagEn: 'Coral Island Paradise',
    category: 'island',
    descriptionBn: 'নীল সমুদ্রের বুক চিরে জেগে ওঠা প্রবাল প্রাচীর, নারিকেল কুঞ্জ ও স্বচ্ছ পান্না সবুজ জলরাশি।',
    descriptionEn: 'Bangladesh’s only coral paradise fringed by leaning coconut palms and crystalline waters.',
    link: '/tourism/saint_martin_island'
  },

  // 4. Sajek Valley
  {
    id: 'sajek_valley',
    nameBn: 'সাজেক ভ্যালি',
    nameEn: 'Sajek Valley',
    locationBn: 'বাঘাইছড়ি, রাঙামাটি',
    locationEn: 'Baghaichhari, Rangamati',
    divisionBn: 'চট্টগ্রাম বিভাগ',
    divisionEn: 'Chattogram Division',
    image: '/src/assets/images/sajek_valley_clouds_1791903264652.jpg',
    tagBn: 'মেঘের রাজ্য',
    tagEn: 'Kingdom of Clouds',
    category: 'mountain',
    descriptionBn: 'সবুজ পাহাড়ের চূড়ায় মেঘেদের ওড়াউড়ি, কাঠের কটেজ ও রোমাঞ্চকর পাহাড়ি রাস্তার দৃশ্য।',
    descriptionEn: 'An ethereal mountain retreat floating high above a rolling ocean of white sunrise clouds.',
    link: '/tourism/sajek_valley'
  },

  // 5. Ratargul Swamp Forest
  {
    id: 'ratargul_swamp_forest',
    nameBn: 'রাতারগুল সোয়াম্প ফরেস্ট',
    nameEn: 'Ratargul Swamp Forest',
    locationBn: 'গোয়াইনঘাট, সিলেট',
    locationEn: 'Gowainghat, Sylhet',
    divisionBn: 'সিলেট বিভাগ',
    divisionEn: 'Sylhet Division',
    image: '/src/assets/images/ratargul_swamp_forest_1791903265229.jpg',
    tagBn: 'মিঠা পানির জলাবন',
    tagEn: 'Freshwater Swamp Forest',
    category: 'forest',
    descriptionBn: 'পানিতে নিমজ্জিত চিরহরিৎ সোয়াম্প বন, নৌকায় বসে গাছের ছায়াচ্ছন্ন জলপথে ঘুরে বেড়ানোর রূপকথা।',
    descriptionEn: 'The Amazon of Bengal — a magical submerged freshwater swamp navigated by serene country canoes.',
    link: '/tourism/ratargul_swamp_forest'
  },

  // 6. Jaflong Zero Point
  {
    id: 'jaflong',
    nameBn: 'জাফলং জিরো পয়েন্ট',
    nameEn: 'Jaflong Zero Point',
    locationBn: 'গোয়াইনঘাট, সিলেট',
    locationEn: 'Gowainghat, Sylhet',
    divisionBn: 'সিলেট বিভাগ',
    divisionEn: 'Sylhet Division',
    image: '/src/assets/images/jaflong_river_stones_1791903264419.jpg',
    tagBn: 'প্রকৃতি কন্যা',
    tagEn: 'Daughter of Nature',
    category: 'natural',
    descriptionBn: 'মেঘালয় পাহাড়ের পাদদেশে পিয়াইন নদীর স্বচ্ছ পানির ধারা ও চকচকে নুড়ি পাথরের সমাহার।',
    descriptionEn: 'Crystal-clear mountain streams cascading over colorful river pebbles beneath Meghalaya peaks.',
    link: '/tourism/jaflong'
  },

  // 7. Kuakata Sea Beach
  {
    id: 'kuakata_beach',
    nameBn: 'কুয়াকাটা সমুদ্রসৈকত',
    nameEn: 'Kuakata Beach',
    locationBn: 'কলাপাড়া, পটুয়াখালী',
    locationEn: 'Kalapara, Patuakhali',
    divisionBn: 'বরিশাল বিভাগ',
    divisionEn: 'Barishal Division',
    image: '/src/assets/images/kuakata_beach_sunset_1791903267303.jpg',
    tagBn: 'সাগরকন্যা',
    tagEn: 'Daughter of the Sea',
    category: 'beach',
    descriptionBn: 'একই সৈকত থেকে সূর্যোদয় ও সূর্যাস্ত দেখার বিরল মনোরম উপকূলীয় প্রাকৃতিক বিস্ময়।',
    descriptionEn: 'Rare coastal wonderland offering uninterrupted panoramic vistas of both sunrise and sunset.',
    link: '/tourism/kuakata_beach'
  },

  // 8. Bandarban (Nilgiri & Thanchi)
  {
    id: 'bandarban_nilgiri',
    nameBn: 'বান্দরবান (নীলগিরি ও থানচি)',
    nameEn: 'Bandarban (Nilgiri)',
    locationBn: 'বান্দরবান পার্বত্য জেলা',
    locationEn: 'Bandarban Hill District',
    divisionBn: 'চট্টগ্রাম বিভাগ',
    divisionEn: 'Chattogram Division',
    image: '/src/assets/images/bandarban_hills_nilgiri_1791903266139.jpg',
    tagBn: 'পাহাড়ের রানী',
    tagEn: 'Crown of the Hills',
    category: 'mountain',
    descriptionBn: 'বাংলাদেশের সর্বোচ্চ শৃঙ্গসমূহের জেলা, নীল দিগন্তের পাহাড় ও আদিবাসী সংস্কৃতির রূপময় মেলবন্ধন।',
    descriptionEn: 'Spectacular highland ridge offering 360-degree views across layered blue mountain horizons.',
    link: '/tourism/bandarban_nilgiri'
  },

  // 9. Kaptai Lake
  {
    id: 'kaptai_lake',
    nameBn: 'কাপ্তাই লেক ও ঝুলন্ত সেতু',
    nameEn: 'Kaptai Lake',
    locationBn: 'রাঙামাটি সদর',
    locationEn: 'Rangamati Sadar',
    divisionBn: 'চট্টগ্রাম বিভাগ',
    divisionEn: 'Chattogram Division',
    image: '/src/assets/images/kaptai_lake_hanging_bridge_1791903342722.jpg',
    tagBn: 'বৃহত্তম কৃত্রিম হ্রদ',
    tagEn: 'Sprawling Mountain Lake',
    category: 'lake',
    descriptionBn: 'নীল জলরাশি, চারপাশের সবুজ পাহাড়ের সারি ও ঐতিহ্যবাহী লাল রঙের ঝুলন্ত সেতুর চমৎকার রূপ।',
    descriptionEn: 'Breathtaking lake carved into mountain valleys, featuring the iconic suspension bridge.',
    link: '/tourism/kaptai_lake'
  },

  // 10. Lalbagh Fort
  {
    id: 'lalbagh_fort',
    nameBn: 'লালবাগ কেল্লা',
    nameEn: 'Lalbagh Fort',
    locationBn: 'লালবাগ, পুরান ঢাকা',
    locationEn: 'Old Dhaka',
    divisionBn: 'ঢাকা বিভাগ',
    divisionEn: 'Dhaka Division',
    image: '/src/assets/images/lalbagh_fort_dhaka_1791903266277.jpg',
    tagBn: 'মুঘল স্থাপত্য কীর্তি',
    tagEn: 'Mughal Architectural Marvel',
    category: 'historical',
    descriptionBn: '১৭শ শতকের লাল ইটের মুঘল দুর্গ, পরীবিবির মার্বেল সমাধি ও সুদৃশ্য ফোয়ারা ঘেরা বাগান।',
    descriptionEn: 'A magnificent 17th-century Mughal fortification containing the marble mausoleum of Pari Bibi.',
    link: '/tourism/lalbagh_fort'
  },

  // 11. Mahasthangarh Ancient Ruins
  {
    id: 'mahasthangarh_ruins',
    nameBn: 'মহাস্থানগড়',
    nameEn: 'Mahasthangarh Ruins',
    locationBn: 'শিবগঞ্জ, বগুড়া',
    locationEn: 'Shibganj, Bogura',
    divisionBn: 'রাজশাহী বিভাগ',
    divisionEn: 'Rajshahi Division',
    image: '/src/assets/images/mahasthangarh_ancient_1791899708890.jpg',
    tagBn: 'আড়াই হাজার বছরের দুর্গনগরী',
    tagEn: '2500-Year Ancient Citadel',
    category: 'historical',
    descriptionBn: 'প্রাচীন পুণ্ড্রনগরের সুরক্ষিত দেয়াল, প্রত্নতাত্ত্বিক নিদর্শন ও হাজার বছরের ইতিহাসের স্মারক।',
    descriptionEn: 'The earliest urban fortified citadel unearthed in Bengal, dating back to 3rd century BCE.',
    link: '/tourism/mahasthangarh_ruins'
  },

  // 12. National Martyrs' Memorial
  {
    id: 'smriti_soudho',
    nameBn: 'জাতীয় স্মৃতিসৌধ',
    nameEn: "National Martyrs' Memorial",
    locationBn: 'সাভার, ঢাকা',
    locationEn: 'Savar, Dhaka',
    divisionBn: 'ঢাকা বিভাগ',
    divisionEn: 'Dhaka Division',
    image: '/src/assets/images/smriti_shoudho_1791899739979.jpg',
    tagBn: 'মুক্তিযুদ্ধের অমর স্মারক',
    tagEn: 'National Liberation Memorial',
    category: 'historical',
    descriptionBn: '১৯৭১ সালের মহান শহীদদের প্রতি জাতির গভীর শ্রদ্ধা, ১৫০ ফুট উঁচু সাত জোড়া ত্রিভুজাকার স্থাপত্য।',
    descriptionEn: 'Seven soaring pairs of triangular prism walls honoring the heroes of the 1971 Liberation War.',
    link: '/tourism/smriti_soudho'
  },

  // 13. Sreemangal Tea Estates
  {
    id: 'sreemangal_gardens',
    nameBn: 'শ্রীমঙ্গল চা বাগান',
    nameEn: 'Sreemangal Tea Estates',
    locationBn: 'শ্রীমঙ্গল, মৌলভীবাজার',
    locationEn: 'Sreemangal, Moulvibazar',
    divisionBn: 'সিলেট বিভাগ',
    divisionEn: 'Sylhet Division',
    image: '/src/assets/images/sylhet_tea_garden_1791899739632.jpg',
    tagBn: 'চায়ের রাজধানী',
    tagEn: 'Tea Capital of Bengal',
    category: 'natural',
    descriptionBn: 'সবুজ ঢেউখেলানো শত শত চা বাগান, রাবার বাগান এবং অনন্য সাত রঙের চায়ের আঁতুড়ঘর।',
    descriptionEn: 'Rolling undulating carpets of manicured emerald tea bushes and aromatic highland gardens.',
    link: '/tourism/sreemangal_gardens'
  },

  // 14. Somapura Mahavihara (Paharpur)
  {
    id: 'somapura_mahavihara',
    nameBn: 'সোমপুর মহাবিহার (পাহাড়পুর)',
    nameEn: 'Somapura Mahavihara',
    locationBn: 'বদলগাছী, নওগাঁ',
    locationEn: 'Badalgachhi, Naogaon',
    divisionBn: 'রাজশাহী বিভাগ',
    divisionEn: 'Rajshahi Division',
    image: '/src/assets/images/mahasthangarh_ancient_1791899708890.jpg',
    tagBn: 'ইউনেস্কো প্রাচীন বৌদ্ধবিহার',
    tagEn: 'UNESCO Ancient Vihara',
    category: 'historical',
    descriptionBn: 'অষ্টম শতকের পাল আমলের বিশ্বের দ্বিতীয় বৃহত্তম বৌদ্ধবিহার, টেরাকোটা ও পিরামিডাল স্তূপার মহিমা।',
    descriptionEn: 'One of the most expansive 8th-century Buddhist monastic universities in the ancient world.',
    link: '/tourism/somapura_mahavihara'
  },

  // 15. Ahsan Manzil Pink Palace
  {
    id: 'ahsan_manzil',
    nameBn: 'আহসান মঞ্জিল (রংমহল)',
    nameEn: 'Ahsan Manzil',
    locationBn: 'কুমারটুলী, পুরান ঢাকা',
    locationEn: 'Kumartuli, Old Dhaka',
    divisionBn: 'ঢাকা বিভাগ',
    divisionEn: 'Dhaka Division',
    image: '/src/assets/images/lalbagh_fort_dhaka_1791903266277.jpg',
    tagBn: 'নবাবদের গোলাপী প্রাসাদ',
    tagEn: 'The Pink Palace',
    category: 'historical',
    descriptionBn: 'বুড়িগঙ্গা নদীর তীরে ঢাকার নবাবদের ঐতিহাসিক বাসভবন, সুউচ্চ গম্বুজ ও রাজকীয় জাদুঘর।',
    descriptionEn: 'The official residential palace and seat of the Nawabs of Dhaka overlooking the Buriganga.',
    link: '/tourism/ahsan_manzil'
  },

  // 16. Sixty Dome Mosque (Bagerhat)
  {
    id: 'sixty_dome_mosque',
    nameBn: 'ষাট গম্বুজ মসজিদ',
    nameEn: 'Sixty Dome Mosque',
    locationBn: 'বাগেরহাট সদর',
    locationEn: 'Bagerhat Sadar',
    divisionBn: 'খুলনা বিভাগ',
    divisionEn: 'Khulna Division',
    image: '/src/assets/images/sundarbans_mangrove_1791899708610.jpg',
    tagBn: 'ইউনেস্কো মধ্যযুগীয় স্থাপত্য',
    tagEn: 'UNESCO Medieval Mosque',
    category: 'historical',
    descriptionBn: '১৫শ শতকে উলুগ খান জাহানের নির্মিত ৮১টি গম্বুজবিশিষ্ট বাংলার অন্যতম বৃহৎ মধ্যযুগীয় মসজিদ।',
    descriptionEn: 'The largest Sultanate-era terracotta brick mosque in Bengal, renowned for its 81 domes.',
    link: '/tourism/sixty_dome_mosque'
  },

  // 17. Inani Beach & Coral Rocks
  {
    id: 'inani_beach',
    nameBn: 'ইনানী পাথুরে সৈকত',
    nameEn: 'Inani Beach',
    locationBn: 'উখিয়া, কক্সবাজার',
    locationEn: 'Ukhiya, Cox’s Bazar',
    divisionBn: 'চট্টগ্রাম বিভাগ',
    divisionEn: 'Chattogram Division',
    image: '/src/assets/images/coxsbazar_beach_1791899708653.jpg',
    tagBn: 'জীবন্ত প্রবাল পাথর',
    tagEn: 'Living Coral Reef Shore',
    category: 'beach',
    descriptionBn: 'মেরিন ড্রাইভের পাশে শান্ত নীল সমুদ্র, সবুজ শ্যাওলাযুক্ত প্রবাল পাথর ও মনোমুগ্ধকর উপকূল।',
    descriptionEn: 'Tranquil shoreline decorated with sharp black coral boulders along the scenic Marine Drive.',
    link: '/tourism/inani_beach'
  },

  // 18. Himchari National Park & Waterfall
  {
    id: 'himchari_falls',
    nameBn: 'হিমছড়ি ঝর্ণা ও জাতীয় উদ্যান',
    nameEn: 'Himchari Waterfall & Park',
    locationBn: 'রামু, কক্সবাজার',
    locationEn: "Ramu, Cox's Bazar",
    divisionBn: 'চট্টগ্রাম বিভাগ',
    divisionEn: 'Chattogram Division',
    image: '/src/assets/images/coxsbazar_beach_1791899708653.jpg',
    tagBn: 'পাহাড় ও সমুদ্রের মিলন',
    tagEn: 'Hills Meet Sea Horizon',
    category: 'natural',
    descriptionBn: 'সবুজ বনাঞ্চল ঘেরা শীতল ঝর্ণা এবং পাহাড় চূড়ার ভিউপয়েন্ট থেকে সুবিশাল বঙ্গোপসাগরের রূপ।',
    descriptionEn: 'Lush tropical hill reserve featuring scenic freshwater falls and panoramic marine lookouts.',
    link: '/tourism/himchari_falls'
  },

  // 19. Nilachal Viewpoint
  {
    id: 'nilachal_bandarban',
    nameBn: 'নীলাচল ভিউপয়েন্ট',
    nameEn: 'Nilachal Viewpoint',
    locationBn: 'টাইগারপাড়া, বান্দরবান',
    locationEn: 'Tiger Para, Bandarban',
    divisionBn: 'চট্টগ্রাম বিভাগ',
    divisionEn: 'Chattogram Division',
    image: '/src/assets/images/bandarban_hills_nilgiri_1791903266139.jpg',
    tagBn: 'স্বর্গের সিঁড়ি',
    tagEn: 'Stairway to Clouds',
    category: 'mountain',
    descriptionBn: 'সমুদ্রপৃষ্ঠ থেকে ২০০০ ফুট উঁচুতে দাঁড়িয়ে চারপাশের আদিগন্ত নীল পাহাড়ের ঢেউ দেখার সেরা স্থান।',
    descriptionEn: 'A dramatic hill summit perched 2,000 feet high with panoramic vistas of rolling misty summits.',
    link: '/tourism/nilachal_bandarban'
  },

  // 20. Keokradong Peak
  {
    id: 'keokradong_peak',
    nameBn: 'কেওক্রাডং পর্বতশৃঙ্গ',
    nameEn: 'Keokradong Peak',
    locationBn: 'রুমা, বান্দরবান',
    locationEn: 'Ruma, Bandarban',
    divisionBn: 'চট্টগ্রাম বিভাগ',
    divisionEn: 'Chattogram Division',
    image: '/src/assets/images/bandarban_hills_nilgiri_1791903266139.jpg',
    tagBn: 'রোমাঞ্চকর ট্রেকিং শৃঙ্গ',
    tagEn: 'Legendary Trekking Summit',
    category: 'mountain',
    descriptionBn: '৩,২৩৫ ফুট উচ্চতার বাংলাদেশের অন্যতম রোমাঞ্চকর ট্রেকিং শৃঙ্গ ও বম আদিবাসী জীবনধারা।',
    descriptionEn: 'One of Bangladesh’s iconic mountain peaks at 3,235 ft, beloved by high-altitude trekkers.',
    link: '/tourism/keokradong_peak'
  },

  // 21. Nafakhum Waterfall
  {
    id: 'nafakhum_waterfall',
    nameBn: 'নাফাখুম জলপ্রপাত',
    nameEn: 'Nafakhum Waterfall',
    locationBn: 'থানচি, বান্দরবান',
    locationEn: 'Thanchi, Bandarban',
    divisionBn: 'চট্টগ্রাম বিভাগ',
    divisionEn: 'Chattogram Division',
    image: '/src/assets/images/bandarban_hills_nilgiri_1791903266139.jpg',
    tagBn: 'বাংলার নায়াগ্রা',
    tagEn: 'Niagara of Bengal',
    category: 'natural',
    descriptionBn: 'রেমাক্রি নদীর গর্জন, সুবিশাল জলরাশি ও পাথুরে খাড়া খাঁদে প্রকৃতির বুনো রূপ।',
    descriptionEn: 'A roaring, powerful cascade on the Remakri River surrounded by dense highland jungle.',
    link: '/tourism/nafakhum_waterfall'
  },

  // 22. Boga Lake
  {
    id: 'boga_lake',
    nameBn: 'বগা লেক (ড্রাগন হ্রদ)',
    nameEn: 'Boga Lake',
    locationBn: 'রুমা, বান্দরবান',
    locationEn: 'Ruma, Bandarban',
    divisionBn: 'চট্টগ্রাম বিভাগ',
    divisionEn: 'Chattogram Division',
    image: '/src/assets/images/kaptai_lake_hanging_bridge_1791903342722.jpg',
    tagBn: 'রহস্যময় পাহাড়ি হ্রদ',
    tagEn: 'Mystic Volcano Lake',
    category: 'lake',
    descriptionBn: 'পাহাড়ের চূড়ায় প্রায় ১২০০ ফুট উঁচুতে নীল স্বচ্ছ পানির প্রাকৃতিক আগ্নেয় হ্রদ ও লোকগাথা।',
    descriptionEn: 'A mystical natural mountain lake set 1,200 ft above sea level wrapped in indigenous folklore.',
    link: '/tourism/boga_lake'
  },

  // 23. Bisnakandi
  {
    id: 'bisnakandi',
    nameBn: 'বিছনাকান্দি',
    nameEn: 'Bisnakandi',
    locationBn: 'রুস্তমপুর, গোয়াইনঘাট, সিলেট',
    locationEn: 'Rustompur, Gowainghat, Sylhet',
    divisionBn: 'সিলেট বিভাগ',
    divisionEn: 'Sylhet Division',
    image: '/src/assets/images/jaflong_river_stones_1791903264419.jpg',
    tagBn: 'পাথর ও ঝর্ণার স্বর্গরাজ্য',
    tagEn: 'Stony Streams & Mountain Steps',
    category: 'natural',
    descriptionBn: 'মেঘালয় পাহাড় থেকে নেমে আসা স্বচ্ছ শীতল জলধারা, সবুজ টিলা ও পাথরের জলকেলি।',
    descriptionEn: 'A scenic confluence of pristine hill streams tumbling across layers of colorful boulders.',
    link: '/tourism/bisnakandi'
  },

  // 24. Bholaganj Sada Pathor
  {
    id: 'bholaganj_sada_pathor',
    nameBn: 'ভোলাগঞ্জ সাদা পাথর',
    nameEn: 'Bholaganj Sada Pathor',
    locationBn: 'কোম্পানীগঞ্জ, সিলেট',
    locationEn: 'Companiganj, Sylhet',
    divisionBn: 'সিলেট বিভাগ',
    divisionEn: 'Sylhet Division',
    image: '/src/assets/images/jaflong_river_stones_1791903264419.jpg',
    tagBn: 'ধলাই নদীর স্ফটিক জল',
    tagEn: 'White Stone Oasis of Dholai',
    category: 'natural',
    descriptionBn: 'ধলাই নদীর কাঁচের মতো স্বচ্ছ বরফশীতল পানি আর লাখো মসৃণ সাদা পাথরের অপার সমারোহ।',
    descriptionEn: 'Glacial turquoise waters flowing over endless fields of smooth white quartz pebbles.',
    link: '/tourism/bholaganj_sada_pathor'
  },

  // 25. Tanguar Haor
  {
    id: 'tanguar_haor',
    nameBn: 'টাঙ্গুয়ার হাওর',
    nameEn: 'Tanguar Haor',
    locationBn: 'তাহিরপুর ও ধর্মপাশা, সুনামগঞ্জ',
    locationEn: 'Tahirpur & Dharmapasha, Sunamganj',
    divisionBn: 'সিলেট বিভাগ',
    divisionEn: 'Sylhet Division',
    image: '/src/assets/images/hero_bangladesh_sunset_1791899705778.jpg',
    tagBn: 'রামসার আন্তর্জাতিক জলাভূমি',
    tagEn: 'Ramsar Wetland Wonder',
    category: 'lake',
    descriptionBn: 'মেঘালয়ের পাদদেশে সুবিশাল জলরাশি, পরিযায়ী পাখির কলকাকলি ও বজরায় জ্যোৎস্না রাত যাপন।',
    descriptionEn: 'A globally vital Ramsar wetland sanctuary hosting millions of migratory waterbirds each winter.',
    link: '/tourism/tanguar_haor'
  },

  // 26. Jadukata River & Barek Tila
  {
    id: 'jadukata_river',
    nameBn: 'যাদুকাটা নদী ও বারিক্কা টিলা',
    nameEn: 'Jadukata River & Barek Tila',
    locationBn: 'তাহিরপুর, সুনামগঞ্জ',
    locationEn: 'Tahirpur, Sunamganj',
    divisionBn: 'সিলেট বিভাগ',
    divisionEn: 'Sylhet Division',
    image: '/src/assets/images/jaflong_river_stones_1791903264419.jpg',
    tagBn: 'মায়াবী নদী ও সবুজ টিলা',
    tagEn: 'Enchanting River Horizon',
    category: 'natural',
    descriptionBn: 'নীল জল, বালুচর আর মেঘালয় পাহাড়ের খাড়া প্রাচীর ঘেরা বাংলাদেশের সবচেয়ে সুন্দর নদীগুলোর একটি।',
    descriptionEn: 'A serpentine river with shimmering emerald water reflecting the towering green ridges of Meghalaya.',
    link: '/tourism/jadukata_river'
  },

  // 27. Lawachara National Park
  {
    id: 'lawachara_park',
    nameBn: 'লাউয়াছড়া জাতীয় উদ্যান',
    nameEn: 'Lawachara National Park',
    locationBn: 'কমলগঞ্জ, মৌলভীবাজার',
    locationEn: 'Kamalganj, Moulvibazar',
    divisionBn: 'সিলেট বিভাগ',
    divisionEn: 'Sylhet Division',
    image: '/src/assets/images/sylhet_tea_garden_1791899739632.jpg',
    tagBn: 'চিরহরিৎ রেইনফরেস্ট',
    tagEn: 'Evergreen Rainforest Sanctuary',
    category: 'forest',
    descriptionBn: 'মহাবিপন্ন উল্লুক, বিশাল বৃক্ষরাজির ছায়াচ্ছন্ন ট্রেইল ও বনের ভেতর দিয়ে চলে যাওয়া রেললাইন।',
    descriptionEn: 'A dense tropical rainforest known as the sanctuary of the endangered Western Hoolock Gibbon.',
    link: '/tourism/lawachara_park'
  },

  // 28. Madhabkunda Waterfall
  {
    id: 'madhabkunda_waterfall',
    nameBn: 'মাধবকুণ্ড জলপ্রপাত',
    nameEn: 'Madhabkunda Waterfall',
    locationBn: 'বড়লেখা, মৌলভীবাজার',
    locationEn: 'Barlekha, Moulvibazar',
    divisionBn: 'সিলেট বিভাগ',
    divisionEn: 'Sylhet Division',
    image: '/src/assets/images/sylhet_tea_garden_1791899739632.jpg',
    tagBn: '২০০ ফুট উচ্চতার প্রাকৃতিক প্রপাত',
    tagEn: '200-Foot Natural Cascade',
    category: 'natural',
    descriptionBn: 'উঁচু পাথুরে পাহাড় থেকে সশব্দে নিচে আছড়ে পড়া অবিরাম জলধারা ও চারপাশের ঘন বনানী।',
    descriptionEn: 'One of the tallest waterfalls in Bangladesh cascading majestically down sheer rock walls.',
    link: '/tourism/madhabkunda_waterfall'
  },

  // 29. Panam Nagar Historic City
  {
    id: 'panam_nagar',
    nameBn: 'পানাম নগর (সোনারগাঁও)',
    nameEn: 'Panam Nagar',
    locationBn: 'সোনারগাঁও, নারায়ণগঞ্জ',
    locationEn: 'Sonargaon, Narayanganj',
    divisionBn: 'ঢাকা বিভাগ',
    divisionEn: 'Dhaka Division',
    image: '/src/assets/images/lalbagh_fort_dhaka_1791903266277.jpg',
    tagBn: 'প্রাচীন বাংলার হারানো শহর',
    tagEn: 'Lost City of Bengal',
    category: 'historical',
    descriptionBn: '১৯শ শতকের ধনী হিন্দু বণিকদের ইন্দো-ইউরোপীয় স্থাপত্যের ৫২টি রাজকীয় ভবন ও প্রাচীন রাজপথ।',
    descriptionEn: 'A remarkably preserved 19th-century merchant city boasting ornate European-style brick mansions.',
    link: '/tourism/panam_nagar'
  },

  // 30. Sonargaon Folk Art Museum
  {
    id: 'sonargaon_museum',
    nameBn: 'সোনারগাঁও লোক ও কারুশিল্প জাদুঘর',
    nameEn: 'Sonargaon Folk Art Museum',
    locationBn: 'সোনারগাঁও, নারায়ণগঞ্জ',
    locationEn: 'Sonargaon, Narayanganj',
    divisionBn: 'ঢাকা বিভাগ',
    divisionEn: 'Dhaka Division',
    image: '/src/assets/images/hero_bangladesh_sunset_1791899705778.jpg',
    tagBn: 'শিল্পাচার্য জয়নুলের স্মৃতিপীঠ',
    tagEn: 'Bara Sardar Bari Heritage',
    category: 'cultural',
    descriptionBn: 'বড় সর্দার বাড়ির টেরাকোটা খচিত প্রাসাদ, প্রাচীন হস্তশিল্প, লেকে প্যাডেল বোট ও কারুশিল্প মেলা।',
    descriptionEn: 'A palatial museum preserving traditional Bengali wooden craft, handlooms, and folk art forms.',
    link: '/tourism/sonargaon_museum'
  },

  // 31. Mainamati & Shalban Vihara
  {
    id: 'shalban_vihara',
    nameBn: 'শালবন বৌদ্ধবিহার ও ময়নামতি',
    nameEn: 'Shalban Vihara',
    locationBn: 'কোটবাড়ি, কুমিল্লা',
    locationEn: 'Kotbari, Cumilla',
    divisionBn: 'চট্টগ্রাম বিভাগ',
    divisionEn: 'Chattogram Division',
    image: '/src/assets/images/mahasthangarh_ancient_1791899708890.jpg',
    tagBn: 'অষ্টম শতকের দেব রাজবংশের নিদর্শন',
    tagEn: '8th-Century Deva Citadel',
    category: 'historical',
    descriptionBn: '১১৫টি ভিক্ষু কক্ষ বিশিষ্ট প্রাচীন বিহার, পোড়ামাটির টেরাকোটা ফলক ও সমৃদ্ধ প্রত্নতাত্ত্বিক জাদুঘর।',
    descriptionEn: 'A monumental square monastic complex featuring 115 monastic cells and intricate terracotta art.',
    link: '/tourism/shalban_vihara'
  },

  // 32. Chandranath Hill & Temple
  {
    id: 'chandranath_hill',
    nameBn: 'চন্দ্রনাথ পাহাড় ও মন্দির',
    nameEn: 'Chandranath Hill',
    locationBn: 'সীতাকুণ্ড, চট্টগ্রাম',
    locationEn: 'Sitakunda, Chattogram',
    divisionBn: 'চট্টগ্রাম বিভাগ',
    divisionEn: 'Chattogram Division',
    image: '/src/assets/images/bandarban_hills_nilgiri_1791903266139.jpg',
    tagBn: 'পবিত্র তীর্থ ও ট্রেইল শৃঙ্গ',
    tagEn: 'Holy Peak of Sitakunda',
    category: 'mountain',
    descriptionBn: '১১৫২ ফুট উঁচু পাহাড়ের চূড়ায় অবস্থিত তীর্থক্ষেত্র, হাজার ধাপের সিঁড়ি ও সাগরের বায়বীয় দৃশ্য।',
    descriptionEn: 'A sacred 1,152 ft ridge with thousand-step stone stairs offering vistas of the Bay of Bengal.',
    link: '/tourism/chandranath_hill'
  },

  // 33. Guliakhali Beach
  {
    id: 'guliakhali_beach',
    nameBn: 'গুলিয়াখালী সমুদ্রসৈকত',
    nameEn: 'Guliakhali Beach',
    locationBn: 'মুরাদপুর, সীতাকুণ্ড, চট্টগ্রাম',
    locationEn: 'Muradpur, Sitakunda, Chattogram',
    divisionBn: 'চট্টগ্রাম বিভাগ',
    divisionEn: 'Chattogram Division',
    image: '/src/assets/images/kuakata_beach_sunset_1791903267303.jpg',
    tagBn: 'সবুজ ঘাস ও কেওড়া বন',
    tagEn: 'Green Velvet Coastal Marsh',
    category: 'beach',
    descriptionBn: 'সবুজ গালিচাসম ঘাস, কেওড়া বনের শ্বাসমূলের ফাঁক দিয়ে বয়ে চলা নালার অনন্য উপকূলীয় রূপ।',
    descriptionEn: 'A rare coastline where lush green grass carpeting meets tidal mangrove marshes and open waves.',
    link: '/tourism/guliakhali_beach'
  },

  // 34. Patenga Sea Beach
  {
    id: 'patenga_beach',
    nameBn: 'পতেঙ্গা সমুদ্রসৈকত',
    nameEn: 'Patenga Sea Beach',
    locationBn: 'পতেঙ্গা, চট্টগ্রাম মহানগর',
    locationEn: 'Patenga, Chattogram City',
    divisionBn: 'চট্টগ্রাম বিভাগ',
    divisionEn: 'Chattogram Division',
    image: '/src/assets/images/coxsbazar_beach_1791899708653.jpg',
    tagBn: 'কর্ণফুলী ও সাগরের মোহনা',
    tagEn: 'Karnaphuli Estuary Horizon',
    category: 'beach',
    descriptionBn: 'পাথরে আছড়ে পড়া উত্তাল ঢেউ, শত শত নোঙর করা বাণিজ্যিক জাহাজ ও সুস্বাদু কাঁকড়া ভাজা।',
    descriptionEn: 'Dynamic seaside promenade lined with concrete tetrapods, ocean liners, and coastal street snacks.',
    link: '/tourism/patenga_beach'
  },

  // 35. Nijhum Dwip
  {
    id: 'nijhum_dwip',
    nameBn: 'নিঝুম দ্বীপ',
    nameEn: 'Nijhum Dwip',
    locationBn: 'হাতিয়া, নোয়াখালী',
    locationEn: 'Hatiya, Noakhali',
    divisionBn: 'চট্টগ্রাম বিভাগ',
    divisionEn: 'Chattogram Division',
    image: '/src/assets/images/hero_bangladesh_sunset_1791899705778.jpg',
    tagBn: 'চিত্রা হরিণের অভয়ারণ্য',
    tagEn: 'Sanctuary of Spotted Deer',
    category: 'island',
    descriptionBn: 'বঙ্গোপসাগরের বুকে জেগে ওঠা নির্জন দ্বীপ, হাজার হাজার চিত্রা হরিণ ও শ্বাসমূলের কেওড়া বন।',
    descriptionEn: 'An isolated estuary island home to over 40,000 spotted deer roaming tranquil mangrove forests.',
    link: '/tourism/nijhum_dwip'
  },

  // 36. Manpura Island
  {
    id: 'manpura_island',
    nameBn: 'মনপুরা দ্বীপ',
    nameEn: 'Manpura Island',
    locationBn: 'মনপুরা, ভোলা',
    locationEn: 'Manpura, Bhola',
    divisionBn: 'বরিশাল বিভাগ',
    divisionEn: 'Barishal Division',
    image: '/src/assets/images/hero_bangladesh_sunset_1791899705778.jpg',
    tagBn: 'মেঘনার মোহনার রূপসী দ্বীপ',
    tagEn: 'Pristine Estuary Paradise',
    category: 'island',
    descriptionBn: 'মেঘনা নদী ও বঙ্গোপসাগরের সঙ্গমস্থলে সবুজ চারণভূমি, মহিষের বাথান ও অপরূপ সূর্যাস্ত।',
    descriptionEn: 'An untouched offshore delta isle famous for open green pastures, water buffalo herds, and quiet tides.',
    link: '/tourism/manpura_island'
  },

  // 37. Floating Guava Market (Bhimruli)
  {
    id: 'floating_guava_market',
    nameBn: 'ভাসমান পেয়ারা বাজার (ভিমরুলী)',
    nameEn: 'Floating Guava Market',
    locationBn: 'ঝালকাঠি ও পিরোজপুর',
    locationEn: 'Jhalakathi & Pirojpur',
    divisionBn: 'বরিশাল বিভাগ',
    divisionEn: 'Barishal Division',
    image: '/src/assets/images/hero_bangladesh_sunset_1791899705778.jpg',
    tagBn: 'বাংলার ভেনিস',
    tagEn: 'Venice of Bengal Water Market',
    category: 'cultural',
    descriptionBn: 'শাখা খালের মোহনায় শত শত ডিঙি নৌকায় পাকা পেয়ারা বেচাকেনার ২০০ বছরের ঐতিহ্য।',
    descriptionEn: 'A vibrant 200-year-old waterborne market where growers trade sweet green guavas from wooden canoes.',
    link: '/tourism/floating_guava_market'
  },

  // 38. Guthia Mosque (Barishal)
  {
    id: 'guthia_mosque',
    nameBn: 'বাইতুল আমান জামে মসজিদ (গুঠিয়া)',
    nameEn: 'Baitul Aman Guthia Mosque',
    locationBn: 'উজিরপুর, বরিশাল',
    locationEn: 'Wazirpur, Barishal',
    divisionBn: 'বরিশাল বিভাগ',
    divisionEn: 'Barishal Division',
    image: '/src/assets/images/hero_bangladesh_sunset_1791899705778.jpg',
    tagBn: 'আধুনিক ইসলামিক স্থাপত্যের বিস্ময়',
    tagEn: 'Modern Islamic Architectural Gem',
    category: 'religious',
    descriptionBn: '১৪ একর জায়গায় সুবিশাল দীঘি, মার্বেল পাথর, সুউচ্চ মিনার ও বর্ণিল আলোকসজ্জা।',
    descriptionEn: 'A magnificent contemporary Islamic complex set beside reflective lakes and manicured floral gardens.',
    link: '/tourism/guthia_mosque'
  },

  // 39. Susang Durgapur & Birishiri
  {
    id: 'susang_durgapur',
    nameBn: 'সুসং দুর্গাপুর ও বিরিশিরি',
    nameEn: 'Susang Durgapur (Birishiri)',
    locationBn: 'দুর্গাপুর, নেত্রকোণা',
    locationEn: 'Durgapur, Netrokona',
    divisionBn: 'ময়মনসিংহ বিভাগ',
    divisionEn: 'Mymensingh Division',
    image: '/src/assets/images/kaptai_lake_hanging_bridge_1791903342722.jpg',
    tagBn: 'সাদা চিনামাটির পাহাড় ও নীল লেক',
    tagEn: 'China Clay Hills & Turquoise Lake',
    category: 'natural',
    descriptionBn: 'সোমেশ্বরী নদীর স্বচ্ছ পানি, সাদা চিনামাটির খাড়া পাহাড় এবং নীল জলের রূপকথার হ্রদ।',
    descriptionEn: 'Mesmerizing white ceramic clay hills encircling a striking crystal-blue lake by the Someshwari River.',
    link: '/tourism/susang_durgapur'
  },

  // 40. Garo Hills (Ghazni & Madhutila)
  {
    id: 'garo_hills_sherpur',
    nameBn: 'গারো পাহাড় (গজনী অবকাশ ও মধুটিলা)',
    nameEn: 'Garo Hills Sherpur',
    locationBn: 'ঝিনাইগাতী ও নালিতাবাড়ী, শেরপুর',
    locationEn: 'Jhenaigati & Nalitabari, Sherpur',
    divisionBn: 'ময়মনসিংহ বিভাগ',
    divisionEn: 'Mymensingh Division',
    image: '/src/assets/images/hero_bangladesh_sunset_1791899705778.jpg',
    tagBn: 'সীমান্তবর্তী শালবনের পাহাড়',
    tagEn: 'Border Sal Forest Foothills',
    category: 'natural',
    descriptionBn: 'ভারত সীমান্তের পাদদেশে সবুজ শালবনের উঁচু-নিচু টিলা, ঝুলন্ত সেতু ও আদিবাসী সংস্কৃতির রূপ।',
    descriptionEn: 'Lush sal forests blanketing the rolling southern foothills of the Meghalaya border range.',
    link: '/tourism/garo_hills_sherpur'
  },

  // 41. Tajhat Palace (Rangpur)
  {
    id: 'tajhat_palace',
    nameBn: 'তাজহাট রাজবাড়ি',
    nameEn: 'Tajhat Palace',
    locationBn: 'তাজহাট, রংপুর সদর',
    locationEn: 'Tajhat, Rangpur Sadar',
    divisionBn: 'রংপুর বিভাগ',
    divisionEn: 'Rangpur Division',
    image: '/src/assets/images/lalbagh_fort_dhaka_1791903266277.jpg',
    tagBn: 'উত্তরাঞ্চলের ঐতিহাসিক রাজপ্রাসাদ',
    tagEn: 'Grand Palace of Northern Bengal',
    category: 'historical',
    descriptionBn: '২০ শতকের শুরুতে নির্মিত মার্বেল পাথরের বিশাল সিঁড়ি, গম্বুজ ও চমৎকার রাজকীয় সংগ্রহশালা।',
    descriptionEn: 'An opulent 20th-century classical palace built with imported Italian marble and manicured grounds.',
    link: '/tourism/tajhat_palace'
  },

  // 42. Kantajew Temple (Dinajpur)
  {
    id: 'kantajew_temple',
    nameBn: 'কান্তজিউ মন্দির (নবরত্ন)',
    nameEn: 'Kantajew Terracotta Temple',
    locationBn: 'কাহারোল, দিনাজপুর',
    locationEn: 'Kaharole, Dinajpur',
    divisionBn: 'রংপুর বিভাগ',
    divisionEn: 'Rangpur Division',
    image: '/src/assets/images/mahasthangarh_ancient_1791899708890.jpg',
    tagBn: 'টেরাকোটা শিল্পের শ্রেষ্ঠ নিদর্শন',
    tagEn: 'Terracotta Architectural Masterpiece',
    category: 'historical',
    descriptionBn: '১৮শ শতকের তৈরি নবরত্ন মন্দির, যার প্রতিটি ইটে মহাভারত ও রামায়ণের কাহিনী টেরাকোটায় খোদাই করা।',
    descriptionEn: 'An 18th-century brick temple renowned for thousands of intricate terracotta relief plaques.',
    link: '/tourism/kantajew_temple'
  },

  // 43. Ramsagar National Park (Dinajpur)
  {
    id: 'ramsagar_lake',
    nameBn: 'রামসাগর জাতীয় উদ্যান',
    nameEn: 'Ramsagar National Park',
    locationBn: 'তেজপুর, দিনাজপুর সদর',
    locationEn: 'Tejpur, Dinajpur Sadar',
    divisionBn: 'রংপুর বিভাগ',
    divisionEn: 'Rangpur Division',
    image: '/src/assets/images/kaptai_lake_hanging_bridge_1791903342722.jpg',
    tagBn: 'ঐতিহাসিক মানবসৃষ্ট দিঘি',
    tagEn: 'Historic Man-Made Reservoir',
    category: 'lake',
    descriptionBn: 'রাজা রামনাথ খনিত সুবিশাল ঐতিহাসিক দীঘি, পরিযায়ী পাখির মেলা ও সবুজ বনানী।',
    descriptionEn: 'The largest man-made historic lake in Bangladesh surrounded by deer enclosures and dense woodland.',
    link: '/tourism/ramsagar_lake'
  },

  // 44. Puthia Temple Complex
  {
    id: 'puthia_palace',
    nameBn: 'পুঠিয়া রাজবাড়ি ও মন্দির কমপ্লেক্স',
    nameEn: 'Puthia Temple Complex',
    locationBn: 'পুঠিয়া, রাজশাহী',
    locationEn: 'Puthia, Rajshahi',
    divisionBn: 'রাজশাহী বিভাগ',
    divisionEn: 'Rajshahi Division',
    image: '/src/assets/images/lalbagh_fort_dhaka_1791903266277.jpg',
    tagBn: 'বাংলার প্রাচীন মন্দির নগরী',
    tagEn: 'Historic Temple City of Bengal',
    category: 'historical',
    descriptionBn: 'শিব মন্দির, গোবিন্দ মন্দির ও পঞ্চরত্ন স্থাপত্যের সমৃদ্ধ সমাহার ও রাজকীয় প্রাসাদ।',
    descriptionEn: 'A cluster of historic terracotta and neoclassical Hindu temples flanking tranquil reflecting ponds.',
    link: '/tourism/puthia_palace'
  },

  // 45. Bagha Mosque
  {
    id: 'bagha_mosque',
    nameBn: 'বাঘা ঐতিহাসিক মসজিদ',
    nameEn: 'Bagha Historic Mosque',
    locationBn: 'বাঘা, রাজশাহী',
    locationEn: 'Bagha, Rajshahi',
    divisionBn: 'রাজশাহী বিভাগ',
    divisionEn: 'Rajshahi Division',
    image: '/src/assets/images/sundarbans_mangrove_1791899708610.jpg',
    tagBn: 'সুলতানি আমলের টেরাকোটা মসজিদ',
    tagEn: 'Sultanate Terracotta Mosque',
    category: 'historical',
    descriptionBn: '১৫২৩ সালে সুলতান নাসিরউদ্দিন নুসরত শাহের নির্মিত পোড়ামাটির অপূর্ব অলংকরণে সাজানো দশ গম্বুজ মসজিদ।',
    descriptionEn: 'A celebrated 1523 CE Sultanate brick mosque ornamented with floral terracotta carvings.',
    link: '/tourism/bagha_mosque'
  },

  // 46. Padma River Char & Horizon
  {
    id: 'padma_river_char',
    nameBn: 'পদ্মার চর ও নদী দিগন্ত',
    nameEn: 'Padma Riverbanks & Chars',
    locationBn: 'রাজশাহী ও মাওয়া',
    locationEn: 'Rajshahi & Mawa',
    divisionBn: 'রাজশাহী বিভাগ',
    divisionEn: 'Rajshahi Division',
    image: '/src/assets/images/hero_bangladesh_sunset_1791899705778.jpg',
    tagBn: 'মাইটি পদ্মা নদীর সূর্যাস্ত',
    tagEn: 'Mighty River Sunset Horizon',
    category: 'natural',
    descriptionBn: 'পদ্মার বিশাল জলরাশি, বালুচরে কাশফুলের মেলা, জেলে নৌকা এবং বিশ্বমানের পদ্মা সেতু।',
    descriptionEn: 'The majestic expanse of the Padma River celebrated for crimson sunsets, sandbars, and the Padma Bridge.',
    link: '/tourism/padma_river_char'
  },

  // 47. Lalon Shah Shrine (Kushtia)
  {
    id: 'lalon_shrine',
    nameBn: 'বাউল সম্রাট লালন শাহের মাজার',
    nameEn: 'Fakir Lalon Shah Shrine',
    locationBn: 'ছেউড়িয়া, কুমারখালী, কুষ্টিয়া',
    locationEn: 'Cheuriya, Kumarkhali, Kushtia',
    divisionBn: 'খুলনা বিভাগ',
    divisionEn: 'Khulna Division',
    image: '/src/assets/images/hero_bangladesh_sunset_1791899705778.jpg',
    tagBn: 'বাউল দর্শন ও একতারার সুর',
    tagEn: 'Cradle of Baul Mysticism',
    category: 'cultural',
    descriptionBn: 'মানবতাবাদী বাউল দর্শনের প্রবক্তা ফকির লালন শাহের সমাধি ও সাধুসঙ্গের পুণ্যভূমি।',
    descriptionEn: 'The spiritual resting place of 18th-century mystic poet Lalon Shah, pulsing with ektara folk songs.',
    link: '/tourism/lalon_shrine'
  },

  // 48. Shilaidaha Kuthibari (Rabindranath Tagore)
  {
    id: 'shilaidaha_kuthibari',
    nameBn: 'শিলাইদহ রবীন্দ্র কুঠিবাড়ি',
    nameEn: 'Shilaidaha Rabindra Kuthibari',
    locationBn: 'কুমারখালী, কুষ্টিয়া',
    locationEn: 'Kumarkhali, Kushtia',
    divisionBn: 'খুলনা বিভাগ',
    divisionEn: 'Khulna Division',
    image: '/src/assets/images/hero_bangladesh_sunset_1791899705778.jpg',
    tagBn: 'গীতাঞ্জলি রচনার পুণ্যস্মৃতি',
    tagEn: 'Tagore Riverside Country Estate',
    category: 'historical',
    descriptionBn: 'বিশ্বকবি রবীন্দ্রনাথ ঠাকুরের স্মৃতিবিজড়িত ত্রিতল ভবন যেখানে রচিত হয়েছে বহু কালজয়ী গান ও কবিতা।',
    descriptionEn: 'The picturesque country mansion where Nobel Laureate Rabindranath Tagore penned many immortal poems.',
    link: '/tourism/shilaidaha_kuthibari'
  },

  // 49. Bhawal National Park
  {
    id: 'bhawal_national_park',
    nameBn: 'ভাওয়াল জাতীয় উদ্যান',
    nameEn: 'Bhawal National Park',
    locationBn: 'গাজীপুর সদর',
    locationEn: 'Gazipur Sadar',
    divisionBn: 'ঢাকা বিভাগ',
    divisionEn: 'Dhaka Division',
    image: '/src/assets/images/sundarbans_mangrove_1791899708610.jpg',
    tagBn: 'ভাওয়াল গড়ের বিশাল শালবন',
    tagEn: 'Historic Sal Forest Sanctuary',
    category: 'forest',
    descriptionBn: 'রাজধানীর সন্নিকটে অবস্থিত সুবিশাল শালবনের অভয়ারণ্য, কৃত্রিম লেক ও পাখিদের কলতান।',
    descriptionEn: 'A vast protected tropical moist deciduous sal forest located just north of the capital city.',
    link: '/tourism/bhawal_national_park'
  },

  // 50. Bangabandhu Safari Park (Gazipur)
  {
    id: 'gazipur_safari_park',
    nameBn: 'বঙ্গবন্ধু শেখ মুজিব সাফারি পার্ক',
    nameEn: 'Bangabandhu Safari Park',
    locationBn: 'শ্রীপুর, গাজীপুর',
    locationEn: 'Sreepur, Gazipur',
    divisionBn: 'ঢাকা বিভাগ',
    divisionEn: 'Dhaka Division',
    image: '/src/assets/images/sundarbans_mangrove_1791899708610.jpg',
    tagBn: 'উন্মুক্ত সাফারি ও বন্যপ্রাণী',
    tagEn: 'Open Wilderness Safari',
    category: 'forest',
    descriptionBn: 'উন্মুক্ত পরিবেশে বাঘ, সিংহ, হাতি, জিরাফ ও জলহস্তীদের মুক্ত বিচরণ দেখার দক্ষিণ এশিয়ার অন্যতম আধুনিক পার্ক।',
    descriptionEn: 'An expansive open wildlife reserve where tigers, lions, and zebras roam freely across natural landscapes.',
    link: '/tourism/gazipur_safari_park'
  }
];
