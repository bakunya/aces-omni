import { Layout } from "../layout";

const Intro = () => {
  return (
    <section id="intro">
      <header>
        <h1 class="text-center">Tes CSI</h1>
      </header>
      <main>
        <h2>Pengantar</h2>
        <p>
          I was very lucky. I had a father, named Paul, who was a pretty remarkable man. He never graduated from high school. He joined the
          Coast Guard in World War II and ferried troops around the world for General Patton, and I think he was always getting into trouble
          and getting busted down to Private. He was a machinist by trade and worked very hard and was kind of a genius with his hands.
        </p>
        <h3 class="text-center">Petunjuk singkat</h3>
        <p>
          If you take a look, what we’ve got is a situation where most automobiles are not being designed in the United States. Televisions?
          Audio electronics? Watches, cameras, bicycles, calculators, you name it: most of the objects of our lives are not designed in
          America. We’ve blown it. We’ve blown it from an industrial point of view because we’ve lost the markets to foreign competitors.
          We’ve also blown it from a design point of view.
        </p>
        <h3 class="text-center" style="margin-top:2rem">
          Klik tombol berikut untuk mulai mengerjakan.
        </h3>
        <div class="text-center" style="margin-top:1.5rem">
          <button id="btnStart">Lanjut</button>
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
          I was very lucky. I had a father, named Paul, who was a pretty remarkable man. He never graduated from high school. He joined the
          Coast Guard in World War II and ferried troops around the world for General Patton, and I think he was always getting into trouble
          and getting busted down to Private. He was a machinist by trade and worked very hard and was kind of a genius with his hands.
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
        <h1>Tes CSI</h1>
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
        <h3 class="text-center">Berikan nilain persetujuan Anda</h3>
        <div class="card" style="margin-top:1rem;">
          <div class="text-center">
            <span id="csiflag">...</span>
          </div>
          <div class="card-prompt" id="csiprompt"></div>
          <div class="scores-wrapper" style="margin:0 auto;">
            <div class="wide-scores">
              <label class="score-label csi1">
                <span>1</span>
                <input type="radio" id="csi1" name="csi" value="1" />
              </label>
              <label class="score-label csi2">
                <span>2</span>
                <input type="radio" id="csi2" name="csi" value="2" />
              </label>
              <label class="score-label csi3">
                <span>3</span>
                <input type="radio" id="csi3" name="csi" value="3" />
              </label>
              <label class="score-label csi4">
                <span>4</span>
                <input type="radio" id="csi4" name="csi" value="4" />
              </label>
              <label class="score-label csi5">
                <span>5</span>
                <input type="radio" id="csi5" name="csi" value="5" />
              </label>
            </div>
          </div>
        </div>
        <div style="margin-top:1.5rem;" class="text-center">
          <button id="btnNext" disabled>
            Lanjut
          </button>
        </div>
        <div class="overlay"></div>
      </main>
    </section>
  );
};

export const CSIPage = (props: PageProps) => {
  return (
    <Layout version={props.user.tests.csi} rowid={props.rowid} user={props.user} css={props.css} script={props.script} title={props.title}>
      <Intro />
      <App user={props.user} />
      <Thankyou />
    </Layout>
  );
};
