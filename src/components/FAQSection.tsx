import React, { useState } from 'react';
import type { Locale } from '../i18n/translations';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

interface FAQSectionProps {
  currentLocale: Locale;
}

interface FAQItem {
  q: string;
  a: string;
}

const faqData: Record<Locale, { title: string; subtitle: string; items: FAQItem[] }> = {
  en: {
    title: 'Frequently Asked Questions & Science',
    subtitle: 'Everything you need to know about energy transmutation, urge surfing psychology, and zero-server privacy.',
    items: [
      {
        q: 'What is sexual transmutation and how does ForgeEnergy work?',
        a: 'Sexual and energetic transmutation is the practice of channeling primal biological impulses into creative, intellectual, and physical achievements. First documented extensively by Napoleon Hill and validated by modern neurobiology, this energy represents your strongest motivational drive. ForgeEnergy gives you an immediate somatic intervention to intercept compulsive urges and anchor them directly into deep work.',
      },
      {
        q: 'How does the 2-minute tactical box breathing visualizer stop cravings?',
        a: 'Navy SEAL Tactical Box Breathing (4s Inhale, 4s Hold, 4s Exhale, 4s Hold) stimulates the vagus nerve, rapidly engaging the parasympathetic nervous system. This immediately lowers heart rate, downregulates cortisol, and halts the acute sympathetic nervous surge that triggers compulsive habit loops.',
      },
      {
        q: 'What is Urge Surfing and why is it superior to sheer willpower?',
        a: 'Pioneered by psychologist Dr. G. Alan Marlatt, Urge Surfing recognizes that compulsive cravings follow a predictable bell curve: they crest, peak within 2 to 3 minutes, and inevitably dissolve. Suppressing an urge creates psychological resistance; Urge Surfing allows you to mindfully observe the somatic sensations without acting, retraining the brain without willpower fatigue.',
      },
      {
        q: 'Why is ForgeEnergy 100% client-side with zero server storage?',
        a: 'Your recovery habits, streaks, and personal metrics should remain private to you. ForgeEnergy operates with zero databases, zero cloud telemetry, and zero tracking cookies. All data is stored strictly in your browser’s local storage and can be backed up with 256-bit AES-GCM browser-native encryption.',
      },
      {
        q: 'What biological milestones occur at 7, 14, 30, and 90 days?',
        a: 'Research demonstrates that by Day 7, androgen receptor utilization peaks (+145.7% responsiveness). By Day 14, dopamine D2 and D3 receptors re-sensitize, restoring natural motivation. By Day 30, the chronic habit transcription factor Delta-FosB clears from the nucleus accumbens, eliminating brain fog. By Day 90, prefrontal cortex executive control is structurally consolidated.',
      },
    ],
  },
  es: {
    title: 'Preguntas Frecuentes y Fundamento Científico',
    subtitle: 'Todo lo que necesitas saber sobre transmutación de energía, psicología del impulso y privacidad sin servidores.',
    items: [
      {
        q: '¿Qué es la transmutación sexual y cómo funciona ForgeEnergy?',
        a: 'La transmutación sexual y energética consiste en canalizar los impulsos biológicos primordiales hacia logros creativos, intelectuales y físicos. ForgeEnergy proporciona una intervención somática inmediata para interceptar impulsos compulsivos y convertirlos directamente en trabajo profundo.',
      },
      {
        q: '¿Cómo detiene los antojos la respiración táctica cuadrada de 2 minutos?',
        a: 'La respiración cuadrada de los Navy SEALs (4s Inhalar, 4s Retener, 4s Exhalar, 4s Retener) estimula el nervio vago y activa el sistema parasimpático, reduciendo el ritmo cardíaco y desactivando el impulso compulsivo.',
      },
      {
        q: '¿Qué es el Urge Surfing y por qué supera a la fuerza de voluntad?',
        a: 'Desarrollado por el Dr. G. Alan Marlatt, el Urge Surfing enseña que las urgencias alcanzan su pico en 2-3 minutos y se disuelven solas. En lugar de luchar contra el impulso, se observa conscientemente hasta que pasa la ola.',
      },
      {
        q: '¿Por qué ForgeEnergy es 100% del lado del cliente sin servidores?',
        a: 'Tus hábitos personales y rachas no deben enviarse a ninguna nube. Todos los datos residen exclusivamente en el almacenamiento local de tu navegador y pueden respaldarse con cifrado militar AES-256.',
      },
      {
        q: '¿Qué hitos biológicos ocurren a los 7, 14, 30 y 90 días?',
        a: 'El Día 7 se optimiza la utilización de andrógenos (+145%). El Día 14 se resensibilizan los receptores de dopamina D2/D3. El Día 30 se depura la proteína Delta-FosB eliminando la niebla mental. El Día 90 se consolida la soberanía del córtex prefrontal.',
      },
    ],
  },
  fr: {
    title: 'Foire Aux Questions & Neurosciences',
    subtitle: 'Tout savoir sur la transmutation d’énergie, le protocole d’Urge Surfing et l’architecture sans serveur.',
    items: [
      {
        q: 'Qu’est-ce que la transmutation sexuelle et comment fonctionne ForgeEnergy ?',
        a: 'La transmutation énergétique est la redirection consciente de l’énergie vitale et dopaminergique vers la création intellectuelle et physique. ForgeEnergy propose une intervention somatique immédiate pour transformer l’élan en travail profond.',
      },
      {
        q: 'Comment la respiration carrée de 2 minutes stoppe-t-elle les compulsions ?',
        a: 'La respiration tactique des Navy SEALs stimule le nerf vague, activant le système parasympathique pour apaiser l’excitation du système nerveux en moins de 120 secondes.',
      },
      {
        q: 'Qu’est-ce que l’Urge Surfing et pourquoi est-ce plus efficace que la volonté ?',
        a: 'Conçu par le Dr G. Alan Marlatt, l’Urge Surfing consiste à observer la vague de l’impulsion qui culmine en 2 à 3 minutes avant de s’estomper naturellement, évitant l’épuisement de la volonté.',
      },
      {
        q: 'Pourquoi ForgeEnergy est-il 100% côté client sans serveur ?',
        a: 'Vos habitudes intimes et vos séries ne regardent que vous. Aucune donnée ne quitte votre navigateur : zéro base de données, zéro cookie et chiffrement AES-256 local.',
      },
      {
        q: 'Quelles étapes biologiques sont franchies à 7, 14, 30 et 90 jours ?',
        a: 'Au 7e jour, pic de sensibilité des récepteurs androgènes. Au 14e jour, régénération des récepteurs dopaminergiques D2/D3. Au 30e jour, disparition de Delta-FosB et du brouillard mental. Au 90e jour, suprématie préfrontale permanente.',
      },
    ],
  },
  pt: {
    title: 'Perguntas Frequentes & Fundamento Científico',
    subtitle: 'Tudo o que você precisa saber sobre transmutação de energia, psicologia do impulso e privacidade local.',
    items: [
      {
        q: 'O que é transmutação sexual e como o ForgeEnergy funciona?',
        a: 'A transmutação é a prática de canalizar impulsos biológicos primordiais para produção criativa e intelectual. O ForgeEnergy oferece uma intervenção somática imediata para converter a urgência em foco produtivo.',
      },
      {
        q: 'Como a respiração tática de 2 minutos interrompe os impulsos?',
        a: 'A respiração quadrada dos Navy SEALs estimula o nervo vago e acalma o sistema nervoso simpático, baixando os batimentos e dissipando o impulso compulsivo.',
      },
      {
        q: 'O que é o Urge Surfing e por que supera a força de vontade?',
        a: 'Criado pelo Dr. G. Alan Marlatt, o Urge Surfing reconhece que os impulsos sobem, atingem o pico em 2-3 minutos e somem. Observar a onda sem ceder elimina o desgaste da força de vontade.',
      },
      {
        q: 'Por que o ForgeEnergy é 100% no navegador sem servidores?',
        a: 'Sua jornada e registros são sagrados e pessoais. Não usamos servidores externos nem cookies de rastreamento. Tudo fica guardado no LocalStorage do seu próprio navegador.',
      },
      {
        q: 'Quais marcos biológicos ocorrem aos 7, 14, 30 e 90 dias?',
        a: 'No Dia 7, a utilização de andrógenos atinge o pico (+145%). No Dia 14, os receptores de dopamina D2/D3 se regeneram. No Dia 30, a proteína Delta-FosB é depurada, eliminando a névoa mental. No Dia 90, o córtex pré-frontal consolida o domínio.',
      },
    ],
  },
  ja: {
    title: 'よくある質問と科学的エビデンス',
    subtitle: 'エネルギー昇華、アージ・サーフィン心理学、ゼロサーバープライバシーに関する完全ガイド。',
    items: [
      {
        q: '性的エネルギーの昇華とは何ですか？ ForgeEnergyはどう役立ちますか？',
        a: 'ナポレオン・ヒルが提唱し現代神経生物学で実証されている通り、生物学的衝動は人間最強の推進エネルギーです。ForgeEnergyはこの衝動を即座に感知・遮断し、ディープワークや創作物へ直接変換するための実践的スイートです。',
      },
      {
        q: 'なぜ2分間のボックス呼吸で衝動が治まるのですか？',
        a: '米海軍特殊部隊（Navy SEALs）が実践するボックス呼吸（吸気4秒・静止4秒・呼気4秒・静止4秒）は迷走神経をダイレクトに刺激し、交感神経の過興奮を120秒以内に鎮静させます。',
      },
      {
        q: 'アージ・サーフィン（衝動の波乗り）とは何ですか？',
        a: 'G・アラン・マーラット博士が開発した心理療法で、衝動を「2〜3分で頂点に達し引いていく波」と捉えます。無理に抑え込むのではなく、波に乗るように静観することで意志の消耗を防ぎます。',
      },
      {
        q: 'なぜForgeEnergyは100%クライアントサイド完結なのですか？',
        a: '個人の習慣や回復記録は究極のプライベート領域です。サーバーDBや追跡タグを一切排除し、端末のブラウザ内LocalStorageのみにデータを安全に保管します。',
      },
      {
        q: '7日、14日、30日、90日目に起こる生体マイルストーンとは？',
        a: '7日目にアンドロゲン受容体の利用効率がピーク（+145%）に達し、14日目にドーパミンD2/D3受容体が再感受性化。30日目に依存関連転写因子Delta-FosBが浄化されブレインフォグが消失、90日目に前頭前野の構造的支配が確立されます。',
      },
    ],
  },
};

export const FAQSection: React.FC<FAQSectionProps> = ({ currentLocale }) => {
  const data = faqData[currentLocale] || faqData.en;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="scroll-mt-24 pt-8 border-t border-[#DDD5C7] dark:border-[#282B22]">
      <div className="mb-6 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8B9A6E]/15 text-[#566141] dark:text-[#BFD1A4] mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-[#8B9A6E]" />
          <span>Knowledge &amp; Verification</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#22241F] dark:text-[#EFECE6] tracking-tight">
          {data.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#555C4A] dark:text-[#A7AFA0] mt-1.5 leading-relaxed">
          {data.subtitle}
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {data.items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-[#DDD5C7] dark:border-[#2C3026] bg-[#EAE2D6]/60 dark:bg-[#181A15] overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                type="button"
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 text-sm sm:text-base font-bold text-[#22241F] dark:text-[#EFECE6] hover:text-[#8B9A6E] dark:hover:text-[#BFD1A4] transition-colors"
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#8B9A6E] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#4A4F44] dark:text-[#C5CCC0] leading-relaxed border-t border-[#DDD5C7]/60 dark:border-[#242720] animate-in fade-in duration-100">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
