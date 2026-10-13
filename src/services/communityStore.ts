import { TravelStory, StoryComment, StorySubmissionPayload, StoryFilterOptions, ModerationStatus } from '../types/community';
import {
  SAJEK_IMAGE,
  COXSBAZAR_IMAGE,
  SUNDARBANS_IMAGE,
  RATARGUL_IMAGE,
  SYLHET_TEA_IMAGE,
  BANDARBAN_IMAGE,
  KUAKATA_IMAGE,
  KAPTAI_IMAGE
} from '../data/bangladeshData';

const STORAGE_KEY_STORIES = 'explore_bd_community_stories_v1';
const STORAGE_KEY_COMMENTS = 'explore_bd_community_comments_v1';
const STORAGE_KEY_LIKES = 'explore_bd_community_likes_v1';
const STORAGE_KEY_HELPFUL = 'explore_bd_community_helpful_v1';

// Initial authentic community stories
const INITIAL_COMMUNITY_STORIES: TravelStory[] = [
  {
    id: 'story-sajek-clouds-2026',
    titleBn: 'মেঘের ভেলায় তিন দিন: সাজেক ভ্যালির রুইলুই ও কংলাক পাহাড়ে',
    titleEn: 'Three Days Floating on Clouds: Sajek Valley, Ruilui & Konglak Peak',
    storyBn: 'গত মাসে আমরা চার বন্ধু মিলে খাগড়াছড়ি হয়ে চান্দের গাড়িতে সাজেক ভ্যালির উদ্দেশ্যে যাত্রা করি। সেনাবাহিনীর এসকোর্টে আঁকাবাঁকা পাহাড়ি পথ বেয়ে যখন রুইলুই পাড়ায় পৌঁছালাম, চোখের সামনে যেন মেঘের এক সুবিশাল সমুদ্র খুলে গেল। ভোরবেলায় কটেজের বারান্দায় দাঁড়িয়ে সূর্যোদয়ের দৃশ্য ছিল জীবনের অন্যতম স্মরণীয় মুহূর্ত। কংলাক পাহাড়ের খাড়া পথ বেয়ে চূড়ায় ওঠার ক্লান্তি এক নিমেষে মুছে গিয়েছিল ওপর থেকে ৩৬০ ডিগ্রি মেঘের ঢেউ দেখে। স্থানীয় লুসাই ও ত্রিপুরাদের আতিথেয়তা এবং বাঁশের চুঙ্গিতে রান্না করা ব্যাম্বু চিকেন ছিল অসাধারণ। পাহাড়ি বাতাস ও রাতের নীল আকাশ কখনোই ভোলার নয়।',
    storyEn: 'Last month four of us embarked on an unforgettable journey to Sajek Valley via Khagrachhari on an open 4x4 Chander Gari. Ascending winding mountain ridges under army convoy, the moment we reached Ruilui Para, a vast ocean of white clouds opened before our eyes. Watching sunrise from our eco-cottage balcony was mesmerizing. Trekking to the summit of Konglak Peak wiped away all fatigue with panoramic 360-degree vistas across rolling cloud blankets. The warmth of the Lushai people and authentic bamboo chicken cooked over fire were magical.',
    destinationNameBn: 'সাজেক ভ্যালি',
    destinationNameEn: 'Sajek Valley',
    destinationSpotId: 'sajek_valley',
    divisionId: 'chattogram',
    districtId: 'rangamati',
    upazilaNameBn: 'বাঘাইছড়ি',
    upazilaNameEn: 'Baghaichhari',
    visitDate: '২০২৬-০২-১৫',
    rating: 5,
    whatSawBn: 'কংলাক পাহাড়ের চূড়া, রুইলুই পাড়া, হেলিপ্যাডে সূর্যাস্ত, মেঘের গভীর সমুদ্র ও পাহাড়ি ঝর্ণা।',
    whatSawEn: 'Konglak Peak summit, Ruilui indigenous hamlet, helipad sunset, endless cloud ocean, mountain cascades.',
    whatLikedMostBn: 'ভোরবেলায় বারান্দা ছুঁয়ে উড়ে যাওয়া সাদা মেঘ ও বাঁশের চুঙ্গির ঐতিহ্যবাহী খাবার।',
    whatLikedMostEn: 'Misty clouds floating right through our cottage verandah at sunrise and flavorful bamboo chicken.',
    travelTipsBn: 'খাগড়াছড়ি থেকে সকালের এসকোর্ট ধরা জরুরি (সকাল ১০টা বা দুপুর ২টা)। আগে থেকে কাঠের কটেজ বুক করে নিন। পর্যাপ্ত নগদ টাকা সাথে রাখুন কারণ ওপরে এটিএম নেই।',
    travelTipsEn: 'Arrive early in Khagrachhari for the 10 AM or 2 PM army convoys. Book wooden eco-cottages in advance and carry sufficient cash as ATMs are unavailable in the hills.',
    estimatedCostBn: 'জনপ্রতি প্রায় ৫,৫০০ - ৭,০০০ টাকা (৩ দিন ২ রাত)',
    estimatedCostEn: 'Approx. Tk 5,500 - 7,000 per person (3 days 2 nights)',
    photos: [SAJEK_IMAGE, BANDARBAN_IMAGE],
    authorName: 'তানভীর আহমেদ',
    authorEmail: 'tanvir.traveler@gmail.com',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    authorLocation: 'ঢাকা',
    createdAt: '২০২৬-০২-২০',
    likesCount: 142,
    helpfulCount: 89,
    commentsCount: 12,
    status: 'approved',
    isPublicApproved: true,
    reportsCount: 0,
    tagsBn: ['সাজেক', 'পাহাড়', 'মেঘের রাজ্য', 'কংলাক'],
    tagsEn: ['Sajek', 'Hills', 'Clouds', 'Konglak']
  },
  {
    id: 'story-coxsbazar-marine-drive',
    titleBn: 'মেরিন ড্রাইভ রোড ও ইনানীর পাথুরে সৈকতে রূপালী সন্ধ্যা',
    titleEn: 'Marine Drive Coastal Cruise & Sunset at Inani Coral Beach',
    storyBn: 'ঢাকা থেকে নতুন দ্রুতগতির ট্রেনে মাত্র ৫ ঘণ্টায় কক্সবাজার স্টেশনে পৌঁছানো এখন সত্যিই এক অভাবনীয় অভিজ্ঞতা। সকালে কলাতলী ও লাবণী পয়েন্টে ঢেউয়ের তালে গোসল শেষে আমরা একটি খোলা জিপ নিয়ে বিশ্বের দীর্ঘতম ৮০ কিলোমিটার মেরিন ড্রাইভ রোড ধরে রওনা হই। একদিকে বিশাল সবুজ পাহাড় আর অন্যদিকে নীলাভ বঙ্গোপসাগরের গর্জন—এই পথের প্রতিটি বাঁক এক রূপকথা। ইনানী সৈকতে গিয়ে প্রবাল পাথরের ওপর বসে অস্তগামী লাল সূর্য দেখার অনুভূতি অসাধারণ। হিমছড়ি জাতীয় উদ্যানে গিয়ে পাহাড়ি ঝর্ণা ও ভিউ পয়েন্ট থেকে সাগরের বিস্তার দেখার স্মৃতি সবসময় মনে রাখার মতো।',
    storyEn: 'Taking the new high-speed train directly from Dhaka to Cox’s Bazar in just 5 hours was astonishingly smooth. After a refreshing morning swim along Kolatoli beach, we rented an open jeep to traverse the 80 km Marine Drive Road. With verdant green hills on one side and the roaring Bay of Bengal on the other, every turn is cinematic. Sitting upon coral rocks at Inani Beach watching the crimson sun melt into the horizon was breathtaking.',
    destinationNameBn: 'কক্সবাজার সমুদ্রসৈকত ও ইনানী',
    destinationNameEn: "Cox's Bazar & Inani Beach",
    destinationSpotId: 'coxsbazar_beach',
    divisionId: 'chattogram',
    districtId: 'coxsbazar',
    upazilaNameBn: 'কক্সবাজার সদর ও উখিয়া',
    upazilaNameEn: "Cox's Bazar Sadar & Ukhia",
    visitDate: '২০২৬-০১-২৮',
    rating: 5,
    whatSawBn: 'মেরিন ড্রাইভ রোড, ইনানী পাথুরে সৈকত, হিমছড়ি ঝর্ণা, পাটুয়ারটেক ও স্থানীয় শুঁটকি পল্লী।',
    whatSawEn: 'Marine Drive highway, Inani coral reefs, Himchhari waterfall, Patuartek and coastal fishing hamlets.',
    whatLikedMostBn: 'মেরিন ড্রাইভ রোডে একপাশে সবুজ পাহাড় ও অন্যপাশে নীল সাগরের ঢেউয়ের রোমাঞ্চকর দৃশ্য।',
    whatLikedMostEn: 'Driving down Marine Drive with soaring emerald cliffs on the left and turquoise waves on the right.',
    travelTipsBn: 'ইনানী ও হিমছড়ি ভ্রমণের জন্য দুপুর ২টার দিকে রওনা হলে সূর্যাস্তের সেরা আলো পাওয়া যায়। প্রবাল পাথরে হাঁটার সময় গ্রিপযুক্ত জুতো পরুন।',
    travelTipsEn: 'Start around 2 PM for Inani to catch the golden sunset light. Wear rubber reef shoes when walking over rocky coral formations.',
    estimatedCostBn: 'জনপ্রতি ৪,০০০ - ৬,০০০ টাকা (২ দিন ১ রাত)',
    estimatedCostEn: 'Approx. Tk 4,000 - 6,000 per person (2 days 1 night)',
    photos: [COXSBAZAR_IMAGE, KUAKATA_IMAGE],
    authorName: 'ফারহানা ইসলাম সুমি',
    authorEmail: 'farhana.sumi@gmail.com',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    authorLocation: 'চট্টগ্রাম',
    createdAt: '২০২৬-০২-০২',
    likesCount: 118,
    helpfulCount: 74,
    commentsCount: 9,
    status: 'approved',
    isPublicApproved: true,
    reportsCount: 0,
    tagsBn: ['কক্সবাজার', 'মেরিন ড্রাইভ', 'ইনানী', 'সমুদ্রসৈকত'],
    tagsEn: ['CoxsBazar', 'MarineDrive', 'Inani', 'Beach']
  },
  {
    id: 'story-sundarbans-wildlife-cruise',
    titleBn: 'ম্যানগ্রোভের গহীনে: সুন্দরবন কটকা ও কচিখালীতে তিন রাত',
    titleEn: 'Deep in the Mangroves: Three Nights across Sundarbans Kotka & Kochikhali',
    storyBn: 'মোংলা বন্দর থেকে পর্যটন জাহাজে চড়ে শুরু হয়েছিল আমাদের সুন্দরবন অভিযান। পশুর নদী পেরিয়ে যখন আমরা ঘন ম্যানগ্রোভ বনের নদীজালে প্রবেশ করলাম, আধুনিক পৃথিবীর সব কোলাহল যেন উবে গেল। দ্বিতীয় দিন ভোরে কটকা ওয়াচ টাওয়ারের কাছে কাঠের ছোট ডিঙি নৌকায় খালের ভেতরে যাওয়ার সময় একঝাঁক চিত্রা হরিণ, বিশাল লবণাক্ত পানির কুমির এবং ধনেশ পাখি দেখতে পাই। করমজল বন্যপ্রাণী প্রজনন কেন্দ্র ও হাড়বাড়িয়া ইকো-ট্যুরিজম ট্রেইল ধরে ম্যানগ্রোভের শ্বাসমূলের মধ্য দিয়ে হাঁটা দারুণ এক শিক্ষণীয় অভিজ্ঞতা ছিল। যদিও বাঘ মামার দেখা পাইনি, তবে কাদার ওপর তরতাজা বাঘের পায়ের ছাপ আমাদের রোমাঞ্চিত করেছিল।',
    storyEn: 'Boarding our tourist vessel from Mongla port marked the beginning of our deep Sundarbans wilderness expedition. Gliding into narrow estuarine canals, the silence was only broken by bird calls and gentle tidal ripples. Near Kotka watchtower at dawn, navigating in silent country canoes, we spotted herds of spotted deer, monitor lizards, and saltwater crocodiles. Walking along Harbaria wooden footpaths over pneumatophore roots was surreal. Seeing fresh tiger pugmarks on the muddy banks sent shivers down our spine.',
    destinationNameBn: 'সুন্দরবন ম্যানগ্রোভ বন',
    destinationNameEn: 'Sundarbans Mangrove Forest',
    destinationSpotId: 'sundarbans_forest',
    divisionId: 'khulna',
    districtId: 'khulna_district',
    upazilaNameBn: 'মোংলা ও শরণখোলা',
    upazilaNameEn: 'Mongla & Sharankhola',
    visitDate: '২০২৬-০১-১২',
    rating: 5,
    whatSawBn: 'চিত্রা হরিণ, কুমির, বানর, মাছরাঙা, কটকা ওয়াচ টাওয়ার, শ্বাসমূল ও বাঘের পায়ের ছাপ।',
    whatSawEn: 'Spotted deer, saltwater crocodiles, kingfishers, Kotka watchtower, dense mangrove roots, and tiger tracks.',
    whatLikedMostBn: 'ভোরে ছোট নৌকায় নিঃশব্দে খালের ভেতর দিয়ে চলার সময় পাখির ডাক ও শান্ত প্রকৃতি।',
    whatLikedMostEn: 'Silent sunrise canal cruise in a wooden canoe listening to the heartbeat of the forest.',
    travelTipsBn: 'অনুমোদিত ট্যুর অপারেটরের মাধ্যমে ভ্রমণ করুন। বনবিভাগের গানম্যান সাথে নেওয়া বাধ্যতামূলক। বনে প্লাস্টিক বা আবর্জনা ফেলা সম্পূর্ণ নিষিদ্ধ।',
    travelTipsEn: 'Travel only with licensed tour operators with official forest armed guards. Strictly follow zero-plastic environmental etiquette.',
    estimatedCostBn: 'জনপ্রতি ১১,০০০ - ১৫,০০০ টাকা (৩ দিন ৩ রাত ক্রুজ প্যাকেজ)',
    estimatedCostEn: 'Approx. Tk 11,000 - 15,000 per person (3 days 3 nights all-inclusive cruise)',
    photos: [SUNDARBANS_IMAGE],
    authorName: 'রাকিবুল হাসান',
    authorEmail: 'rakib.wildlife@yahoo.com',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    authorLocation: 'খুলনা',
    createdAt: '২০২৬-০১-১৮',
    likesCount: 95,
    helpfulCount: 62,
    commentsCount: 7,
    status: 'approved',
    isPublicApproved: true,
    reportsCount: 0,
    tagsBn: ['সুন্দরবন', 'ম্যানগ্রোভ', 'হরিণ', 'বন্যপ্রাণী'],
    tagsEn: ['Sundarbans', 'Mangrove', 'Wildlife', 'Ecotourism']
  },
  {
    id: 'story-ratargul-swamp-canoe',
    titleBn: 'মিঠা পানির আমাজন: রাতারগুল সোয়াম্প ফরেস্টে ডিঙি নৌকার ভ্রমণ',
    titleEn: 'Freshwater Amazon: Silent Canoe Safari in Ratargul Swamp Forest',
    storyBn: 'সিলেট শহর থেকে সিএনজিতে মোটরঘাট পৌঁছে আমরা একটি ইঞ্জিনবিহীন দেশি ডিঙি নৌকা ভাড়া করি। বর্ষার শেষভাগে হিজল ও বরুণ গাছের নিমজ্জিত ডালপালার মধ্য দিয়ে নৌকা যখন ভেতরে ঢুকছিল, মনে হচ্ছিল কোনো রূপকথার দেশে আছি। মাথার ওপরে ঘন সবুজ গাছের ছাউনি, নিচে স্বচ্ছ পান্না সবুজ জল। নৌকার মাঝির কণ্ঠে সিলেটের আঞ্চলিক গান আর দাঁড়ের মৃদু ছপছপ শব্দ এক অপার্থিব পরিবেশ তৈরি করেছিল। ওয়াচ টাওয়ারের চূড়ায় উঠে পুরো বনের জলে ভাসা সবুজ ক্যানোপি দেখার দৃশ্য ভাষায় প্রকাশ করার মতো নয়।',
    storyEn: 'Reaching Motorghat from Sylhet city, we hired a silent wooden country canoe. Navigating beneath submerged branches of freshwater Hijol and Koroch trees felt like stepping into an ancient fairytale. Crystal waters mirrored the dense green canopy overhead. The boatman’s gentle folk songs accompanied by the soft splash of wooden oars created a meditative peace. The vista from the forest watchtower over the drowned emerald forest is etched in memory forever.',
    destinationNameBn: 'রাতারগুল সোয়াম্প ফরেস্ট',
    destinationNameEn: 'Ratargul Swamp Forest',
    destinationSpotId: 'ratargul_swamp_forest',
    divisionId: 'sylhet',
    districtId: 'sylhet_district',
    upazilaNameBn: 'গোয়াইনঘাট',
    upazilaNameEn: 'Gowainghat',
    visitDate: '২০২৫-০৯-২০',
    rating: 4,
    whatSawBn: 'পানিতে নিমজ্জিত হিজল ও বরুণ গাছ, ওয়াচ টাওয়ারের বিস্তার, বিভিন্ন প্রজাতির জলজ পাখি ও সাপ।',
    whatSawEn: 'Submerged freshwater trees, high watchtower panorama, colorful waterbirds, and aquatic flora.',
    whatLikedMostBn: 'গাছের ডালপালার ভেতর দিয়ে নিঃশব্দে নৌকায় ভেসে চলা এবং চারপাশের শ্যামল স্নিগ্ধতা।',
    whatLikedMostEn: 'Gliding silently beneath tangled submerged boughs enveloped in cool emerald shade.',
    travelTipsBn: 'বর্ষাকাল (জুলাই-অক্টোবর) যাওয়ার সেরা সময়। নৌকা ভাড়া দরদাম করে নিন। ওয়াচ টাওয়ারে ওঠার সময় সাবধানে পা ফেলুন।',
    travelTipsEn: 'Monsoon (July to October) is the prime season to see flooded water levels. Agree on boat fares beforehand.',
    estimatedCostBn: 'জনপ্রতি ১,২০০ - ১,৮০০ টাকা (সিলেট থেকে ডে-ট্রিপ)',
    estimatedCostEn: 'Approx. Tk 1,200 - 1,800 per person (day trip from Sylhet)',
    photos: [RATARGUL_IMAGE],
    authorName: 'মাহিয়া তাসনিম',
    authorEmail: 'mahiya.tasnim@gmail.com',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    authorLocation: 'সিলেট',
    createdAt: '২০২৫-১০-০২',
    likesCount: 88,
    helpfulCount: 51,
    commentsCount: 6,
    status: 'approved',
    isPublicApproved: true,
    reportsCount: 0,
    tagsBn: ['রাতারগুল', 'সোয়াম্প ফরেস্ট', 'সিলেট', 'নৌকা ভ্রমণ'],
    tagsEn: ['Ratargul', 'SwampForest', 'Sylhet', 'Canoe']
  },
  {
    id: 'story-sreemangal-tea-rainforest',
    titleBn: 'চায়ের দেশে সাইকেল ভ্রমণ ও লাউয়াছড়া জাতীয় উদ্যানে উল্লুক দর্শন',
    titleEn: 'Cycling Through Sreemangal Tea Estates & Spotting Hoolock Gibbons in Lawachara',
    storyBn: 'শ্রীমঙ্গল শহরে নেমেই আমরা দুই দিনের জন্য দুটি বাইসাইকেল ভাড়া করি। চা বাগানের আঁকাবাঁকা মসৃণ পিচঢালা পথ ধরে সাইকেল চালানো জীবনের অন্যতম সেরা অভিজ্ঞতা। যতদূর চোখ যায় কেবল সবুজ গালিচার মতো টিলা। বিকেলে লাউয়াছড়া জাতীয় উদ্যানের ট্রেইলে ঢোকার কিছুক্ষণ পরেই গাছের উঁচু ডালে মহাবিপন্ন উল্লুকের (Hoolock Gibbon) পরিবারের লাফালাফি ও অদ্ভুত ডাক শুনতে পাই। নীলকণ্ঠ টি কেবিনে গিয়ে বিখ্যাত সাত রঙের চায়ের স্বাদ নেওয়া এবং রাতে পাহাড়ি আনারসের স্বাদ ভ্রমণকে পরিপূর্ণ করেছে।',
    storyEn: 'Arriving in Sreemangal by early morning express train, we rented bicycles for two days. Pedaling through undulating tea garden paths flanked by shade trees was pure bliss. In the afternoon at Lawachara National Park trail, we were blessed to spot a family of endangered Western Hoolock Gibbons leaping across high fig trees. Tasting the iconic seven-layer tea at Nilkantha Cabin and biting into fresh organic pineapples topped off a rejuvenating weekend.',
    destinationNameBn: 'শ্রীমঙ্গল ও লাউয়াছড়া',
    destinationNameEn: 'Sreemangal & Lawachara',
    destinationSpotId: 'sreemangal_gardens',
    divisionId: 'sylhet',
    districtId: 'moulvibazar',
    upazilaNameBn: 'শ্রীমঙ্গল',
    upazilaNameEn: 'Sreemangal',
    visitDate: '২০২৬-০৩-০২',
    rating: 5,
    whatSawBn: 'দিগন্তবিস্তৃত চা বাগান, লাউয়াছড়া রেইনফরেস্ট, উল্লুক, খাসিয়া পুঞ্জি ও সাত রঙের চা।',
    whatSawEn: 'Endless terraced tea estates, Lawachara rainforest, Hoolock gibbons, Khasia tribal hamlet, seven-layer tea.',
    whatLikedMostBn: 'ভোরে কুয়াশাচ্ছন্ন চা বাগানে সাইকেল চালানো ও লাউয়াছড়ার বুনো নীরবতা।',
    whatLikedMostEn: 'Cycling through misty tea terraces at sunrise and the primal calls of gibbons in Lawachara.',
    travelTipsBn: 'শ্রীমঙ্গলে স্থানীয় সাইকেল ভাড়া পাওয়া যায় (প্রতিদিন ১৫০-২০০ টাকা)। লাউয়াছড়া সকালে গেলে বন্যপ্রাণী দেখার সম্ভাবনা অনেক বেশি।',
    travelTipsEn: 'Bicycles rent for Tk 150-200/day in town. Enter Lawachara early morning (7:00-8:30 AM) for highest wildlife sightings.',
    estimatedCostBn: 'জনপ্রতি ৩,৫০০ - ৪,৫০০ টাকা (২ দিন ১ রাত)',
    estimatedCostEn: 'Approx. Tk 3,500 - 4,500 per person (2 days 1 night)',
    photos: [SYLHET_TEA_IMAGE],
    authorName: 'আরিফুল হক',
    authorEmail: 'arif.travels@gmail.com',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    authorLocation: 'ঢাকা',
    createdAt: '২০২৬-০৩-০৮',
    likesCount: 104,
    helpfulCount: 71,
    commentsCount: 8,
    status: 'approved',
    isPublicApproved: true,
    reportsCount: 0,
    tagsBn: ['শ্রীমঙ্গল', 'চা বাগান', 'লাউয়াছড়া', 'সাইক্লিং'],
    tagsEn: ['Sreemangal', 'TeaGardens', 'Lawachara', 'Cycling']
  },
  {
    id: 'story-kaptai-lake-serenity',
    titleBn: 'কাপ্তাই হ্রদের নীল জল ও ঝুলন্ত সেতু: পাহাড়ি কটেজে এক রাত',
    titleEn: 'Serenity of Kaptai Lake & Suspension Bridge: An Overnight Mountain Retreat',
    storyBn: 'চট্টগ্রাম থেকে বাসে দুই ঘণ্টায় রাঙামাটি শহরে পৌঁছানো যায়। পর্যটন হলিডে কমপ্লেক্সের আইকনিক লাল রঙের ঝুলন্ত সেতু পার হয়ে স্পিডবোটে করে আমরা শুভলং ঝর্ণা দেখতে যাই। চারদিকে উঁচু সবুজ পাহাড়ের সারি আর মাঝে শান্ত কাঁচের মতো স্বচ্ছ নীল জলরাশি। হ্রদের বুকে জেগে ওঠা দ্বীপে পাহাড়ি পেঁপে ও কচি ডাব খাওয়ার অভিজ্ঞতা চমৎকার। রাতে হ্রদের পাড়ে কাঠের কটেজে বসে চাঁদের আলোয় জলের রূপ ছিল অনবদ্য। আদিবাসী চাকমা তাঁতিদের হাতে বোনা থামি ও বাঁশের হস্তশিল্পের সংগ্রহ দারুণ উপহার।',
    storyEn: 'Just two hours from Chattogram lies Rangamati surrounded by South Asia’s largest artificial mountain lake. Walking across the iconic red suspension bridge and taking a speed boat across to Shuvolong Waterfall was pure tranquility. Emerald mountain ridges reflect upon glass-like blue water. Staying overnight in a lakefront wooden cottage illuminated by moonlight was unforgettable.',
    destinationNameBn: 'কাপ্তাই লেক ও রাঙামাটি',
    destinationNameEn: 'Kaptai Lake & Rangamati',
    destinationSpotId: 'kaptai_lake',
    divisionId: 'chattogram',
    districtId: 'rangamati',
    upazilaNameBn: 'রাঙামাটি সদর',
    upazilaNameEn: 'Rangamati Sadar',
    visitDate: '২০২৬-০১-০৫',
    rating: 5,
    whatSawBn: 'ঝুলন্ত সেতু, শুভলং ঝর্ণা, রাজবন বিহার, কাপ্তাই লেক ও চাকমা হস্তশিল্প মার্কেট।',
    whatSawEn: 'Hanging Bridge, Shuvolong falls, Rajban Vihara Buddhist temple, Kaptai lake cruises, Chakma textiles.',
    whatLikedMostBn: 'স্পিডবোটে পাহাড়ের ভাঁজে ভাঁজে লেকের পানিতে বাতাস কেটে এগিয়ে যাওয়ার অনুভূতি।',
    whatLikedMostEn: 'Cruising across crystal mountain bays surrounded by silent green peaks.',
    travelTipsBn: 'শুভলং ঝর্ণায় বোট নেওয়ার সময় ট্রলার বা স্পিডবোটের ভাড়া যাচাই করুন। কাপ্তাই বাঁধ ও নেভি ক্যাম্পের ভিউপয়েন্ট ঘুরে দেখুন।',
    travelTipsEn: 'Compare boat hire charges at Tourist Ghat. Visit the Navy Camp and Dam viewpoint for grand lake vistas.',
    estimatedCostBn: 'জনপ্রতি ৪,০০০ - ৫,০০০ টাকা (২ দিন ১ রাত)',
    estimatedCostEn: 'Approx. Tk 4,000 - 5,000 per person (2 days 1 night)',
    photos: [KAPTAI_IMAGE],
    authorName: 'নুসরাত জাহান',
    authorEmail: 'nusrat.jahan@gmail.com',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    authorLocation: 'চট্টগ্রাম',
    createdAt: '২০২৬-০১-১৫',
    likesCount: 76,
    helpfulCount: 48,
    commentsCount: 5,
    status: 'approved',
    isPublicApproved: true,
    reportsCount: 0,
    tagsBn: ['কাপ্তাই লেক', 'রাঙামাটি', 'ঝুলন্ত সেতু', 'নৌকা ভ্রমণ'],
    tagsEn: ['KaptaiLake', 'Rangamati', 'SuspensionBridge', 'Boating']
  }
];

