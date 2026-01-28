// 탭 전환 함수
function switchTab(tabName) {
    ["plans", "posts", "reviews"].forEach((name) => {
        const el = document.getElementById(`content-${name}`);
        if (el) el.classList.add("hidden");
    });
    const content = document.getElementById(`content-${tabName}`);
    if (content) content.classList.remove("hidden");

    ["plans", "posts", "reviews"].forEach((name) => {
        const btn = document.getElementById(`tab-${name}`);
        if (btn)
            btn.className =
                "flex-shrink-0 px-4 py-2 bg-white text-slate-600 rounded-xl text-sm font-medium border border-slate-200 hover:bg-slate-50 transition-all";
    });

    const activeBtn = document.getElementById(`tab-${tabName}`);
    if (activeBtn)
        activeBtn.className =
            "flex-shrink-0 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-md shadow-teal-500/20 transition-all";
}

// Destination Data & Functions
const allCountries = [
    {
        name: "방콕",
        location: "Thailand",
        img: "../../images/profile/BANGKOK.png",
    },
    {
        name: "바르셀로나",
        location: "Spain",
        img: "../../images/profile/BARCELONA.png",
    },
    {
        name: "베이징",
        location: "China",
        img: "../../images/profile/BEIJING.png",
    },
    {
        name: "베를린",
        location: "Germany",
        img: "../../images/profile/BERLIN.png",
    },
    {
        name: "다낭",
        location: "Vietnam",
        img: "../../images/profile/DANANG.png",
    },
    {
        name: "하노이",
        location: "Vietnam",
        img: "../../images/profile/HANOI.png",
    },
    {
        name: "홍콩",
        location: "Hong Kong",
        img: "../../images/profile/HONG KONG ISLAND.png",
    },
    {
        name: "지우펀",
        location: "Taiwan",
        img: "../../images/profile/JIUFEN.png",
    },
    {
        name: "라스베이거스",
        location: "USA",
        img: "../../images/profile/LASVEGAS.png",
    },
    {
        name: "런던",
        location: "UK",
        img: "../../images/profile/LONDON.png",
    },
    {
        name: "마드리드",
        location: "Spain",
        img: "../../images/profile/MADRID.png",
    },
    {
        name: "마리나 베이",
        location: "Singapore",
        img: "../../images/profile/MARINA BAY.png",
    },
    {
        name: "멜버른",
        location: "Australia",
        img: "../../images/profile/MELBOURNE.png",
    },
    {
        name: "뮌헨",
        location: "Germany",
        img: "../../images/profile/MUNICH.png",
    },
    {
        name: "뉴욕",
        location: "USA",
        img: "../../images/profile/NEW YORK.png",
    },
    {
        name: "오사카",
        location: "Japan",
        img: "../../images/profile/OSAKA.png",
    },
    {
        name: "파리",
        location: "France",
        img: "../../images/profile/PARIS.png",
    },
    {
        name: "상하이",
        location: "China",
        img: "../../images/profile/SHANGHAI.png",
    },
    {
        name: "시드니",
        location: "Australia",
        img: "../../images/profile/SYDNEY.png",
    },
    {
        name: "타이베이",
        location: "Taiwan",
        img: "../../images/profile/TAIPEI.png",
    },
    {
        name: "도쿄",
        location: "Japan",
        img: "../../images/profile/TOKYO.png",
    },
];

function toggleAddCountryModal() {
    const modal = document.getElementById("addCountryModal");
    const backdrop = document.getElementById("addCountryBackdrop");
    const panel = document.getElementById("addCountryPanel");

    if (modal.classList.contains("hidden")) {
        modal.classList.remove("hidden");
        setTimeout(() => {
            backdrop.classList.remove("opacity-0");
            panel.classList.remove(
                "opacity-0",
                "translate-y-full",
                "sm:translate-y-0",
            );
        }, 10);
        document.getElementById("countrySearchInput").value = "";
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, "0");
        const yearSelect = document.getElementById("travelYearInput");
        if (yearSelect.querySelector(`option[value="${yyyy}"]`)) {
            yearSelect.value = yyyy;
        }
        const monthSelect = document.getElementById("travelMonthInput");
        monthSelect.value = mm;
        renderCountries(allCountries);
    } else {
        backdrop.classList.add("opacity-0");
        panel.classList.add(
            "opacity-0",
            "translate-y-full",
            "sm:translate-y-0",
        );
        setTimeout(() => {
            modal.classList.add("hidden");
        }, 300);
    }
}

