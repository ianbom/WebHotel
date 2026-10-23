# Reference analysis

Inspection dates: 2026-10-22 to 2026-10-23. Visual source: M Design Group. Identity/content source: Lifetime Design. User confirmed authorization for Lifetime assets/content, and that live reference structure wins over the written section list.

## Evidence and measurements

Rendered desktop screenshots of all five reference pages were captured at 1440 x 900. Actual content viewport is 1425px because the scrollbar occupies 15px. Desktop content maximum width: 1200px. Header: 70.8px, white, logo left, four navigation links, language controls, rectangular contact button. Editorial headings use Cormorant Garamond 64px/400; hero uses Inter 59.2px/400, line-height 76.96px; hero supporting copy 28.8px/42px. Reference fonts are replaced only through licensed distributions of the same families.

Homepage: header; two-slide hero (photographic fallbacks plus YouTube background); introduction and three flip panels; dark company section with project image carousel; four article previews in a two-column grid; large photographic CTA; footer. No standalone extra portfolio gallery. Measured introduction padding 120px top/bottom, 1200px inner width, three 380 x 458px panels. Company section about 489px high. Contact banner 500px high. Footer about 467px with 75px top padding. At the measured viewport hero region was approximately 966px; responsive behavior is rechecked during visual QA.

Expertise: centered heading/subtitle; full-width image panel; asymmetric two-panel row; full-width design/build panel; large whitespace; footer. Captions bottom-left on dark overlays; exploration links revealed on hover/focus.

About: edge-to-edge two-column photograph/philosophy; dark block with three logo/copy rows and dividers; six image/text entries along a vertical timeline; footer. Lifetime history must not reuse reference founder, dates, factory claims, or milestones.

Articles: centered awards heading; four-column showcase grid (ten items); large vertical gap; editorial heading; six horizontal article cards with a narrower featured-article sidebar; footer. Use verified Lifetime editorial highlights in the showcase, never fictional awards or copied award pedestals.

Contact: three service/brand contact rows with logos, address/phone/social columns and map areas; light-surface inquiry section; footer. Form has two-column first/last name, email/phone, full-width message and compact rectangular send control. Decorative WordPress honeypots are not replicated.

## Mobile and interactions

Initial mobile captures were invalid because stylesheet/media-query state had not settled after emulation; they are not used as measurements. Reloading at 390px (mobile=false CDP width override) produced correct typography and layout: 44px header, 23.8px editorial headings, 20px contact-banner title, compact logo-left/hamburger-right navigation, and an approximately 400px hero. Mobile screenshot confirms full-width image crop, left-aligned hero copy, centered intro, and one-column brand presentation. All five mobile pages, tablet and large-screen captures were subsequently inspected; implemented navigation, keyboard reveal and slider behavior passed browser checks. Broken reference behavior does not override accessibility/no-overflow requirements.

Observed image carousel configuration: one visible slide, autoplay 5000ms, slide transition 500ms, infinite loop, pause on hover/interaction. Hero uses two distinct captions and arrow/dot controls. Despite the source's flip-box class names, rendered brand hover slides the front upward and reveals the back, rather than rotating in 3D. Keyboard focus reveals the same content; touch activates the service link directly. Reduced motion disables autoplay and reduces transitions to effectively instantaneous changes.

All five reference pages were subsequently captured full-page at 390, 768 and 1920px as well as desktop 1440px. Mobile navigation was opened and captured. At 768px, fresh computed styles measured a 45px header, 43.5px hero heading, 18px supporting copy, 30px editorial headings, 15px company body and three vertically stacked 705 x 250px brand panels. Tablet hero height is approximately 500px and CTA approximately 280px (screenshot estimates). Company layout remains two-column; article previews become one column of horizontal cards. These require separate tablet rules, not scaled desktop or enlarged phone styling. Expertise keeps its asymmetric middle row. Reference fonts also include Montserrat for intro copy and Poppins for company copy; licensed versions are supplied locally.

Lifetime supplied source pages were rendered and scrolled, including about, portfolio, projects, interior, architecture, estate and blog. The official linked HOIRe site rendered. The linked furniture site returned a TLS/browser error; its unavailable page was not bypassed or used to invent details. Several original Lifetime sections expose broken WordPress shortcodes; unavailable content and unsupported statistics are omitted.

## Identity and content mapping

Lifetime source CSS exposes #000000, #151515, #1F1F1F, #333333, #707070, #FFFFFF, #F2F2F2 and gold #C7A46A (also #DAA521, #B1861B, #F1E4C0). Use the muted gold for brand ornament/logo, not low-contrast small text on white. Preserve reference light/dark placement with these tokens, not Lifetime's original predominantly dark page layout.

Home brand panels: Lifetime Design Interior, Lifetime Design Arsitektur, Lifetime Design Furniture. Expertise adds Design & Build. Official source links include web.ldfurniture.co.id and hoire.co. Estate/HOIRe are related links, not extra homepage cards.

Verified homepage copy says 'Sejak 2007' and 'lebih dari 15 tahun'. Do not infer project totals from broken animated counters showing zero. Timeline: 2007 beginning plus clearly undated service descriptions, not fictional chronology. Projects include The Soho Story, Titi Kamal's House, Tranquil House, Mr. Toni, Mrs. Vitri, Mrs. Yanti, Mrs. Vaya, Mrs. Nike, Mrs. Vera; match each image to its actual source page.

Canonical contact page: https://lifetimedesign.co/kontak/ lists 0811-1256-162 and lidia@lifetimedesign.co. Address: Jl. Pangeran Antasari No.70, RW.8, Cilandak Barat, Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430. Promotional WhatsApp links use several other numbers; do not treat them as canonical. Shared office details are labeled as shared rather than inventing brand branches.

Article sources: six genuine entries from the official blog, preserving their source dates/titles and original links. The source blog has no proven Lifetime awards; use editorial highlights instead. Indonesian navigation/copy by default; no pretend language toggle. Contact form explicitly opens email, never submits to a nonexistent server.

## Asset requirements and limits

Local genuine wordmark; at least two high-resolution landscape hero photographs; three portrait-cropped brand images; four expertise photographs; project-carousel images; about/philosophy/history images; six article thumbnails and corresponding detail content. Preserve reference containers and adjust object-position rather than changing layout to fit assets.

No reference images, logos, written business content, proprietary source code, or decorative image assets ship in the application. Reference screenshots are inspection artifacts only. Reproduce the subtle architectural line treatment using original CSS rather than copying its background artwork. Full source inventory is in asset-sources.md. Exact identity, photography, text wrapping, missing awards, image-for-video hero, and accessibility corrections are deliberate differences, not pixel-identical claims.