// Initial comments for stories
const INITIAL_COMMENTS: StoryComment[] = [
  {
    id: 'comm-1',
    storyId: 'story-sajek-clouds-2026',
    authorName: 'মাসুম পারভেজ',
    authorEmail: 'masumparvej117@gmail.com',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    content: 'খুবই চমৎকার ও তথ্যবহুল একটি ভ্রমণ অভিজ্ঞতা! কংলাক পাহাড়ে ওঠার টিপসটা খুব কাজে লাগবে। আগামী মাসে যাওয়ার ইচ্ছা আছে।',
    createdAt: '২০২৬-০২-২১',
    likesCount: 14
  },
  {
    id: 'comm-2',
    storyId: 'story-sajek-clouds-2026',
    authorName: 'সাদিয়া আফরিন',
    authorEmail: 'sadia.afreen@gmail.com',
    content: 'সাজেকে বাঁশের চিকেন সত্যিই অপূর্ব। আপনার কটেজটির নাম জানালে ভালো হতো।',
    createdAt: '২০২৬-০২-২২',
    likesCount: 8
  },
  {
    id: 'comm-3',
    storyId: 'story-coxsbazar-marine-drive',
    authorName: 'জাকির হোসেন',
    authorEmail: 'jakir.hossain@yahoo.com',
    content: 'নতুন ট্রেনে কক্সবাজার যাত্রা ভ্রমণ অনেক সহজ করে দিয়েছে। মেরিন ড্রাইভের ছবিগুলো দারুণ!',
    createdAt: '২০২৬-০২-০৪',
    likesCount: 11
  }
];

