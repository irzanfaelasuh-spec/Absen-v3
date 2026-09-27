/* =========================================
   KELAS KITA
   ABSENSI WEBSITE
========================================= */


/* =========================================
   CONFIG
========================================= */

const GROUP_URL =
    "https://chat.whatsapp.com/Fbk0gIDWokm39O0m1JB28a?s=cl&p=a&mlu=4&iam=2";

const MUSIC_URL =
    "https://files.catbox.moe/ay90wc.mp3";


/* =========================================
   ELEMENTS
========================================= */

const form =
    document.getElementById("attendanceForm");

const nameInput =
    document.getElementById("name");

const statusCards =
    document.querySelectorAll(".status-card");

const selectedStatusBox =
    document.getElementById("selectedStatus");

const selectedEmoji =
    document.getElementById("selectedEmoji");

const selectedText =
    document.getElementById("selectedText");

const submitBtn =
    document.getElementById("submitBtn");

const modal =
    document.getElementById("modal");

const closeModal =
    document.getElementById("closeModal");

const messagePreview =
    document.getElementById("messagePreview");

const copyBtn =
    document.getElementById("copyBtn");

const openWhatsapp =
    document.getElementById("openWhatsapp");

const toast =
    document.getElementById("toast");

const toastText =
    document.getElementById("toastText");

const toastIcon =
    document.getElementById("toastIcon");

const confetti =
    document.getElementById("confetti");

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

const musicIcon =
    document.getElementById("musicIcon");

const musicText =
    document.getElementById("musicText");


/* =========================================
   STATE
========================================= */

let selectedStatus = "";

let generatedMessage = "";

let musicPlaying = false;


/* =========================================
   STATUS DATA
========================================= */

const statusInfo = {
    Hadir: {
        emoji: "😎",
        description: "Aku datang! 🚀"
    },

    Izin: {
        emoji: "🙋",
        description: "Ada keperluan 📢"
    },

    Sakit: {
        emoji: "🤒",
        description: "Lagi kurang sehat 💊"
    },

    Alpha: {
        emoji: "😴",
        description: "Tidak hadir 💤"
    }
};


/* =========================================
   STATUS BUTTON
========================================= */

statusCards.forEach(card => {

    card.addEventListener("click", () => {

        statusCards.forEach(item => {
            item.classList.remove("selected");
        });

        card.classList.add("selected");

        selectedStatus =
            card.dataset.status;

        const emoji =
            card.dataset.emoji;

        selectedEmoji.textContent =
            emoji;

        selectedText.textContent =
            selectedStatus;

        selectedStatusBox.style.transform =
            "scale(.97)";

        setTimeout(() => {
            selectedStatusBox.style.transform =
                "scale(1)";
        }, 120);

    });

});


/* =========================================
   DATE
========================================= */

function getDate() {

    const now = new Date();

    return now.toLocaleDateString(
        "id-ID",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
}


/* =========================================
   TIME
========================================= */

function getTime() {

    const now = new Date();

    return now.toLocaleTimeString(
        "id-ID",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


/* =========================================
   CREATE MESSAGE
========================================= */

function createMessage(name, status) {

    const emoji =
        statusInfo[status]?.emoji || "📌";

    return `*ABSENSI KELAS KITA* 📚

👤 *Nama:* ${name}
📌 *Status:* ${emoji} ${status}
📅 *Tanggal:* ${getDate()}
⏰ *Waktu:* ${getTime()}

_Dikirim melalui KELAS KITA_ ✨`;
}


/* =========================================
   COPY TEXT
========================================= */

async function copyText(text) {

    try {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            await navigator.clipboard.writeText(text);

            return true;
        }

    } catch (error) {
        console.log("Clipboard API gagal:", error);
    }


    /* FALLBACK */

    try {

        const textarea =
            document.createElement("textarea");

        textarea.value = text;

        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        const success =
            document.execCommand("copy");

        textarea.remove();

        return success;

    } catch (error) {

        console.log("Fallback copy gagal:", error);

        return false;
    }
}


/* =========================================
   TOAST
========================================= */

function showToast(
    text,
    icon = "✅"
) {

    toastText.textContent = text;
    toastIcon.textContent = icon;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);
}


/* =========================================
   CONFETTI
========================================= */

function launchConfetti() {

    confetti.innerHTML = "";

    const emojis = [
        "🎉",
        "✨",
        "⭐",
        "💚",
        "💛",
        "🎊",
        "🌟"
    ];

    for (let i = 0; i < 45; i++) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti-piece";

        piece.textContent =
            emojis[
                Math.floor(
                    Math.random() * emojis.length
                )
            ];

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.fontSize =
            (10 + Math.random() * 14) + "px";

        piece.style.setProperty(
            "--duration",
            (2 + Math.random() * 2) + "s"
        );

        piece.style.setProperty(
            "--drift",
            ((Math.random() - .5) * 250) + "px"
        );

        confetti.appendChild(piece);
    }

    setTimeout(() => {
        confetti.innerHTML = "";
    }, 4500);
}


/* =========================================
   RESET FORM
========================================= */

function resetForm() {

    nameInput.value = "";

    selectedStatus = "";

    statusCards.forEach(card => {
        card.classList.remove("selected");
    });

    selectedEmoji.textContent =
        "👀";

    selectedText.textContent =
        "Belum memilih";
}


