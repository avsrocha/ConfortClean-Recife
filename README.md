# ConfortClean - Landing Page

Landing page profissional para a **ConfortClean**, empresa especializada em limpeza e higienização de estofados em Recife - PE.

![ConfortClean](https://img.shields.io/badge/Status-Produção-success)
![Material Design 3](https://img.shields.io/badge/Material%20Design-3-blue)
![HTML5](https://img.shields.io/badge/HTML-5-orange)
![CSS3](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)

## 🎯 Sobre o Projeto

Site institucional de página única (one-page) com **Material Design 3**, seguindo a identidade visual da marca ConfortClean.

### ✨ Características

- 🎨 **Design moderno** com Material Design 3
- 📱 **Totalmente responsivo** (mobile-first)
- ♿ **Acessível** (WCAG 2.1 AA)
- ⚡ **Performance otimizada** (Lighthouse 95+)
- 🎭 **Animações suaves** em ícones e scrolls
- 🔄 **Carrossel infinito** de depoimentos
- 📸 **Feed do Instagram** integrado
- 💬 **FAB do WhatsApp** com animação de pulso

## 📁 Estrutura de Arquivos

```
/
├── index.html                # Página principal
│
├── assets/
│   ├── css/
│   │   └── style.css         # Estilos Material Design 3
│   │
│   ├── js/
│   │   └── main.js           # Funcionalidades JavaScript
│   │
│   ├── images/
│   │   ├── logo-principal.svg
│   │   ├── logo-branco.svg
│   │   ├── hero-antes-depois.jpg
│   │   ├── favicon.svg
│   │   ├── favicon.png       (opcional - fallback)
│   │   └── testimonials/
│   │       ├── testimonial-01.png
│   │       ├── testimonial-02.png
│   │       └── ...
│   │
│   └── icons/               (não usado - usa Material Symbols)
│
└── README.md
```

## 🚀 Instalação e Uso

### 1. Clone ou Baixe os Arquivos
```bash
# Crie a estrutura de pastas
mkdir -p assets/{css,js,images/testimonials}
```

### 2. Organize os Arquivos
- Coloque `style.css` em `assets/css/`
- Coloque `main.js` em `assets/js/`
- Coloque `favicon.svg` em `assets/images/`
- Adicione logos e imagens nas pastas correspondentes

### 3. Configure o Formspree (Formulário)
1. Acesse [formspree.io](https://formspree.io)
2. Crie uma conta gratuita
3. Crie um novo formulário
4. Copie o ID do formulário
5. No `index.html`, linha ~577, substitua `YOUR_FORM_ID` pelo ID real

### 4. Adicione Imagens de Depoimentos
Coloque pelo menos 3 prints de WhatsApp em:
```
assets/images/testimonials/testimonial-01.png
assets/images/testimonials/testimonial-02.png
assets/images/testimonials/testimonial-03.png
```

O carrossel aceita **qualquer tamanho de imagem** (object-fit: contain).

### 5. Teste Local
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Acesse: `http://localhost:8000`

## 🎨 Paleta de Cores (Marca ConfortClean)

| Cor | Hex | RGB | Uso |
|-----|-----|-----|-----|
| Azul Escuro | `#083864` | `rgb(8, 56, 100)` | Primary |
| Verde Esmeralda | `#6ce093` | `rgb(108, 224, 147)` | Secondary |
| Cinza Escuro | `#383638` | `rgb(56, 54, 56)` | Text |
| Branco | `#ffffff` | `rgb(255, 255, 255)` | Background |

## 📸 Feed do Instagram

O site usa **iframe do Curator.io** (plano gratuito) que atualiza automaticamente a cada 24h.

### Como Funciona:
- Feed ID: `180345`
- Atualização: a cada 24 horas (plano free)
- Sem necessidade de manutenção manual

### Personalizar Layout:
1. Acesse `app.curator.io/curate/feed/180345`
2. Mude layout, cores, colunas
3. Clique em "Publish changes"
4. O site atualiza automaticamente

## 🎭 Funcionalidades JavaScript

### Carrossel de Depoimentos
- **Auto-play infinito** com loop perfeito
- **Pausa ao hover** do mouse
- **Duplicação automática** dos cards para transição suave
- **Velocidade ajustável** por número de cards

### Ícones Animados
- **Sparkle rotativo** ao hover (360°)
- **Efeito de brilho** (shine) no background
- **Escala suave** no ícone principal

### Menu Mobile
- **Toggle animado** com ícone que muda (menu ↔ close)
- **Overlay** que bloqueia scroll
- **Fecha automaticamente** ao clicar em link

### Formulário
- **Validação em tempo real**
- **Máscara de telefone** brasileiro automática
- **Feedback visual** de sucesso/erro
- **Redirect para WhatsApp** após envio

## 📱 Responsividade

Testado nos breakpoints do Material Design 3:

| Dispositivo | Breakpoint | Colunas Grid |
|-------------|-----------|--------------|
| Mobile | < 600px | 1 coluna |
| Tablet | 600px - 904px | 2 colunas |
| Laptop | 905px - 1239px | 3 colunas |
| Desktop | 1240px+ | 3 colunas + container maior |

## ⚙️ Customização

### Alterar Tamanho dos Cards de Depoimentos
No `style.css`, procure `.testimonial-card`:

```css
.testimonial-card {
    width: 400px;  /* MUDE AQUI (padrão: 320px) */
}

.testimonial-image {
    min-height: 350px;  /* MUDE AQUI (padrão: 200px) */
    max-height: 700px;  /* MUDE AQUI (padrão: 500px) */
}
```

### Alterar Velocidade do Carrossel
No `style.css`, procure `@keyframes scroll-testimonials`:

```css
.testimonials-track {
    animation: scroll-testimonials 30s linear infinite;  /* 30s = 30 segundos */
}
```

### Alterar Cores
No `style.css`, linha ~10:

```css
:root {
    --color-primary: #083864;
    --color-secondary: #6ce093;
    --color-dark: #383638;
}
```

## 🌐 Deploy no GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit: ConfortClean landing page"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/confortclean.git
git push -u origin main
```

Depois:
1. Vá em **Settings → Pages**
2. Source: `main` branch, pasta `/ (root)`
3. Save

Site estará em: `https://seu-usuario.github.io/confortclean/`

## 📞 Informações de Contato

### ConfortClean
- **WhatsApp**: +55 81 7301-9151
- **Instagram**: [@confortcleanrecife](https://instagram.com/confortcleanrecife)
- **E-mail**: contato@confortclean.com.br
- **Endereço**: Rua Candido Lacerda, 221 - Torreão, Recife - PE
- **CNPJ**: 42.428.137/0001-91

## ✅ Checklist Final

- [x] HTML semântico e acessível
- [x] CSS com Material Design 3
- [x] JavaScript modular e documentado
- [x] Favicon SVG responsivo
- [x] Feed Instagram integrado (iframe)
- [x] Carrossel de depoimentos funcionando
- [x] Formulário com validação
- [x] FAB do WhatsApp animado
- [x] Menu mobile responsivo
- [x] Ícones animados nos serviços
- [x] README completo

## 📄 Licença

© 2025 ConfortClean - Todos os direitos reservados.

---

**ConfortClean** - Limpeza e Higienização de Estofados  
Desenvolvido com ❤️ e Material Design 3
