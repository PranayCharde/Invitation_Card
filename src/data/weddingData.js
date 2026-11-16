/**
 * Centralized Wedding Configuration File
 * All wedding details, couples, events, locations, and content are managed here.
 * Edit this file to update any information across the entire website.
 */

export const weddingData = {
  couple: {
    groom: {
      name: "Prajwal",
      fullName: "Prajwal Deshmukh",
      title: "Groom",
      parents: "Son of Mrs. Sunita & Mr. Vilas Deshmukh",
      bio: "An engineer with a passion for creative vision and photography, ready to step into a magical lifetime of togetherness."
    },
    bride: {
      name: "Pratiksha",
      fullName: "Pratiksha Patil",
      title: "Bride",
      parents: "Daughter of Mrs. Vandana & Dr. Sanjay Patil",
      bio: "An architect who designs dreams with her smile and artistic grace, eager to begin their forever love story."
    },
    monogram: "P & P",
    hashtag: "#PraWedsPrati",
    invitationQuote: "Together with our families, we joyfully invite you to share our happiness as we embark on this sacred journey of love and togetherness.",
    shloka: "मंगलम् भगवान विष्णुः, मंगलम् गरुडध्वजः। मंगलम् पुण्डरीकाक्षः, मंगलाय तनो हरिः॥",
    tagline: "TWO HEARTS. ONE JOURNEY. FOREVER."
  },

  date: {
    weddingDate: "2027-02-09T18:00:00",
    displayDate: "09 February 2027",
    day: "Tuesday",
    muhurat: "Shubh Vivah Muhurat: 06:15 PM (Godhuli Vela)",
    auspiciousTithi: "Magha Shukla Tritiya, Vikram Samvat 2083"
  },

  location: {
    city: "Nagpur",
    state: "Maharashtra",
    country: "India",
    venueName: "Om Shiv Celebration Lawn and Hall",
    address: "Umred Road, Beside Indian Oil Petrol Pump, Telephone Nagar, Dighori, Nagpur, Maharashtra 440034",
    landmark: "Beside Indian Oil Petrol Pump, Dighori Naka",
    googleMapsUrl: "https://share.google/ss0b4ORnFEkF18Nnx",
    googleMapsUrl: "https://maps.app.goo.gl/QBxhGZtA6CU37A2EA",
    embedMapQuery: "Om Shiv celebration Lawn and hall, Nagpur"
  },

  theme: {
    primary: "#4A101B",      // Deep Burgundy
    secondary: "#681C2B",    // Royal Maroon
    gold: "#D4AF65",         // Antique Gold
    lightGold: "#F3DCA5",    // Light Champagne Gold
    background: "#FFF8EF",   // Warm Ivory Silk
    text: "#32151B"          // Deep Espresso
  },

  events: [
    {
      id: "haldi",
      name: "Haldi & Phoolon Ki Holi",
      subName: "The Auspicious Turmeric Ceremony",
      date: "07 February 2027",
      time: "10:00 AM Onwards",
      venue: "Courtyard, Om Shiv Celebration Lawn & Hall",
      dressCode: "Sunny Yellows, Mustard & Floral Prints",
      description: "A joyful morning splashed with golden turmeric pastes, vibrant marigold petals, dhol beats, and blessings of prosperity.",
      icon: "sun",
      accentColor: "#EAB308",
      bgGradient: "from-amber-50 to-yellow-100"
    },
    {
      id: "mehendi-sangeet",
      name: "Mehendi & Sangeet Utsav",
      subName: "An Evening of Henna & Melodies",
      date: "07 February 2027",
      time: "06:30 PM Onwards",
      venue: "The Royal Hall, Om Shiv Celebration",
      dressCode: "Emerald Green, Royal Teal & Indo-Western Glamour",
      description: "Intricate henna designs, soulful ghazals, vibrant choreographed Bollywood dance performances, and an open cocktail buffet.",
      icon: "sparkles",
      accentColor: "#0D9488",
      bgGradient: "from-emerald-50 to-teal-100"
    },
    {
      id: "wedding",
      name: "Shubh Vivah (Wedding Ceremony)",
      subName: "The Sacred Vows & Saat Phere",
      date: "09 February 2027",
      time: "04:30 PM Barat Arrival | 06:15 PM Hastamelap",
      venue: "Main Mandap Lawn, Om Shiv Celebration",
      dressCode: "Traditional Royal Indian • Maroon, Gold & Pastel Silks",
      description: "The grand royal procession (Baraat), traditional Varmala under fireworks, sacred Vedic chants, and seven sacred vows around the holy fire.",
      icon: "heart",
      accentColor: "#D4AF65",
      isMain: true,
      bgGradient: "from-rose-50 to-amber-100"
    },
    {
      id: "reception",
      name: "Grand Royal Reception",
      subName: "Dinner Gala & Celebrations",
      date: "09 February 2027",
      time: "08:30 PM Onwards",
      venue: "Grand Celebration Lawn, Om Shiv Celebration",
      dressCode: "Formal Indian Royale or Black-Tie Tuxedo",
      description: "Meet, greet and celebrate with the newly wedded couple. Featuring live acoustic sitar fusion, multi-cuisine royal banquet, and dessert extravaganza.",
      icon: "party-popper",
      accentColor: "#9333EA",
      bgGradient: "from-purple-50 to-pink-100"
    }
  ],

  story: [
    {
      id: "story-1",
      chapter: "Chapter I",
      title: "How We Met",
      subtitle: "A Serendipitous Coffee in Pune",
      year: "November 2022",
      description: "Introduced through mutual university friends at a quaint artisan bakery in Koregaon Park. A brief conversation over pour-over coffee and architecture portfolios ended up stretching for four unforgettable hours until closing time.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "story-2",
      chapter: "Chapter II",
      title: "The Beginning",
      subtitle: "From Friends to Soulmates",
      year: "October 2024",
      description: "Late night drives to the hilltops of Sinhagad, sharing our deepest dreams and fears, and discovering that in every laughter and silence, our values, humor, and aspirations were made for each other.",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "story-3",
      chapter: "Chapter III",
      title: "The Journey",
      subtitle: "Adventures Across Oceans",
      year: "December 2025",
      description: "Exploring heritage palaces of Rajasthan, sunset sails across Udaipur's Lake Pichola, and trekking misty trails together. Every journey strengthened our bond and convinced our families that this match was written in the stars.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "story-4",
      chapter: "Chapter IV",
      title: "Forever Starts Here",
      subtitle: "The Royal Sunset Proposal",
      year: "February 2026",
      description: "Underneath a celestial canopy illuminated by hundreds of floating diyas overlooking the historic lake, Prajwal asked the question of a lifetime. With tears of joy and full hearts, Pratiksha said yes!",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80"
    }
  ],

  gallery: [
    {
      id: "g1",
      category: "portrait",
      title: "Royal Elegance",
      subtitle: "In Traditional Silks",
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: "g2",
      category: "engagement",
      title: "The Golden Ring",
      subtitle: "A Promise of Eternity",
      url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: "g3",
      category: "moments",
      title: "Laughter in the Courtyard",
      subtitle: "Shared Smiles",
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: "g4",
      category: "portrait",
      title: "Heritage Archway",
      subtitle: "Palace Romance",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: "g5",
      category: "moments",
      title: "Diya Lights & Shimmer",
      subtitle: "Evening Magic",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: "g6",
      category: "engagement",
      title: "Sunset By The Lake",
      subtitle: "Udaipur Whispers",
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85"
    }
  ],

  faqs: [
    {
      q: "What is the dress code for the Wedding and Reception?",
      a: "For the Wedding Ceremony (Shubh Vivah), we encourage traditional Indian attire such as rich silk sarees, lehengas, kurtas, or sherwanis in shades of maroon, gold, or royal pastels. For the Reception, traditional royal wear or black-tie tuxedos/formal suits are welcomed."
    },
    {
      q: "How do I reach the venue from Nagpur Airport / Railway Station?",
      a: "The Grand Imperial Palace is located on Wardha Road, just 5-7 minutes away from Dr. Babasaheb Ambedkar International Airport (NAG) and 20 minutes from Nagpur Junction Railway Station. Cab services (Uber, Ola, pre-paid taxis) are readily available 24/7."
    },
    {
      q: "Is parking and valet available at the venue?",
      a: "Yes, complimentary white-glove valet parking is provided for all guests at the main entrance gate with capacity for over 500 vehicles."
    },
    {
      q: "Are hotel accommodations provided for out-of-town guests?",
      a: "Yes! Rooms have been reserved for out-of-town guests at Hotel Pride Nagpur and Radisson Blu Nagpur. Please contact our hospitality desk upon RSVP to confirm your check-in dates."
    }
  ],

  initialWishes: [
    {
      id: "w-1",
      name: "Aarav & Meera Sharma",
      message: "Dearest Prajwal and Pratiksha! Wishing you both a lifetime of unconditional love, laughter, and divine blessings. Counting down the days to celebrate in Nagpur!",
      date: "Nov 2026",
      hearts: 14
    },
    {
      id: "w-2",
      name: "Dr. Kulkarni & Family",
      message: "Heartiest congratulations to the Deshmukh and Patil families! May Lord Ganesha bless Prajwal & Pratiksha with endless prosperity, happiness, and peace.",
      date: "Nov 2026",
      hearts: 22
    },
    {
      id: "w-3",
      name: "Rohan, Shreya & Team Pune",
      message: "From that first coffee in KP to the grand Mandap! So ecstatic for you both! Get ready for the wildest Sangeet performance of the decade!",
      date: "Nov 2026",
      hearts: 31
    }
  ],

  social: {
    instagram: "https://instagram.com",
    whatsappShareText: "You're invited to celebrate the grand royal wedding of Prajwal & Pratiksha on 09 February 2027 in Nagpur! View the interactive wedding invitation here: "
  },

  hospitalityContact: {
    name: "Wedding Concierge & Hospitality Desk",
    phone: "+91 98230 00000 / +91 98220 00000",
    email: "prajwal.pratiksha2027@gmail.com"
  }
};
