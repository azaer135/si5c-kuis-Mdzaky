// Model hanya mengelola data; tidak menggunakan req atau res.
let studentOrganizations = [
  { id: 1, nama: "UKM Paduan Suara", jenis: "seni", ketua: "Maria Anggraini", tahunBerdiri: 2008, jumlahAnggota: 65 },
  { id: 2, nama: "UKM Basket", jenis: "olahraga", ketua: "Andi Pratama", tahunBerdiri: 2010, jumlahAnggota: 45 },
  { id: 3, nama: "UKM Robotika", jenis: "akademik", ketua: "Budi Santoso", tahunBerdiri: 2015, jumlahAnggota: 35 }
];
let nextId = 4;

function getAll(jenis) {
  return jenis ? studentOrganizations.filter(item => item.jenis === jenis) : [...studentOrganizations];
}
function getById(id) {
  return studentOrganizations.find(item => item.id === id) || null;
}
function create(data) {
  const item = {
    id: nextId++, nama: data.nama.trim(), jenis: data.jenis,
    ketua: data.ketua.trim(), tahunBerdiri: data.tahunBerdiri ?? null,
    jumlahAnggota: data.jumlahAnggota
  };
  studentOrganizations.push(item);
  return item;
}
function update(id, data) {
  const index = studentOrganizations.findIndex(item => item.id === id);
  if (index < 0) return null;
  studentOrganizations[index] = {
    id, nama: data.nama.trim(), jenis: data.jenis, ketua: data.ketua.trim(),
    tahunBerdiri: data.tahunBerdiri ?? null, jumlahAnggota: data.jumlahAnggota
  };
  return studentOrganizations[index];
}
function remove(id) {
  const index = studentOrganizations.findIndex(item => item.id === id);
  if (index < 0) return false;
  studentOrganizations.splice(index, 1);
  return true;
}
module.exports = { getAll, getById, create, update, remove };
