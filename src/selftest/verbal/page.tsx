import { Layout } from "../layout";

const title = 'Tes Verbal';

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

        <article id="kondisi"></article>

        <h3>Pernyataan</h3>

        <p id="verbalprompt" style="font-weight:500"></p>

        <h3>Tentukan jawaban Anda</h3>

        <hr />

        <div style="margin-top:.75rem;">
          <label class="cognitive">
            <input type="radio" name="verbal" value="b" />
            <span>Benar</span>
          </label>
          <label class="cognitive">
            <input type="radio" name="verbal" value="s" />
            <span>Salah</span>
          </label>
          <label class="cognitive">
            <input type="radio" name="verbal" value="t" />
            <span>Tidak tahu</span>
          </label>
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

export const VerbalPage = (props: PageProps) => {
  return (
    <Layout
      version={props.user.tests.verbal}
      rowid={props.rowid}
      user={props.user}
      css={props.css}
      script={props.script}
      title={props.title}
    >
      <Intro />
      <App user={props.user} />
      <Thankyou />
      {/* https://gist.github.com/armukhs/b3489f353f65ef19f3338cacb98bd600 */}
      {/* Inlining all articles */}
      <div style="display:none">
        <div id="article-1">
          <p>
            Mohandas Karamchand Gandhi juga dipanggil Mahatma Gandhi adalah seorang pemimpin spiritual dan politikus dari India. Pada masa
            kehidupan Gandhi, India merupakan koloni Inggris dan Gandhi adalah salah seorang yang paling penting yang terlibat dalam Gerakan
            Kemerdekaan India. Dia adalah aktivis yang tidak menggunakan kekerasan, yang mengusung gerakan kemerdekaan melalui aksi
            demonstrasi damai.
          </p>
          <p>
            Setelah lulus menjadi pengacara, Gandhi pergi ke Afrika Selatan, sebuah koloni Inggris, di mana dia mengalami diskriminasi ras
            yang dinamakan apartheid; dan dia kemudian memutuskan untuk menjadi seorang aktivis politik agar dapat mengubah hukum-hukum yang
            diskriminatif tersebut. Gandhi pun membentuk sebuah gerakan non-kekerasan.
          </p>
          <p>
            Kembali ke India, dia membantu proses kemerdekaan India dari jajahan Inggris; hal ini memberikan inspirasi bagi rakyat di
            koloni-koloni lainnya agar berjuang mendapatkan kemerdekaannya, dan akhirnya memecah Kemaharajaan Britania untuk kemudian
            membentuk Persemakmuran.
          </p>
          <p>
            Gelar Mahatma sering disalahartikan di Barat sebagai nama kecil Gandhi. Mahatma merupakan sebuah kata dalam bahasa Sanskerta
            yang berasal dari maha (berarti besar) dan atma (berarti Jiwa). Rabindranath Tagore disebutkan sebagai orang yang pertama kali
            memberikan gelar tersebut untuk Gandhi. Dalam otobiografinya, Gandhi mengatakan bahwa dia tidak pernah menyukai dan sering
            terluka oleh gelar itu.
          </p>
        </div>
        <div id="article-2">
          <p>
            Pasar valuta asing atau disingkat valas adalah suatu jenis perdagangan atau transaksi yang memperdagangkan mata uang suatu
            negara terhadap mata uang negara lainnya yang melibatkan pasar-pasar uang utama.
          </p>
          <p>
            Pergerakan pasar valuta asing berputar mulai dari pasar Selandia Baru dan Australia: pukul 05.00–14.00 WIB, terus ke pasar Asia
            yaitu Jepang, Singapura, dan Hongkong: pukul 07.00–16.00 WIB, ke pasar Eropa yaitu Jerman dan Inggris: pukul 13.00–22.00 WIB,
            sampai ke pasar Amerika Serikat: pukul 20.30–10.30 WIB. Dalam perkembangan sejarahnya, bank sentral milik negara-negara dengan
            cadangan mata uang asing yang terbesar sekalipun dapat dikalahkan oleh kekuatan pasar valuta asing yang bebas.
          </p>
          <p>
            Menurut survei BIS (<em>Bank International for Settlement</em>), yang dilakukan pada akhir tahun 2013, nilai transaksi pasar
            valuta asing mencapai lebih dari USD$5,3 triliun per harinya.
          </p>
          <p>
            Mengingat tingkat likuiditas dan percepatan pergerakan harga yang tinggi, valuta asing juga telah menjadi alternatif bisnis yang
            populer karena ROI (<em>return on investment</em> atau tingkat pengembalian investasi) serta laba yang akan didapat bisa
            melebihi rata-rata perdagangan pada umumnya; dan akibat pergerakan yang cepat tersebut, maka pasar valuta asing juga memiliki
            risiko yang sangat tinggi.
          </p>
        </div>
        <div id="article-3">
          <p>
            Gunung Tambora terletak di pulau Sumbawa yang merupakan bagian dari kepulauan Nusa Tenggara. Gunung ini adalah bagian dari busur
            Sunda, tali dari kepulauan vulkanik yang membentuk rantai selatan kepulauan Indonesia. Tambora membentuk semenanjungnya sendiri
            di pulau Sumbawa yang disebut semenanjung Sanggar.
          </p>
          <p>
            Tambora terbentuk oleh zona subduksi di bawahnya, dan hal ini meningkatkan ketinggian Tambora sampai 4.300 m yang membuat gunung
            ini pernah menjadi salah satu puncak tertinggi di Nusantara. Aktivitas vulkanik gunung berapi ini mencapai puncaknya pada bulan
            April tahun 1815 ketika meletus, dan menjadi letusan terbesar sejak letusan danau Taupo pada tahun 181.
          </p>
          <p>
            Letusan gunung ini terdengar hingga pulau Sumatra dan abu vulkaniknya jatuh di Kalimantan, Sulawesi, Jawa dan Maluku. Letusan
            gunung ini menyebabkan kematian hingga tidak kurang dari 71.000 orang dengan 11.000—12.000 di antaranya terbunuh secara langsung
            akibat dari letusan tersebut.
          </p>
          <p>
            Lebih dari itu, letusan gunung ini menyebabkan perubahan iklim dunia; terjadi perubahan drastis cuaca di Amerika Utara dan Eropa
            karena debu yang dihasilkan dari letusan Tambora; dan akibatnya banyak panen yang gagal dan kematian ternak di Belahan Utara
            yang menyebabkan terjadinya kelaparan terburuk pada abad ke-19.
          </p>
        </div>
        <div id="article-4">
          <p>
            Perangkat perusak (Bahasa Inggris: malware, berasal dari kata <em>malicious</em> dan <em>software</em>) adalah perangkat lunak (
            <em>software</em>) yang diciptakan untuk menyusup atau merusak sistem komputer, peladen (<em>server</em>), atau jejaring
            komputer tanpa izin termaklum (<em>informed consent</em>) dari pemilik. Istilah ini adalah istilah umum yang dipakai oleh pakar
            komputer untuk mengartikan berbagai macam perangkat lunak atau kode perangkat lunak yang mengganggu atau mengusik.
          </p>
          <p>
            Perangkat lunak dianggap sebagai perangkat perusak berdasarkan maksud dari pembuat dan bukan berdasarkan ciri-ciri tertentu.
            Perangkat perusak mencakup virus komputer, cacing komputer, kuda Troya (<em>Trojan horse</em>), perangkat pengintai (
            <em>spyware</em>), perangkat iklan (<em>adware</em>) yang tak jujur, perangkat jahat (<em>crimeware</em>) dan perangkat lunak
            lainnya yang berniat jahat dan tidak diinginkan, seperti dua contoh dibawah ini:
          </p>
          <ul>
            <li>
              Bancos: pencuri informasi yang menunggu pengguna untuk membuka situs perbankan lalu mengalihkan halaman situs bank yang asli
              ke yang palsu untuk mencuri informasi yang peka.
            </li>
            <li>
              Gator: perangkat pengintai yang memantau kebiasaan penjelajahan web dengan rahasia, dan mengunggah (<em>upload</em>) data ke
              peladen untuk penyelidikan. Kemudian, menyajikan iklan sembul sendiri yang disasarkan (<em>targeted pop-up ads</em>).
            </li>
          </ul>
        </div>
        <div id="article-5">
          <p>
            Rendang atau randang adalah masakan daging bercita rasa pedas yang menggunakan campuran dari berbagai bumbu dan rempah-rempah.
            Masakan ini dihasilkan dari proses memasak yang dipanaskan berulang-ulang dengan santan kelapa.
          </p>
          <p>
            Proses memasaknya memakan waktu berjam-jam (biasanya sekitar empat jam) hingga kering dan berwarna hitam pekat. Dalam suhu
            ruangan, rendang dapat bertahan hingga berminggu- minggu. Rendang yang dimasak dalam waktu yang lebih singkat dan santannya
            belum mengering disebut kalio, berwarna coklat terang keemasan.
          </p>
          <p>
            Rendang dapat ditemukan di Rumah Makan Padang di seluruh dunia. Masakan ini populer di kalangan masyarakat Indonesia dan
            negara-negara di Asia Tenggara, seperti Malaysia, Singapura, Brunei, Filipina, dan Thailand. Di daerah asalnya, Minangkabau,
            rendang disajikan dalam berbagai upacara adat dan perhelatan istimewa.
          </p>
          <p>
            Meskipun rendang merupakan masakan tradisional Minangkabau secara umum, masing-masing daerah di Minangkabau memiliki teknik
            memasak dan penggunaan bumbu yang berbeda. Pada tahun 2011, rendang dinobatkan sebagai hidangan peringkat pertama dalam daftar{' '}
            <em>World's 50 Most Delicious Foods</em> (50 Hidangan Terlezat Dunia) yang digelar oleh <em>CNN International</em>.
          </p>
        </div>
      </div>
    </Layout>
  );
};
