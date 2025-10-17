export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Privacy Policy / Aviso de Privacidad
          </h1>
          <p className="text-slate-600">
            <strong>Effective Date / Fecha de entrada en vigor:</strong> October 14, 2025
          </p>
          <p className="text-slate-600">
            <strong>Last Updated / Última actualización:</strong> October 14, 2025
          </p>
        </div>

        {/* Company Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Company (Data Controller) / Empresa (Responsable del Tratamiento de Datos)
          </h2>
          <div className="space-y-2 text-slate-700">
            <p><strong>Surfing Digital SAPI de CV</strong></p>
            <p>📧 <a href="mailto:edwinm@surfing.digital" className="text-blue-600 hover:underline">edwinm@surfing.digital</a></p>
            <p>🌐 <a href="https://www.surfing.digital" className="text-blue-600 hover:underline">www.surfing.digital</a></p>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>EN:</strong> This Privacy Policy describes how Surfing Digital SAPI de CV ("Surfing Digital", "we", "our") collects, uses, and protects your information when you use our services. We are committed to protecting your privacy in compliance with Mexico's Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP) and applicable U.S. privacy frameworks.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>ES:</strong> El presente Aviso de Privacidad describe cómo Surfing Digital SAPI de CV ("Surfing Digital", "nosotros"), en nuestro carácter de Responsable del Tratamiento, recopilamos, usamos y protegemos su información cuando utiliza nuestros servicios. Estamos comprometidos con la protección de su privacidad en cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México y los marcos de privacidad aplicables en EUA.
            </p>
          </div>
        </section>

        {/* Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Purpose of Data Processing / Finalidad del Tratamiento de Datos
            </h2>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>EN:</strong> Surfing Digital collects and processes information to evaluate business AI readiness, recommend profitable AI projects, and provide educational or strategic content related to digital transformation.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>ES:</strong> Surfing Digital recopila y procesa información con el fin de evaluar el nivel de preparación en inteligencia artificial (IA) de las empresas, recomendar proyectos rentables de IA y ofrecer contenido educativo o estratégico sobre transformación digital.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Data We Collect / Datos que Recopilamos
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>EN:</strong> We may collect the following types of information ("Personal Data"):
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li><strong>Business Information:</strong> Company name, website, industry, size, location, and business contact data (email, phone number, job title).</li>
                  <li><strong>Assessment Responses:</strong> Answers provided in our AI Readiness or ROI questionnaires.</li>
                  <li><strong>Usage Data:</strong> Information collected automatically when you use our platform, such as IP address, browser type, session data, and user preferences.</li>
                  <li><strong>Optional Data:</strong> Files, documents, or notes voluntarily shared during consulting sessions or follow-up communications.</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  We do not knowingly collect sensitive personal data (e.g., national ID numbers, personal financial statements, or medical records).
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>ES:</strong> Podemos recopilar la siguiente información ("Datos Personales"):
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li><strong>Datos Empresariales:</strong> Nombre de la empresa, sitio web, industria, tamaño, ubicación y datos de contacto de negocio (correo electrónico, teléfono, cargo).</li>
                  <li><strong>Respuestas de Evaluaciones:</strong> Respuestas proporcionadas en nuestros cuestionarios de preparación de IA o formularios de ROI.</li>
                  <li><strong>Datos de Uso:</strong> Información recopilada automáticamente al usar nuestra plataforma, como dirección IP, tipo de navegador, datos de sesión y preferencias de usuario.</li>
                  <li><strong>Datos Opcionales:</strong> Archivos, documentos o notas compartidas voluntariamente durante sesiones de consultoría o comunicaciones de seguimiento.</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  No recopilamos intencionadamente datos personales sensibles (ej. número de identificación oficial, estados financieros personales o historiales médicos).
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Legal Basis for Processing / Fundamento Legal
            </h2>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>EN:</strong> Processing is based on your explicit consent when you provide the data, our legitimate interest to operate and improve our services, and to comply with our legal obligations.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>ES:</strong> El tratamiento de datos se realiza con base en su consentimiento explícito al proporcionarnos la información, nuestro interés legítimo para operar y mejorar nuestros servicios, y para el cumplimiento de obligaciones legales aplicables.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. How We Use Your Information / Uso de la Información
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>EN:</strong> Your data is used to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>Generate personalized AI readiness and ROI reports.</li>
                  <li>Deliver tailored AI project recommendations.</li>
                  <li>Improve our algorithms, platform usability, and service offerings.</li>
                  <li>Schedule and provide access to follow-up sessions or consulting.</li>
                  <li>Send relevant updates, strategic insights, or invitations related to Surfing Digital's services.</li>
                </ul>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>ES:</strong> Su información se utiliza para:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>Generar reportes personalizados de preparación en IA y estimaciones de ROI.</li>
                  <li>Entregar recomendaciones a medida de proyectos de IA.</li>
                  <li>Mejorar nuestros algoritmos, la usabilidad de la plataforma y la oferta de servicios.</li>
                  <li>Agendar y brindar acceso a sesiones de seguimiento o consultoría.</li>
                  <li>Enviar actualizaciones relevantes, artículos estratégicos o invitaciones relacionadas con los servicios de Surfing Digital.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Use of AI and Third-Party Services / Uso de IA y Servicios de Terceros
            </h2>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>EN:</strong> Surfing Digital uses trusted AI technologies such as OpenAI (ChatGPT) and Google Gemini for analysis and insight generation. Data may be temporarily processed by these tools in an encrypted, secure manner. These providers are contractually obligated not to store your data or use it to train their external AI models. All data is stored in a PostgreSQL database on Neon Cloud, protected by encryption and restricted access controls.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>ES:</strong> Surfing Digital utiliza tecnologías de IA de confianza como OpenAI (ChatGPT) y Google Gemini para el análisis y la generación de recomendaciones. Los datos pueden ser procesados temporalmente por estas herramientas de forma cifrada y segura. Dichos proveedores están obligados contractualmente a no almacenar su información ni utilizarla para entrenar sus modelos de IA externos. Toda la información se almacena en una base de datos PostgreSQL en Neon Cloud, protegida con cifrado y controles de acceso restringido.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Data Sharing and Transfers / Transferencia y Compartición de Datos
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>EN:</strong> We do not sell, rent, or trade your data. Data may be shared only with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li><strong>Service Providers:</strong> Cloud hosting (e.g., Neon, Vercel) and AI infrastructure partners (OpenAI, Google) solely for the purpose of operating our service.</li>
                  <li><strong>Legal Authorities:</strong> If required by law, subpoena, or other legal process.</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  Your data may be transferred to servers in the United States or other countries. We ensure all international transfers comply with Mexican law (LFPDPPP) and maintain adequate data protection standards.
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>ES:</strong> No vendemos, alquilamos ni comercializamos sus datos. La información puede compartirse únicamente con:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li><strong>Proveedores de Servicios:</strong> Alojamiento en la nube (ej. Neon, Vercel) e infraestructura de IA (OpenAI, Google) con el único fin de operar nuestro servicio.</li>
                  <li><strong>Autoridades Legales:</strong> En caso de ser requerido por ley, citatorio u otro proceso legal.</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  Sus datos pueden ser transferidos a servidores en Estados Unidos u otros países. Garantizamos que todas las transferencias internacionales cumplen con la LFPDPPP y mantienen niveles de protección de datos adecuados.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Your Data Protection Rights / Sus Derechos de Protección de Datos
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>EN:</strong> You have the right to request:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li><strong>Access:</strong> To know what personal data we hold about you.</li>
                  <li><strong>Rectification:</strong> To correct any inaccurate or incomplete data.</li>
                  <li><strong>Erasure (Deletion):</strong> To have your personal data deleted.</li>
                  <li><strong>Object to Processing:</strong> To object to how we use your data.</li>
                  <li><strong>Revoke Consent:</strong> To withdraw your consent at any time.</li>
                </ul>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>ES:</strong> Usted tiene derecho a solicitar:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li><strong>Derechos ARCO:</strong></li>
                  <li><strong>Acceso:</strong> Conocer qué datos personales tenemos de usted.</li>
                  <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos.</li>
                  <li><strong>Cancelación:</strong> Solicitar la eliminación de sus datos de nuestros registros.</li>
                  <li><strong>Oposición:</strong> Oponerse al uso de sus datos para fines específicos.</li>
                  <li><strong>Revocación del Consentimiento:</strong> Retirar su consentimiento para el tratamiento de sus datos en cualquier momento.</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-4">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Procedure to Exercise Rights / Procedimiento para Ejercer sus Derechos
                </h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>EN:</strong> To exercise these rights, please send a request to <a href="mailto:edwinm@surfing.digital" className="text-blue-600 hover:underline">edwinm@surfing.digital</a>, including your full name, contact information, a copy of your official ID, and a clear description of your request. We will respond within the timeframes established by law.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  <strong>ES:</strong> Para ejercer estos derechos, envíe una solicitud a <a href="mailto:edwinm@surfing.digital" className="text-blue-600 hover:underline">edwinm@surfing.digital</a>, incluyendo su nombre completo, datos de contacto, copia de una identificación oficial y la descripción clara de su solicitud. Responderemos en los plazos que marca la ley (20 días hábiles para comunicar la procedencia y 15 días hábiles para ejecutar la acción).
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-4">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  INAI (For Mexican Residents) / INAI (Para Residentes en México)
                </h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>EN:</strong> If you are not satisfied with our response, you have the right to file a complaint with the National Institute for Transparency, Access to Information, and Personal Data Protection (INAI).
                </p>
                <p className="text-slate-700 leading-relaxed">
                  <strong>ES:</strong> Si no recibe una respuesta satisfactoria, tiene derecho a interponer una queja o denuncia ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI).
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Cookies and Tracking Technologies / Cookies y Tecnologías de Rastreo
            </h2>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>EN:</strong> We use cookies and similar technologies to analyze platform usage, store user preferences, and improve our service. You can control or refuse cookies through your browser settings. However, disabling them may affect the functionality of our website.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>ES:</strong> Utilizamos cookies y tecnologías similares para analizar el uso de la plataforma, guardar las preferencias del usuario y mejorar nuestro servicio. Usted puede controlar o rechazar el uso de cookies a través de la configuración de su navegador. Sin embargo, desactivarlas podría afectar la funcionalidad de nuestro sitio web.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. Data Retention / Conservación de Datos
            </h2>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>EN:</strong> We retain your data only for as long as necessary to fulfill the purposes for which it was collected or to comply with legal obligations. Anonymized or aggregated data may be retained indefinitely for analytical purposes.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>ES:</strong> Conservamos sus datos solo durante el tiempo necesario para cumplir con las finalidades para las que fueron recopilados o para atender obligaciones legales. Los datos anonimizados o agregados podrán conservarse indefinidamente con fines analíticos.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              10. Security Measures / Medidas de Seguridad
            </h2>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>EN:</strong> We implement industry-standard technical and organizational security measures, such as SSL encryption, access controls, activity logs, and periodic audits, to protect your data against unauthorized access, alteration, or loss.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>ES:</strong> Implementamos medidas de seguridad técnicas y organizacionales estándar en la industria, como cifrado SSL, controles de acceso, registros de actividad y auditorías periódicas, para proteger sus datos contra el acceso no autorizado, alteración o pérdida.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              11. Privacy of Minors / Privacidad de Menores
            </h2>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>EN:</strong> Our services are not directed at individuals under the age of 16. We do not knowingly collect personal data from children. If we become aware that we have inadvertently collected such data, we will take steps to delete it.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>ES:</strong> Nuestros servicios no están dirigidos a menores de 16 años. No recopilamos intencionadamente datos personales de menores. Si detectamos que hemos recopilado inadvertidamente dicha información, tomaremos las medidas necesarias para eliminarla.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              12. Updates to this Policy / Actualizaciones a este Aviso
            </h2>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>EN:</strong> We may update this Privacy Policy periodically. Any substantial changes will be communicated through our website or by email. The "Last Updated" date at the top of this policy indicates when it was last revised.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>ES:</strong> Podremos actualizar este Aviso de Privacidad periódicamente. Cualquier cambio sustancial será notificado a través de nuestro sitio web o por correo electrónico. La fecha de "Última Actualización" en la parte superior indica la fecha de la última revisión.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-600 mb-4">
            For questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p className="text-slate-600 mb-2">
            Para preguntas o inquietudes sobre este Aviso de Privacidad, contáctenos en:
          </p>
          <a href="mailto:edwinm@surfing.digital" className="text-blue-600 hover:underline font-semibold text-lg">
            edwinm@surfing.digital
          </a>
        </div>
      </div>
    </div>
  )
}



