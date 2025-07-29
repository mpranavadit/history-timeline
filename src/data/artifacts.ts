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
    description: 'Square steatite seals with intricate carvings of animals and undeciphered script symbols.',
    significance: 'These seals provide crucial insights into the sophisticated urban civilization of the Indus Valley, showing evidence of trade, religious practices, and administrative systems.',
    location: 'Harappa, Pakistan (now Pakistan)',
    culture: 'Harappan',
    imageUrl: 'https://images.pexels.com/photos/8078833/pexels-photo-8078833.jpeg',
    category: 'Administrative'
  },
  {
    id: '2',
    title: 'Ashokan Pillars',
    period: 'Mauryan Empire',
    year: -250,
    description: 'Monolithic sandstone pillars erected by Emperor Ashoka with edicts promoting Buddhism and moral governance.',
    significance: 'These pillars represent the first major attempt at creating a unified moral and legal framework across the Indian subcontinent.',
    location: 'Various locations across India',
    culture: 'Mauryan',
    imageUrl: 'https://images.pexels.com/photos/12935073/pexels-photo-12935073.jpeg',
    category: 'Architecture'
  },
  {
    id: '3',
    title: 'Gandhara Buddha Sculptures',
    period: 'Gandhara Art Period',
    year: 100,
    description: 'Greco-Buddhist art sculptures showing Buddha with Hellenistic influences in facial features and drapery.',
    significance: 'These sculptures demonstrate the cultural synthesis between Greek artistic traditions and Buddhist religious themes.',
    location: 'Gandhara region (modern-day Pakistan and Afghanistan)',
    culture: 'Gandhara',
    imageUrl: 'https://images.pexels.com/photos/7260900/pexels-photo-7260900.jpeg',
    category: 'Religious Art'
  },
  {
    id: '4',
    title: 'Ajanta Cave Paintings',
    period: 'Gupta Period',
    year: 400,
    description: 'Exquisite Buddhist cave paintings depicting Jataka tales and the life of Buddha with remarkable artistic sophistication.',
    significance: 'These paintings represent the pinnacle of ancient Indian art, showcasing advanced techniques in perspective, shading, and narrative composition.',
    location: 'Ajanta, Maharashtra',
    culture: 'Gupta',
    imageUrl: 'https://images.pexels.com/photos/12935005/pexels-photo-12935005.jpeg',
    category: 'Cave Art'
  },
  {
    id: '5',
    title: 'Chola Bronze Sculptures',
    period: 'Chola Dynasty',
    year: 1000,
    description: 'Masterful bronze sculptures of Hindu deities, particularly Nataraja (dancing Shiva), using the lost-wax casting technique.',
    significance: 'These bronzes represent the height of South Indian metallurgy and religious art, influencing temple sculpture across Southeast Asia.',
    location: 'Tamil Nadu',
    culture: 'Chola',
    imageUrl: 'https://images.pexels.com/photos/8078840/pexels-photo-8078840.jpeg',
    category: 'Sculpture'
  },
  {
    id: '6',
    title: 'Mughal Miniature Paintings',
    period: 'Mughal Empire',
    year: 1600,
    description: 'Detailed miniature paintings combining Persian, Islamic, and Indian artistic traditions.',
    significance: 'These paintings document court life, historical events, and cultural synthesis during the Mughal period.',
    location: 'Delhi, Agra, and other Mughal centers',
    culture: 'Mughal',
    imageUrl: 'https://images.pexels.com/photos/8078828/pexels-photo-8078828.jpeg',
    category: 'Painting'
  },
  {
    id: '7',
    title: 'Tanjore Paintings',
    period: 'Maratha Period',
    year: 1750,
    description: 'Traditional South Indian paintings with gold foil, gems, and vibrant colors depicting Hindu deities.',
    significance: 'These paintings preserve classical South Indian artistic traditions and continue to influence contemporary Indian art.',
    location: 'Thanjavur, Tamil Nadu',
    culture: 'Maratha',
    imageUrl: 'https://images.pexels.com/photos/8078836/pexels-photo-8078836.jpeg',
    category: 'Traditional Art'
  }
];

export const timelineData = {
  events: artifacts.map(artifact => ({
    start_date: {
      year: artifact.year > 0 ? artifact.year : Math.abs(artifact.year),
      era: artifact.year > 0 ? "CE" : "BCE"
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
      credit: "Historical Artifact"
    }
  }))
};