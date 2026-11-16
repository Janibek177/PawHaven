window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1850);
});

const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');

burgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
});

const customAlert = document.getElementById('customAlert');
const alertMessage = document.getElementById('alertMessage');
const alertIcon = document.getElementById('alertIcon');
let alertTimeout;

function showAlert(message, type) {
    clearTimeout(alertTimeout);
    alertMessage.textContent = message;
    customAlert.className = `custom-alert show ${type}`;
    if (type === 'success') {
        alertIcon.className = 'fa-solid fa-circle-check';
    } else if (type === 'info') {
        alertIcon.className = 'fa-solid fa-paw';
    } else {
        alertIcon.className = 'fa-solid fa-circle-exclamation';
    }

    alertTimeout = setTimeout(() => {
        customAlert.classList.remove('show');
    }, 3500);
}

const moreServicesBtn = document.getElementById('moreServicesBtn');
moreServicesBtn.addEventListener('click', () => {
    showAlert('No more services, only this and adopting', 'info');
});

const toggleBtns = document.querySelectorAll('.toggle-btn');
const priceVals = document.querySelectorAll('.price-val');

toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const plan = btn.getAttribute('data-plan');
        priceVals.forEach(price => {
            price.textContent = price.getAttribute(`data-${plan}`);
        });
    });
});

const contactModal = document.getElementById('contactModal');
const closeModalBtn = document.getElementById('closeModal');
const openContactBtns = document.querySelectorAll('.open-contact');

openContactBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.classList.add('active');
    });
});

closeModalBtn.addEventListener('click', () => {
    contactModal.classList.remove('active');
});

contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.classList.remove('active');
    }
});

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!username || !address || !phone) {
        showAlert('Please fill in all fields!', 'error');
        return;
    }

    showAlert('Successfully sent! Please wait, we will contact you soon.', 'success');
    contactForm.reset();
    contactModal.classList.remove('active');
});

const paymentModal = document.getElementById('paymentModal');
const closePaymentModalBtn = document.getElementById('closePaymentModal');
const openPaymentBtns = document.querySelectorAll('.open-payment');
const paymentPlanTitle = document.getElementById('paymentPlanTitle');

openPaymentBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const title = btn.getAttribute('data-plan-title');
        paymentPlanTitle.textContent = title || 'Complete Payment';
        paymentModal.classList.add('active');
    });
});

closePaymentModalBtn.addEventListener('click', () => {
    paymentModal.classList.remove('active');
});

paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        paymentModal.classList.remove('active');
    }
});

const cardNumberInput = document.getElementById('cardNumber');
const cardDateInput = document.getElementById('cardDate');
const cardCvcInput = document.getElementById('cardCvc');

cardNumberInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    e.target.value = val.replace(/(.{4})/g, '$1 ').trim();
});

cardDateInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) {
        e.target.value = val.substring(0, 2) + '/' + val.substring(2);
    } else {
        e.target.value = val;
    }
});

cardCvcInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
});

const paymentForm = document.getElementById('paymentForm');

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const payUsername = document.getElementById('payUsername').value.trim();
    const cardNumber = cardNumberInput.value.replace(/\s/g, '');
    const cardDate = cardDateInput.value.trim();
    const cardCvc = cardCvcInput.value.trim();

    if (!payUsername || cardNumber.length < 16 || cardDate.length < 5 || cardCvc.length < 3) {
        showAlert('Please fill in all card details correctly!', 'error');
        return;
    }

    showAlert('Payment successful! Your plan is now active.', 'success');
    paymentForm.reset();
    paymentModal.classList.remove('active');
});