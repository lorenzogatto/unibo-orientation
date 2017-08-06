import { MongoClient, Db } from "mongodb";

var uri = "mongodb://lorenzo:PWD@unibo-orientation-cluster-shard-00-00-p2i0j.mongodb.net:27017,unibo-orientation-cluster-shard-00-01-p2i0j.mongodb.net:27017,unibo-orientation-cluster-shard-00-02-p2i0j.mongodb.net:27017/unibo-orientation?ssl=true&replicaSet=unibo-orientation-cluster-shard-0&authSource=admin";



MongoClient.connect(uri, function (err, db: Db) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    var questions = [
        { question: "Ti piace stare a contatto con la natura?" },
        { question: "Sei cosciente dell'ambiente?" },
        { question: "Sei interessato ai fenomeni naturali e al riscaldamento globale?" },
        { question: "Ti piacerebbe vivere in campagna?" },
        { question: "Ti piace stare a contatto con gli animali?" },
        { question: "Ti piace lavorare con i numeri?" },
        { question: "Ti piace pianificare, organizzare e strutturare il lavoro?" },
        { question: "Ti piacerebbe lavorare a stretto contatto con il personale aziendale?" },
        { question: "Preferisci stare a contatto con le persone piuttosto che stare da solo?" },
        { question: "Ti piace la pubblicità?" },
        { question: "Lavoreresti nei weekend per ottenere successo?" },
        { question: "Vorresti lavorare nel mondo dello sport?" },
        { question: "Ti piacerebbe lavorare aiutando gli altri?" },
        { question: "Ti piace lavorare con i computer?" },
        { question: "Ti piace capire come funzionano le cose e crearne nuove?" },
        { question: "Sei interessato alle ultime novità tecnologiche?" },
        { question: "Pensi sia importante seguire leggi e regole?" },
        { question: "Ti piace leggere?" },
        { question: "Ti piace andare in musei o al teatro?" },
        { question: "Lo stipendio è importante per te?" },
        { question: "Ti piace la storia, la religione e questioni che riguardano la società?" },
        { question: "Trovi divertente imparare nuove lingue?" },
        { question: "Sei bravo ad insegnare agli altri?" },
        { question: "Ti piace stare a contatto con i bambini?" },
        { question: "Ti piace leggere statistiche?" },
        { question: "Vorresti lavorare in un ambiente internazionale?" },
        { question: "Ti piace imparare nuove cose, anche senza una guida?" },
        { question: "Pensi e rifletti prima di agire?" },
        { question: "Saresti a tuo agio lavorando con informazioni incomplete o ambigue?" },
        { question: "Il fitness e la salute sono importanti per te?" },
        { question: "Ti piace dare consigli?" },
        { question: "Vorresti capire il funzionamento del corpo umano?" },
    ];
    var inserted = 0;
    for(let i= 0; i <questions.length;i++) {
        let question = questions[i];
        db.collection('questions').insert(question), (err, res) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            inserted++;
            if (inserted == questions.length)
                process.exit(0);
        }
    }
});
