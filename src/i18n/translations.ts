export type Locale = 'en' | 'es' | 'fr' | 'pt' | 'ja';

export interface Translations {
  nav: {
    brand: string;
    tagline: string;
    transmute: string;
    ledger: string;
    milestones: string;
    stealth: string;
    support: string;
    theme: string;
    language: string;
    panicHint: string;
    menuToggle: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleAccent: string;
    titleLine2: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    securityNote: string;
  };
  transmute: {
    title: string;
    subtitle: string;
    boxBreathingTab: string;
    sprintTab: string;
    startBreathing: string;
    pauseBreathing: string;
    resetBreathing: string;
    inhale: string;
    holdIn: string;
    exhale: string;
    holdOut: string;
    boxDesc: string;
    cycleCount: string;
    sprintTitle: string;
    sprintDesc: string;
    sprintTaskPlaceholder: string;
    startSprint: string;
    pauseSprint: string;
    completeSprint: string;
    timeRemaining: string;
    soundToggle: string;
    soundOn: string;
    soundOff: string;
    urgeSurfingQuotes: string[];
    congratulationsUrgeTamed: string;
    logThisOutput: string;
  };
  ledger: {
    title: string;
    subtitle: string;
    streakTitle: string;
    currentStreak: string;
    longestStreak: string;
    days: string;
    transmutations: string;
    totalConvertedScore: string;
    logOutputBtn: string;
    formTitle: string;
    categoryLabel: string;
    categories: {
      code: string;
      reading: string;
      workout: string;
      writing: string;
      deepwork: string;
      custom: string;
    };
    outputTitleLabel: string;
    outputTitlePlaceholder: string;
    amountLabel: string;
    unitLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitLog: string;
    cancel: string;
    emptyLedger: string;
    recentOutputs: string;
    deleteConfirm: string;
    streakAdvance: string;
    streakReset: string;
    streakResetConfirm: string;
  };
  milestones: {
    title: string;
    subtitle: string;
    currentProgress: string;
    daysCompleted: string;
    stages: {
      day1: { title: string; desc: string; bio: string };
      day3: { title: string; desc: string; bio: string };
      day7: { title: string; desc: string; bio: string };
      day14: { title: string; desc: string; bio: string };
      day30: { title: string; desc: string; bio: string };
      day60: { title: string; desc: string; bio: string };
      day90: { title: string; desc: string; bio: string };
    };
  };
  stealth: {
    bannerTitle: string;
    bannerNotice: string;
    returnBtn: string;
    notesTitle: string;
    lastSaved: string;
    clearNotes: string;
  };
  privacyModal: {
    title: string;
    description: string;
    clientSideOnly: string;
    backupJson: string;
    backupEncrypted: string;
    restoreJson: string;
    passphraseLabel: string;
    passphrasePlaceholder: string;
    exportSuccess: string;
    restoreSuccess: string;
    restoreError: string;
    purgeTitle: string;
    purgeDesc: string;
    purgeButton: string;
    purgeConfirmPrompt: string;
    close: string;
  };
  footer: {
    zeroServerBadge: string;
    zeroServerDetail: string;
    supportMe: string;
    madeWith: string;
    rights: string;
  };
}

