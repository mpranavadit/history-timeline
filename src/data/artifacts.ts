export interface Artifact {
  id: string;
  title: string;
  period: string;
  year: number;
  description: string;
  significance: string;
  location: string;
  culture: string;
  imageUrl: string;
  category: string;
}

export const artifacts: Artifact[] = [
  {
    id: '1',
    title: 'Harappan Seals',
    period: 'Indus Valley Civilization',
    year: -2500,
    description: 'Square steatite seals featuring intricate carvings of animals like unicorns, bulls, and tigers, along with undeciphered Indus script symbols. These seals were likely used for trade and administrative purposes.',
    significance: 'These seals provide crucial evidence of the sophisticated urban civilization of the Indus Valley, demonstrating advanced craftsmanship, standardized weights and measures, and extensive trade networks reaching Mesopotamia.',
    location: 'Harappa and Mohenjo-daro (present-day Pakistan)',
    culture: 'Harappan',
    imageUrl: 'https://images.pexels.com/photos/8078833/pexels-photo-8078833.jpeg',
    category: 'Administrative'
  },
  {
    id: '2',
    title: 'Dancing Girl of Mohenjo-daro',
    period: 'Indus Valley Civilization',
    year: -2300,
    description: 'A bronze figurine of a young woman in a dancing pose, wearing bangles and a necklace. This sophisticated lost-wax bronze casting demonstrates advanced metallurgical skills.',
    significance: 'One of the earliest known bronze sculptures in human history, showcasing the artistic sophistication and metallurgical expertise of the Indus Valley Civilization.',
    location: 'Mohenjo-daro (present-day Pakistan)',
    culture: 'Harappan',
    imageUrl: 'https://images.pexels.com/photos/7260900/pexels-photo-7260900.jpeg',
    category: 'Sculpture'
  },
  {
    id: '3',
    title: 'Rigvedic Hymns (Oral Tradition)',
    period: 'Vedic Period',
    year: -1500,
    description: 'The oldest collection of Sanskrit hymns, composed and transmitted orally for centuries. These hymns represent the earliest literary and religious texts of the Indian subcontinent.',
    significance: 'Forms the foundation of Hindu philosophy and ritual practices. The sophisticated oral tradition demonstrates remarkable memory techniques and linguistic precision.',
    location: 'Northwestern Indian subcontinent',
    culture: 'Vedic Aryans',
    imageUrl: 'https://images.pexels.com/photos/8078828/pexels-photo-8078828.jpeg',
    category: 'Literature'
  },
  {
    id: '4',
    title: 'Painted Grey Ware',
    period: 'Late Vedic Period',
    year: -1000,
    description: 'Fine pottery with geometric patterns painted in black over a grey surface. This pottery style is associated with the later Vedic settlements in the Ganga-Yamuna doab.',
    significance: 'Marks the transition from pastoral to agricultural society and the establishment of urban centers in the Gangetic plains.',
    location: 'Ganga-Yamuna doab region',
    culture: 'Late Vedic',
    imageUrl: 'https://images.pexels.com/photos/8078836/pexels-photo-8078836.jpeg',
    category: 'Pottery'
  },
  {
    id: '5',
    title: 'Buddha Statue from Sarnath',
    period: 'Gupta Period',
    year: 475,
    description: 'Sandstone sculpture of Buddha in the iconic Gupta style, showing perfect proportions, serene expression, and transparent drapery. Found at Sarnath, where Buddha gave his first sermon.',
    significance: 'Represents the classical ideal of Buddhist art and became the standard representation of Buddha across Asia. The Gupta style influenced Buddhist art from Central Asia to Southeast Asia.',
    location: 'Sarnath, Uttar Pradesh',
    culture: 'Gupta',
    imageUrl: 'https://images.pexels.com/photos/7260900/pexels-photo-7260900.jpeg',
    category: 'Religious Art'
  },
  {
    id: '6',
    title: 'Ashokan Pillars',
    period: 'Mauryan Empire',
    year: -250,
    description: 'Monolithic sandstone pillars erected by Emperor Ashoka, featuring his edicts promoting Buddhism, non-violence, and moral governance. Topped with magnificent animal capitals.',
    significance: 'First major attempt at creating a unified moral and administrative framework across the Indian subcontinent. The lion capital became India\'s national emblem.',
    location: 'Various locations across India (Sarnath, Delhi, etc.)',
    culture: 'Mauryan',
    imageUrl: 'https://images.pexels.com/photos/12935073/pexels-photo-12935073.jpeg',
    category: 'Architecture'
  },
  {
    id: '7',
    title: 'Gandhara Buddha Sculptures',
    period: 'Gandhara Art Period',
    year: 150,
    description: 'Greco-Buddhist sculptures showing Buddha with Hellenistic influences in facial features, drapery, and artistic techniques, created during the Kushan period.',
    significance: 'Demonstrates the cultural synthesis between Greek artistic traditions brought by Alexander\'s successors and Buddhist religious themes, creating the first anthropomorphic representations of Buddha.',
    location: 'Gandhara region (present-day Pakistan and Afghanistan)',
    culture: 'Kushan-Gandhara',
    imageUrl: 'https://images.pexels.com/photos/7260900/pexels-photo-7260900.jpeg',
    category: 'Religious Art'
  },
  {
    id: '8',
    title: 'Ajanta Cave Paintings',
    period: 'Gupta and Post-Gupta Period',
    year: 450,
    description: 'Masterful Buddhist cave paintings depicting Jataka tales, the life of Buddha, and bodhisattvas with remarkable artistic sophistication, using advanced techniques in perspective and shading.',
    significance: 'Represents the pinnacle of ancient Indian painting, showcasing advanced artistic techniques and spiritual themes that influenced Asian art for centuries.',
    location: 'Ajanta, Maharashtra',
    culture: 'Vakataka-Gupta',
    imageUrl: 'https://images.pexels.com/photos/12935005/pexels-photo-12935005.jpeg',
    category: 'Cave Art'
  },
  {
    id: '9',
    title: 'Ellora Cave Temples',
    period: 'Early Medieval Period',
    year: 750,
    description: 'Rock-cut temples representing Hindu, Buddhist, and Jain traditions, with the magnificent Kailasa temple carved from a single rock representing Mount Kailash.',
    significance: 'Demonstrates religious tolerance and architectural mastery, representing the synthesis of different religious traditions in medieval India.',
    location: 'Ellora, Maharashtra',
    culture: 'Rashtrakuta',
    imageUrl: 'https://images.pexels.com/photos/12935005/pexels-photo-12935005.jpeg',
    category: 'Architecture'
  },
  {
    id: '10',
    title: 'Chola Bronze Sculptures',
    period: 'Chola Dynasty',
    year: 1000,
    description: 'Masterful bronze sculptures of Hindu deities, particularly Nataraja (dancing Shiva), created using the sophisticated lost-wax casting technique with perfect proportions and dynamic movement.',
    significance: 'Represents the pinnacle of South Indian metallurgy and religious art, establishing iconographic standards that spread across Southeast Asia through Chola maritime trade.',
    location: 'Tamil Nadu',
    culture: 'Chola',
    imageUrl: 'https://images.pexels.com/photos/8078840/pexels-photo-8078840.jpeg',
    category: 'Sculpture'
  },
  {
    id: '11',
    title: 'Khajuraho Temple Sculptures',
    period: 'Chandela Dynasty',
    year: 1050,
    description: 'Intricately carved sandstone temples featuring sculptures depicting various aspects of life, including spiritual, erotic, and everyday themes, representing the complexity of human existence.',
    significance: 'Showcases the peak of North Indian temple architecture and sculpture, representing the integration of spiritual and worldly life in medieval Hindu philosophy.',
    location: 'Khajuraho, Madhya Pradesh',
    culture: 'Chandela',
    imageUrl: 'https://images.pexels.com/photos/8078840/pexels-photo-8078840.jpeg',
    category: 'Architecture'
  },
  {
    id: '12',
    title: 'Hoysala Temple Architecture',
    period: 'Hoysala Dynasty',
    year: 1150,
    description: 'Star-shaped temples with intricate soapstone carvings featuring detailed sculptures of deities, dancers, and mythological scenes, representing unique South Indian architectural style.',
    significance: 'Demonstrates the regional diversity in Indian temple architecture and the sophisticated craftsmanship of medieval South Indian artisans.',
    location: 'Belur, Halebidu, Karnataka',
    culture: 'Hoysala',
    imageUrl: 'https://images.pexels.com/photos/8078840/pexels-photo-8078840.jpeg',
    category: 'Architecture'
  },
  {
    id: '13',
    title: 'Delhi Sultanate Coins',
    period: 'Delhi Sultanate',
    year: 1200,
    description: 'Silver and gold coins featuring Arabic calligraphy and Islamic motifs, marking the beginning of Islamic rule in North India and the introduction of new monetary systems.',
    significance: 'Represents the beginning of Indo-Islamic culture and the integration of Islamic administrative and economic systems with Indian traditions.',
    location: 'Delhi and surrounding regions',
    culture: 'Turkic-Afghan',
    imageUrl: 'https://images.pexels.com/photos/8078833/pexels-photo-8078833.jpeg',
    category: 'Administrative'
  },
  {
    id: '14',
    title: 'Qutub Minar',
    period: 'Delhi Sultanate',
    year: 1220,
    description: 'Victory tower built by Qutub-ud-din Aibak, showcasing Indo-Islamic architecture with intricate calligraphic and geometric patterns carved in red sandstone.',
    significance: 'Marks the establishment of Islamic architecture in India and represents the synthesis of Islamic and Indian architectural traditions.',
    location: 'Delhi',
    culture: 'Mamluk Sultanate',
    imageUrl: 'https://images.pexels.com/photos/12935073/pexels-photo-12935073.jpeg',
    category: 'Architecture'
  },
  {
    id: '15',
    title: 'Vijayanagara Empire Coins',
    period: 'Vijayanagara Empire',
    year: 1400,
    description: 'Gold pagodas and silver fanams featuring Hindu deities and royal insignia, representing the economic prosperity of the last great Hindu empire of South India.',
    significance: 'Demonstrates the economic power and cultural resistance of South Indian Hindu kingdoms against Islamic expansion.',
    location: 'Hampi, Karnataka',
    culture: 'Vijayanagara',
    imageUrl: 'https://images.pexels.com/photos/8078833/pexels-photo-8078833.jpeg',
    category: 'Administrative'
  },
  {
    id: '16',
    title: 'Mughal Miniature Paintings',
    period: 'Mughal Empire',
    year: 1590,
    description: 'Detailed miniature paintings combining Persian, Central Asian, and Indian artistic traditions, depicting court scenes, historical events, and literary themes with exquisite detail.',
    significance: 'Represents the cultural synthesis during the Mughal period and documents the social, political, and cultural life of medieval India.',
    location: 'Delhi, Agra, Lahore',
    culture: 'Mughal',
    imageUrl: 'https://images.pexels.com/photos/8078828/pexels-photo-8078828.jpeg',
    category: 'Painting'
  },
  {
    id: '17',
    title: 'Taj Mahal',
    period: 'Mughal Empire',
    year: 1648,
    description: 'White marble mausoleum built by Shah Jahan for his wife Mumtaz Mahal, representing the pinnacle of Mughal architecture with perfect symmetry and intricate inlay work.',
    significance: 'Considered the jewel of Indo-Islamic architecture and a UNESCO World Heritage Site, symbolizing eternal love and Mughal architectural mastery.',
    location: 'Agra, Uttar Pradesh',
    culture: 'Mughal',
    imageUrl: 'https://images.pexels.com/photos/12935073/pexels-photo-12935073.jpeg',
    category: 'Architecture'
  },
  {
    id: '18',
    title: 'Maratha War Equipment',
    period: 'Maratha Empire',
    year: 1680,
    description: 'Traditional weapons including curved swords (tulwar), shields, and armor used by Maratha warriors, showcasing indigenous military technology and craftsmanship.',
    significance: 'Represents the military prowess of the Marathas who challenged Mughal supremacy and established the last great indigenous empire in India.',
    location: 'Maharashtra and surrounding regions',
    culture: 'Maratha',
    imageUrl: 'https://images.pexels.com/photos/8078840/pexels-photo-8078840.jpeg',
    category: 'Military'
  },
  {
    id: '19',
    title: 'Tanjore Paintings',
    period: 'Maratha Period in South India',
    year: 1750,
    description: 'Traditional South Indian paintings with gold foil, precious stones, and vibrant colors depicting Hindu deities, especially Krishna and other Vaishnavite themes.',
    significance: 'Preserves classical South Indian artistic traditions and represents the revival of Hindu art under Maratha patronage in Tamil Nadu.',
    location: 'Thanjavur, Tamil Nadu',
    culture: 'Maratha-Tamil',
    imageUrl: 'https://images.pexels.com/photos/8078836/pexels-photo-8078836.jpeg',
    category: 'Traditional Art'
  },
  {
    id: '20',
    title: 'Company School Paintings',
    period: 'British Colonial Period',
    year: 1820,
    description: 'Paintings created by Indian artists for British patrons, documenting Indian flora, fauna, customs, and daily life using European techniques combined with Indian subject matter.',
    significance: 'Represents the cultural encounter between Indian and European artistic traditions and provides valuable documentation of colonial-era Indian society.',
    location: 'Calcutta, Madras, Bombay',
    culture: 'Anglo-Indian',
    imageUrl: 'https://images.pexels.com/photos/8078828/pexels-photo-8078828.jpeg',
    category: 'Colonial Art'
  }
];

// Updated timeline data with proper formatting
export const timelineData = {
  events: artifacts.map(artifact => ({
    start_date: {
      year: Math.abs(artifact.year),
      era: artifact.year < 0 ? "BCE" : "CE"
    },
    text: {
      headline: artifact.title,
      text: `<div class="timeline-content">
        <p><strong>Period:</strong> ${artifact.period}</p>
        <p><strong>Culture:</strong> ${artifact.culture}</p>
        <p><strong>Location:</strong> ${artifact.location}</p>
        <p class="mt-2">${artifact.description}</p>
        <p class="mt-2 text-sm text-gray-600"><strong>Significance:</strong> ${artifact.significance}</p>
      </div>`
    },
    media: {
      url: artifact.imageUrl,
      caption: `${artifact.title} - ${artifact.period}`,
      credit: "Historical Artifact Collection"
    }
  }))
};