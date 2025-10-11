# 🔗 Configuración de Fillout - Surfing Digital

## Tu Webhook URL

```
https://nervous-fish-13.loca.lt/api/fillout?secret=super_secret_123
```

## Tu Formulario Fillout

```
https://forms.fillout.com/t/41HWtPX4dCus
```

## 📋 Pasos para Configurar en Fillout

### 1. Inicia tu servidor local

```bash
# Terminal 1: Inicia tu app Next.js
npm run dev
```

### 2. Inicia localtunnel (si no está corriendo)

```bash
# Terminal 2: Expone tu puerto 3000
npx localtunnel --port 3000 --subdomain nervous-fish-13
```

**Nota:** Si el subdominio ya está tomado, usa uno nuevo:
```bash
npx localtunnel --port 3000
# Te dará una nueva URL como: https://random-name.loca.lt
```

### 3. Configura el Webhook en Fillout

1. Ve a tu formulario: [https://forms.fillout.com/t/41HWtPX4dCus](https://forms.fillout.com/t/41HWtPX4dCus)
2. Click en **Settings** → **Integrations**
3. Selecciona **Webhook**
4. Pega tu URL:
   ```
   https://nervous-fish-13.loca.lt/api/fillout?secret=super_secret_123
   ```
5. Selecciona: **"Send on form submission"**
6. Guarda

### 4. Estructura del Formulario Recomendada

Crea estas preguntas en tu formulario de Fillout:

#### Información de Contacto
1. **Email** (Email input, required)
   - Field name: `email`
   
2. **Nombre Completo** (Text input)
   - Field name: `name`

#### Información de la Empresa
3. **Nombre de la Empresa** (Text input)
   - Field name: `companyName`
   
4. **Industria** (Dropdown)
   - Field name: `industry`
   - Opciones: Technology, Healthcare, Finance, Retail, Manufacturing, Services, Other

5. **Tamaño de la Empresa** (Dropdown)
   - Field name: `companySize`
   - Opciones: 
     - 1-10 employees
     - 11-50 employees
     - 51-200 employees
     - 201-500 employees
     - 500+ employees

#### Evaluación de Negocio
6. **Desafíos Actuales** (Long text)
   - Field name: `currentChallenges`
   - Pregunta: "¿Cuáles son los principales desafíos que enfrenta tu negocio actualmente?"
   
7. **Objetivos de Negocio** (Long text)
   - Field name: `goals`
   - Pregunta: "¿Cuáles son tus objetivos de negocio para los próximos 12 meses?"

### 5. Prueba el Formulario

1. Completa el formulario en Fillout
2. Envía la respuesta
3. Verifica en tu consola (terminal con `npm run dev`):
   ```
   📝 Fillout webhook received: {...}
   ✅ Assessment created: clXXXXXXXX
   ```

4. Verifica en tu base de datos:
   ```bash
   npx prisma studio
   ```

## 🔒 Seguridad del Secret

### Variables de Entorno

Agrega a tu archivo `.env` (no .env.example):

```env
# Fillout Webhook Secret
FILLOUT_WEBHOOK_SECRET=super_secret_123
```

### Cambiar el Secret en Producción

Para producción, usa un secret más seguro:

```bash
# Genera un secret aleatorio
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Actualiza en:
1. Tu archivo `.env`
2. La URL del webhook en Fillout

## 🧪 Testing Local

### Test Manual

```bash
# Asegúrate que tu servidor esté corriendo
npm run dev

# En otra terminal, ejecuta:
./test-webhook.sh
```

### Test con curl

```bash
# Con localtunnel
curl -X POST "https://nervous-fish-13.loca.lt/api/fillout?secret=super_secret_123" \
  -H "Content-Type: application/json" \
  -d '{
    "submissionId": "test123",
    "formId": "test-form",
    "questions": [
      {
        "name": "email",
        "value": "test@example.com"
      },
      {
        "name": "companyName",
        "value": "Test Corp"
      }
    ]
  }'
```

## 📊 Monitoreo

### Ver logs en tiempo real

```bash
# Terminal con npm run dev mostrará:
📝 Fillout webhook received: {...}
✅ Assessment created: clXXXXXXXX
```

### Ver base de datos

```bash
npx prisma studio
# Abre en: http://localhost:5555
```

### Buscar usuario específico

```bash
# En Prisma Studio:
# 1. Click en "User"
# 2. Busca por email
# 3. Click para ver assessments relacionados
```

## 🚨 Troubleshooting

### Error: "Unauthorized"
- Verifica que el secret en la URL sea correcto
- Revisa que `FILLOUT_WEBHOOK_SECRET` en .env coincida

### Error: "Email is required"
- Verifica que el field name en Fillout sea exactamente `email`
- Revisa que el campo esté marcado como required

### No recibo webhooks
- Verifica que localtunnel esté corriendo
- Prueba la URL en el navegador: `https://wicked-colts-joke-joke.loca.lt`
- Verifica la configuración del webhook en Fillout

### Base de datos no se actualiza
- Verifica que `DATABASE_URL` y `DATABASE_URL_UNPOOLED` estén en .env
- Ejecuta: `npx prisma generate`
- Revisa los logs de error en la consola

## 🎯 Siguiente Paso: Procesar con AI

Una vez que recibes el webhook:

1. Los datos se guardan en la base de datos
2. Próximo: Procesar con OpenAI/Anthropic
3. Generar las 3 recomendaciones de AI
4. Calcular ROI estimado
5. Crear plan 30-60-90 días

Ver: **AI_PROCESSING.md** (próximamente)

## 📱 Alternativas a localtunnel

Si localtunnel da problemas, usa:

### ngrok (más estable)
```bash
ngrok http 3000
# URL: https://abc123.ngrok.io/api/fillout?secret=super_secret_123
```

### Cloudflare Tunnel (gratis, estable)
```bash
npm install -g cloudflared
cloudflared tunnel --url http://localhost:3000
```

---

¡Webhook configurado y listo! 🎉🔗

