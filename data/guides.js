// HazwoperOSHA.org learning center articles. Rendered by tools/build.js into guides/<slug>/.
// Body is HTML. Link tokens are checked at build time:
//   {{course:slug}} or {{course:slug|link text}}   {{guide:slug|text}}   {{quiz:slug|text}}
// Every <h2> becomes a table-of-contents entry.
module.exports = [
  {
    slug: 'how-to-read-a-safety-data-sheet',
    title: 'How to Read a Safety Data Sheet (SDS): All 16 Sections Explained',
    short: 'Reading an SDS',
    desc: 'A section-by-section lesson on reading a GHS safety data sheet: hazard identification, pictograms, signal words, first aid, PPE, exposure limits, stability and spill response.',
    related: ['osha-40-hour-hazwoper-training', 'osha-24-hour-hazwoper-training', 'osha-4-hour-hazwoper-first-responder-awareness-level-training'],
    quiz: 'sds-and-ghs-quiz',
    body: `
<p>Every hazardous chemical sold in the United States ships with a <strong>safety data sheet</strong>. OSHA's Hazard Communication Standard (29 CFR 1910.1200) requires manufacturers and importers to write one, and employers to keep it readily accessible to workers on every shift. On a hazardous waste site or during a spill, the SDS is often the fastest way to learn what a chemical can do to you and how to protect yourself.</p>

<h2>The format: 16 sections in a fixed order</h2>
<p>Since HazCom was aligned with the Globally Harmonized System (GHS), every SDS uses the same 16 headings in the same order (Appendix D to 1910.1200). Once you know where things are, you can find answers in seconds.</p>
<div class="table-wrap"><table>
<thead><tr><th>#</th><th>Section</th><th>Look here for</th></tr></thead>
<tbody>
<tr><td>1</td><td>Identification</td><td>Product name, recommended use, supplier, emergency phone number</td></tr>
<tr><td>2</td><td>Hazard(s) identification</td><td>Hazard class, signal word, pictograms, hazard and precautionary statements</td></tr>
<tr><td>3</td><td>Composition / ingredients</td><td>Chemical names, CAS numbers, concentrations</td></tr>
<tr><td>4</td><td>First-aid measures</td><td>What to do for inhalation, skin, eye and ingestion exposures; key symptoms</td></tr>
<tr><td>5</td><td>Fire-fighting measures</td><td>Suitable extinguishing media, hazardous combustion products, firefighter PPE</td></tr>
<tr><td>6</td><td>Accidental release measures</td><td>Spill PPE, containment and cleanup methods</td></tr>
<tr><td>7</td><td>Handling and storage</td><td>Safe handling, incompatible materials, storage conditions</td></tr>
<tr><td>8</td><td>Exposure controls / personal protection</td><td>OSHA PELs, ACGIH TLVs, engineering controls, gloves, respirators</td></tr>
<tr><td>9</td><td>Physical and chemical properties</td><td>Flash point, vapor pressure, vapor density, pH, solubility, explosive limits</td></tr>
<tr><td>10</td><td>Stability and reactivity</td><td>Conditions and materials to avoid, hazardous decomposition products</td></tr>
<tr><td>11</td><td>Toxicological information</td><td>Routes of exposure, symptoms, acute and chronic effects, carcinogenicity</td></tr>
<tr><td>12-15</td><td>Ecological, disposal, transport, regulatory</td><td>Required on the sheet, but OSHA does not enforce their content because other agencies regulate those areas</td></tr>
<tr><td>16</td><td>Other information</td><td>Date of preparation or last revision</td></tr>
</tbody></table></div>

<h2>Section 2: reading the hazard summary</h2>
<p>Section 2 is the one-glance summary, and it matches the container label.</p>
<ul>
<li><strong>Signal word.</strong> "Danger" is used for the more severe hazards and "Warning" for the less severe. Only one appears.</li>
<li><strong>Pictograms.</strong> Red-bordered diamonds: flame, flame over circle (oxidizer), exploding bomb, gas cylinder, corrosion, skull and crossbones, exclamation mark, health hazard (the silhouette with a starburst) and environment. OSHA does not require the environment pictogram.</li>
<li><strong>Hazard statements</strong> describe the hazard ("Causes severe skin burns and eye damage"). <strong>Precautionary statements</strong> tell you what to do ("Wear protective gloves").</li>
</ul>

<h2>The sections a field worker uses most</h2>
<p>When you are deciding how to work safely, go straight to these:</p>
<ol>
<li><strong>Section 8</strong> for exposure limits and the PPE the manufacturer recommends. Compare the limits with your air monitoring readings.</li>
<li><strong>Section 9</strong> for flash point (fire risk), vapor density (above 1 means vapors sink into low areas) and the lower and upper explosive limits.</li>
<li><strong>Section 10</strong> for incompatibles, so you don't store or bulk a waste with something it reacts with.</li>
<li><strong>Section 4</strong> before work starts, so first aid isn't a surprise.</li>
<li><strong>Section 6</strong> if something spills.</li>
</ol>

<h2>Limits of an SDS</h2>
<ul>
<li>It describes the product as sold. Waste mixtures, aged drums and reaction products may behave differently.</li>
<li>Glove advice is often general ("chemical-resistant gloves"). Check a glove manufacturer's permeation chart for the actual chemical.</li>
<li>Check the revision date in Section 16 and ask for the current sheet if it looks old.</li>
<li>On an unknown-waste site there may be no SDS at all, which is why site characterization and air monitoring come first.</li>
</ul>
<p>Test yourself with the {{quiz:sds-and-ghs-quiz|SDS and GHS quiz}}.</p>
`,
    faq: [
      ['How many sections are on a safety data sheet?', 'Sixteen, always in the same order, as required by OSHA 29 CFR 1910.1200 Appendix D.'],
      ['Which SDS section lists the PPE to wear?', 'Section 8, Exposure controls/personal protection, which also lists exposure limits such as OSHA PELs and ACGIH TLVs.'],
      ['What is the difference between the signal words Danger and Warning?', 'Danger is used for more severe hazards and Warning for less severe hazards. Only one signal word appears on a label or SDS.'],
    ],
  },

  {
    slug: 'using-the-dot-emergency-response-guidebook',
    title: 'How to Use the DOT Emergency Response Guidebook (ERG)',
    short: 'Using the ERG',
    desc: 'Lesson on the DOT Emergency Response Guidebook: the yellow, blue, orange and green sections, UN/NA numbers, placards, highlighted materials and isolation distances.',
    related: ['osha-4-hour-hazwoper-first-responder-awareness-level-training', 'osha-40-hour-hazwoper-for-emergency-response-fire-hazmat-teams', 'osha-8-hour-hazwoper-q-incident-command-training'],
    quiz: 'erg-quiz',
    body: `
<p>The <strong>Emergency Response Guidebook (ERG)</strong> is published by the U.S. Department of Transportation's Pipeline and Hazardous Materials Safety Administration with Transport Canada and Mexico's transportation agency. It is written for first responders in the first 30 minutes of a transportation incident involving hazardous materials, before more detailed information is available. HAZWOPER awareness-level responders are expected to know how to use it. A new edition comes out about every four years.</p>

<h2>Step 1: identify the material</h2>
<p>You need one of these, gathered from a safe distance, upwind and uphill:</p>
<ul>
<li>The 4-digit <strong>UN or NA identification number</strong> on a placard, orange panel or shipping paper</li>
<li>The <strong>proper shipping name</strong> on shipping papers or package markings</li>
<li>If nothing else, the <strong>placard</strong> itself (diamond shape, color and class number)</li>
</ul>
<p>Never walk into a cloud, spill or fire to read a label. Binoculars help.</p>

<h2>Step 2: find the guide number</h2>
<div class="table-wrap"><table>
<thead><tr><th>Section</th><th>Color</th><th>How it's organized</th></tr></thead>
<tbody>
<tr><td>ID number index</td><td>Yellow-bordered pages</td><td>By 4-digit UN/NA number, giving the 3-digit guide number and name</td></tr>
<tr><td>Name index</td><td>Blue-bordered pages</td><td>Alphabetically by material name, giving the guide number and ID number</td></tr>
<tr><td>Guides</td><td>Orange-bordered pages</td><td>Numbered guides 111 to 174 with hazards and actions</td></tr>
<tr><td>Isolation and protective action distances</td><td>Green-bordered pages</td><td>Distances for highlighted toxic-by-inhalation and water-reactive materials</td></tr>
</tbody></table></div>
<p>If you only have a placard, the white pages at the front show placards with the guide to use. A guide number followed by the letter <strong>P</strong> means the material can polymerize violently when heated or contaminated.</p>

<h2>Step 3: read the orange guide</h2>
<p>Each orange guide has three parts:</p>
<ul>
<li><strong>Potential hazards</strong>: fire or explosion, and health. The more important of the two is listed first.</li>
<li><strong>Public safety</strong>: who to call, an immediate isolation distance in all directions, protective clothing and evacuation advice.</li>
<li><strong>Emergency response</strong>: fire, spill or leak, and first aid actions.</li>
</ul>

<h2>Step 4: check for highlighted materials</h2>
<p>Entries highlighted in the yellow and blue pages are <strong>toxic inhalation hazard (TIH)</strong> materials, chemical warfare agents, or materials that give off toxic gas when spilled in water. For these, go to the green pages:</p>
<ul>
<li><strong>Initial isolation zone</strong>: a circle around the spill where people may be exposed to dangerous concentrations upwind and downwind</li>
<li><strong>Protective action zone</strong>: an area downwind where people should be evacuated or sheltered in place, with separate day and night distances. Night distances are often larger because the air is more stable</li>
<li>Small spills and large spills have different distances</li>
</ul>
<p>If a highlighted material is <strong>on fire</strong>, use the evacuation distance in the orange guide's public safety section instead, because fire changes how the material spreads.</p>

<h2>Hazard classes on placards</h2>
<ol>
<li>Explosives</li>
<li>Gases (flammable, non-flammable, toxic)</li>
<li>Flammable liquids</li>
<li>Flammable solids, spontaneously combustible and dangerous-when-wet materials</li>
<li>Oxidizers and organic peroxides</li>
<li>Toxic and infectious substances</li>
<li>Radioactive materials</li>
<li>Corrosives</li>
<li>Miscellaneous hazardous materials</li>
</ol>

<h2>What awareness-level responders do next</h2>
<p>Under HAZWOPER paragraph (q)(6)(i), awareness-level responders recognize the release, identify the material if they can, isolate the area, make notifications and then stay out of it. Containing or stopping the release takes operations or technician training. Practice with the {{quiz:erg-quiz|ERG quiz}}.</p>
`,
    faq: [
      ['What do the colored pages in the ERG mean?', 'Yellow pages list materials by ID number, blue pages list them by name, orange pages are the response guides, and green pages give isolation and protective action distances for highlighted materials.'],
      ['What does a highlighted entry in the ERG mean?', 'It is a toxic inhalation hazard material, a chemical warfare agent, or a material that releases toxic gas in water. Use the green pages for isolation and protective action distances unless it is on fire.'],
      ['What does the letter P after a guide number mean?', 'The material may polymerize violently when heated or contaminated.'],
    ],
  },

  {
    slug: 'toxicology-basics-for-hazmat-workers',
    title: 'Toxicology Basics for Hazmat Workers: Dose, Routes and Health Effects',
    short: 'Toxicology basics',
    desc: 'Plain-English toxicology for hazardous waste and hazmat workers: dose-response, LD50 and LC50, local and systemic effects, target organs, carcinogens, sensitizers and synergy.',
    related: ['osha-40-hour-hazwoper-training', 'osha-8-hour-hazwoper-refresher-training', 'osha-24-hour-hazwoper-training'],
    quiz: 'toxicology-quiz',
    body: `
<p>Toxicology is the study of how chemicals harm living things. You don't need a degree to use its basic ideas, and they explain most of the safety rules you follow on a hazardous waste site.</p>

<h2>The dose makes the poison</h2>
<p>Almost anything is harmful at a high enough dose, and many dangerous chemicals are harmless at a low enough one. Dose depends on <strong>concentration</strong> (how much is in the air, water or soil), <strong>duration</strong> (how long you're exposed) and <strong>frequency</strong> (how often). Controls such as ventilation, PPE, work-rest cycles and staying upwind all work by reducing one of those three.</p>
<p>A <strong>dose-response curve</strong> shows how the effect grows as the dose increases. For many effects there's a threshold below which no harm is seen. For some carcinogens, regulators assume there is no completely safe threshold, which is why exposures are kept as low as reasonably possible.</p>

<h2>LD50 and LC50</h2>
<ul>
<li><strong>LD50</strong> (lethal dose 50%): the dose, usually in milligrams per kilogram of body weight, that killed half of the test animals. A smaller LD50 means a more toxic chemical.</li>
<li><strong>LC50</strong> (lethal concentration 50%): the same idea for an airborne concentration over a set time.</li>
</ul>
<p>These numbers compare the acute toxicity of chemicals. They say nothing about long-term effects such as cancer, and they are not "safe" levels for people. You'll find them in Section 11 of the {{guide:how-to-read-a-safety-data-sheet|safety data sheet}}.</p>

<h2>How chemicals get in</h2>
<ul>
<li><strong>Inhalation</strong>: gases, vapors, mists, fumes and dusts. The lungs have a huge surface area and pass chemicals into the blood quickly.</li>
<li><strong>Skin and eye contact</strong>: corrosives burn on contact, and many solvents and pesticides pass through intact skin. A "skin" notation on an exposure limit flags this.</li>
<li><strong>Ingestion</strong>: usually hand-to-mouth from eating, drinking or smoking without washing.</li>
<li><strong>Injection</strong>: punctures from contaminated sharps, glass or metal.</li>
</ul>

<h2>Local and systemic effects</h2>
<p>A <strong>local</strong> effect happens where the chemical touches the body: an acid burn, eye irritation, a cough from an irritant gas. A <strong>systemic</strong> effect happens after the chemical is absorbed and carried elsewhere. The organ a chemical mainly damages is its <strong>target organ</strong>.</p>
<div class="table-wrap"><table>
<thead><tr><th>Target organ</th><th>Examples of chemicals</th><th>Possible effects</th></tr></thead>
<tbody>
<tr><td>Liver</td><td>Carbon tetrachloride, some chlorinated solvents</td><td>Liver damage, jaundice</td></tr>
<tr><td>Kidneys</td><td>Cadmium, mercury, lead</td><td>Reduced kidney function</td></tr>
<tr><td>Nervous system</td><td>Lead, mercury, organophosphate pesticides, n-hexane</td><td>Headache, dizziness, nerve damage</td></tr>
<tr><td>Blood</td><td>Benzene, carbon monoxide</td><td>Leukemia (benzene), oxygen starvation (CO)</td></tr>
<tr><td>Lungs</td><td>Silica, asbestos, chlorine, ammonia</td><td>Irritation, fibrosis, cancer</td></tr>
</tbody></table></div>

<h2>Special kinds of toxicity</h2>
<ul>
<li><strong>Carcinogens</strong> can cause cancer, often years after exposure.</li>
<li><strong>Mutagens</strong> damage genetic material.</li>
<li><strong>Reproductive toxins and teratogens</strong> affect fertility or harm a developing fetus.</li>
<li><strong>Sensitizers</strong> cause an allergic reaction that gets worse with each exposure. Once sensitized, a worker may react to tiny amounts.</li>
<li><strong>Asphyxiants</strong>: simple asphyxiants such as nitrogen or argon displace oxygen; chemical asphyxiants such as carbon monoxide or hydrogen cyanide stop the body using it.</li>
</ul>

<h2>When chemicals combine</h2>
<ul>
<li><strong>Additive</strong>: the combined effect equals the sum of the parts.</li>
<li><strong>Synergistic</strong>: the combined effect is greater than the sum. Smoking and asbestos exposure together raise lung cancer risk far more than either alone.</li>
<li><strong>Potentiation</strong>: a chemical that's harmless alone makes another one more toxic.</li>
</ul>
<p>Hazardous waste sites usually involve mixtures, which is one reason HAZWOPER leans on conservative controls and medical surveillance. Check what you've learned with the {{quiz:toxicology-quiz|toxicology quiz}}.</p>
`,
    faq: [
      ['What does LD50 mean?', 'The dose of a chemical that killed 50% of test animals, usually given in milligrams per kilogram of body weight. A lower LD50 means higher acute toxicity.'],
      ['What is a target organ?', 'The organ a chemical mainly damages after it is absorbed, such as the liver, kidneys, nervous system, blood or lungs.'],
      ['What is a synergistic effect?', 'When two exposures together cause a greater effect than the sum of each alone, such as smoking combined with asbestos exposure.'],
    ],
  },

  {
    slug: 'respirator-selection-and-fit-testing',
    title: 'Respirator Selection and Fit Testing for HAZWOPER Work',
    short: 'Respirators & fit testing',
    desc: 'How to choose a respirator under OSHA 1910.134: assigned protection factors, maximum use concentration, cartridges and filters, fit testing, seal checks and change schedules.',
    related: ['osha-40-hour-hazwoper-training', 'hazwoper-micro-module-ppe-levels-a-b-c-and-d-explained', 'osha-8-hour-hazwoper-supervisor-training'],
    quiz: 'respirator-quiz',
    body: `
<p>Respirators are covered by their own OSHA standard, <strong>29 CFR 1910.134</strong>, which applies on top of HAZWOPER. Any employer that requires respirators needs a written respiratory protection program run by a qualified program administrator.</p>

<h2>Before anyone wears a respirator</h2>
<ol>
<li><strong>Medical evaluation</strong> by a physician or other licensed health care professional, using the OSHA questionnaire or an equivalent exam, to confirm the worker can breathe through one.</li>
<li><strong>Fit test</strong> with the exact make, model, style and size of tight-fitting facepiece the worker will use.</li>
<li><strong>Training</strong> on why the respirator is needed, its limits, how to put it on, check it, maintain it and store it.</li>
</ol>

<h2>Two families of respirators</h2>
<ul>
<li><strong>Air-purifying respirators (APRs)</strong> filter or absorb contaminants from the surrounding air: filtering facepieces, half and full-face elastomeric masks with cartridges, and powered air-purifying respirators (PAPRs). They need at least 19.5% oxygen and can't be used in IDLH atmospheres.</li>
<li><strong>Atmosphere-supplying respirators</strong> provide clean air from a separate source: self-contained breathing apparatus (SCBA) or supplied-air (airline) respirators. These are used for oxygen-deficient, IDLH or unknown atmospheres.</li>
</ul>

<h2>Assigned protection factors</h2>
<p>An <strong>assigned protection factor (APF)</strong> is the level of protection a properly working, properly fitted respirator is expected to give. OSHA's table in 1910.134(d)(3)(i)(A) includes:</p>
<div class="table-wrap"><table>
<thead><tr><th>Respirator</th><th>APF</th></tr></thead>
<tbody>
<tr><td>Filtering facepiece or elastomeric half mask (air-purifying)</td><td>10</td></tr>
<tr><td>Full facepiece air-purifying</td><td>50</td></tr>
<tr><td>PAPR with loose-fitting facepiece</td><td>25</td></tr>
<tr><td>PAPR with full facepiece</td><td>1,000</td></tr>
<tr><td>SCBA, pressure-demand, full facepiece</td><td>10,000</td></tr>
</tbody></table></div>

<h2>Maximum use concentration</h2>
<p>The <strong>maximum use concentration (MUC)</strong> is the highest airborne concentration a respirator can be used in. Multiply the APF by the exposure limit. A half mask (APF 10) against a vapor with an exposure limit of 50 ppm has an MUC of 500 ppm. If air monitoring shows higher readings, step up to a respirator with a higher APF. Never use an APR above the IDLH concentration, whatever the math says.</p>

<h2>Filters and cartridges</h2>
<ul>
<li><strong>Particulate filters</strong> are rated N (not oil resistant), R (somewhat oil resistant) or P (strongly oil resistant), with efficiency 95, 99 or 100 (99.97%). P100 filters are magenta.</li>
<li><strong>Chemical cartridges</strong> are matched to the contaminant: organic vapor cartridges are black, acid gas white, ammonia/methylamine green, and combination cartridges carry more than one color.</li>
<li>Gas and vapor cartridges need an <strong>end-of-service-life indicator</strong> or a written <strong>change schedule</strong> based on objective data. Odor is not an acceptable warning.</li>
</ul>

<h2>Fit testing and seal checks</h2>
<ul>
<li>Fit testing happens before first use, <strong>at least every 12 months</strong>, and whenever the worker's face changes in a way that could affect fit (for example, major weight change or dental work).</li>
<li><strong>Qualitative fit tests</strong> use a test agent the wearer can taste or smell (saccharin, Bitrex) or that causes irritation. <strong>Quantitative fit tests</strong> use an instrument to measure leakage numerically.</li>
<li>Do a <strong>user seal check</strong> (positive and negative pressure) every time you put on a tight-fitting respirator.</li>
<li>Facial hair that comes between the sealing surface and the face isn't allowed with tight-fitting respirators.</li>
</ul>

<h2>Respirators and HAZWOPER PPE levels</h2>
<p>Level A and B ensembles use SCBA or supplied air. Level C uses an APR, which is only allowed when contaminants and concentrations are known. Try the {{quiz:respirator-quiz|respirator quiz}}.</p>
`,
    faq: [
      ['How often is respirator fit testing required?', 'Before first use, at least every 12 months, and whenever a change in the worker\'s face could affect the fit, under 29 CFR 1910.134(f).'],
      ['What is the assigned protection factor of a half-mask respirator?', 'Ten, for a filtering facepiece or elastomeric half-mask air-purifying respirator.'],
      ['How do you calculate maximum use concentration?', 'Multiply the respirator\'s assigned protection factor by the exposure limit of the contaminant. Never use an air-purifying respirator at or above IDLH.'],
    ],
  },

  {
    slug: 'heat-stress-in-chemical-protective-clothing',
    title: 'Heat Stress in Chemical Protective Clothing: Signs, Prevention and Monitoring',
    short: 'Heat stress in PPE',
    desc: 'Why chemical protective clothing causes heat stress, the signs of heat exhaustion and heat stroke, work-rest cycles, hydration, acclimatization and physiological monitoring.',
    related: ['osha-40-hour-hazwoper-training', 'hazwoper-micro-module-ppe-levels-a-b-c-and-d-explained', 'osha-8-hour-hazwoper-supervisor-training'],
    quiz: 'heat-stress-quiz',
    body: `
<p>On many hazardous waste sites, heat hurts more people than chemicals do. Chemical protective clothing is designed to keep liquids and vapors out, which also stops sweat from evaporating, and evaporation is the body's main way of cooling off. Workers in Level A or B can overheat even on a mild day.</p>

<h2>Heat illnesses from mild to deadly</h2>
<div class="table-wrap"><table>
<thead><tr><th>Illness</th><th>Signs</th><th>What to do</th></tr></thead>
<tbody>
<tr><td>Heat rash</td><td>Red, itchy bumps where clothing traps sweat</td><td>Keep skin dry, rest in a cool place</td></tr>
<tr><td>Heat cramps</td><td>Painful muscle spasms during or after work</td><td>Rest, drink water or an electrolyte drink</td></tr>
<tr><td>Heat syncope</td><td>Fainting or dizziness when standing for long periods or standing up suddenly</td><td>Sit or lie down in the shade, drink fluids</td></tr>
<tr><td>Heat exhaustion</td><td>Heavy sweating, weakness, headache, nausea, cool clammy skin, fast pulse</td><td>Stop work, move to shade, remove PPE after decon, cool down, drink. Get medical help if no better within an hour</td></tr>
<tr><td>Heat stroke</td><td>Confusion, slurred speech, collapse, seizures, very high body temperature; skin may be hot and dry or still sweating</td><td><strong>Medical emergency.</strong> Call 911, cool the person immediately with water, ice or wet cloths, and stay with them</td></tr>
</tbody></table></div>
<p>Confusion is the warning sign that separates heat stroke from heat exhaustion. Don't wait for a worker to stop sweating before calling for help.</p>

<h2>Who is most at risk</h2>
<ul>
<li>New workers and anyone returning from a week or more away, who aren't acclimatized</li>
<li>Workers in fully encapsulating suits or heavy turnout gear</li>
<li>People who are dehydrated, ill, or taking certain medications</li>
<li>Anyone doing heavy work such as shoveling, drum handling or carrying equipment</li>
</ul>

<h2>Prevention on site</h2>
<ul>
<li><strong>Acclimatize</strong> new workers by building up their time in heat and PPE gradually over the first one to two weeks.</li>
<li><strong>Work-rest cycles</strong>: plan shorter work periods in heavier PPE and hotter conditions, with rest in a shaded, cool area.</li>
<li><strong>Hydrate</strong> before, during and after work. A common recommendation is about one cup of water every 15 to 20 minutes during work in the heat, rather than large amounts at once.</li>
<li><strong>Schedule</strong> heavy work for the cooler parts of the day where possible.</li>
<li><strong>Cooling gear</strong>: cooling vests with ice or phase-change packs, cooled air in supplied-air systems, and shaded rest areas with fans or misters.</li>
<li><strong>Buddy system</strong>: partners watch each other for early signs.</li>
</ul>

<h2>Physiological monitoring</h2>
<p>When workers wear impermeable clothing in warm conditions, guidance from NIOSH, OSHA, the Coast Guard and EPA recommends monitoring them during rest breaks. Common methods:</p>
<ul>
<li><strong>Heart rate</strong> at the start of the rest period. If it is above 110 beats per minute, shorten the next work cycle by a third and keep the rest period the same.</li>
<li><strong>Body temperature</strong> (oral or ear) at the end of the work period. If it is above 99.6°F (37.6°C), shorten the next work cycle by a third. A worker shouldn't go back into impermeable clothing with a temperature above 100.6°F (38.1°C).</li>
<li><strong>Body weight</strong> before and after the shift, to check fluids are being replaced.</li>
</ul>
<p>Your site safety and health plan sets the actual work-rest schedule and monitoring triggers.</p>

<h2>State heat rules</h2>
<p>Some states have their own heat illness standards, including California (outdoor and indoor rules in Title 8), Washington, Oregon, Colorado (agriculture), Minnesota (indoor) and Maryland. If you work in one of these states, follow the state rule as well as your site plan. Check yourself with the {{quiz:heat-stress-quiz|heat stress quiz}}.</p>
`,
    faq: [
      ['Why does chemical protective clothing cause heat stress?', 'It stops sweat from evaporating, which is the body\'s main way of cooling down, so body heat builds up even in mild weather.'],
      ['What is the difference between heat exhaustion and heat stroke?', 'Heat exhaustion causes heavy sweating, weakness and nausea. Heat stroke adds confusion, collapse or seizures and a very high body temperature, and is a medical emergency requiring 911 and immediate cooling.'],
      ['How is heat stress monitored for workers in protective suits?', 'Common methods are checking heart rate at the start of rest, body temperature at the end of work, and body weight before and after the shift, then adjusting work-rest cycles.'],
    ],
  },

  {
    slug: 'drum-and-container-handling',
    title: 'Drum and Container Handling at Hazardous Waste Sites',
    short: 'Drum & container handling',
    desc: 'How HAZWOPER 1910.120(j) governs handling drums and containers: inspection, unlabeled drums, bulging and leaking drums, overpacks, opening, sampling, staging and buried drums.',
    related: ['osha-40-hour-hazwoper-training', 'osha-40-hour-hazwoper-for-environmental-remediation', 'osha-24-hour-hazwoper-rcra-tsd-operations-training'],
    quiz: 'hazmat-field-safety-quiz',
    body: `
<p>Drums are where many of the worst accidents at cleanup sites start: a corroded drum splits when lifted, an unknown liquid reacts with another, or a bulging drum ruptures when someone loosens the bung. Paragraph (j) of the HAZWOPER standard sets out rules for handling, transporting, labeling and disposing of drums and containers.</p>

<h2>Before moving anything</h2>
<ul>
<li><strong>Inspect first.</strong> Drums and containers must be inspected and their integrity confirmed before they are moved. Look for corrosion, bulging, leaks, crystals around bungs, and labels or markings.</li>
<li><strong>Treat unlabeled drums as hazardous</strong> until their contents are identified and characterized.</li>
<li><strong>Keep handling to a minimum.</strong> Move drums only as much as the work requires.</li>
<li><strong>Brief the crew</strong> on the hazards before work starts, and keep the area clear of non-essential people.</li>
</ul>

<h2>Equipment and spill readiness</h2>
<ul>
<li>Use drum-handling equipment rated for the job, with operator cabs protected against vapors, splashes and explosions where needed.</li>
<li>Keep <strong>salvage (overpack) drums</strong>, suitable absorbent and DOT-specification containers ready where spills or leaks may occur.</li>
<li>Have a <strong>spill containment program</strong> ready to stop and contain the entire volume being moved.</li>
<li>Use non-sparking tools and grounding where flammable vapors may be present.</li>
</ul>

<h2>Drums that need special care</h2>
<div class="table-wrap"><table>
<thead><tr><th>Condition</th><th>Why it's dangerous</th><th>Typical precautions</th></tr></thead>
<tbody>
<tr><td>Bulging or swollen</td><td>Pressure buildup from reaction or heat can cause rupture</td><td>Don't move unless necessary; vent remotely or with shielding; keep people back</td></tr>
<tr><td>Leaking or corroded</td><td>Releases contents and may fail when lifted</td><td>Overpack or transfer contents; contain spills first</td></tr>
<tr><td>Crystals around the bung or lid</td><td>May indicate shock-sensitive or peroxide-forming material</td><td>Treat as possibly explosive; get specialist help</td></tr>
<tr><td>Laboratory packs</td><td>Many small containers of mixed chemicals</td><td>Only opened by trained, experienced personnel</td></tr>
<tr><td>Radioactive markings or readings</td><td>Radiation exposure</td><td>Stop and get a radiation safety officer</td></tr>
</tbody></table></div>

<h2>Opening and sampling</h2>
<ul>
<li>Open drums remotely or from behind a barrier where the contents are unknown or pressure is suspected.</li>
<li>Monitor the air as the drum is opened, and stay upwind.</li>
<li>Keep the people doing the work to the minimum needed, with backup personnel and emergency equipment nearby.</li>
<li>Never stand on drums, and don't open more drums than you can sample at one time.</li>
</ul>

<h2>Staging and bulking</h2>
<p>Group drums by compatibility, not convenience. Characterize the contents (often with field hazard categorization tests) before bulking any wastes together, and keep incompatible groups apart: acids from bases, oxidizers from flammables and organics, water-reactives away from water. Label each drum with its staging category.</p>

<h2>Buried drums</h2>
<p>Before excavation, locate buried drums with methods such as ground-penetrating radar or magnetometers so equipment doesn't puncture them. Dig carefully once you're close. Check your knowledge with the {{quiz:hazmat-field-safety-quiz|field safety quiz}}.</p>
`,
    faq: [
      ['How should unlabeled drums be treated at a hazardous waste site?', 'As containing hazardous substances until their contents are identified and characterized.'],
      ['What should be ready before moving drums that may leak?', 'Salvage (overpack) drums, suitable absorbent, appropriate containers and a spill containment plan for the full volume being moved.'],
      ['What do crystals around a drum bung indicate?', 'They may indicate shock-sensitive or peroxide-forming material. Treat the drum as potentially explosive and get specialist help.'],
    ],
  },

  {
    slug: 'confined-spaces-at-hazardous-waste-sites',
    title: 'Confined Spaces at Hazardous Waste Sites: Permits, Roles and Rescue',
    short: 'Confined spaces',
    desc: 'Permit-required confined spaces under OSHA 1910.146 and 1926 Subpart AA on hazardous waste sites: definitions, atmospheric testing order, entrant, attendant and supervisor roles, and rescue.',
    related: ['osha-40-hour-hazwoper-training', 'osha-air-monitoring-and-gas-detection-training', 'osha-8-hour-hazwoper-supervisor-training'],
    quiz: 'hazmat-field-safety-quiz',
    body: `
<p>Tanks, vaults, pits, sumps, sewers and trenches are common at cleanup sites, and the HAZWOPER site safety and health plan must include confined space entry procedures. The detailed rules come from OSHA's confined space standards: 29 CFR 1910.146 for general industry and 29 CFR 1926 Subpart AA for construction.</p>

<h2>What counts as a confined space</h2>
<p>A space is a <strong>confined space</strong> if it is large enough for a worker to enter, has limited or restricted ways in or out, and isn't designed for continuous occupancy. It becomes a <strong>permit-required confined space</strong> if it also has one or more of these:</p>
<ul>
<li>A hazardous atmosphere, or the potential for one</li>
<li>Material that could engulf an entrant</li>
<li>Inwardly converging walls or a floor that slopes to a smaller cross-section that could trap or asphyxiate someone</li>
<li>Any other recognized serious safety or health hazard</li>
</ul>

<h2>Testing the atmosphere</h2>
<p>Test before entry and keep monitoring while people are inside. Test in this order:</p>
<ol>
<li><strong>Oxygen</strong>: acceptable range 19.5% to 23.5%</li>
<li><strong>Combustible gases and vapors</strong>: a hazardous atmosphere includes flammable gas above 10% of the lower flammable limit</li>
<li><strong>Toxic gases and vapors</strong>: compare with exposure limits</li>
</ol>
<p>Test at different levels: top, middle and bottom. Heavy gases settle and light gases rise. Ventilation helps, but it doesn't replace testing.</p>

<h2>The entry permit</h2>
<p>The written permit is signed by the entry supervisor before entry and posted at the entrance. It lists the space, purpose, date and duration, authorized entrants, attendants, entry supervisor, hazards, isolation and control measures, acceptable entry conditions, test results, rescue services, communication methods and required equipment.</p>

<h2>The three roles</h2>
<div class="table-wrap"><table>
<thead><tr><th>Role</th><th>Responsibilities</th></tr></thead>
<tbody>
<tr><td>Authorized entrant</td><td>Knows the hazards, uses equipment correctly, stays in contact with the attendant, alerts the attendant to warning signs, and leaves when ordered or when an alarm sounds</td></tr>
<tr><td>Attendant</td><td>Stays outside the space for the whole entry, keeps count of entrants, monitors conditions, orders evacuation, summons rescue, keeps unauthorized people out, and never enters to attempt rescue unless relieved and trained</td></tr>
<tr><td>Entry supervisor</td><td>Checks the permit and conditions, authorizes entry, confirms rescue is available, and ends the entry and cancels the permit when work is done or conditions change</td></tr>
</tbody></table></div>

<h2>Rescue</h2>
<p>Would-be rescuers make up a large share of confined space deaths: a coworker sees someone collapse and goes in after them without protection. The plan must name a rescue service that can respond in time, and non-entry rescue with a retrieval system (harness and lifeline attached to a mechanical device for vertical spaces deeper than 5 feet) should be the default where it doesn't add risk.</p>

<h2>Confined spaces and HAZWOPER</h2>
<p>On a hazardous waste site, a confined space can hold unknown chemicals, so atmospheric testing ties directly into air monitoring and PPE selection. Entry in Level A or B ensembles adds heat stress and mobility problems that the plan must address. Quiz yourself with the {{quiz:hazmat-field-safety-quiz|field safety quiz}}.</p>
`,
    faq: [
      ['What makes a confined space permit-required?', 'Having a hazardous atmosphere or the potential for one, engulfment hazards, inwardly converging walls or a sloping floor that could trap someone, or any other serious safety or health hazard.'],
      ['In what order should confined space air be tested?', 'Oxygen first, then combustible gases and vapors, then toxic gases and vapors.'],
      ['Can the attendant enter the space to rescue an entrant?', 'No. The attendant stays outside and summons rescue. They may only enter if relieved by another attendant and trained and equipped for rescue.'],
    ],
  },

  {
    slug: 'hazardous-chemical-spill-response-steps',
    title: 'Hazardous Chemical Spill Response: Step by Step',
    short: 'Spill response steps',
    desc: 'Step-by-step hazardous chemical spill response: incidental vs emergency releases, protecting yourself, isolating the area, identifying the material, containment, spill kits and reporting to the National Response Center.',
    related: ['osha-spill-prevention-and-response-safety-training', 'spill-response-equipment-spill-kit-selection-and-use', 'osha-4-hour-hazwoper-first-responder-awareness-level-training'],
    quiz: 'hazmat-field-safety-quiz',
    body: `
<p>What you should do about a chemical spill depends first on one question: is it an <strong>incidental release</strong> or an <strong>emergency</strong>? The answer decides whether you clean it up or get away and call for help.</p>

<h2>Incidental release or emergency?</h2>
<p>OSHA treats a release as <strong>incidental</strong> when the substance can be absorbed, neutralized or otherwise controlled at the time of release by employees in the immediate work area or by maintenance staff, and it poses no significant safety or health hazard. Cleaning up incidental spills isn't HAZWOPER emergency response, though workers still need hazard communication training and the right PPE.</p>
<p>It's an <strong>emergency</strong> if any of these apply:</p>
<ul>
<li>The release is large, spreading, or you can't tell how big it is</li>
<li>You don't know what the material is</li>
<li>People are injured or showing symptoms</li>
<li>There's fire, explosion risk, or a toxic vapor cloud</li>
<li>It needs more help or equipment than people in the area have</li>
<li>It's reaching drains, waterways or soil</li>
</ul>
<p>Only workers trained under HAZWOPER paragraph (q) may respond to an emergency release.</p>

<h2>The steps</h2>
<ol>
<li><strong>Stop and assess from a distance.</strong> Look for placards, labels, vapors, odors, fire and injured people. Don't touch, walk through or breathe the material.</li>
<li><strong>Protect yourself and others.</strong> Move upwind and uphill. Warn people nearby.</li>
<li><strong>Isolate the area.</strong> Keep people out. For transportation incidents, use the isolation distance in the {{guide:using-the-dot-emergency-response-guidebook|Emergency Response Guidebook}}.</li>
<li><strong>Notify.</strong> Follow your emergency response plan: supervisor, emergency coordinator, 911 or your facility's emergency number.</li>
<li><strong>Identify the material</strong> from labels, shipping papers or the {{guide:how-to-read-a-safety-data-sheet|safety data sheet}}.</li>
<li><strong>Contain, if trained.</strong> Operations-level responders take defensive action: diking, damming, diverting, covering drains, absorbing.</li>
<li><strong>Stop the leak, if trained.</strong> Plugging and patching is technician-level work.</li>
<li><strong>Clean up and decontaminate.</strong> Package waste in labeled containers, decontaminate people and equipment, and restock the spill kit.</li>
<li><strong>Report and review.</strong> Make required reports and learn from what happened.</li>
</ol>

<h2>What goes in a spill kit</h2>
<ul>
<li>Absorbents matched to the chemicals on site: universal, oil-only or hazmat/chemical (for acids and bases)</li>
<li>Socks or booms for diking, pads and loose absorbent</li>
<li>Drain covers or plugs</li>
<li>Neutralizers for acids or bases, where appropriate</li>
<li>PPE: chemical-resistant gloves, goggles, face shield, suits and boot covers</li>
<li>Non-sparking scoop and scraper, disposal bags, ties and labels, and an overpack container</li>
</ul>

<h2>Reporting requirements</h2>
<p>Releases of a hazardous substance at or above its <strong>reportable quantity</strong> within 24 hours must be reported right away to the <strong>National Response Center at 1-800-424-8802</strong> under CERCLA. EPCRA may also require notice to state and local emergency planning bodies, oil spills into water have their own reporting rules, and many states set lower thresholds. Your emergency response plan should list who makes these calls. Check your knowledge with the {{quiz:hazmat-field-safety-quiz|field safety quiz}}.</p>
`,
    faq: [
      ['What is an incidental chemical release?', 'A release that can be absorbed, neutralized or otherwise controlled at the time by employees in the immediate area or by maintenance staff, and that poses no significant safety or health hazard. It is not HAZWOPER emergency response.'],
      ['What number do you call to report a hazardous substance release?', 'The National Response Center at 1-800-424-8802, for releases at or above the CERCLA reportable quantity. Follow your emergency plan and any state rules as well.'],
      ['Who can respond to an emergency chemical release?', 'Only workers trained under HAZWOPER paragraph (q) to the level of the duties they will perform.'],
    ],
  },

  {
    slug: 'hazwoper-jobs-and-careers',
    title: 'HAZWOPER Jobs and Careers: Who Hires, What You Need and How to Start',
    short: 'HAZWOPER careers',
    desc: 'Careers that require HAZWOPER training: environmental technicians, remediation crews, emergency spill responders, TSDF operators, industrial cleaning and field scientists, plus how to get started.',
    related: ['osha-40-hour-hazwoper-training', 'osha-40-hour-hazwoper-training-spanish', 'hazwoper-train-the-trainer-certification'],
    quiz: 'toxicology-quiz',
    body: `
<p>A 40-hour HAZWOPER certificate is the entry ticket to a wide range of field jobs in environmental cleanup, emergency response and waste management. Here's where it's used and how people get started.</p>

<h2>Jobs that commonly require HAZWOPER</h2>
<div class="table-wrap"><table>
<thead><tr><th>Job</th><th>What the work involves</th><th>Typical training</th></tr></thead>
<tbody>
<tr><td>Environmental technician</td><td>Sampling soil, water and air; running monitoring wells; assisting with site investigations</td><td>40 Hour; sometimes 24 Hour for limited tasks</td></tr>
<tr><td>Remediation laborer or equipment operator</td><td>Excavating contaminated soil, operating treatment systems, demolition on cleanup sites</td><td>40 Hour + field experience</td></tr>
<tr><td>Emergency spill responder</td><td>Responding to highway, rail, industrial and marine spills for response contractors</td><td>40 Hour, plus technician-level emergency response training</td></tr>
<tr><td>TSDF operator</td><td>Receiving, treating, storing and shipping hazardous waste at permitted facilities</td><td>24 Hour TSD + annual refresher; RCRA and DOT training</td></tr>
<tr><td>Industrial cleaning technician</td><td>Tank cleaning, vacuum truck and hydro-blasting work around hazardous residues</td><td>Often 40 Hour, plus confined space training</td></tr>
<tr><td>Geologist, engineer or field scientist</td><td>Overseeing drilling, investigations and cleanup as a consultant</td><td>40 Hour; supervisors add 8 Hour Supervisor</td></tr>
<tr><td>Facility emergency response team member</td><td>Responding to releases at a plant, refinery or warehouse</td><td>Emergency response training to the assigned level</td></tr>
<tr><td>Site safety officer</td><td>Running the site safety and health plan, monitoring and briefings</td><td>40 Hour + 8 Hour Supervisor + experience</td></tr>
</tbody></table></div>

<h2>What employers usually look for</h2>
<ul>
<li>A current HAZWOPER certificate at the right level, and a refresher within the last 12 months</li>
<li>Willingness to wear respirators and protective clothing, and to pass the related medical evaluation and fit test</li>
<li>A valid driver's license; some response jobs want a commercial license with a hazmat endorsement</li>
<li>For work at ports and some facilities, a Transportation Worker Identification Credential (TWIC)</li>
<li>Comfort with physical work outdoors in all weather</li>
<li>Extras that stand out: confined space, first aid and CPR, forklift, and Spanish-language skills</li>
</ul>

<h2>How to get started</h2>
<ol>
<li>Take the {{course:osha-40-hour-hazwoper-training|40 hour HAZWOPER course}} (also available {{course:osha-40-hour-hazwoper-training-spanish|in Spanish}}). It qualifies you for the widest range of entry-level roles.</li>
<li>Put your certificate and completion date at the top of your resume.</li>
<li>Apply to environmental consulting firms, remediation contractors, spill response companies, waste management companies and industrial cleaning firms.</li>
<li>Your employer arranges your supervised field days, medical evaluation and fit testing.</li>
<li>Keep current with an {{course:osha-8-hour-hazwoper-refresher-training|8 hour refresher}} every year.</li>
</ol>

<h2>Moving up</h2>
<p>Experienced workers move into crew lead and site supervisor roles (with the {{course:osha-8-hour-hazwoper-supervisor-training|8 hour supervisor course}}), site safety officer roles, project management, or training others as an in-house instructor with {{course:hazwoper-train-the-trainer-certification|train-the-trainer certification}}. Pay varies a lot by region, employer, travel and overtime, so compare current job postings in your area.</p>
`,
    faq: [
      ['What jobs require HAZWOPER certification?', 'Environmental technicians, remediation laborers and equipment operators, emergency spill responders, TSDF operators, industrial cleaning technicians, field scientists on cleanup sites, and facility emergency response team members, among others.'],
      ['Which HAZWOPER course should I take to get a job?', 'The 40 hour course qualifies you for the widest range of entry-level field jobs. Employers then arrange supervised field experience.'],
      ['Do I need a refresher to stay employable?', 'Yes. Employers expect a refresher within the last 12 months, since OSHA requires 8 hours of refresher training every year.'],
    ],
  },

  {
    slug: 'how-to-study-for-the-hazwoper-exam',
    title: 'How to Study for the HAZWOPER Final Exam (With the Key Numbers to Know)',
    short: 'Studying for the exam',
    desc: 'A study plan for the HAZWOPER final exam: how to pace a self-paced course, active recall, practice quizzes, and a table of the key numbers every HAZWOPER student should know.',
    related: ['osha-40-hour-hazwoper-training', 'osha-24-hour-hazwoper-training', 'osha-8-hour-hazwoper-refresher-training'],
    quiz: 'sds-and-ghs-quiz',
    body: `
<p>A self-paced online course gives you control over your schedule, which is both its best feature and its biggest trap. These habits help you finish on time and walk into the final exam confident.</p>

<h2>Pace yourself</h2>
<ul>
<li><strong>Set a daily target.</strong> For the 40-hour course, about 4 to 6 hours a day finishes in one to two working weeks. For the 8-hour refresher, one or two sittings is typical.</li>
<li><strong>Study in blocks</strong> of 45 to 60 minutes with short breaks. You'll remember more than in one long session.</li>
<li><strong>Use a quiet space</strong> and turn off notifications while you work through modules.</li>
</ul>

<h2>Study actively</h2>
<ul>
<li><strong>Write it down.</strong> Keep a page of notes per module: one line for each rule, number or procedure.</li>
<li><strong>Explain it out loud</strong> as if you were briefing a new crew member. If you can't, review that section.</li>
<li><strong>Test yourself</strong> rather than rereading. Our free quizzes are a good start: {{quiz:sds-and-ghs-quiz|SDS and GHS}}, {{quiz:erg-quiz|ERG}}, {{quiz:toxicology-quiz|toxicology}}, {{quiz:respirator-quiz|respirators}}, {{quiz:heat-stress-quiz|heat stress}} and {{quiz:hazmat-field-safety-quiz|field safety}}.</li>
<li><strong>Relate it to real work.</strong> Picture the site you'll work on and how each rule applies there.</li>
</ul>

<h2>Key numbers to know</h2>
<div class="table-wrap"><table>
<thead><tr><th>Number</th><th>What it means</th></tr></thead>
<tbody>
<tr><td>40 / 24 / 8 hours</td><td>General site worker, occasional site worker, and annual refresher training</td></tr>
<tr><td>3 days / 1 day</td><td>Supervised field experience for 40-hour and 24-hour workers</td></tr>
<tr><td>8 extra hours</td><td>Additional training for on-site supervisors</td></tr>
<tr><td>8 hours</td><td>Minimum training for first responder operations level</td></tr>
<tr><td>24 hours</td><td>Minimum training for hazmat technicians and incident commanders</td></tr>
<tr><td>19.5% / 23.5%</td><td>Oxygen deficient below, oxygen enriched above</td></tr>
<tr><td>10% LFL</td><td>Flammable atmosphere is hazardous above this in confined spaces</td></tr>
<tr><td>30 days</td><td>Exposure above limits or respirator use that triggers medical surveillance</td></tr>
<tr><td>12 months</td><td>Medical exams, respirator fit tests and HAZWOPER refreshers</td></tr>
<tr><td>30 years</td><td>How long medical and exposure records are kept after employment</td></tr>
<tr><td>15 minutes</td><td>Averaging time for a short-term exposure limit</td></tr>
<tr><td>APF 10 / 50 / 10,000</td><td>Half-mask, full-face APR, and pressure-demand SCBA</td></tr>
<tr><td>16 sections</td><td>On every safety data sheet</td></tr>
<tr><td>1-800-424-8802</td><td>National Response Center</td></tr>
</tbody></table></div>

<h2>On exam day</h2>
<ul>
<li>Read each question twice, and watch for words like "not", "always", "first" and "best".</li>
<li>Eliminate answers you know are wrong, then choose between what's left.</li>
<li>Questions about "first" actions usually come down to protecting yourself: stay back, stay upwind, identify and notify.</li>
<li>If you're unsure, think about which answer matches the safest practice.</li>
</ul>

<h2>After you pass</h2>
<p>Download your certificate and wallet card straight away, send a copy to your employer, and put your refresher due date in your calendar. Ready to start? The {{course:osha-40-hour-hazwoper-training|40 hour course}} is self-paced and saves your progress automatically.</p>
`,
    faq: [
      ['How long does it take to finish the 40 hour HAZWOPER course online?', 'At least 40 hours of training time. Studying about 4 to 6 hours a day, most people finish in one to two working weeks.'],
      ['What is the best way to study for the HAZWOPER exam?', 'Study in focused blocks, take notes per module, explain topics out loud, and test yourself with practice quizzes rather than only rereading.'],
      ['What numbers should I memorize for HAZWOPER?', 'Training hours (40, 24, 8), field days (3 and 1), oxygen limits (19.5% and 23.5%), the 30-day medical surveillance trigger, 30-year record retention, the 15-minute STEL and respirator protection factors.'],
    ],
  },
];
