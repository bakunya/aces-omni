import { Layout } from "../layout";

const title = 'Tes GMATE';

const Intro = () => {
  return (
    <section id="intro">
      <header>
        <h1 class="text-center">{title}</h1>
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
          <button id="btnStart" disabled>
            Lanjut
          </button>
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
        <h3>Kondisi</h3>
        <div id="kondisi"></div>
        <p id="gmateprompt" style="font-weight:500"></p>
        <h3>Tentukan jawaban Anda</h3>
        <hr />
        <div class="gmateopts">
          <div>
            <label>
              <input type="radio" name="gmate" value="a" />
              <span id="opta"></span>
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="gmate" value="b" />
              <span id="optb"></span>
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="gmate" value="c" />
              <span id="optc"></span>
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="gmate" value="d" />
              <span id="optd"></span>
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="gmate" value="e" />
              <span id="opte"></span>
            </label>
          </div>
        </div>

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
        <div id="skippeds" style="margin-top:1rem"></div>

        <div class="overlay"></div>
      </main>
    </section>
  );
};

export const GMATEPage = (props: PageProps) => {
  return (
    <Layout
      version={props.user.tests.gmate}
      rowid={props.rowid}
      sequence={props.sequence}
      user={props.user}
      css={props.css}
      script={props.script}
      title={props.title}
    >
      <Intro />
      <section id="condition-a">
        <main>
          <p>
            Divisi Anda telah menunjukkan prestasi terbaik pada tahun ini, dan perusahaan memberikan insentif berupa paket liburan ke
            sejumlah tujuan wisata dalam dan luar negeri. Biasanya, dalam menentukan siapa yang berhak berwisata di dalam kota, ke luar kota
            atau yang berhak ke luar negri, tolok ukur utamanya adalah hirarki jabatan dan masa kerja.
          </p>
          <p>
            Namun Anda berpandangan bahwa prestasi kerja (nilai kinerja) merupakan kriteria utama, diikuti dengan yang kedua: hirarki
            jabatan, lalu gaji dan yang terakhir masa kerja.
          </p>
          <p>
            Untuk membantu Anda mengambil keputusan, Anda telah menentukan bahwa prestasi dua kali lebih penting daripada gaji, dan masa
            kerja hanya setengah pentingnya dari gaji. Jawablah pertanyaan-pertanyaan berikut berdasarkan informasi di bawah ini.
          </p>

          <table class="numerical-table">
            <thead>
              <tr>
                <td></td>
                <td>Masa Kerja</td>
                <td>Gaji</td>
                <td>Prestasi</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="2" class="text-center" style="border-bottom-width:0;">
                  Tinggi
                </td>
                <td>Petra</td>
                <td>Muladi</td>
                <td>Muladi</td>
              </tr>
              <tr>
                <td>Sambas</td>
                <td>Petra</td>
                <td>Lisa</td>
              </tr>
              <tr>
                <td rowspan="6" class="bg-pipefull text-center" style="border-bottom-width:0;"></td>
                <td>Lisa</td>
                <td>Lisa</td>
                <td>Petra</td>
              </tr>
              <tr>
                {/* <td rowspan="4" class="text-center" style="border-bottom-width:0;">-</td> */}
                <td>Chris</td>
                <td>Sambas</td>
                <td>Tina</td>
              </tr>
              <tr>
                <td>Tina</td>
                <td>Tina</td>
                <td>Sambas</td>
              </tr>
              <tr>
                <td>Sandra</td>
                <td>Sandra</td>
                <td>Sandra</td>
              </tr>
              <tr>
                <td>Muladi</td>
                <td>Chris</td>
                <td>Chris</td>
              </tr>
              <tr>
                {/* <td class="center" style="border-bottom-width:0;">X</td> */}
                <td>Kelly</td>
                <td>Truno</td>
                <td>Truno</td>
              </tr>
              <tr>
                <td rowspan="2" class="text-center">
                  Rendah
                </td>
                <td>Sunarto</td>
                <td>Kelly</td>
                <td>Kelly</td>
              </tr>
              <tr>
                <td>Truno</td>
                <td>Sunarto</td>
                <td>Sunarto</td>
              </tr>
            </tbody>
          </table>
        </main>
      </section>
      <App user={props.user} />
      <Thankyou />
    </Layout>
  );
};
