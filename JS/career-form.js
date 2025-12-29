// Career Form Handler
const careerForm = document.getElementById('careerForm');

if (careerForm) {
    careerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            experience: document.getElementById('experience').value,
            position: document.getElementById('position').value,
            message: document.getElementById('message').value
        };
        
        // Create email body
        const emailBody = `
Nome: ${formData.name}
E-mail: ${formData.email}
Telefone: ${formData.phone}
Experiência: ${formData.experience}
Cargo: ${formData.position}

Mensagem:
${formData.message}
        `.trim();
        
        // Create mailto link
        const mailtoLink = `mailto:barbeariacasablanca@casablanca.com?subject=Candidatura - ${formData.position}&body=${encodeURIComponent(emailBody)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Seu email está sendo preparado! Por favor, envie pelo seu cliente de email.');
        
        // Optional: Reset form
        // careerForm.reset();
    });
}

// Phone mask
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        
        e.target.value = value;
    });
}
