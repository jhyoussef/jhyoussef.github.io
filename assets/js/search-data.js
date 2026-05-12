// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-writings",
          title: "writings",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/writings/";
          },
        },{id: "nav-research",
          title: "research",
          description: "A growing collection of projects &amp; descriptions of my work",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-notes",
          title: "notes",
          description: "notes and review content hub",
          section: "Navigation",
          handler: () => {
            window.location.href = "/notes/";
          },
        },{id: "nav-art",
          title: "art",
          description: "selected work and process",
          section: "Navigation",
          handler: () => {
            window.location.href = "/art/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-github-gitvent",
        
          title: "GitHub GitVent",
        
        description: "Thoughts on working with GitHub Sites",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/gitvent/";
          
        },
      },{id: "post-about-me",
        
          title: "about me",
        
        description: "Who am I?",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/about-me/";
          
        },
      },{id: "post-return-amp-aims",
        
          title: "Return &amp; Aims",
        
        description: "I&#39;m Back?",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/return/";
          
        },
      },{id: "post-launching-off-the-fossil-record",
        
          title: "Launching Off the Fossil Record",
        
        description: "an introduction - meta - introductory",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/testing-out-the-format/";
          
        },
      },{id: "art-beach-collage",
          title: 'Beach Collage',
          description: "",
          section: "Art",handler: () => {
              window.location.href = "/art/beach-collage/";
            },},{id: "art-birds",
          title: 'Birds',
          description: "",
          section: "Art",handler: () => {
              window.location.href = "/art/birds/";
            },},{id: "art-eckhart",
          title: 'Eckhart',
          description: "",
          section: "Art",handler: () => {
              window.location.href = "/art/eckhart-ink/";
            },},{id: "art-eve-in-the-garden",
          title: 'Eve in the Garden',
          description: "",
          section: "Art",handler: () => {
              window.location.href = "/art/eve-in-the-garden/";
            },},{id: "art-pastel-hands",
          title: 'Pastel Hands',
          description: "",
          section: "Art",handler: () => {
              window.location.href = "/art/pastel-hands/";
            },},{id: "art-pterodactylus",
          title: 'Pterodactylus',
          description: "",
          section: "Art",handler: () => {
              window.location.href = "/art/pterodactylus/";
            },},{id: "art-pterosaur-skulls",
          title: 'Pterosaur Skulls',
          description: "",
          section: "Art",handler: () => {
              window.location.href = "/art/pteosaur-skulls/";
            },},{id: "art-skull-studies",
          title: 'Skull Studies',
          description: "",
          section: "Art",handler: () => {
              window.location.href = "/art/skull-studies/";
            },},{id: "news-welcome-to-my-blog-sparkles-smile",
          title: 'Welcome to my blog! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "note_areas-earth-history",
          title: 'Earth History',
          description: "History of the Earth, as we know it.",
          section: "Note_areas",handler: () => {
              window.location.href = "/notes/earth-history/";
            },},{id: "notes-cambrian-explosion-review",
          title: 'Cambrian Explosion Review',
          description: "...",
          section: "Notes",handler: () => {
              window.location.href = "/notes/earth-history/cambrian-explosion/";
            },},{id: "projects-multivariate-ecological-traits",
          title: 'Multivariate Ecological Traits',
          description: "Exploring diet - and other ecological areas - as multivariate traits, and notes on different representations of it in literature",
          section: "Projects",handler: () => {
              window.location.href = "/projects/multivariate-ecology/";
            },},{id: "projects-phylogenetics-amp-pterosaurs",
          title: 'Phylogenetics &amp;amp; Pterosaurs',
          description: "reviewing the state and history of pterosaur phylogenetics and phylogenetics as a whole",
          section: "Projects",handler: () => {
              window.location.href = "/projects/pterosaur-phylogenetics/";
            },},{id: "projects-reviewing-vertebrate-anatomy",
          title: 'Reviewing Vertebrate Anatomy',
          description: "a project where I post my progress learning generalized vertebrate anatomy",
          section: "Projects",handler: () => {
              window.location.href = "/projects/reviewing-vert-anatomy/";
            },},{
        id: 'social-bluesky',
        title: 'Bluesky',
        section: 'Socials',
        handler: () => {
          window.open("https://bsky.app/profile/offthefossilrecord.bsky.social", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6A%75%6C%69%61%79%6F%75%73%73%65%66@%6F%75%74%6C%6F%6F%6B.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/juliayoussef.science", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-spotify',
        title: 'Spotify',
        section: 'Socials',
        handler: () => {
          window.open("https://open.spotify.com/user/_arget_", "_blank");
        },
      },];
