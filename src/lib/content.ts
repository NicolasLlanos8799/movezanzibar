/**
 * Todo el copy del sitio, en inglés y swahili.
 * v2 — tono exclusivamente informativo / de impacto social: sin CTAs de venta
 * ni lenguaje de reserva. Editar aquí cambia el texto en toda la web.
 *
 * Fuentes del contenido factual (origen, filosofía, Saturday Club,
 * financiamiento): doogreporter.com/en/move-zanzibar, urbanbeatcontenidos.es,
 * movezanzibar.org, Instagram @movezanzibar / @ndimu_, TripAdvisor — aportadas
 * por el cliente. Nada de esto está inventado.
 */

export const LANGUAGES = ["en", "sw"] as const;
export type Lang = (typeof LANGUAGES)[number];

export const LANGUAGE_LABEL: Record<Lang, string> = {
  en: "EN",
  sw: "SW",
};

export type Copy = {
  nav: {
    links: { id: string; label: string }[];
    langAria: string;
  };
  hero: {
    eyebrow: string;
    /** Línea normal, en Montserrat. */
    titleLine1: string;
    /** Frase corta que se renderiza en Caveat (acento manuscrito, eco del logo). */
    titleAccent: string;
    subtitle: string;
    cta: string;
    /** Insignia destacada del show semanal de los sábados. */
    saturdayBadge: string;
  };
  who: {
    kicker: string;
    title: string;
    body: string[];
    quote: string;
  };
  founder: {
    kicker: string;
    name: string;
    fullName: string;
    role: string;
    body: string[];
    badges: string[];
  };
  youth: {
    kicker: string;
    title: string;
    trainingTitle: string;
    trainingBody: string;
    trainingExtras: string[];
    communityTitle: string;
    communityBody: string;
    communityTag: string;
    bookShowCta: string;
  };
  donate: {
    kicker: string;
    title: string;
    subtitle: string;
    photoCaption: string;
    tierLabels: Record<string, string>;
    tierJustifications: Record<string, string>;
    customLabel: string;
    customPlaceholder: string;
    customJustification: string;
    confirmAmountLabel: string;
    changeAmountLabel: string;
    selectPrompt: string;
    confirmedKicker: string;
    bankTitle: string;
    bankNote: string;
    fieldLabels: {
      accountName: string;
      bankName: string;
      accountNumber: string;
      swift: string;
    };
    copyLabel: string;
    copiedLabel: string;
    thankYouNote: string;
    notifyTitle: string;
    notifyBody: string;
    notifyEmailLabel: string;
    notifyWhatsappLabel: string;
  };
  contact: {
    kicker: string;
    title: string;
    body: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    locationHint: string;
    followLabel: string;
    note: string;
    bookingTitle: string;
    bookingBody: string;
    bookingEmailLabel: string;
    bookingWhatsappLabel: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
};

export const CONTENT: Record<Lang, Copy> = {
  /* ------------------------------------------------------------------ EN */
  en: {
    nav: {
      links: [
        { id: "top", label: "Home" },
        { id: "who-we-are", label: "Who We Are" },
        { id: "our-work", label: "Our Work" },
        { id: "booking", label: "Book a Show" },
        { id: "support", label: "Support" },
        { id: "contact", label: "Contact" },
      ],
      langAria: "Change language",
    },
    hero: {
      eyebrow: "Jambiani · Zanzibar",
      titleLine1: "Empowering Youth Through Art",
      titleAccent: "& Movement",
      subtitle:
        "We provide young talents in Zanzibar with the opportunity to develop their skills and build a better future.",
      cta: "Discover our story",
      saturdayBadge: "Live show every Saturday · 6\u20138 PM",
    },
    who: {
      kicker: "Who We Are",
      title: "A social movement, not just a group of artists",
      body: [
        "Move Zanzibar is a community of young artists, acrobats, and dancers based in Jambiani — born on the beach, not in an office, and built without international funding.",
        "What began as an open-air practice space grew, over the years, into the Move Zanzibar Community Centre: a place to nurture talent, inspire creativity, and train the next generation for a brighter future.",
      ],
      quote: "Nurture talent. Inspire creativity. Train the next generation.",
    },
    founder: {
      kicker: "Meet the Founder",
      name: "Ndimu",
      fullName: "Clalence Lutumo",
      role: "Founder & Lead Mentor",
      body: [
        "Ndimu is the founder, director, and driving force behind Move Zanzibar. Growing up on mainland Tanzania, he spent time as a street child before finding refuge and purpose in acrobatic gymnastics.",
        "When he arrived in Jambiani, he began training independently with local children on the beach — moving to a different spot each day to reach and involve more people in the village.",
        "What started as an open-air practice space grew, over the years, into the Move Zanzibar Community Centre. Ndimu still trains and mentors the program's children and teenagers directly, and remains the central voice of the project's story.",
      ],
      badges: ["Founder & Director", "Lead Mentor"],
    },
    youth: {
      kicker: "What We Do",
      title: "Training, discipline, and a place to belong",
      trainingTitle: "The Youth Program",
      trainingBody:
        "Free training for children and teenagers, focused on movement, discipline, and confidence. High-performance training takes consistency — and mastering a handstand or a group choreography gives young people from vulnerable backgrounds real, earned self-belief.",
      trainingExtras: ["Free English lessons", "Food & a safe space"],
      communityTitle: "A Living Community",
      communityBody:
        "Our artists live, train, cook, and manage the center together — a life built on Ubuntu, the philosophy of \"I am because we are.\" In collective acrobatics, a teammate's safety depends literally on you, which builds a fraternity that runs deep.",
      communityTag: "Show, every Saturday · 6\u20138 PM in Move Zanzibar",
      bookShowCta: "Book the show for your event",
    },
    donate: {
      kicker: "Support the Center",
      title: "Give directly to Move Zanzibar",
      subtitle:
        "There's no platform fee and no middleman — every donation goes straight to the account the center uses to cover food, training, and daily upkeep.",
      photoCaption: "This is who your donation reaches.",
      tierLabels: {
        seed: "Seed",
        grow: "Grow",
        transform: "Transform",
      },
      tierJustifications: {
        seed: "Roughly a week of free English lessons for one child in the program.",
        grow: "About a month of food and a safe training space for one young performer.",
        transform:
          "A meaningful share of a month's training equipment and center upkeep for the whole youth program.",
      },
      customLabel: "Choose your own amount",
      customPlaceholder: "Enter an amount (USD)",
      customJustification:
        "Whatever you're able to give goes directly into daily life at the center.",
      confirmAmountLabel: "Confirm amount",
      changeAmountLabel: "Change amount",
      selectPrompt: "Select an amount to see how it helps, and the transfer details.",
      confirmedKicker: "You're donating",
      bankTitle: "Bank transfer details",
      bankNote: "These are the details for the account Move Zanzibar uses day to day.",
      fieldLabels: {
        accountName: "Account holder",
        bankName: "Bank",
        accountNumber: "Account number",
        swift: "SWIFT / BIC",
      },
      copyLabel: "Copy",
      copiedLabel: "Copied",
      thankYouNote:
        "After sending your transfer, let us know — we'd love to say thank you personally.",
      notifyTitle: "Made the transfer?",
      notifyBody: "Tell us you donated so we can confirm it and say thank you.",
      notifyEmailLabel: "Tell us by email",
      notifyWhatsappLabel: "Tell us on WhatsApp",
    },
    contact: {
      kicker: "Get in Touch",
      title: "Find us in Jambiani",
      body:
        "Move Zanzibar is a small, community-led group. If you'd like to learn more about our work, visit us, or simply say hello, we'd love to hear from you.",
      emailLabel: "Email",
      phoneLabel: "Phone / WhatsApp",
      locationLabel: "Location",
      locationHint: "Open in Google Maps",
      followLabel: "Follow along",
      note: "We're always glad to connect with people who care about youth, art, and community.",
      bookingTitle: "Looking to book the show?",
      bookingBody:
        "Beyond our free Saturday show at the center, Move Zanzibar performs for hotels, events, and festivals across Zanzibar. Reach out with your date and venue and we'll get back to you.",
      bookingEmailLabel: "Request a booking by email",
      bookingWhatsappLabel: "Request a booking on WhatsApp",
    },
    footer: {
      tagline: "Empowering youth through art & movement.",
      rights: "All rights reserved.",
    },
  },

  /* ------------------------------------------------------------------ SW */
  sw: {
    nav: {
      links: [
        { id: "top", label: "Nyumbani" },
        { id: "who-we-are", label: "Sisi ni Nani" },
        { id: "our-work", label: "Kazi Yetu" },
        { id: "booking", label: "Kodisha Onyesho" },
        { id: "support", label: "Changia" },
        { id: "contact", label: "Wasiliana" },
      ],
      langAria: "Badilisha lugha",
    },
    hero: {
      eyebrow: "Jambiani · Zanzibar",
      titleLine1: "Kuwawezesha Vijana Kupitia Sanaa",
      titleAccent: "na Mwendo",
      subtitle:
        "Tunawapa vipaji vichanga vya Zanzibar fursa ya kukuza ujuzi wao na kujenga maisha bora ya baadaye.",
      cta: "Gundua hadithi yetu",
      saturdayBadge: "Onyesho la moja kwa moja kila Jumamosi · Saa 12\u20132 jioni",
    },
    who: {
      kicker: "Sisi ni Nani",
      title: "Vuguvugu la kijamii, si kikundi tu cha wasanii",
      body: [
        "Move Zanzibar ni jamii ya vijana wasanii, wacheza sarakasi na wachezaji ngoma kilichoko Jambiani — kilizaliwa ufukweni, si ofisini, na kilijengwa bila ufadhili wa kimataifa.",
        "Kilichoanza kama nafasi ya mazoezi ya wazi kilikua, kwa miaka, na kuwa Move Zanzibar Community Centre: mahali pa kukuza vipaji, kuhamasisha ubunifu, na kuandaa kizazi kijacho kwa maisha bora ya baadaye.",
      ],
      quote: "Kukuza vipaji. Kuhamasisha ubunifu. Kuandaa kizazi kijacho.",
    },
    founder: {
      kicker: "Mkutane na Mwanzilishi",
      name: "Ndimu",
      fullName: "Clalence Lutumo",
      role: "Mwanzilishi na Kocha Mkuu",
      body: [
        "Ndimu ni mwanzilishi, kiongozi, na nguvu kuu nyuma ya Move Zanzibar. Alikulia Tanzania Bara, ambapo aliishi kama mtoto wa mitaani kabla ya kupata kimbilio na lengo la maisha kupitia sarakasi.",
        "Alipofika Jambiani, alianza kufundisha peke yake watoto wa kijiji ufukweni — akihamia sehemu tofauti kila siku ili kuwafikia na kuwashirikisha watu wengi zaidi.",
        "Kilichoanza kama nafasi ya mazoezi ya wazi kilikua, kwa miaka, na kuwa Move Zanzibar Community Centre. Ndimu bado anafundisha na kuongoza moja kwa moja watoto na vijana wa programu, na anaendelea kuwa sauti kuu ya hadithi ya mradi huu.",
      ],
      badges: ["Mwanzilishi na Kiongozi", "Kocha Mkuu"],
    },
    youth: {
      kicker: "Tunachofanya",
      title: "Mafunzo, nidhamu, na mahali pa kuwa",
      trainingTitle: "Programu ya Vijana",
      trainingBody:
        "Mafunzo ya bure kwa watoto na vijana, yanayolenga mwendo, nidhamu na kujiamini. Mafunzo ya kiwango cha juu yanahitaji uthabiti — na kufaulu handstand au choreography ya kikundi humpa kijana kutoka mazingira magumu kujiamini kwa kweli, kulikopatikana kwa jitihada.",
      trainingExtras: ["Masomo ya Kiingereza bure", "Chakula na mahali salama"],
      communityTitle: "Jamii Hai",
      communityBody:
        "Wasanii wetu wanaishi, kufanya mazoezi, kupika na kuendesha kituo pamoja — maisha yaliyojengwa juu ya Ubuntu, falsafa ya \"mimi nipo kwa sababu sisi tupo.\" Katika sarakasi ya pamoja, usalama wa mwenzako unategemea wewe moja kwa moja, jambo linalojenga undugu wa kina.",
      communityTag: "Onyesho, kila Jumamosi · saa 12\u20132 jioni katika Move Zanzibar",
      bookShowCta: "Kodisha onyesho kwa tukio lako",
    },
    donate: {
      kicker: "Unga Mkono Kituo",
      title: "Changia moja kwa moja Move Zanzibar",
      subtitle:
        "Hakuna ada ya jukwaa wala mtu wa katikati — kila mchango unaenda moja kwa moja kwenye akaunti ambayo kituo kinatumia kugharamia chakula, mafunzo, na matengenezo ya kila siku.",
      photoCaption: "Hawa ndio mchango wako unawafikia.",
      tierLabels: {
        seed: "Mbegu",
        grow: "Kukua",
        transform: "Mageuzi",
      },
      tierJustifications: {
        seed: "Karibu wiki moja ya masomo ya Kiingereza bure kwa mtoto mmoja wa programu.",
        grow: "Karibu mwezi mmoja wa chakula na mahali salama pa mazoezi kwa msanii kijana mmoja.",
        transform:
          "Sehemu muhimu ya vifaa vya mazoezi na matengenezo ya kituo kwa mwezi mmoja, kwa programu nzima ya vijana.",
      },
      customLabel: "Chagua kiasi chako mwenyewe",
      customPlaceholder: "Weka kiasi (USD)",
      customJustification:
        "Chochote unachoweza kutoa kinaenda moja kwa moja kwenye maisha ya kila siku ya kituo.",
      confirmAmountLabel: "Thibitisha kiasi",
      changeAmountLabel: "Badilisha kiasi",
      selectPrompt: "Chagua kiasi ili uone jinsi kinavyosaidia, na taarifa za uhamisho.",
      confirmedKicker: "Unachangia",
      bankTitle: "Taarifa za uhamisho wa benki",
      bankNote: "Hizi ni taarifa za akaunti ambayo Move Zanzibar inatumia kila siku.",
      fieldLabels: {
        accountName: "Mmiliki wa akaunti",
        bankName: "Benki",
        accountNumber: "Namba ya akaunti",
        swift: "SWIFT / BIC",
      },
      copyLabel: "Nakili",
      copiedLabel: "Imenakiliwa",
      thankYouNote:
        "Baada ya kutuma uhamisho wako, tujulishe — tungependa kukushukuru wewe binafsi.",
      notifyTitle: "Umeshatuma uhamisho?",
      notifyBody: "Tujulishe umechangia ili tuweze kuthibitisha na kukushukuru.",
      notifyEmailLabel: "Tujulishe kwa barua pepe",
      notifyWhatsappLabel: "Tujulishe kwa WhatsApp",
    },
    contact: {
      kicker: "Wasiliana Nasi",
      title: "Tupate Jambiani",
      body:
        "Move Zanzibar ni kikundi kidogo kinachoongozwa na jamii. Ukipenda kujua zaidi kuhusu kazi yetu, kutembelea, au kusema tu habari, tutafurahi kusikia kutoka kwako.",
      emailLabel: "Barua pepe",
      phoneLabel: "Simu / WhatsApp",
      locationLabel: "Mahali",
      locationHint: "Fungua kwenye Google Maps",
      followLabel: "Tufuate",
      note: "Tunafurahi kila mara kukutana na watu wanaojali vijana, sanaa na jamii.",
      bookingTitle: "Unataka kukodisha onyesho?",
      bookingBody:
        "Zaidi ya onyesho letu la bure kila Jumamosi kituoni, Move Zanzibar hufanya maonyesho kwa hoteli, matukio, na tamasha kote Zanzibar. Tutumie tarehe na mahali, tutakujibu.",
      bookingEmailLabel: "Omba booking kwa barua pepe",
      bookingWhatsappLabel: "Omba booking kwa WhatsApp",
    },
    footer: {
      tagline: "Kuwawezesha vijana kupitia sanaa na mwendo.",
      rights: "Haki zote zimehifadhiwa.",
    },
  },
};
