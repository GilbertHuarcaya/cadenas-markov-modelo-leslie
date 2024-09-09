// Pagination settings
export const PAGINATION_CONSTANTS = {
  rowsPerPage: [5, 10, 25, 50],
  defaultSelectedRowsPerPage: 10,
  defaultFirstPage: 1,
  firstIndex: 0,
};

// Toast notification settings
export const TOAST_CONSTANTS = {
  duration: 5000, // Display time in miliseconds (5s)
  delay: 300, // Delay before showing in seconds (0.3s)
};

// Input behavior settings
export const INPUT_CONSTANTS = {
  debounceDelay: 400, // Debounce delay in miliseconds (0.4s)
  minLengthToActivate: 1, // Min input length to trigger actions
};

// Tooltip settings
export const TOOLTIP_CONSTANTS = {
  event: "both", // Event to trigger the tooltip
  showDelay: 600, // Delay before showing in miliseconds (0.6s)
  position: "top", // Position of the tooltip, // Append to the tooltip
  hideDelay: 150, // Delay before hiding in miliseconds (0.15s)
  autoHide: true, // Auto hide the tooltip
};

export const TABLE_FILTER_CONSTANTS = {
  matchModeOptions: {
    text: [
      "IsEqualTo",
      "IsNotEqualTo",
      "StartsWith",
      "EndsWith",
      "Contains",
      "DoesNotContain",
    ],
    compare: [
      "IsEqualTo",
      "IsNotEqualTo",
      "IsGreaterThan",
      "IsGreaterThanOrEqualTo",
      "IsLessThan",
      "IsLessThanOrEqualTo",
    ],
    equals: ["IsEqualTo", "IsNotEqualTo"],
    list: ["IsEmpty", "IsNotEmpty"],
    null: ["IsNull", "IsNotNull"],
  },
  defaultMatchMode: "Contains",
  dropdownEmptyIndentifier: -1,
};

export enum EDeadLineFilters {
  OVERDUE = 1,
  TODAY,
  TOMORROW,
  THIS_WEEK,
  ONE_WEEK,
  NEXT_WEEK,
  THIS_MONTH,
  ONE_MONTH,
  FUTURE,
}


export const DEADLINE_FILTERS: { label: string; value: EDeadLineFilters }[] = [
  { label: "Vencidas", value: EDeadLineFilters.OVERDUE },
  { label: "Hoy", value: EDeadLineFilters.TODAY },
  { label: "Mañana", value: EDeadLineFilters.TOMORROW },
  { label: "Esta semana", value: EDeadLineFilters.THIS_WEEK },
  { label: "Una semana desde hoy", value: EDeadLineFilters.ONE_WEEK },
  { label: "La próxima semana", value: EDeadLineFilters.NEXT_WEEK },
  { label: "Este mes", value: EDeadLineFilters.THIS_MONTH },
  { label: "Futuras", value: EDeadLineFilters.FUTURE },
];

export const TABLE_SORT_CONSTANTS = {
  defaultSortField: "id", // Default field to sort by
  defaultSortOrder: 1, //ascending
  defaultSortGuardianship: {
    field: "deadLineDate", // Default column to sort by
    order: 1, //ascending
  },
};

export const DATES = {
  language: "es", //current language
  localeDateString: "es-CO", //date format español-Colombia
  defaultLongDateFormat: {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "numeric",
  } satisfies Intl.DateTimeFormatOptions, // Date format for long date
};

export const TIMEZONE_TRANSFORM = {
  locale: "en", //current language
  timeZone: "America/Bogota", //current timezone
  offset: -5, // UTC-5 for Colombia
};

export const FILE_TYPES = {
  text: "text/plain",
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  json: "application/json",
  xml: "application/xml",
  pdf: "application/pdf",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  png: "image/png",
  gif: "image/gif",
  bmp: "image/bmp",
  webp: "image/webp",
  mp3: "audio/mpeg",
  wav: "audio/wav",
  audioOgg: "audio/ogg",
  mp4: "video/mp4",
  webm: "video/webm",
  videoOgg: "video/ogg",
  ttf: "font/ttf",
  woff: "font/woff",
  woff2: "font/woff2",
};

export const DOCUMENTS = {
  defaultDocumentName: "document",
  xlsm: "application/vnd.ms-excel.sheet.macroEnabled.12",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  maxTimeStoredOnClient: 100000, // 100 seconds
};

export const documentFieldsToSynchronize = [
  {
    documentFieldRowName: "Radicado",
    caseRowName: "submissionIdentifier",
  },
  {
    documentFieldRowName: "Fecha Asignacion",
    caseRowName: "registrationDate",
  },
  {
    documentFieldRowName: "Fecha Notificacion",
    caseRowName: "submissionDate",
  },
];

export const CALENDAR_FORMAT_ES = {
  firstDayOfWeek: 1,
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ],
  am: "am",
  pm: "pm",
  today: "Hoy",
  clear: "Limpiar",
};