export const supportedLocales: { code: Locale; label: string; nativeName: string }[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'es', label: 'Spanish', nativeName: 'Español' },
  { code: 'fr', label: 'French', nativeName: 'Français' },
  { code: 'pt', label: 'Portuguese', nativeName: 'Português' },
  { code: 'ja', label: 'Japanese', nativeName: '日本語' },
];

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      brand: 'ForgeEnergy',
      tagline: 'Deep Work Vault',
      transmute: 'Transmute Urge',
      ledger: 'Energy Ledger',
      milestones: 'Milestones',
      stealth: 'Stealth Mode',
      support: 'Support Dev',
      theme: 'Theme',
      language: 'Language',
      panicHint: 'Esc for instant Stealth',
      menuToggle: 'Toggle Navigation Menu',
    },
    hero: {
      badge: '100% Client-Side • Zero-Server • Zero Tracking',
      titleLine1: 'Alchemize Compulsive Urges into',
      titleAccent: 'Unstoppable Creative Output',
      titleLine2: 'Your mind is a forge. Harness the primal energy.',
      description: 'A privacy-first psychological productivity vault. Convert biological impulses into shipped code, deep reading, physical power, and creative focus. Your data never leaves your browser.',
      primaryCta: 'Transmute Urge Now',
      secondaryCta: 'View Energy Ledger',
      securityNote: 'Encrypted locally. Zero analytics. 100% Offline Capable.',
    },
    transmute: {
      title: 'Transmutation Chamber',
      subtitle: 'Intercept the dopamine impulse. Ground the nervous system, reframe the energy, and channel it directly into real-world creative momentum.',
      boxBreathingTab: '2-Min Box Breathing',
      sprintTab: '15-Min Deep Work Sprint',
      startBreathing: 'Begin Transmutation Cycle',
      pauseBreathing: 'Pause Session',
      resetBreathing: 'Reset Breathing',
      inhale: 'Inhale deeply into the belly (4s)',
      holdIn: 'Hold with stillness & focus (4s)',
      exhale: 'Smoothly exhale the impulse (4s)',
      holdOut: 'Empty hold, grounding your power (4s)',
      boxDesc: 'Navy SEAL Tactical Box Breathing: Stimulates the vagus nerve, rapidly lowering sympathetic nervous tension and dismantling compulsive impulse loops.',
      cycleCount: 'Cycle',
      sprintTitle: '15-Minute Flow State Forge',
      sprintDesc: 'Channel the mobilized physical and neurochemical energy into a single, high-stakes intellectual or creative artifact.',
      sprintTaskPlaceholder: 'What tangible artifact are you creating right now? (e.g. Build authentication route, read 15 pages)',
      startSprint: 'Ignite 15-Min Sprint',
      pauseSprint: 'Pause Sprint',
      completeSprint: 'Complete & Log Output',
      timeRemaining: 'Remaining',
      soundToggle: 'Sound Chimes',
      soundOn: 'Audio Chimes On',
      soundOff: 'Audio Muted',
      urgeSurfingQuotes: [
        'An urge is an ocean wave. It crests, peaks within 2 to 3 minutes, and inevitably dissolves. You do not fight the wave; you surf it.',
        'This impulse is raw biological power. Do not suppress it—channel it into creative mastery and deep focused work.',
        'Notice the somatic sensation without judgment. Where does it live in your body? Breathe directly into that tension.',
        'Dopamine craves challenge and novelty. Give it complex problem-solving instead of passive, depleting consumption.',
        'The pain of voluntary discipline transforms your prefrontal cortex. Every second of stillness rewires your neural architecture.',
        'You are the observer of the storm, not the storm itself. Let the lightning power your generator.',
      ],
      congratulationsUrgeTamed: 'Urge Intercepted & Transmuted! Channel this energy into your ledger.',
      logThisOutput: 'Log Converted Output to Ledger',
    },
    ledger: {
      title: 'Energy Converted Ledger',
      subtitle: 'Measure what matters. Track your streak days alongside concrete, verified real-world accomplishments forged from redirected urges.',
      streakTitle: 'Continuous Sovereignty',
      currentStreak: 'Current Streak',
      longestStreak: 'Longest Streak',
      days: 'Days',
      transmutations: 'Transmutations Intercepted',
      totalConvertedScore: 'Energy Points Forged',
      logOutputBtn: '+ Log Converted Output',
      formTitle: 'Log Real-World Output',
      categoryLabel: 'Domain of Transmutation',
      categories: {
        code: 'Software & Code (Lines / PRs / Commits)',
        reading: 'Deep Reading & Study (Pages / Chapters)',
        workout: 'Physical Training & Calisthenics (Sets / PRs)',
        writing: 'Writing & Strategic Synthesis (Words / Docs)',
        deepwork: 'Deep Work Sprint (Focused Minutes)',
        custom: 'Custom Creative Output',
      },
      outputTitleLabel: 'Accomplishment Title',
      outputTitlePlaceholder: 'e.g. Wrote 400 lines of Rust, Read 20 pages of Meditations',
      amountLabel: 'Quantity Metric',
      unitLabel: 'Unit of Measure',
      notesLabel: 'Reflection & Cognitive State (Optional)',
      notesPlaceholder: 'How did channeling the urge feel? What breakthrough occurred?',
      submitLog: 'Forge into Permanent Ledger',
      cancel: 'Cancel',
      emptyLedger: 'No converted outputs logged yet. Next time you feel an urge, intercept it and log the creative output here!',
      recentOutputs: 'Recent Converted Accomplishments',
      deleteConfirm: 'Are you sure you want to remove this logged achievement?',
      streakAdvance: '+1 Day Check-In',
      streakReset: 'Reset Streak Counter',
      streakResetConfirm: 'Reset your streak counter to Day 1? Your output ledger history will be preserved.',
    },
    milestones: {
      title: 'Physiological & Neurochemical Milestones',
      subtitle: 'Witness the biological restoration of your nervous system as androgen receptors, dopamine pathways, and executive circuits heal over time.',
      currentProgress: 'Current Biological Phase',
      daysCompleted: 'Days Completed',
      stages: {
        day1: {
          title: 'Day 1: Neural Interruption & Baseline Reset',
          desc: 'Immediate cessation of compulsive dopamine spikes. The brain begins cooling down hyper-active reward pathways.',
          bio: 'Restores baseline autonomic balance; acute impulse frequency is highest during the first 48 hours.',
        },
        day3: {
          title: 'Day 3: Cortisol Normalization & Sleep Quality',
          desc: 'Sympathetic overdrive diminishes. REM sleep architecture starts stabilizing, increasing morning cognitive vigor.',
          bio: 'Serum cortisol drops toward circadian equilibrium; heart rate variability (HRV) begins trending upward.',
        },
        day7: {
          title: 'Day 7: Androgen Stabilization & Energy Surge',
          desc: 'Testosterone receptors upregulate and androgen utilization peaks. Noticeable increase in physical drive and assertive focus.',
          bio: 'Documented 145.7% baseline androgen spike and heightened androgen receptor density in prefrontal tissue.',
        },
        day14: {
          title: 'Day 14: Dopamine Receptor Re-sensitization',
          desc: 'D2 and D3 dopamine receptor density increases. Everyday activities, reading, and deep work feel substantially more rewarding.',
          bio: 'Reward pathway hypersensitivity declines; chronic cravings drop by over 60% as ventral striatum stabilizes.',
        },
        day30: {
          title: 'Day 30: Delta-FosB Cleansing & Profound Clarity',
          desc: 'The chronic transcription factor Delta-FosB begins clearing from the nucleus accumbens. Brain fog dissolves completely.',
          bio: 'Significant degradation of compulsive neuroplastic wiring; working memory and sustained concentration reach peak flow.',
        },
        day60: {
          title: 'Day 60: Prefrontal Cortex Structural Dominance',
          desc: 'Gray matter density in the dorsolateral prefrontal cortex increases. Impulse inhibition becomes virtually automatic.',
          bio: 'Executive control circuits override limbic hyper-reactivity with zero cognitive friction.',
        },
        day90: {
          title: 'Day 90: Master Transmutation & Autonomic Sovereignty',
          desc: 'Total neurochemical rebirth. Sexual and vital energy is fully integrated as a perpetual engine for monumental achievements.',
          bio: 'Permanent baseline homeostasis established; biological urge is transmuted effortlessly into world-class creative output.',
        },
      },
    },
    stealth: {
      bannerTitle: 'Stealth / Panic Mode Active',
      bannerNotice: 'Quick note-taking scratchpad. Press Esc or click Return to Vault when safe.',
      returnBtn: 'Return to Vault',
      notesTitle: 'Executive Scratchpad & Notes',
      lastSaved: 'Auto-saved to local browser storage',
      clearNotes: 'Clear Scratchpad',
    },
    privacyModal: {
      title: 'Local Vault & Privacy Controls',
      description: 'ForgeEnergy is engineered with strict zero-server privacy. No databases, no external APIs, no analytics. Everything resides exclusively in your browser localStorage.',
      clientSideOnly: '100% Client-Side Privacy Verification: Inspect network traffic in DevTools—zero outgoing tracking requests.',
      backupJson: 'Export Raw JSON Vault',
      backupEncrypted: 'Export AES-GCM Encrypted Backup',
      restoreJson: 'Restore Vault from File',
      passphraseLabel: 'Optional Encryption Passphrase',
      passphrasePlaceholder: 'Enter custom passphrase for military-grade AES-GCM encryption...',
      exportSuccess: 'Vault exported successfully to your downloads.',
      restoreSuccess: 'Vault successfully restored!',
      restoreError: 'Failed to restore: Invalid file or incorrect passphrase.',
      purgeTitle: 'Nuclear Option: Purge All Local Data',
      purgeDesc: 'Permanently deletes all streak counters, converted output logs, and notes from this browser. This cannot be undone.',
      purgeButton: 'Purge All Data Now',
      purgeConfirmPrompt: 'Type "DELETE" to permanently purge your ForgeEnergy vault:',
      close: 'Close Vault Controls',
    },
    footer: {
      zeroServerBadge: 'Zero-Server Architecture • 100% Privacy Guaranteed',
      zeroServerDetail: 'No server cookies, no cloud telemetry, no account required. Built for uncompromising privacy.',
      supportMe: 'Support the Developer on Buy Me a Coffee',
      madeWith: 'Forged for creators, engineers, and focused minds.',
      rights: 'ForgeEnergy Open Source • Hosted on GitHub Pages',
    },
  },
  es: {
    nav: {
      brand: 'ForgeEnergy',
      tagline: 'Bóveda de Trabajo Profundo',
      transmute: 'Transmutar Impulso',
      ledger: 'Registro de Energía',
      milestones: 'Hitos Biológicos',
      stealth: 'Modo Sigilo',
      support: 'Apoyar Creador',
      theme: 'Tema',
      language: 'Idioma',
      panicHint: 'Esc para sigilo instantáneo',
      menuToggle: 'Alternar menú de navegación',
    },
    hero: {
      badge: '100% En Tu Navegador • Cero Servidores • Privacidad Total',
      titleLine1: 'Alquimiza Impulsos Compulsivos en',
      titleAccent: 'Producción Creativa Imparable',
      titleLine2: 'Tu mente es una forja. Canaliza la energía primordial.',
      description: 'Una suite de productividad psicológica centrada en la privacidad absoluta. Transforma impulsos biológicos en código publicado, lectura profunda y fuerza física sin recolección de datos.',
      primaryCta: 'Transmutar Impulso Ahora',
      secondaryCta: 'Ver Registro de Energía',
      securityNote: 'Cifrado localmente. Cero analíticas. 100% funcional sin conexión.',
    },
    transmute: {
      title: 'Cámara de Transmutación',
      subtitle: 'Intercepta el impulso dopaminérgico. Calma el sistema nervioso, resignifica la energía y canalízala en enfoque creativo.',
      boxBreathingTab: 'Respiración Cuadrada (2 Min)',
      sprintTab: 'Sprint de Trabajo Profundo (15 Min)',
      startBreathing: 'Comenzar Ciclo de Respiración',
      pauseBreathing: 'Pausar Sesión',
      resetBreathing: 'Reiniciar Respiración',
      inhale: 'Inhala profundamente en el abdomen (4s)',
      holdIn: 'Retén con quietud y concentración (4s)',
      exhale: 'Exhala suavemente liberando la tensión (4s)',
      holdOut: 'Retén en vacío, arraigando tu poder (4s)',
      boxDesc: 'Respiración Táctica Navy SEAL: Estimula el nervio vago, disolviendo rápidamente la urgencia compulsiva.',
      cycleCount: 'Ciclo',
      sprintTitle: 'Forja de Flujo de 15 Minutos',
      sprintDesc: 'Canaliza la energía acumulada hacia un artefacto intelectual o creativo concreto.',
      sprintTaskPlaceholder: '¿Qué artefacto estás construyendo ahora? (ej. 300 líneas de código, leer 20 páginas)',
      startSprint: 'Iniciar Sprint de 15 Min',
      pauseSprint: 'Pausar Sprint',
      completeSprint: 'Completar y Registrar Logro',
      timeRemaining: 'Restante',
      soundToggle: 'Campanas de Enfoque',
      soundOn: 'Sonido Activado',
      soundOff: 'Sonido Silenciado',
      urgeSurfingQuotes: [
        'Un impulso es una ola oceánica. Crece, alcanza su pico en 2-3 minutos y se disuelve. No luches contra la ola: surféala.',
        'Esta urgencia es energía biológica pura. No la reprimas: canalízala hacia la maestría creativa y el trabajo profundo.',
        'Observa la sensación física sin juzgarla. ¿Dónde reside en tu cuerpo? Respira directamente hacia esa tensión.',
        'La dopamina busca desafíos. Ofrécele resolución de problemas complejos en lugar de consumo pasivo.',
        'La incomodidad de la autodisciplina transforma tu corteza prefrontal. Cada segundo de calma reprograma tu cerebro.',
      ],
      congratulationsUrgeTamed: '¡Impulso interceptado y transmutado con éxito! Registra este logro.',
      logThisOutput: 'Registrar Logro en la Bóveda',
    },
    ledger: {
      title: 'Registro de Energía Convertida',
      subtitle: 'Mide lo que importa: tus días de racha junto a logros tangibles y verificados en el mundo real.',
      streakTitle: 'Soberanía Continua',
      currentStreak: 'Racha Actual',
      longestStreak: 'Racha Máxima',
      days: 'Días',
      transmutations: 'Impulsos Transmutados',
      totalConvertedScore: 'Puntos de Energía',
      logOutputBtn: '+ Registrar Logro Forjado',
      formTitle: 'Registrar Producción Real',
      categoryLabel: 'Dominio de Transmutación',
      categories: {
        code: 'Software y Código (Líneas / Commits)',
        reading: 'Lectura Profunda y Estudio (Páginas)',
        workout: 'Entrenamiento Físico (Series / PRs)',
        writing: 'Escritura y Síntesis Estratégica (Palabras)',
        deepwork: 'Sprint de Concentración (Minutos)',
        custom: 'Producción Creativa Personalizada',
      },
      outputTitleLabel: 'Título del Logro',
      outputTitlePlaceholder: 'ej. Escribí 300 líneas en Rust, 25 páginas de Filosofía',
      amountLabel: 'Métrica de Cantidad',
      unitLabel: 'Unidad de Medida',
      notesLabel: 'Reflexión y Estado Mental (Opcional)',
      notesPlaceholder: '¿Cómo se sintió canalizar el impulso? ¿Qué avance lograste?',
      submitLog: 'Guardar en Registro Local',
      cancel: 'Cancelar',
      emptyLedger: 'Aún no hay logros registrados. Cuando sientas una urgencia, ¡intercéptala y regístrala aquí!',
      recentOutputs: 'Logros Recientes Convertidos',
      deleteConfirm: '¿Deseas eliminar este registro?',
      streakAdvance: '+1 Día Completado',
      streakReset: 'Reiniciar Contador de Racha',
      streakResetConfirm: '¿Reiniciar tu contador al Día 1? Tu historial de logros se mantendrá.',
    },
    milestones: {
      title: 'Hitos Fisiológicos y Neuroquímicos',
      subtitle: 'Monitorea la recuperación de tus receptores de dopamina, circuitos ejecutivos y balance hormonal.',
      currentProgress: 'Fase Biológica Actual',
      daysCompleted: 'Días Completados',
      stages: {
        day1: {
          title: 'Día 1: Interrupción Neural y Reseteo Inicial',
          desc: 'Cese inmediato de picos artificiales de dopamina. Las vías hiperactivadas comienzan a estabilizarse.',
          bio: 'Recuperación del equilibrio autonómico. Las primeras 48 horas representan el mayor desafío.',
        },
        day3: {
          title: 'Día 3: Normalización de Cortisol y Sueño Profundo',
          desc: 'Disminución del estrés simpático. La fase REM del sueño se consolida, incrementando el vigor matutino.',
          bio: 'El cortisol sérico desciende hacia niveles circadianos equilibrados; mejora la variabilidad cardíaca.',
        },
        day7: {
          title: 'Día 7: Estabilización Androgénica y Vigor',
          desc: 'Pico de utilización de receptores de testosterona. Notorio incremento en determinación y energía física.',
          bio: 'Incremento comprobado de hasta un 145% en la sensibilidad androgénica en tejidos prefrontales.',
        },
        day14: {
          title: 'Día 14: Resensibilización de Receptores D2/D3',
          desc: 'Aumenta la densidad de receptores de dopamina. Leer, programar y crear vuelven a ser profundamente placenteros.',
          bio: 'Los impulsos crónicos caen más de un 60% al equilibrarse el estriado ventral.',
        },
        day30: {
          title: 'Día 30: Depuración de Delta-FosB y Claridad Mental',
          desc: 'El factor de transcripción Delta-FosB se elimina del núcleo accumbens. La niebla mental desaparece por completo.',
          bio: 'Desmantelamiento significativo de circuitos adictivos; memoria de trabajo y foco al máximo.',
        },
        day60: {
          title: 'Día 60: Dominio Estructural de la Corteza Prefrontal',
          desc: 'Mayor densidad de materia gris prefrontal. El autocontrol y la inhibición de impulsos se vuelven automáticos.',
          bio: 'Los circuitos ejecutivos prevalecen sobre las respuestas límbicas sin fricción cognitiva.',
        },
        day90: {
          title: 'Día 90: Transmutación Maestra y Soberanía Total',
          desc: 'Renacimiento neuroquímico completo. La energía vital se integra perpetuamente como motor de vida.',
          bio: 'Homeostasis permanente lograda; el impulso biológico se transmuta sin esfuerzo en creación.',
        },
      },
    },
    stealth: {
      bannerTitle: 'Modo Sigilo / Pánico Activo',
      bannerNotice: 'Bloc de notas ejecutivo inocente. Presiona Esc o haz clic en Volver a la Bóveda cuando sea seguro.',
      returnBtn: 'Volver a la Bóveda',
      notesTitle: 'Bloc de Notas y Proyectos',
      lastSaved: 'Guardado automáticamente en tu navegador',
      clearNotes: 'Limpiar Notas',
    },
    privacyModal: {
      title: 'Bóveda Local y Privacidad Cero Servidor',
      description: 'ForgeEnergy opera con estricta privacidad local. Sin bases de datos externas, cookies ni rastreo. Todos tus datos residen únicamente en tu dispositivo.',
      clientSideOnly: 'Verificación 100% Lado del Cliente: Puedes inspeccionar la pestaña Red en DevTools: cero peticiones salientes.',
      backupJson: 'Exportar Bóveda en JSON',
      backupEncrypted: 'Exportar Backup Cifrado AES-GCM',
      restoreJson: 'Restaurar Bóveda desde Archivo',
      passphraseLabel: 'Contraseña de Cifrado (Opcional)',
      passphrasePlaceholder: 'Introduce una clave para cifrado militar AES-256...',
      exportSuccess: 'Bóveda exportada exitosamente a tus descargas.',
      restoreSuccess: '¡Bóveda restaurada correctamente!',
      restoreError: 'Error al restaurar: Archivo inválido o contraseña incorrecta.',
      purgeTitle: 'Opción Nuclear: Eliminar Todos los Datos',
      purgeDesc: 'Elimina permanentemente rachas, registros y notas de este navegador. Esta acción es irreversible.',
      purgeButton: 'Eliminar Todo Ahora',
      purgeConfirmPrompt: 'Escribe "DELETE" para confirmar la eliminación permanente:',
      close: 'Cerrar Controles',
    },
    footer: {
      zeroServerBadge: 'Arquitectura Cero Servidor • Privacidad 100% Garantizada',
      zeroServerDetail: 'Sin cookies, sin analíticas, sin cuenta requerida. Diseñado para privacidad absoluta.',
      supportMe: 'Apoya al Desarrollador en Buy Me a Coffee',
      madeWith: 'Forjado para creadores, ingenieros y mentes disciplinadas.',
      rights: 'ForgeEnergy Código Abierto • Alojado en GitHub Pages',
    },
  },
  fr: {
    nav: {
      brand: 'ForgeEnergy',
      tagline: 'Chambre de Travail Profond',
      transmute: 'Transmuer l’Élan',
      ledger: 'Registre d’Énergie',
      milestones: 'Étapes Biologiques',
      stealth: 'Mode Furtif',
      support: 'Soutenir le Dév',
      theme: 'Thème',
      language: 'Langue',
      panicHint: 'Échap pour mode furtif immédiat',
      menuToggle: 'Afficher le menu de navigation',
    },
    hero: {
      badge: '100% Côté Client • Zéro Serveur • Zéro Traçage',
      titleLine1: 'Alchimisez les Pulsions Compulsives en',
      titleAccent: 'Rendement Créatif Inarrêtable',
      titleLine2: 'Votre esprit est une forge. Maîtrisez l’énergie primordiale.',
      description: 'Une suite de productivité psychologique axée sur la confidentialité totale. Convertissez les impulsions biologiques en code expédié, lecture profonde et force physique sans aucune collecte de données.',
      primaryCta: 'Transmuer l’Élan Maintenant',
      secondaryCta: 'Consulter le Registre',
      securityNote: 'Chiffré localement. Zéro télémétrie. 100% fonctionnel hors ligne.',
    },
    transmute: {
      title: 'Chambre de Transmutation',
      subtitle: 'Interceptez l’impulsion dopaminergique. Apaisez le système nerveux et canalisez l’énergie vers un élan créatif concret.',
      boxBreathingTab: 'Respiration Carrée (2 Min)',
      sprintTab: 'Sprint de Travail Profond (15 Min)',
      startBreathing: 'Lancer le Cycle Respiratoire',
      pauseBreathing: 'Pause',
      resetBreathing: 'Réinitialiser',
      inhale: 'Inspirez profondément par le ventre (4s)',
      holdIn: 'Retenez dans le calme et l’ancrage (4s)',
      exhale: 'Expirez lentement l’impulsion (4s)',
      holdOut: 'Poumons vides, ancrage de votre puissance (4s)',
      boxDesc: 'Respiration Tactique des Navy SEALs : Stimule le nerf vague, apaisant le système nerveux et neutralisant les compulsions.',
      cycleCount: 'Cycle',
      sprintTitle: 'Sprint de Concentration de 15 Min',
      sprintDesc: 'Orientez l’énergie accumulée vers un artefact intellectuel ou créatif de haute valeur.',
      sprintTaskPlaceholder: 'Quel artefact créez-vous en ce moment ? (ex. 200 lignes de code, 15 pages lues)',
      startSprint: 'Lancer le Sprint de 15 Min',
      pauseSprint: 'Pause Sprint',
      completeSprint: 'Terminer & Enregistrer l’Énergie',
      timeRemaining: 'Temps Restant',
      soundToggle: 'Sons de Méditation',
      soundOn: 'Sons Activés',
      soundOff: 'Sons Coupés',
      urgeSurfingQuotes: [
        'Une envie compulsive est comme une vague. Elle monte, atteint son pic en 2 à 3 minutes puis disparaît. Ne combattez pas la vague : surfez-la.',
        'Cette impulsion est une énergie vitale pure. Ne la refoulez pas : transmutez-la en maîtrise créative et travail profond.',
        'Observez la sensation corporelle sans jugement. Respirez directement dans la zone de tension.',
        'Votre cerveau a soif de défi. Offrez-lui la résolution d’un problème intellectuel complexe plutôt qu’une distraction vide.',
        'La discipline volontaire restructure votre cortex préfrontal. Chaque seconde d’immobilité renforce votre souveraineté.',
      ],
      congratulationsUrgeTamed: 'Impulsion interceptée et transmutée avec succès ! Enregistrez votre résultat.',
      logThisOutput: 'Consigner dans le Registre',
    },
    ledger: {
      title: 'Registre de l’Énergie Convertie',
      subtitle: 'Mesurez l’essentiel : suivez vos jours consécutifs de souveraineté ainsi que vos accomplissements concrets.',
      streakTitle: 'Souveraineté Continue',
      currentStreak: 'Série Actuelle',
      longestStreak: 'Série Record',
      days: 'Jours',
      transmutations: 'Pulsions Interceptées',
      totalConvertedScore: 'Points d’Énergie',
      logOutputBtn: '+ Enregistrer un Accomplissement',
      formTitle: 'Consigner un Résultat Tangible',
      categoryLabel: 'Domaine de Transmutation',
      categories: {
        code: 'Logiciel & Code (Lignes / Commits)',
        reading: 'Lecture Approfondie & Étude (Pages)',
        workout: 'Entraînement Physique (Séries / PRs)',
        writing: 'Écriture & Synthèse (Mots / Articles)',
        deepwork: 'Sprint de Travail Profond (Minutes)',
        custom: 'Création Personnalisée',
      },
      outputTitleLabel: 'Titre de l’Accomplissement',
      outputTitlePlaceholder: 'ex. 300 lignes écrites en TypeScript, 20 pages de Marc Aurèle',
      amountLabel: 'Quantité',
      unitLabel: 'Unité de Mesure',
      notesLabel: 'Réflexion & État Cognitif (Optionnel)',
      notesPlaceholder: 'Comment s’est passée la canalisation de l’énergie ?',
      submitLog: 'Forger dans le Registre Local',
      cancel: 'Annuler',
      emptyLedger: 'Aucun résultat consigné. Dès qu’une envie surgit, interceptez-la et notez votre accomplissement ici !',
      recentOutputs: 'Accomplissements Récemment Forgés',
      deleteConfirm: 'Confirmer la suppression de cette entrée ?',
      streakAdvance: '+1 Jour Validé',
      streakReset: 'Réinitialiser la Série',
      streakResetConfirm: 'Réinitialiser votre série au Jour 1 ? Votre historique sera préservé.',
    },
    milestones: {
      title: 'Étapes Physiologiques & Neurochimiques',
      subtitle: 'Suivez la régénération de vos récepteurs dopaminergiques, de votre cortex préfrontal et de votre équilibre hormonal.',
      currentProgress: 'Phase Biologique Actuelle',
      daysCompleted: 'Jours Accomplis',
      stages: {
        day1: {
          title: 'Jour 1 : Interruption Neuronale & Réinitialisation',
          desc: 'Arrêt immédiat des pics artificiels de dopamine. Le cerveau commence à calmer les circuits de récompense.',
          bio: 'Rééquilibrage du système autonome. Les premières 48 heures concentrent l’intensité des pulsions.',
        },
        day3: {
          title: 'Jour 3 : Baisse du Cortisol & Sommeil Réparateur',
          desc: 'L’hyperactivité sympathique s’estompe. Les cycles de sommeil paradoxal se stabilisent.',
          bio: 'Le cortisol sérique rejoint son rythme circadien ; la variabilité de fréquence cardiaque s’améliore.',
        },
        day7: {
          title: 'Jour 7 : Pic Androgénique & Regain d’Énergie',
          desc: 'Augmentation de la sensibilité des récepteurs à la testostérone. Clarté mentale et vitalité physique décuplées.',
          bio: 'Élévation mesurée de 145% de la réactivité androgénique dans les tissus préfrontaux.',
        },
        day14: {
          title: 'Jour 14 : Resensibilisation des Récepteurs D2/D3',
          desc: 'La densité des récepteurs dopaminergiques remonte. Les activités intellectuelles redeviennent profondément gratifiantes.',
          bio: 'Diminution de plus de 60% des envies compulsives avec la stabilisation du striatum ventral.',
        },
        day30: {
          title: 'Jour 30 : Élimination de Delta-FosB & Clarté Absolue',
          desc: 'Le facteur Delta-FosB est éliminé du noyau accumbens. Le brouillard cérébral se dissipe totalement.',
          bio: 'Dégradation marquée des circuits d’accoutumance ; mémoire de travail et concentration optimales.',
        },
        day60: {
          title: 'Jour 60 : Suprématie du Cortex Préfrontal',
          desc: 'La densité de matière grise préfrontale augmente. La résistance aux impulsions devient un automatisme.',
          bio: 'Les fonctions exécutives contrôlent sans effort les pulsions limbiques.',
        },
        day90: {
          title: 'Jour 90 : Transmutation Totale & Souveraineté',
          desc: 'Renaissance neurochimique pérenne. L’énergie vitale est pleinement intégrée comme moteur de vie.',
          bio: 'Homéostasie neuronale stable ; l’impulsion naturelle alimente l’excellence au quotidien.',
        },
      },
    },
    stealth: {
      bannerTitle: 'Mode Furtif / Anti-Panique Activé',
      bannerNotice: 'Bloc-notes discret. Appuyez sur Échap ou cliquez sur Retour à la Chambre.',
      returnBtn: 'Retour à la Chambre',
      notesTitle: 'Bloc-Notes & Projets Personnels',
      lastSaved: 'Enregistré localement dans votre navigateur',
      clearNotes: 'Effacer les Notes',
    },
    privacyModal: {
      title: 'Chambre Forte & Zéro Serveur',
      description: 'ForgeEnergy respecte une stricte confidentialité sans serveur. Aucune base de données, aucun cookie, aucun suivi externe.',
      clientSideOnly: 'Vérification 100% Côté Client : Inspectez l’onglet Réseau de vos outils développeur — aucune requête externe.',
      backupJson: 'Exporter la Bóveda en JSON',
      backupEncrypted: 'Exporter une Sauvegarde Chiffrée AES-GCM',
      restoreJson: 'Restaurer depuis un Fichier',
      passphraseLabel: 'Mot de Passe de Chiffrement (Optionnel)',
      passphrasePlaceholder: 'Entrez une clé pour le chiffrement militaire AES-256...',
      exportSuccess: 'Sauvegarde exportée avec succès dans vos Téléchargements.',
      restoreSuccess: 'Données restaurées avec succès !',
      restoreError: 'Échec de la restauration : fichier non valide ou mot de passe incorrect.',
      purgeTitle: 'Option Nucléaire : Supprimer Toutes les Données',
      purgeDesc: 'Supprime définitivement vos séries, accomplissements et notes. Cette action est irréversible.',
      purgeButton: 'Tout Supprimer Définitivement',
      purgeConfirmPrompt: 'Tapez "DELETE" pour confirmer la suppression définitive :',
      close: 'Fermer',
    },
    footer: {
      zeroServerBadge: 'Architecture Zéro Serveur • Confidentialité 100% Garantie',
      zeroServerDetail: 'Sans cookies, sans cloud, sans compte. Conçu pour une vie privée absolue.',
      supportMe: 'Soutenir le Développeur sur Buy Me a Coffee',
      madeWith: 'Forgé pour les créateurs, ingénieurs et esprits disciplinés.',
      rights: 'ForgeEnergy Open Source • Hébergé sur GitHub Pages',
    },
  },
  pt: {
    nav: {
      brand: 'ForgeEnergy',
      tagline: 'Cofre de Trabalho Profundo',
      transmute: 'Transmutar Impulso',
      ledger: 'Registro de Energia',
      milestones: 'Marcos Biológicos',
      stealth: 'Modo Furtivo',
      support: 'Apoiar Criador',
      theme: 'Tema',
      language: 'Idioma',
      panicHint: 'Esc para modo furtivo imediato',
      menuToggle: 'Alternar menu de navegação',
    },
    hero: {
      badge: '100% no Navegador • Zero Servidores • Zero Rastreamento',
      titleLine1: 'Alquimize Impulsos Compulsivos em',
      titleAccent: 'Produção Criativa Imparável',
      titleLine2: 'Sua mente é uma forja. Domine a energia primordial.',
      description: 'Uma suíte de produtividade psicológica focada na privacidade. Converta impulsos biológicos em código, leitura profunda e força física com zero envio de dados a servidores.',
      primaryCta: 'Transmutar Impulso Agora',
      secondaryCta: 'Ver Registro de Energia',
      securityNote: 'Criptografado localmente. Zero telemetria. 100% offline.',
    },
    transmute: {
      title: 'Câmara de Transmutação',
      subtitle: 'Interrompa o ciclo da dopamina. Acalme o sistema nervoso e canalize a energia diretamente para a ação criativa.',
      boxBreathingTab: 'Respiração Quadrada (2 Min)',
      sprintTab: 'Sprint de Foco Profundo (15 Min)',
      startBreathing: 'Iniciar Ciclo Respiratório',
      pauseBreathing: 'Pausar',
      resetBreathing: 'Reiniciar',
      inhale: 'Inspire profundamente pelo abdômen (4s)',
      holdIn: 'Retenha com quietude e presença (4s)',
      exhale: 'Expire suavemente liberando a urgência (4s)',
      holdOut: 'Retenha em vazio, ancorando seu poder (4s)',
      boxDesc: 'Respiração Tática dos Navy SEALs: Estimula o nervo vago, reduzindo a tensão e dissolvendo impulsos compulsivos.',
      cycleCount: 'Ciclo',
      sprintTitle: 'Sprint de Fluxo de 15 Minutos',
      sprintDesc: 'Canalize a energia mobilizada para um artefato intelectual ou físico concreto.',
      sprintTaskPlaceholder: 'Qual artefato você está criando agora? (ex: 250 linhas de código, 20 páginas de leitura)',
      startSprint: 'Iniciar Sprint de 15 Min',
      pauseSprint: 'Pausar Sprint',
      completeSprint: 'Concluir e Registrar Produção',
      timeRemaining: 'Tempo Restante',
      soundToggle: 'Sons Harmônicos',
      soundOn: 'Sons Ativados',
      soundOff: 'Sons Desativados',
      urgeSurfingQuotes: [
        'Um impulso é como uma onda do oceano. Ela cresce, atinge o ápice em 2 a 3 minutos e se dissipa. Não lute contra a onda: surfe-a.',
        'Esta urgência é pura potência biológica. Não a reprima: transmutte-a em maestria intelectual e trabalho focado.',
        'Observe a sensação somática sem julgamentos. Onde ela reside no seu corpo? Respire nessa área de tensão.',
        'Seu cérebro anseia por novidade. Dê a ele resolução de problemas complexos em vez de dopamina rápida.',
        'O desconforto da disciplina fortalece o córtex pré-frontal. Cada segundo de quietude reprograma seu cérebro.',
      ],
      congratulationsUrgeTamed: 'Impulso interceptado e transmutado com sucesso! Registre sua conquista.',
      logThisOutput: 'Registrar Conquista no Cofre',
    },
    ledger: {
      title: 'Registro de Energia Convertida',
      subtitle: 'Monitore o que importa: seus dias consecutivos de disciplina ao lado de conquistas reais e verificadas.',
      streakTitle: 'Soberania Contínua',
      currentStreak: 'Sequência Atual',
      longestStreak: 'Sequência Recorde',
      days: 'Dias',
      transmutations: 'Impulsos Transmutados',
      totalConvertedScore: 'Pontos de Energia',
      logOutputBtn: '+ Registrar Nova Conquista',
      formTitle: 'Registrar Produção Real',
      categoryLabel: 'Domínio de Transmutação',
      categories: {
        code: 'Software & Código (Linhas / Commits)',
        reading: 'Leitura Profunda & Estudos (Páginas)',
        workout: 'Treino Físico (Séries / PRs)',
        writing: 'Escrita & Síntese Estratégica (Palavras)',
        deepwork: 'Sprint de Trabalho Profundo (Minutos)',
        custom: 'Produção Criativa Personalizada',
      },
      outputTitleLabel: 'Título da Conquista',
      outputTitlePlaceholder: 'ex: Escrevi 350 linhas de Go, 20 páginas de Filosofia',
      amountLabel: 'Quantidade',
      unitLabel: 'Unidade de Medida',
      notesLabel: 'Reflexão & Estado Mental (Opcional)',
      notesPlaceholder: 'Como foi a canalização da energia? Qual avanço você teve?',
      submitLog: 'Forjar no Registro Local',
      cancel: 'Cancelar',
      emptyLedger: 'Nenhum resultado registrado ainda. Ao sentir um impulso, controle-o e registre aqui sua vitória!',
      recentOutputs: 'Conquistas Recentes Forjadas',
      deleteConfirm: 'Tem certeza de que deseja excluir este registro?',
      streakAdvance: '+1 Dia Validado',
      streakReset: 'Reiniciar Sequência',
      streakResetConfirm: 'Deseja reiniciar sua sequência para o Dia 1? Seu histórico será mantido.',
    },
    milestones: {
      title: 'Marcos Fisiológicos & Neuroquímicos',
      subtitle: 'Acompanhe a regeneração dos receptores de dopamina, circuitos executivos e equilíbrio hormonal.',
      currentProgress: 'Fase Biológica Atual',
      daysCompleted: 'Dias Concluídos',
      stages: {
        day1: {
          title: 'Dia 1: Interrupção Neural & Reinicialização',
          desc: 'Cessação imediata dos picos compulsivos de dopamina. O cérebro inicia o processo de estabilização.',
          bio: 'Restauração do equilíbrio autonômico. As primeiras 48 horas concentram a maior intensidade de impulsos.',
        },
        day3: {
          title: 'Dia 3: Normalização do Cortisol & Sono Reparador',
          desc: 'O estresse simpático diminui. O sono REM se estabiliza, aumentando a vitalidade ao acordar.',
          bio: 'O cortisol sérico atinge o ritmo circadiano saudável; variabilidade da frequência cardíaca melhora.',
        },
        day7: {
          title: 'Dia 7: Estabilização Androgênica & Impulso Vital',
          desc: 'Sensibilidade dos receptores de testosterona atinge o ápice. Aumento marcante na determinação e foco.',
          bio: 'Comprovado aumento de até 145% na receptividade androgênica no córtex pré-frontal.',
        },
        day14: {
          title: 'Dia 14: Ressensibilização dos Receptores D2/D3',
          desc: 'A densidade dos receptores dopaminérgicos cresce. Atividades simples e intelectuais voltam a ser prazerosas.',
          bio: 'Desejos compulsivos caem mais de 60% com a estabilização do estriado ventral.',
        },
        day30: {
          title: 'Dia 30: Eliminação de Delta-FosB & Clareza Mental',
          desc: 'A proteína Delta-FosB é depurada do núcleo accumbens. A névoa cerebral se dissipa por completo.',
          bio: 'Desmantelamento de conexões compulsivas; memória de trabalho e concentração em nível máximo.',
        },
        day60: {
          title: 'Dia 60: Domínio Estrutural do Córtex Pré-Frontal',
          desc: 'Maior densidade de matéria cinzenta pré-frontal. O autocontrole torna-se virtualmente automático.',
          bio: 'Circuitos executivos controlam respostas límbicas sem fricção cognitiva.',
        },
        day90: {
          title: 'Dia 90: Transmutação Suprema & Soberania Total',
          desc: 'Renascimento neuroquímico permanente. A energia vital é totalmente canalizada para realizações de vida.',
          bio: 'Homeostase completa estabelecida; impulsos biológicos impulsionam criação constante de alto nível.',
        },
      },
    },
    stealth: {
      bannerTitle: 'Modo Furtivo / Pânico Ativo',
      bannerNotice: 'Bloco de notas discreto. Pressione Esc ou clique em Voltar ao Cofre quando for seguro.',
      returnBtn: 'Voltar ao Cofre',
      notesTitle: 'Bloco de Notas & Projetos',
      lastSaved: 'Salvo localmente no seu navegador',
      clearNotes: 'Limpar Notas',
    },
    privacyModal: {
      title: 'Cofre Local & Privacidade Zero Servidor',
      description: 'O ForgeEnergy foi projetado com estrita privacidade local. Sem servidores, sem banco de dados externo, sem rastreamento.',
      clientSideOnly: 'Verificação 100% no Navegador: Inspecione a aba Rede nas ferramentas de desenvolvedor — zero chamadas externas.',
      backupJson: 'Exportar Cofre em JSON',
      backupEncrypted: 'Exportar Backup Criptografado AES-GCM',
      restoreJson: 'Restaurar a partir de Arquivo',
      passphraseLabel: 'Senha de Criptografia (Opcional)',
      passphrasePlaceholder: 'Digite uma senha para criptografia militar AES-256...',
      exportSuccess: 'Cofre exportado com sucesso para seus downloads.',
      restoreSuccess: 'Cofre restaurado com sucesso!',
      restoreError: 'Falha ao restaurar: arquivo inválido ou senha incorreta.',
      purgeTitle: 'Opção Nuclear: Excluir Todos os Dados',
      purgeDesc: 'Apaga permanentemente sequências, registros e notas deste navegador. Não pode ser desfeito.',
      purgeButton: 'Excluir Tudo Agora',
      purgeConfirmPrompt: 'Digite "DELETE" para confirmar a exclusão permanente:',
      close: 'Fechar',
    },
    footer: {
      zeroServerBadge: 'Arquitetura Zero Servidor • Privacidade 100% Garantida',
      zeroServerDetail: 'Sem cookies, sem nuvem, sem login. Criado para privacidade intransigente.',
      supportMe: 'Apoie o Desenvolvedor no Buy Me a Coffee',
      madeWith: 'Forjado para criadores, programadores e mentes disciplinadas.',
      rights: 'ForgeEnergy Código Aberto • Hospedado no GitHub Pages',
    },
  },
  ja: {
    nav: {
      brand: 'ForgeEnergy',
      tagline: 'ディープワーク・ヴォールト',
      transmute: '衝動の昇華',
      ledger: '変換台帳',
      milestones: '生体マイルストーン',
      stealth: 'ステルスモード',
      support: '開発者を支援',
      theme: 'テーマ',
      language: '言語',
      panicHint: 'Escで即時ステルス',
      menuToggle: 'ナビゲーションメニューを開閉',
    },
    hero: {
      badge: '100% ブラウザ内完結 • サーバー通信ゼロ • 追跡ゼロ',
      titleLine1: '強迫的な衝動を',
      titleAccent: '圧倒的な創造的成果へ昇華せよ',
      titleLine2: '精神は鍛冶場である。根源的な生体エネルギーを制御せよ。',
      description: '完全プライバシー設計の心理的生産性スイート。生物学的衝動をコード実装、深い読書、筋力鍛錬、高密度な集中力へと変換。データは一切端末外へ送信されません。',
      primaryCta: '衝動を今すぐ昇華する',
      secondaryCta: '変換台帳を見る',
      securityNote: 'ローカル暗号化保存 • アナリティクス皆無 • 完全オフライン動作',
    },
    transmute: {
      title: 'エネルギー昇華チャンバー',
      subtitle: 'ドーパミンの衝動を瞬時に遮断。自律神経を整え、生物学的エネルギーを実世界の創造的運動量へと転換します。',
      boxBreathingTab: '2分間 ボックス呼吸 (Navy SEALs)',
      sprintTab: '15分間 ディープワーク・スプリント',
      startBreathing: '呼吸サイクルを開始',
      pauseBreathing: '一時停止',
      resetBreathing: 'リセット',
      inhale: '腹部へ深く息を吸い込む (4秒)',
      holdIn: '静寂の中で息を止め集中 (4秒)',
      exhale: '衝動を緩やかに吐き出す (4秒)',
      holdOut: '息を吐き切って平静を保つ (4秒)',
      boxDesc: '米海軍特殊部隊（Navy SEALs）戦術的呼吸法：迷走神経を刺激し、交感神経の過剰興奮を鎮静化させます。',
      cycleCount: 'サイクル',
      sprintTitle: '15分間 フロー状態鍛造',
      sprintDesc: '喚起された生体エネルギーを、単一の高価値な知的・物理的成果物へと注ぎ込みます。',
      sprintTaskPlaceholder: 'いま何を創り出していますか？ (例: Rustで200行実装、名著を20ページ精読)',
      startSprint: '15分スプリント開始',
      pauseSprint: '一時停止',
      completeSprint: '完了して成果を台帳に記録',
      timeRemaining: '残り時間',
      soundToggle: 'シンギングボウル音',
      soundOn: '瞑想ベル有効',
      soundOff: '消音中',
      urgeSurfingQuotes: [
        '衝動は海の波のようなものです。高まり、2〜3分で頂点に達し、やがて引いていきます。波と戦うのではなく、波に乗るのです（アージ・サーフィン）。',
        'この衝動は根源的な生命力です。抑圧するのではなく、創造的成果と深い集中への燃料として昇華させてください。',
        '身体のどの部位に感覚があるかを静かに観察してください。その緊張へ向けて深く息を送り込みます。',
        'ドーパミンは挑戦を求めています。受動的な消費ではなく、複雑な問題の解決という刺激を与えてください。',
        '衝動を意志で制する瞬間、前頭前野の神経回路が劇的に強化されます。',
      ],
      congratulationsUrgeTamed: '衝動の制御と昇華に成功しました！ このエネルギーを成果として記録しましょう。',
      logThisOutput: '台帳に成果を記録する',
    },
    ledger: {
      title: 'エネルギー変換台帳',
      subtitle: '真に価値あるものを計測する。衝動の制御から鍛造された、現実世界の具体的かつ検証可能な成果を記録します。',
      streakTitle: '主権の継続日数',
      currentStreak: '現在の連続日数',
      longestStreak: '最長連続日数',
      days: '日',
      transmutations: '昇華成功セッション',
      totalConvertedScore: '鍛造エネルギーPTS',
      logOutputBtn: '+ 変換成果を記録',
      formTitle: '現実世界の成果を記録',
      categoryLabel: '昇華領域',
      categories: {
        code: 'ソフトウェア＆開発（行数 / PR / コミット）',
        reading: '精読＆研究（読破ページ / 章）',
        workout: 'フィジカルトレーニング（セット / PR）',
        writing: '執筆＆戦略的思考（文字数 / 原稿）',
        deepwork: 'ディープワーク集中（集中分数）',
        custom: 'その他クリエイティブ成果',
      },
      outputTitleLabel: '成果のタイトル',
      outputTitlePlaceholder: '例: Go言語で300行リファクタリング、ストア派哲学を25ページ精読',
      amountLabel: '数値',
      unitLabel: '単位',
      notesLabel: '内省と認知状態（任意）',
      notesPlaceholder: '衝動を転換した際、どのような閃きや感覚が得られましたか？',
      submitLog: '永続台帳に鍛造する',
      cancel: 'キャンセル',
      emptyLedger: 'まだ記録された成果はありません。衝動を感じたらすぐに制御し、ここに創造的成果を刻みましょう！',
      recentOutputs: '最近鍛造された成果一覧',
      deleteConfirm: 'この記録を削除してもよろしいですか？',
      streakAdvance: '+1日チェックイン',
      streakReset: '日数をリセット',
      streakResetConfirm: '連続日数を1日に戻しますか？ 変換台帳の履歴は保持されます。',
    },
    milestones: {
      title: '生体および神経化学的マイルストーン',
      subtitle: 'アンドロゲン受容体、ドーパミン神経回路、前頭前野の機能が段階的に修復・強化される過程を可視化します。',
      currentProgress: '現在の生物学的フェーズ',
      daysCompleted: '達成日数',
      stages: {
        day1: {
          title: '1日目：神経遮断とベースラインのリセット',
          desc: '強迫的ドーパミンスパイクの停止。過剰興奮していた報酬系経路の冷却が始まります。',
          bio: '自律神経の基本バランスが回復。最初の48時間は最も衝動頻度が高い重要な関門です。',
        },
        day3: {
          title: '3日目：コルチゾール正常化と深い睡眠',
          desc: '交感神経の過緊張が緩和。レム睡眠の構造が安定し、朝の認知活力が向上します。',
          bio: '血清コルチゾールが正常リズムに戻り、心拍変動（HRV）の改善が観察されます。',
        },
        day7: {
          title: '7日目：アンドロゲン受容体の活性化とエネルギー上昇',
          desc: 'テストステロン利用効率がピークに達します。決断力、行動力、身体的推進力が著しく高まります。',
          bio: '前頭前野組織におけるアンドロゲン受容体密度の著しい向上とベースラインの上昇が確認されています。',
        },
        day14: {
          title: '14日目：ドーパミンD2/D3受容体の再感受性化',
          desc: '受容体密度が回復。読書やプログラミング、日常の創作活動から深い充実感を得られるようになります。',
          bio: '腹側線条体が安定し、慢性的な衝動発生率が60%以上低下します。',
        },
        day30: {
          title: '30日目：Delta-FosBの浄化と明瞭な頭脳',
          desc: '側坐核に蓄積していた依存性転写因子Delta-FosBが分解。脳のモヤ（ブレインフォグ）が完全消滅します。',
          bio: '強迫的神経配線の退行。ワーキングメモリと持続的集中力が至高の領域へ到達します。',
        },
        day60: {
          title: '60日目：背外側前頭前野の構造的支配',
          desc: '前頭葉灰白質密度が向上。衝動に対する抑制制御がほぼ無意識的・自動的に行われるようになります。',
          bio: '実行機能回路が大脳辺縁系の衝動反応を完全に統制下に置きます。',
        },
        day90: {
          title: '90日目：完全なる昇華と精神の絶対的主権',
          desc: '神経化学的再誕。生体エネルギーが生涯にわたる偉大な創造的推進力へと完全に統合されます。',
          bio: '恒久的な神経恒常性の確立。生物学的衝動は、世界水準の成果を生み出す純粋な力へ無摩擦で変換されます。',
        },
      },
    },
    stealth: {
      bannerTitle: 'ステルス / 緊急隠蔽モード作動中',
      bannerNotice: '日常的なメモ帳です。安全になったら Esc キーまたは「ヴォールトへ戻る」をクリックしてください。',
      returnBtn: 'ヴォールトへ戻る',
      notesTitle: 'エグゼクティブ・プロジェクトメモ',
      lastSaved: '端末のローカルストレージへ自動保存済み',
      clearNotes: 'メモを消去',
    },
    privacyModal: {
      title: 'ローカルヴォールト ＆ プライバシー管理',
      description: 'ForgeEnergyは厳格なゼロサーバー構造を採用しています。外部DB、クッキー、計測タグは皆無であり、全データはお使いのブラウザ内のみに保管されます。',
      clientSideOnly: '100% クライアントサイド検証：開発者ツールのネットワークタブをご確認ください。外部通信は一切発生しません。',
      backupJson: '平文JSONバックアップを出力',
      backupEncrypted: 'AES-GCM暗号化バックアップを出力',
      restoreJson: 'ファイルからヴォールトを復元',
      passphraseLabel: '暗号化パスフレーズ（任意）',
      passphrasePlaceholder: '軍用級AES-256暗号化のためのパスフレーズを入力...',
      exportSuccess: 'バックアップファイルがダウンロードされました。',
      restoreSuccess: 'ヴォールトデータが正常に復元されました！',
      restoreError: '復元に失敗しました。ファイルまたはパスフレーズをご確認ください。',
      purgeTitle: '完全初期化：全ローカルデータの消去',
      purgeDesc: 'この端末に保存された日数、台帳、メモを完全に削除します。この操作は取り消せません。',
      purgeButton: '全データを今すぐ消去',
      purgeConfirmPrompt: '削除を確定するには「DELETE」と半角入力してください：',
      close: '閉じる',
    },
    footer: {
      zeroServerBadge: 'ゼロサーバー・アーキテクチャ • 100% プライバシー保証',
      zeroServerDetail: 'クッキーなし、クラウドなし、アカウント不要。完全な個人主権のために設計されています。',
      supportMe: 'Buy Me a Coffee で開発者を支援する',
      madeWith: '規律あるクリエイター、エンジニア、思索者のために。',
      rights: 'ForgeEnergy オープンソース • GitHub Pages にてホスト',
    },
  },
};
