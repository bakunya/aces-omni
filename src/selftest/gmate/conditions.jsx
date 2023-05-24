// 1
export const ConA = () => {
  return (
    <div class="gc">
      <p>
        Divisi Anda telah menunjukkan prestasi terbaik pada tahun ini, dan perusahaan memberikan insentif berupa paket
        liburan ke sejumlah tujuan wisata dalam dan luar negeri. Biasanya, dalam menentukan siapa yang berhak berwisata
        di dalam kota, ke luar kota atau yang berhak ke luar negri, tolok ukur utamanya adalah hirarki jabatan dan masa
        kerja.
      </p>
      <p>
        Namun Anda berpandangan bahwa prestasi kerja (nilai kinerja) merupakan kriteria utama, diikuti dengan yang
        kedua: hirarki jabatan, lalu gaji dan yang terakhir masa kerja.
      </p>
      <p>
        Untuk membantu Anda mengambil keputusan, Anda telah menentukan bahwa prestasi dua kali lebih penting daripada
        gaji, dan masa kerja hanya setengah pentingnya dari gaji. Jawablah pertanyaan-pertanyaan berikut berdasarkan
        informasi di bawah ini.
      </p>

      <table class="numerical-table">
        <thead>
          <tr>
            <th></th>
            <th>Masa Kerja</th>
            <th>Gaji</th>
            <th>Prestasi</th>
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

      <svg
        width="100%"
        viewBox="5 5 350 210"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xml:space="preserve"
        xmlns:serif="http://www.serif.com/"
        style="width:320px;fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-miterlimit:1.5;">
        <defs>
          <rect
            id="RECT"
            x="40"
            y="220"
            width="80"
            height="20"
            style="fill:white;stroke:black;stroke-width:.75px;"></rect>
        </defs>
        <g>
          <g transform="matrix(1,0,0,1,-10,-100)">
            <path d="M50,280L50,210L130,210L130,280" class="svgline"></path>
          </g>
          <g transform="matrix(1,0,0,1,-10,-100)">
            <path d="M90,210L90,150L290,150L290,210" class="svgline"></path>
          </g>
          <g transform="matrix(1,0,0,1,-10,-100)">
            <path d="M250,230L250,210L330,210L330,230" class="svgline"></path>
          </g>
          <g transform="matrix(1,0,0,1,-10,-100)">
            <path d="M190,130L190,170" class="svgline"></path>
          </g>
        </g>
        <g>
          <g transform="matrix(0.75,0,0,1,-20,-90)">
            <use href="#RECT"></use>
          </g>
          <g transform="matrix(0.75,0,0,1,20,-150)">
            <use href="#RECT"></use>
          </g>
          <g transform="matrix(0.75,0,0,1,120,-150)">
            <use href="#RECT"></use>
          </g>
          <g transform="matrix(0.75,0,0,1,120,-210)">
            <use href="#RECT"></use>
          </g>
          <g transform="matrix(0.75,0,0,1,220,-150)">
            <use href="#RECT"></use>
          </g>
          <g transform="matrix(0.75,0,0,1,-20,-40)">
            <use href="#RECT"></use>
          </g>
          <g transform="matrix(0.75,0,0,1,180,-90)">
            <use href="#RECT"></use>
          </g>
          <g transform="matrix(0.75,0,0,1,60,-90)">
            <use href="#RECT"></use>
          </g>
          <g transform="matrix(0.75,0,0,1,60,-40)">
            <use href="#RECT"></use>
          </g>
          <g transform="matrix(0.75,0,0,1,260,-90)">
            <use href="#RECT"></use>
          </g>
        </g>
        <g>
          <g transform="matrix(1,0,0,1,-43.5193,-117.445)">
            <text x="72.184px" y="261.74px" class="label">
              Tina
            </text>
          </g>
          <g transform="matrix(1,0,0,1,-14.2332,-177.445)">
            <text x="72.184px" y="261.74px" class="label">
              Sambas
            </text>
          </g>
          <g transform="matrix(1,0,0,1,93.2668,-177.445)">
            <text x="72.184px" y="261.74px" class="label">
              Petra
            </text>
          </g>
          <g transform="matrix(1,0,0,1,90.1028,-237.445)">
            <text x="72.184px" y="261.74px" class="label">
              Muladi
            </text>
          </g>
          <g transform="matrix(1,0,0,1,196.624,-177.445)">
            <text x="72.184px" y="261.74px" class="label">
              Lisa
            </text>
          </g>
          <g transform="matrix(1,0,0,1,-45.5759,-67.4454)">
            <text x="72.184px" y="261.74px" class="label">
              Kelly
            </text>
          </g>
          <g transform="matrix(1,0,0,1,153.747,-117.445)">
            <text x="72.184px" y="261.74px" class="label">
              Chris
            </text>
          </g>
          <g transform="matrix(1,0,0,1,28.4534,-117.445)">
            <text x="72.184px" y="261.74px" class="label">
              Sandra
            </text>
          </g>
          <g transform="matrix(1,0,0,1,26.7542,-67.4454)">
            <text x="72.184px" y="261.74px" class="label">
              Sunarto
            </text>
          </g>
          <g transform="matrix(1,0,0,1,232.447,-117.445)">
            <text x="72.184px" y="261.74px" class="label">
              Truno
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
// 2
const ConB = () => {
  return (
    <div class="gc">
      <figure></figure>
    </div>
  );
};
// 3
const ConC = () => {
  return (
    <div class="gc">
      <p>
        Gosip beredar bahwa sistem promosi karyawan yang terjadi di perusahaan Anda lebih banyak ditentukan secara
        subjektif. Tetapi, Anda tidak menghiraukan gosip itu dan tetap percaya bahwa aturan perusahaan yang menyatakan
        prestasi kerja merupakan tolok ukur utama masih berlaku, sehingga seorang karyawan yang berprestasi tetap akan
        mendapat prioritas untuk dipromosikan tanpa mengandalkan nasib baik.
      </p>
      <p>
        Karena banyaknya keluhan yang diajukan bawahan, Anda perlu mengkaji ulang proses promosi. Departemen HRD memberi
        Anda daftar yang bersifat rahasia yang digunakan oleh pihak manajemen (tim penilai) dalam menentukan promosi,
        meskipun tabel/kolom yang berisi komentar pribadi para penilai tidak diikutsertakan.
      </p>
      <table style="margin:.5rem auto .5rem;border-spacing:0;">
    <tr>
      <th></th>
      <th>Nama</th>
      <th>Masa<br/>Kerja*</th>
      <th>Peringkat<br/>Prestasi**</th>
      <th>Usia</th>
      <th>Golongan</th>
      <th>Catatan<br/>Penilai</th>
    </tr>
    <tr>
      <td rowspan="3" class="center">Promosi</td>
      <td>Carla</td>
      <td class="center">4</td>
      <td class="center">3</td>
      <td class="center">42</td>
      <td class="center">2</td>
      <td class="center"></td>
    </tr>
    <tr>
      <td>Jarwo</td>
      <td class="center">5</td>
      <td class="center">1</td>
      <td class="center">24</td>
      <td class="center">1</td>
      <td class="center"></td>
    </tr>
    <tr>
      <td>Markam</td>
      <td class="center">3</td>
      <td class="center">2</td>
      <td class="center">31</td>
      <td class="center">3</td>
      <td class="center"></td>
    </tr>
    <tr>
      <td rowspan="3" class="center">Tidak<br/>Promosi</td>
      <td>Elizabeth</td>
      <td class="center">5</td>
      <td class="center">2</td>
      <td class="center">26</td>
      <td class="center">1</td>
      <td class="center"></td>
    </tr>
    <tr>
      <td>Gunawan</td>
      <td class="center">5</td>
      <td class="center">2</td>
      <td class="center">25</td>
      <td class="center">3</td>
      <td class="center"></td>
    </tr>
    <tr>
      <td>Yanto</td>
      <td class="center">4</td>
      <td class="center">3</td>
      <td class="center">39</td>
      <td class="center">2</td>
      <td class="center"></td>
    </tr>
  </table>
    </div>
  );
};
// 4
const ConD = () => {
  return (
    <div class="gc">
      <p>
        Berdasarkan penelitian terhadap beragam sepatu sport untuk anak muda yang telah dilakukan oleh lembaga
        independen, Anda sebagai Manager Marketing dari sebuah perusahaan distributor peralatan olah raga, diminta untuk
        mengidentifikasi beragam peluang pemasaran untuk masing-masing produk sepatu tersebut. Adapun hasil
        penelitiannya adalah sebagai berikut:
      </p>
      <figure>
        <table style="margin:.5rem auto .5rem;border-spacing:0;">
          <tr>
            <th rowspan="2">Kriteria</th>
            <th colspan="5">RATING PER MEREK SEPATU</th>
          </tr>
          <tr>
            <th style="width:60px">Niko</th>
            <th style="width:60px">Tiger</th>
            <th style="width:60px">Elang</th>
            <th style="width:60px">Advantage</th>
            <th style="width:60px">Newlife</th>
          </tr>
          <tr>
            <td class="">Harga</td>
            <td class="center">4</td>
            <td class="center">4</td>
            <td class="center">1</td>
            <td class="center">1</td>
            <td class="center">4</td>
          </tr>
          <tr>
            <td class="">Desain</td>
            <td class="center">4</td>
            <td class="center">4</td>
            <td class="center">1</td>
            <td class="center">1</td>
            <td class="center">4</td>
          </tr>
          <tr>
            <td class="">Gaul</td>
            <td class="center">4</td>
            <td class="center">4</td>
            <td class="center">1</td>
            <td class="center">1</td>
            <td class="center">4</td>
          </tr>
          <tr>
            <td class="">Kenyamanan</td>
            <td class="center">4</td>
            <td class="center">4</td>
            <td class="center">1</td>
            <td class="center">1</td>
            <td class="center">4</td>
          </tr>
          <tr>
            <td class="">Keawetan</td>
            <td class="center">4</td>
            <td class="center">4</td>
            <td class="center">1</td>
            <td class="center">1</td>
            <td class="center">4</td>
          </tr>
          <tr>
              <td style="border-width:0;vertical-align:top;padding-top:.5rem;">
                Keterangan:
              </td>
              <td colspan="5" style="border-width:0;padding:.5rem;">
              <div>Rating 1 = komentar positif &gt; 90 %</div>
              <div>Rating 2 = komentar positif 75% sampai &lt; 90 %</div>
              <div>Rating 3 = komentar positif 50% sampai &lt; 75 %</div>
              <div>Rating 4 = komentar positif 25% sampai &lt; 50 %</div>
              <div>Rating 5 = komentar positif &lt; 25 %</div>
            </td>
          </tr>
        </table>
      </figure>
    </div>
  );
};
// 5
const ConE = () => {
  return (
    <div class="gc">
      <p>Proses Tender PT Tipsani Indonusa</p>
      <ol>
        <li>
          Nilai Tender kurang dari Rp. 25.000.000,- disetujui oleh Manajer Pembelian atau Kepala Divisi Terkait II.
        </li>
        <li>
          Nilai Tender antara Rp. 25.000.000,- s/d Rp. 100.000.000,- disetujui oleh Kepala Divisi Terkait dan Kepala
          Divisi Pengadaan III.
        </li>
        <li>
          Nilai Tender lebih dari Rp. 100.000.000,- s/d Rp. 500.000.000,- disetujui oleh Kepala Divisi Pengadaan atau
          Direktur Operasional; Direktur Utama juga harus menyetujui.
        </li>
      </ol>
    </div>
  );
};
// 6
const ConF = () => {
  return (
    <div class="gc">
      <h4 class="title">Ringkasan Hasil Evaluasi Karyawan</h4>
      <dl>
        <dt>Amir</dt>
        <dd>
          Memiliki kemampuan analisa dan sintesa yang baik meskipun kemampuannya dalam mengorganisir pekerjaan menjadi
          titik lemahnya. Ia mampu menuangkan hasil analisanya dalam bentuk presentasi lisan maupun tulisan secara baik,
          namun kurang bisa membangun hubungan kerja sama dengan tim, termasuk dalam memimpin. Ia mampu bekerja baik di
          bawah tekanan sama halnya dengan dorongan untuk memberikan prestasi yang terbaik; namun dalam kesehariannya,
          ia belum bisa menunjukkan prestasi kerja yang baik.
        </dd>

        <dt>Berta</dt>
        <dd>
          Memiliki kemampuan yang baik dalam mengorganisir pekerjaan dengan didukung kemampuan analisa yang mendalam,
          namun punya kesulitan dalam menyampaikan pikiran dan gagasan secara verbal. Walaupun kooperatif bila bekerja
          dengan orang lain, ia menunjukkan sikap dingin dan menjaga jarak saat berperan sebagai pemimpin. Dalam
          kesehariannya, prestasi kerja yang ditunjukkannya tergolong normatif.
        </dd>

        <dt>Carlo</dt>
        <dd>
          Ia memiliki kemampuan analisa yang memadai, serta menunjukkan ketenangan dan keyakinan saat bekerja dalam
          tekanan dan memenuhi target. Dalam kesehariannya, prestasi kerja yang ditunjukkannya tergolong normatif. Ia
          merupakan karyawan terbaru, namun mudah beradaptasi dan menunjukkan sikap kooperatif yang menonjol. Dalam
          beberapa hal ia juga dapat memainkan peran sebagai pimpinan yang efektif. Kelugasannya tersebut juga tampak
          saat ia harus mengkomunikasikan gagasannya secara lisan meskipun masih memerlukan perbaikan untuk komunikasi
          tulisan.
        </dd>

        <dt>Denny</dt>
        <dd>
          Salah seorang karyawan paling produktif di departemen. Meskipun ia gampang tersinggung dan mempunyai kesulitan
          dalam berteman atau bergaul dalam kelompok. Ia memiliki kemampuan menyesuaikan diri terhadap tekanan tugas
          yang baik. Walaupun lancar berbicara, namun gaya berbicaranya tampak kaku. Kemampuan analisa dan sintesanya
          tergolong rata-rata.
        </dd>

        <dt>Erni</dt>
        <dd>
          Erni Karyawan yang kooperatif dan banyak disukai dengan skill komunikasi yang kuat. Namun sikapnya santai dan
          tidak suka repot-repot membuat ia kurang optimal dalam mengerjakan tugas analisa dan sintesa. Meskipun ia suka
          menjadi pemimpin, tetapi kemampuan pengelolaan pekerjaannya tidak optimal. Ia terkadang terlambat memenuhi
          target namun ia mampu untuk bekerja di bawah tekanan.
        </dd>
      </dl>
    </div>
  );
};
// 7
const ConG = () => {
  return (
    <div class="gc">
      <p>
        Perusahaan Anda, sebuah pabrik manufacturing mesin diesel untuk industri, telah bekerja beberapa bulan dalam
        rangka mengembangkan sebuah tipe genset (pembangkit listrik) baru. Pada sebuah meeting dengan departemen
        produksi, dampak pengembangan produk baru itu dipaparkan secara ringkas dan perubahan berikut akan terjadi di
        jalur produksi A dan/atau B.
      </p>
      <ol>
        <li>Jalur produksi A akan kekurangan lima karyawan atau jalur produksi B akan kekurangan sepuluh karyawan.</li>
        <li>Biaya training perusahaan akan meningkat jika jalur produksi A menambah karyawan baru.</li>
        <li>Produktivitas keseluruhan akan menurun jika jalur produksi A atau B menambah karyawan baru IV.</li>
        <li>Area kerja harus diperluas jika departemen B menambah karyawan baru.</li>
      </ol>
    </div>
  );
};
// 8
const ConH = () => {
  return (
    <div class="gc">
      <p>
        Sebagai seorang manajer, Anda mempunyai sebuah proyek yang terdiri dari empat tahap. Masing-masing tahap
        memerlukan waktu dua minggu dan dikerjakan oleh satu tim yang terdiri dari dua orang.
      </p>
      <p>
        Anda mempunyai enam orang staff, 4 diantaranya: Yudi, Yuda, Parti, dan Heru yang karena kesibukannya hanya bisa
        terlibat untuk satu tahap saja; sedangkan dua yang lainnya adalah Tari dan Gilang.
      </p>
      <p>
        Parti hanya memiliki waktu luang di bulan pertama dan tidak bisa bekerja sama dengan Tari. Gilang
        bertanggungjawab untuk implementasi dan lebih suka bekerja di bagian akhir. Yuda hanya bisa bekerja pada tahap
        dua atau tiga.
      </p>
      <p>
        Heru lebih suka bekerja di bulan pertama, namun dia tidak cocok bekerja dengan Parti dan/atau Yudi. Tari adalah
        pemimpin tim secara keseluruhan sehingga harus bekerja di tahap pertama dan empat. Hal lain yang perlu
        diperhatikan adalah tak seorang pun boleh bekerja lebih dari dua tahap.
      </p>
    </div>
  );
};
// 9
const ConI = () => {
  return (
    <div class="gc">
      <h4 class="title">Aturan Absensi Karyawan Kondisi</h4>
      <dl>
        <dt>Sakit</dt>
        <dd>
          Max. 5 hari per tahun, tidak dapat diakumulasikan dan ada pemberitahuan terlebih dahulu kecuali keadaan
          darurat.
        </dd>

        <dt>Kematian</dt>
        <dd>3 hari untuk kematian orang tua atau anak, 1 hari untuk anggota keluarga lain.</dd>

        <dt>Ijin Keperluan Pribadi</dt>
        <dd>
          Max. 5 hari per tahun, permintaan resmi diajukan 2 hari sebelumnya, kecuali dalam keadaan darurat, tidak boleh
          dilanjutkan dengan cuti.
        </dd>

        <dt>Cuti</dt>
        <dd>
          Cuti 10 hari setelah bekerja 1 tahun, 15 hari setelah bekerja 5 tahun, cuti yang tidak diambil akan hangus
          pada periode cuti berikutnya, cuti sampai dengan 5 hari dapat diambil bersama hari libur.
        </dd>
      </dl>
      <div>TABLES</div>
    </div>
  );
};
// 10
const ConJ = () => {
  return (
    <div class="gc">
      <p>
        Sebagai seorang manajer penjualan, Anda mengetahui bahwa salah seorang <em>salesman</em> Anda tidak
        menindak-lanjuti komitmennya pada seorang <em>customer</em> besar, yang dahulu adalah salah satu dari{" "}
        <em>customer</em> Anda ketika masih menjadi <em>salesman</em>.
      </p>
      <p>
        Hari ini, <em>customer</em> tersebut menelpon Anda dan mengeluhkan pelayanan yang kurang memadai dari{" "}
        <em>salesman</em> Anda, terutama ketidakmampuannya untuk memberikan informasi yang diminta secara tepat waktu.
      </p>
    </div>
  );
};
// 11
const ConK = () => {
  return (
    <div class="gc">
      <p>
        Berikut ini sebuah cuplikan dari sebuah rapat bisnis. Pak Yunus bertindak sebagai ketua panel, dan Fred, seorang
        manajer Produksi.
      </p>
      <p>
        Pak Yunus: ".... dan dengan proses kerja yang selaras dan terpadu antar departemen, serta keseragaman persepsi
        terhadap visi/misi perusahaan, kita dapat memastikan efisiensi dan efektivitas di setiap lini organisasi yang
        pada akhirnya akan menjamin tercapainya keuntungan perusahaan.
      </p>
      <p>
        Fred: "Maaf saya berbeda pendapat, Pak, tapi berdasarkan biaya produksi saat ini, akan sulit untuk bisa balik
        modal di tahun ini, apalagi meraih keuntungan."
      </p>
    </div>
  );
};
// 12
const ConL = () => {
  return (
    <div class="gc">
      <figure>
        <figcaption class="table-title">Rumus Tingkat Efisiensi</figcaption>
        <div style="display:flex;align-items:center;padding-left:2rem">
          <div>Tingkat Efisiensi =</div>
          <div class="text-center" style="padding-left:10px;">
            <div style="padding:0.125rem .5rem">jumlah penjualan</div>
            <div style="padding:0.125rem .5rem;border-top:2px solid #333;">Waktu di luar kantor (dalam jam)</div>
          </div>
        </div>
        <br />
        <figcaption class="table-title">Tingkat Efisiensi Anggota</figcaption>
        <table style="margin-left:2rem;margin-top:.75rem">
          <tr>
            <th>Nama</th>
            <th class="text-center" style="">
              Tingkat efisiensi
            </th>
          </tr>
          <tr>
            <td>Lerbin</td>
            <td class="text-center">
              0,25
            </td>
          </tr>
          <tr>
            <td>Amy</td>
            <td class="text-center">0,1</td>
          </tr>
          <tr>
            <td>Yusti</td>
            <td class="text-center">0,15</td>
          </tr>
          <tr>
            <td>Melani</td>
            <td class="text-center">0,35</td>
          </tr>
        </table>
      </figure>
    </div>
  );
};
// 13
const ConM = () => {
  return (
    <div class="gc">
      <p>
        Sebagai manajer keuangan, Anda bekerja di kantor dari jam 09.00 hingga 14.00 setiap hari, kecuali pada hari
        Kamis, ketika Anda menghadiri rapat perusahaan sebagai wakil divisi dari jam 12.00 hingga 15.00 (Anda tetap
        bekerja di kantor dari jam 09.00 hingga 12.00).
      </p>
      <p>
        Pada hari Senin, Anda bekerja dengan Agung untuk tugas di luar kantor dari jam 14.00 hingga 17.00. Pada hari
        Selasa jam 15.00 Anda memimpin rapat sebuah komite, yang biasanya berlangsung hingga jam 17.30 atau 16.00.
      </p>
      <p>
        Pada hari Rabu, Anda harus mengunjungi beberapa cabang mulai jam 14.00. Pada hari Jumat, Anda biasanya
        mengadakan rapat informal dengan staff kantor dari jam 15.00 hingga 16.00, yang kadangkala berlangsung hingga
        jam 16.30 atau 17.00.
      </p>
    </div>
  );
};
// 14
const ConN = () => {
  return (
    <div class="gc">
      <figure></figure>
    </div>
  );
};
// 15
const ConO = () => {
  return (
    <div class="gc">
      <figure>
        <figcaption class="table-title">Hasil Evaluasi Kemampuan Karyawan</figcaption>
        <table>
          <tr>
            <th rowspan="2" class="text-center" style="width:80px">Nama</th>
            <th colspan="2" class="text-center nowrap">
              Pengetahuan
              <br />
              Ttg Pekerjaan
            </th>
            <th colspan="2" class="text-center nowrap">
              Ketrampilan
              <br />
              Berkomunikasi
            </th>
            <th colspan="2" class="text-center nowrap">
              Bekerja dgn
              <br />
              Orang Lain
            </th>
            <th colspan="2" class="text-center nowrap">
              Pengelolaan
              <br />
              Tugas
            </th>
          </tr>
          <tr>
            <th class="text-center">NI</th>
            <th class="text-center">NM</th>
            <th class="text-center">NI</th>
            <th class="text-center">NM</th>
            <th class="text-center">NI</th>
            <th class="text-center">NM</th>
            <th class="text-center">NI</th>
            <th class="text-center">NM</th>
          </tr>
          <tr>
            <td>Ari</td>
            <td class="text-center">x</td>
            <td rowspan="5" class="text-center">3</td>
            <td class="text-center">x</td>
            <td rowspan="5" class="text-center">2</td>
            <td class="text-center">x</td>
            <td rowspan="5" class="text-center">3</td>
            <td class="text-center">x</td>
            <td rowspan="5" class="text-center">3</td>
          </tr>
          <tr>
            <td>Bayu</td>
            <td class="text-center">x</td>
            <td class="text-center">x</td>
            <td class="text-center">x</td>
            <td class="text-center">x</td>
          </tr>
          <tr>
            <td>Cahyo</td>
            <td class="text-center">x</td>
            <td class="text-center">x</td>
            <td class="text-center">x</td>
            <td class="text-center">x</td>
          </tr>
          <tr>
            <td>Dina</td>
            <td class="text-center">x</td>
            <td class="text-center">x</td>
            <td class="text-center">x</td>
            <td class="text-center">x</td>
          </tr>
          <tr>
            <td>Emil</td>
            <td class="text-center">x</td>
            <td class="text-center">x</td>
            <td class="text-center">x</td>
            <td class="text-center">x</td>
          </tr>
        </table>
        <figcaption class="desc">
          Angka tertinggi yang bisa dicapai = 5<br/>
          NI = Nilai individu hasil evaluasi<br/>
          NM = Nilai minimal yang dipersyaratkan untuk menjalankan pekerjaan
        </figcaption>
      </figure>
    </div>
  );
};
// 16
const ConP = () => {
  return (
    <div class="gc">
      <p>
        Tabel di bawah ini dipergunakan oleh departemen Pembelian untuk memastikan bahwa pesanan material bisa datang
        tepat waktu agar tidak mengganggu proses produksi. Sebagai manajer Pembelian, Anda melakukan pengawasan rutin
        pada bawahan Anda. Berikut ini adalah hasil pekerjaan Karno.
      </p>
      <figure>
        <figcaption class="table-title">Rencana Pemesanan Materian Agen Karno</figcaption>
        <table>
          <tr>
            <th rowspan="2" class="text-center">
              Material
            </th>
            <th rowspan="2" class="text-center"></th>
            <th colspan="12" class="text-center">
              Minggu Ke
            </th>
            <th rowspan="2" class="text-center">
              WP*
            </th>
          </tr>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
          </tr>
          <tr>
            <td rowspan="2">Baja Gulung</td>
            <td>Produksi</td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td rowspan="2" class="text-center">
              2
            </td>
          </tr>
          <tr>
            <td>Order</td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
          </tr>
          <tr>
            <td rowspan="2">Baja Lembaran</td>
            <td>Produksi</td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td rowspan="2" class="text-center">
              2
            </td>
          </tr>
          <tr>
            <td>Order</td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
          </tr>
          <tr>
            <td rowspan="2">Pipa Baja</td>
            <td>Produksi</td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td rowspan="2" class="text-center">
              2
            </td>
          </tr>
          <tr>
            <td>Order</td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
          </tr>
          <tr>
            <td rowspan="2">Kawat Baja</td>
            <td>Produksi</td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td rowspan="2" class="text-center">
              2
            </td>
          </tr>
          <tr>
            <td>Order</td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
          </tr>
          <tr>
            <td rowspan="2">Besi Cor</td>
            <td>Produksi</td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td rowspan="2" class="text-center">
              2
            </td>
          </tr>
          <tr>
            <td>Order</td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
          </tr>
          <tr>
            <td rowspan="2">Pipa Aluminium</td>
            <td>Produksi</td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td rowspan="2" class="text-center">
              2
            </td>
          </tr>
          <tr>
            <td>Order</td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
            <td class="gc16"></td>
          </tr>
        </table>
        <figcaption>* WP = waktu pengiriman dalam minggu</figcaption>
      </figure>
    </div>
  );
};
// 17
const ConQ = () => {
  return (
    <div class="gc">
      <figure>
        <figcaption class="table-title">Alokasi Waktu Per Proyek (jam/minggu)</figcaption>
        <table style="border-spacing:0;">
          <tr>
            <th style="width:80px"></th>
            <th class="text-center">Proyek A</th>
            <th class="text-center">Proyek B</th>
            <th class="text-center">Proyek C</th>
          </tr>
          <tr>
            <td class="">Meri</td>
            <td class="text-center">Jakarta</td>
            <td class="text-center">Surabaya</td>
            <td class="text-center">Semarang</td>
          </tr>
          <tr>
            <td class="">Tomi</td>
            <td class="text-center">Kulkas</td>
            <td class="text-center">Televisi</td>
            <td class="text-center">AC</td>
          </tr>
          <tr>
            <td class="">Sari</td>
            <td class="text-center">650</td>
            <td class="text-center">300</td>
            <td class="text-center">800</td>
          </tr>
        </table>
      </figure>
    </div>
  );
};
// 18
const ConR = () => {
  return (
    <div class="gc">
      <figure></figure>
      <figure>
        <table style="margin:.5rem auto .5rem;border-spacing:0;">
          <tr>
            <th></th>
            <th class="text-center">Divisi A</th>
            <th class="text-center">Divisi B</th>
            <th class="text-center">Divisi C</th>
          </tr>
          <tr>
            <td class="">Lokasi</td>
            <td class="text-center">Jakarta</td>
            <td class="text-center">Surabaya</td>
            <td class="text-center">Semarang</td>
          </tr>
          <tr>
            <td class="">Produk</td>
            <td class="text-center">Kulkas</td>
            <td class="text-center">Televisi</td>
            <td class="text-center">AC</td>
          </tr>
          <tr>
            <td class="">Jumlah Karyawan</td>
            <td class="text-center">650</td>
            <td class="text-center">300</td>
            <td class="text-center">800</td>
          </tr>
        </table>
      </figure>
    </div>
  );
};
// 19
const ConS = () => {
  return (
    <div class="gc">
      <p>
        Sebuah perusahaan akan membeli sejumlah perangkat teknologi informasi (IT) dari sebuah distributor perlengkapan
        komputer. Pada saat penawaran, Anda sebagai manager penjualan pada perusahaan distributor tersebut menjelaskan
        kepada <em>salesman</em> Anda tentang kemungkinan permasalahan yang akan terjadi apabila beberapa perangkat
        dihubungkan satu sama lain. Beberapa catatan tersebut adalah:
      </p>
      <ul>
        <li>
          Program Akuntansi SIMKEU akan bermasalah bila digabung dengan <em>printer</em> merek Conan, karena program ini
          tidak cocok dengan <em>printer</em> Conan.
        </li>
        <li>
          Notebook merek Anyer tidak cocok dipasangkan dengan wireless mouse merek Logik, karena ketidaksesuaian siste{" "}<em>infrared</em>-nya.
        </li>
        <li>
          Komputer PC merek BIM tidak boleh dipadukan dengan monitor merek GL, karena ketidak sesuaian sistem
          digital-nya.
        </li>
      </ul>
      <p>
        Pada saat menawarkan, salesman Anda akan mempresentasikan semua produk dalam bentuk beragam <em>display/set</em>
        .
      </p>
    </div>
  );
};
// 20
const ConT = () => {
  return (
    <div class="gc">
      <figure>
        <table style="margin:.5rem auto .5rem;border-spacing:0;">
          <tr>
            <th>Jenis Layanan</th>
            <th class="text-center">
              Penawaran Service
              <br />
              Fotokopi AMAN
            </th>
            <th class="text-center">
              Penawaran Service
              <br />
              Fotokopi BERSAUDARA
            </th>
          </tr>
          <tr>
            <td class="">Panggilan service</td>
            <td class="text-center">Rp&nbsp;314.000/jam</td>
            <td class="text-center">Rp&nbsp;340.000/jam</td>
          </tr>
          <tr>
            <td class="">Biaya perjalanan</td>
            <td class="text-center">Rp&nbsp;5.000/jam</td>
            <td class="text-center">tidak ada</td>
          </tr>
          <tr>
            <td class="">Jarak dari kantor</td>
            <td class="text-center">5 Km</td>
            <td class="text-center">20 Km</td>
          </tr>
          <tr>
            <td class="">Hari kerja</td>
            <td class="text-center">Setiap hari</td>
            <td class="text-center">Senin-Jumat</td>
          </tr>
          <tr>
            <td class="">Biaya kontrak service</td>
            <td class="text-center">Rp&nbsp;3.000.000/tahun</td>
            <td class="text-center">Rp&nbsp;3.200.000/tahun</td>
          </tr>
          <tr>
            <td class="">Deskripsi perusahaan</td>
            <td class="text-center">Baru, kecil, regional</td>
            <td class="text-center">Mapan, dikenal, nasional</td>
          </tr>
          <tr>
            <td class="">Garansi spare-parts</td>
            <td class="text-center">6 bulan</td>
            <td class="text-center">6 bulan</td>
          </tr>
        </table>
      </figure>
    </div>
  );
};
// 21
const ConU = () => {
  return (
    <div class="gc">
      <figure>
        <table style="margin:.5rem auto .5rem;border-spacing:0;">
          <tr>
            <th style="width:80px">Nama</th>
            <th style="width:60px" class="text-center">Penalaran Matematika</th>
            <th style="width:60px" class="text-center">Ketrampilan Verbal</th>
            <th style="width:60px" class="text-center">Pemahaman Bacaan</th>
          </tr>
          <tr>
            <td class="">Karmila</td>
            <td class="text-center">35</td>
            <td class="text-center">50</td>
            <td class="text-center">45</td>
          </tr>
          <tr>
            <td class="">Budi</td>
            <td class="text-center">29</td>
            <td class="text-center">40</td>
            <td class="text-center">47</td>
          </tr>
          <tr>
            <td class="">Sumadi</td>
            <td class="text-center">24</td>
            <td class="text-center">20</td>
            <td class="text-center">35</td>
          </tr>
          <tr>
            <td class="">Karno</td>
            <td class="text-center">35</td>
            <td class="text-center">33</td>
            <td class="text-center">46</td>
          </tr>
          <tr>
            <td class="">Rudi</td>
            <td class="text-center">30</td>
            <td class="text-center">42</td>
            <td class="text-center">50</td>
          </tr>
          <tr>
            <td class="">Gina</td>
            <td class="text-center">27</td>
            <td class="text-center">18</td>
            <td class="text-center">33</td>
          </tr>
        </table>
      </figure>
    </div>
  );
};
// 22
const ConV = () => {
  return (
    <div class="gc">
      <p>
        Hasil survey terhadap para karyawan yang keluar secara sukarela, menunjukkan bahwa lima alasan tertinggi untuk
        mencari pekerjaan di tempat lain adalah:
      </p>
      <ol>
        <li>Kejemuan karena tidak cukup banyak tugas yang non-rutin</li>
        <li>Keinginan untuk mencoba pekerjaan di bidang lain</li>
        <li>Lembur yang diharapkan tidak datang-datang juga</li>
        <li>Tidak cocok dengan rekan sekerja</li>
        <li>Ketidakmampuan menyelesaikan beban pekerjaan</li>
      </ol>
    </div>
  );
};
// 23
const ConW = () => {
  return (
    <div class="gc">
      <p>
        Anda adalah manager yang bertanggungjawab untuk pengadaan bahan mentah untuk produksi; dan salah satu tugas
        utamanya adalah mengevaluasi tawaran supplier setiap tahunnya. Tiga minggu yang lalu supervisor Anda pensiun dan
        digantikan oleh Pundi, seorang supervisor muda yang berkarir pesat yang berasal dari perusahaan kompetitor
        terbesar.
      </p>
      <p>
        Hubungan Anda dengan Pundi belum cukup harmonis, dan pada suatu hari, mendekati akhir proses evaluasi tahunan,
        Pundi menaruh kontrak dengan supplier Bina Utama, yang sudah dia tandatangani, di meja Anda, sambil memberitahu
        dia telah memutuskan untuk memilih supplier tersebut.
      </p>
      <p>
        Adapun alasannya karena dia pernah bekerja sama dengan Bina Utama di masa lalu dan benar-benar mempercayai
        produk dan servicenya, sambil menambahkan bahwa dia juga tahu kalau Bina Utama merupakan salah satu supplier
        yang sedang Anda pertimbangkan.
      </p>
    </div>
  );
};
// 24
const ConX = () => {
  return (
    <div class="gc">
      <p>
        Anda manajer HRD yang baru di PLP Industries, yang selama ini selalu mengalami permasalahan naik turunnya jumlah
        pekerja di pabrik secara tak terduga. Permasalahan menjadi lebih rumit ketika persyaratan produksi minimum per
        bulan juga fluktuatif sebagaimana permintaan pasar yang juga fluktuatif. Untuk itu Anda perlu terlebih dahulu
        melakukan pemetaan terhadap fluktuasi jumlah pekerja satu tahun terakhir yang dibandingkan dengan hasil produksi
        pabrik.
      </p>
      <p>FIGURE</p>
    </div>
  );
};
// 25
const ConY = () => {
  return (
    <div class="gc">
      <p>??? - Boleh gak diganti bar chart (supaya lebih readable dan tidak ada masalah buta warna)?</p>
    </div>
  );
};
// 26
const ConZ = () => {
  return (
    <div class="gc">
      <p>
        Anda melihat dua orang bawahan Bu Yati sedang berdebat seru, yang semakin lama meningkat menjadi pertengkaran
        mulut yang kasar dan mengganggu suasana kerja di sekitarnya, meskipun beberapa saat kemudian perdebatan tersebut
        berakhir ketika salah seorang bergegas menyingkir.
      </p>
      <p>
        Di lain pihak, pada waktu yang bersamaan, di sekitar tempat perdebatan terjadi, Anda melihat Bu Yati sedang
        berbicara dengan seorang pelanggan; dan setelah pelanggan itu pergi, Bu Yati kembali ke ruang kerjanya tanpa
        melakukan apa-apa terhadap kedua bawahannya yang berdebat tadi.
      </p>
      <p>
        Anda merasa kedua karyawan tersebut harus ditegur, karena berdebat dan bertengkar mulut di hadapan pelanggan
        adalah hal yang tabu di perusahaan. Pak Farid, sebagai atasan Anda dan Bu Yati, keluar kantor hari ini; dan Anda
        sendiri harus menemui pelanggan yang 15 menit lagi akan tiba.
      </p>
    </div>
  );
};

export const GmateConditions = {
  a: ConA().toString(),
  b: ConB().toString(),
  c: ConC().toString(),
  d: ConD().toString(),
  e: ConE().toString(),
  f: ConF().toString(),
  g: ConG().toString(),
  h: ConH().toString(),
  i: ConI().toString(),
  j: ConJ().toString(),
  k: ConK().toString(),
  l: ConL().toString(),
  m: ConM().toString(),
  n: ConN().toString(),
  o: ConO().toString(),
  p: ConP().toString(),
  q: ConQ().toString(),
  r: ConR().toString(),
  s: ConS().toString(),
  t: ConT().toString(),
  u: ConU().toString(),
  v: ConV().toString(),
  w: ConW().toString(),
  x: ConX().toString(),
  y: ConY().toString(),
  z: ConZ().toString(),
}
