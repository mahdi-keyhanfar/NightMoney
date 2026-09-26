/* =========================================================
   Night Money
   Login Page JavaScript
   ========================================================= */

"use strict";


/* =========================================================
   Elements
   ========================================================= */

const loginForm = document.getElementById("loginForm");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");

const passwordToggle = document.getElementById("passwordToggle");

const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");

const rememberMe = document.getElementById("rememberMe");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const languageToggle = document.getElementById("languageToggle");


/* =========================================================
   Translations
   ========================================================= */

const translations = {

    fa: {
        brandSubtitle: "مدیریت هوشمند فروش",

        welcome: "خوش آمدید",

        loginDescription:
            "برای ورود به پنل مدیریت، اطلاعات خود را وارد کنید.",

        username: "نام کاربری",

        password: "رمز عبور",

        usernamePlaceholder:
            "نام کاربری خود را وارد کنید",

        passwordPlaceholder:
            "رمز عبور خود را وارد کنید",

        rememberMe:
            "مرا به خاطر بسپار",

        login:
            "ورود به پنل",

        secureAccess:
            "دسترسی امن و اختصاصی",

        allRights:
            "تمامی حقوق محفوظ است",

        usernameRequired:
            "لطفاً نام کاربری را وارد کنید.",

        passwordRequired:
            "لطفاً رمز عبور را وارد کنید.",

        loginSuccess:
            "ورود با موفقیت انجام شد.",

        loginError:
            "نام کاربری یا رمز عبور صحیح نیست."
    },


    en: {
        brandSubtitle: "Smart Sales Management",

        welcome: "Welcome Back",

        loginDescription:
            "Enter your credentials to access the management panel.",

        username: "Username",

        password: "Password",

        usernamePlaceholder:
            "Enter your username",

        passwordPlaceholder:
            "Enter your password",

        rememberMe:
            "Remember me",

        login:
            "Sign in",

        secureAccess:
            "Secure & Private Access",

        allRights:
            "All rights reserved",

        usernameRequired:
            "Please enter your username.",

        passwordRequired:
            "Please enter your password.",

        loginSuccess:
            "Login successful.",

        loginError:
            "Incorrect username or password."
    }

};


/* =========================================================
   Current Language
   ========================================================= */

let currentLanguage =
    localStorage.getItem("nightMoneyLanguage") || "fa";


/* =========================================================
   Apply Language
   ========================================================= */

function applyLanguage(language) {

    currentLanguage = language;

    const dictionary = translations[language];

    // Layout همیشه LTR باقی می‌ماند
    document.documentElement.lang = language;
    document.documentElement.dir = "ltr";

    document.body.classList.remove("ltr");

    languageToggle.textContent =
        language === "fa" ? "EN" : "FA";


    // تغییر متن‌ها
    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key = element.dataset.i18n;

            if (dictionary[key]) {
                element.textContent = dictionary[key];
            }
        });


    // تغییر Placeholderها
    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key = element.dataset.i18nPlaceholder;

            if (dictionary[key]) {
                element.placeholder = dictionary[key];
            }
        });


    localStorage.setItem(
        "nightMoneyLanguage",
        language
    );
}


/* =========================================================
   Language Toggle
   ========================================================= */

languageToggle.addEventListener("click", () => {

    const newLanguage =
        currentLanguage === "fa"
            ? "en"
            : "fa";

    applyLanguage(newLanguage);

    clearErrors();
    hideMessage();
});


/* =========================================================
   Password Visibility
   ========================================================= */

passwordToggle.addEventListener("click", () => {

    const isPassword =
        passwordInput.type === "password";

    passwordInput.type =
        isPassword
            ? "text"
            : "password";

    passwordToggle.setAttribute(
        "aria-label",
        isPassword
            ? "Hide password"
            : "Show password"
    );
});


/* =========================================================
   Theme
   ========================================================= */

function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

        themeIcon.textContent = "☀";

    } else {

        document.body.classList.remove("dark-mode");

        themeIcon.textContent = "☾";
    }
}


const savedTheme =
    localStorage.getItem("nightMoneyTheme") || "light";

applyTheme(savedTheme);


themeToggle.addEventListener("click", () => {

    const isDark =
        document.body.classList.contains("dark-mode");

    const newTheme =
        isDark
            ? "light"
            : "dark";

    applyTheme(newTheme);

    localStorage.setItem(
        "nightMoneyTheme",
        newTheme
    );
});


/* =========================================================
   Remember Me
   ========================================================= */

const rememberedUsername =
    localStorage.getItem("nightMoneyUsername");

if (rememberedUsername) {

    usernameInput.value =
        rememberedUsername;

    rememberMe.checked = true;
}


function handleRememberMe() {

    if (rememberMe.checked) {

        localStorage.setItem(
            "nightMoneyUsername",
            usernameInput.value.trim()
        );

    } else {

        localStorage.removeItem(
            "nightMoneyUsername"
        );
    }
}


/* =========================================================
   Validation
   ========================================================= */

function clearErrors() {

    usernameError.textContent = "";
    passwordError.textContent = "";

    usernameInput
        .closest(".input-group")
        .classList.remove("has-error");

    passwordInput
        .closest(".input-group")
        .classList.remove("has-error");
}


function validateForm() {

    clearErrors();

    let isValid = true;

    const username =
        usernameInput.value.trim();

    const password =
        passwordInput.value.trim();


    if (!username) {

        usernameError.textContent =
            translations[currentLanguage].usernameRequired;

        usernameInput
            .closest(".input-group")
            .classList.add("has-error");

        isValid = false;
    }


    if (!password) {

        passwordError.textContent =
            translations[currentLanguage].passwordRequired;

        passwordInput
            .closest(".input-group")
            .classList.add("has-error");

        isValid = false;
    }


    return isValid;
}


/* =========================================================
   Message
   ========================================================= */

function showMessage(type, message) {

    loginMessage.className =
        `login-message show ${type}`;

    loginMessage.textContent =
        message;
}


function hideMessage() {

    loginMessage.className =
        "login-message";

    loginMessage.textContent = "";
}


/* =========================================================
   Login
   ========================================================= */

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    hideMessage();

    if (!validateForm()) {
        return;
    }


    handleRememberMe();


    /*
       -------------------------------------------------------
       TEMPORARY FRONT-END LOGIN

       در مرحله بک‌اند، این قسمت با API واقعی جایگزین خواهد شد.

       مثال آینده:

       const response = await fetch("/api/auth/login", {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
               username,
               password
           })
       });

       -------------------------------------------------------
    */


    loginButton.disabled = true;
    loginButton.classList.add("loading");


    await new Promise(resolve => {
        setTimeout(resolve, 900);
    });


    loginButton.disabled = false;
    loginButton.classList.remove("loading");


    /*
       فعلاً فقط برای تست UI
    */

    showMessage(
        "success",
        translations[currentLanguage].loginSuccess
    );

});


/* =========================================================
   Input Events
   ========================================================= */

usernameInput.addEventListener("input", () => {

    usernameInput
        .closest(".input-group")
        .classList.remove("has-error");

    usernameError.textContent = "";

    hideMessage();
});


passwordInput.addEventListener("input", () => {

    passwordInput
        .closest(".input-group")
        .classList.remove("has-error");

    passwordError.textContent = "";

    hideMessage();
});


/* =========================================================
   Initial Setup
   ========================================================= */

applyLanguage(currentLanguage);