// 프로필 수정 모달 토글
function toggleEditModal() {
    const modal = document.getElementById("editModal");
    const backdrop = document.getElementById("modalBackdrop");
    const panel = document.getElementById("modalPanel");

    if (modal.classList.contains("hidden")) {
        // 열기 로직
        modal.classList.remove("hidden");

        // auth.js에 있는 함수 호출 (데이터 채우기)
        if (typeof populateProfile === "function") {
            populateProfile();
        }

        // 애니메이션
        setTimeout(() => {
            backdrop.classList.remove("opacity-0");
            panel.classList.remove(
                "opacity-0",
                "translate-y-full",
                "sm:translate-y-0",
            );
        }, 10);
    } else {
        // 닫기 로직
        backdrop.classList.add("opacity-0");
        panel.classList.add(
            "opacity-0",
            "translate-y-full",
            "sm:translate-y-0",
        );

        // 입력창 초기화
        const currPw = document.getElementById("currentPasswordInput");
        const newPw = document.getElementById("newPasswordInput");
        const confPw = document.getElementById("confirmPasswordInput");
        if (currPw) currPw.value = "";
        if (newPw) newPw.value = "";
        if (confPw) confPw.value = "";

        // 애니메이션 후 hidden 처리
        setTimeout(() => {
            modal.classList.add("hidden");
        }, 300);
    }
}

// [수정됨] 프로필 저장 처리 함수
function handleProfileUpdate(event) {
    event.preventDefault(); // 폼 제출로 인한 새로고침 방지

    // 1. 입력된 값 가져오기
    const newName = document.getElementById("edit-name").value;
    const newBio = document.getElementById("editBioInput").value;

    // (선택사항) 생년월일, 성별 등도 필요하면 여기서 가져옵니다.
    // const newBirthdate = document.getElementById("edit-birthdate").value;

    // 2. 화면(DOM) 업데이트 (즉시 반영)
    const bioDisplay = document.getElementById("profileBio");
    const nameDisplay = document.getElementById("profile-display-name");

    if (bioDisplay) {
        bioDisplay.innerText = newBio; // 자기소개 텍스트 변경
    }

    // 이름 업데이트 시 옆에 있는 레벨 뱃지(span)가 사라지지 않도록 처리
    if (nameDisplay) {
        // h1 태그 안의 첫 번째 텍스트 노드(이름)만 변경하고 span(레벨)은 유지
        if (nameDisplay.firstChild.nodeType === Node.TEXT_NODE) {
            nameDisplay.firstChild.textContent = newName + " ";
        } else {
            // 만약 구조가 다르다면 span을 제외하고 텍스트만 넣는 방식 사용
            const badge = nameDisplay.querySelector("span");
            nameDisplay.innerText = newName + " ";
            if (badge) nameDisplay.appendChild(badge);
        }
    }

    // 3. 로컬 스토리지(LocalStorage) 업데이트 (새로고침 시 유지)
    // 현재 로그인된 사용자 정보를 가져와서 수정 후 다시 저장
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        loggedInUser.name = newName;
        loggedInUser.selfIntroduction = newBio; // This line updates the bio
        // loggedInUser.birthdate = newBirthdate; // 필요 시 추가

        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }

    // 4. 알림 및 모달 닫기
    alert("프로필이 성공적으로 수정되었습니다.");
    toggleEditModal();
}

function togglePersonalityModal() {
    const modal = document.getElementById("personalityModal");
    const backdrop = document.getElementById("personalityBackdrop");
    const panel = document.getElementById("personalityPanel");
    if (modal.classList.contains("hidden")) {
        modal.classList.remove("hidden");
        setTimeout(() => {
            backdrop.classList.remove("opacity-0");
            panel.classList.remove("opacity-0", "scale-95");
            panel.classList.add("scale-100");
        }, 10);
    } else {
        backdrop.classList.add("opacity-0");
        panel.classList.add("opacity-0", "scale-95");
        panel.classList.remove("scale-100");
        setTimeout(() => {
            modal.classList.add("hidden");
        }, 300);
    }
}

function showPersonalityInfo() {
    togglePersonalityModal();
}

