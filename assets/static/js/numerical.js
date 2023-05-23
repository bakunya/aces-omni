(function(){
  const MAX = 20;
  const VERSION = _VERSION_;
  const ROWID = _ROWID_;
  const USER = _USER_;
  const BATCH = _BATCH_;
  const URL = `/${BATCH}/numerical`;
  const TIMEOUT = document.location.origin.startsWith("https") ? 10 : 100;
  const IDLE = 0, ACTIVE = 1, DONE = 9, DELAYED = -1;
  const ITEMS = [];
  const FIGURES = [];
  for (let i = 0; i<MAX; i++) {
    ITEMS.push({ id: i + 1, status: IDLE })
  }

  let
    PAGE_ID = 0,
    SELECTION = null,
    CLIENTTIME = 0,
    AUTORUN = false,
    SKIPPING = false,
    SKIPPED = false,
    ALL_TOUCHED = false;

  function shuffle(array) {
    const copy = [...array]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function rselect() {
    return shuffle(['a','b','c','d','e'])[0];
  }

  function nextId() {
    let item = ITEMS.find(x => x.status == IDLE);
    if (item) {
      return item.id;
    } else {
      item = ITEMS.find(x => x.status == DELAYED && x.id > PAGE_ID)
        || ITEMS.find(x => x.status == DELAYED);
      if (item) {
        return item.id
      }
    }
    return null;
  }

  function closeApp() {
    document.location = `/${BATCH}`;
  }

  function showApp() {
    // Autorun event listeners
    autorun.addEventListener('change', (e) => {
      AUTORUN = e.target.checked;
      btnNext.disabled = !AUTORUN;
    })
    // Input event listeners
    document.querySelectorAll('input[type="radio"]').forEach(elm => {
      elm.addEventListener('change', (e) => {
        SELECTION = e.target.value;
        btnNext.disabled = false;
      })
    })
    // Button event listeners
    btnNext.addEventListener("click", post);
    btnSkip.addEventListener("click", skip);
    btnClose.addEventListener("click", closeApp);
    // Show app
    app.style.display = "block";
    window.scrollTo(0, app.getBoundingClientRect().top + window.scrollY)
    setTimeout(()=>intro.remove(), 1000);
    CLIENTTIME = new Date().getTime();
  }

  function init(reqid = null, data = null) {
    return {
      method: 'POST',
      body: JSON.stringify({
        version: VERSION,
        rowid: ROWID,
        reqid: reqid,
        data: data,
      })
    }
  }

  function setItem(item) {
    SELECTION = null;
    PAGE_ID = item.id;
    page.innerText = item.id;
    // Figure 'numerical/20230313-1.html'.split('-')[1].charAt(0)
    const id = parseInt(item.figure.split('-')[1].charAt(0)) - 1;
    const fig = FIGURES[id]; // { id, html }
    figure.innerHTML = fig.html;
    numericalprompt.innerHTML = item.prompt;
    opta.innerHTML = item.a;
    optb.innerHTML = item.b;
    optc.innerHTML = item.c;
    optd.innerHTML = item.d;
    opte.innerHTML = item.e;
    btnNext.disabled = true;
    if (item.id == MAX) ALL_TOUCHED = true;
    ITEMS.find(x => x.id == item.id).status = ACTIVE;
    document.querySelectorAll('input[type="radio"]').forEach(e => {
      e.checked = false;
    })

    // Scroll
    if (item.id > 1 && item.id % 4 == 1) {
      window.scrollTo(0, 0);
    }
  }

  function canSkip() {
    return ITEMS.find(x => x.status < ACTIVE) !== undefined;
  }

  const skip = async () => {
    SKIPPING = true;
    await post();
  }

  const showSkipped = async (e) => {
    SKIPPED = true;
    ITEMS.find(x => x.id == PAGE_ID).status = ALL_TOUCHED ? DELAYED : IDLE;

    const reqid = parseInt(e.target.value);
    const rs = await fetch(URL, init(reqid));
    if (rs.ok) {
      const { item } = await rs.json();
      setItem(item);
      updateSkipButtons();
    } else {
      // TODO: ERROR handling
    }
  }

  const post = async () => {
    const main = document.querySelector('#app main')
    main.classList.add('submitting');

    const reqid = nextId();
    const rs = SKIPPING
      ? await fetch(URL, init(reqid))
      : await fetch(URL, init(reqid, {
        seq: PAGE_ID,
        sel: SELECTION != null ? SELECTION : rselect(),
        elp: new Date().getTime() - CLIENTTIME,
      }))

    if (rs.ok) {
      if (SKIPPING) {
        ITEMS.find(x => x.id == PAGE_ID).status = DELAYED;
      } else {
        ITEMS.find(x => x.id == PAGE_ID).status = DONE;
      }

      SKIPPING = false;
      SKIPPED = false;

      // Count done
      const done = ITEMS.filter(x => x.status == DONE).length;
      if (done == MAX) {
        setTimeout(()=> {
          thankyou.style.display = "block";
          window.scrollTo(0, thankyou.getBoundingClientRect().top + window.scrollY)
          setTimeout(()=>app.remove(), 200);
        }, 200);
      } else {
        const { item } = await rs.json();
        setTimeout(()=> {
          if (item) setItem(item);
          main.classList.remove('submitting');
          updateSkipButtons()
          CLIENTTIME = new Date().getTime();
          if (AUTORUN) {
            setTimeout(post, TIMEOUT);
          }
        }, 100)
      }
    } else {
      // TODO
    }
  }

  function updateSkipButtons() {
    let h = ``;
    const items = ITEMS.filter(x => x.status == DELAYED)
    items.forEach(x => {
      h += `<button value="${x.id}" class="skip skipped">${x.id}</button>`;
    })

    skippeds.innerHTML = h;
    btnSkip.disabled = !canSkip();

    if (!SKIPPED) {
      document.querySelectorAll('button.skipped').forEach(b => {
        b.addEventListener('click', showSkipped);
      })
    }
  }

  const loadFigures = async () => {
    const rs = await fetch(URL, init('figures'));
    if (rs.ok) {
      const { item, figures } = await rs.json();
      for (let i=0; i<figures.length; i++) {
        FIGURES.push({
          id: 'figure-' + (i+1),
          html: figures[i],
        })
      }

      setItem(item);
      btnStart.disabled = false;
    } else {
      // TODO: Error handling
    }
  }

  loadFigures();
  btnStart.addEventListener("click", showApp);
}())

/*
  const MAX = 20;
  const VERSION = _VERSION_;
  const ROWID = _ROWID_;
  const USER = _USER_;
  const BATCH = _BATCH_;
  const URL = `/${BATCH}/numerical`;
  const TIMEOUT = document.location.origin.startsWith("https") ? 10 : 100;
  const FIGURES = [];

  let PAGE_ID = 0, SELECTION = null, CLIENTTIME = 0, AUTORUN = false;

  function shuffle(array) {
    const copy = [...array]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function rselect() {
    return shuffle(['a','b','c','d','e'])[0];
  }

  function init(reqid = null, data = null) {
    return {
      method: 'POST',
      body: JSON.stringify({
        version: VERSION,
        rowid: ROWID,
        reqid: reqid,
        data: data,
      })
    }
  }

  function setItem(item) {
    // Figure 'numerical/20230313-1.html'.split('-')[1].charAt(0)
    const id = parseInt(item.figure.split('-')[1].charAt(0)) - 1;
    const fig = FIGURES[id]; // { id, html }
    figure.innerHTML = fig.html;
    SELECTION = null;
    PAGE_ID = item.id;
    page.innerText = item.id;
    numericalprompt.innerHTML = item.prompt;
    opta.innerHTML = item.a;
    optb.innerHTML = item.b;
    optc.innerHTML = item.c;
    optd.innerHTML = item.d;
    opte.innerHTML = item.e;
    document.querySelectorAll('.cognitive li').forEach(li => {
      li.classList.remove('selected');
    })
    // const fig = item.figure; // numerical/20230313-5.html
    // kondisi.innerHTML = document.getElementById(id).innerHTML;
    btnNext.disabled = true;
    document.querySelectorAll('input[type="radio"]').forEach(e => {
      e.checked = false;
    })

    // Scroll
    if (item.id > 1 && item.id % 4 == 1) {
      window.scrollTo(0, 0);
    }
  }

  function closeApp() {
    document.location = `/${BATCH}`;
  }

  function showApp() {
    // Autorun event listeners
    autorun.addEventListener('change', (e) => {
      AUTORUN = e.target.checked;
      btnNext.disabled = !AUTORUN;
    })
    // Input event listeners
    document.querySelectorAll('input[type="radio"]').forEach(elm => {
      elm.addEventListener('change', (e) => {
        SELECTION = e.target.value;
        document.querySelectorAll('.cognitive li').forEach(li => {
          li.classList.remove('selected');
        })
        document.getElementById('opt' + e.target.value).classList.add('selected');
        btnNext.disabled = false;
      })
    })
    // Button event listeners
    btnNext.addEventListener("click", next);
    btnClose.addEventListener("click", closeApp);
    // Show app
    app.style.display = "block";
    window.scrollTo(0, app.getBoundingClientRect().top + window.scrollY)
    setTimeout(()=>intro.remove(), 1000);
    CLIENTTIME = new Date().getTime();
  }

  const start = async () => {
    const rs = await fetch(URL, init(1))
    if (rs.ok) {
      const { item } = await rs.json();
      setItem(item);
    } else {
      // TODO: ERROR handling
    }
  }

  const next = async () => {
    const main = document.querySelector('#app main')
    main.classList.add('submitting');
    const id = PAGE_ID < MAX ? PAGE_ID + 1 : null;
    const rs = await fetch(URL, init(id, {
      seq: PAGE_ID,
      sel: SELECTION != null ? SELECTION : rselect(),
      elp: new Date().getTime() - CLIENTTIME,
    }))
    if (rs.ok) {
      if (PAGE_ID == MAX) {
        setTimeout(()=> {
          thankyou.style.display = "block";
          window.scrollTo(0, thankyou.getBoundingClientRect().top + window.scrollY)
          setTimeout(()=>app.remove(), 200);
        }, 200);
      } else {
        const { item } = await rs.json();
        setTimeout(()=> {
          setItem(item);
          main.classList.remove('submitting');
          CLIENTTIME = new Date().getTime();
          if (AUTORUN) {
            setTimeout(next, TIMEOUT);
          }
        }, 100)
      }
    } else {
      // TODO: ERROR handling
    }
  }

  const loadFigures = async () => {
    const rs = await fetch(URL, init('figures'));
    if (rs.ok) {
      const { item, figures } = await rs.json();
      for (let i=0; i<figures.length; i++) {
        FIGURES.push({
          id: 'figure-' + (i+1),
          html: figures[i],
        })
      }

      setItem(item);
      btnStart.disabled = false;
    } else {
      // TODO: Error handling
    }
    // console.log(FIGURES.length, FIGURES[0]);
  }

  // start();
  loadFigures();
  btnStart.addEventListener("click", showApp);
*/