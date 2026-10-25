// HazwoperOSHA.org wording: a free HAZWOPER learning center. tools/build.js uses these in place of
// its default (catalog-site) copy. HTML strings may use link tokens: {{course:slug}}, {{guide:slug|text}},
// {{quiz:slug|text}}, {{price:slug}}, {{enroll:slug|classes}}, {{cart:slug|classes}}, {{cards:guides}}, {{cards:quizzes}}.
module.exports = ({ BRAND, PHONE, PHONE_HREF, EMAIL, money }) => {
  const lengthText = c => {
    const m = /^(\d+)\s*(Hour|Min)/i.exec(c.duration);
    return m ? `${m[1]}-${/min/i.test(m[2]) ? 'minute' : 'hour'}` : 'self-paced';
  };
  // What each course group's lessons concentrate on.
  const STUDY = {
    core: ['How HAZWOPER sorts workers by duty and exposure', 'Toxicology, routes of entry and exposure limits', 'Air monitoring and reading instruments', 'PPE levels A to D and respirators', 'Work zones, decontamination and emergency procedures'],
    industry: ['The full 40-hour HAZWOPER curriculum', 'Hazards and scenarios specific to your industry', 'Site characterization and monitoring for your type of site', 'PPE and decontamination for the materials you handle'],
    refresher: ['What has changed in rules and practice since your last course', 'Lessons from recent incidents', 'PPE, monitoring and decon skills review', 'Supervisor or incident command duties where the course covers them'],
    state: ['The state-plan version of the HAZWOPER rules', 'Where state requirements differ from federal OSHA', 'Core HAZWOPER hazards, PPE and procedures'],
    rcra: ['How EPA classifies hazardous waste', 'Accumulation, labeling and container rules', 'Manifests, shipping and recordkeeping', 'Emergency procedures for waste areas'],
    spill: ['One focused topic, in depth', 'Practical equipment and procedure steps', 'How the topic fits into HAZWOPER and your site plan'],
    trainer: ['Adult learning and how to run a HAZWOPER class', 'Building lesson plans, exercises and assessments', 'Recordkeeping and the trainer qualifications in 1910.120(e)(5)'],
  };
  return {
    describe: c => `Study ${c.name} online with the ${BRAND} learning center. This ${lengthText(c)} course covers ${c.citation}${c.audience ? ` and is written for ${c.audience.charAt(0).toLowerCase() + c.audience.slice(1)}` : ''}. Work through the lessons on a phone, tablet or computer, pick up where you left off any time, and download your certificate of completion once you pass the final exam.`,
    metaDesc: c => `Learn ${c.name} online: ${c.duration}, ${money(c.price)}, covering ${c.citation}. Self-paced lessons and a certificate of completion when you pass. From the ${BRAND} learning center.`,

    faq: [
      ['Are the lessons and quizzes on HazwoperOSHA.org free?', 'Yes. Every lesson and practice quiz on this site is free to read and take, with no account or sign-up.'],
      ['Do the free lessons count as OSHA HAZWOPER training?', 'No. The lessons help you learn and review, but OSHA training requirements are met by completing a full course with a final exam and certificate, plus any supervised field experience your level requires.'],
      ['Where should a beginner start?', 'Start with the lessons on reading a safety data sheet and toxicology basics, take the matching quizzes, then enroll in the 40 hour HAZWOPER course if you will work on cleanup sites.'],
      ['What are the lessons based on?', 'They summarize OSHA standards (including 29 CFR 1910.120, 1910.134, 1910.146 and 1910.1200), EPA and DOT rules, the DOT Emergency Response Guidebook and NIOSH guidance. They are written for training purposes and are not legal advice.'],
      ['Can supervisors and trainers use these lessons with a crew?', 'Yes. Link your crew to any lesson or quiz for a toolbox talk or pre-course review.'],
      ['How should I prepare for the final exam?', 'Study in focused blocks, take notes per module and test yourself with the practice quizzes. The lesson on studying for the HAZWOPER exam includes a table of the key numbers to know.'],
      ['What do I get when I finish a certificate course?', 'A printable certificate of completion and a wallet card, available as soon as you pass the final exam.'],
      ['Are courses available in Spanish?', `Yes. The OSHA 40-Hour HAZWOPER course has a full Spanish-language version. Questions? Call ${PHONE} or email ${EMAIL}.`],
    ],

    groups: {
      core: { title: 'Foundation Courses: 40, 24 & 4 Hour', blurb: 'Start here. These courses set the base level of HAZWOPER knowledge for site workers and first responders.' },
      industry: { title: 'Industry 40-Hour Programs', blurb: 'The complete 40-hour course taught through the hazards of one industry.' },
      refresher: { title: 'Stay Current: Refreshers, Supervisor & Incident Command', blurb: 'The yearly refresher plus leadership courses for supervisors and incident commanders.' },
      state: { title: 'California & State-Plan Programs', blurb: 'Versions written for workers in states that run their own OSHA programs.' },
      rcra: { title: 'Hazardous Waste (RCRA) Courses', blurb: 'For the people who generate, store, ship and track hazardous waste.' },
      spill: { title: 'Short Courses: Spills, Monitoring & PPE', blurb: 'Focused modules for building one skill at a time.' },
      trainer: { title: 'Teach HAZWOPER', blurb: 'For experienced workers ready to train others.' },
    },

    nav: [['Lessons', 'guides/'], ['Quizzes', 'quizzes/'], ['Courses', '#courses'], ['FAQ', '#faq']],
    searchPlaceholder: 'Search lessons, quizzes, courses...',
    searchExamples: 'Try: SDS section 8, ERG green pages, fit test, heat stroke, 40 hour...',
    footerBlurb: 'A free HAZWOPER learning center: plain-English lessons, practice quizzes and certified online OSHA HAZWOPER courses.',
    footerResourcesTitle: 'Learning center',
    llmsSummary: `${BRAND} is a free HAZWOPER learning center with original lessons on reading safety data sheets, the DOT Emergency Response Guidebook, toxicology, respirator selection and fit testing, heat stress, drum handling, confined spaces, spill response, HAZWOPER careers and exam preparation, plus free practice quizzes. Certified online OSHA HAZWOPER courses (40 hour, 24 hour, 8 hour refresher and more) are available for learners who need a certificate.`,

    home: {
      title: `HAZWOPER Learning Center: Free Lessons, Practice Quizzes & Online Courses | ${BRAND}`,
      desc: 'Free HAZWOPER lessons and practice quizzes on SDS, the Emergency Response Guidebook, toxicology, respirators, heat stress and confined spaces, plus certified online OSHA HAZWOPER courses.',
      eyebrow: 'Free HAZWOPER learning center',
      h1: 'Learn HAZWOPER: Free Lessons, Practice Quizzes and Certified Online Courses',
      lead: 'Build real hazmat knowledge before, during and after your HAZWOPER course. Read plain-English lessons, test yourself with free quizzes, then earn your certificate online when you are ready.',
      ctas: `<a class="btn btn-lg" href="guides/">Start the free lessons</a>
        <a class="btn btn-ghost btn-lg" href="quizzes/">Take a practice quiz</a>
        <a class="btn btn-ghost btn-lg" href="#courses">See the courses</a>`,
      trust: ['Free lessons, no sign-up', 'Practice quizzes with explanations', 'Certificates when you need them', 'English and Spanish courses'],
      quickTitle: 'Start here',
      quick: ['osha-40-hour-hazwoper-training', 'osha-8-hour-hazwoper-refresher-training', 'osha-4-hour-hazwoper-first-responder-awareness-level-training', 'hazwoper-train-the-trainer-certification'],
      quickNote: 'New to hazmat work? Read {{guide:hazwoper-jobs-and-careers|HAZWOPER jobs and careers}} first.',
      middle: `<section class="wrap which path" id="path" aria-labelledby="h-path">
  <h2 id="h-path">Your HAZWOPER learning path</h2>
  <ol class="steps">
    <li><span class="step-n">1</span><h3>Learn the basics</h3><p>Start with {{guide:how-to-read-a-safety-data-sheet|how to read a safety data sheet}} and {{guide:toxicology-basics-for-hazmat-workers|toxicology basics}}. They explain why every other safety rule exists.</p></li>
    <li><span class="step-n">2</span><h3>Practice</h3><p>Take the free quizzes, starting with the {{quiz:sds-and-ghs-quiz|SDS and GHS quiz}}. Every answer comes with an explanation.</p></li>
    <li><span class="step-n">3</span><h3>Get certified</h3><p>Enroll in the {{course:osha-40-hour-hazwoper-training|40 hour HAZWOPER course}} ({{price:osha-40-hour-hazwoper-training}}) or the level your job needs, and use {{guide:how-to-study-for-the-hazwoper-exam|our exam study guide}}.</p></li>
    <li><span class="step-n">4</span><h3>Stay current</h3><p>Come back each year for the {{course:osha-8-hour-hazwoper-refresher-training|8 hour refresher}} ({{price:osha-8-hour-hazwoper-refresher-training}}) and keep your skills sharp with new lessons.</p></li>
  </ol>
</section>`,
      coursesTitle: 'Certified Online HAZWOPER Courses',
      after: `<section class="wrap resources" id="lessons" aria-labelledby="h-lessons">
  <h2 id="h-lessons">Free lessons</h2>
  <p class="group-blurb">Original lessons on the hazmat skills that HAZWOPER courses build on.</p>
  {{cards:guides}}
  <h2 class="mt">Practice quizzes</h2>
  <p class="group-blurb">Short quizzes that score instantly and explain every answer.</p>
  {{cards:quizzes}}
</section>

<section class="wrap about" aria-labelledby="h-about">
  <h2 id="h-about">About the learning center</h2>
  <div class="cols">
    <div>
      <p>HazwoperOSHA.org is for anyone learning to work safely around hazardous materials: new environmental technicians, emergency responders, students, and experienced workers brushing up before a refresher.</p>
      <p>Our lessons summarize the OSHA, EPA and DOT rules and the NIOSH guidance that shape hazmat work, in plain English. They're written for training and review, so always follow your site safety and health plan and the current regulation text.</p>
    </div>
    <div>
      <h3>When you need a certificate</h3>
      <ul class="checks">
        <li>Self-paced courses that meet OSHA 29 CFR 1910.120 training requirements</li>
        <li>Certificate and wallet card as soon as you pass</li>
        <li>Federal OSHA, Cal/OSHA and state-plan versions</li>
        <li>40-hour course available in Spanish</li>
      </ul>
    </div>
  </div>
</section>`,
      faqTitle: 'Learning Center FAQ',
      ctaTitle: 'Ready to earn your HAZWOPER certificate?',
      ctaButtons: `{{enroll:osha-40-hour-hazwoper-training|btn btn-lg btn-dark}} <a class="btn btn-ghost btn-lg" href="guides/">Keep studying</a>`,
    },

    course: {
      whoTitle: 'Is this course right for you?',
      extra: c => `<h2>What you'll study</h2>
  <ul class="checks">${(STUDY[c.group] || STUDY.core).map(x => `<li>${x}</li>`).join('')}</ul>
  <p>Get ready with the free lesson on {{guide:how-to-study-for-the-hazwoper-exam|how to study for the HAZWOPER exam}}.</p>`,
      howTitle: 'How studying works',
      howSteps: ['Enroll online and get access right away.', 'Study the lessons in short sessions; your place is saved each time you stop.', 'Finish the knowledge checks and final exam, then download your certificate and wallet card.'],
      buyChecks: ['Access right after enrollment', 'Study at your own pace', 'Certificate when you pass'],
      resourcesTitle: 'Free lessons for this course',
      relatedTitle: 'Keep learning: related courses',
    },

    guides: {
      fullCardDesc: true,
      label: 'Lessons',
      allLink: 'All free lessons',
      cardLabel: 'Lesson',
      readLink: 'Start the lesson',
      eyebrow: 'Free lesson',
      sideCourses: 'Earn a certificate',
      moreTitle: 'More free lessons',
      hubName: `${BRAND} free lessons`,
      hubTitle: `Free HAZWOPER Lessons: SDS, ERG, Toxicology, Respirators & More | ${BRAND}`,
      hubDesc: 'Free HAZWOPER lessons: reading an SDS, using the Emergency Response Guidebook, toxicology, respirator fit testing, heat stress, drums, confined spaces, spill response, careers and exam prep.',
      hubH1: 'Free HAZWOPER Lessons',
      hubLead: 'Plain-English lessons on the hazmat skills behind every HAZWOPER course. Read them in any order, then test yourself with the matching quiz.',
    },
    quizzes: {
      fullCardDesc: true,
      allLink: 'Practice quizzes',
      hubName: `${BRAND} practice quizzes`,
      hubTitle: `Free Hazmat Practice Quizzes: SDS, ERG, Respirators & Heat Stress | ${BRAND}`,
      hubDesc: '{total} free hazmat practice questions with answers: safety data sheets, the Emergency Response Guidebook, toxicology, respirators, heat stress, drums, confined spaces and spills.',
      hubH1: 'Hazmat Practice Quizzes',
      hubLead: '{total} questions across six quizzes, each scored instantly with an explanation for every answer.',
      hubSection: 'Practice quizzes',
    },
  };
};
