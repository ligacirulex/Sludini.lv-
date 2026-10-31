"use strict";

/* =========================================
   SLUDINI.LV — SĀKOTNĒJIE SLUDINĀJUMI
   ========================================= */

const sludinajumi = [
  {
    id: 1,
    title: "Vienistabas dzīvoklis Juglā",
    price: 42000,
    category: "dzivokli",
    available: true,
    description: "Mājīgs dzīvoklis ar ērtu sabiedriskā transporta pieejamību.",
    phone: "+371 20000001",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=700&q=80",
    date: Date.now() - 1000
  },
  {
    id: 2,
    title: "Lietots pilsētas auto",
    price: 3500,
    category: "auto",
    available: true,
    description: "Ekonomisks auto ikdienas braucieniem. Apskatāms Rīgā.",
    phone: "+371 20000002",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=80",
    date: Date.now() - 2000
  },
  {
    id: 3,
    title: "Bezvadu austiņas",
    price: 35,
    category: "elektronika",
    available: true,
    description: "Labā stāvoklī, ar labu skaņas kvalitāti un uzlādes kabeli.",
    phone: "+371 20000003",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
    date: Date.now() - 3000
  },
  {
    id: 4,
    title: "Koka rakstāmgalds",
    price: 65,
    category: "mebeles",
    available: true,
    description: "Stabils galds darbam vai mācībām. Labā lietošanas stāvoklī.",
    phone: "+371 20000004",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=700&q=80",
    date: Date.now() - 4000
  },
  {
    id: 5,
    title: "Divistabu dzīvoklis Pļavniekos",
    price: 52000,
    category: "dzivokli",
    available: false,
    description: "Gaišs dzīvoklis ar atsevišķām istabām un labu plānojumu.",
    phone: "+371 20000005",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80",
    date: Date.now() - 5000
  },
  {
    id: 6,
    title: "Datora monitors",
    price: 90,
    category: "elektronika",
    available: true,
    description: "Monitors darbam, mācībām un izklaidei. Darbojas bez problēmām.",
    phone: "+371 20000006",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=700&q=80",
    date: Date.now() - 6000
  },
  {
    id: 7,
    title: "Ērts dīvāns",
    price: 150,
    category: "mebeles",
    available: false,
    description: "Ērts dīvāns viesistabai. Pašizvešana no Rīgas.",
    phone: "+371 20000007",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80",
    date: Date.now() - 7000
  },
  {
    id: 8,
    title: "Portatīvais dators",
    price: 280,
    category: "elektronika",
    available: true,
    description: "Portatīvais dators ikdienas darbam un mācībām.",
    phone: "+371 20000008",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80",
    date: Date.now() - 8000
  }
];

/* =========================================
   HTML ELEMENTI
   ========================================= */

const list = document.querySelector("#list");
const count = document.querySelector("#count");
const message = document.querySelector("#message");

const searchInput = document.querySelector("#search");
const categoryFilter = document.querySelector("#category");
const maxPriceInput = document.querySelector("#maxPrice");
const availableFilter = document.querySelector("#available");
const sortSelect = document.querySelector("#sort");

const adForm = document.querySelector("#adForm");

const menuBtn = document.querySelector("#menuBtn");
const navLinks = document.querySelector("#navLinks");
const themeBtn = document.querySelector("#themeBtn");

const adImage = document.querySelector("#adImage");
const imagePreview = document.querySelector("#imagePreview");
const imagePreviewBox = document.querySelector("#imagePreviewBox");
const removeImageBtn = document.querySelector("#removeImage");

let selectedImage = "";
let imageReader = null;

/* =========================================
   PALĪGFUNKCIJAS
   ========================================= */

// Kategorijas nosaukuma iegūšana
function kategorijasNosaukums(kategorija) {
  const kategorijas = {
    dzivokli: "Dzīvokļi",
    auto: "Automašīnas",
    elektronika: "Elektronika",
    mebeles: "Mēbeles"
  };

  return kategorijas[kategorija] || "Cita kategorija";
}

