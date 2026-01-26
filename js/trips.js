// ================================================
// 전역 변수
// ================================================
let displayedFlightsCount = 3; // 처음에 보여줄 항공권 개수
let displayedDestinationsCount = 3; // 처음에 보여줄 여행지 개수

// 여행 관리 모듈
const trips = {
    // 모든 여행 가져오기
    getAll() {
        const savedTrips = storage.get("trips");
        if (!savedTrips) {
            // 초기 데이터 설정
            storage.set("trips", initialTrips);
            return initialTrips;
        }
        return savedTrips;
    },

    // ID로 여행 가져오기
    getById(id) {
        const allTrips = this.getAll();
        return allTrips.find((trip) => trip.id === id);
    },

    // 여행 추가
    add(tripData) {
        const allTrips = this.getAll();
        const newTrip = {
            ...tripData,
            id: generateId(),
            activities: [],
        };
        allTrips.push(newTrip);
        storage.set("trips", allTrips);
        return newTrip;
    },

    // 여행 업데이트
    update(id, updates) {
        const allTrips = this.getAll();
        const index = allTrips.findIndex((trip) => trip.id === id);
        if (index !== -1) {
            allTrips[index] = { ...allTrips[index], ...updates };
            storage.set("trips", allTrips);
            return allTrips[index];
        }
        return null;
    },

    // 여행 삭제
    delete(id) {
        const allTrips = this.getAll();
        const filtered = allTrips.filter((trip) => trip.id !== id);
        storage.set("trips", filtered);
        return true;
    },

    // 활동 추가
    addActivity(tripId, activityData) {
        const trip = this.getById(tripId);
        if (!trip) return null;

        const newActivity = {
            ...activityData,
            id: generateId(),
        };

        trip.activities.push(newActivity);
        this.update(tripId, { activities: trip.activities });
        return newActivity;
    },

    // 활동 삭제
    deleteActivity(tripId, activityId) {
        const trip = this.getById(tripId);
        if (!trip) return false;

        trip.activities = trip.activities.filter((a) => a.id !== activityId);
        this.update(tripId, { activities: trip.activities });
        return true;
    },
};

