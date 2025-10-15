# 🚀 Despliegue en Vercel - Guía Rápida (2 minutos)

## ✨ Por qué Vercel es Perfecto para Este Proyecto

- ✅ **100% GRATIS** (Hobby Plan)
- ✅ **Hecho para Next.js** (creado por el mismo equipo)
- ✅ **Zero-config** (detecta todo automáticamente)
- ✅ **SSL automático**
- ✅ **CDN global**
- ✅ **Preview deployments** (cada branch tiene su URL)
- ✅ **Fillout lo acepta** (URL válida de producción)

---

## 📋 Pre-requisitos (Ya los tienes ✓)

- [x] Cuenta en GitHub
- [x] Neon PostgreSQL (base de datos)
- [x] Clerk (autenticación)
- [x] OpenAI API key
- [x] Fillout form

---

## 🚀 Despliegue en 3 Pasos

### PASO 1: Subir a GitHub (1 min)

```bash
cd "/Users/edwinmoreno/Documents/Surfing D/Código/surfing-digital2/surfing-digital"

# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Ready for Vercel deployment"

# Crear repo en GitHub y conectar
# Ve a github.com y crea un nuevo repositorio llamado "surfing-digital"
# Luego ejecuta (reemplaza TU-USUARIO):
git remote add origin https://github.com/TU-USUARIO/surfing-digital.git
git branch -M main
git push -u origin main
```

### PASO 2: Conectar con Vercel (30 segundos)

