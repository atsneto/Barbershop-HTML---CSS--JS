# Casablanca Barbearia — Landing Page

Landing page institucional desenvolvida para barbearias, com foco em apresentação de serviços e agendamento via WhatsApp.  
Projeto estático, seguro e otimizado para deploy em produção na Netlify.

---

## 📌 Visão Geral

Este projeto foi desenvolvido utilizando **HTML, CSS e JavaScript puro**, sem dependências de backend ou banco de dados.  
O sistema de agendamento gera automaticamente uma mensagem e redireciona o usuário para o WhatsApp da barbearia ou do profissional selecionado.

Ideal para:
- Presença digital institucional
- Pequenos negócios
- Agendamentos simples via WhatsApp
- Sites rápidos, seguros e de baixo custo operacional

---

## 🗂️ Estrutura do Projeto

```
.
├── index.html                 # Página inicial (landing page)
├── agendar.html              # Página de agendamento
├── trabalhe-conosco.html     # Página de carreira
├── CSS/
│   └── style.css             # Estilos globais
├── JS/
│   ├── main.js               # Interações gerais do site
│   ├── schedule.js           # Lógica de agendamento + WhatsApp
│   └── career-form.js        # Lógica da página de carreira
├── IMG/                      # Imagens e ícones
├── netlify.toml              # Configurações e headers de segurança
└── robots.txt                # Regras de indexação para buscadores
```

---

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Netlify (Hosting, HTTPS e Security Headers)
- WhatsApp Deep Link (agendamento)

---

## ✨ Funcionalidades

- Agendamento com redirecionamento automático para WhatsApp
- Horários dinâmicos por dia da semana:
  - Segunda a Sexta: 09:00 às 18:00
  - Sábado: 09:00 às 16:00
  - Domingo: Fechado
- Validação de campos obrigatórios
- Geração automática da mensagem de agendamento
- Cabeçalhos avançados de segurança (CSP, HSTS, Permissions-Policy, etc.)
- Site 100% estático (baixo risco de segurança)

---

## 🚀 Execução Local

1. Clone ou baixe este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. Abra o arquivo `index.html` em qualquer navegador moderno.

3. Para testar o agendamento, acesse `agendar.html` e finalize o fluxo até o redirecionamento para o WhatsApp.

Nenhuma configuração adicional é necessária.

🌐 Deploy na Netlify

- Projeto configurado para publicação na raiz (`publish = "."`)  
- HTTPS automático  
- Cabeçalhos de segurança definidos em `netlify.toml`  
- Deploy previews configurados para não serem indexados

🎨 Personalização

**Telefones dos profissionais:**  
Definidos em `agendar.html` via atributo `data-phone`

**Mensagem enviada ao WhatsApp:**  
Gerada em `JS/schedule.js`

**Estilos visuais:**  
Centralizados em `CSS/style.css`

🔐 Segurança

Este projeto aplica boas práticas de segurança para aplicações frontend:

- HTTPS forçado  
- Content Security Policy (CSP)  
- Proteção contra iframes  
- Bloqueio de mixed content  
- Nenhum dado sensível armazenado ou processado

📄 Licença
Este projeto está licenciado sob a MIT License, permitindo uso, modificação e distribuição, desde que mantidos os créditos ao autor.

Veja o arquivo LICENSE para mais detalhes.

©️ Direitos Autorais
© 2026 — Tosch
Todos os direitos reservados.

Este projeto foi desenvolvido para fins comerciais e institucionais.
O uso do código para fins educacionais ou como base de estudo é permitido conforme os termos da licença.