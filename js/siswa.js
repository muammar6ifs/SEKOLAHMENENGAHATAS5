let siswa = JSON.parse(localStorage.getItem("siswa")) || [];

tampilkan();

function tambahSiswa(){

let nama=document.getElementById("nama").value;

let kelas=document.getElementById("kelas").value;

if(nama=="" || kelas==""){

alert("Lengkapi data!");

return;

}

siswa.push({

nama,

kelas

});

localStorage.setItem("siswa",JSON.stringify(siswa));

document.getElementById("nama").value="";

document.getElementById("kelas").value="";

tampilkan();

}

function tampilkan(){

let isi="";

siswa.forEach((item,index)=>{

isi+=`

<tr>

<td>${index+1}</td>

<td>${item.nama}</td>

<td>${item.kelas}</td>

<td>

<button onclick="hapus(${index})">

Hapus

</button>

</td>

</tr>

`;

});

document.getElementById("dataSiswa").innerHTML=isi;

}

function hapus(index){

if(confirm("Yakin ingin menghapus?")){

siswa.splice(index,1);

localStorage.setItem("siswa",JSON.stringify(siswa));

tampilkan();

}

}

function cariSiswa(){

let keyword=document.getElementById("cari").value.toLowerCase();

let rows=document.querySelectorAll("#dataSiswa tr");

rows.forEach(row=>{

let nama=row.children[1].innerText.toLowerCase();

row.style.display=nama.includes(keyword)?"":"none";

});

}