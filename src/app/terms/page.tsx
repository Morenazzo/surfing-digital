export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            🧾 Términos y Condiciones / Terms and Conditions
          </h1>
          <p className="text-slate-600">
            <strong>Fecha de entrada en vigor / Effective Date:</strong> 14 de octubre de 2025
          </p>
          <p className="text-slate-600">
            <strong>Última actualización / Last Updated:</strong> 14 de octubre de 2025
          </p>
        </div>

        {/* Company Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Empresa / Company
          </h2>
          <div className="space-y-2 text-slate-700">
            <p><strong>Surfing Digital SAPI de CV</strong></p>
            <p>📧 <a href="mailto:edwinm@surfing.digital" className="text-blue-600 hover:underline">edwinm@surfing.digital</a></p>
            <p>🌐 <a href="https://www.surfing.digital" className="text-blue-600 hover:underline">www.surfing.digital</a></p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Aceptación de los Términos / Acceptance of Terms
            </h2>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>ES:</strong> Estos Términos y Condiciones ("Términos") regulan el acceso y uso de la plataforma Surfing Digital ("el Servicio"), propiedad de Surfing Digital SAPI de CV. El Servicio ayuda a empresas a evaluar su preparación en inteligencia artificial (IA), identificar oportunidades estratégicas y recibir recomendaciones de proyectos con retorno de inversión (ROI).
            </p>
            <p className="text-slate-700 leading-relaxed mb-3">
              Al hacer clic en "Acepto", registrar una cuenta o utilizar el Servicio, el usuario ("Cliente") declara haber leído, comprendido y aceptado estos Términos y nuestro Aviso de Privacidad, el cual se incorpora a este documento por referencia.
            </p>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>EN:</strong> These Terms and Conditions ("Terms") govern access to and use of the Surfing Digital platform ("the Service"), operated by Surfing Digital SAPI de CV. The Service helps companies assess their AI readiness, identify strategic opportunities, and receive AI project recommendations with ROI estimates.
            </p>
            <p className="text-slate-700 leading-relaxed">
              By clicking "I Agree," registering for an account, or using the Service, the user ("Client") declares they have read, understood, and accepted these Terms and our Privacy Policy, which is incorporated herein by reference.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Servicios Ofrecidos / Services Provided
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>ES:</strong> Surfing Digital ofrece evaluaciones, reportes y herramientas digitales de apoyo a la toma de decisiones, incluyendo:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>Diagnóstico de madurez y preparación en IA.</li>
                  <li>Recomendaciones personalizadas de proyectos de IA.</li>
                  <li>Estimaciones de costos, beneficios y ROI potencial.</li>
                  <li>Planes de implementación de 30, 60 o 90 días.</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  Surfing Digital se reserva el derecho de modificar, actualizar o descontinuar cualquiera de los servicios, previa notificación razonable a los Clientes cuando sea aplicable.
                </p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>EN:</strong> Surfing Digital provides digital assessments, reports, and strategic tools, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>AI readiness diagnostics.</li>
                  <li>Personalized AI project recommendations.</li>
                  <li>Estimated costs, benefits, and potential ROI.</li>
                  <li>30-, 60-, or 90-day implementation plans.</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  Surfing Digital reserves the right to modify, update, or discontinue any services, providing reasonable notice to Clients where applicable.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Elegibilidad / Eligibility
            </h2>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>ES:</strong> El Servicio está dirigido exclusivamente a entidades comerciales y profesionales mayores de 18 años. El Cliente declara y garantiza que posee la autoridad legal para vincular a su organización con estos Términos.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>EN:</strong> The Service is intended exclusively for business entities and professionals aged 18 or older. The Client represents and warrants that they have the legal authority to bind their organization to these Terms.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Uso Autorizado y Restricciones / Authorized Use and Restrictions
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>ES:</strong> El Cliente se compromete a usar el Servicio solo para fines empresariales legítimos y de acuerdo con estos Términos. Queda estrictamente prohibido:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>Copiar, distribuir, modificar o crear obras derivadas del software o contenido del Servicio.</li>
                  <li>Realizar ingeniería inversa, descompilar o intentar descubrir el código fuente de la plataforma.</li>
                  <li>Utilizar robots, arañas u otros medios automatizados para acceder al Servicio de forma que pueda dañar, deshabilitar o sobrecargar nuestros sistemas.</li>
                  <li>Intentar vulnerar las medidas de seguridad del Servicio o acceder a datos no destinados al Cliente.</li>
                  <li>Ingresar datos personales sensibles sin el consentimiento expreso y legal del titular.</li>
                </ul>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>EN:</strong> The Client agrees to use the Service only for legitimate business purposes and in accordance with these Terms. It is strictly prohibited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>Copy, distribute, modify, or create derivative works of the Service's software or content.</li>
                  <li>Reverse engineer, decompile, or otherwise attempt to discover the platform's source code.</li>
                  <li>Use any robot, spider, or other automated means to access the Service in a manner that could damage, disable, or overburden our systems.</li>
                  <li>Attempt to breach the Service's security measures or access data not intended for the Client.</li>
                  <li>Upload sensitive personal data without the express and lawful consent of the data subject.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Pagos, Suscripciones y Reembolsos / Payments, Subscriptions, and Refunds
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>ES:</strong> Algunos servicios pueden requerir un pago único o una suscripción recurrente.
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li><strong>Precios:</strong> Los precios se muestran en USD, más los impuestos aplicables (ej. IVA), salvo que se indique lo contrario.</li>
                  <li><strong>Facturación y Renovación:</strong> Las suscripciones se facturan de forma periódica (mensual o anual). Para evitar el siguiente cargo, el Cliente debe cancelar su suscripción antes de la fecha de renovación automática.</li>
                  <li><strong>Cambios de Precio:</strong> Nos reservamos el derecho de modificar las tarifas. Notificaremos a los Clientes suscritos cualquier cambio de precio con al menos 30 días de antelación.</li>
                  <li><strong>Política de Reembolso:</strong> Los pagos no son reembolsables una vez que los reportes o servicios han sido entregados, salvo en caso de un error técnico comprobado imputable a Surfing Digital.</li>
                </ul>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>EN:</strong> Some services may require a one-time payment or a recurring subscription.
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li><strong>Pricing:</strong> Prices are displayed in USD, plus applicable taxes (e.g., VAT), unless otherwise stated.</li>
                  <li><strong>Billing and Renewal:</strong> Subscriptions are billed on a recurring basis (monthly or annually). To avoid the next charge, the Client must cancel their subscription before the automatic renewal date.</li>
                  <li><strong>Price Changes:</strong> We reserve the right to modify our fees. We will notify subscribed Clients of any price changes at least 30 days in advance.</li>
                  <li><strong>Refund Policy:</strong> Payments are non-refundable once reports or services have been delivered, except in the case of a verified technical error attributable to Surfing Digital.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Propiedad Intelectual / Intellectual Property
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>ES:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li><strong>Nuestra Propiedad:</strong> Todos los algoritmos, metodologías, marcas, códigos y la estructura de los reportes generados son propiedad exclusiva de Surfing Digital SAPI de CV.</li>
                  <li><strong>Propiedad del Cliente:</strong> El Cliente conserva la plena propiedad de la información de negocio que proporciona ("Datos de Entrada").</li>
                  <li><strong>Propiedad del Reporte:</strong> El Cliente es propietario del contenido final del reporte que se le entrega para su uso interno y estratégico.</li>
                  <li><strong>Licencia de Uso:</strong> El Cliente nos concede una licencia limitada, no exclusiva y mundial para usar los Datos de Entrada con el único fin de generar los reportes, operar y mejorar el Servicio, siempre de forma agregada y anonimizada.</li>
                </ul>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>EN:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li><strong>Our Property:</strong> All algorithms, methodologies, trademarks, code, and the structure of generated reports are the exclusive property of Surfing Digital SAPI de CV.</li>
                  <li><strong>Client Property:</strong> The Client retains full ownership of the business information they provide ("Input Data").</li>
                  <li><strong>Report Ownership:</strong> The Client owns the final content of the report delivered to them for their internal and strategic use.</li>
                  <li><strong>License to Us:</strong> The Client grants us a limited, non-exclusive, worldwide license to use the Input Data for the sole purpose of generating reports, operating, and improving the Service, always on an aggregated and anonymized basis.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Privacidad y Protección de Datos / Privacy and Data Protection
            </h2>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>ES:</strong> Surfing Digital se compromete a proteger su privacidad y cumple con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (México) y la California Consumer Privacy Act (EE. UU.). Los datos pueden almacenarse en servidores seguros en México o Estados Unidos. Para más detalles, consulte nuestro <a href="/privacy" className="text-blue-600 hover:underline">Aviso de Privacidad</a>.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>EN:</strong> Surfing Digital is committed to protecting your privacy and complies with the Federal Law on Protection of Personal Data (Mexico) and the California Consumer Privacy Act (USA). Data may be securely stored on servers in Mexico or the United States. For more details, please review our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Uso de IA y Descargo de Responsabilidad / Use of AI and Disclaimer
            </h2>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <p className="text-slate-700 leading-relaxed mb-3">
                <strong>ES:</strong> Los reportes se basan en modelos de IA (ej. OpenAI, Google Gemini) y análisis automatizado. Dichos resultados son orientativos y se proporcionan únicamente con fines informativos; no constituyen asesoramiento financiero o legal y no garantizan rendimientos específicos. El Cliente es el único responsable de las decisiones de negocio tomadas con base en la información del Servicio.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>EN:</strong> Reports are based on AI models (e.g., OpenAI, Google Gemini) and automated analysis. Such results are indicative and provided for informational purposes only; they do not constitute financial or legal advice and do not guarantee specific performance. The Client is solely responsible for all business decisions made based on information from the Service.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. Limitación de Responsabilidad / Limitation of Liability
            </h2>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>ES:</strong> El Servicio se ofrece "tal cual" y "según disponibilidad". En la máxima medida permitida por la ley, Surfing Digital no será responsable por pérdidas indirectas, incidentales o consecuentes. La responsabilidad total de Surfing Digital ante cualquier reclamo no excederá el monto total pagado por el Cliente durante los doce (12) meses previos al reclamo.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>EN:</strong> The Service is provided "as is" and "as available." To the fullest extent permitted by law, Surfing Digital shall not be liable for any indirect, incidental, or consequential losses. Surfing Digital's total liability for any claim shall not exceed the total amount paid by the Client during the twelve (12) months preceding the claim.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              10. Terminación y Retención de Datos / Termination and Data Retention
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>ES:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li><strong>Terminación:</strong> Surfing Digital puede suspender o cancelar el acceso al Servicio por violación de estos Términos. El Cliente puede cancelar su cuenta en cualquier momento desde la configuración de su perfil o mediante notificación por correo electrónico.</li>
                  <li><strong>Efecto de la Terminación:</strong> Tras la cancelación, el Cliente tendrá un período de 30 días para exportar sus reportes. Después de este período, nos reservamos el derecho de eliminar permanentemente todos los datos asociados a la cuenta.</li>
                </ul>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>EN:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li><strong>Termination:</strong> Surfing Digital may suspend or terminate access to the Service for a violation of these Terms. The Client may cancel their account at any time from their profile settings or by written notice via email.</li>
                  <li><strong>Effect of Termination:</strong> Upon cancellation, the Client will have a 30-day period to export their reports. After this period, we reserve the right to permanently delete all data associated with the account.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              11. Ley Aplicable y Jurisdicción / Governing Law and Jurisdiction
            </h2>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>ES:</strong> Estos Términos se regirán e interpretarán de acuerdo con las leyes federales de México. Cualquier controversia que surja en relación con estos Términos se resolverá exclusivamente en los tribunales competentes de la Ciudad de México, renunciando el Cliente a cualquier otra jurisdicción que pudiera corresponderle.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>EN:</strong> These Terms shall be governed by and construed in accordance with the federal laws of Mexico. Any dispute arising in connection with these Terms shall be resolved exclusively in the competent courts of Mexico City, with the Client waiving any other jurisdiction that may apply.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              12. Contacto / Contact
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-slate-700 leading-relaxed mb-3">
                <strong>ES:</strong> Para cualquier consulta legal o relacionada con estos Términos, por favor contáctenos:
              </p>
              <p className="text-slate-700 leading-relaxed mb-3">
                📧 <a href="mailto:edwinm@surfing.digital" className="text-blue-600 hover:underline">edwinm@surfing.digital</a><br />
                🏢 Surfing Digital SAPI de CV · Ciudad de México, México
              </p>
              <p className="text-slate-700 leading-relaxed mb-3">
                <strong>EN:</strong> For any legal or contractual inquiries, please contact us:
              </p>
              <p className="text-slate-700 leading-relaxed">
                📧 <a href="mailto:edwinm@surfing.digital" className="text-blue-600 hover:underline">edwinm@surfing.digital</a><br />
                🏢 Surfing Digital SAPI de CV · Mexico City, Mexico
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-600 mb-4">
            For questions or concerns about these Terms and Conditions, please contact us at:
          </p>
          <p className="text-slate-600 mb-2">
            Para preguntas o inquietudes sobre estos Términos y Condiciones, contáctenos en:
          </p>
          <a href="mailto:edwinm@surfing.digital" className="text-blue-600 hover:underline font-semibold text-lg">
            edwinm@surfing.digital
          </a>
        </div>
      </div>
    </div>
  )
}

