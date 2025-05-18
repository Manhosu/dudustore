# DUDU STORE - Loja para Vendas por WhatsApp

Este é um projeto de loja virtual elegante e moderna para a DUDU STORE, permitindo que os clientes naveguem pelos produtos e enviem seus pedidos diretamente pelo WhatsApp.

## Tecnologias Utilizadas

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (para animações)
- Zustand (gerenciamento de estado)
- React Hot Toast (notificações)

## Requisitos de Imagens

Para que o site seja exibido corretamente, você precisará adicionar as seguintes imagens:

### Logo e Favicon

- Crie um favicon e adicione em `/public/favicon.ico`

### Banners e Imagens de Fundo

- Imagem de fundo para o hero: `/public/images/hero-bg.jpg` (recomendado: 1920x1080px)

### Imagens de Categorias

- Camisetas: `/public/images/category-tshirts.jpg` (recomendado: 600x750px)
- Calças: `/public/images/category-pants.jpg` (recomendado: 600x750px)
- Tênis: `/public/images/category-shoes.jpg` (recomendado: 600x750px)
- Acessórios: `/public/images/category-accessories.jpg` (recomendado: 600x750px)

### Imagens de Produtos

- Produto 1: `/public/images/product-1.jpg` (recomendado: 800x800px)
- Produto 1 (alternativa 1): `/public/images/product-1-alt-1.jpg` (recomendado: 800x800px)
- Produto 1 (alternativa 2): `/public/images/product-1-alt-2.jpg` (recomendado: 800x800px)
- Produto 2: `/public/images/product-2.jpg` (recomendado: 800x800px)
- Produto 3: `/public/images/product-3.jpg` (recomendado: 800x800px)
- Produto 4: `/public/images/product-4.jpg` (recomendado: 800x800px)

## Configurações Personalizadas

### WhatsApp

Para configurar o número de WhatsApp para recebimento de pedidos:

1. Edite o arquivo `src/app/pages/carrinho/page.tsx` e altere o número na variável `whatsappUrl`:
```typescript
const whatsappUrl = `https://wa.me/SEU_NUMERO_AQUI?text=${generateWhatsAppMessage()}`;
```

2. Faça o mesmo no banner promocional em `src/app/page.tsx`:
```typescript
href="https://wa.me/SEU_NUMERO_AQUI?text=Olá!%20Quero%20receber%20ofertas%20da%20DUDU%20STORE."
```

### Cores e Estilos

As cores principais do site podem ser ajustadas no arquivo `tailwind.config.ts`.

## Executando o Projeto

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Iniciar o servidor de produção
npm start
```

## Funcionalidades Implementadas

- ✅ Design responsivo para mobile, tablet e desktop
- ✅ Animações suaves e transições elegantes
- ✅ Efeito de zoom ao passar o mouse sobre as imagens dos produtos
- ✅ Carrinho de compras funcional com persistência local
- ✅ Envio de pedidos pelo WhatsApp
- ✅ Notificações de ações do usuário

## Próximos Passos

- Implementar autenticação de usuários
- Adicionar página de pesquisa de produtos
- Implementar filtros de produtos por categoria
