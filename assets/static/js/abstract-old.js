(function(){
	const MAX = 10;
	const VERSION = _VERSION_;
	const ROWID = _ROWID_;
	const URL = '/selftest/abstract';
	const TIMEOUT = document.location.origin.startsWith("https") ? 10 : 100;
	const IDLE = 0, ACTIVE = 1, DONE = 9, DELAYED = -1;
	const ITEMS = [];
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
  
	function shuffle(array) {
	  const copy = [...array]
	  for (let i = copy.length - 1; i > 0; i--) {
		  const j = Math.floor(Math.random() * (i + 1));
		  [copy[i], copy[j]] = [copy[j], copy[i]];
	  }
	  return copy;
	}
  
	function rselect() {
	  return shuffle(['a','b','c','d','e','f'])[0];
	}
  
	function closeApp() {
	  document.location = '/selftest' // `/${BATCH}`;
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
	  figure.innerHTML = item.figure;
	  btnNext.disabled = true;
	  if (item.id == MAX) ALL_TOUCHED = true;
	  ITEMS.find(x => x.id == item.id).status = ACTIVE;
	  document.querySelectorAll('input[type="radio"]').forEach(e => {
		e.checked = false;
	  })
	}
  
	function canSkip() {
	  return ITEMS.find(x => x.status < ACTIVE) !== undefined;
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
  
	const start = async () => {
	  // const rs = await fetch('/selftest/abstract', init(nextId()))
	  const rs = await fetch(URL, init(nextId()))
	  if (rs.ok) {
		const { item } = await rs.json();
		setItem(item);
	  } else {
		// TODO: ERROR handling
	  }
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
  
	start();
	btnStart.addEventListener("click", showApp);
  }())