// Todo el contenido del sitio vive aquí. Para un cliente nuevo: reemplaza cada TODO-CLIENTE.
// Contenido de ejemplo ficticio (despacho inventado; no corresponde a ninguna empresa ni persona real).

export type IconName =
  | 'calculator'
  | 'file'
  | 'users'
  | 'briefcase'
  | 'search'
  | 'shield'
  | 'clock'
  | 'building'
  | 'chart'
  | 'calendar';

export interface Service {
  title: string;
  description: string;
  icon: IconName;
}

export interface Audience {
  title: string;
  description: string;
  points: string[];
  icon: IconName;
}

export interface Plan {
  name: string;
  /** Precio mensual "desde". Deja 'TODO-CLIENTE' hasta que el cliente lo confirme (se muestra "A cotizar"). */
  price: string;
  period: string;
  forWho: string;
  features: string[];
  featured?: boolean;
}

export interface Obligation {
  period: string;
  when: string;
  items: string[];
}

export interface Step {
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  /** true = testimonio ficticio de ejemplo. Reemplázalo por uno real CON PERMISO del cliente y pon false. */
  example: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const site = {
  // --- Identidad (TODO-CLIENTE) ---
  name: 'Balance Fiscal Querétaro',
  legalName: 'Balance Fiscal Querétaro (demo)',
  url: 'https://example.com', // dominio final sin "/" al final
  locale: 'es-MX',
  title: 'Contador en Querétaro para PyMEs y personas físicas | Balance Fiscal',
  description:
    'Despacho contable en Querétaro: contabilidad mensual, declaraciones ante el SAT, nómina e IMSS, constitución de empresas y regularización fiscal. Diagnóstico sin costo.',
  schemaType: 'AccountingService',
  priceRange: '$$',
  themeColor: '#0f5c56',

  // --- Contacto (TODO-CLIENTE) ---
  phone: '+52 442 000 0000', // como se muestra
  phoneHref: '+524420000000', // E.164 para tel:
  whatsapp: '524420000000', // solo dígitos, con lada de país
  whatsappMessage: 'Hola Balance Fiscal, vi su página web y quiero un diagnóstico de mi situación fiscal.',
  email: 'contacto@example.com',
  address: {
    street: 'Blvd. Ejemplo 456, Piso 3, Col. Centro Sur',
    locality: 'Santiago de Querétaro',
    region: 'Qro.',
    postalCode: '76090',
    country: 'MX',
  },
  geo: { lat: 20.5733, lng: -100.3712 },
  mapQuery: 'Centro Sur, Santiago de Querétaro, Qro.',
  areaServed: ['Querétaro', 'Corregidora', 'El Marqués', 'Juriquilla', 'San Juan del Río'],
  hours: [
    { days: 'Lunes a viernes', open: '09:00', close: '18:00', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
    { days: 'Sábado (con cita)', open: '10:00', close: '13:00', schema: ['Saturday'] },
  ],
  social: [] as { label: string; href: string }[],

  // --- Secciones ---
  hero: {
    eyebrow: 'Despacho contable en Querétaro',
    heading: 'Tu contabilidad al día y sin sustos con el SAT',
    sub: 'Llevamos la contabilidad, declaraciones y nómina de PyMEs y personas físicas. Te decimos cuánto vas a pagar antes de cada fecha límite, en lenguaje claro.',
    primaryCta: 'Diagnóstico gratis por WhatsApp',
    secondaryCta: 'Ver planes',
    stats: [
      { value: '+15 años', label: 'de experiencia' },
      { value: '+300', label: 'clientes activos' },
      { value: '0', label: 'multas por atraso' },
    ],
    // Tarjeta lateral del hero
    checklistTitle: 'Cada mes, sin que lo pidas',
    checklist: [
      'Registro y conciliación de ingresos y gastos',
      'Cálculo de impuestos con anticipación',
      'Presentación de declaraciones',
      'Reporte claro de cuánto pagas y por qué',
    ],
  },

  services: [
    { icon: 'calculator', title: 'Contabilidad mensual', description: 'Registro de CFDI, conciliación bancaria y estados financieros. Contabilidad electrónica cuando aplica.' },
    { icon: 'file', title: 'Declaraciones ante el SAT', description: 'Pagos provisionales, declaraciones mensuales, informativas y anual. Revisamos tu buzón tributario.' },
    { icon: 'users', title: 'Nómina e IMSS', description: 'Timbrado de nómina, altas y bajas en el IMSS, cuotas obrero-patronales, INFONAVIT e impuesto estatal sobre nómina.' },
    { icon: 'building', title: 'Constitución de empresas', description: 'Te ayudamos a elegir el tipo de sociedad y régimen, coordinamos con notaría y damos de alta tu RFC y e.firma.' },
    { icon: 'search', title: 'Auditoría y regularización', description: '¿Declaraciones atrasadas o cartas invitación? Revisamos tu historial, corregimos y te ponemos al corriente.' },
    { icon: 'shield', title: 'Opinión de cumplimiento positiva', description: 'La necesitas para licitar, vender a grandes empresas o pedir crédito. La mantenemos en verde.' },
  ] satisfies Service[],

  audiences: [
    {
      icon: 'briefcase',
      title: 'RESICO',
      description: 'Personas físicas en el Régimen Simplificado de Confianza.',
      points: ['Verificamos que sigas cumpliendo los requisitos', 'Declaraciones mensuales y anual', 'Facturación correcta para no perder el régimen'],
    },
    {
      icon: 'chart',
      title: 'Actividad empresarial y profesional',
      description: 'Profesionistas independientes, comercios y prestadores de servicios.',
      points: ['Deducciones bien soportadas', 'Pagos provisionales de ISR e IVA', 'Contabilidad y facturación ordenadas'],
    },
    {
      icon: 'building',
      title: 'Personas morales',
      description: 'S.A. de C.V., S. de R.L., S.A.S. y asociaciones civiles.',
      points: ['Estados financieros mensuales', 'Nómina, IMSS e impuestos estatales', 'Declaración anual e informativas'],
    },
  ] satisfies Audience[],

  plans: [
    {
      name: 'Esencial',
      price: 'TODO-CLIENTE',
      period: 'al mes',
      forWho: 'Personas físicas en RESICO o con pocos movimientos.',
      features: ['Declaraciones mensuales', 'Declaración anual', 'Hasta 30 CFDI al mes', 'Atención por WhatsApp'],
    },
    {
      name: 'Negocio',
      price: 'TODO-CLIENTE',
      period: 'al mes',
      forWho: 'Actividad empresarial o profesional con más operaciones.',
      features: ['Todo lo de Esencial', 'Contabilidad electrónica', 'Conciliación bancaria', 'Reporte mensual de resultados', 'Nómina hasta 5 empleados'],
      featured: true,
    },
    {
      name: 'Empresa',
      price: 'TODO-CLIENTE',
      period: 'al mes',
      forWho: 'Personas morales y empresas con nómina.',
      features: ['Todo lo de Negocio', 'Estados financieros mensuales', 'Nómina, IMSS e INFONAVIT', 'Junta mensual con tu contador', 'Opinión de cumplimiento al día'],
    },
  ] satisfies Plan[],
  plansNote: 'El precio final depende del volumen de facturas, empleados y régimen. Te lo confirmamos por escrito después del diagnóstico.',

  // Calendario de REFERENCIA: periodicidades generales, sin fechas que caduquen.
  // Las fechas exactas pueden cambiar por decreto o prórroga: siempre remite al calendario oficial del SAT.
  obligations: [
    {
      period: 'Mensual',
      when: 'Por lo general, a más tardar el día 17 del mes siguiente',
      items: ['Pagos provisionales de ISR', 'Declaración de IVA', 'Retenciones de ISR e IVA', 'Cuotas obrero-patronales del IMSS'],
    },
    {
      period: 'Bimestral',
      when: 'Junto con las cuotas del IMSS del mes correspondiente',
      items: ['Aportaciones de INFONAVIT', 'Retiro, cesantía y vejez (RCV)', 'Bimestre RESICO o RIF, según tu caso'],
    },
    {
      period: 'Anual',
      when: 'En la primera parte del año (morales antes que físicas)',
      items: ['Declaración anual de personas morales', 'Declaración anual de personas físicas', 'Constancias y declaraciones informativas'],
    },
    {
      period: 'Siempre',
      when: 'Todo el año, en cada operación',
      items: ['Emitir y cancelar CFDI correctamente', 'Revisar el buzón tributario', 'Mantener vigentes e.firma y sellos'],
    },
  ] satisfies Obligation[],
  obligationsNote:
    'Calendario de referencia general. Las fechas exactas dependen de tu régimen y pueden cambiar por prórrogas o reformas; nosotros las vigilamos por ti con base en el calendario oficial del SAT.',

  steps: [
    { title: 'Diagnóstico sin costo', description: 'Revisamos tu situación fiscal actual (régimen, declaraciones pendientes, buzón tributario) en una llamada o visita.' },
    { title: 'Propuesta por escrito', description: 'Te enviamos el plan recomendado, lo que incluye y el precio mensual fijo. Sin letras chiquitas.' },
    { title: 'Alta y entrega de accesos', description: 'Firmamos contrato de servicios y confidencialidad. Configuramos tu e.firma, CIEC y facturación.' },
    { title: 'Tu contabilidad, al día', description: 'Desde el primer mes recibes tus declaraciones presentadas y un resumen de lo que pagaste.' },
  ] satisfies Step[],

  // Testimonios FICTICIOS de ejemplo (example: true). En sitio de cliente usa testimonios reales con permiso.
  testimonials: [
    { name: 'Andrea M.', role: 'Arquitecta independiente, Juriquilla', quote: 'Tenía dos años sin declarar. Me explicaron todo sin regaños, me pusieron al corriente y ahora sé cuánto voy a pagar cada mes.', example: true },
    { name: 'Jorge R.', role: 'Director de una distribuidora, El Marqués', quote: 'Manejan la nómina de nuestros 22 empleados y las cuotas del IMSS. Cada mes recibo un reporte que sí entiendo.', example: true },
    { name: 'Paola V.', role: 'Tienda en línea, RESICO', quote: 'Me ayudaron a elegir el régimen correcto al empezar y me avisan antes de cada fecha. Cero estrés con el SAT.', example: true },
  ] satisfies Testimonial[],

  faq: [
    { q: '¿Cuánto cuesta llevar mi contabilidad?', a: 'Depende de tu régimen, cuántas facturas emites y recibes, y si tienes empleados. Después del diagnóstico gratuito te damos un precio mensual fijo por escrito.' },
    { q: 'Tengo declaraciones atrasadas, ¿me pueden ayudar?', a: 'Sí. Revisamos tu historial en el portal del SAT, calculamos lo pendiente y te proponemos un plan para regularizarte, incluyendo opciones de pago en parcialidades cuando aplican.' },
    { q: '¿Necesito ir a su oficina?', a: 'No es necesario. Trabajamos 100% en línea: compartes tus accesos de forma segura y hacemos juntas por videollamada. Si prefieres, también te recibimos en persona.' },
    { q: '¿Cómo cuidan mis contraseñas y mi e.firma?', a: 'Firmamos un acuerdo de confidencialidad, guardamos los accesos en un gestor cifrado con acceso restringido y nunca te pedimos datos por correo sin cifrar.' },
    { q: '¿Me sirve RESICO?', a: 'Depende de tus ingresos y actividad. En el diagnóstico comparamos tu carga fiscal en RESICO contra otros regímenes y te recomendamos el que más te conviene.' },
    { q: '¿Atienden clientes fuera de Querétaro?', a: 'Sí. Atendemos clientes de todo México de forma remota; en Querétaro y zona metropolitana también hacemos visitas.' },
  ] satisfies FaqItem[],

  form: {
    heading: 'Solicita tu diagnóstico gratis',
    sub: 'Cuéntanos tu caso y te contactamos en menos de un día hábil.',
    regimenOptions: [
      'RESICO (persona física)',
      'Actividad empresarial y profesional',
      'Sueldos y salarios',
      'Arrendamiento',
      'Persona moral',
      'Aún no estoy dado de alta',
      'No lo sé',
    ],
    serviceOptions: ['Contabilidad mensual', 'Declaraciones SAT', 'Nómina e IMSS', 'Constitución de empresa', 'Auditoría / regularización', 'Otro'],
    employeeOptions: ['Sin empleados', '1 a 5', '6 a 20', '21 a 50', 'Más de 50'],
  },

  cta: {
    heading: '¿Te llegó un requerimiento o tienes declaraciones pendientes?',
    sub: 'Escríbenos hoy y te decimos qué hacer primero.',
  },
};

export type Site = typeof site;