/* =========================================
   SUBMIT
========================================= */

form.addEventListener("submit", async event => {

    event.preventDefault();

    const name =
        nameInput.value.trim();

    if (!name) {

        showToast(
            "Nama kamu belum diisi!",
            "👤"
        );

        nameInput.focus();

        return;
    }


    if (!selectedStatus) {

        showToast(
            "Pilih status dulu ya!",
            "📌"
        );

        return;
    }


    generatedMessage =
        createMessage(
            name,
            selectedStatus
        );


    /* BUTTON ANIMATION */

    submitBtn.classList.add("loading");

    submitBtn.innerHTML =
        "<span>⏳</span><span>MEMPROSES...</span><span>✨</span>";


    /* COPY AUTOMATICALLY */

    const copied =
        await copyText(
            generatedMessage
        );


    /* SAVE */

    localStorage.setItem(
        "lastAttendance",
        JSON.stringify({
            name,
            status: selectedStatus,
            date: getDate(),
            time: getTime()
        })
    );


    /* SMALL DELAY FOR SMOOTH ANIMATION */

    await new Promise(resolve =>
        setTimeout(resolve, 650)
    );


    /* MODAL */

    messagePreview.textContent =
        generatedMessage;

    modal.classList.add("show");

    launchConfetti();


    if (copied) {

        showToast(
            "Pesan sudah dicopy! 📋",
            "✅"
        );

    } else {

        showToast(
            "Tekan COPY untuk menyalin pesan.",
            "📋"
        );

    }


    /* RESET WITHOUT REFRESH */

    resetForm();


    /* RESTORE BUTTON */

    setTimeout(() => {

        submitBtn.classList.remove(
            "loading"
        );

        submitBtn.innerHTML =
            "<span>🚀</span><span>KIRIM ABSEN</span><span>✨</span>";

    }, 700);

});


/* =========================================
   COPY AGAIN
========================================= */

copyBtn.addEventListener(
    "click",
    async () => {

        const copied =
            await copyText(
                generatedMessage
            );

        if (copied) {

            copyBtn.textContent =
                "✅ SUDAH DICOPY!";

            showToast(
                "Pesan berhasil dicopy!",
                "📋"
            );

            setTimeout(() => {

                copyBtn.textContent =
                    "📋 COPY LAGI";

            }, 1600);

        } else {

            showToast(
                "Copy gagal, coba lagi.",
                "⚠️"
            );

        }

    }
);


/* =========================================
   OPEN WHATSAPP GROUP
========================================= */

openWhatsapp.addEventListener(
    "click",
    () => {

        /*
            Pesan sudah otomatis dicopy.
            Sekarang buka grup WhatsApp.
        */

        window.open(
            GROUP_URL,
            "_blank"
        );

        showToast(
            "Grup WhatsApp dibuka 💬",
            "🚀"
        );

    }
);


/* =========================================
   CLOSE MODAL
========================================= */

function closeSuccessModal() {

    modal.classList.remove("show");

}

closeModal.addEventListener(
    "click",
    closeSuccessModal
);

modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeSuccessModal();

        }

    }
);

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeSuccessModal();

        }

    }
);


/* =========================================
   MUSIC
========================================= */

music.src = MUSIC_URL;

music.loop = true;

music.volume = 0.45;


async function startMusic() {

    try {

        await music.play();

        musicPlaying = true;

        musicIcon.textContent =
            "🔊";

        musicText.textContent =
            "MUSIK ON";

        musicButton.classList.add(
            "active"
        );

    } catch (error) {

        musicPlaying = false;

        showToast(
            "Tap tombol musik untuk memulai 🎵",
            "🎵"
        );

    }

}


function stopMusic() {

    music.pause();

    musicPlaying = false;

    musicIcon.textContent =
        "🔇";

    musicText.textContent =
        "MUSIK OFF";

    musicButton.classList.remove(
        "active"
    );

}


musicButton.addEventListener(
    "click",
    async () => {

        if (musicPlaying) {

            stopMusic();

        } else {

            await startMusic();

        }

    }
);


/* =========================================
   TRY START AFTER USER INTERACTION
========================================= */

document.addEventListener(
    "pointerdown",
    async () => {

        if (!musicPlaying) {

            /*
              Kita tidak memaksa autoplay.
              Musik tetap dikontrol oleh tombol.
            */

        }

    },
    { once: true }
);


/* =========================================
   MUSIC ERROR
========================================= */

music.addEventListener(
    "error",
    () => {

        showToast(
            "Musik tidak bisa dimuat 😢",
            "⚠️"
        );

    }
);


/* =========================================
   INITIAL
========================================= */

selectedStatusBox.style.opacity =
    "1";


/* =========================================
   LAST ATTENDANCE
========================================= */

const lastAttendance =
    localStorage.getItem(
        "lastAttendance"
    );

if (lastAttendance) {

    try {

        const data =
            JSON.parse(
                lastAttendance
            );

        console.log(
            "Absensi terakhir:",
            data
        );

    } catch (error) {

        console.log(
            "Data absensi terakhir rusak."
        );

    }

}
