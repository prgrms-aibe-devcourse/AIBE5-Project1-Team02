// ===== 에니어그램 추천 시스템 =====
(function () {
    "use strict";

    // 에니어그램 타입 정의 (4개)
    const enneagramTypes = {
        1: {
            nickname: "완벽 루트 설계자",
            subtitle: "체계적이고 완벽한 여행을 추구합니다",
        },
        2: {
            nickname: "여행 메이트 천사",
            subtitle: "함께하는 사람들과의 추억을 중시합니다",
        },
        7: {
            nickname: "모험 콜렉터",
            subtitle: "다양하고 재미있는 경험을 추구합니다",
        },
        9: {
            nickname: "평화 수호자",
            subtitle: "편안하고 평화로운 휴식을 원합니다",
        },
    };

    // 완전한 여행지 데이터 (12개 - 각 타입별 3개씩)
    const destinations = {
        rome: {
            country: "이탈리아",
            name: "로마, 이탈리아",
            rating: "4.9 (5.2k 리뷰)",
            description:
                "완벽한 역사 탐방을 위한 도시! 체계적인 관광 루트와 잘 보존된 유적지로 계획적인 여행이 가능합니다.",
            about: "영원의 도시 로마는 3000년 역사를 자랑하는 이탈리아의 수도입니다. 콜로세움, 바티칸, 포로 로마노 등 세계적인 유적지가 밀집되어 효율적인 관광이 가능합니다.",
            images: [
                "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1080",
                "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1080",
                "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=1080",
                "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=1080",
            ],
            tags: [
                { icon: "account_balance", text: "역사 유적" },
                { icon: "museum", text: "박물관" },
                { icon: "architecture", text: "건축 예술" },
            ],
            landmarks: [
                {
                    name: "콜로세움",
                    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400",
                },
                {
                    name: "바티칸 박물관",
                    image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=400",
                },
                {
                    name: "트레비 분수",
                    image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=400",
                },
                {
                    name: "스페인 계단",
                    image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=400",
                },
            ],
            flights: [
                {
                    airline: "대한항공",
                    code: "KE935",
                    price: "₩1,280,000",
                    depart: "01:20 PM",
                    arrive: "07:10 PM",
                    duration: "12시간 50분",
                    stops: "직항",
                    from: "ICN",
                    to: "FCO",
                },
                {
                    airline: "아시아나항공",
                    code: "OZ561",
                    price: "₩1,350,000",
                    depart: "11:05 AM",
                    arrive: "05:15 PM",
                    duration: "13시간 10분",
                    stops: "직항",
                    from: "ICN",
                    to: "FCO",
                },
            ],
            matchScore: 95,
        },
        paris: {
            country: "프랑스",
            name: "파리, 프랑스",
            rating: "4.8 (6.8k 리뷰)",
            description:
                "예술과 문화의 완벽한 조화! 루브르, 오르세 등 체계적인 박물관 투어가 가능한 문화 도시입니다.",
            about: "빛의 도시 파리는 세계 최고의 문화 예술 도시입니다. 에펠탑, 루브르 박물관, 노트르담 대성당 등 계획적인 관광에 최적화된 도시입니다.",
            images: [
                "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1080",
                "https://i.namu.wiki/i/2ON4ZvVSdt5i_4K6im7LXnjdrdQz-SRf39aWMH80ieqfZkn4c6m0CGNkeI8CrqYdAPSVommLRXSpCNRi7MSqQw.webp",
                "https://upload.wikimedia.org/wikipedia/commons/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg",
                "https://i.namu.wiki/i/DVqnKGq98G_3roFwRhQ3WXbI29KxTp-n3sbNWYLOYGXbWjoacgFkFPmp0lXkKbqOfcT0bYug43UBZ5lzTGK-Zw.webp",
            ],
            tags: [
                { icon: "palette", text: "예술" },
                { icon: "museum", text: "박물관" },
                { icon: "restaurant", text: "미식" },
            ],
            landmarks: [
                {
                    name: "에펠탑",
                    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400",
                },
                {
                    name: "루브르 박물관",
                    image: "https://i.namu.wiki/i/2ON4ZvVSdt5i_4K6im7LXnjdrdQz-SRf39aWMH80ieqfZkn4c6m0CGNkeI8CrqYdAPSVommLRXSpCNRi7MSqQw.webp",
                },
                {
                    name: "개선문",
                    image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg",
                },
                {
                    name: "노트르담 대성당",
                    image: "https://i.namu.wiki/i/DVqnKGq98G_3roFwRhQ3WXbI29KxTp-n3sbNWYLOYGXbWjoacgFkFPmp0lXkKbqOfcT0bYug43UBZ5lzTGK-Zw.webp",
                },
            ],
            flights: [
                {
                    airline: "대한항공",
                    code: "KE901",
                    price: "₩1,420,000",
                    depart: "11:30 AM",
                    arrive: "04:55 PM",
                    duration: "12시간 25분",
                    stops: "직항",
                    from: "ICN",
                    to: "CDG",
                },
                {
                    airline: "에어프랑스",
                    code: "AF262",
                    price: "₩1,380,000",
                    depart: "12:50 PM",
                    arrive: "06:20 PM",
                    duration: "12시간 30분",
                    stops: "직항",
                    from: "ICN",
                    to: "CDG",
                },
                {
                    airline: "터키항공",
                    code: "TK091",
                    price: "₩980,000",
                    depart: "10:50 PM",
                    arrive: "12:15 PM +1",
                    duration: "19시간 25분",
                    stops: "1회 경유 (IST)",
                    from: "ICN",
                    to: "CDG",
                },
            ],
            matchScore: 93,
        },
        london: {
            country: "영국",
            name: "런던, 영국",
            rating: "4.7 (5.5k 리뷰)",
            description:
                "체계적인 대중교통과 잘 짜인 관광 코스! 대영박물관부터 왕궁까지 완벽한 계획 여행이 가능합니다.",
            about: "영국의 수도 런던은 역사와 현대가 공존하는 세계적인 도시���니다. 대영박물관, 버킹엄 궁전, 빅벤 등 명소가 대중교통으로 쉽게 연결됩니다.",
            images: [
                "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1080",
                "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=1080",
                "https://images.unsplash.com/photo-1543832923-44667a44c804?w=1080",
                "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1080",
            ],
            tags: [
                { icon: "castle", text: "왕실 문화" },
                { icon: "museum", text: "박물관" },
                { icon: "theater_comedy", text: "공연" },
            ],
            landmarks: [
                {
                    name: "빅벤",
                    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400",
                },
                {
                    name: "런던 아이",
                    image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=400",
                },
                {
                    name: "타워 브릿지",
                    image: "https://images.unsplash.com/photo-1543832923-44667a44c804?w=400",
                },
                {
                    name: "버킹엄 궁전",
                    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=400",
                },
            ],
            flights: [
                {
                    airline: "대한항공",
                    code: "KE907",
                    price: "₩1,520,000",
                    depart: "12:40 PM",
                    arrive: "05:15 PM",
                    duration: "11시간 35분",
                    stops: "직항",
                    from: "ICN",
                    to: "LHR",
                },
                {
                    airline: "아시아나항공",
                    code: "OZ521",
                    price: "₩1,480,000",
                    depart: "01:30 PM",
                    arrive: "06:10 PM",
                    duration: "11시간 40분",
                    stops: "직항",
                    from: "ICN",
                    to: "LHR",
                },
                {
                    airline: "핀에어",
                    code: "AY042",
                    price: "₩1,150,000",
                    depart: "05:45 PM",
                    arrive: "12:35 PM +1",
                    duration: "16시간 50분",
                    stops: "1회 경유 (HEL)",
                    from: "ICN",
                    to: "LHR",
                },
            ],
            matchScore: 91,
        },
        bali: {
            country: "인도네시아",
            name: "발리, 인도네시아",
            rating: "4.9 (7.3k 리뷰)",
            description:
                "따뜻한 현지인들과의 교류! 친절한 사람들과 함께하는 힐링 여행지로 단체 여행에 완벽합니다.",
            about: "신들의 섬 발리는 아름다운 자연과 따뜻한 사람들로 유명합니다. 우붓의 예술 마을, 해변 리조트, 사원 등 다양한 경험이 가능합니다.",
            images: [
                "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1080",
                "https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/95e718fc-90d5-4564-bd78-7b963f068b5a.jpeg",
                "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1080",
                "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1080",
            ],
            tags: [
                { icon: "groups", text: "단체 여행" },
                { icon: "spa", text: "힐링" },
                { icon: "temple_buddhist", text: "문화 교류" },
            ],
            landmarks: [
                {
                    name: "우붓 라이스 테라스",
                    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400",
                },
                {
                    name: "따나롯 사원",
                    image: "https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/95e718fc-90d5-4564-bd78-7b963f068b5a.jpeg",
                },
                {
                    name: "울루와뚜 사원",
                    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400",
                },
                {
                    name: "스미냑 비치",
                    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400",
                },
            ],
            flights: [
                {
                    airline: "대한항공",
                    code: "KE629",
                    price: "₩680,000",
                    depart: "08:40 PM",
                    arrive: "02:35 AM +1",
                    duration: "6시간 55분",
                    stops: "직항",
                    from: "ICN",
                    to: "DPS",
                },
                {
                    airline: "가루다 인도네시아",
                    code: "GA872",
                    price: "₩650,000",
                    depart: "10:20 PM",
                    arrive: "04:10 AM +1",
                    duration: "6시간 50분",
                    stops: "직항",
                    from: "ICN",
                    to: "DPS",
                },
                {
                    airline: "에어아시아",
                    code: "AK375",
                    price: "₩420,000",
                    depart: "06:15 AM",
                    arrive: "05:40 PM",
                    duration: "13시간 25분",
                    stops: "1회 경유 (KUL)",
                    from: "ICN",
                    to: "DPS",
                },
            ],
            matchScore: 96,
        },
        bangkok: {
            country: "태국",
            name: "방콕, 태국",
            rating: "4.8 (8.1k 리뷰)",
            description:
                "친절한 미소의 나라! 현지인들과의 따뜻한 교류와 맛있는 음식으로 함께 즐기는 여행지입니다.",
            about: "태국의 수도 방콕은 화려한 사원과 맛있는 음식, 친절한 사람들로 유명합니다. 왓 포, 왓 아룬, 카오산 로드 등 다양한 볼거리가 있습니다.",
            images: [
                "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1080",
                "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1080",
                "https://i.namu.wiki/i/-77pUvh-IUSpMp0LyUHFl8ld2CXAzduFblbqYol73RtF8fX3QgGAO8OBL-caREnSuGdNeM7i_EB9ULqGIdP7hQ.webp",
                "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=1080",
            ],
            tags: [
                { icon: "restaurant", text: "미식" },
                { icon: "temple_buddhist", text: "사원" },
                { icon: "favorite", text: "친절함" },
            ],
            landmarks: [
                {
                    name: "왓 프라깨우",
                    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400",
                },
                {
                    name: "왓 아룬",
                    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400",
                },
                {
                    name: "왓 포",
                    image: "https://i.namu.wiki/i/-77pUvh-IUSpMp0LyUHFl8ld2CXAzduFblbqYol73RtF8fX3QgGAO8OBL-caREnSuGdNeM7i_EB9ULqGIdP7hQ.webp",
                },
                {
                    name: "짜뚜짝 시장",
                    image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=400",
                },
            ],
            flights: [
                {
                    airline: "대한항공",
                    code: "KE653",
                    price: "₩420,000",
                    depart: "09:30 AM",
                    arrive: "01:20 PM",
                    duration: "5시간 50분",
                    stops: "직항",
                    from: "ICN",
                    to: "BKK",
                },
                {
                    airline: "타이항공",
                    code: "TG659",
                    price: "₩380,000",
                    depart: "11:20 AM",
                    arrive: "03:15 PM",
                    duration: "5시간 55분",
                    stops: "직항",
                    from: "ICN",
                    to: "BKK",
                },
                {
                    airline: "제주항공",
                    code: "7C2401",
                    price: "₩260,000",
                    depart: "06:50 AM",
                    arrive: "10:45 AM",
                    duration: "5시간 55분",
                    stops: "직항",
                    from: "ICN",
                    to: "BKK",
                },
            ],
            matchScore: 94,
        },
        vietnam: {
            country: "베트남",
            name: "다낭, 베트남",
            rating: "4.7 (4.9k 리뷰)",
            description:
                "가족, 친구와 함께! 리조트와 해변에서 즐기는 단체 여행에 최적화된 힐링 도시입니다.",
            about: "베트남 중부의 해변 도시 다낭은 아름다운 해변과 합리적인 가격으로 단체 여행객들에게 인기입니다. 호이안, 바나힐 등 근처 명소도 풍부합니다.",
            images: [
                "https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/71fef05e-e7d0-4f55-889b-89353e7db2da.jpeg",
                "https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/6fb5286d-9d08-49b1-b1f7-e90b53fd3f1d.jpeg",
                "https://cdn.imweb.me/upload/S20250314418ee30f8f716/a6688967ab6b5.jpg",
                "https://www.ach.or.kr/old/achnewsletter/news/202011261148425191.png",
            ],
            tags: [
                { icon: "beach_access", text: "해변" },
                { icon: "groups", text: "단체 여행" },
                { icon: "attach_money", text: "가성비" },
            ],
            landmarks: [
                {
                    name: "골든 브릿지",
                    image: "https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/71fef05e-e7d0-4f55-889b-89353e7db2da.jpeg",
                },
                {
                    name: "용다리",
                    image: "https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/6fb5286d-9d08-49b1-b1f7-e90b53fd3f1d.jpeg",
                },
                {
                    name: "바나힐",
                    image: "https://cdn.imweb.me/upload/S20250314418ee30f8f716/a6688967ab6b5.jpg",
                },
                {
                    name: "호이안 고대 도시",
                    image: "https://www.ach.or.kr/old/achnewsletter/news/202011261148425191.png",
                },
            ],
            flights: [
                {
                    airline: "대한항공",
                    code: "KE467",
                    price: "₩480,000",
                    depart: "08:10 AM",
                    arrive: "11:40 AM",
                    duration: "4시간 30분",
                    stops: "직항",
                    from: "ICN",
                    to: "DAD",
                },
                {
                    airline: "베트남항공",
                    code: "VN411",
                    price: "₩450,000",
                    depart: "09:45 AM",
                    arrive: "01:20 PM",
                    duration: "4시간 35분",
                    stops: "직항",
                    from: "ICN",
                    to: "DAD",
                },
                {
                    airline: "비엣젯항공",
                    code: "VJ826",
                    price: "₩320,000",
                    depart: "11:50 PM",
                    arrive: "03:25 AM +1",
                    duration: "4시간 35분",
                    stops: "직항",
                    from: "ICN",
                    to: "DAD",
                },
            ],
            matchScore: 92,
        },
        orlando: {
            country: "미국",
            name: "올랜도, 미국",
            rating: "4.9 (8.9k 리뷰)",
            description:
                "테마파크의 천국! 디즈니월드, 유니버설 스튜디오 등 끝없는 즐거움이 기다립니다.",
            about: "올랜도는 세계 최대의 테마파크 도시입니다. 디즈니월드, 유니버설 스튜디오, 시월드 등 하루 종일 즐길 거리가 가득합니다.",
            images: [
                "https://themeparkbuff.com/wp-content/uploads/2020/12/%EC%98%AC%EB%9E%9C%EB%8F%84-%EB%A6%AC%EC%A1%B0%ED%8A%B8-%EC%9C%A0%EB%8B%88%EB%B2%84%EC%85%9C.jpg",
                "https://www.agoda.com/wp-content/uploads/2024/04/orlando-1.jpg",
                "https://www.hilton.com/im/en/ORLHHHH/13979517/hbc-pool-overall-day-1-danham-2-28-19-lr.jpg?impolicy=crop&cw=4500&ch=3000&gravity=NorthWest&xposition=0&yposition=0&rw=1280&rh=854",
                "https://content.r9cdn.net/rimg/dimg/b0/34/b3ba72de-city-9900-16ed2ee666d.jpg?width=1366&height=768&xhint=2566&yhint=1884&crop=true",
            ],
            tags: [
                { icon: "attractions", text: "테마파크" },
                { icon: "family_restroom", text: "가족 여행" },
                { icon: "celebration", text: "축제" },
            ],
            landmarks: [
                {
                    name: "디즈니 월드",
                    image: "https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/a05c04cb-6804-4a14-a2bd-b07b8cd487ad",
                },
                {
                    name: "유니버설 스튜디오",
                    image: "https://themeparkbuff.com/wp-content/uploads/2020/12/%EC%98%AC%EB%9E%9C%EB%8F%84-%EB%A6%AC%EC%A1%B0%ED%8A%B8-%EC%9C%A0%EB%8B%88%EB%B2%84%EC%85%9C.jpg",
                },
                {
                    name: "매직 킹덤",
                    image: "https://blog.kakaocdn.net/dna/cSMZnh/btsq50zmOnF/AAAAAAAAAAAAAAAAAAAAANIu8TZfJUracwQGAZ0GlNawtDRRxk922a_l0jyT_gh7/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1769871599&allow_ip=&allow_referer=&signature=3PNycctFuviev6tn1VdMK%2F7yC0U%3D",
                },
                {
                    name: "시월드",
                    image: "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_864/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/wv5xsszdvvd3vgqyrt3u/SeaWorldOrlandoThemeParkTicket.webp",
                },
            ],
            flights: [
                {
                    airline: "대한항공",
                    code: "KE037",
                    price: "₩1,880,000",
                    depart: "02:10 PM",
                    arrive: "03:30 PM",
                    duration: "14시간 20분",
                    stops: "1회 경유 (ATL)",
                    from: "ICN",
                    to: "MCO",
                },
                {
                    airline: "델타 항공",
                    code: "DL159",
                    price: "₩1,750,000",
                    depart: "11:30 AM",
                    arrive: "02:45 PM",
                    duration: "16시간 15분",
                    stops: "1회 경유 (DTW)",
                    from: "ICN",
                    to: "MCO",
                },
                {
                    airline: "유나이티드 항공",
                    code: "UA128",
                    price: "₩1,820,000",
                    depart: "01:45 PM",
                    arrive: "04:20 PM",
                    duration: "15시간 35분",
                    stops: "1회 경유 (IAH)",
                    from: "ICN",
                    to: "MCO",
                },
            ],
            matchScore: 98,
        },
        barcelona: {
            country: "스페인",
            name: "바르셀로나, 스페인",
            rating: "4.8 (7.6k 리뷰)",
            description:
                "축제의 도시! 가우디 건축물과 해변, 축제가 어우러진 신나는 도시입니다.",
            about: "바르셀로나는 예술과 축제, 해변이 공존하는 활기찬 도시입니다. 사그라다 파밀리아, 구엘 공원 등 독특한 건축물과 라 람블라스 거리의 활기를 즐길 수 있습니다.",
            images: [
                "https://i.namu.wiki/i/j67-iKR3Hx769TT9hdBzLHwM0z5Ng2C-irZQfJbcO-bCZWFgVc08JQpEQzPJLa-mBhOz7d0GphRz5vLjxl3PYA.webp",
                "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=1080",
                "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1080",
                "https://media.istockphoto.com/id/1338651203/ko/%EC%82%AC%EC%A7%84/%EB%B0%94%EB%A5%B4%EC%85%80%EB%A1%9C%EB%82%98-%EC%8A%A4%ED%8E%98%EC%9D%B8-%EA%B0%80%EC%9D%84-%EB%8B%A8%ED%92%8D-%EC%8B%9C%EC%A6%8C%EB%9D%BC-%EB%9E%8C%EB%B8%94%EB%9D%BC-%EA%B1%B0%EB%A6%AC%EC%97%90%EC%84%9C-%EB%86%92%EC%9D%80-%EA%B0%81%EB%8F%84%EB%B3%B4%EA%B8%B0-%EB%8F%84%EC%8B%9C-%EC%8A%A4%EC%B9%B4%EC%9D%B4-%EB%9D%BC%EC%9D%B8.jpg?s=612x612&w=0&k=20&c=crL7iYiuXa1wcJ3aEnfvJ-va0XpP5Peop08KlRcKubY=",
            ],
            tags: [
                { icon: "celebration", text: "축제" },
                { icon: "beach_access", text: "해변" },
                { icon: "architecture", text: "건축" },
            ],
            landmarks: [
                {
                    name: "사그라다 파밀리아",
                    image: "https://i.namu.wiki/i/j67-iKR3Hx769TT9hdBzLHwM0z5Ng2C-irZQfJbcO-bCZWFgVc08JQpEQzPJLa-mBhOz7d0GphRz5vLjxl3PYA.webp",
                },
                {
                    name: "구엘 공원",
                    image: "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=400",
                },
                {
                    name: "카사 바트요",
                    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400",
                },
                {
                    name: "라 람블라스",
                    image: "https://media.istockphoto.com/id/1338651203/ko/%EC%82%AC%EC%A7%84/%EB%B0%94%EB%A5%B4%EC%85%80%EB%A1%9C%EB%82%98-%EC%8A%A4%ED%8E%98%EC%9D%B8-%EA%B0%80%EC%9D%84-%EB%8B%A8%ED%92%8D-%EC%8B%9C%EC%A6%8C%EB%9D%BC-%EB%9E%8C%EB%B8%94%EB%9D%BC-%EA%B1%B0%EB%A6%AC%EC%97%90%EC%84%9C-%EB%86%92%EC%9D%80-%EA%B0%81%EB%8F%84%EB%B3%B4%EA%B8%B0-%EB%8F%84%EC%8B%9C-%EC%8A%A4%EC%B9%B4%EC%9D%B4-%EB%9D%BC%EC%9D%B8.jpg?s=612x612&w=0&k=20&c=crL7iYiuXa1wcJ3aEnfvJ-va0XpP5Peop08KlRcKubY=",
                },
            ],
            flights: [
                {
                    airline: "대한항공",
                    code: "KE919",
                    price: "₩1,520,000",
                    depart: "12:40 PM",
                    arrive: "08:10 PM",
                    duration: "14시간 30분",
                    stops: "1회 경유 (MAD)",
                    from: "ICN",
                    to: "BCN",
                },
                {
                    airline: "에미레이트 항공",
                    code: "EK322",
                    price: "₩1,380,000",
                    depart: "11:35 PM",
                    arrive: "11:50 AM +1",
                    duration: "18시간 15분",
                    stops: "1회 경유 (DXB)",
                    from: "ICN",
                    to: "BCN",
                },
                {
                    airline: "터키항공",
                    code: "TK091",
                    price: "₩1,220,000",
                    depart: "10:50 PM",
                    arrive: "09:30 AM +1",
                    duration: "16시간 40분",
                    stops: "1회 경유 (IST)",
                    from: "ICN",
                    to: "BCN",
                },
            ],
            matchScore: 96,
        },
        phuket: {
            country: "태국",
            name: "푸켓, 태국",
            rating: "4.8 (6.7k 리뷰)",
            description:
                "수상 스포츠의 천국! 다이빙, 스노클링, 제트스키 등 다양한 액티비티를 즐길 수 있습니다.",
            about: "푸켓은 태국 최대의 섬 휴양지로 아름다운 해변과 다양한 수상 스포츠, 밤문화로 유명합니다. 끊임없는 즐거움이 있는 곳입니다.",
            images: [
                "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1080",
                "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1080",
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1080",
                "https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=1080",
            ],
            tags: [
                { icon: "surfing", text: "수상 스포츠" },
                { icon: "beach_access", text: "해변" },
                { icon: "nightlife", text: "나이트라이프" },
            ],
            landmarks: [
                {
                    name: "파통 비치",
                    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400",
                },
                {
                    name: "피피 섬",
                    image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400",
                },
                {
                    name: "빅 부다",
                    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
                },
                {
                    name: "프롬텝 곶",
                    image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=400",
                },
            ],
            flights: [
                {
                    airline: "대한항공",
                    code: "KE639",
                    price: "₩580,000",
                    depart: "10:20 PM",
                    arrive: "02:05 AM +1",
                    duration: "5시간 45분",
                    stops: "직항",
                    from: "ICN",
                    to: "HKT",
                },
                {
                    airline: "타이항공",
                    code: "TG655",
                    price: "₩620,000",
                    depart: "09:30 AM",
                    arrive: "04:50 PM",
                    duration: "9시간 20분",
                    stops: "1회 경유 (BKK)",
                    from: "ICN",
                    to: "HKT",
                },
                {
                    airline: "에어아시아",
                    code: "AK375",
                    price: "₩380,000",
                    depart: "06:15 AM",
                    arrive: "03:30 PM",
                    duration: "11시간 15분",
                    stops: "1회 경유 (KUL)",
                    from: "ICN",
                    to: "HKT",
                },
            ],
            matchScore: 94,
        },
        maldives: {
            country: "몰디브",
            name: "말레, 몰디브",
            rating: "4.9 (3.1k 리뷰)",
            description:
                "완벽한 평화! 수상 빌라에서 바다를 바라보며 진정한 휴식을 취하세요.",
            about: "몰디브는 인도양에 위치한 열대 낙원으로 크리스탈처럼 맑은 바다와 고요한 분위기로 완벽한 힐링을 제공합니다.",
            images: [
                "https://images.unsplash.com/photo-1662792721650-545a15f07ff6?w=1080",
                "https://images.unsplash.com/photo-1624032446731-1d3c9806d995?w=1080",
                "https://images.unsplash.com/photo-1667673077638-3dbc8f39d357?w=1080",
                "https://images.unsplash.com/photo-1713530614621-2bdaab8da2ee?w=1080",
            ],
            tags: [
                { icon: "spa", text: "힐링" },
                { icon: "beach_access", text: "해변" },
                { icon: "self_improvement", text: "명상" },
            ],
            landmarks: [
                {
                    name: "말레 피쉬 마켓",
                    image: "https://images.unsplash.com/photo-1624032446731-1d3c9806d995?w=400",
                },
                {
                    name: "후쿠루밋 마구",
                    image: "https://images.unsplash.com/photo-1662792721650-545a15f07ff6?w=400",
                },
                {
                    name: "바나나 리프",
                    image: "https://images.unsplash.com/photo-1713530614621-2bdaab8da2ee?w=400",
                },
                {
                    name: "비야도후 섬",
                    image: "https://images.unsplash.com/photo-1667673077638-3dbc8f39d357?w=400",
                },
            ],
            flights: [
                {
                    airline: "대한항공",
                    code: "KE473",
                    price: "₩1,450,000",
                    depart: "11:40 PM",
                    arrive: "05:15 AM +1",
                    duration: "9시간 35분",
                    stops: "직항",
                    from: "ICN",
                    to: "MLE",
                },
                {
                    airline: "싱가포르 항공",
                    code: "SQ607",
                    price: "₩1,280,000",
                    depart: "09:55 AM",
                    arrive: "08:30 PM",
                    duration: "14시간 35분",
                    stops: "1회 경유 (SIN)",
                    from: "ICN",
                    to: "MLE",
                },
                {
                    airline: "스리랑카 항공",
                    code: "UL878",
                    price: "₩990,000",
                    depart: "01:20 AM",
                    arrive: "12:40 PM",
                    duration: "15시간 20분",
                    stops: "1회 경유 (CMB)",
                    from: "ICN",
                    to: "MLE",
                },
            ],
            matchScore: 98,
        },
        switzerland: {
            country: "스위스",
            name: "체르마트, 스위스",
            rating: "4.7 (1.8k 리뷰)",
            description:
                "알프스의 평화! 마테호른을 바라보며 고요한 산속에서 재충전하세요.",
            about: "체르마트는 스위스 알프스의 평화로운 산악 마을입니다. 자동차가 다니지 않는 조용한 환경에서 완벽한 휴식을 제공합니다.",
            images: [
                "https://images.unsplash.com/photo-1742645045042-4dbd1650f626?w=1080",
                "https://static.wixstatic.com/media/5882d6_a3e4fac535a44c5584cda3b634b08963~mv2.jpeg/v1/fill/w_966,h_645,al_c,q_85,enc_avif,quality_auto/5882d6_a3e4fac535a44c5584cda3b634b08963~mv2.jpeg",
                "https://www.jungfrau.co.kr/fileUp/mobile/location/8507364_20201022152955.jpg",
                "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/223000/223807-Schwarzsee-Lake.jpg",
            ],
            tags: [
                { icon: "landscape", text: "자연" },
                { icon: "self_improvement", text: "휴식" },
                { icon: "hiking", text: "산책" },
            ],
            landmarks: [
                {
                    name: "마테호른",
                    image: "https://images.unsplash.com/photo-1742645045042-4dbd1650f626?w=400",
                },
                {
                    name: "고르너그라트",
                    image: "https://static.wixstatic.com/media/5882d6_a3e4fac535a44c5584cda3b634b08963~mv2.jpeg/v1/fill/w_966,h_645,al_c,q_85,enc_avif,quality_auto/5882d6_a3e4fac535a44c5584cda3b634b08963~mv2.jpeg",
                },
                {
                    name: "융프라우",
                    image: "https://www.jungfrau.co.kr/fileUp/mobile/location/8507364_20201022152955.jpg",
                },
                {
                    name: "슈바르체제",
                    image: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/223000/223807-Schwarzsee-Lake.jpg",
                },
            ],
            flights: [
                {
                    airline: "스위스 국제항공",
                    code: "LX162",
                    price: "₩1,680,000",
                    depart: "01:05 PM",
                    arrive: "06:40 PM",
                    duration: "12시간 35분",
                    stops: "직항",
                    from: "ICN",
                    to: "ZRH",
                },
                {
                    airline: "대한항공",
                    code: "KE917",
                    price: "₩1,850,000",
                    depart: "10:20 AM",
                    arrive: "04:10 PM",
                    duration: "12시간 50분",
                    stops: "직항",
                    from: "ICN",
                    to: "ZRH",
                },
                {
                    airline: "에미레이트 항공",
                    code: "EK322",
                    price: "₩1,420,000",
                    depart: "11:35 PM",
                    arrive: "11:50 AM +1",
                    duration: "18시간 15분",
                    stops: "1회 경유 (DXB)",
                    from: "ICN",
                    to: "ZRH",
                },
            ],
            matchScore: 96,
        },
        jeju: {
            country: "대한민국",
            name: "제주도",
            rating: "4.8 (12.3k 리뷰)",
            description:
                "가까운 힐링 섬! 한국어 소통과 편안한 환경에서 평화로운 휴식을 즐기세요.",
            about: "제주도는 한국의 대표적인 힐링 여행지입니다. 한라산, 올레길, 아름다운 해변에서 스트레스를 풀고 재충전할 수 있습니다.",
            images: [
                "https://www.esquirekorea.co.kr/resources/online/online_image/2025/06/19/884f7857-7d67-452a-80ef-3218fdca1a45.jpeg",
                "https://www.telltrip.com/wp-content/uploads/2024/12/1785_9796_148.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/3/3f/Sanbangsan_%285983281424%29.jpg",
                "https://blog.kakaocdn.net/dna/AsJZq/btrHPfI3uas/AAAAAAAAAAAAAAAAAAAAAP4blObzrlDR3QAKV028NBZb-QZ1DFH-WXmvvhYrwLZs/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1769871599&allow_ip=&allow_referer=&signature=DueaW4x0tsxHTVJplAqvOuISPX4%3D",
            ],
            tags: [
                { icon: "spa", text: "힐링" },
                { icon: "landscape", text: "자연" },
                { icon: "hiking", text: "올레길" },
            ],
            landmarks: [
                {
                    name: "한라산",
                    image: "https://img.khan.co.kr/news/2014/07/11/l_2014071201001050400139742.jpg",
                },
                {
                    name: "성산 일출봉",
                    image: "https://blog.kakaocdn.net/dna/AsJZq/btrHPfI3uas/AAAAAAAAAAAAAAAAAAAAAP4blObzrlDR3QAKV028NBZb-QZ1DFH-WXmvvhYrwLZs/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1769871599&allow_ip=&allow_referer=&signature=DueaW4x0tsxHTVJplAqvOuISPX4%3D",
                },
                {
                    name: "협재 해수욕장",
                    image: "https://api.cdn.visitjeju.net/photomng/imgpath/202408/27/fabdecc3-d63f-4ef8-a62c-a2542bc0eb59.webp",
                },
                {
                    name: "만장굴",
                    image: "https://www.jejunews.com/news/photo/202505/2218156_246443_519.jpg",
                },
            ],
            flights: [
                {
                    airline: "대한항공",
                    code: "KE1201",
                    price: "₩85,000",
                    depart: "07:30 AM",
                    arrive: "08:35 AM",
                    duration: "1시간 05분",
                    stops: "직항",
                    from: "ICN",
                    to: "CJU",
                },
                {
                    airline: "아시아나항공",
                    code: "OZ8901",
                    price: "₩78,000",
                    depart: "09:15 AM",
                    arrive: "10:20 AM",
                    duration: "1시간 05분",
                    stops: "직항",
                    from: "ICN",
                    to: "CJU",
                },
                {
                    airline: "제주항공",
                    code: "7C101",
                    price: "₩45,000",
                    depart: "06:50 AM",
                    arrive: "07:55 AM",
                    duration: "1시간 05분",
                    stops: "직항",
                    from: "ICN",
                    to: "CJU",
                },
            ],
            matchScore: 94,
        },
    };

    // 에니어그램 타입별 여행지 매핑
    const enneagramMapping = {
        1: ["rome", "paris", "london"],
        2: ["bali", "bangkok", "vietnam"],
        7: ["orlando", "barcelona", "phuket"],
        9: ["maldives", "switzerland", "jeju"],
    };

    let currentDestination = null;
    let currentImageIndex = 0;
    let galleryImages = [];

    // 받침 유무 체크 함수
    function getJosa(word) {
        const lastChar = word.charCodeAt(word.length - 1);
        const hasJongseong = (lastChar - 0xac00) % 28 !== 0;
        return hasJongseong ? "을" : "를";
    }

    // 추천 섹션 표시/숨김 체크
    function checkAndShowEnneagramRecommendations() {
        const travelType = localStorage.getItem("myTravelType");
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
        const section = document.getElementById(
            "enneagram-recommendations-section",
        );

        console.log("🔍 추천 섹션 체크:", {
            travelType,
            isLoggedIn,
            userName: user ? user.name : null,
            조건1_로그인: isLoggedIn,
            조건2_유저정보: !!user,
            조건3_테스트완료: !!travelType,
            조건4_유효한타입:
                travelType && enneagramTypes[travelType] ? true : false,
        });

        // ✅ 로그인 + 테스트 완료 둘 다 필요!
        if (isLoggedIn && user && travelType && enneagramTypes[travelType]) {
            section.classList.add("show");
            renderEnneagramRecommendations(parseInt(travelType));
            console.log("✅ 추천 섹션 표시! (타입:", travelType, ")");
        } else {
            section.classList.remove("show");
            console.log("❌ 추천 섹션 숨김 - 이유:", {
                로그인안함: !isLoggedIn,
                유저정보없음: !user,
                테스트미완료: !travelType,
                잘못된타입: travelType && !enneagramTypes[travelType],
            });
        }
    }

    // 추천 카드 렌더링
    function renderEnneagramRecommendations(type) {
        const typeInfo = enneagramTypes[type];
        if (!typeInfo) return;

        const josa = getJosa(typeInfo.nickname);
        document.getElementById("enneagramNickname").textContent =
            typeInfo.nickname + josa + " 위한";
        document.getElementById("enneagramSubtitle").textContent =
            typeInfo.subtitle;

        const destinationKeys = enneagramMapping[type];
        const grid = document.getElementById("recommendationsGrid");

        grid.innerHTML = destinationKeys
            .map((key) => {
                const dest = destinations[key];
                return `
                <div class="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-primary cursor-pointer" style="border-color: #f3f4f6;" onclick="openModal('${key}')">
                    <div class="relative w-full aspect-[4/3] bg-cover bg-center overflow-hidden" style='background-image: url("${dest.images[0]}");'>
                        <div class="absolute inset-0 overflow-hidden">
                            <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300" style='background-image: url("${dest.images[0]}");'></div>
                        </div>
                        <div class="absolute top-4 left-4 bg-primary/90 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest" style="background-color: rgba(19, 182, 236, 0.9);">${dest.matchScore}% 매치</div>
                        <button class="absolute top-4 right-4 bg-white/30 backdrop-blur-md hover:bg-white text-white hover:text-red-500 p-2 rounded-full transition-all" onclick="event.stopPropagation();">
                            <span class="material-symbols-outlined text-[20px]">favorite</span>
                        </button>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                            <span class="text-white text-sm font-medium drop-shadow-lg">${typeInfo.nickname} 맞춤 여행지</span>
                        </div>
                    </div>
                    <div class="p-5 flex flex-col gap-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-lg font-bold group-hover:text-primary transition-colors" style="color: #111827;">${dest.name}</h3>
                                <p class="text-sm text-gray-500 flex items-center gap-1">
                                    <span class="material-symbols-outlined text-[14px]">location_on</span>
                                    ${dest.country}
                                </p>
                            </div>
                            <div class="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md flex items-center gap-1 text-sm font-bold">
                                ${dest.rating.split(" ")[0]} <span class="material-symbols-outlined text-[14px] fill-1">star</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between border-t border-gray-100 pt-3 mt-1">
                            <div>
                                <p class="text-xs text-gray-400 font-medium">평균 항공료</p>
                                <p class="text-lg font-bold">${dest.flights[0].price} <span class="text-xs font-normal text-gray-400">/왕복</span></p>
                            </div>
                            <button class="bg-gray-100 hover:bg-primary hover:text-white transition-all p-2 rounded-lg flex items-center gap-2" style="background: #f3f4f6; color: #6b7280;" onmouseover="this.style.background='#13b6ec'; this.style.color='white';" onmouseout="this.style.background='#f3f4f6'; this.style.color='#6b7280';" onclick="event.stopPropagation();">
                                <span class="text-sm font-medium">플래너에 담기</span>
                                <span class="material-symbols-outlined">add</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            })
            .join("");
    }

    // 모달 열기
    function openModal(destinationKey) {
        currentDestination = destinationKey;
        const dest = destinations[destinationKey];
        const modal = document.getElementById("destinationModal");

        document.getElementById("modalCountry").textContent = dest.country;
        document.getElementById("modalDestination").textContent = dest.name;
        document.getElementById("modalRating").textContent = dest.rating;
        document.getElementById("modalDescription").textContent =
            dest.description;
        document.getElementById("modalAbout").textContent = dest.about;

        // Gallery
        const galleryHTML = dest.images
            .map((img, index) => {
                if (index === 0)
                    return `<div class="col-span-3 row-span-2 rounded-lg bg-cover bg-center shadow-md gallery-image" onclick="openImageGallery(${index})" style="background-image: url('${img}');"></div>`;
                else if (index === 1)
                    return `<div class="col-span-1 row-span-1 rounded-lg bg-cover bg-center shadow-md gallery-image" onclick="openImageGallery(${index})" style="background-image: url('${img}');"></div>`;
                else if (index === 2) {
                    const remaining = dest.images.length - 3;
                    return `<div class="col-span-1 row-span-1 rounded-lg bg-cover bg-center shadow-md gallery-image relative overflow-hidden" onclick="openImageGallery(${index})" style="background-image: url('${img}');">
                    ${
                        remaining > 0
                            ? `<div class="absolute inset-0 bg-black/40 hover:bg-black/20 transition-all flex items-center justify-center cursor-pointer">
                        <span class="text-white font-bold text-lg">+${remaining}</span>
                    </div>`
                            : ""
                    }
                </div>`;
                }
                return "";
            })
            .join("");
        document.getElementById("modalGallery").innerHTML = galleryHTML;

        // Tags
        const tagsHTML = dest.tags
            .map(
                (tag) => `
            <span class="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold border border-primary/20 flex items-center gap-1.5" style="color: #13b6ec; background: rgba(19, 182, 236, 0.1); border-color: rgba(19, 182, 236, 0.2);">
                <span class="material-symbols-outlined text-sm">${tag.icon}</span> ${tag.text}
            </span>
        `,
            )
            .join("");
        document.getElementById("modalTags").innerHTML = tagsHTML;

        // Landmarks
        const landmarksHTML = dest.landmarks
            .map(
                (landmark) => `
            <div class="flex items-center gap-3 p-2 rounded-lg border border-gray-200 bg-white">
                <div class="size-12 rounded bg-cover bg-center shrink-0 shadow-sm" style="background-image: url('${landmark.image}');"></div>
                <span class="text-xs font-bold leading-tight">${landmark.name}</span>
            </div>
        `,
            )
            .join("");
        document.getElementById("modalLandmarks").innerHTML = landmarksHTML;

        // Flights
        const flightsHTML = dest.flights
            .map(
                (flight) => `
            <div class="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <div style="width: 2.5rem; height: 2.5rem;" class="rounded bg-gray-50 flex items-center justify-center">
                            <span class="material-symbols-outlined" style="color: #13b6ec;">flight_takeoff</span>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm">${flight.airline}</h4>
                            <p class="text-[10px] text-gray-500 uppercase font-bold tracking-wider">${flight.code}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-lg font-black" style="color: #13b6ec;">${flight.price}</p>
                        <p class="text-[10px] text-gray-500 font-bold">왕복</p>
                    </div>
                </div>
                <div class="flex items-center justify-between gap-4 py-3 border-t border-dashed border-gray-200">
                    <div class="text-center">
                        <p class="font-bold text-base">${flight.depart}</p>
                        <p class="text-xs text-gray-500">${flight.from}</p>
                    </div>
                    <div class="flex-1 flex flex-col items-center gap-1">
                        <p class="text-[10px] font-bold text-gray-500">${flight.duration}</p>
                        <div class="w-full h-[2px] bg-gray-200 relative">
                            <div class="absolute inset-0 w-1/2 mx-auto" style="background: #13b6ec;"></div>
                            <span class="material-symbols-outlined text-[14px] absolute -top-[6px] right-0 bg-white rounded-full" style="color: #13b6ec;">flight</span>
                        </div>
                        <p class="text-[10px] font-bold ${flight.stops === "직항" ? "text-green-500" : "text-gray-500"}">${flight.stops}</p>
                    </div>
                    <div class="text-center">
                        <p class="font-bold text-base">${flight.arrive}</p>
                        <p class="text-xs text-gray-500">${flight.to}</p>
                    </div>
                </div>
            </div>
        `,
            )
            .join("");
        document.getElementById("modalFlights").innerHTML = flightsHTML;

        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    // 모달 닫기
    function closeEnneagramModal() {
        const modal = document.getElementById("destinationModal");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    // 이미지 갤러리
    function openImageGallery(index) {
        if (!currentDestination) return;
        galleryImages = destinations[currentDestination].images;
        currentImageIndex = index;
        const modal = document.getElementById("imageGalleryModal");
        updateGalleryImage();
        modal.classList.add("show");
    }

    function closeImageGallery() {
        document.getElementById("imageGalleryModal").classList.remove("show");
    }

    function updateGalleryImage() {
        document.getElementById("galleryImage").src =
            galleryImages[currentImageIndex];
        document.getElementById("imageCounter").textContent =
            `${currentImageIndex + 1} / ${galleryImages.length}`;
    }

    function prevImage() {
        currentImageIndex =
            (currentImageIndex - 1 + galleryImages.length) %
            galleryImages.length;
        updateGalleryImage();
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateGalleryImage();
    }

    // 페이지 로드 시 실행
    document.addEventListener("DOMContentLoaded", function () {
        console.log("📍 에니어그램 추천 시스템 로드 완료!");
        setTimeout(checkAndShowEnneagramRecommendations, 150);
    });

    // 🧪 테스트용 함수 (콘솔에서 실행)
    window.testRecommendations = function (type) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem(
            "loggedInUser",
            JSON.stringify({ name: "테스트" }),
        );
        localStorage.setItem("myTravelType", type);
        checkAndShowEnneagramRecommendations();
    };

    // 전역 함수 노출 (HTML에서 호출)
    window.openModal = openModal;
    window.closeEnneagramModal = closeEnneagramModal;
    window.openImageGallery = openImageGallery;
    window.closeImageGallery = closeImageGallery;
    window.prevImage = prevImage;
    window.nextImage = nextImage;
})(); // IIFE 종료
