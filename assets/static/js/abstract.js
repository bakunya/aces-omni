// options utilities
class QuestionState {
	#data
	#draft
	#withDraft

	constructor(withDraft = false) {
		this.#data = {
			PAGE_ID: 0,
			CLIENTTIME: 0,
			AUTORUN: false,
			SKIPPED: false,
			SKIPPING: false,
			SELECTION: null,
			ALL_TOUCHED: false,
		}
		this.#withDraft = withDraft

		if (this.#withDraft) {
			this.#draft = {
				0: this.#data,
			}
		}
	}

	/**
	 * 
	 * @param {*} data 
	 * @returns {Promise<void>}
	 */
	mutate(data) {
		new Promise(() => {
			if(this.#withDraft) {
				this.#draft = {
					...this.#draft,
					[Object.keys(this.#draft).length]: {
						...this.#draft[Object.keys(this.#draft).length - 1],
						...data
					},
				}
			} else {
				this.#data = {
					...this.#data,
					...data,
				}
			}
		})
	}

	/**
	 * @returns {Promise<data>} Promise<data>
	 */
	get data() {
		return new Promise(res => res(this.#withDraft ? this.#draft[Object.keys(this.#draft).length - 1] : this.#data))
	}

	get draft() {
		return this.#draft
	}
}

/**
 * 
 * @param {string} id 
 * @returns {HTMLCollection}
 */
function $byID(id) {
	return document.getElementById(id)
}

/**
 * 
 * @returns {number}
 */
function getTimeOut() {
  return document.location.origin.startsWith('https') ? 10 : 100;
}

/**
 * 
 * @returns {number}
 */
function getMax() {
	return 10
}

/**
 * 
 * @returns {string}
 */
function getRowID() {
	return _ROWID_
}

/**
 * 
 * @returns {string}
 */
function getVersion() {
	return _VERSION_
}

/**
 * 
 * @returns {string}
 */
function getURLPath() {
	return '/selftest/abstract'
}

/**
 * 
 * @returns {Oject{ IDLE: 0, ACTIVE: 1, DONE: 9, DELAYED: -1 }}
 */
function getStatus() {
	return {
		IDLE: 0,
		ACTIVE: 1,
		DONE: 9,
		DELAYED: -1,
	}
}

/**
 * 
 * @returns {Object[]} questions
 */
function initQuestions() {
	return Array.from(Array(getMax()).keys()).map((x) => ({
		id: x + 1,
		status: getStatus().IDLE,
	}));
}



// utilities function
/**
 * 
 * @param {*} state
 * @returns {Promise<M>} new M
 */
function initPage(state) {
	return new Promise((res) => {
		$byID("btnStart").addEventListener("click", _ => {
			$byID('app').setAttribute('style', 'display: block;')
			window.scrollTo(0, ($byID('app').getBoundingClientRect().top + window.scrollY))
			setTimeout(() => $byID('intro').remove(), 1000);
			res({
				...state,
				CLIENTTIME: new Date().getTime(),
			})
		})
	})
}

/**
 * 
 * @param {*} requestInit 
 * @returns {Promise<question>} Promise<question>
 */
async function getQuestion(requestInit) {
	try {
		const rs = await fetch(getURLPath(), requestInit);
		if (rs.ok) {
			const { item } = await rs.json();
			return Promise.resolve(item)
		} else {
			return Promise.reject(`HTTP-Error: ${rs.status}`)
		}
	} catch (er) {
		return Promise.reject(er)
	}
};

/**
 * 
 * @param {*} questions 
 * @returns {number} next id
 */
function getNextId(state, questions) {
	for (let i = 0; i < questions.length; i++) {
		if(questions[i].status == getStatus().IDLE) {
			return questions[i].id
		}
	}
	
	for (let i = 0; i < questions.length; i++) {
		if(state.PAGE_ID <= getMax()) {
			if(questions[i].status == getStatus().DELAYED && questions[i].id > state.PAGE_ID) {
				return questions[i].id
			} 
		}

		if(state.PAGE_ID >= getMax()) {
			if(questions[i].status == getStatus().DELAYED && questions[i].id < state.PAGE_ID) {
				return questions[i].id
			} 
		}
	}

	for (let i = 0; i < questions.length; i++) {
		if(questions[i].status == getStatus().DELAYED) {
			return questions[i].id
		} 
	}

	return null
}

/**
 * 
 * @param {*} reqid request ID
 * @param {*} data data to be sent
 * @returns {Object} requestInit
 */
function getHttpBodyTemplate(reqid = null, data = null) {
    return {
		method: 'POST',
		body: JSON.stringify({
			version: getVersion(),
			rowid: getRowID(),
			reqid: reqid,
			data: data,
		}),
    }
}

/**
 * 
 * @param {Object} state
 * @param {Object} item 
 * @returns {Object} new state
 */
function initQuestion(state, item) {
	if(!item) return
	const tmp = { ...state, }

	tmp.SELECTION = null;
	tmp.PAGE_ID = item.id;
	if (item.id == getMax()) tmp.ALL_TOUCHED = true;

	$byID('btnNext').disabled = true;
	$byID('page').innerText = item.id;
	$byID('figure').innerHTML = item.figure;

	document.querySelectorAll('input[type="radio"]').forEach((e) => {
		e.checked = false;
		e.removeEventListener("change", _ => ($byID('btnNext').disabled = false))
		e.addEventListener("change", _ => ($byID('btnNext').disabled = false))
	});
	
	return tmp
}


/**
 * 
 * @param {Object[]} questions 
 * @param {Number} pageId 
 * @param {Number} status 
 */
function setCurrentQuestionStatus(questions, pageId, status) {
	for (let i = 0; i < questions.length; i++) {
		if(questions[i].id == pageId) {
			questions[i].status = status;
		}		
	}
}

/**
 * 
 * @param {Object} state 
 * @returns {Promise} http response
 */
async function submitAnswer(state) {
	return (await fetch(
		getURLPath(),
		getHttpBodyTemplate(
			getNextId(questions), 
			{
				seq: state.PAGE_ID,
				sel: getSelection(state.SELECTION),
				elp: substractDate(state.CLIENTTIME),
			}
		)
	));
}

/**
 * 
 * @param {Object[]} questions 
 * @returns {Boolean}
 */
function canBeSkipped(questions) {
    return questions.find((x) => x.status < getStatus().ACTIVE) !== undefined;
}

/**
 * 
 * @param {Object[]} questions 
 * @returns {Boolean}
 */
function isAllDone(questions) {
    return questions.filter((x) => x.status < getStatus().DONE).length <= 1;
}

/**
 * 
 * @param {Object[]} questions 
 * @param {Function} onEachClick 
 * @returns {void}
 */
function updateSkipButtons(questions, onEachClick) {
    $byID('skippeds').innerHTML = null;
	
    questions.filter((x) => x.status == getStatus().DELAYED).forEach((x) => {
		const button = document.createElement('button');
		button.value = x.id;
		button.innerText = x.id;
		button.classList.add('skip');
		button.classList.add('skipped');
		button.addEventListener('click', onEachClick);
		$byID('skippeds').appendChild(button);
    });

    $byID('btnSkip').disabled = !canBeSkipped(questions);
}

/**
 * @returns {void}
 */
function removeApp() {
	setTimeout(() => {
		$byID('thankyou').style.display = 'block';
		window.scrollTo(0, ($byID('thankyou').getBoundingClientRect().top + window.scrollY))
		setTimeout(() => $byID('app')?.remove(), 200);
	}, 200);
}

/**
 * @returns {void}
 */
function closeApp() {
    document.location = '/selftest';
}

/**
 * 
 * @param {Date} dateToSub 
 * @returns {Date}
 */
function substractDate(dateToSub) {
	return new Date().getTime() - dateToSub
}

/**
 * 
 * @returns {void}
 */
function getAnswer() {
	let an = null

	document.querySelectorAll("input[name='abstract']").forEach(i => {
		if(i.checked) (an = i.value)
	})

	return an
}

/**
 * 
 * @param {Object} QuestionState.data 
 * @param {Object[]} questions 
 * @returns {Promise}
 */
async function submitAnswer(state, questions) {
	const an = getAnswer() ?? randomSelect()
	if(!an) throw Error("invalid answer")

	return (await fetch(
		getURLPath(),
		getHttpBodyTemplate(
			getNextId(state, questions), 
			{
				sel: an,
				seq: state.PAGE_ID,
				elp: substractDate(state.CLIENTTIME),
			}
		)
	));
}

/**
 * 
 * @param {any} array 
 * @returns {any} array
 */
function shuffle(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

/**
 * 
 * @returns {string}
 */
function randomSelect() {
    return shuffle(['a', 'b', 'c', 'd', 'e', 'f'])[0];
}


// initial page
async function main() {
	// set jumlah pertanyaan
	const QUESTIONS = initQuestions()
	const M = new QuestionState(true)

	const initP = await initPage(M.data)
	await M.mutate(initP)

	// tampilkan pertanyaan (inisialisasi)
	const question = await getQuestion(getHttpBodyTemplate(getNextId((await M.data), QUESTIONS)))
	const initQ = initQuestion((await M.data), question)
	await M.mutate(initQ)
	setCurrentQuestionStatus(QUESTIONS, (await M.data).PAGE_ID, getStatus().ACTIVE)

	// function untuk menampilkan pertanyaan (menghindari duplikasi, karena digunakaan di 3 tempat berbeda)
	const showQuestion = async (pageId, isSubmitAction = false) => {
		const main = document.querySelector('#app main');
		main.classList.add('submitting');
		
		if(isSubmitAction) setCurrentQuestionStatus(QUESTIONS, (await M.data).PAGE_ID, getStatus().DONE)
		else setCurrentQuestionStatus(QUESTIONS, (await M.data).PAGE_ID, getStatus().DELAYED)
		
		const question = await getQuestion(getHttpBodyTemplate(pageId))
		const initQ = initQuestion((await M.data), question)
		await M.mutate(initQ)
		setCurrentQuestionStatus(QUESTIONS, (await M.data).PAGE_ID, getStatus().ACTIVE)

		updateSkipButtons(QUESTIONS, onEachClick)
		main.classList.remove('submitting');
	}

	// callback untuk menampilkan pertanyaan yang diskip / show skipped questions
	const onEachClick = e => showQuestion(e.target.value).catch(er => console.log("something wrong", er))

	// handle skip
	$byID('btnSkip').addEventListener('click', async _ => showQuestion(getNextId((await M.data), QUESTIONS)).catch(er => console.log("something wrong", er)));

	// handle submit
	$byID('btnNext').addEventListener('click', async _ => {
		if((await M.data).AUTORUN) {
			for (let i = 0; i < QUESTIONS.length; i++) {
				try {
					await M.mutate({ PAGE_ID: QUESTIONS[i].id })
					await submitAnswer((await M.data), QUESTIONS)
					if (isAllDone(QUESTIONS)) removeApp()
					else await showQuestion(getNextId((await M.data), QUESTIONS), true)
				} catch (er) { console.log("something wrong", er) }
			}
		}

		try {
			await submitAnswer((await M.data), QUESTIONS)
			if (isAllDone(QUESTIONS)) removeApp()
			else await showQuestion(getNextId((await M.data), QUESTIONS), true)
		} catch (er) { console.log("something wrong", er) }
	});

	// handle close from questions area
	$byID('btnClose').addEventListener('click', _ => closeApp());

	// handle autorun
	$byID("autorun").checked = false
	$byID("autorun").addEventListener("change", e => {
		if(e.target.checked) {
			M.mutate({ AUTORUN: true })
			$byID('btnNext').disabled = false
		}
	})
}

document.addEventListener('DOMContentLoaded', main);