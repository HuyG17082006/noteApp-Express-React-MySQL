export function validateLogin({ username, password }) {
    const errors = {
        username : "",
        password : ""
    };

    if (!username || username.trim() === '') {
        errors.username = "Không được để trống username";
    }

    if (!password || password.trim() === '') {
        errors.password = "Không được để trống mật khẩu";
    }

    let isValid = true;

    if (errors.password || errors.username) {
        isValid = false;
    }

    return {
        isValid,
        errors
    };
}

export function validateRegister({ username, email, password }) {
    const errors = {
        username: "",
        email: "",
        password: ""
    };

    if (!username || username.trim() === '') {
        errors.username = "Không được để trống username";
    } else if (username.trim().length < 8) {
        errors.username = "Username phải >= 8 ký tự";
    }

    const emailTrim = email?.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailTrim) {
        errors.email = "Không được để trống email";
    } else if (!emailRegex.test(emailTrim)) {
        errors.email = "Email không hợp lệ";
    }

    if (!password || password.trim() === '') {
        errors.password = "Không được để trống mật khẩu";
    } else if (password.length < 6) {
        errors.password = "Mật khẩu phải >= 6 ký tự";
    }

    let isValid = true;

    if (errors.password || errors.username || errors.email) {
        isValid = false;
    }

    return {
        isValid,
        errors
    };
}