// Helper to get stories from localStorage
export const getStoredStories = (): TravelStory[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STORIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_STORIES, JSON.stringify(INITIAL_COMMUNITY_STORIES));
      return INITIAL_COMMUNITY_STORIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_COMMUNITY_STORIES;
  } catch (err) {
    console.error('Failed to parse community stories from storage:', err);
    return INITIAL_COMMUNITY_STORIES;
  }
};

// Helper to save stories
const saveStoredStories = (stories: TravelStory[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_STORIES, JSON.stringify(stories));
  } catch (err) {
    console.error('Failed to save stories to storage:', err);
  }
};

// Helper to get comments
export const getStoredComments = (): StoryComment[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMMENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(INITIAL_COMMENTS));
      return INITIAL_COMMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_COMMENTS;
  } catch (err) {
    console.error('Failed to parse comments from storage:', err);
    return INITIAL_COMMENTS;
  }
};

const saveStoredComments = (comments: StoryComment[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(comments));
  } catch (err) {
    console.error('Failed to save comments to storage:', err);
  }
};

// Get Likes map { [userEmail]: [storyId1, storyId2, ...] }
const getUserLikesMap = (): Record<string, string[]> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LIKES);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveUserLikesMap = (map: Record<string, string[]>) => {
  try {
    localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(map));
  } catch (e) {
    console.error(e);
  }
};

