
// Template for <nav-header> instances

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


/* Define the <nav-header> custom element */
class NavHeader extends HTMLElement {
  connectedCallback() {

    /* connectedCallback() can run more than once if the element is
       removed/re-added. This guard prevents duplicating the UI. */

    if (this._initialized) return;
    this._initialized = true;


    /* Create Shadow DOM so:
       - :host works
       - styles are encapsulated (won’t leak to the page)
       - page styles won’t accidentally break the header */

    const shadow = this.attachShadow({ mode: 'open' });


    /* Clone the template content and attach it to this instance’s Shadow DOM */
    shadow.appendChild(navTemplate.content.cloneNode(true));


    /* Get the <nav> inside Shadow DOM where we'll insert the generated links */

    const nav = shadow.querySelector('nav');

    // /* Read <nav-link> elements placed inside <nav-header> in your HTML.
    //        These are "placeholder" elements that store href + label. */
    this.querySelectorAll('nav-link').forEach(link => {
      const a = document.createElement('a');
      a.href = link.getAttribute('href');
      a.textContent = link.textContent;
      nav.appendChild(a);
    });


    /* Remove placeholder markup so it doesn't show up as plain text
       and avoids duplicates in the light DOM. */
    this.innerHTML = "";
  }
}


/* Register the custom element so <nav-header> works in HTML */
customElements.define('nav-header', NavHeader);