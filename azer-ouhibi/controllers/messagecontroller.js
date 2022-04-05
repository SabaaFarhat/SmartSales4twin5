const Message = require("../model/message.js");
const natural = require("natural");
const stopword = require("stopword");



const wordDict = {
  "aren't": "are not",
  "can't": "cannot",
  "couldn't": "could not",
  "didn't": "did not",
  "doesn't": "does not",
  "don't": "do not",
  "hadn't": "had not",
  "hasn't": "has not",
  "haven't": "have not",
  "he'd": "he would",
  "he'll": "he will",
  "he's": "he is",
  "i'd": "I would",
  "i'd": "I had",
  "i'll": "I will",
  "i'm": "I am",
  "isn't": "is not",
  "it's": "it is",
  "it'll": "it will",
  "i've": "I have",
  "let's": "let us",
  "mightn't": "might not",
  "mustn't": "must not",
  "shan't": "shall not",
  "she'd": "she would",
  "she'll": "she will",
  "she's": "she is",
  "shouldn't": "should not",
  "that's": "that is",
  "there's": "there is",
  "they'd": "they would",
  "they'll": "they will",
  "they're": "they are",
  "they've": "they have",
  "we'd": "we would",
  "we're": "we are",
  "weren't": "were not",
  "we've": "we have",
  "what'll": "what will",
  "what're": "what are",
  "what's": "what is",
  "what've": "what have",
  "where's": "where is",
  "who'd": "who would",
  "who'll": "who will",
  "who're": "who are",
  "who's": "who is",
  "who've": "who have",
  "won't": "will not",
  "wouldn't": "would not",
  "you'd": "you would",
  "you'll": "you will",
  "you're": "you are",
  "you've": "you have",
  "'re": " are",
  "wasn't": "was not",
  "we'll": " will",
  "didn't": "did not"
}

// Contractions to standard lexicons Conversion
const convertToStandard = text => {
  const data = text.split(' ');
  data.forEach((word, index) => {
      Object.keys(wordDict).forEach(key => {
          if (key === word.toLowerCase()) {
              data[index] = wordDict[key]
          };
      });
  });

  return data.join(' ');
}

// LowerCase Conversion
const convertTolowerCase = text => {
  return text.toLowerCase();
}

// Pure Alphabets extraction
const removeNonAlpha = text => {

  // This specific Regex means that replace all
  //non alphabets with empty string.
  return text.replace(/[^a-zA-Z\s]+/g, '');
}


// Create and Save a new Message
exports.create = (req, res) => {

   // NLP Logic
    // Convert all data to its standard form
    const lexData = convertToStandard(req.body.message);
    console.log("Lexed Data: ",lexData);
  
    // Convert all data to lowercase
    const lowerCaseData = convertTolowerCase(lexData);
    console.log("LowerCase Format: ",lowerCaseData);
  
    // Remove non alphabets and special characters
    const onlyAlpha = removeNonAlpha(lowerCaseData);
    console.log("OnlyAlpha: ",onlyAlpha);
  
    // Tokenization
    const tokenConstructor = new natural.WordTokenizer();
    const tokenizedData = tokenConstructor.tokenize(onlyAlpha);
    console.log("Tokenized Data: ",tokenizedData);
  
    // Remove Stopwords
    const filteredData = stopword.removeStopwords(tokenizedData);
    console.log("After removing stopwords: ",filteredData);
  
    // Stemming
    const Sentianalyzer =
    new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
    const analysis_score = Sentianalyzer.getSentiment(filteredData);
    console.log("Sentiment Score: ",analysis_score);
  

  const message = new Message({
    message: req.body.message,
    analysis_scoring : analysis_score
  });
  message
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    });
};

// Retrieve all messages from the database.
exports.findAll = (req, res) => {
  Message.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};

// Find a single message with a messageId
exports.findOne = (req, res) => {
  Message.findById(req.params.messageId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving message with id " + req.params.messageId,
      });
    });
};

// Update a message identified by the messageId in the request
exports.update = (req, res) => {
  Message.findByIdAndUpdate(
    req.params.messageId,
    {
      message: req.body.message,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      return res.status(500).send({
        message: "Error updating message with id " + req.params.messageId,
      });
    });
};

// Delete a message with the specified messageId in the request
exports.delete = (req, res) => {
  Message.findByIdAndRemove(req.params.messageId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      res.send({ message: "Message deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      return res.status(500).send({
        message: "Could not delete message with id " + req.params.messageId,
      });
    });
};