// Paziņojuma parādīšana
function paraditPazinojumu(teksts, irKluda = false) {
  if (!message) {
    return;
  }

  message.textContent = teksts;
  message.style.color = irKluda ? "#b42318" : "var(--main)";
}

// Droša teksta elementa izveidošana
function izveidotElementu(tag, klase, teksts) {
  const elements = document.createElement(tag);

  if (klase) {
    elements.className = klase;
  }

  elements.textContent = teksts;

  return elements;
}

/* =========================================
   SLUDINĀJUMU ATTĒLOŠANA
   ========================================= */

function attelotSarakstu(dati) {
  if (!list || !count) {
    return;
  }

  list.replaceChildren();

  count.textContent = `Atrasti sludinājumi: ${dati.length}`;

  if (dati.length === 0) {
    count.textContent = "Nav atrasts neviens sludinājums.";
    return;
  }

  dati.forEach(function (sludinajums) {
    const card = document.createElement("article");
    card.className = "card";

    // Sludinājuma foto
    if (sludinajums.image) {
      const img = document.createElement("img");

      img.src = sludinajums.image;
      img.alt = sludinajums.title;
      img.loading = "lazy";

      img.addEventListener("error", function () {
        img.hidden = true;
      });

      card.append(img);
    }

    const content = document.createElement("div");
    content.className = "content";

    const title = izveidotElementu(
      "h3",
      "",
      sludinajums.title
    );

    const price = izveidotElementu(
      "p",
      "price",
      `${sludinajums.price.toLocaleString("lv-LV")} €`
    );

    const category = izveidotElementu(
      "p",
      "category-label",
      kategorijasNosaukums(sludinajums.category)
    );

    const description = izveidotElementu(
      "p",
      "",
      sludinajums.description
    );

    const status = izveidotElementu(
      "p",
      "status",
      sludinajums.available
        ? "Pieejams"
        : "Vairs nav pieejams"
    );

    const phone = izveidotElementu(
      "p",
      "phone",
      `Tālrunis: ${sludinajums.phone || "Nav norādīts"}`
    );

    content.append(
      title,
      price,
      category,
      description,
      status,
      phone
    );

    card.append(content);
    list.append(card);
  });
}

/* =========================================
   MEKLĒŠANA, FILTRĒŠANA UN KĀRTOŠANA
   ========================================= */

function filtrētSarakstu() {
  let rezultati = [...sludinajumi];

  const meklejums = searchInput
    ? searchInput.value.trim().toLocaleLowerCase("lv")
    : "";

  const kategorija = categoryFilter
    ? categoryFilter.value
    : "visas";

  const maxCena =
    maxPriceInput && maxPriceInput.value.trim() !== ""
      ? Number(maxPriceInput.value)
      : Infinity;

  const tikaiPieejamie = availableFilter
    ? availableFilter.checked
    : false;

  // Meklē pēc nosaukuma un apraksta
  if (meklejums) {
    rezultati = rezultati.filter(function (sludinajums) {
      const teksts =
        `${sludinajums.title} ${sludinajums.description} ${kategorijasNosaukums(sludinajums.category)}`
          .toLocaleLowerCase("lv");

      return teksts.includes(meklejums);
    });
  }

  // Filtrē pēc kategorijas
  if (kategorija !== "visas" && kategorija !== "") {
    rezultati = rezultati.filter(function (sludinajums) {
      return sludinajums.category === kategorija;
    });
  }

  // Filtrē pēc maksimālās cenas
  if (maxPriceInput && maxPriceInput.value.trim() !== "") {
    if (!Number.isFinite(maxCena) || maxCena < 0) {
      count.textContent = "Ievadi derīgu maksimālo cenu.";
      list.replaceChildren();
      return;
    }

    rezultati = rezultati.filter(function (sludinajums) {
      return sludinajums.price <= maxCena;
    });
  }

  // Rāda tikai pieejamos sludinājumus
  if (tikaiPieejamie) {
    rezultati = rezultati.filter(function (sludinajums) {
      return sludinajums.available === true;
    });
  }

  // Kārto sludinājumus pēc izvēlētā kritērija
  const kartosana = sortSelect ? sortSelect.value : "new";

  if (kartosana === "cheap") {
    rezultati.sort((a, b) => a.price - b.price);
  } else if (kartosana === "expensive") {
    rezultati.sort((a, b) => b.price - a.price);
  } else if (kartosana === "az") {
    rezultati.sort((a, b) =>
      a.title.localeCompare(b.title, "lv")
    );
  } else {
    rezultati.sort((a, b) => b.date - a.date);
  }

  attelotSarakstu(rezultati);
}