function togglePremiumModal() {
    const modal = document.getElementById("premiumModal");
    const backdrop = document.getElementById("premiumBackdrop");
    const panel = document.getElementById("premiumPanel");
    if (modal.classList.contains("hidden")) {
        modal.classList.remove("hidden");
        setTimeout(() => {
            backdrop.classList.remove("opacity-0");
            panel.classList.remove("opacity-0", "scale-95");
            panel.classList.add("scale-100");
        }, 10);
    } else {
        backdrop.classList.add("opacity-0");
        panel.classList.add("opacity-0", "scale-95");
        panel.classList.remove("scale-100");
        setTimeout(() => {
            modal.classList.add("hidden");
        }, 300);
    }
}

function filterCountries() {
    const query = document
        .getElementById("countrySearchInput")
        .value.toLowerCase();
    const filtered = allCountries.filter((c) =>
        c.name.toLowerCase().includes(query),
    );
    renderCountries(filtered);
}

function renderCountries(list) {
    const grid = document.getElementById("countryListGrid");
    if (!grid) return;
    grid.innerHTML = "";
    list.forEach((item) => {
        const btn = document.createElement("button");
        btn.className =
            "flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-primary hover:bg-slate-50 transition-all group";
        btn.onclick = () => addCountry(item.name, item.img, item.location);
        btn.innerHTML = `
        <div class="w-12 h-12 rounded-full mb-2 overflow-hidden border border-slate-100 group-hover:scale-110 transition-transform">
            <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover">
        </div>
        <span class="text-[11px] font-bold text-slate-700">${item.name}</span>
        <span class="text-[9px] text-slate-400">${item.location}</span>
    `;
        grid.appendChild(btn);
    });
    if (list.length === 0) {
        grid.innerHTML =
            '<p class="col-span-3 text-center text-slate-400 py-4">검색 결과가 없습니다.</p>';
    }
}

function addCountry(name, img, location) {
    const year = document.getElementById("travelYearInput").value;
    const month = document.getElementById("travelMonthInput").value;
    const dateStr = `${year}.${month}`;
    const selectedCountry = allCountries.find((c) => c.name === name);
    if (selectedCountry) {
        if (!myPassport.some((p) => p.name === selectedCountry.name)) {
            myPassport.unshift({
                ...selectedCountry,
                date: dateStr,
            });
            const btn = document.getElementById("expandPassportBtn");
            const wasExpanded = btn && btn.innerText === "접기";
            initPassportGrid(wasExpanded);
            updatePassportCounts();
        } else {
            alert("이미 여권에 추가된 도시입니다!");
            return;
        }
    }
    toggleAddCountryModal();
    setTimeout(() => {
        alert(`${name} (${dateStr}) 여행이 여권에 추가되었습니다!`);
    }, 300);
}

let myPassport = allCountries.slice(0, 6).map((item, index) => {
    const years = ["2023", "2022", "2021"];
    const months = ["01", "05", "08", "12"];
    return {
        ...item,
        date: `${years[index % 3]}.${months[index % 4]}`,
    };
});

function updatePassportCounts() {
    const count = myPassport.length;
    const countBadge = document.getElementById("passportCountBadge");
    if (countBadge) countBadge.innerText = count;
}

function initPassportGrid(forceExpanded = false) {
    const grid = document.getElementById("mainPassportPreview");
    if (!grid) return;
    grid.innerHTML = "";
    myPassport.forEach((item, index) => {
        const badge = document.createElement("div");
        const isHidden = !forceExpanded && index >= 3;
        badge.className = `flex flex-col items-center transition-all duration-300 ${isHidden ? "hidden passport-extra" : "passport-extra-visible"}`;
        if (index >= 3) badge.classList.add("passport-extra");
        badge.innerHTML = `
        <div class="w-20 h-20 rounded-full bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center mb-3 overflow-hidden group-hover:scale-110 transition-transform">
            <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover">
        </div>
        <span class="text-sm font-bold text-slate-900 mb-0.5">${item.name}</span>
        <span class="text-xs text-slate-400">${item.date}</span>
    `;
        grid.appendChild(badge);
    });
    const addBtn = document.createElement("div");
    addBtn.className =
        "flex flex-col items-center cursor-pointer hover:scale-105 transition-transform order-last";
    addBtn.onclick = () => toggleAddCountryModal();
    addBtn.innerHTML = `
    <div class="w-20 h-20 rounded-full bg-slate-50 border-4 border-dashed border-slate-300 flex items-center justify-center mb-3 text-slate-400 hover:text-primary hover:border-primary transition-colors">
        <span class="material-symbols-outlined text-3xl">add</span>
    </div>
    <span class="text-sm font-bold text-slate-900 mb-0.5">추가하기</span>
    <span class="text-xs text-slate-400">New</span>
`;
    grid.appendChild(addBtn);
    const btn = document.getElementById("expandPassportBtn");
    if (btn && forceExpanded) {
        btn.innerText = "접기";
    }
}

