    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const PaperSchema = new Schema({
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      title: {
        type: String,
        required: true
      },
      abstract: {
        type: String,
        required: true
      },
      authors: [{
        type: String
      }],
      publicationYear: {
        type: Number
      },
      // [+] TAMBAHKAN FIELD DI BAWAH INI
      filePath: {
        type: String,
        required: true
      },
    }, {
      timestamps: true
    });

    module.exports = mongoose.model('Paper', PaperSchema);
    