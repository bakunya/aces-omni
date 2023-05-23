(function(){
  const MAX = 60;
  const VERSION = _VERSION_;
  const ROWID = _ROWID_;
  const USER = _USER_;
  const BATCH = _BATCH_;
  const URL = `/${BATCH}/gpro`;
  const TIMEOUT = document.location.origin.startsWith("https") ? 10 : 100;

  let PAGE_ID = 0, SELECTA = null, SELECTB = null, CLIENTTIME = 0, AUTORUN = false;

  function shuffle(array) {
    const copy = [...array]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function randomSelect() {
    return shuffle([
      [0, 3],
      [1, 2],
      [2, 1],
      [3, 0],
    ])[0];
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
    SELECTA = null;
    SELECTB = null;
    PAGE_ID = item.id;
    page.innerText = item.id;
    prompta.innerText = item.prompt_a;
    promptb.innerText = item.prompt_b;
    btnNext.disabled = true;
    document.querySelectorAll(".score-label").forEach(elm => {
      elm.classList.remove("selected");
    })
    document.querySelectorAll('input[type="radio"]').forEach(e => {
      e.checked = false;
    })
  }

  function closeApp() {
    document.location = `/${BATCH}`;
  }

  function select(a, b) {
    document.querySelector("#radio-a-" + a).checked = true;
    document.querySelector("#radio-b-" + b).checked = true;
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
        const val = parseInt(e.target.value);
        const id = e.target.id;
        console.log(id, val);
        if (id.includes('b')) {
          SELECTB = val;
          SELECTA = 3 - SELECTB;
        } else {
          SELECTA = val;
          SELECTB = 3 - SELECTA;
        }
        select(SELECTA, SELECTB);
        document.querySelectorAll(".score-label").forEach(elm => {
          elm.classList.remove("selected");
        })
        document.querySelector(".score-label.a" + SELECTA).classList.add("selected");
        document.querySelector(".score-label.b" + SELECTB).classList.add("selected");
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
    const random = randomSelect();
    const rs = await fetch(URL, init(id, {
      seq: PAGE_ID,
      // sel: SELECTION || shuffle(PAGE_ELEMENTS)[0],
      va: SELECTA != null ? SELECTA : random[0],
      vb: SELECTB != null ? SELECTB : random[1],
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

  start();
  btnStart.addEventListener("click", showApp);
}())