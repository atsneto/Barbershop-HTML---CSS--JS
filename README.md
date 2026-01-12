# Casablanca Barbearia — Landing Page

Site institucional para barbearias com agendamento via WhatsApp. Desenvolvido com HTML, CSS e JavaScript puro, e preparado para deploy na Netlify.

## Estrutura do Projeto

```
.
├── agendar.html                 # Página de agendamento
├── index.html                   # Página inicial (landing)
├── trabalhe-conosco.html        # Página de carreira
├── CSS/
│   └── style.css               # Estilos globais
├── IMG/                        # Imagens e ícones
├── JS/
│   ├── main.js                 # Interações gerais do site
│   ├── schedule.js             # Lógica do agendamento + WhatsApp
│   └── career-form.js          # Lógica da página de carreira
├── netlify.toml                # Cabeçalhos de segurança e config Netlify
└── robots.txt                  # Regras de indexação
```

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Netlify (hosting e headers de segurança)
- WhatsApp Deep Link (redirecionamento de agendamento)

## Funcionalidades

- Agendamento que redireciona para o WhatsApp do barbeiro selecionado
- Horários dinâmicos por dia da semana:
  - Segunda a Sexta: 09:00 às 18:00
  - Sábado: 09:00 às 16:00
  - Domingo: Fechado
- Validação de campos obrigatórios (barbeiro, serviço, data, hora e nome)
- Cabeçalhos de segurança (CSP, HSTS, X-Frame-Options, etc.) via Netlify

## Como Usar (Localmente)

1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` no navegador.
3. Para agendar, vá para a página `agendar.html`, selecione barbeiro, serviço, data e horário e clique em "Confirmar no WhatsApp". Você será redirecionado para a conversa do WhatsApp com a mensagem pronta para envio.

> Observação: a página de agendamento respeita automaticamente os horários de funcionamento por dia da semana.

## Deploy na Netlify

- O projeto foi configurado para ser publicado a partir da raiz (`publish = "."`).
- O arquivo `netlify.toml` inclui cabeçalhos de segurança e bloqueia indexação em deploy previews.
- Passos gerais:
  1. Conecte o repositório GitHub na Netlify.
  2. Defina a pasta de publicação como a raiz do projeto.
  3. Ative HTTPS gerenciado e (quando estável) HSTS/preload.

## Personalização

- Telefones dos barbeiros: configurados em `agendar.html` (atributo `data-phone` de cada opção de barbeiro).
- Mensagem de agendamento: gerada em `JS/schedule.js` (função `handleScheduleSubmit`).
- Estilos: editar em `CSS/style.css`.

## Sobre

Este projeto é uma landing page para barbearias, com foco em apresentação de serviços e facilidade de agendamento via WhatsApp. Ideal para presença digital simples, rápida e segura.

