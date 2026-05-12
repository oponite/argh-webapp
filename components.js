/***
 Template for <nav-header> instances
 ***/
const navTemplate = document.createElement('template');
navTemplate.innerHTML = `
  <style>
      :host {
    /* keep nav bar visible/on top while scrolling */
      position: sticky;
      top: 0;
      
      /* Make header a full-width block */
      display: block;
      width: 100%;
       
      /* Background styling */
      
      background: linear-gradient(
        180deg,
        rgb(66 27 54 / 0.8) 0%,   /* start */
        rgb(66 27 54 / 0.8) 20%,  /* stay solid until 1/5 */
        transparent 100%          /* then fade out */
      );

       
      /* Shadow for “popped out” effect */ 
      box-shadow:
        0 2px 0 rgba(255, 255, 255, 0.06),
        0 10px 25px rgba(0, 0, 0, 0.4);
    }

    nav {
    
      /* Keeps content aligned and not too stretched on wide screens */

      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      gap: 1rem;
      padding: 1rem 1.25rem;
      align-items: center;
    }

    a {
    
       /* Link styling */

      color: white;
      text-decoration: none;
      font-weight: 700;
      letter-spacing: 0.2px;
      opacity: 0.92;
    }

    a:hover {
      opacity: 1;
      text-decoration: underline;
    }
  </style>

  <nav></nav>
`;

// Define the <nav-header> custom element
class NavHeader extends HTMLElement {
  connectedCallback() {
    /* Create Shadow DOM so:
       - styling of elements is encapsulated
       - templates can be cloned for use */
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(navTemplate.content.cloneNode(true));

    const nav = shadow.querySelector('nav');
    // Defining all links here for easy instantiation
    const links = [
      { href: 'http://150.136.95.244/', text: 'Home' },
      { href: '/pages/net_worth.html', text: 'Money' },
      { href: '/pages/about.html', text: 'About' },
    ];

    links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.text;
      nav.appendChild(a);
    });

  }
}


/***
 Template for <card-component> instances
 ***/
const cardTemplate = document.createElement('template');
cardTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      max-width: 360px;
    }

    .card {
      border-radius: 12px;
      overflow: hidden;
      background: rgb(173, 165, 165);
      color: white;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      height: 100%;  
      width: 100%;
    }

    /* --- Slots will go here in a later step --- */
  </style>

  <div class="card">
    <!-- card content will be injected here -->
  </div>
`;

/* Define the <card-component> custom element */
class CardComponent extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(cardTemplate.content.cloneNode(true));

    // Read size attributes and apply them to the host element
    const width = this.getAttribute('width');
    const height = this.getAttribute('height');

    if (width) this.style.width = width;
    if (height) this.style.height = height;
  }
}


/* Register all custom elements so they can be used in HTML */
customElements.define('nav-header', NavHeader);
customElements.define('card-component', CardComponent);
