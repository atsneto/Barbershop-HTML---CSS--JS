// Phone input masking
const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 2) {
                value = `(${value}`;
            } else if (value.length <= 7) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
            }
        }
        
        e.target.value = value;
    });
}

// Set minimum date to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

// Time slot handling by weekday
const timeSelect = document.getElementById('time');
const weekdayHours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const saturdayHours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

function setTimeOptions(times, placeholderText) {
    if (!timeSelect) return;
    timeSelect.innerHTML = '';

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = placeholderText;
    placeholder.disabled = true;
    placeholder.selected = true;
    timeSelect.appendChild(placeholder);

    times.forEach((time) => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
}

function getAllowedTimesForDate(dateStr) {
    if (!dateStr) return null;
    const date = new Date(`${dateStr}T00:00:00`);
    if (Number.isNaN(date.getTime())) return null;

    const day = date.getDay();
    if (day === 0) return []; // Sunday closed
    if (day === 6) return saturdayHours;
    return weekdayHours;
}

function refreshTimeOptions() {
    if (!timeSelect) return;

    const allowedTimes = getAllowedTimesForDate(dateInput?.value);
    if (allowedTimes === null) {
        timeSelect.disabled = true;
        timeSelect.required = true;
        timeSelect.setCustomValidity('Selecione uma data válida.');
        setTimeOptions([], 'Selecione uma data primeiro');
        return;
    }

    if (allowedTimes.length === 0) {
        timeSelect.disabled = true;
        timeSelect.required = true;
        timeSelect.setCustomValidity('Estamos fechados aos domingos.');
        setTimeOptions([], 'Fechado aos domingos');
        return;
    }

    timeSelect.disabled = false;
    timeSelect.required = true;
    timeSelect.setCustomValidity('');
    setTimeOptions(allowedTimes, 'Selecione');
}

if (dateInput && timeSelect) {
    dateInput.addEventListener('change', refreshTimeOptions);
    refreshTimeOptions();
}

// Form submission and WhatsApp link generation
const scheduleForm = document.getElementById('scheduleForm');
const submitBtn = document.getElementById('submitBtn');

if (scheduleForm) {
    // Handle button click instead of form submit
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleScheduleSubmit();
        });
    }
    
    // Also handle form submit for accessibility
    scheduleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleScheduleSubmit();
    });
}

function handleScheduleSubmit() {
    // Validate form
    if (!scheduleForm.checkValidity()) {
        scheduleForm.reportValidity();
        return;
    }
    
    // Get form values
    const barberRadio = document.querySelector('input[name="barber"]:checked');
    if (!barberRadio) {
        alert('Por favor, selecione um barbeiro');
        return;
    }
    
    const barber = barberRadio.value;
    const barberPhone = barberRadio.getAttribute('data-phone') || '5584987912547';
    
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const name = document.getElementById('name').value;

    const allowedTimes = getAllowedTimesForDate(date);
    if (allowedTimes === null) {
        alert('Por favor, selecione uma data válida.');
        return;
    }
    if (allowedTimes.length === 0) {
        alert('Estamos fechados aos domingos. Por favor, escolha outro dia.');
        return;
    }
    if (!allowedTimes.includes(time)) {
        alert('Selecione um horário disponível para o dia escolhido.');
        return;
    }
    
    // Format date
    const dateObj = new Date(date + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Build WhatsApp message (sem emojis, com dados em negrito)
    let message = `Olá ${barber},\n\n`;
    message += `Me chamo *${name}* e gostaria de realizar o serviço *${service}* `;
    message += `na data *${formattedDate}* às *${time}*.\n\n`;
    message += `Vocês teriam disponibilidade nesse horário?\n\n`;
    message += `*Mensagem enviada automaticamente pelo sistema de agendamento online*.`;

    
    // Create WhatsApp link with barber's phone number
    const whatsappLink = `https://wa.me/${barberPhone}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappLink, '_blank');
}
