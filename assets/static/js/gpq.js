(function(){
  const MAX = 120;
  const VERSION = _VERSION_;
  const ROWID = _ROWID_;
  const USER = _USER_;
  const BATCH = _BATCH_;
  const URL = '/selftest/gpq';
  const TIMEOUT = document.location.origin.startsWith("https") ? 10 : 100;

  let PAGE_ID = 0, SELECTION = null, CLIENTTIME = 0, AUTORUN = false;
  let PAGE_ELEMENTS = [];

  function shuffle(array) {
    const copy = [...array]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
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
    PAGE_ELEMENTS = [item.elm_a, item.elm_b];
    PAGE_ID = item.id;
    page.innerText = item.id;
    prompta.innerText = item.prompt_a;
    promptb.innerText = item.prompt_b;
    radioa.value = item.elm_a;
    radiob.value = item.elm_b;
    btnNext.disabled = true;
    document.querySelectorAll('input[name="gpq"]').forEach(e => {
      e.checked = false;
    })
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
    document.querySelectorAll('input[name="gpq"]').forEach(elm => {
      elm.addEventListener('change', (e) => {
        SELECTION = e.target.value;
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
      sel: SELECTION || shuffle(PAGE_ELEMENTS)[0],
      elp: new Date().getTime() - CLIENTTIME,
    }))
    if (rs.ok) {
      if (PAGE_ID == MAX) {
        setTimeout(()=> {
          thankyou.style.display = "block";
          window.scrollTo(0, thankyou.getBoundingClientRect().top + window.scrollY)
          setTimeout(()=>app.remove(), 500);
        }, 500);
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

  start();
  btnStart.addEventListener("click", showApp);
}())