// 여행 카드 렌더링
function renderTripCard(trip) {
    const styleInfo =
        travelStyleMap[trip.travelStyle] || travelStyleMap.culture;
    const days = dateDiff(trip.startDate, trip.endDate) + 1;

    return `
        <div class="trip-card" data-trip-id="${trip.id}">
            <img src="${trip.imageUrl}" alt="${trip.title}" class="trip-card-image" onerror="handleImageError(this)">
            <div class="trip-card-content">
                <div class="trip-card-header">
                    <div>
                        <h3 class="trip-card-title">${escapeHtml(trip.title)}</h3>
                        <p class="trip-card-destination">${icons.mapPin} ${escapeHtml(trip.destination)}</p>
                    </div>
                    <span class="trip-card-badge" style="background: ${styleInfo.color}">
                        ${styleInfo.emoji} ${styleInfo.name}
                    </span>
                </div>
                <div class="trip-card-dates">
                    ${icons.calendar}
                    ${formatDate(trip.startDate)} - ${formatDate(trip.endDate)} (${days}일)
                </div>
                <div class="trip-card-budget">
                    ${icons.dollarSign}
                    ${formatCurrency(trip.budget)}
                </div>
                <div class="trip-card-actions">
                    <button class="btn btn-primary btn-sm" onclick="viewTripDetail('${trip.id}')">
                        상세보기
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTrip('${trip.id}')">
                        ${icons.trash}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// 여행 목록 렌더링
function renderTrips() {
    const tripsContainer = document.getElementById("tripsContainer");
    const emptyState = document.getElementById("emptyState");
    const allTrips = trips.getAll();

    if (allTrips.length === 0) {
        if (tripsContainer) tripsContainer.innerHTML = "";
        if (emptyState) emptyState.style.display = "block";
        hideExtraSections();
    } else {
        if (emptyState) emptyState.style.display = "none";
        if (tripsContainer) {
            const header = `
                <div class="trips-header">
                    <h2>내 여행 계획 (${allTrips.length})</h2>
                    <p>여행을 클릭하여 상세 정보와 일정을 확인하세요</p>
                </div>
                <div class="trips-grid" id="tripsGrid"></div>
            `;
            tripsContainer.innerHTML = header;

            const tripsGrid = document.getElementById("tripsGrid");
            tripsGrid.innerHTML = allTrips
                .map((trip) => renderTripCard(trip))
                .join("");
        }
        showExtraSections();
    }
}

// 추가 섹션 표시/숨김
function hideExtraSections() {
    const sections = ["reviewsSection", "flightsSection", "popularSection"];
    sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) section.style.display = "none";
    });
}

function showExtraSections() {
    const sections = ["reviewsSection", "flightsSection", "popularSection"];
    sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) section.style.display = "block";
    });
}

// 여행 상세보기
function viewTripDetail(tripId) {
    window.location.href = `trip-detail.html?id=${tripId}`;
}

// 여행 삭제
function deleteTrip(tripId) {
    if (confirm("정말로 이 여행을 삭제하시겠습니까?")) {
        trips.delete(tripId);
        showAlert("여행이 삭제되었습니다.", "success");
        renderTrips();
    }
}

// 후기 카드 렌더링
function renderReviewCard(review) {
    return `
        <div class="review-card" onclick="window.location.href='review-detail.html?id=${review.id}'">
            <img src="${review.images[0]}" alt="${review.destination}" class="review-card-image" onerror="handleImageError(this)">
            <div class="review-card-content">
                <div class="review-card-header">
                    <span class="review-card-destination">${escapeHtml(review.destination)}</span>
                    <div class="review-card-author">
                        👤 ${escapeHtml(review.author)}
                    </div>
                </div>
                <h3 class="review-card-title">${escapeHtml(review.title)}</h3>
                <p class="review-card-excerpt">${escapeHtml(review.description)}</p>
                <p class="review-card-dates">📅 ${review.travelDates}</p>
            </div>
        </div>
    `;
}

// 후기 섹션 렌더링
function renderReviews() {
    const reviewsGrid = document.getElementById("reviewsGrid");
    if (!reviewsGrid) return;

    const displayReviews = travelReviewsData.slice(0, 3);
    reviewsGrid.innerHTML = displayReviews
        .map((review) => renderReviewCard(review))
        .join("");
}

// 항공권 예약 함수
function bookFlight(flightId) {
    const flight = flightDealsData.find((f) => f.id === flightId);
    if (!flight) return;

    // 모달 표시
    openFlightModal(flight);
}

// 항공권 상세 모달 열기
function openFlightModal(flight) {
    const modal = document.getElementById("flightDetailModal");
    if (!modal) return;

    // 현재 항공권 데이터 저장 (전역 변수)
    currentFlight = flight;

    // 제목 업데이트
    const title = document.getElementById("flightModalTitle");
    if (title) {
        title.textContent = `${flight.from}(${flight.fromCode}) → ${flight.to}(${flight.toCode}) 항공권 상세`;
    }

    // 예약 버튼 가격 업데이트
    const bookBtn = document.getElementById("bookFlightPriceText");
    if (bookBtn) {
        bookBtn.textContent = `${formatCurrency(flight.price)}에 예약하기`;
    }

    // 초기 탭 내용 렌더링
    renderFlightInfoTab(flight);

    // 모달 표시
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

// 항공권 상세 모달 닫기
function closeFlightModal() {
    const modal = document.getElementById("flightDetailModal");
    if (modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
}

// 탭 설정
function setupFlightTabs(flight) {
    const tabs = document.querySelectorAll(".flight-tab");
    tabs.forEach((tab) => {
        // 기존 이벤트 리스너 제거를 위해 새로운 함수 참조 사용
        const newTab = tab.cloneNode(true);
        tab.parentNode.replaceChild(newTab, tab);
    });

    // 새로 생성된 탭에 이벤트 리스너 추가
    const newTabs = document.querySelectorAll(".flight-tab");
    newTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            // 모든 탭 비활성화
            newTabs.forEach((t) => t.classList.remove("active"));
            // 클릭한 탭 활성화
            tab.classList.add("active");

            // 탭에 따라 다른 내용 렌더링
            const tabType = tab.getAttribute("data-tab");
            switch (tabType) {
                case "info":
                    renderFlightInfoTab(flight);
                    break;
                case "schedule":
                    renderFlightScheduleTab(flight);
                    break;
                case "travel":
                    renderFlightTravelTab(flight);
                    break;
            }
        });
    });
}

// 항공권 정보 탭 렌더링
function renderFlightInfoTab(flight) {
    const body = document.getElementById("flightModalBody");
    if (!body) return;

    body.innerHTML = `
        <div class="flight-hero-wrapper">
            <img src="${flight.image}" alt="${flight.to}" class="flight-hero-image" onerror="handleImageError(this)">
            <div class="flight-hero-badge">${flight.discount}% 할인</div>
        </div>
        
        <div class="flight-price-box">
            <div>
                <div class="flight-price-label">원가</div>
                <div class="flight-price-original">${formatCurrency(flight.originalPrice)}</div>
            </div>
            <div style="text-align: right;">
                <div class="flight-price-current">${formatCurrency(flight.price)}</div>
            </div>
        </div>
        
        <div class="flight-segment">
            <div class="flight-segment-header">
                ✈️ 가는 편 <span style="font-weight: normal; font-size: 0.875rem; color: var(--color-gray-600);">직항</span>
            </div>
            <div class="flight-time-row">
                <div class="flight-time-box">
                    <div class="flight-time">${flight.outbound.departTime}</div>
                    <div class="flight-location">${flight.from}(${flight.fromCode})</div>
                    <div class="flight-location">${flight.outbound.date}</div>
                </div>
                <div class="flight-duration">
                    <div style="margin-bottom: 0.25rem;">${flight.outbound.flightTime}</div>
                    <svg width="100" height="20" viewBox="0 0 100 20" fill="none">
                        <line x1="0" y1="10" x2="95" y2="10" stroke="#d1d5db" stroke-width="2"/>
                        <circle cx="95" cy="10" r="4" fill="#3b82f6"/>
                    </svg>
                    <div style="margin-top: 0.25rem; color: var(--color-gray-500);">대한항공</div>
                </div>
                <div class="flight-time-box">
                    <div class="flight-time">${flight.outbound.arriveTime}</div>
                    <div class="flight-location">${flight.to}(${flight.toCode})</div>
                    <div class="flight-location">${flight.outbound.date}</div>
                </div>
            </div>
        </div>
        
        <div class="flight-segment">
            <div class="flight-segment-header">
                ✈️ 오는 편 <span style="font-weight: normal; font-size: 0.875rem; color: var(--color-gray-600);">직항</span>
            </div>
            <div class="flight-time-row">
                <div class="flight-time-box">
                    <div class="flight-time">${flight.inbound.departTime}</div>
                    <div class="flight-location">${flight.to}(${flight.toCode})</div>
                    <div class="flight-location">${flight.inbound.date}</div>
                </div>
                <div class="flight-duration">
                    <div style="margin-bottom: 0.25rem;">${flight.inbound.flightTime}</div>
                    <svg width="100" height="20" viewBox="0 0 100 20" fill="none">
                        <line x1="0" y1="10" x2="95" y2="10" stroke="#d1d5db" stroke-width="2"/>
                        <circle cx="95" cy="10" r="4" fill="#3b82f6"/>
                    </svg>
                    <div style="margin-top: 0.25rem; color: var(--color-gray-500);">대한항공</div>
                </div>
                <div class="flight-time-box">
                    <div class="flight-time">${flight.inbound.arriveTime}</div>
                    <div class="flight-location">${flight.from}(${flight.fromCode})</div>
                    <div class="flight-location">${flight.inbound.date}</div>
                </div>
            </div>
        </div>
        
        <div class="flight-detail-section">
            <div class="flight-detail-title">🎫 항공편 상세</div>
            <div class="flight-detail-grid">
                <div class="flight-detail-item">
                    <div class="flight-detail-icon">🪑</div>
                    <div class="flight-detail-label">좌석 등급</div>
                    <div class="flight-detail-value">${flight.seatClass}</div>
                </div>
                <div class="flight-detail-item">
                    <div class="flight-detail-icon">🧳</div>
                    <div class="flight-detail-label">수하물</div>
                    <div class="flight-detail-value">${flight.baggage}</div>
                </div>
            </div>
        </div>
        
        <div class="flight-detail-section">
            <div class="flight-detail-title">✨ 포함 서비스</div>
            <div class="flight-services-list">
                ${flight.services
                    .map(
                        (service) => `
                    <span class="flight-service-tag">✓ ${service}</span>
                `,
                    )
                    .join("")}
            </div>
        </div>
    `;
}

// 추천 일정 탭 렌더링
function renderFlightScheduleTab(flight) {
    const body = document.getElementById("flightModalBody");
    if (!body) return;

    // 도시별 일정 데이터 가져오기
    const citySchedule = citySchedulesData[flight.to];

    if (!citySchedule) {
        // 데이터가 없는 경우 준비 중 메시지
        body.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📅</div>
                <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">추천 일정</h3>
                <p style="color: var(--color-gray-600);">
                    ${flight.to} 여행 추천 일정을 준비 중입니다.<br>
                    곧 만나보실 수 있습니다!
                </p>
            </div>
        `;
        return;
    }

    // 여행 일수 계산 (duration에서 숫자 추출)
    const durationMatch = flight.duration.match(/(\d+)박/);
    const nights = durationMatch ? parseInt(durationMatch[1]) : 0;
    const days = nights + 1;

    // 적절한 일정 선택 (사용 가능한 모든 일수 키 확인)
    let schedule;
    const availableKeys = Object.keys(citySchedule);

    // 1. 정확히 일치하는 일정 찾기
    schedule = citySchedule[`${days}일`];

    // 2. 없으면 가장 가까운 일정 찾기
    if (!schedule && availableKeys.length > 0) {
        const numericKeys = availableKeys.map((key) => parseInt(key));
        const closest = numericKeys.reduce((prev, curr) => {
            return Math.abs(curr - days) < Math.abs(prev - days) ? curr : prev;
        });
        schedule = citySchedule[`${closest}일`];
    }

    if (!schedule) {
        // 데이터가 없는 경우
        body.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📅</div>
                <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">추천 일정</h3>
                <p style="color: var(--color-gray-600);">
                    ${flight.to} 여행 추천 일정을 준비 중입니다.
                </p>
            </div>
        `;
        return;
    }

    // 일정 HTML 생성
    const scheduleHTML = schedule
        .map(
            (dayPlan, index) => `
        <div style="margin-bottom: 1.5rem; border-left: 3px solid var(--color-primary); padding-left: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                <div style="
                    background: var(--color-primary);
                    color: white;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 0.875rem;
                ">
                    ${dayPlan.day}일
                </div>
                <h4 style="font-size: 1.125rem; font-weight: 600; color: var(--color-text-primary); margin: 0;">
                    ${dayPlan.title}
                </h4>
            </div>
            <ul style="
                list-style: none;
                padding: 0;
                margin: 0;
                margin-left: 2.75rem;
            ">
                ${dayPlan.activities
                    .map(
                        (activity) => `
                    <li style="
                        padding: 0.5rem 0;
                        color: var(--color-gray-700);
                        display: flex;
                        align-items: start;
                        gap: 0.5rem;
                    ">
                        <span style="color: var(--color-primary); font-size: 1.25rem;">•</span>
                        <span>${activity}</span>
                    </li>
                `,
                    )
                    .join("")}
            </ul>
        </div>
    `,
        )
        .join("");

    body.innerHTML = `
        <div style="padding: 0.5rem 0;">
            <div style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 1.5rem;
                border-radius: 12px;
                margin-bottom: 1.5rem;
                text-align: center;
            ">
                <h3 style="font-size: 1.5rem; font-weight: 700; margin: 0 0 0.5rem 0;">
                    📅 ${flight.to} ${days}일 추천 일정
                </h3>
                <p style="margin: 0; opacity: 0.9; font-size: 0.875rem;">
                    ${flight.from} ✈️ ${flight.to} (${flight.duration})
                </p>
            </div>
            
            ${scheduleHTML}
            
            <div style="
                background: var(--color-gray-50);
                border: 1px solid var(--color-gray-200);
                border-radius: 8px;
                padding: 1rem;
                margin-top: 1.5rem;
                text-align: center;
            ">
                <p style="margin: 0; color: var(--color-gray-600); font-size: 0.875rem;">
                    💡 <strong>TIP:</strong> 일정은 참고용이며, 개인 취향에 따라 자유롭게 조정하세요!
                </p>
            </div>
        </div>
    `;
}

// 여행 정보 탭 렌더링
function renderFlightTravelTab(flight) {
    const body = document.getElementById("flightModalBody");
    if (!body) return;

    // 도시별 여행 정보 데이터 가져오기
    const travelInfo = cityTravelInfoData[flight.to];

    if (!travelInfo) {
        // 데이터가 없는 경우 준비 중 메시지
        body.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🌍</div>
                <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">여행 정보</h3>
                <p style="color: var(--color-gray-600);">
                    ${flight.to} 여행 가이드를 준비 중입니다.<br>
                    현지 정보, 날씨, 문화 등을 곧 만나보실 수 있습니다!
                </p>
            </div>
        `;
        return;
    }

    body.innerHTML = `
        <div style="padding: 0.5rem 0;">
            <!-- 기본 정보 섹션 -->
            <div style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 1.5rem;
                border-radius: 12px;
                margin-bottom: 1.5rem;
            ">
                <h3 style="font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem 0;">
                    🌍 ${flight.to} 여행 가이드
                </h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; font-size: 0.875rem;">
                    <div><strong>🌤️ 베스트 시즌:</strong> ${travelInfo.bestSeason}</div>
                    <div><strong>🌡️ 날씨:</strong> ${travelInfo.weather}</div>
                    <div><strong>💱 화폐:</strong> ${travelInfo.currency}</div>
                    <div><strong>🗣️ 언어:</strong> ${travelInfo.language}</div>
                </div>
            </div>
            
            <!-- 주요 관광지 -->
            <div style="margin-bottom: 1.5rem;">
                <h4 style="
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: var(--color-text-primary);
                    margin: 0 0 1rem 0;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                ">
                    <span>🏛️</span> 주요 관광지
                </h4>
                <div style="display: grid; gap: 0.75rem;">
                    ${travelInfo.attractions
                        .map(
                            (attraction) => `
                        <div style="
                            background: var(--color-gray-50);
                            border: 1px solid var(--color-gray-200);
                            border-radius: 8px;
                            padding: 1rem;
                            display: flex;
                            gap: 1rem;
                            align-items: start;
                        ">
                            <div style="font-size: 2rem; flex-shrink: 0;">${attraction.emoji}</div>
                            <div style="flex: 1;">
                                <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.25rem;">
                                    ${attraction.name}
                                </div>
                                <div style="font-size: 0.875rem; color: var(--color-gray-600);">
                                    ${attraction.description}
                                </div>
                            </div>
                        </div>
                    `,
                        )
                        .join("")}
                </div>
            </div>
            
            <!-- 추천 맛집 -->
            <div style="margin-bottom: 1.5rem;">
                <h4 style="
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: var(--color-text-primary);
                    margin: 0 0 1rem 0;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                ">
                    <span>🍽️</span> 추천 맛집
                </h4>
                <div style="display: grid; gap: 0.75rem;">
                    ${travelInfo.restaurants
                        .map(
                            (restaurant) => `
                        <div style="
                            background: var(--color-gray-50);
                            border: 1px solid var(--color-gray-200);
                            border-radius: 8px;
                            padding: 1rem;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        ">
                            <div style="display: flex; gap: 1rem; align-items: center; flex: 1;">
                                <div style="font-size: 2rem;">${restaurant.emoji}</div>
                                <div>
                                    <div style="font-weight: 600; color: var(--color-text-primary);">
                                        ${restaurant.name}
                                    </div>
                                    <div style="font-size: 0.875rem; color: var(--color-gray-600);">
                                        ${restaurant.type}
                                    </div>
                                </div>
                            </div>
                            <div style="font-weight: 600; color: var(--color-primary);">
                                ${restaurant.price}
                            </div>
                        </div>
                    `,
                        )
                        .join("")}
                </div>
            </div>
            
            <!-- 추천 숙소 -->
            <div style="margin-bottom: 1.5rem;">
                <h4 style="
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: var(--color-text-primary);
                    margin: 0 0 1rem 0;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                ">
                    <span>🏨</span> 추천 숙소
                </h4>
                <div style="display: grid; gap: 0.75rem;">
                    ${travelInfo.hotels
                        .map(
                            (hotel) => `
                        <div style="
                            background: var(--color-gray-50);
                            border: 1px solid var(--color-gray-200);
                            border-radius: 8px;
                            padding: 1rem;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        ">
                            <div>
                                <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.25rem;">
                                    ${hotel.name}
                                </div>
                                <div style="font-size: 0.875rem; color: var(--color-gray-600);">
                                    📍 ${hotel.area}
                                </div>
                            </div>
                            <div style="font-size: 1rem;">
                                ${hotel.rating}
                            </div>
                        </div>
                    `,
                        )
                        .join("")}
                </div>
            </div>
            
            <!-- 여행 팁 -->
            <div style="margin-bottom: 1.5rem;">
                <h4 style="
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: var(--color-text-primary);
                    margin: 0 0 1rem 0;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                ">
                    <span>💡</span> 여행 팁
                </h4>
                <div style="
                    background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
                    border-radius: 8px;
                    padding: 1.25rem;
                ">
                    <ul style="
                        list-style: none;
                        padding: 0;
                        margin: 0;
                        display: grid;
                        gap: 0.75rem;
                    ">
                        ${travelInfo.tips
                            .map(
                                (tip) => `
                            <li style="
                                display: flex;
                                align-items: start;
                                gap: 0.5rem;
                                color: var(--color-gray-800);
                            ">
                                <span style="color: #F59E0B; font-size: 1.25rem;">✓</span>
                                <span>${tip}</span>
                            </li>
                        `,
                            )
                            .join("")}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// 더 많은 항공권 보기 함수
function viewMoreFlights() {
    if (displayedFlightsCount >= flightDealsData.length) {
        // 접기
        displayedFlightsCount = 3; // 초기값으로 복원
        renderFlights();
        showAlert("항공권을 접었습니다 ✈️", "info");
    } else {
        // 펼치기
        displayedFlightsCount = flightDealsData.length; // 전체 개수로 설정
        renderFlights();
        showAlert(
            `전체 ${flightDealsData.length}개의 항공권을 표시 중입니다 ✈️`,
            "info",
        );
    }
}

// 항공권 섹션 렌더링
function renderFlights() {
    const flightsGrid = document.getElementById("flightsGrid");
    if (!flightsGrid) return;

    const displayFlights = flightDealsData.slice(0, displayedFlightsCount);
    flightsGrid.innerHTML = displayFlights
        .map((flight) => renderFlightCard(flight))
        .join("");

    // 더보기 버튼 텍스트 업데이트
    const moreBtn = document.getElementById("moreFlightsBtn");
    if (moreBtn) {
        if (displayedFlightsCount >= flightDealsData.length) {
            // 전체 표시 중 → 접기 버튼으로 변경
            moreBtn.innerHTML = `
                접기
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.5rem;">
                    <polyline points="18 15 12 9 6 15"/>
                </svg>
            `;
        } else {
            // 일부만 표시 중 → 더보기 버튼으로 변경
            moreBtn.innerHTML = `
                더 많은 항공권 보기
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.5rem;">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            `;
        }
    }
}