function togglePassportExpansion() {
    const extras = document.querySelectorAll(".passport-extra");
    const btn = document.getElementById("expandPassportBtn");
    const isExpanded = btn.innerText === "접기";
    extras.forEach((el) => {
        if (isExpanded) {
            el.classList.add("hidden");
        } else {
            el.classList.remove("hidden");
            el.classList.add("animate-fade-in");
        }
    });
    btn.innerText = isExpanded ? "모두 보기" : "접기";
}

// -----------------------------------------------------------
// [수정됨] 비밀번호 확인 및 프로필 수정 모달 로직
// -----------------------------------------------------------

// 1. 비밀번호 확인 모달 열기
function openPasswordCheckModal() {
    const modal = document.getElementById("passwordCheckModal");
    const backdrop = document.getElementById("passwordCheckBackdrop");
    const panel = document.getElementById("passwordCheckPanel");

    if (modal) {
        modal.classList.remove("hidden");
        setTimeout(() => {
            if (backdrop) backdrop.classList.remove("opacity-0");
            if (panel) {
                panel.classList.remove("opacity-0", "scale-95");
                panel.classList.add("opacity-100", "scale-100");
            }
        }, 10);
        // 입력창 초기화 및 포커스
        const input = document.getElementById("passwordCheckInput");
        if (input) {
            input.value = "";
            input.focus();
        }
    }
}

// 2. 비밀번호 확인 모달 닫기
function closePasswordCheckModal() {
    const modal = document.getElementById("passwordCheckModal");
    const backdrop = document.getElementById("passwordCheckBackdrop");
    const panel = document.getElementById("passwordCheckPanel");

    if (backdrop) backdrop.classList.add("opacity-0");
    if (panel) {
        panel.classList.remove("opacity-100", "scale-100");
        panel.classList.add("opacity-0", "scale-95");
    }

    setTimeout(() => {
        if (modal) modal.classList.add("hidden");
    }, 300);
}

// 3. 비밀번호 확인 로직 (확인 버튼 클릭 시 실행)
function verifyPasswordAndEdit() {
    const passwordInput = document.getElementById("passwordCheckInput");

    if (passwordInput && passwordInput.value.trim().length > 0) {
        // 1) 비밀번호 확인 모달 닫기
        closePasswordCheckModal();

        // 2) 약간의 딜레이 후 프로필 수정 모달 열기
        // (딜레이를 주어야 닫히는 애니메이션과 열리는 동작이 겹치지 않음)
        setTimeout(() => {
            toggleEditModal();
        }, 300);
    } else {
        alert("비밀번호를 입력해주세요.");
    }
}

// HTML onclick에서 사용할 수 있도록 전역 객체에 등록
window.switchTab = switchTab;
window.toggleAddCountryModal = toggleAddCountryModal;
window.toggleEditModal = toggleEditModal;
window.togglePersonalityModal = togglePersonalityModal;
window.showPersonalityInfo = showPersonalityInfo;
window.togglePremiumModal = togglePremiumModal;
window.filterCountries = filterCountries;
window.renderCountries = renderCountries;
window.addCountry = addCountry;
window.updatePassportCounts = updatePassportCounts;
window.initPassportGrid = initPassportGrid;
window.togglePassportExpansion = togglePassportExpansion;
window.openPasswordCheckModal = openPasswordCheckModal;
window.closePasswordCheckModal = closePasswordCheckModal;
window.verifyPasswordAndEdit = verifyPasswordAndEdit;
window.handleProfileUpdate = handleProfileUpdate; // 새로 추가됨

// 이벤트 리스너 등록 (중복 방지를 위해 onclick 속성 사용)
document.addEventListener("DOMContentLoaded", () => {
    // [중요] addEventListener 대신 onclick을 사용하여 중복 바인딩 방지
    const verifyBtn = document.getElementById("verifyPasswordAndEditBtn");
    if (verifyBtn) {
        verifyBtn.onclick = verifyPasswordAndEdit;
    }

    // 엔터키 입력 처리
    const passwordInput = document.getElementById("passwordCheckInput");
    if (passwordInput) {
        passwordInput.onkeypress = (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); // 폼 제출 방지
                verifyPasswordAndEdit();
            }
        };
    }
});