/* =========================================
   FOTO PIEVIENOŠANA UN PRIEKŠSKATĪJUMS
   ========================================= */

if (adImage && imagePreview && imagePreviewBox) {
  adImage.addEventListener("change", function () {
    const file = adImage.files[0];

    if (!file) {
      return;
    }

    // Pārbauda faila tipu
    if (!file.type.startsWith("image/")) {
      paraditPazinojumu(
        "Lūdzu, izvēlies attēla failu.",
        true
      );

      adImage.value = "";
      return;
    }

    // Maksimālais faila izmērs: 5 MB
    if (file.size > 5 * 1024 * 1024) {
      paraditPazinojumu(
        "Fotoattēls nedrīkst būt lielāks par 5 MB.",
        true
      );

      adImage.value = "";
      return;
    }

    if (imageReader) {
      imageReader.abort();
    }

    imageReader = new FileReader();

    imageReader.addEventListener("load", function () {
      if (typeof imageReader.result !== "string") {
        paraditPazinojumu(
          "Neizdevās nolasīt fotoattēlu.",
          true
        );
        return;
      }

      selectedImage = imageReader.result;
      imagePreview.src = selectedImage;
      imagePreview.alt = "Izvēlētā sludinājuma foto priekšskatījums";
      imagePreviewBox.hidden = false;

      paraditPazinojumu("Foto ir veiksmīgi pievienots.");
    });

    imageReader.addEventListener("error", function () {
      paraditPazinojumu(
        "Neizdevās nolasīt fotoattēlu.",
        true
      );
    });

    imageReader.readAsDataURL(file);
  });
}

// Foto noņemšana
if (removeImageBtn) {
  removeImageBtn.addEventListener("click", function () {
    if (imageReader) {
      imageReader.abort();
    }

    selectedImage = "";

    if (adImage) {
      adImage.value = "";
    }

    if (imagePreview) {
      imagePreview.removeAttribute("src");
    }

    if (imagePreviewBox) {
      imagePreviewBox.hidden = true;
    }

    paraditPazinojumu("Foto ir noņemts.");
  });
}

/* =========================================
   JAUNA SLUDINĀJUMA PIEVIENOŠANA
   ========================================= */