// 항공권 카드 렌더링
function renderFlightCard(flight) {
    return `
        <div class="flight-card-new">
            <div class="flight-card-image-wrapper">
                <img src="${flight.image}" alt="${flight.to}" class="flight-card-image-new" onerror="handleImageError(this)">
                <span class="flight-discount-badge">${flight.discount}% 할인</span>
            </div>
            <div class="flight-card-body">
                <div class="flight-route">
                    <div class="flight-location">
                        <div class="location-label">출발</div>
                        <div class="location-name">${escapeHtml(flight.from)}(${flight.fromCode})</div>
                    </div>
                    <div class="flight-arrow">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12 5 19 12 12 19"/>
                        </svg>
                    </div>
                    <div class="flight-location">
                        <div class="location-label">도착</div>
                        <div class="location-name">${escapeHtml(flight.to)}(${flight.toCode})</div>
                    </div>
                </div>
                
                <div class="flight-airline">
                    ✈️ ${escapeHtml(flight.airline)} • ${flight.airlineType}
                </div>
                
                <div class="flight-details">
                    <div class="flight-date">
                        📅 ${formatDate(flight.startDate)} - ${formatDate(flight.endDate)}
                    </div>
                    <div class="flight-duration">
                        ⏱️ ${flight.duration}
                    </div>
                </div>
                
                <div class="flight-price-section">
                    <div class="flight-original-price">${formatCurrency(flight.originalPrice)}</div>
                    <div class="flight-current-price">${formatCurrency(flight.price)}</div>
                </div>
                
                <button class="popular-detail-btn" onclick="bookFlight('${flight.id}')">
                    항공권 보기
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

// 인기 여행지 카드 렌더링
function renderPopularCard(destination, index) {
    const rankColors = {
        0: "linear-gradient(135deg, #FFD700, #FFA500)", // 1등: 금색
        1: "linear-gradient(135deg, #C0C0C0, #808080)", // 2등: 은색
        2: "linear-gradient(135deg, #CD7F32, #8B4513)", // 3등: 동색
    };

    // 4등부터는 모두 옅은 회색으로 통일
    const rankBg =
        rankColors[index] || "linear-gradient(135deg, #E5E7EB, #D1D5DB)";
    const trendBadge = destination.trend
        ? `<span class="trend-badge">${destination.trend}</span>`
        : "";

    // 순위 변동 배지 렌더링
    let rankChangeBadge = "";
    if (destination.rankChange > 0) {
        // 상승
        rankChangeBadge = `<div class="rank-change rank-up">▲+${destination.rankChange}</div>`;
    } else if (destination.rankChange < 0) {
        // 하락
        rankChangeBadge = `<div class="rank-change rank-down">▼${destination.rankChange}</div>`;
    } else {
        // 변동 없음
        rankChangeBadge = `<div class="rank-change rank-same">━</div>`;
    }

    return `
        <div class="popular-card-new" onclick="searchDestination('${destination.name}')">
            <div class="popular-card-image-wrapper">
                <img src="${destination.image}" alt="${destination.name}" class="popular-card-image-new" onerror="handleImageError(this)">
                ${trendBadge}
                <div class="popular-rank-box" style="background: ${rankBg};">
                    ${index + 1}
                    ${rankChangeBadge}
                </div>
            </div>
            <div class="popular-card-body-new">
                <div class="popular-destination-header">
                    <div class="popular-destination-title-wrapper">
                        <h3 class="popular-destination-name">${destination.emoji} ${escapeHtml(destination.name)}</h3>
                        <p class="popular-destination-country">${escapeHtml(destination.country)}</p>
                    </div>
                    <button class="favorite-btn" onclick="event.stopPropagation(); toggleFavorite('${destination.name}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    </button>
                </div>
                <p class="popular-destination-desc">${escapeHtml(destination.description)}</p>
                <div class="popular-tags">
                    ${destination.tags
                        .map(
                            (tag) => `
                        <span class="popular-tag">${escapeHtml(tag)}</span>
                    `,
                        )
                        .join("")}
                </div>
                <div class="popular-stats">
                    <div class="popular-rating">
                        ⭐ ${destination.rating}
                    </div>
                    <div class="popular-visitors">
                        👥 ${destination.visitors}
                    </div>
                </div>
                <button class="popular-detail-btn" onclick="event.stopPropagation(); searchDestination('${destination.name}')">
                    상세보기
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

// 🎯 추천 여행지 카드 렌더링 (간소화)
function renderRecommendedCard(destination) {
    return `
        <div class="recommended-card" onclick="openRecommendedModal('${destination.id}')">
            <div class="recommended-card-image-wrapper">
                <img src="${destination.image}" alt="${destination.name}" class="recommended-card-image" onerror="handleImageError(this)">
                <div class="match-score-badge">
                    ${destination.matchScore}%
                </div>
            </div>
            <div class="recommended-card-body">
                <h3 class="recommended-name">${destination.emoji} ${escapeHtml(destination.name)}</h3>
                <p class="recommended-country">${escapeHtml(destination.country)}</p>
                <p class="recommended-desc">${escapeHtml(destination.description)}</p>
                <div class="recommended-tags">
                    ${destination.tags
                        .slice(0, 3)
                        .map(
                            (tag) => `
                        <span class="recommended-tag">${escapeHtml(tag)}</span>
                    `,
                        )
                        .join("")}
                </div>
                <button class="recommended-view-btn">
                    상세보기
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

// 🎯 추천 여행지 모달 열기
function openRecommendedModal(destinationId) {
    const destination = recommendedDestinationsData.find(
        (d) => d.id === destinationId,
    );
    if (!destination) return;

    // 해당 여행지와 관련된 항공권 찾기 (도시명으로 매칭)
    const relatedFlights = flightDealsData.filter((flight) => {
        const cityName = destination.name.toLowerCase();
        const flightTo = flight.to.toLowerCase();
        return flightTo.includes(cityName) || cityName.includes(flightTo);
    });

    // 항공권이 없으면 임의로 추천 항공권 선택
    const recommendedFlights =
        relatedFlights.length > 0
            ? relatedFlights.slice(0, 2)
            : flightDealsData.slice(0, 2);

    const modalHTML = `
        <div class="recommended-modal-overlay" onclick="closeRecommendedModal()">
            <div class="recommended-modal-container" onclick="event.stopPropagation()">
                <button class="recommended-modal-close" onclick="closeRecommendedModal()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
                
                <div class="recommended-modal-content">
                    <!-- 좌측: 여행지 정보 -->
                    <div class="recommended-modal-left">
                        <div class="recommended-modal-image-wrapper">
                            <img src="${destination.image}" alt="${destination.name}" class="recommended-modal-image" onerror="handleImageError(this)">
                            <div class="recommended-modal-match-badge">
                                <div class="match-badge-score">${destination.matchScore}%</div>
                                <div class="match-badge-text">매치</div>
                            </div>
                        </div>
                        
                        <div class="recommended-modal-info">
                            <div class="recommended-modal-header">
                                <h2 class="recommended-modal-title">${destination.emoji} ${escapeHtml(destination.name)}</h2>
                                <p class="recommended-modal-country">📍 ${escapeHtml(destination.country)}</p>
                            </div>
                            
                            <p class="recommended-modal-description">${escapeHtml(destination.longDescription)}</p>
                            
                            <div class="recommended-modal-section">
                                <h3 class="recommended-modal-section-title">🎯 왜 당신에게 추천할까요?</h3>
                                <div class="recommended-modal-reasons">
                                    ${destination.matchReasons
                                        .map(
                                            (reason) => `
                                        <div class="recommended-modal-reason">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                                <polyline points="20 6 9 17 4 12"/>
                                            </svg>
                                            ${escapeHtml(reason)}
                                        </div>
                                    `,
                                        )
                                        .join("")}
                                </div>
                            </div>
                            
                            <div class="recommended-modal-section">
                                <h3 class="recommended-modal-section-title">✨ 주요 액티비티</h3>
                                <div class="recommended-modal-highlights">
                                    ${destination.highlights
                                        .map(
                                            (highlight) => `
                                        <div class="recommended-modal-highlight">
                                            <div class="highlight-icon-large">${highlight.icon}</div>
                                            <div>
                                                <div class="highlight-title-large">${escapeHtml(highlight.title)}</div>
                                                <div class="highlight-desc-large">${escapeHtml(highlight.desc)}</div>
                                            </div>
                                        </div>
                                    `,
                                        )
                                        .join("")}
                                </div>
                            </div>
                            
                            <div class="recommended-modal-meta">
                                <div class="meta-item">
                                    <span class="meta-icon">⭐</span>
                                    <span class="meta-label">평점:</span>
                                    <span class="meta-value">${destination.rating}</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-icon">🗓️</span>
                                    <span class="meta-label">최적 시즌:</span>
                                    <span class="meta-value">${destination.bestSeason}</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-icon">💰</span>
                                    <span class="meta-label">예상 경비:</span>
                                    <span class="meta-value">${destination.estimatedBudget}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 우측: 추천 항공권 -->
                    <div class="recommended-modal-right">
                        <h3 class="recommended-modal-flights-title">✈️ 추천 항공권</h3>
                        <div class="recommended-modal-flights">
                            ${recommendedFlights
                                .map(
                                    (flight) => `
                                <div class="recommended-flight-card" onclick="event.stopPropagation(); viewFlightDetail('${flight.id}')">
                                    <div class="recommended-flight-header">
                                        <div class="recommended-flight-route">
                                            <span class="flight-city">${escapeHtml(flight.from)}</span>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <line x1="5" y1="12" x2="19" y2="12"/>
                                                <polyline points="12 5 19 12 12 19"/>
                                            </svg>
                                            <span class="flight-city">${escapeHtml(flight.to)}</span>
                                        </div>
                                        <div class="recommended-flight-discount">-${flight.discount}%</div>
                                    </div>
                                    
                                    <div class="recommended-flight-info">
                                        <div class="flight-info-row">
                                            <span class="flight-info-label">항공사:</span>
                                            <span class="flight-info-value">${escapeHtml(flight.airline)}</span>
                                        </div>
                                        <div class="flight-info-row">
                                            <span class="flight-info-label">기간:</span>
                                            <span class="flight-info-value">${flight.duration}</span>
                                        </div>
                                        <div class="flight-info-row">
                                            <span class="flight-info-label">출발:</span>
                                            <span class="flight-info-value">${flight.date}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="recommended-flight-price">
                                        <div class="flight-price-original">₩${formatNumber(flight.originalPrice)}</div>
                                        <div class="flight-price-current">₩${formatNumber(flight.currentPrice)}</div>
                                    </div>
                                    
                                    <button class="recommended-flight-btn">
                                        자세히 보기
                                    </button>
                                </div>
                            `,
                                )
                                .join("")}
                        </div>
                        
                        ${
                            recommendedFlights.length === 0
                                ? `
                            <div class="no-flights-message">
                                <p>현재 이용 가능한 항공권이 없습니다.</p>
                            </div>
                        `
                                : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    document.body.style.overflow = "hidden";
}

// 🎯 추천 여행지 모달 닫기
function closeRecommendedModal() {
    const modal = document.querySelector(".recommended-modal-overlay");
    if (modal) {
        modal.remove();
        document.body.style.overflow = "";
    }
}

// 항공권 상세보기 (추천 모달에서 호출)
function viewFlightDetail(flightId) {
    // 먼저 추천 모달 닫기
    closeRecommendedModal();

    // 항공권 찾기
    const flight = flightDealsData.find((f) => f.id === flightId);
    if (!flight) return;

    // 항공권 모달 열기
    bookFlight(flightId);
}

// 🎯 추천 여행지 섹션 렌더링
function renderRecommendedDestinations() {
    const recommendedGrid = document.getElementById("recommendedGrid");
    if (!recommendedGrid) return;

    recommendedGrid.innerHTML = recommendedDestinationsData
        .map((dest) => renderRecommendedCard(dest))
        .join("");
}

// 인기 여행지 섹션 렌더링
function renderPopularDestinations() {
    const popularGrid = document.getElementById("popularGrid");
    if (!popularGrid) return;

    const displayDestinations = popularDestinationsData.slice(
        0,
        displayedDestinationsCount,
    );
    popularGrid.innerHTML = displayDestinations
        .map((dest, idx) => renderPopularCard(dest, idx))
        .join("");

    // 더보기 버튼 업데이트 - 항상 표시하고 텍스트만 변경
    const moreBtn = document.getElementById("moreDestinationsBtn");
    if (moreBtn) {
        moreBtn.style.display = "inline-flex"; // 항상 표시

        if (displayedDestinationsCount >= popularDestinationsData.length) {
            // 전체 보기 상태 - 접기 버튼 표시
            moreBtn.innerHTML = `
                접기
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.5rem;">
                    <polyline points="18 15 12 9 6 15"/>
                </svg>
            `;
        } else {
            // 일부 보기 상태 - 전체 보기 버튼 표시
            moreBtn.innerHTML = `
                전체 순위 보기 (TOP 20)
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.5rem;">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            `;
        }
    }
}

// 전체 순위 보기 함수
function viewMoreDestinations() {
    const moreBtn = document.getElementById("moreDestinationsBtn");

    // 토글 기능
    if (displayedDestinationsCount >= popularDestinationsData.length) {
        // 현재 전체 보기 상태 → 접기
        displayedDestinationsCount = 6;
        if (moreBtn) {
            moreBtn.innerHTML = `
                전체 순위 보기 (TOP 20)
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.5rem;">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            `;
        }
    } else {
        // 현재 일부 보기 상태 → 전체 보기
        displayedDestinationsCount = popularDestinationsData.length;
        if (moreBtn) {
            moreBtn.innerHTML = `
                접기
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.5rem;">
                    <polyline points="18 15 12 9 6 15"/>
                </svg>
            `;
        }
    }

    renderPopularDestinations();

    // 스크롤을 섹션 상단으로 이동
    const popularSection = document.querySelector(".popular-section");
    if (popularSection) {
        popularSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

// 검색 기능
function searchDestination(destination) {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.value = destination;
        // 검색 후 성향 테스트로 이동하는 로직
        showAlert(`"${destination}" 검색 - 성향 테스트를 시작하세요!`, "info");
    }
}

// 여행 생성 (간단 버전)
function createSimpleTrip(destination) {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 14); // 2주 후
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 3); // 3박 4일

    const newTrip = {
        title: `${destination} 여행`,
        destination: destination,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        budget: 1000000,
        imageUrl:
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1080",
        travelStyle: "culture",
        activities: [],
    };

    const created = trips.add(newTrip);
    showAlert("✅ 새 여행이 추가되었습니다!", "success");
    renderTrips();
    return created;
}

// ================================================
// 전역 함수 내보내기 (HTML에서 사용)
// ================================================

// 현재 선택된 항공권 데이터를 저장 (전역 변수로 먼저 선언)
let currentFlight = null;

// 탭 전환 함수 (전역으로 노출)
window.switchFlightTab = function (tabType) {
    console.log("switchFlightTab 호출됨:", tabType);
    console.log("currentFlight:", currentFlight);

    // 모든 탭 비활성화
    const tabs = document.querySelectorAll(".flight-tab");
    tabs.forEach((t) => t.classList.remove("active"));

    // 클릭한 탭 활성화
    const activeTab = document.querySelector(
        `.flight-tab[data-tab="${tabType}"]`,
    );
    if (activeTab) {
        activeTab.classList.add("active");
    }

    // 탭에 따라 다른 내용 렌더링
    if (!currentFlight) {
        console.error("currentFlight가 null입니다!");
        return;
    }

    console.log("탭 렌더링 시작:", tabType);
    switch (tabType) {
        case "info":
            renderFlightInfoTab(currentFlight);
            break;
        case "schedule":
            renderFlightScheduleTab(currentFlight);
            break;
        case "travel":
            renderFlightTravelTab(currentFlight);
            break;
    }
};

window.closeFlightModal = closeFlightModal;
window.viewMoreFlights = viewMoreFlights;
window.viewMoreDestinations = viewMoreDestinations;
window.bookFlight = bookFlight;
window.searchDestination = searchDestination;
window.renderFlights = renderFlights;
window.renderPopularDestinations = renderPopularDestinations;
