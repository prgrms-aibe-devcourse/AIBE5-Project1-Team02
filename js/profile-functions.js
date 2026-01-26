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

// Destination Data (Based on ../../images/profile - 21 cities)
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

        const yearSelect =
            document.getElementById("travelYearInput");
        if (yearSelect.querySelector(`option[value="${yyyy}"]`)) {
            yearSelect.value = yyyy;
        }
        const monthSelect =
            document.getElementById("travelMonthInput");
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

function closePasswordCheckModal() {
    const modal = document.getElementById("passwordCheckModal");
    const backdrop = document.getElementById(
        "passwordCheckBackdrop",
    );
    const panel = document.getElementById("passwordCheckPanel");

    backdrop.classList.add("opacity-0");
    panel.classList.add("opacity-0", "scale-95");
    panel.classList.remove("scale-100");

    setTimeout(() => {
        modal.classList.add("hidden");
    }, 300);
}

function requestEditProfile() {
    const modal = document.getElementById("passwordCheckModal");
    const backdrop = document.getElementById(
        "passwordCheckBackdrop",
    );
    const panel = document.getElementById("passwordCheckPanel");
    const input = document.getElementById("passwordCheckInput");

    input.value = ""; // Reset
    modal.classList.remove("hidden");

    setTimeout(() => {
        backdrop.classList.remove("opacity-0");
        panel.classList.remove("opacity-0", "scale-95");
        panel.classList.add("scale-100");
        input.focus();
    }, 10);
}


function verifyPasswordAndEdit() {
    const input = document.getElementById("passwordCheckInput");
    const user = JSON.parse(localStorage.getItem('user'));
    if (input.value === user.password) {
        closePasswordCheckModal();
        setTimeout(() => {
            toggleEditModal();
        }, 300);
    } else {
        alert("비밀번호가 올바르지 않습니다.");
        input.focus();
    }
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

function showPersonalityInfo() {
    togglePersonalityModal();
}

function togglePassportExpansion() {
    const hiddenItems =
        document.querySelectorAll(".passport-hidden");
    const btn = document.getElementById("expandPassportBtn");
    const isExpanded = btn && btn.innerText === "접기";

    hiddenItems.forEach((item) => {
        if (isExpanded) {
            item.classList.add("hidden");
        } else {
            item.classList.remove("hidden");
            item.classList.add("flex");
        }
    });

    if (btn) {
        btn.innerText = isExpanded ? "모두 보기" : "접기";
    }
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
        btn.onclick = () =>
            addCountry(item.name, item.img, item.location);
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

    const selectedCountry = allCountries.find(
        (c) => c.name === name,
    );
    if (selectedCountry) {
        if (
            !myPassport.some((p) => p.name === selectedCountry.name)
        ) {
            myPassport.unshift({
                ...selectedCountry,
                date: dateStr,
            });

            const btn =
                document.getElementById("expandPassportBtn");
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
    const countSpan = document.getElementById("passportCount");
    const countBadge =
        document.getElementById("passportCountBadge");

    if (countSpan) countSpan.innerText = `${count}개국`;
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
    const isExpanded = btn && btn.innerText === "접기";

    extras.forEach((el) => {
        if (isExpanded) {
            el.classList.add("hidden");
        } else {
            el.classList.remove("hidden");
            el.classList.add("animate-fade-in");
        }
    });

    if (btn) {
        btn.innerText = isExpanded ? "모두 보기" : "접기";
    }
}

// Initialize on load
        </script>
        <script src="../../js/auth.js"></script>
        <script>
            document.addEventListener("DOMContentLoaded", () => {
                populateProfile();
                updatePassportCounts();
                initPassportGrid();
            });
    </body>
</html>