if (adForm) {
  adForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const titleInput = adForm.elements.namedItem("title");
    const categoryInput = adForm.elements.namedItem("category");
    const priceInput = adForm.elements.namedItem("price");
    const descriptionInput = adForm.elements.namedItem("description");
    const phoneInput = adForm.elements.namedItem("phone");

    // Pārbauda, vai formas lauki ir atrasti
    if (
      !titleInput ||
      !categoryInput ||
      !priceInput ||
      !descriptionInput ||
      !phoneInput
    ) {
      paraditPazinojumu(
        "Neizdevās atrast visus formas laukus.",
        true
      );
      return;
    }

    const title = titleInput.value.trim();
    const category = categoryInput.value;
    const price = Number(priceInput.value);
    const description = descriptionInput.value.trim();
    const phone = phoneInput.value.trim();

    // Pārbauda nosaukumu
    if (title.length < 3 || title.length > 60) {
      paraditPazinojumu(
        "Nosaukumam jābūt no 3 līdz 60 rakstzīmēm.",
        true
      );
      titleInput.focus();
      return;
    }

    // Pārbauda kategoriju
    const atlautasKategorijas = [
      "dzivokli",
      "auto",
      "elektronika",
      "mebeles"
    ];

    if (!atlautasKategorijas.includes(category)) {
      paraditPazinojumu(
        "Lūdzu, izvēlies kategoriju.",
        true
      );
      categoryInput.focus();
      return;
    }

    // Pārbauda cenu
    if (
      priceInput.value.trim() === "" ||
      !Number.isFinite(price) ||
      price < 1
    ) {
      paraditPazinojumu(
        "Cena jānorāda vismaz 1 € apmērā.",
        true
      );
      priceInput.focus();
      return;
    }

    // Pārbauda aprakstu
    if (description.length < 10 || description.length > 300) {
      paraditPazinojumu(
        "Aprakstam jābūt no 10 līdz 300 rakstzīmēm.",
        true
      );
      descriptionInput.focus();
      return;
    }

    // Pārbauda tālruņa numuru
    const phonePattern = /^[0-9+ ()-]{8,20}$/;

    if (!phonePattern.test(phone)) {
      paraditPazinojumu(
        "Ievadi derīgu tālruņa numuru.",
        true
      );
      phoneInput.focus();
      return;
    }

    // Izveido jaunu sludinājumu
    const jaunaisSludinajums = {
      id: Date.now(),
      title: title,
      category: category,
      price: price,
      description: description,
      phone: phone,
      image: selectedImage,
      available: true,
      date: Date.now()
    };

    // Pievieno jauno sludinājumu saraksta sākumā
    sludinajumi.unshift(jaunaisSludinajums);

    // Notīra formu un foto
    adForm.reset();
    selectedImage = "";

    if (imagePreview) {
      imagePreview.removeAttribute("src");
    }

    if (imagePreviewBox) {
      imagePreviewBox.hidden = true;
    }

    // Atjauno sarakstu
    filtrētSarakstu();

    paraditPazinojumu(
      "Sludinājums veiksmīgi pievienots!"
    );

    // Pārvietojas uz sludinājumu sadaļu
    const sludinajumuSadaļa = document.querySelector("#sludinajumi");

    if (sludinajumuSadaļa) {
      sludinajumuSadaļa.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
}

/* =========================================
   MOBILĀ IZVĒLNE
   ========================================= */

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", function () {
    const atverta = navLinks.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", String(atverta));
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================================
   TUMŠĀS TĒMAS PĀRSLĒGŠANA
   ========================================= */

function atjaunotTemasPogu() {
  if (!themeBtn) {
    return;
  }

  const tumsa = document.body.classList.contains("dark");

  themeBtn.textContent = tumsa
    ? "☀ Gaišā tēma"
    : "☾ Tumšā tēma";

  themeBtn.setAttribute("aria-pressed", String(tumsa));
}

if (themeBtn) {
  // Ielādē iepriekš izvēlēto tēmu
  try {
    const saglabataTema = localStorage.getItem("tema");

    document.body.classList.toggle(
      "dark",
      saglabataTema === "dark"
    );
  } catch (error) {
    // Tēmas pārslēgšana joprojām darbosies bez localStorage.
  }

  atjaunotTemasPogu();

  themeBtn.addEventListener("click", function () {
    const tumsa = document.body.classList.toggle("dark");

    try {
      localStorage.setItem(
        "tema",
        tumsa ? "dark" : "light"
      );
    } catch (error) {
      // Ignorē saglabāšanas kļūdu.
    }

    atjaunotTemasPogu();
  });
}

/* =========================================
   FILTRU NOTIKUMI
   ========================================= */

if (searchInput) {
  searchInput.addEventListener("input", filtrētSarakstu);
}

if (categoryFilter) {
  categoryFilter.addEventListener("change", filtrētSarakstu);
}

if (maxPriceInput) {
  maxPriceInput.addEventListener("input", filtrētSarakstu);
}

if (availableFilter) {
  availableFilter.addEventListener("change", filtrētSarakstu);
}

if (sortSelect) {
  sortSelect.addEventListener("change", filtrētSarakstu);
}

/* =========================================
   SĀKOTNĒJĀ SLUDINĀJUMU ATTĒLOŠANA
   ========================================= */

filtrētSarakstu();
