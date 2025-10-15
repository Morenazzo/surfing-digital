# 🚀 Despliegue en Vercel - Guía Completa

## 📖 Tabla de Contenidos

- [Por Qué Vercel](#por-qué-vercel)
- [Pre-requisitos](#pre-requisitos)
- [Despliegue Paso a Paso](#despliegue-paso-a-paso)
- [Configuración Post-Despliegue](#configuración-post-despliegue)
- [Testing](#testing)
- [Dominio Personalizado](#dominio-personalizado)
- [Vercel CLI](#vercel-cli)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## 🎯 Por Qué Vercel

Vercel es la plataforma ideal para este proyecto porque:

### Ventajas Técnicas
- **Next.js Nativo:** Vercel creó Next.js, optimización perfecta
- **Edge Runtime:** Tu app corre en +70 ubicaciones globalmente
- **ISR (Incremental Static Regeneration):** Páginas estáticas con datos dinámicos
- **API Routes Optimizadas:** Serverless functions ultra-rápidas
- **Image Optimization:** Automatic image optimization con Next/Image
- **Zero Config:** Detecta y configura todo automáticamente

### Ventajas de Desarrollo
- **Preview Deployments:** Cada PR obtiene su propia URL de preview
- **Instant Rollbacks:** Volver a versión anterior en 1 click
- **Git Integration:** Auto-deploy en cada push a main
- **Real-time Logs:** Ver logs de funciones en tiempo real
- **Web Analytics:** Métricas de performance incluidas

### Ventajas Económicas
- **100% GRATIS para proyectos Hobby:**
  - Deployments ilimitados
  - 100GB bandwidth/mes
  - Serverless functions
  - Edge Functions
  - 1000 Edge Middleware requests/día
  - Analytics básicos

### Comparación

| Feature | Vercel | Railway | ngrok |
|---------|--------|---------|-------|
| **Costo** | $0/mes | $5/mes | $0 pero limitado |
| **Next.js** | Nativo | Generic | N/A |
| **CDN** | Global | No | No |
| **SSL** | Auto | Auto | Sí |
| **Preview URLs** | Sí | No | No |
| **Uptime** | 99.99% | 99.9% | Depende de ti |
| **Build Time** | ~1 min | ~2-3 min | N/A |
| **Setup Time** | 2 min | 10 min | 1 min |

---

## ✅ Pre-requisitos

Antes de comenzar, asegúrate de tener:

### Cuentas Necesarias
- [ ] **GitHub:** Para hospedar el código
- [ ] **Vercel:** [vercel.com/signup](https://vercel.com/signup)
- [ ] **Neon:** Base de datos PostgreSQL
- [ ] **Clerk:** Autenticación
- [ ] **OpenAI:** API para AI
- [ ] **Fillout:** Formularios

### Información a Mano
- [ ] `DATABASE_URL` de Neon
- [ ] `DATABASE_URL_UNPOOLED` de Neon
- [ ] Clerk API keys (publishable + secret)
- [ ] OpenAI API key
- [ ] Fillout webhook secret

---

## 🚀 Despliegue Paso a Paso

### Paso 1: Preparar el Repositorio

#### 1.1 Verificar que el build funcione localmente

```bash
cd "/Users/edwinmoreno/Documents/Surfing D/Código/surfing-digital2/surfing-digital"

# Limpiar build anterior
rm -rf .next

# Hacer build
npm run build

# Si el build falla, arregla los errores antes de continuar
```

#### 1.2 Verificar .gitignore

Tu `.gitignore` ya debe incluir:
```
.env
.env.local
.env*.local
.next
node_modules
```

#### 1.3 Crear/actualizar .env.example

Crea un archivo `.env.example` (sin valores sensibles):

```bash
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://..."
DATABASE_URL_UNPOOLED="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/login"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/login"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"

# OpenAI
OPENAI_API_KEY="sk-proj-..."

# Fillout
FILLOUT_WEBHOOK_SECRET="super_secret_123"
NEXT_PUBLIC_FILLOUT_FORM_URL="https://forms.fillout.com/t/..."

# CrewAI
CREWAI_TUNNEL_URL="http://localhost:8000"

# App URL (actualizar después del despliegue)
NEXT_PUBLIC_APP_URL="https://your-app.vercel.app"
```

### Paso 2: Subir a GitHub

#### 2.1 Inicializar Git (si no está inicializado)

```bash
git init
```

#### 2.2 Crear repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Nombre: `surfing-digital`
3. Descripción: `AI Readiness Assessment Platform`
4. **No** inicialices con README (ya tienes código)
5. Click "Create repository"

#### 2.3 Conectar y subir

```bash
# Agregar todos los archivos
git add .

# Commit
git commit -m "Initial commit: Surfing Digital ready for Vercel"

# Conectar con GitHub (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/surfing-digital.git

# Subir
git branch -M main
git push -u origin main
```

### Paso 3: Conectar con Vercel

#### 3.1 Crear cuenta / Login

1. Ve a [vercel.com](https://vercel.com)
2. Click "Sign Up" (o "Log In")
3. Selecciona "Continue with GitHub"
4. Autoriza Vercel para acceder a tus repos

#### 3.2 Importar Proyecto

1. En Vercel Dashboard, click **"Add New..." → "Project"**
2. **Import Git Repository:**
   - Busca `surfing-digital`
   - Click **"Import"**

#### 3.3 Configurar Proyecto

Vercel detectará automáticamente:
- ✅ Framework: Next.js
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`
- ✅ Development Command: `npm run dev`

**No necesitas cambiar nada de esto.**

#### 3.4 Configurar Environment Variables

En la sección **"Environment Variables"**, agrega las siguientes:

##### Database
```
DATABASE_URL
postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require

DATABASE_URL_UNPOOLED
postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

##### Clerk
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
pk_live_...

CLERK_SECRET_KEY
sk_live_...

NEXT_PUBLIC_CLERK_SIGN_IN_URL
/login

NEXT_PUBLIC_CLERK_SIGN_UP_URL
/login

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
/dashboard

NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
/dashboard
```

##### OpenAI
```
OPENAI_API_KEY
sk-proj-...
```

##### Fillout
```
FILLOUT_WEBHOOK_SECRET
super_secret_123

NEXT_PUBLIC_FILLOUT_FORM_URL
https://forms.fillout.com/t/41HWtPX4dCus
```

##### CrewAI (opcional)
```
CREWAI_TUNNEL_URL
http://localhost:8000
```

##### App URL (temporal, actualizarás después)
```
NEXT_PUBLIC_APP_URL
https://surfing-digital.vercel.app
```

**Tip:** Puedes pegar todas las variables de una vez usando el formato `KEY=value` separadas por líneas.

#### 3.5 Deploy

1. Click **"Deploy"** 🚀
2. Vercel comenzará a:
   - Instalar dependencias
   - Hacer build
   - Desplegar

Esto toma ~2-3 minutos.

---

## 🎉 Tu App Está en Producción!

Una vez que termine el despliegue, obtendrás una URL como:

```
https://surfing-digital-abc123.vercel.app
```

O si el nombre está disponible:
```
https://surfing-digital.vercel.app
```

---

## 🔄 Configuración Post-Despliegue

### 1. Actualizar NEXT_PUBLIC_APP_URL

#### En Vercel:
1. Ve a tu proyecto → **Settings**
2. **Environment Variables**
3. Encuentra `NEXT_PUBLIC_APP_URL`
4. Click **"Edit"**
5. Actualiza con tu URL real: `https://surfing-digital.vercel.app`
6. **Save**

#### Re-desplegar:
1. Ve a **Deployments**
2. Click en el deployment más reciente
3. Click **"⋮" (tres puntos)** → **"Redeploy"**
4. Confirm

### 2. Actualizar Clerk

Ve a [Clerk Dashboard](https://dashboard.clerk.com):

#### Configure → Paths
```
Home URL: https://surfing-digital.vercel.app
Sign in URL: https://surfing-digital.vercel.app/login
Sign up URL: https://surfing-digital.vercel.app/login
After sign in: https://surfing-digital.vercel.app/dashboard
After sign up: https://surfing-digital.vercel.app/dashboard
```

#### Configure → Domains
Click **"Add domain":**
```
surfing-digital.vercel.app
```

### 3. Actualizar Fillout

Ve a [Fillout](https://forms.fillout.com):

1. Abre tu formulario
2. **Settings → Integrations → Webhooks**
3. Actualiza la URL:
   ```
   https://surfing-digital.vercel.app/api/fillout?secret=super_secret_123
   ```
4. Click **"Test"** - Debería funcionar ✅
5. **Save**

---

## 🧪 Testing

### Test 1: Health Check del API

```bash
curl https://surfing-digital.vercel.app/api/fillout

# Respuesta esperada:
# {"status":"ok","endpoint":"fillout-webhook","message":"Webhook is ready to receive POST requests"}
```

### Test 2: Landing Page

Abre en navegador:
```
https://surfing-digital.vercel.app
```

Verifica:
- ✅ Página carga correctamente
- ✅ Botón "Start Your Free Assessment" funciona
- ✅ Se abre Fillout en nueva pestaña

### Test 3: Formulario Completo (End-to-End)

1. **Completa el formulario de Fillout**
2. **Ve a Vercel Dashboard → Functions**
3. Deberías ver logs como:
   ```
   📝 Fillout webhook received: {...}
   ✅ Assessment created: clXXXXXXXX
   ```

### Test 4: Authentication

1. Ve a: `https://surfing-digital.vercel.app/login`
2. Inicia sesión con Clerk
3. Debería redirigir a dashboard
4. Verifica que puedas ver tus assessments

### Test 5: Privacy & Terms

Verifica que estas páginas carguen:
- `https://surfing-digital.vercel.app/privacy`
- `https://surfing-digital.vercel.app/terms`

---

## 🌐 Dominio Personalizado (Opcional)

Si tienes tu propio dominio (`surfing.digital`):

### En Vercel

1. **Settings → Domains**
2. Click **"Add"**
3. Ingresa: `www.surfing.digital` o `surfing.digital`
4. Vercel te dará instrucciones de DNS

### En tu Proveedor de Dominio (ej. GoDaddy, Namecheap)

#### Para `www.surfing.digital`:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto
```

#### Para `surfing.digital` (apex):
Vercel te dará las IPs:
```
Type: A
Name: @
Value: 76.76.21.21
```

### Actualizar Variables de Entorno

Una vez que el dominio esté activo:

1. Vercel → Settings → Environment Variables
2. Edita `NEXT_PUBLIC_APP_URL`:
   ```
   NEXT_PUBLIC_APP_URL=https://www.surfing.digital
   ```
3. Redeploy

### Actualizar Clerk y Fillout

Actualiza las URLs en Clerk y Fillout con tu nuevo dominio.

---

## 🛠️ Vercel CLI

Instala el CLI para mayor control:

```bash
npm i -g vercel
```

### Comandos Útiles

```bash
# Login
vercel login

# Ver deployments
vercel ls

# Ver logs en tiempo real
vercel logs surfing-digital --follow

# Deploy desde local (no recomendado, usa Git)
vercel

# Deploy a producción
vercel --prod

# Ver variables de entorno
vercel env ls

# Agregar variable de entorno
vercel env add

# Link proyecto local con Vercel
vercel link
```

---

## 🐛 Troubleshooting

### Build Failed

**Problema:** El build falla en Vercel

**Solución:**
1. Revisa los logs en Vercel Dashboard
2. Verifica que `npm run build` funcione localmente
3. Asegúrate de que todas las dependencias estén en `package.json`
4. Verifica que todas las env vars estén configuradas

### Webhook No Funciona

**Problema:** Fillout no envía datos

**Solución:**
1. Verifica la URL en Fillout: `https://TU-URL.vercel.app/api/fillout?secret=super_secret_123`
2. Asegúrate de incluir `?secret=super_secret_123`
3. Ve a Vercel → Functions → Logs para ver si llega el request
4. Verifica que `FILLOUT_WEBHOOK_SECRET` esté configurado

### Clerk Authentication No Funciona

**Problema:** Login redirect no funciona

**Solución:**
1. Verifica que las URLs en Clerk coincidan exactamente con tu dominio de Vercel
2. Asegúrate de haber agregado el dominio en Clerk → Domains
3. Verifica que las env vars de Clerk estén correctas

### Database Connection Failed

**Problema:** No puede conectar a Neon

**Solución:**
1. Verifica `DATABASE_URL` en Vercel Environment Variables
2. Asegúrate de incluir `?sslmode=require` al final de la URL
3. Verifica que `DATABASE_URL_UNPOOLED` también esté configurado
4. Prueba la conexión desde Prisma Studio localmente

### Images Not Loading

**Problema:** Imágenes no cargan correctamente

**Solución:**
1. Asegúrate de usar `next/image` en lugar de `<img>`
2. Configura `images.domains` en `next.config.ts` si usas imágenes externas
3. Verifica que las imágenes estén en la carpeta `public/`

### Environment Variables Not Working

**Problema:** Variables de entorno no se aplican

**Solución:**
1. Verifica que las variables públicas empiecen con `NEXT_PUBLIC_`
2. Después de agregar/editar env vars, siempre **Redeploy**
3. Variables privadas solo están disponibles en API Routes y Server Components
4. No intentes acceder a variables privadas desde Client Components

---

## 📊 Monitoring y Analytics

### Ver Métricas

Vercel Dashboard → Tu proyecto → **Analytics**

Verás:
- **Web Vitals:** LCP, FID, CLS
- **Real User Monitoring:** Performance real de usuarios
- **Top Pages:** Páginas más visitadas
- **Top Referrers:** De dónde vienen tus usuarios
- **Devices:** Desktop vs Mobile
- **Countries:** Ubicación de usuarios

### Function Logs

Para ver logs de tus API routes:

Vercel Dashboard → **Functions** → Click en una función → **View Logs**

### Alerts

Configura alertas para:
- Build failures
- Function errors
- Performance degradation

Settings → **Notifications**

---

## 🚀 Best Practices

### 1. Usa Preview Deployments

Cada branch/PR obtiene su propia URL de preview:
```
https://surfing-digital-git-feature-branch.vercel.app
```

Esto te permite:
- Probar features antes de mergear
- Compartir con clientes para feedback
- QA en ambiente aislado

### 2. Environment Variables por Entorno

Puedes configurar diferentes valores para:
- **Production:** Main branch
- **Preview:** Todas las otras branches
- **Development:** Local

### 3. Mantén las Env Vars Seguras

- ✅ Nunca comitees `.env` a Git
- ✅ Usa `.env.example` para documentar
- ✅ Rota secrets periódicamente
- ✅ Usa diferentes secrets para dev/prod

### 4. Optimiza Images

```tsx
import Image from 'next/image'

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={50}
  priority // Para above-the-fold
/>
```

### 5. Usa Incremental Static Regeneration (ISR)

Para páginas que cambian poco:

```tsx
export async function generateStaticParams() {
  // Generate static paths
}

export const revalidate = 3600 // Revalidate every hour
```

### 6. Monitor Performance

Usa Web Vitals:
```tsx
// app/layout.tsx
export function reportWebVitals(metric) {
  console.log(metric)
}
```

---

## 💰 Costos y Límites

### Hobby Plan (Gratuito)

**Incluye:**
- ✅ Deployments ilimitados
- ✅ 100GB bandwidth/mes
- ✅ 100GB-hours de function execution
- ✅ 1000 edge requests/día
- ✅ SSL automático
- ✅ Analytics básicos
- ✅ Preview deployments
- ✅ Git integration

**Límites:**
- 1 usuario
- 100GB bandwidth (suficiente para ~1M page views)
- Web analytics (no Real User Monitoring)

### Pro Plan ($20/mes)

Si necesitas más:
- Team collaboration
- 1TB bandwidth
- Advanced analytics
- Password protection
- Custom domains ilimitados

Para tu MVP, **Hobby Plan es más que suficiente**.

---

## 🎓 Recursos Adicionales

### Documentación
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

### Soporte
- [Vercel Discord](https://vercel.com/discord)
- [GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/vercel)

### Tutoriales
- [Vercel YouTube](https://www.youtube.com/c/VercelHQ)
- [Next.js Learn](https://nextjs.org/learn)

---

## ✅ Checklist Final

Post-Despliegue:
- [ ] App desplegada y accesible
- [ ] `NEXT_PUBLIC_APP_URL` actualizado
- [ ] Clerk configurado con URLs de producción
- [ ] Fillout webhook actualizado y funcionando
- [ ] Health check del API funciona
- [ ] Formulario envía datos correctamente
- [ ] Authentication funciona
- [ ] Privacy y Terms accesibles
- [ ] DNS configurado (si usas dominio custom)
- [ ] Monitoring configurado

---

¡Tu app está lista para conquistar el mundo! 🚀✨

**Surfing Digital - Ride the AI Wave, from Idea to ROI.**