// Get Helpful map
const getUserHelpfulMap = (): Record<string, string[]> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HELPFUL);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveUserHelpfulMap = (map: Record<string, string[]>) => {
  try {
    localStorage.setItem(STORAGE_KEY_HELPFUL, JSON.stringify(map));
  } catch (e) {
    console.error(e);
  }
};

// Public Community Service
export const CommunityService = {
  // Get all approved stories with filters and sorting
  getApprovedStories(filters?: StoryFilterOptions): TravelStory[] {
    const all = getStoredStories();
    let approved = all.filter(s => s.status === 'approved' && s.isPublicApproved);

    if (filters) {
      if (filters.divisionId && filters.divisionId !== 'all') {
        approved = approved.filter(s => s.divisionId === filters.divisionId);
      }
      if (filters.districtId && filters.districtId !== 'all') {
        approved = approved.filter(s => s.districtId === filters.districtId);
      }
      if (filters.destinationName && filters.destinationName.trim()) {
        const query = filters.destinationName.toLowerCase().trim();
        approved = approved.filter(
          s =>
            s.destinationNameBn.toLowerCase().includes(query) ||
            s.destinationNameEn.toLowerCase().includes(query)
        );
      }
      if (filters.minRating && filters.minRating > 0) {
        approved = approved.filter(s => s.rating >= (filters.minRating || 0));
      }
      if (filters.searchQuery && filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        approved = approved.filter(
          s =>
            s.titleBn.toLowerCase().includes(q) ||
            s.titleEn.toLowerCase().includes(q) ||
            s.storyBn.toLowerCase().includes(q) ||
            s.storyEn.toLowerCase().includes(q) ||
            s.authorName.toLowerCase().includes(q) ||
            s.destinationNameBn.toLowerCase().includes(q) ||
            s.destinationNameEn.toLowerCase().includes(q)
        );
      }

      // Sorting
      if (filters.sortBy === 'mostLiked') {
        approved.sort((a, b) => b.likesCount - a.likesCount);
      } else if (filters.sortBy === 'highestRated') {
        approved.sort((a, b) => b.rating - a.rating);
      } else {
        // 'newest' default
        approved.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    }

    return approved;
  },

  // Get single story by ID (approved or authored by user)
  getStoryById(id: string, userEmail?: string, isAdmin?: boolean): TravelStory | null {
    const all = getStoredStories();
    const story = all.find(s => s.id === id);
    if (!story) return null;

    // Public if approved, or accessible if author or admin
    if (story.status === 'approved' || (userEmail && story.authorEmail === userEmail) || isAdmin) {
      return story;
    }
    return null;
  },

  // Submit new story
  submitStory(
    payload: StorySubmissionPayload,
    user: { name: string; email: string; avatar?: string }
  ): { success: boolean; story: TravelStory; message: string } {
    const all = getStoredStories();
    const newId = `story-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];

    // Form sanitization and length bounds
    const sanitizedTitle = payload.title.trim().slice(0, 150);
    const sanitizedStory = payload.story.trim().slice(0, 5000);
    const sanitizedDestination = payload.destinationName.trim().slice(0, 100);

    const newStory: TravelStory = {
      id: newId,
      titleBn: sanitizedTitle,
      titleEn: sanitizedTitle,
      storyBn: sanitizedStory,
      storyEn: sanitizedStory,
      destinationNameBn: sanitizedDestination,
      destinationNameEn: sanitizedDestination,
      destinationSpotId: payload.destinationSpotId,
      divisionId: payload.divisionId,
      districtId: payload.districtId,
      upazilaNameBn: payload.upazilaName,
      upazilaNameEn: payload.upazilaName,
      visitDate: payload.visitDate || today,
      rating: Math.max(1, Math.min(5, payload.rating || 5)),
      whatSawBn: payload.whatSaw.trim(),
      whatSawEn: payload.whatSaw.trim(),
      whatLikedMostBn: payload.whatLikedMost.trim(),
      whatLikedMostEn: payload.whatLikedMost.trim(),
      travelTipsBn: payload.travelTips.trim(),
      travelTipsEn: payload.travelTips.trim(),
      estimatedCostBn: payload.estimatedCost?.trim(),
      estimatedCostEn: payload.estimatedCost?.trim(),
      photos: payload.photos && payload.photos.length > 0 ? payload.photos : [COXSBAZAR_IMAGE],
      authorName: user.name || 'Anonymous Traveler',
      authorEmail: user.email,
      authorAvatar: user.avatar,
      createdAt: today,
      likesCount: 0,
      helpfulCount: 0,
      commentsCount: 0,
      // Default to approved for demo experience, with moderation flags ready
      status: 'approved',
      isPublicApproved: payload.grantPublicPermission,
      reportsCount: 0
    };

    all.unshift(newStory);
    saveStoredStories(all);

    return {
      success: true,
      story: newStory,
      message: 'আপনার ভ্রমণের গল্পটি সফলভাবে প্রকাশিত হয়েছে!'
    };
  },

  // Check if user has liked
  hasUserLiked(storyId: string, userEmail: string): boolean {
    if (!userEmail) return false;
    const map = getUserLikesMap();
    return (map[userEmail] || []).includes(storyId);
  },

  // Toggle Like (prevents duplicate likes)
  toggleLikeStory(storyId: string, userEmail: string): { liked: boolean; newCount: number } {
    if (!userEmail) return { liked: false, newCount: 0 };
    const all = getStoredStories();
    const storyIndex = all.findIndex(s => s.id === storyId);
    if (storyIndex === -1) return { liked: false, newCount: 0 };

    const map = getUserLikesMap();
    const userLikes = map[userEmail] || [];
    const alreadyLiked = userLikes.includes(storyId);

    if (alreadyLiked) {
      // Remove like
      map[userEmail] = userLikes.filter(id => id !== storyId);
      all[storyIndex].likesCount = Math.max(0, (all[storyIndex].likesCount || 1) - 1);
    } else {
      // Add like
      map[userEmail] = [...userLikes, storyId];
      all[storyIndex].likesCount = (all[storyIndex].likesCount || 0) + 1;
    }

    saveUserLikesMap(map);
    saveStoredStories(all);

    return {
      liked: !alreadyLiked,
      newCount: all[storyIndex].likesCount
    };
  },

  // Check if user has marked helpful
  hasUserMarkedHelpful(storyId: string, userEmail: string): boolean {
    if (!userEmail) return false;
    const map = getUserHelpfulMap();
    return (map[userEmail] || []).includes(storyId);
  },

  // Toggle Helpful vote
  toggleHelpfulStory(storyId: string, userEmail: string): { helpful: boolean; newCount: number } {
    if (!userEmail) return { helpful: false, newCount: 0 };
    const all = getStoredStories();
    const storyIndex = all.findIndex(s => s.id === storyId);
    if (storyIndex === -1) return { helpful: false, newCount: 0 };

    const map = getUserHelpfulMap();
    const userHelpfuls = map[userEmail] || [];
    const alreadyHelpful = userHelpfuls.includes(storyId);

    if (alreadyHelpful) {
      map[userEmail] = userHelpfuls.filter(id => id !== storyId);
      all[storyIndex].helpfulCount = Math.max(0, (all[storyIndex].helpfulCount || 1) - 1);
    } else {
      map[userEmail] = [...userHelpfuls, storyId];
      all[storyIndex].helpfulCount = (all[storyIndex].helpfulCount || 0) + 1;
    }

    saveUserHelpfulMap(map);
    saveStoredStories(all);

    return {
      helpful: !alreadyHelpful,
      newCount: all[storyIndex].helpfulCount
    };
  },

  // Get comments for a story
  getCommentsForStory(storyId: string): StoryComment[] {
    const all = getStoredComments();
    return all.filter(c => c.storyId === storyId);
  },

  // Add comment
  addComment(
    storyId: string,
    content: string,
    user: { name: string; email: string; avatar?: string }
  ): StoryComment {
    const comments = getStoredComments();
    const today = new Date().toISOString().split('T')[0];
    const newComment: StoryComment = {
      id: `comm-${Date.now()}`,
      storyId,
      authorName: user.name || 'Traveler',
      authorEmail: user.email,
      authorAvatar: user.avatar,
      content: content.trim().slice(0, 1000),
      createdAt: today,
      likesCount: 0
    };

    comments.unshift(newComment);
    saveStoredComments(comments);

    // Update comments count on story
    const stories = getStoredStories();
    const storyIndex = stories.findIndex(s => s.id === storyId);
    if (storyIndex !== -1) {
      stories[storyIndex].commentsCount = (stories[storyIndex].commentsCount || 0) + 1;
      saveStoredStories(stories);
    }

    return newComment;
  },

  // Report story
  reportStory(storyId: string, reason?: string): boolean {
    const stories = getStoredStories();
    const idx = stories.findIndex(s => s.id === storyId);
    if (idx === -1) return false;

    stories[idx].reportsCount = (stories[idx].reportsCount || 0) + 1;
    saveStoredStories(stories);
    return true;
  },

  // Edit story (only by author or admin)
  updateStory(
    storyId: string,
    updatedData: Partial<TravelStory>,
    userEmail: string,
    isAdmin?: boolean
  ): boolean {
    const stories = getStoredStories();
    const idx = stories.findIndex(s => s.id === storyId);
    if (idx === -1) return false;

    if (stories[idx].authorEmail !== userEmail && !isAdmin) {
      return false; // Unauthorized
    }

    stories[idx] = {
      ...stories[idx],
      ...updatedData
    };
    saveStoredStories(stories);
    return true;
  },

  // Delete story (only by author or admin)
  deleteStory(storyId: string, userEmail: string, isAdmin?: boolean): boolean {
    const stories = getStoredStories();
    const idx = stories.findIndex(s => s.id === storyId);
    if (idx === -1) return false;

    if (stories[idx].authorEmail !== userEmail && !isAdmin) {
      return false; // Unauthorized
    }

    const filtered = stories.filter(s => s.id !== storyId);
    saveStoredStories(filtered);
    return true;
  },

  // Admin: Get all stories (pending, approved, rejected, reported)
  getAllStoriesForAdmin(): TravelStory[] {
    return getStoredStories();
  },

  // Admin: Moderate story (Approve / Reject / Change status)
  moderateStory(storyId: string, status: ModerationStatus, reason?: string): boolean {
    const stories = getStoredStories();
    const idx = stories.findIndex(s => s.id === storyId);
    if (idx === -1) return false;

    stories[idx].status = status;
    stories[idx].isPublicApproved = status === 'approved';
    if (reason) stories[idx].rejectionReason = reason;

    saveStoredStories(stories);
    return true;
  },

  // Reset demo data
  resetDemoData(): void {
    localStorage.removeItem(STORAGE_KEY_STORIES);
    localStorage.removeItem(STORAGE_KEY_COMMENTS);
    localStorage.removeItem(STORAGE_KEY_LIKES);
    localStorage.removeItem(STORAGE_KEY_HELPFUL);
  }
};
