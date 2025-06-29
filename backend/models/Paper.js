        const mongoose = require('mongoose');
        const Schema = mongoose.Schema;

        const PaperSchema = new Schema({
          // Menghubungkan paper ini dengan user yang mengunggahnya
          user: {
            type: Schema.Types.ObjectId,
            ref: 'User' // Merujuk ke model 'User' yang sudah kita buat
          },
          title: {
            type: String,
            required: true
          },
          abstract: {
            type: String,
            required: true
          },
          authors: [{ // Ini adalah array, karena penulis bisa lebih dari satu
            type: String
          }],
          publicationYear: {
            type: Number
          },
          // Nanti kita akan tambahkan info file, artefak, dll di sini
        }, {
          timestamps: true // Otomatis nambahin createdAt dan updatedAt
        });

        module.exports = mongoose.model('Paper', PaperSchema);
        