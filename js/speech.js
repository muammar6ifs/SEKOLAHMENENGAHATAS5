const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Browser tidak mendukung Speech Recognition");
}

const recognition = new SpeechRecognition();

recognition.lang = "id-ID";
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

let sedangMendengar = false;

let siswa = JSON.parse(localStorage.getItem("siswa")) || [];

let select = document.getElementById("namaSiswa");

siswa.forEach(item => {

    let option = document.createElement("option");

    option.value = item.nama;
    option.textContent = item.nama + " - " + item.kelas;

    select.appendChild(option);

});

function mulaiAbsensi() {

    if (select.value === "") {
        alert("Pilih siswa terlebih dahulu");
        return;
    }

    if (sedangMendengar) return;

    document.getElementById("hasil").innerHTML =
        "Silakan ucapkan : Saya Hadir";

    recognition.start();

}

recognition.onstart = function () {

    sedangMendengar = true;

    console.log("Microphone aktif");

}

recognition.onresult = function (event) {

    sedangMendengar = false;

    let text = event.results[0][0].transcript.toLowerCase();

    console.log("Terdengar :", text);

    if (text.includes("saya hadir")) {

        let absen = JSON.parse(localStorage.getItem("absensi")) || [];

        absen.push({

            nama: select.value,
            tanggal: new Date().toLocaleDateString(),
            jam: new Date().toLocaleTimeString(),
            status: "Hadir"

        });

        localStorage.setItem("absensi", JSON.stringify(absen));

        document.getElementById("hasil").innerHTML =
            "Absensi Berhasil";

    } else {

        document.getElementById("hasil").innerHTML =
            "Yang terdengar : " + text;

    }

}

recognition.onerror = function (event) {

    sedangMendengar = false;

    console.log(event.error);

    if (event.error === "no-speech") {

        document.getElementById("hasil").innerHTML =
            "🎤 Tidak ada suara yang terdeteksi.";

    } else if (event.error === "not-allowed") {

        document.getElementById("hasil").innerHTML =
            "Izin mikrofon ditolak.";

    } else {

        document.getElementById("hasil").innerHTML =
            "Error : " + event.error;

    }

}

recognition.onend = function () {

    sedangMendengar = false;

    console.log("Microphone selesai");

}