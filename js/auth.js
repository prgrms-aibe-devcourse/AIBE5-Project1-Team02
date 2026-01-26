function handleSignUp(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const birthdate = document.getElementById('birthdate').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!name || !gender || !birthdate || !email || !password) {
        alert('모든 필드를 채워주세요.');
        return;
    }

    if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    const user = {
        name,
        gender: gender.value,
        birthdate,
        email,
        password, // In a real app, you must hash the password!
    };

    localStorage.setItem('user', JSON.stringify(user));

    alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
    window.location.href = './SignIn.html';
}

function handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
        alert('등록된 사용자 정보가 없습니다. 먼저 회원가입을 진행해주세요.');
        return;
    }

    const user = JSON.parse(storedUser);

    if (email === user.email && password === user.password) {
        alert('로그인 성공!');
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '../main/Main.html';
    } else {
        alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const user = JSON.parse(localStorage.getItem('user'));
    const authLinksContainer = document.getElementById('auth-links');

    if (isLoggedIn === 'true' && user && authLinksContainer) {
        authLinksContainer.innerHTML = `
            <a href="../profile/profile.html" class="text-sm font-medium">${user.name}님</a>
            <button onclick="handleLogout()" class="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md">로그아웃</button>
        `;
    }
}


function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    // Keep user data for potential re-login
    // localStorage.removeItem('user'); 
    alert('로그아웃되었습니다.');
    window.location.href = '../main/Main.html';
}

function populateProfile() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        alert('로그인이 필요합니다.');
        window.location.href = '../auth/SignIn.html';
        return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('사용자 정보를 찾을 수 없습니다.');
        localStorage.removeItem('isLoggedIn');
        window.location.href = '../auth/SignIn.html';
        return;
    }

    // Populate main display
    const displayName = document.getElementById('profile-display-name');
    if (displayName) {
        displayName.childNodes[0].nodeValue = user.name + ' '; // Keep the span
    }

    const displayDetails = document.getElementById('profile-display-details');
    if (displayDetails) {
        const genderText = user.gender === 'male' ? '남성' : '여성';
        displayDetails.innerText = `${genderText} · ${user.birthdate}`;
    }

    // Populate edit modal form
    const editEmail = document.getElementById('edit-email');
    if (editEmail) editEmail.value = user.email;
    
    const editName = document.getElementById('edit-name');
    if (editName) editName.value = user.name;
    
    const editBirthdate = document.getElementById('edit-birthdate');
    if (editBirthdate) editBirthdate.value = user.birthdate;

    const editGender = document.getElementById('edit-gender');
    if(editGender) editGender.value = user.gender;

}

function handleProfileUpdate(event) {
    event.preventDefault();

    const updatedName = document.getElementById('edit-name').value;
    const updatedBirthdate = document.getElementById('edit-birthdate').value;
    const updatedGender = document.getElementById('edit-gender').value;

    const user = JSON.parse(localStorage.getItem('user'));
    
    user.name = updatedName;
    user.birthdate = updatedBirthdate;
    user.gender = updatedGender;

    localStorage.setItem('user', JSON.stringify(user));

    // Also update password if fields are filled
    const currentPw = document.getElementById('currentPasswordInput').value;
    const newPw = document.getElementById('newPasswordInput').value;
    const confirmPw = document.getElementById('confirmPasswordInput').value;

    if (currentPw && newPw && confirmPw) {
        if (currentPw !== user.password) {
            alert('현재 비밀번호가 올바르지 않습니다.');
            return;
        }
        if (newPw !== confirmPw) {
            alert('새 비밀번호가 일치하지 않습니다.');
            return;
        }
        if (newPw.length < 4) {
            alert("새 비밀번호는 4자 이상이어야 합니다.");
            return;
        }
        user.password = newPw;
        localStorage.setItem('user', JSON.stringify(user));
        alert('비밀번호가 성공적으로 변경되었습니다.');
        
        // Clear password fields
        document.getElementById('currentPasswordInput').value = '';
        document.getElementById('newPasswordInput').value = '';
        document.getElementById('confirmPasswordInput').value = '';
    }

    alert('프로필 정보가 저장되었습니다.');
    // Repopulate fields to show updated info
    populateProfile(); 
    // Close the modal
    toggleEditModal(); 
}
