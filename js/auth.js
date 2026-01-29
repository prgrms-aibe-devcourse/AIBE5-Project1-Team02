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

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(user => user.email === email)) {
        alert('이미 가입된 이메일입니다.');
        return;
    }

    const user = {
        id: email, // 고유 ID로 email 사용
        name,
        gender: gender.value,
        birthdate,
        email,
        password, // In a real app, you must hash the password!
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
    window.location.href = './SignIn.html';
}

function handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert('로그인 성공!');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = '../main/Main.html';
    } else {
        alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const authLinksContainer = document.getElementById('auth-links');

    if (isLoggedIn === 'true' && user && authLinksContainer) {
        authLinksContainer.innerHTML = `
            <a href="../profile/profile.html" class="text-sm font-medium">${user.name}님</a>
            <button onclick="handleLogout()" class="text-sm font-medium text-primary-foreground px-4 py-2 rounded-md">로그아웃</button>
        `;
    }
}


function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser'); 
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

    const user = JSON.parse(localStorage.getItem('loggedInUser'));
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

    const profileBio = document.getElementById('profileBio');
    if (profileBio) {
        profileBio.innerText = user.selfIntroduction ? user.selfIntroduction : "새로운 곳에서의 설렘을 즐기는 여행자입니다. 주로 휴양지보다는 도심 속 숨겨진 명소를 찾는 것을 좋아해요!";
    }

    const editBioInput = document.getElementById('editBioInput');
    if (editBioInput) {
        editBioInput.value = user.selfIntroduction || "";
    }

}

function handleProfileUpdate(event) {
    event.preventDefault();

    const updatedName = document.getElementById('edit-name').value;
    const updatedBirthdate = document.getElementById('edit-birthdate').value;
    const updatedGender = document.getElementById('edit-gender').value;
    const updatedSelfIntroduction = document.getElementById('editBioInput').value;


    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    
    user.name = updatedName;
    user.birthdate = updatedBirthdate;
    user.gender = updatedGender;
    user.selfIntroduction = updatedSelfIntroduction;

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
        
        // Clear password fields
        document.getElementById('currentPasswordInput').value = '';
        document.getElementById('newPasswordInput').value = '';
        document.getElementById('confirmPasswordInput').value = '';
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex > -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }


    alert('프로필 정보가 저장되었습니다.');
    // Repopulate fields to show updated info
    populateProfile(); 
    // Close the modal
    if (typeof toggleEditModal === 'function') {
        toggleEditModal(); 
    }
}
