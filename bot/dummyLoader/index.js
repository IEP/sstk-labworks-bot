const { Mahasiswa, Deadline, Submission } = require('../db').Models

const fetchMahasiswa = async () => {
  const mahasiswa = await Mahasiswa.query()
  // Insert few mahasiswa (100 entry)
  console.log(mahasiswa)
}

const fetchDeadline = async () => {
  const deadline = await Deadline.query()
  console.log(deadline)
}

const fetchSubmission = async() => {
  const submission = await Submission.query()
  console.log(submission)
}

fetchMahasiswa()
fetchDeadline()
fetchSubmission()