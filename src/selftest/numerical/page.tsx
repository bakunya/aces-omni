import { Layout } from "../layout";

const title = "Tes Numerical";

const Intro = () => {
  return (
    <section id="intro">
      <header>
        <h1 class="text-center">{title}</h1>
      </header>
      <main>
        <h2>Pengantar</h2>
        <p>
          I was very lucky. I had a father, named Paul, who was a pretty remarkable man. He never graduated from high
          school. He joined the Coast Guard in World War II and ferried troops around the world for General Patton, and
          I think he was always getting into trouble and getting busted down to Private. He was a machinist by trade and
          worked very hard and was kind of a genius with his hands.
        </p>
        <h3 class="text-center">Petunjuk singkat</h3>
        <p>
          If you take a look, what we’ve got is a situation where most automobiles are not being designed in the United
          States. Televisions? Audio electronics? Watches, cameras, bicycles, calculators, you name it: most of the
          objects of our lives are not designed in America. We’ve blown it. We’ve blown it from an industrial point of
          view because we’ve lost the markets to foreign competitors. We’ve also blown it from a design point of view.
        </p>
        <h3 class="text-center" style="margin-top:2rem">
          Klik tombol berikut untuk mulai mengerjakan.
        </h3>
        <div class="text-center" style="margin-top:1.5rem">
          <button id="btnStart" disabled>Lanjut</button>
        </div>
      </main>
    </section>
  );
};

const Thankyou = () => {
  return (
    <section id="thankyou" style="display: none;">
      <header>
        <h1 class="text-center">SELESAI</h1>
      </header>
      <main>
        <h2>Terimakasih</h2>
        <p>
          I was very lucky. I had a father, named Paul, who was a pretty remarkable man. He never graduated from high
          school. He joined the Coast Guard in World War II and ferried troops around the world for General Patton, and
          I think he was always getting into trouble and getting busted down to Private. He was a machinist by trade and
          worked very hard and was kind of a genius with his hands.
        </p>
        <h3 class="text-center" style="margin-top:2rem">
          Klik tombol berikut kembali ke Daftar Tes.
        </h3>
        <div class="text-center" style="margin-top:1.5rem">
          <button id="btnClose">Kembali</button>
        </div>
      </main>
    </section>
  );
};

const App = (props: { user: Persona }) => {
  return (
    <section id="app" style="display: none;">
      <header>
        <h1>{title}</h1>
        <div class="infobar">
          <div class="user">
            <span class="user">{props.user.fullname}</span>
            <label class="cognitive" style="margin-left:1rem">
              <input type="checkbox" id="autorun" />
              <span>Autorun</span>
            </label>
          </div>
          <span class="time">123</span>
        </div>
      </header>
      <main>
        <h2>
          Halaman <span id="page"></span>
        </h2>
        {/* <h3>Data/Informasi</h3> */}
        <figure id="figure" style="margin:1.5rem 0;overflow-x:auto;"></figure>

        {/* <h3>Pertanyaan</h3> */}

        <p id="numericalprompt" style="font-weight:500"></p>

        <h3>Tentukan jawaban Anda</h3>
        <hr />

        <div class="numericalopts">
          <div>
            <label>
              <input type="radio" name="numerical" value="a" />
              <span id="opta"></span>
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="numerical" value="b" />
              <span id="optb"></span>
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="numerical" value="c" />
              <span id="optc"></span>
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="numerical" value="d" />
              <span id="optd"></span>
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="numerical" value="e" />
              <span id="opte"></span>
            </label>
          </div>
          {/* <div>
            <div style="display:flex;gap:.75rem">
              <span style="width:17px;font-size:1.2rem;color:#aaa;">◎</span>
              <span style="flex-grow:1">
                <button id="btnSkip" class="skip">
                  Lewati
                </button>
              </span>
            </div>
          </div> */}
        </div>

        {/* <h3>Tentukan jawaban Anda</h3> */}
        {/* <hr style="margin-top:1rem" /> */}

        <div style="margin-top: 1rem;">
          <button id="btnNext" disabled>
            Lanjut
          </button>
          <button id="btnSkip" class="secondary">
            Lewati
          </button>
        </div>

        <h3>Yang dilewatkan</h3>
        <hr />
        <div id="skippeds" style="margin-top:1rem">
          {/* <button class="skip">2189</button>
          <button class="skip">2189</button> */}
        </div>

        <div class="overlay"></div>
      </main>
    </section>
  );
};

export const NumericalPage = (props: PageProps) => {
  return (
    <Layout
      version={props.user.tests.numerical}
      rowid={props.rowid}
      user={props.user}
      css={props.css}
      script={props.script}
      title={props.title}>
      <Intro />
      <App user={props.user} />
      <Thankyou />
    </Layout>
  );
};
