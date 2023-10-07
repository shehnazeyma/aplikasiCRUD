const url = "http://localhost:3000/menu";
const xhr = new XMLHttpRequest();

function semuaMenu() {
    $.getJSON('src/menu.json', function (data) {
        let menu = data.menu;

        // Hapus semua elemen di #daftar-menu
        $('#daftar-menu').empty();

        // perulangan banyak menu
        $.each(menu, function (i, data) {
            $('#daftar-menu').append('<div class="col-md-4"><div class="card mb-3"><img src="img/menu/' + data.gambar + '" class="card-img-top"><div class="card-body"><h5 class="card-title">' + data.nama + '</h5><p class="card-text">' + data.deskripsi + '</p><h5 class="card-title">Rp' + data.harga + '</h5><a href="#" class="btn btn-danger">Pesan Sekarang</a></div></div></div>');
        });
    });
}

$('.nav-link').on('click', function() {
    $('.nav-link').removeClass('active');
    $(this).addClass('active');

    let kategori = $(this).html();
    $('h1').html(kategori);

    if (kategori.toLowerCase() == 'menu') {
        semuaMenu();
        return;
    }

    $.getJSON('src/menu.json', function (data) {
        let menu = data.menu;
        let content = '';

        $.each(menu, function (i, data) {
            if (data.kategori == kategori.toLowerCase()) {
                content += '<div class="col-md-4"><div class="card mb-3"><img src="img/menu/' + data.gambar + '" class="card-img-top"><div class="card-body"><h5 class="card-title">' + data.nama + '</h5><p class="card-text">' + data.deskripsi + '</p><h5 class="card-title">Rp' + data.harga + '</h5><a href="#" class="btn btn-danger">Pesan Sekarang</a></div></div></div>';
            }
        });

        $('#daftar-menu').html(content);
    });
});



// CRUD TEST:
const hargaList = [
    "Rp30.000 - Rp50.000",
    "Rp50.000 - Rp70.000",
    "Rp70.000 - Rp100.000"
];

hargaList.forEach((element) => {
    // create option using DOM
    const newOption = document.createElement('option');
    const optionText = document.createTextNode(element);
    // set option text
    newOption.appendChild(optionText);
    // and option value
    newOption.setAttribute('value', element);

    type.appendChild(newOption)
});

function fetchData() {
    xhr.onerror = function () {
        alert("error")
    }

    xhr.onloadstart = function () {
        result.innerHTML = "Start";
    }

    xhr.onloadend = function () {
        result.innerHTML = "";
        const data = JSON.parse(this.response);
        for (let i = 0; i < menu.length; i++) {
            const node = document.createElement("div");
            node.innerHTML = `
            <div class="col-md-4">
                <div class="card">
                    <img src="${data[i].gambar}" class="card-img-top"">
                    <div class="card-body">
                      <h5 class="card-title">Nama: ${data[i].nama}</h5>
                      <p class="card-text">Kategori: ${data[i].kategori}</p>
                      <h5 class="card-title">Rp${data[i].harga}</h5>
                      <a href="#" class="btn btn-danger d-flex justify-content-center">Pesan Sekarang</a>
                    </div>
                </div>
            </div>
            `
            result.appendChild(node);
        }
    }

    xhr.onprogress = function () {
        result.innerHTML = "Loading";
    }

    xhr.open("GET", url);
    xhr.send();
}

function postData(event) {
    event.preventDefault();
    const data = JSON.stringify({
        gambar: document.getElementById("gambar").value,
        kategori: document.getElementById("kategori").value,
        nama: document.getElementById("nama").value,
        harga: document.getElementById("harga").value
    });

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function () {
        console.log(this.responseText);
    };

    xhr.send(data);
}

function deleteData(id) {
    xhr.open("DELETE", url + `/${id}`);
    xhr.send();
}

// GET all http://localhost:3000/data/
// GET detail http://localhost:3000/data/?id
// POST http://localhost:3000/data dan data
// DELETE http://localhost:3000/data/:id
// PUT http://localhost:3000/data/:id dan data