1. **Ve a [vercel.com](https://vercel.com)**
2. **Click en "Sign Up"** (o "Log In" si ya tienes cuenta)
3. **Autoriza con GitHub**
4. **Click en "Add New Project"**
5. **Selecciona el repo** `surfing-digital`
6. **Vercel detectará Next.js automáticamente** ✨

### PASO 3: Configurar Variables de Entorno (1 min)

En la pantalla de configuración de Vercel, agrega estas variables:

#### 🗄️ Database (Neon)
```
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
DATABASE_URL_UNPOOLED=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```
> Cópialas de [Neon Dashboard](https://console.neon.tech)

#### 🔐 Clerk (Authentication)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```
> Cópialas de [Clerk Dashboard](https://dashboard.clerk.com)

#### 🤖 OpenAI
```
OPENAI_API_KEY=sk-proj-...
```
> Cópiala de [OpenAI Platform](https://platform.openai.com/api-keys)

#### 📋 Fillout
```
FILLOUT_WEBHOOK_SECRET=super_secret_123
NEXT_PUBLIC_FILLOUT_FORM_URL=https://forms.fillout.com/t/41HWtPX4dCus
```

#### 🌐 App URL (la obtendrás después)
```
NEXT_PUBLIC_APP_URL=https://surfing-digital.vercel.app
```
> ⚠️ **Importante:** Actualiza esto después del primer despliegue con tu URL real

#### 🎯 CrewAI (opcional por ahora)
```
CREWAI_TUNNEL_URL=http://localhost:8000
```

**Luego click en "Deploy"** 🚀

---

## 🎉 ¡Listo! Tu App Está en Producción

Vercel te dará una URL como:
```
https://surfing-digital-tu-usuario.vercel.app
```

O más simple:
```
https://surfing-digital.vercel.app
```

---

## 🔄 Post-Despliegue: Actualizar Servicios

### 1. Actualizar Variable de Entorno en Vercel

1. **Ve a tu proyecto en Vercel Dashboard**
2. **Settings → Environment Variables**
3. **Edita `NEXT_PUBLIC_APP_URL`** con tu URL real:
   ```
   NEXT_PUBLIC_APP_URL=https://surfing-digital.vercel.app
   ```
4. **Redeploy:** Settings → Deployments → Latest → ⋮ → Redeploy

### 2. Actualizar Clerk

Ve a [Clerk Dashboard](https://dashboard.clerk.com) → Tu app:

**Configure → Paths:**
- Home URL: `https://surfing-digital.vercel.app`
- Sign in URL: `https://surfing-digital.vercel.app/login`
- After sign in: `https://surfing-digital.vercel.app/dashboard`

**Configure → Domains:**
- Agregar: `surfing-digital.vercel.app`

### 3. Actualizar Fillout ✨ (¡ESTO RESUELVE TU PROBLEMA!)

Ve a [Fillout](https://forms.fillout.com/t/41HWtPX4dCus) → Settings → Integrations → Webhooks:

**Nueva URL del Webhook:**
```
https://surfing-digital.vercel.app/api/fillout?secret=super_secret_123
```

✅ **Click en "Test"** - ¡Ahora SÍ debería funcionar! (Vercel es una URL válida de producción)

---

## 🧪 Probar que Todo Funciona

### Test 1: Health Check
```bash
curl https://surfing-digital.vercel.app/api/fillout
# Debe devolver: {"status":"ok","endpoint":"fillout-webhook"...}
```

### Test 2: Página Principal
Abre: `https://surfing-digital.vercel.app`
- ✅ Debe cargar la landing page
- ✅ Botón "Start Your Free Assessment" debe abrir Fillout

### Test 3: Formulario Completo
1. Completa el formulario de Fillout
2. En Vercel Dashboard → Deployments → Functions
3. Debes ver logs: `📝 Fillout webhook received`

### Test 4: Login
1. Ve a: `https://surfing-digital.vercel.app/login`
2. Inicia sesión con Clerk
3. Debe redirigir a: `https://surfing-digital.vercel.app/dashboard`

---

## 🎯 URLs Finales

- **Landing:** `https://surfing-digital.vercel.app`
- **Dashboard:** `https://surfing-digital.vercel.app/dashboard`
- **Privacy:** `https://surfing-digital.vercel.app/privacy`
- **Terms:** `https://surfing-digital.vercel.app/terms`
- **Webhook:** `https://surfing-digital.vercel.app/api/fillout?secret=super_secret_123`

---

## 🔄 Próximos Deployments

**Es SÚPER simple:**

```bash
# Hacer cambios en tu código
git add .
git commit -m "Update feature"
git push

# ¡Eso es todo! Vercel auto-despliega en ~1 minuto
```

Vercel automáticamente:
- ✅ Detecta el push
- ✅ Hace build
- ✅ Corre tests
- ✅ Despliega
- ✅ Te notifica (email/Slack)

---

## 🌐 Dominio Personalizado (Opcional)

Si tienes `surfing.digital`:

1. **En Vercel:**
   - Settings → Domains
   - Add: `www.surfing.digital` o `surfing.digital`

2. **En tu proveedor de dominio:**
   - Agregar CNAME: `www` → `cname.vercel-dns.com`
   - O A record para apex domain (Vercel te da las IPs)

3. **Actualizar variables:**
   ```
   NEXT_PUBLIC_APP_URL=https://www.surfing.digital
   ```

4. **Actualizar en Clerk y Fillout** con el nuevo dominio

---

## 💡 Tips Pro

### Ver Logs en Tiempo Real
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Ver logs
vercel logs surfing-digital --follow
```

### Preview Deployments
Cada branch/PR automáticamente obtiene su propia URL:
```
https://surfing-digital-git-feature-branch-usuario.vercel.app
```
Perfecto para testing antes de mergear a main!

### Analytics Gratis
Vercel te da analytics automáticamente:
- Web Vitals
- Real User Monitoring
- Performance insights

---

## 🆚 Vercel vs ngrok (que estabas usando)

| Feature | ngrok | Vercel |
|---------|-------|--------|
| **Costo** | Gratis pero limita | 100% Gratis |
| **Uptime** | Requiere tu laptop encendida | 99.99% uptime |
| **URL** | Cambia cada vez | Permanente |
| **SSL** | Sí | Sí (automático) |
| **Fillout acepta** | ❌ A veces rechaza | ✅ Siempre acepta |
| **Performance** | Depende de tu internet | CDN global |
| **Logs** | En tu terminal | Dashboard online |

---

## ❓ Troubleshooting

### "Build failed"
- Revisa los logs en Vercel Dashboard
- Verifica que todas las env vars estén configuradas
- Asegúrate de que `npm run build` funcione localmente

### "Webhook no funciona"
- Verifica la URL en Fillout: `https://TU-URL.vercel.app/api/fillout?secret=super_secret_123`
- Asegúrate de incluir `?secret=super_secret_123`
- Revisa Function Logs en Vercel

### "Clerk no funciona"
- Verifica que las URLs en Clerk coincidan con tu dominio de Vercel
- Asegúrate de haber agregado el dominio en Clerk → Domains

### "Database connection failed"
- Verifica `DATABASE_URL` y `DATABASE_URL_UNPOOLED`
- Asegúrate de incluir `?sslmode=require`
- Verifica que Neon permita conexiones externas (normalmente sí)

---

## 🎉 ¡Listo!

Tu app está en producción, 100% funcional, y **GRATIS**. 

### Ventajas vs Railway:
- ✅ $0/mes vs $5/mes
- ✅ 2 minutos vs 10 minutos de setup
- ✅ Better performance (CDN global)
- ✅ Mejor experiencia de desarrollo
- ✅ Preview deployments incluidos

---

## 📞 ¿Necesitas Ayuda?

- Vercel Docs: https://vercel.com/docs
- Vercel Discord: https://vercel.com/discord
- Vercel Support: support@vercel.com

¡Disfruta tu app en producción! 🚀✨

