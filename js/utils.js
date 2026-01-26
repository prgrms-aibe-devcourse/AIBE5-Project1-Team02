// 날짜 포맷팅
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
}

// 금액 포맷팅
function formatCurrency(amount) {
    return (
        new Intl.NumberFormat("ko-KR", {
            style: "currency",
            currency: "KRW",
        })
            .format(amount)
            .replace("₩", "") + "원"
    );
}

// 로컬스토리지 헬퍼
const storage = {
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    clear() {
        localStorage.clear();
    },
};

// 알림 표시
function showAlert(message, type = "success") {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.style.animation = "slideOutRight 0.3s ease-out";
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// 애니메이션 CSS 추가
if (!document.querySelector("#alert-animations")) {
    const style = document.createElement("style");
    style.id = "alert-animations";
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// 모달 관리
class Modal {
    constructor(id) {
        this.modal = document.getElementById(id);
        if (!this.modal) {
            console.warn(`Modal with id "${id}" not found`);
        }
    }

    show() {
        if (this.modal) {
            this.modal.classList.add("show");
            document.body.style.overflow = "hidden";
        }
    }

    hide() {
        if (this.modal) {
            this.modal.classList.remove("show");
            document.body.style.overflow = "";
        }
    }

    onClose(callback) {
        if (this.modal) {
            this.modal.addEventListener("click", (e) => {
                if (
                    e.target === this.modal ||
                    e.target.closest(".modal-close")
                ) {
                    this.hide();
                    if (callback) callback();
                }
            });
        }
    }
}

// 로딩 오버레이
const loading = {
    show() {
        let overlay = document.getElementById("loading-overlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "loading-overlay";
            overlay.className = "loading-overlay";
            overlay.innerHTML = '<div class="spinner"></div>';
            document.body.appendChild(overlay);
        }
        overlay.style.display = "flex";
    },

    hide() {
        const overlay = document.getElementById("loading-overlay");
        if (overlay) {
            overlay.style.display = "none";
        }
    },
};

// 디바운스
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// HTML 이스케이프
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// 랜덤 ID 생성
function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// 쿼리 파라미터 가져오기
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 쿼리 파라미터 설정
function setQueryParam(param, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(param, value);
    window.history.pushState({}, "", url);
}

// 배열 셔플
function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 날짜 차이 계산 (일 단위)
function dateDiff(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// 이미지 로딩 에러 처리
function handleImageError(
    img,
    fallbackUrl = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
) {
    img.onerror = function () {
        this.src = fallbackUrl;
        this.onerror = null;
    };
}

// SVG 아이콘 생성 헬퍼
const icons = {
    calendar: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>`,

    mapPin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
    </svg>`,

    dollarSign: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>`,

    trash: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>`,

    heart: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>`,

    star: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>`,
};

// ================================================
// 전역 함수 내보내기 (HTML에서 사용)
// ================================================
window.formatDate = formatDate;
window.formatCurrency = formatCurrency;
window.showAlert = showAlert;
window.handleImageError = handleImageError;
window.escapeHtml = escapeHtml;
