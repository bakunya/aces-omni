(function(){
  const MAX = 45;
  const VERSION = _VERSION_;
  const ROWID = _ROWID_;
  const SEQUENCE = _SEQUENCE_.split(":");
  const URL = '/selftest/gmate';
  const TIMEOUT = document.location.origin.startsWith("https") ? 10 : 100;
  const IDLE = 0, ACTIVE = 1, DONE = 9, DELAYED = -1;
  const CONDITIONS = {
    a:'', b:'', c:'', d:'', e:'', f:'', g:'', h:'', i:'', j:'', k:'', l:'', m:'',
    n:'', o:'', p:'', q:'', r:'', s:'', t:'', u:'', v:'', w:'', x:'', y:'', z:'',
  }

  const ITEMS = [];
  SEQUENCE.forEach(key => {
    ITEMS.push({ id: ITEMS.length + 1, seq: key, status: IDLE })
  })

  let
    COUNTER = 0,
    PAGE_ID = 0,
    PAGE_SEQ = '',
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

  function nextItem() {
    let item = ITEMS.find(x => x.status == IDLE);
    if (item) return item;
    item = ITEMS.find(x => x.status == DELAYED && x.id > PAGE_ID)
        || ITEMS.find(x => x.status == DELAYED);
    return item || null;
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
    document.location = "/selftest";
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

  // reqid -> a1, a2, m1, m2, ...
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
    PAGE_SEQ = item.seq;
    page.innerText = item.id;

    // Figure/condition
    if (item.seq.endsWith("1")) {
      const key = item.seq.charAt(0)
      kondisi.innerHTML = CONDITIONS[key]
    }

    gmateprompt.innerHTML = item.prompt;
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
    if (item.seq.endsWith('1')) {
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

    const id = parseInt(e.target.value);
    const reqid = ITEMS.find(x => x.id == id).seq;
    const rs = await fetch(URL, init(reqid));
    if (rs.ok) {
      const { item } = await rs.json();
      // setItem(item);
      // Find local pair
      const localItem = ITEMS.find(x => x.seq == item.id);
      const anitem = {
        ...item,
        id: localItem.id,
        seq: item.id,
      }
      setItem(anitem);
      updateSkipButtons();
    } else {
      // TODO: ERROR handling
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

  const post = async () => {
    console.log("post()")
    const main = document.querySelector('#app main')
    main.classList.add('submitting');

    const reqItem = nextItem();
    const reqid = reqItem ? reqItem.seq : null;
    // Increment counter eachtime posting
    if (!SKIPPING) COUNTER++;

    /* Temporary commented
    const rs = SKIPPING
    ? await fetch(URL, init(reqid))
    : await fetch(URL, init(reqid, {
        counter: COUNTER,
        seq: PAGE_SEQ, // PAGE_ID,
        sel: SELECTION != null ? SELECTION : rselect(),
        elp: new Date().getTime() - CLIENTTIME,
      }))
    */

    // [ Start DEV
    const options = SKIPPING ? init(reqid) : init(reqid, {
      counter: COUNTER,
      seq: PAGE_SEQ, // PAGE_ID,
      sel: SELECTION != null ? SELECTION : rselect(),
      elp: new Date().getTime() - CLIENTTIME,
    })

    console.log("BODY", options.body)
    const rs = await fetch(URL, options)
    // ] End DEV

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
      console.log("done:", done);
      if (done == MAX) {
        setTimeout(()=> {
          thankyou.style.display = "block";
          window.scrollTo(0, thankyou.getBoundingClientRect().top + window.scrollY)
          setTimeout(()=>app.remove(), 200);
        }, 200);
      } else {
        const { item } = await rs.json();
        setTimeout(()=> {
          if (item) {
            // Find local pair
            const localItem = ITEMS.find(x => x.seq == item.id);
            const anitem = {
              ...item,
              id: localItem.id,
              seq: item.id,
            }
            setItem(anitem);
          }
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

  const loadConditions = async () => {
    const key = "conditions:" + ITEMS[0].seq;
    const rs = await fetch(URL, init(key));

    if (rs.ok) {
      const { item, conditions } = await rs.json();
      Object.keys(conditions).forEach(k => {
        CONDITIONS[k] = conditions[k]
      })

      const anitem = {
        ...item,
        id: ITEMS[0].id,
        seq: item.id,
      }

      setItem(anitem);
      btnStart.disabled = false;
    } else {
      // TODO: Error handling
    }
  }

  loadConditions();
  btnStart.addEventListener("click", showApp);
}())